import { fileURLToPath } from "url";
import { dirname, join } from "path";

import multer from "multer";
import { check, validationResult } from "express-validator";
import { Router } from "express";
import fse from "fs-extra";
import uniqid from "uniqid";
import { PORT, PUBLIC_URL } from "../config.js";

const blogPostsRouter = Router();

export const blogsPath = join(
  dirname(dirname(fileURLToPath(import.meta.url))),
  "data",
  "blogs.json"
);

// GET /blogPosts => returns the list of blogposts
blogPostsRouter.get("/", async (req, res, next) => {
  try {
    const blogs = await fse.readJSON(blogsPath);
    res.send(blogs);
  } catch (err) {
    next(err);
  }
});

// GET /blogPosts /123 => returns a single blogpost

blogPostsRouter.get("/:id", async (req, res, next) => {
  try {
    const blogs = await fse.readJSON(blogsPath);
    const blogById = blogs.find((blog) => blog.id == req.params.id);
    if (blogById !== undefined) {
      res.send(blogById);
    } else {
      res.status(404).send();
    }
  } catch (err) {
    next(err);
  }
});
// POST /blogPosts => create a new blogpost

const CATEGORIES = [
  "Category1",
  "Category2",
  "Category3",
  "Category4",
  "Category5",
];

function sendErrorsIfAny(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
}

function checkProxy(...args) {
  const checkResult = check(...args);

  const originalIsIn = checkResult.isIn.bind(checkResult);
  const originalIsEmpty = checkResult.isEmpty.bind(checkResult);

  checkResult.isIn = function (...args) {
    // prettier-ignore
    return originalIsIn(...args).withMessage("This value is not a valid choice.");
  };

  checkResult.isEmpty = function (...args) {
    return originalIsEmpty(...args).withMessage("This field is required.");
  };

  return checkResult;
}

blogPostsRouter.post(
  "/",
  checkProxy("title").not().isEmpty().trim().escape(),
  checkProxy("category").isIn(CATEGORIES),
  sendErrorsIfAny,

  // body("category").custom((value) => {
  //   if (CATEGORIES.includes(value)) {
  //     throw new Error(`Category must be one of ${CATEGORIES.toString()}`);
  //   }
  //   return true;
  // }),
  // body("author.email").isEmail().normalizeEmail(),

  async (req, res, next) => {
    try {
      const blogs = await fse.readJSON(blogsPath);
      const newBlog = { ...req.body, id: uniqid(), createdAt: new Date() };
      blogs.push(newBlog);
      await fse.writeJSON(blogsPath, blogs);
      res.send({ id: newBlog.id });
    } catch (err) {
      next(err);
    }
  }
);

// PUT /blogPosts /123 => edit the blogpost with the given id

blogPostsRouter.put("/:id", async (req, res, next) => {
  try {
    const blogs = await fse.readJSON(blogsPath);
    const oldBlog = blogs.find((blog) => blog.id === req.params.id);
    if (oldBlog === undefined) {
      res.status(404).send();
      return;
    }
    const newBlog = {
      ...req.body,
      id: oldBlog.id,
      createdAt: oldBlog.createdAt,
    };
    const newBlogs = blogs.filter((blog) => blog.id !== req.params.id);
    newBlogs.push(newBlog);
    await fse.writeJSON(blogsPath, newBlogs);
    res.send(newBlog);
  } catch (err) {
    next(err);
  }
});
// DELETE /blogPosts /123 => delete the blogpost with the given id

blogPostsRouter.delete("/:id", async (req, res, next) => {
  try {
    const blogs = await fse.readJSON(blogsPath);
    const filteredBlogs = blogs.filter((blog) => blog.id !== req.params.id);
    await fse.writeJSON(blogsPath, filteredBlogs);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

const blogPicsPublicURL = `${PUBLIC_URL}/img/blog-images`;

const folderForBlogImg = join(
  dirname(fileURLToPath(import.meta.url)),
  "../../",
  blogPicsPublicURL
);

export const saveBlogPic = (filename, contentBuffer) =>
  fse.writeFile(join(folderForBlogImg, filename), contentBuffer);

blogPostsRouter.post(
  "/:id/uploadCover",
  multer().single("blogPic"),
  async (req, res, next) => {
    const { mimetype } = req.file;
    const extension = mimetype.slice(mimetype.lastIndexOf("/") + 1);

    try {
      const blogs = await fse.readJSON(blogsPath);
      const oldBlog = blogs.find((blog) => blog.id === req.params.id);

      if (oldBlog === undefined) {
        res.status(404).send();
        return;
      }

      const newFileName = req.params.id + "." + extension;
      await saveBlogPic(newFileName, req.file.buffer);

      const newBlog = Object.assign(oldBlog, {
        imageURL: `http://localhost:${PORT}${blogPicsPublicURL}/${newFileName}`,
      });
      const newBlogs = blogs.filter((blog) => blog.id !== req.params.id);

      newBlogs.push(newBlog);
      await fse.writeJSON(blogsPath, newBlogs);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
);

export default blogPostsRouter;

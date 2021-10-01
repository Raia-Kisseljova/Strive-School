import express from "express";
import cors from "cors";
import blogPostsRouter from "./services/blogPosts.js";
import { join } from "path";
import process from "process";
import os from "os";
const server = express();
import { PORT, PUBLIC_URL } from "./config.js";

const publicFolderPath = join(process.cwd(), "public");

server.use(PUBLIC_URL, express.static(publicFolderPath));
server.use(cors());
server.use(express.json());

server.use("/blogPosts", blogPostsRouter);

server.listen(PORT, console.log("server is running"));

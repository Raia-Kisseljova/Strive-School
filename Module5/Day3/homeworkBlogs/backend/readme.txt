 

You are in charge of creating a set of WebAPIs for the Strive Blog application.

Here you can find the Frontend already created


In this second "step" the application should enable the creation, editing, deletion, listing of blog posts


Blog posts should contain following information:



{	    "_id": "SERVER GENERATED ID",	    "category": "ARTICLE CATEGORY",	    "title": "ARTICLE TITLE",	    "cover":"ARTICLE COVER (IMAGE LINK)",	    "readTime": {	      "value": 2,	      "unit": "minute"	    },	    "author": {	      "name": "AUTHOR AVATAR NAME",	      "avatar":"AUTHOR AVATAR LINK"	    },	    "content": "HTML",	    "createdAt": "NEW DATE"	  }
 

Backend
 

The backend should include the following routes:

 

GET /blogPosts => returns the list of blogposts
GET /blogPosts /123 => returns a single blogpost
POST /blogPosts => create a new blogpost
PUT /blogPosts /123 => edit the blogpost with the given id
DELETE /blogPosts /123 => delete the blogpost with the given id
 

The persistence must be granted via file system (es.: Json file with a list of blog posts inside)

 

Sidenote: remember to install the cors package with 'npm i cors', to import it and to use it with 'server.use(cors())'

 

 

⚠️ Bodies, params and queries must be validated with express-validator middleware

 

Frontend
 

Post article from new article form
Fetch & List your articles at home page
 

 

Extra Features
GET /authors/:id/blogPosts/ => get all the posts for an author with a given ID
GET /blogPosts?title=whatever => filter the blogposts and extract the only that match the condition (es.: title contains "whatever")
Add search feature to frontend
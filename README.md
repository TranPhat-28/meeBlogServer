# meeBlogServer
 
Built using Nodejs. This is a very simple API i built to learn how to connect with React app.
Endpoints:
- GET    /blogs            : Get all blogs from database
- POST   /blogs            : Create a new blog and add to database
- POST   /blogs/id         : Post a comment to the blog with id
- GET    /comments/id/page : Load comment from blog with id, also with pagination (page param)
- GET    /view/id          : View detail blog
- DELETE /blogs/id         : Delete the blog with id

const express = require("express");
const {
  createPost,
  createComment,
  getAllPosts,
  getAPost,
  getPostComments,
  updatePost,
  deletePost
} = require("./post.controller");

const postRouter = express.Router();

postRouter.get("/", getAllPosts);
postRouter.get("/:id", getAPost);
postRouter.get("/:id/comments", getPostComments);
postRouter.post("/", createPost);
postRouter.post("/:id/comments", createComment);
postRouter.put("/:id", updatePost);
postRouter.delete("/:id", deletePost);

module.exports = postRouter;

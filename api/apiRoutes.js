const express = require("express");
const postRouter = require("./post");

const apiRouter = express.Router();

apiRouter.use("/posts", postRouter);

module.exports = apiRouter;

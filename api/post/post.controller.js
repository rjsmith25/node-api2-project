const {
  insert,
  find,
  findById,
  insertComment,
  findCommentById,
  findPostComments,
  update,
  remove
} = require("../../data/db.js");

async function createPost(req, res) {
  const { title, contents } = req.body;

  if (!title || !contents) {
    res
      .status(400)
      .json({ message: "Please provide title and contents for the post." });
    return;
  }

  try {
    let { id } = await insert({ title, contents });
    let post = await findById(id);
    res.status(201).json(post[0]);
  } catch (e) {
    res.status(500).json({
      message: "There was an error while saving the post to the database"
    });
  }
}

async function createComment(req, res) {
  const { id } = req.params;
  const { text } = req.body;

  if (!text) {
    res.status(400).json({ message: "Please provide text for the comment." });
    return;
  }

  try {
    let post = await findById(id);

    if (post.length === 0) {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
      return;
    }

    let { id: commentID } = await insertComment({ post_id: id, text: text });
    let comment = await findCommentById(commentID);
    res.status(201).json(comment[0]);
  } catch (e) {
    res.status(500).json({
      message: "There was an error while saving the comment to the database"
    });
  }
}

async function getAllPosts(req, res) {
  try {
    let posts = await find();
    res.status(200).json(posts);
  } catch (e) {
    res.status(500).json({
      message: "The posts information could not be retrieved."
    });
  }
}

async function getAPost(req, res) {
  const { id } = req.params;
  try {
    let post = await findById(id);

    if (post.length === 0) {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
      return;
    }
    res.status(200).json(post[0]);
  } catch (e) {
    res.status(500).json({
      message: "The post information could not be retrieved."
    });
  }
}

async function getPostComments(req, res) {
  const { id } = req.params;
  try {
    let post = await findById(id);

    if (post.length === 0) {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
      return;
    }
    let comments = await findPostComments(id);
    res.status(200).json(comments);
  } catch (e) {
    res.status(500).json({
      message: "The post information could not be retrieved."
    });
  }
}

async function deletePost(req, res) {
  const { id } = req.params;
  try {
    let post = await findById(id);

    if (post.length === 0) {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
      return;
    }
    await remove(id);
    res.status(200).json(post);
  } catch (e) {
    res.status(500).json({
      message: "The post information could not be retrieved."
    });
  }
}

async function updatePost(req, res) {
  const { id } = req.params;
  const { title, contents } = req.body;
  let changes = {};
  let modifiedPost = {};

  if (!title && !contents) {
    res
      .status(400)
      .json({ message: "Please provide title or contents for the post." });
    return;
  }

  try {
    let post = await findById(id);

    if (post.length === 0) {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
      return;
    }

    if (title) {
      changes.title = title;
    }

    if (contents) {
      changes.contents = contents;
    }

    modifiedPost = { ...post[0], ...changes };

    await update(id, changes);
    res.status(200).json(modifiedPost);
  } catch (e) {
    res.status(500).json({
      message: "The post information could not be retrieved."
    });
  }
}

module.exports = {
  createPost,
  createComment,
  getAllPosts,
  getAPost,
  getPostComments,
  updatePost,
  deletePost
};

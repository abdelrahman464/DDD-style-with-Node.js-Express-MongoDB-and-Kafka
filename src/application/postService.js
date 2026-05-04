const { validatePost } = require("../domain/post");
const repo = require("../infrastructure/postRepository");
const kafka = require("../infrastructure/kafka");
const { kafkaTopic } = require("../config");

async function createPost({ title, content, authorId }) {
  validatePost({ title, content, authorId });

  const post = await repo.save({ title, content, authorId });

  await kafka.publish({
    eventName: kafkaTopic,
    occurredAt: new Date().toISOString(),
    payload: post,
  });

  return post;
}

async function getPost(id) {
  const post = await repo.findById(id);
  if (!post) {
    const err = new Error(`Post ${id} not found`);
    err.status = 404;
    throw err;
  }
  return post;
}

async function listPosts() {
  return repo.findAll();
}

module.exports = { createPost, getPost, listPosts };

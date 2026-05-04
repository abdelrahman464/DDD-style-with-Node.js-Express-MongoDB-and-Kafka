function validatePost({ title, content, authorId }) {
  if (!title || title.trim().length < 3) {
    throw new Error('title must be at least 3 characters');
  }
  if (!content || content.trim().length === 0) {
    throw new Error('content cannot be empty');
  }
  if (!authorId) {
    throw new Error('authorId is required');
  }
}

module.exports = { validatePost };

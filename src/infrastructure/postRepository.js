const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    authorId: { type: String, required: true },
  },
  { timestamps: true }
);

const PostModel = mongoose.model('Post', postSchema);


async function save(data) {
  const doc = await PostModel.create(data);
  return doc.toObject();
}

async function findById(id) {
  if (!mongoose.isValidObjectId(id)) return null;
  const doc = await PostModel.findById(id).lean();
  return doc;
}

async function findAll() {
  return PostModel.find().sort({ createdAt: -1 }).lean();
}

module.exports = { save, findById, findAll };

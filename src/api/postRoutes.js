const { Router } = require("express");
const service = require("../application/postService");

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    const post = await service.createPost(req.body);
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
});

router.get("/", async (_req, res, next) => {
  try {
    const posts = await service.listPosts();
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const post = await service.getPost(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

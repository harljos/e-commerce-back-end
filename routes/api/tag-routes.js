const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // finds all tags with its associated product data
  try {
    const tags = await Tag.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(tags);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // finds a single tag by its `id` with its associated product data
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    if (!tag) {
      res.status(404).json({ message: "No tag found with that id" });
      return;
    }
    res.status(200).json(tag);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // creates a new tag
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;

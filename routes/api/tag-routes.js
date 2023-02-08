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

router.put('/:id', async (req, res) => {
  // updates a tag's name by its `id` value
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    if (!tagData[0]) {
      res.status(404).json({ message: "No tag found with that id" });
      return;
    }
    res.status(200).json(tagData);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // deletes on tag by its `id` value
  try {
    const tag = await Tag.destroy({
      where: {
        id: req.params.id
      }
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

module.exports = router;

const express = require('express');
const Category = require('../models/Category.model');
const { TODOItem } = require("../models/TODOItem.model");
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const outputList = await Category.find().sort({ category: 1 });
    res.send(outputList);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).send('An error occurred while fetching categories: ' + error.message);
  }
});

router.delete('/:categoryID', async (req, res) => {
  try {
    const items = await TODOItem.find({
      category: req.params.categoryID,
    });

    // Do not delete the category if there are TODOItems that belong to it
    if (items.length) {
      return res
        .status(409)
        .send(
          'The category is still used by other TODO Items. So, the category cannot be deleted'
        );
    }

    const category = await Category.findByIdAndDelete(req.params.categoryID);

    if (!category) {
      return res.status(404).send('The category with the given ID was not found.');
    }

    res.send(category);
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).send('An error occurred while deleting the category: ' + error.message);
  }
});

module.exports = router;
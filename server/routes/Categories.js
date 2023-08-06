const express = require('express');
const Category = require('../models/Category.model');
const { TODOItem } = require("../models/TODOItem.model");
const router = express.Router();

router.get('/:userID', async (req, res) => {
  try {
    const outputList = await Category
      .find({userID: req.params.userID})
      .sort({ category: 1 });
    res.send(outputList);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).send('An error occurred while fetching categories: ' + error.message);
  }
});

router.patch('/', async (req, res) => {
  try {
    let updateQueries = [];
    req.body.changedCategories.forEach(async (category) => {
      const {_id, userID, ...update} = category;
      if (category !== null && category !== {}) {
        updateQueries.push({
          updateOne: {
            filter: { _id: category["_id"] },
            update: update
          }
        });
      }
    });
    const bulkWriteResult = await Category.bulkWrite(updateQueries);

    res.send(req.body.changedCategories.slice(0, bulkWriteResult.nModified));
  } catch (error) {
    console.error('Error changing category color:', error);
    res.status(500).send('An error occurred while changing category color: ' + error.message);
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
          'This category is still in use and so cannot be deleted.'
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
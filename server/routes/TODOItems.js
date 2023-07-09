const express = require('express');
const { TODOItem, validate } = require("../models/TODOItem.model");
const Category = require('../models/Category.model');
const router = express.Router();

// retrieves the list of TODOItems associated with a particular UserID.
// Filtering by categoryID can be applied to the output list.
router.get('/fetchAllItems/:userID/:categoryID?', async (req, res) => {
  try {
    // Get list of TODOItems that are associated with current user
    const filter = {
      userID: req.params.userID
    };

    // add to filter object only if user provided additional filter attributes
    if (req.params.categoryID) {
      filter.category = req.params.categoryID;
    }

    let outputList = await TODOItem
      .find(filter)
      .select({ _id: 1, title: 1, startDate: 1, endDate: 1, isFinished: 1 });

    // sort the todoItems by their startDate attribute
    outputList = outputList.sort((todoOne, todoTwo) => {
      const dateOne = new Date(todoOne.startDate);
      const dateTwo = new Date(todoTwo.startDate);
      return dateOne - dateTwo;
    });

    res.send(outputList);
  } catch (error) {
    console.error('Error fetching todo items:', error);
    res.status(500).send('An error occurred while fetching todo items: ' + error.message);
  }
});

router.get('/:itemID', async (req, res) => {
  try {
    const item = await TODOItem
      .findById(req.params.itemID)
      .populate('category')
      .select("-userID");

    if (!item) {
      return res.status(404).send('The item with the given ID was not found.');
    }

    res.send(item);
  } catch (error) {
    console.error('Error fetching todo item:', error);
    res.status(500).send('An error occurred while fetching the todo item: ' + error.message);
  }
});

router.post('/', async (req, res) => {
  try {
    const { error } = validate(req.body);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    let category = await Category
      .findOne({ category: req.body.category });

    // Create new Category document if user introduced a new category
    if (!category) {
      category = new Category({
        category: req.body.category,
        userID: req.body.userID
      });
      category = await category.save();
    }

    const newItem = new TODOItem({
      title: req.body.title,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      description: req.body.description,
      isFinished: req.body.isFinished,
      category: category._id,

      // userID from user object in loginSlice redux store
      userID: req.body.userID,
    });

    await newItem.save();
    res.send(newItem);
  } catch (error) {
    console.error('Error creating todo item:', error);
    res.status(500).send('An error occurred while creating the todo item: ' + error.message);
  }
});

router.put('/:itemID', async (req, res) => {
  try {
    const { error } = validate(req.body);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    let category = await Category
      .findOne({ category: req.body.category });

    // Create new Category document if user introduced a new category
    if (!category) {
      category = new Category({
        category: req.body.category,
        userID: req.body.userID
      });
      category = await category.save();
    }

    const item = await TODOItem.findByIdAndUpdate(
      req.params.itemID,
      {
        title: req.body.title,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        description: req.body.description,
        isFinished: req.body.isFinished,
        category: category._id,
      },
      // new=true set so that item returned from findByIdAndUpdate()
      // represents the updated version of the TODOItem
      { new: true }
    );

    if (!item) {
      return res.status(404).send('The item with the given ID was not found.');
    }

    res.send(item);
  } catch (error) {
    console.error('Error updating todo item:', error);
    res.status(500).send('An error occurred while updating the todo item: ' + error.message);
  }
});

router.delete('/:itemID', async (req, res) => {
  try {
    const item = await TODOItem.findByIdAndDelete(req.params.itemID);

    if (!item) {
      return res.status(404).send('The item with the given ID was not found.');
    }

    res.send(item);
  } catch (error) {
    console.error('Error deleting todo item:', error);
    res.status(500).send('An error occurred while deleting the todo item: ' + error.message);
  }
});

module.exports = router;
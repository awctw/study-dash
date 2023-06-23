const express = require('express');
const Joi = require('joi');
const {v4: uuid} = require('uuid');
const router = express.Router();

const TODOListData = {
  categories: [
    "Math",
    "Musical Art",
    "Physics",
    "Sports",
    "Visual Arts",
    "Work",
    "Biology",
    "Chemistry",
    "Computer Science",
    "Language Arts",
  ],
  TODOList: [
    {
      id: uuid(),
      title: "Complete English literature hwk",
      dueDate: "June 24, 2023",
      description: "This is a sample todo.",
      category: "Language Arts",
    },
    {
      id: uuid(),
      title: "Complete math hwk",
      dueDate: "June 5, 2023",
      description: "This is a sample todo.",
      category: "Math",
    },
    {
      id: uuid(),
      title: "Complete physics hwk",
      dueDate: "June 2, 2023",
      description: "This is a sample todo.",
      category: "Physics",
    },
    {
      id: uuid(),
      title: "Complete math midterm",
      dueDate: "July 14, 2023",
      description: "This is a sample todo.",
      category: "Math",
    },
    {
      id: uuid(),
      title: "Complete math Final",
      dueDate: "Aug 5, 2023",
      description: "This is a sample todo.",
      category: "Math",
    },
    {
      id: uuid(),
      title: "Complete Physics Final",
      dueDate: "July 10, 2023",
      description: "This is a sample todo.",
      category: "Physics",
    },
    {
      id: uuid(),
      title: "Complete Physics Final",
      dueDate: "Aug 12, 2023",
      description: "This is a sample todo.",
      category: "Physics",
    },
    // Add more sample todos here
  ],
};

// checks whether todoItem input object has all of its attributes properly
// instantiated
function validateTODOItem(item) {
  const schema = Joi.object({
    title: Joi.string().trim().required(),
    dueDate: Joi.string().trim().required(),
    description: Joi.string().trim().required(),
    category: Joi.string().trim().required(),
  });

  return schema.validate(item);
}

function updateCategoryList(newCategory) {
  // check whether category in newItem already exists in categories list
  const duplicateCategory = TODOListData.categories.find(category => {
    return category === newCategory;
  });

  // If duplicates were not found, add category to the categories list
  if (!duplicateCategory) {
    TODOListData.categories.push(newCategory);
  }
}

// Since endpoints of form localhost:8080/api/TODOList/Categories/
// is more specific than endpoints of form localhost:8080/api/TODOList/,
// we need to define route handlers for localhost:8080/api/TODOList/Categories/
// endpoints before those for localhost:8080/api/TODOList/

// GET request handler to obtain the list of categories.
router.get('/Categories/',  (req, res) => {
  // sort output list by category names
  TODOListData.categories.sort();

  res.send(TODOListData.categories);
});

// DELETE request handler to delete a category
router.delete('/Categories/:category', (req, res) => {
  const category = TODOListData.categories.find(category => {
    return category === req.params.category;
  });
  if (!category) return res.status(404).send('The category with the given ID was not found.');

  // remove all todoItems having the deleted category.
  TODOListData.TODOList = TODOListData.TODOList.filter((item) => {
    return item.category !== category;
  });

  // find index of todoItem and use that to delete todoItem from TODOList
  const categoryPos = TODOListData.categories.indexOf(category);
  TODOListData.categories.splice(categoryPos, 1);
  res.send(category);
})

// GET request handler to obtain the list of todoItems.
router.get('/',  (req, res) => {

  // obtain list of inventory item. Each inventory item only contains a
  // subset of all attributes.
  const outputList = TODOListData.TODOList.map((item) => {
    return {
      id: item.id,
      title: item.title,
      dueDate: item.dueDate,
      category: item.category
    };
  });

  // sort output list by dueDate attribute.
  outputList.sort((itemA, itemB) => {
    const dateA = new Date(itemA.dueDate);
    const dateB = new Date(itemB.dueDate);
    return dateA - dateB;
  });

  res.send(outputList);
});

// GET request handler to obtain specific todoItem with itemID.
// This fetches the todoItem with all its attributes
router.get('/:itemID',  (req, res) => {
  const item = TODOListData.TODOList.find(item => {
    return item.id === req.params.itemID;
  });
  if (!item) {
    return res.status(404).send('The item with the given ID was not found.');
  }
  res.send(item);
});

// POST request handler to add a new todoItem to TODOList
router.post('/', (req, res) => {
  const { error } = validateTODOItem(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const newItem = {
    id: uuid(),
    title: req.body.title,
    dueDate: req.body.dueDate,
    description: req.body.description,
    category: req.body.category,
  };

  updateCategoryList(newItem.category);

  TODOListData.TODOList.push(newItem);
  res.send(newItem);
});

// PUT request handler to modify the attributes of todoItem with itemID
router.put('/:itemID', (req, res) => {
  const item = TODOListData.TODOList.find(item => {
    return item.id === req.params.itemID;
  });

  if (!item) {
    return res.status(404).send('The item with the given ID was not found.');
  }

  const { error } = validateTODOItem(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  item.title = req.body.title;
  item.dueDate = req.body.dueDate;
  item.description = req.body.description;
  item.category = req.body.category;

  updateCategoryList(item.category);
  res.send(item);
});

// DELETE request handler to delete the todoItem with itemID
router.delete('/:itemID', (req, res) => {
  const item = TODOListData.TODOList.find(item => {
    return item.id === req.params.itemID;
  });
  if (!item) return res.status(404).send('The item with the given ID was not found.');

  // find index of todoItem and use that to delete todoItem from TODOList
  const itemIndex = TODOListData.TODOList.indexOf(item);
  TODOListData.TODOList.splice(itemIndex, 1);
  res.send(item);
})

module.exports = router;
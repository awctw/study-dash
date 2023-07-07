const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  category: {
    type: String,
    trim: true,
    uppercase: true,
    required: true,
  }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
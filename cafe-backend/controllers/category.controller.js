const categoryModel = require('../models/category.model');

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await categoryModel.getAllCategories(req.db);
    res.json(categories);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to get all categories'
    });
  } 
};

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const category_id = await categoryModel.createCategory(
      req.db,
      {name, description}  
    );
    res.json({
      id: category_id,
      name: name,
      description: description
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to create a category'
    });
  } 
};

exports.getCategory = async (req, res) => {
  try {
    const category_id = req.params.id ;
    const category = await categoryModel.getCategory(req.db, category_id);
    res.json(category);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to get category'
    });
  } 
};

exports.updateCategory = async (req, res) => {
  try {
    const category_id = req.params.id * 1;
    const { name, description} = req.body;
    await categoryModel.updateCategory(req.db, category_id, {name, description});
    res.status(200).json({
      success: true,
      message: 'Category updated successfully'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to update category'
    });
  } 
};

exports.deleteCategory = async (req, res) => {
  try {
    const category_id = req.params.id ;
    await categoryModel.deleteCategory(req.db, category_id);
    res.status(200).json({
      success: true,
      message: 'Category deleted successfully'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete category'
    });
  } 
};

const extraItemModel = require('../models/extra-item.model');

exports.getAllExtraItems = async (req, res) => {
  try {
    const menu_id = req.params.mid; //optional param
    const extraItems = await extraItemModel.getAllExtraItems(req.db, menu_id);
    res.json(extraItems);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to get extra items'
    });
  } 
};

exports.createExtraItem = async (req, res) => {
  try {
    const { name, price } = req.body;
    const extra_id = await extraItemModel.createExtraItem(
      req.db,
      {name, price}  
    );
    res.json({
      id: extra_id,
      name: name,
      price: price
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to create a extra item'
    });
  } 
};

exports.getExtraItem = async (req, res) => {
  try {
    const extra_id = req.params.id ;
    const extraItem = await extraItemModel.getExtraItem(req.db, extra_id);
    res.json(extraItem);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to get extra item'
    });
  }  
};

exports.updateExtraItem = async (req, res) => {
  try {
    const extra_id = req.params.id * 1;
    const { name, price} = req.body;
    await extraItemModel.updateExtraItem(req.db, extra_id, {name, price});
    res.status(200).json({
      success: true,
      message: 'Extra item updated successfully'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to update extra item'
    });
  } 
};

exports.deleteExtraItem = async (req, res) => {
  try {
    const extra_id = req.params.id ;
    await extraItemModel.deleteExtraItem(req.db, extra_id);
    res.status(200).json({
      success: true,
      message: 'Extra item deleted successfully'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete extra item'
    });
  } 
};

exports.createExtraMenuItem = async (req, res) => {
  try {
    const menu_id = req.params.mid;
    const { name, price } = req.body;
    ///console.log(name, price, menu_id);
    const extra_id = await extraItemModel.createExtraMenuItem(
      req.db,
      menu_id,
      {name, price}  
    ); 
    res.json({
      id: extra_id,
      name: name,
      price: price
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to create an extra item'
    });
  } 
};

exports.addExtraMenuItem = async (req, res) => {
  try {
    const menu_id = req.params.mid;
    const extra_id = req.params.eid;
    await extraItemModel.addExtraMenuItem(
      req.db,
      menu_id,
      extra_id 
    );
    res.status(200).json({success: true,
      message: "successfully added"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to create an extra item'
    });
  } 
};


exports.deleteExtraMenuItem = async (req, res) => {
  try {
    const menu_id = req.params.mid;
    const extra_id = req.params.eid;
    await extraItemModel.deleteExtraMenuItem(
      req.db,
      menu_id,
      extra_id  
    ); 
    res.status(200).json({
      success: true,
      message: 'deleted an extra item on menu'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to create an extra item'
    });
  } 
};
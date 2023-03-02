const adminModel = require('../models/admin.model');

exports.getOrderCount = async (req, res) => {
  try {
    const orderDate = new Date(req.query.order_date?? Date.now());
    //const orderDate = req.params.odate; //optional param
    const orderCount = await adminModel.getOrderCount(req.db, orderDate);
    res.json(orderCount);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Failed to get order count'
    });
  } 
};

exports.getOrderCountForWeek = async (req, res) => {
  try {
    const orderDailyCount = await adminModel.getOrderCountForWeek(req.db);
    res.json(orderDailyCount);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Failed to get daily order count'
    });
  } 
};

exports.getOrderSales = async (req, res) => {
  try {
    const orderDate = new Date(req.query.order_date ?? Date.now());
    //const orderDate = req.params.odate; //optional param
    const orderSales = await adminModel.getOrderSales(req.db, orderDate);
    res.json(orderSales);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Failed to get sales'
    });
  } 
};

exports.getOrderSalesForWeek = async (req, res) => {
  try {
    const dailySales = await adminModel.getOrderSalesForWeek(req.db);
    res.json(dailySales);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Failed to get daily sales'
    });
  } 
};

exports.getOrderHistoryToday = async (req, res) => {
  try {
    const orderHistory = await adminModel.getOrderHistoryToday(req.db);
    res.json(orderHistory);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Failed to get order history'
    });
  } 
};
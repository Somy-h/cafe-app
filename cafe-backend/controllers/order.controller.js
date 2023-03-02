const addressModel = require('../models/address.model');
const orderModel = require('../models/order.model');

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.getAllOrders(req.db);
    res.json(orders);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to get all orders'
    });
  } 
};

exports.createOrder = async (req, res) => {
  try {
    const { address, cartItems } = req.body;
    let orderNumber;
    let delivery_addr_id = address?.id;
    if (req.body.orderType === 1 && address) {
      const {unit_num, street_num, addr1, addr2, city, state, postal_code} = address;
      delivery_addr_id = await addressModel.insertAddress(
        req.db,
        {unit_num, street_num, addr1, addr2, city, state, postal_code}
      );
    }
    orderNumber = Date.now().toString(16) + req.body.user_id.toString(8);

    console.log(
      orderNumber,
      req.body.user_id,
      req.body.totalPrice,
      delivery_addr_id,
      req.body.orderType
    );
    
    const {user_id, totalPrice: total_price , orderType: order_type} = req.body;
    const order_date = new Date(Date.now());
    const delivery_datetime = new Date(req.body.deliveryDate);
    const order_num = orderNumber;
    const online_order_id = await orderModel.createOrder(
      req.db,
      {order_num, user_id, total_price, delivery_addr_id, order_date, order_type, delivery_datetime}
    )
    console.log("created order: ", online_order_id);

    cartItems.forEach( async (cartItem) => {
      const { categoryItem: menu_item, extraFormData } = cartItem;
      const menu_item_id = menu_item.id;
      const { quantity, totalPrice: order_price, specialNote: special_note } = extraFormData;
      
      const order_detail_id = await orderModel.createOrderDetail(
        req.db,
        {online_order_id, menu_item_id, quantity, order_price, special_note}
      );
      console.log("created order detail: ", order_detail_id)

      const { selectedExtraItems: extras } = extraFormData;
      extras.forEach(async (extraItem) => {
        const extra_id = await orderModel.createOrderExtra(
          req.db,
          {order_detail_id, extra_id: extraItem.id}
        );
        console.log("created extra item: ", extra_id);
      });
    });
    res.json({ orderNumber: orderNumber });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Failed to create an order'
    });
  } 
};

exports.getOrder = async (req, res) => {
  try {
    const orderId = req.params.id ;
    const orderDetail = await orderModel.getOrder(req.db, orderId);
    res.json(orderDetail);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to get order'
    });
  }  
};

exports.getUserOrderHistory = async (req, res) => {
  try {
    const userId = req.params.id * 1;
    const orders = await orderModel.getUserOrderHistory(
      req.db,
      userId
    );
    res.json(orders);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to get order history'
    });
  }
};

exports.getOrderDetail = async (req, res) => {
  try {
    const orderId = req.params.id * 1;
    const orderDetail = await orderModel.getOrderDetail(
      req.db,
      orderId
    );
    res.json(orderDetail);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to get user order detail'
    });
  }
};


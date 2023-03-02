module.exports.getAllOrders = async (pool) => {
  const [orderDetail] = await pool.query(
    `
      SELECT od.online_order_id, od.id AS order_detail_id, od.quantity, od.order_price, od.special_note, mi.id AS menu_id, mi.name AS menu_name, mi.image_url, mi.price AS menu_price
      FROM order_detail od
        INNER JOIN menu_item mi ON od.menu_item_id = mi.id
      ORDER BY od.id DESC
      LIMIT 100
    `
  );
  return orderDetail;
};

module.exports.createOrder = async (pool, itemData) => {
   const [online_order] = await pool.query(
    'INSERT INTO online_order SET ?',
    [itemData]
  );
  return online_order.insertId;;
}

module.exports.createOrderDetail = async (pool, itemData) => {
   const [order_detail] = await pool.query(
    'INSERT INTO order_detail SET ?',
    [itemData]
  );
  return order_detail.insertId;;
}

module.exports.createOrderExtra = async (pool, itemData) => {
   const [order_extra] = await pool.query(
    'INSERT INTO order_extra SET ?',
    [itemData]
  );
  return order_extra.insertId;;
}

module.exports.getOrder = async (pool, orderId) => {
  const [order] = await pool.query(
    `
      SELECT od.online_order_id, od.id AS order_detail_id, od.quantity, od.order_price, od.special_note, mi.id AS menu_id, mi.name AS menu_name, mi.image_url, mi.price AS menu_price
      FROM order_detail od
        INNER JOIN menu_item mi ON od.menu_item_id = mi.id
      WHERE od.online_order_id = ?
    `, [orderId]
  );

  return order;
};

module.exports.getUserOrderHistory = async (pool, userId) => {
  const [orders] = await pool.query(
    'SELECT * FROM online_order WHERE user_id = ?', [userId]
  );

  return orders;
};

module.exports.getOrderDetail = async (pool, orderId) => {
  const [orderDetail] = await pool.query(
    `SELECT od.online_order_id, oe.order_detail_id, e.id as extra_id, e.name as extra_name, e.price as extra_price 
     FROM order_detail od
        LEFT JOIN order_extra oe ON oe.order_detail_id = od.id
        INNER JOIN extra e ON oe.extra_id = e.id
     WHERE od.online_order_id = ?
    `,[orderId]
  );

  return orderDetail;
};

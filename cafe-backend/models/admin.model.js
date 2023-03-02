module.exports.getOrderCount = async (pool, orderDate) => {
  const order_date = new Date(orderDate?? Date.now());
  const [[orderCount]] = await pool.query(
    `
    SELECT COUNT(id) AS order_count
    FROM online_order
    WHERE DATE(order_date) = DATE(?)
    `,
    [order_date]
  );
  return orderCount;
};

module.exports.getOrderCountForWeek = async (pool) => {
  const [dailyCount] = await pool.query(
    `
    SELECT DATE(order_date) as order_date, count(id) as order_count
    FROM online_order
    WHERE DATE(order_date) > DATE_SUB(CURDATE(), INTERVAL 1 WEEK)
    GROUP BY DATE(order_date)
    `
  );
  return dailyCount;
};

module.exports.getOrderSales = async (pool, orderDate) => {
  const order_date = new Date(orderDate ?? Date.now());

  const [[orderSales]] = await pool.query(
    `
    SELECT SUM(total_price) AS day_sales
    FROM online_order
    WHERE DATE(order_date) = DATE(?)
    GROUP BY DATE(order_date)
    `, [order_date]
  );
  return orderSales;
};

module.exports.getOrderSalesForWeek = async (pool) => {
  const [dailySales] = await pool.query(
    `
    SELECT DATE(order_date) as order_date, SUM(total_price) as daily_sales
    FROM online_order
    WHERE DATE(order_date) > DATE_SUB(CURDATE(), INTERVAL 1 WEEK)
    GROUP BY DATE(order_date)
    `
  );
  return dailySales;
};

module.exports.getOrderHistoryToday = async (pool) => {
  const [orderHistory] = await pool.query(
    `
      SELECT u.first_name, u.last_name, o.*
      FROM online_order o 
      INNER JOIN user u ON u.id = o.user_id
      WHERE DATE(order_date) = CURDATE();
    `
  );
  return orderHistory;
};


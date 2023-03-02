
module.exports.getAllMenuItems = async (pool, category_id) => {

  const selectQuery = `SELECT * FROM menu_item ${category_id ? 'WHERE category_id =' + category_id : ''}`;

  const [menuItems] = await pool.query(selectQuery);
  return menuItems;
};

module.exports.createMenuItem = async (pool, itemData) => {
  //const { category_id, name, price, description, popular, image_url} = itemData;
  const [menuItem] = await pool.query(
    'INSERT INTO menu_item SET ?',
    [itemData]
  );
  return menuItem.insertId;;
}

module.exports.getMenuItem = async (pool, menu_id) => {
  const [[menuItem]] = await pool.query(
    'SELECT * FROM menu_item WHERE id = ?',
    [menu_id]
  );
  return menuItem;
};

module.exports.updateMenuItem = async (pool, menu_id, itemData) => {
  const { category_id, name, price, description, popular, image_url} = itemData;
   await pool.query(
    `UPDATE menu_item 
      SET 
        category_id = COALESCE(?, category_id),
        name = COALESCE(?, name),
        price = COALESCE(?, price),
        description = COALESCE(?, description), 
        popular = COALESCE(?, popular), 
        image_url = COALESCE(?, image_url)
      WHERE id=?
    `,
    [category_id, name, price, description, popular, image_url, menu_id]
  );
}

module.exports.deleteMenuItem = async (pool, menu_id) => {  
  await pool.query(
    'DELETE FROM menu_item WHERE id = ?',
    [menu_id]
  );
}
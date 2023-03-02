module.exports.getAllExtraItems = async (pool, menu_id) => {

  if (menu_id) {
    const [extraItems] = await pool.query(
      `SELECT e.* FROM extra e 
        JOIN menu_extra me ON me.extra_id = e.id 
       WHERE me.menu_item_id = ?`, 
      [menu_id]
    )
    return extraItems; 
  } else {
    const [extraItems] = await pool.query('SELECT * FROM extra');
    return extraItems;    
  }
};

module.exports.createExtraItem = async (pool, itemData) => {
  const [extraItem] = await pool.query(
    'INSERT INTO extra SET ?',
    [itemData]
  );
  return extraItem.insertId;
}

module.exports.createExtraMenuItem = async (pool, menu_id, itemData) => {
  console.log("insert", menu_id, itemData);
  const [extraItem] = await pool.query(
    'INSERT INTO extra SET ?',
    [itemData]
  );
  console.log("insertId", extraItem.insertId);
  const [menuextraItem] = await pool.query(
    'INSERT INTO menu_extra SET ?',
    {
      menu_item_id: menu_id,
      extra_id: extraItem.insertId
    }
  );
  return extraItem.insertId;
}

module.exports.addExtraMenuItem = async (pool, menu_id, extra_id) => {
  const [menuextraItem] = await pool.query(
    'INSERT INTO menu_extra SET ?',
    {
      menu_item_id: menu_id,
      extra_id: extra_id
    }
  );
  return menuextraItem.insertId;
}


module.exports.getExtraItem = async (pool, extra_id) => {
  const [[extraItem]] = await pool.query(
    'SELECT * FROM extra WHERE id = ?',
    [extra_id]
  );
  return extraItem;
};

module.exports.updateExtraItem = async (pool, extra_id, itemData) => {
  console.log(itemData.name, itemData.price, extra_id)
  await pool.query(
    `UPDATE extra SET 
      name = COALESCE(?, name),
      price = COALESCE(?, price)
     WHERE id = ?`,
    [itemData.name, itemData.price, extra_id]
  );
}

module.exports.deleteExtraItem = async (pool, extra_id) => {  
  await pool.query(
    'DELETE FROM extra WHERE id = ?',
    [extra_id]
  );
}

module.exports.deleteExtraMenuItem = async (pool, menu_id, extra_id) => {  
  await pool.query(
    'DELETE FROM menu_extra WHERE menu_item_id = ? AND extra_id = ?',
    [menu_id, extra_id]
  );
}
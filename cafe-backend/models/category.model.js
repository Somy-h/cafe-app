module.exports.getAllCategories = async (pool) => {
  const [categories] = await pool.query('SELECT * FROM category');
  return categories;
};

module.exports.createCategory = async (pool, itemData) => {
  
  const [category] = await pool.query(
    'INSERT INTO category SET ?',
    [itemData]
  );
  category_id = category.insertId;
  return category_id;
}

module.exports.getCategory = async (pool, category_id) => {
  const [[category]] = await pool.query(
    'SELECT * FROM category WHERE id = ?',
    [category_id]
  );
  return category;
};

module.exports.updateCategory = async (pool, category_id, itemData) => {
   await pool.query(
    `UPDATE category SET 
      name = COALESCE(?, name),
      description = COALESCE(?, description)
     WHERE id = ?`,
    [itemData.name, itemData.description, category_id]
  );
}

module.exports.deleteCategory = async (pool, category_id) => {  
  await pool.query(
    'DELETE FROM category WHERE id = ?',
    [category_id]
  );
}
const menuItemModel = require('../models/menu-item.model');

exports.getAllMenuItems = async (req, res) => {
  try {
    const category_id = req.params.cid; //optional param
    const menuItems = await menuItemModel.getAllMenuItems(req.db, category_id);
    res.json(menuItems);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to get all menu items'
    });
  } 
};

exports.createMenuItem = async (req, res, err) => {
  if (err === true) {
    console.log(err.message);
    res.status(500).json({
      success: false,
      message: "menu image is not updated!",
    });
  } else {
    try {
      const image_url = req.file
          ? `${process.env.BACK_URL}/images/avatar/${req.file.filename}`
          : null;
        console.log("image_url: ", image_url);

      const { category_id, name, price, description, popular} = req.body;
      const menuItem_id = await menuItemModel.createMenuItem(
        req.db, 
        {category_id, name, price, description, popular, image_url}
      );
      res.json({
        category_id, 
        name, 
        price, 
        description, 
        popular, 
        image_url,
        id: menuItem_id
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Failed to create a menu item'
      });
    } 
  }
};

exports.getMenuItem = async (req, res) => {
  try {
    const menu_id = req.params.id ;
    const menuItem = await menuItemModel.getMenuItem(req.db, menu_id);
    res.json(menuItem);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to get menu item'
    });
  }  
};

exports.updateMenuItem = async (req, res, err) => {
  if (err === true) {
    console.log(err.message);
    res.status(500).json({
      success: false,
      message: "menu image is not updated!",
    });
  } else {
    try {
      const menu_id = req.params.id * 1;
      const { category_id, name, price, description} = req.body;
      const popular = req.body.popular === 'true';
      const image_url = req.file
          ? `${process.env.BACK_URL}/images/menu/${req.file.filename}`
          : req.body.image_url;
      // console.log("update:", category_id, 
      //     name, 
      //     price, 
      //     description, 
      //     popular, 
      //     image_url);
  
      await menuItemModel.updateMenuItem(
        req.db, 
        menu_id,
        {
          category_id, 
          name, 
          price, 
          description, 
          popular, 
          image_url
        });
      res.status(200).json({
        success: true,
        message: 'Menu item updated successfully'
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: 'Failed to update menu item'
      });
    }   
  }
};

exports.deleteMenuItem = async (req, res) => {
  try {
    const menu_id = req.params.id ;
    await menuItemModel.deleteMenuItem(req.db, menu_id);
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

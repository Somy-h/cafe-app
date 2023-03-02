//require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const tokenUtil = require("../utils/access-token");

exports.signUp = async (req, res) => {
  // Hashes the password and inserts the info into the `user` table
  await bcrypt.hash(req.body.pwd, 10).then(async (hash) => {
    try {
      //console.log("Hashed the password ", hash);
      const { userId, address_id } = await userModel.insertUser(req, hash);

      if (!userId || userId <= 0) {
        console.log("User cannot be added");
        //return res.json("User cannot be added");
        return res.status(404).json({
          success: false,
          message: "User cannot be added into the database",
        });
      }
      const payload = {
        id: userId,
        user_name: req.body.first_name + " " + req.body.last_name,
        email: req.body.email,
        role: req.body.role,
        address_id: address_id,
      };
      console.log("payload:", payload);

      //Generate accessToken and refreshToken
      const accessToken = tokenUtil.generateAccessToken(payload, false);
      const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);

      //Update refreshToken of user table in DB
      await userModel.updateUserRefreshToken(req, userId, refreshToken);

      res.json({ jwt: accessToken, refreshToken: refreshToken });
    
    } catch (err) {
      console.log("error", err);
      res.status(404).json({
        success: false,
        message: err.message,
      });
    }
  });
};

exports.getUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await userModel.getUserProfile(req, userId);
    const encodedUser = jwt.sign(
        {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          unit_num: user.unit_num,
          street_num: user.street_num,
          addr1: user.addr1,
          addr2: user.addr2,
          city: user.city,
          state: user.state,
          postal_code: user.postal_code,
          address_id: user.address_id,
        },
        process.env.JWT_KEY
      );
      //console.log("encoded user", encodedUser);
      res.json({ jwt: encodedUser });

  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;

    let hash = null;
    if (req.body.pwd) {
      hash = await bcrypt.hash(req.body.pwd, 10);
      console.log("Hashed the password ", hash);
    }

    await userModel.updateUserProfile(req, hash, userId);
    const user = await userModel.getUserByID(req, userId);
    //const user = await user_dblib.getUserByIDFromDB(req, req.body.id);

    const encodedUser = jwt.sign(
      {
        id: user.id,
        user_name: user.first_name + " " + user.last_name,
        email: user.email,
        role: user.role,
        address_id: user.address_id,
      },
      process.env.JWT_KEY
    );
    //console.log("encoded user", encodedUser);
    res.json({ jwt: encodedUser });

  } catch (err) {
    return res.status(404).json({
      success: false,
      message: err.message
    });
  }
};

exports.deleteUser = (req, res) => {
  const id = req.params.id * 1;

  return res.status(404).json({
    success: false,
    message: `id: ${id} - Fail for now `,
  });
};

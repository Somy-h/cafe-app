const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//const verifyJwt = require("../middleware/verifyJwt");
const userModel = require("../models/user.model");
const tokenUtil = require("../utils/access-token");

exports.signIn = async (req, res) => {
  try {
      const { email, pwd, remember_me } = req.body;

      const user = await userModel.getUserByEmail(req, email);
      //console.log("user from db: ", user);

      if (!user) {
        console.log("Email not found");
        //return res.json("Email not found");
        return res.status(404).json({
          success: false,
          message: "Email not found"
        });
      }

      //console.log(email, pwd, user.pwd);
      const dbPassword = `${user.pwd}`;
      const match = await bcrypt.compare(pwd, dbPassword);
      //console.log("pwd compare (match):", match);
      if (match) {
        const payload = {
          id: user.id,
          user_name: user.first_name + " " + user.last_name,
          email: user.email,
          role: user.role,
          address_id: user.address_id,
        };

        //Generate accessToken and refreshToken
        const accessToken = tokenUtil.generateAccessToken(payload, remember_me);
        const refreshToken = jwt.sign(
          payload,
          process.env.REFRESH_TOKEN_SECRET
        );

        //Update refreshToken of user table in DB
        await userModel.updateUserRefreshToken(req, user.id, refreshToken);

        res.json({ jwt: accessToken, refreshToken: refreshToken });
      } else {
        console.log("Password not found");
        res.status(404).json({
          success: false,
          message: "Password not found"
        });
      }
    } catch (err) {
      console.log("Error in /login", err);
      res.status(404).json({
        success: false,
        message: err.message
      });
    }
}



exports.logout = async (req, res) => {
  const userId = req.params.id;
  try {
    //Update refreshToken to "" of user table in DB
    await userModel.updateUserRefreshToken(req, userId, "");

    res.sendStatus(200);
  } catch (err) {
    console.log("Logout err: ", err.message);
    //res.sendStatus(500);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
}
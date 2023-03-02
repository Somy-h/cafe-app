const jwt = require("jsonwebtoken");
const USER_ROLE = { CUSTOMER: 0, CASHIER: 1, ADMIN: 2 };

exports.generateAccessToken = (payload, remember_me) => {
    // admin access token generated without expiration
    if (payload?.role === USER_ROLE.ADMIN) {
      return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
    } else if (remember_me) {
      // set 30 days expiration if user set remember_me
      return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: `${60 * 24 * 30}min`,
      });
    } else {
      //default 30min expiration
      return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "30min",
      });
    }
  }
// const mysql = require("mysql2");

// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   multipleStatements: true,
//   connectionLimit: 10,
// });
const pool = require("../config/db.config");

module.exports = async (req, res, next) => {
  try {
    //req.db = await pool.getConnection();
    req.db = await pool.promise();
    //req.db.connection.config.namedPlaceholders = true;

    // Traditional mode ensures not null is respected for unsupplied fields, ensures valid JavaScript dates, etc.
    await req.db.query('SET SESSION sql_mode = "TRADITIONAL"');
    await req.db.query(`SET time_zone = '-8:00'`);

    await next();

    //req.db.release();
  } catch (err) {
    // If anything downstream throw an error, we must release the connection allocated for the request
    console.log(err);
    //if (req.db) req.db.release();
    return res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

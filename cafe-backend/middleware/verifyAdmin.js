
const verifyAdmin = (req, res, next) => {
  if (req.user && req.user.role === 2 ) {
    next();
  } else {
    return res.status(401).json({
      success: false,
      message: "Unauthorized access"
    });
  }
};

module.exports = verifyAdmin;

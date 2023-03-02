const express = require("express");
const morgan = require("morgan"); // logging middleware

require("dotenv").config();
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

const app = express();

// Middleware
app.use(express.static("public"));
app.use(cors(corsOptions));
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
const dbConnection = require("./middleware/dbconnect");
app.use(dbConnection);

// Mounting routers
const authRouter = require("./routes/auth.routes");
const userRouter = require("./routes/user.routes");
const categoryRouter = require("./routes/category.routes");
const menuItemRouter = require("./routes/menu-item.routes");
const extraItemRouter = require("./routes/extra-item.routes");
const paymentRouter = require("./routes/payment.routes");
const orderRouter = require("./routes/order.routes");
const adminRouter = require("./Routes/admin.routes");
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/menu-items", menuItemRouter);
app.use("/api/v1/extra-items", extraItemRouter);
app.use("/api/v1/payment", paymentRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/admin", adminRouter);

module.exports = app;
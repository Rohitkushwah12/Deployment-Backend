const express = require("express");
const cors = require("cors");
const usersRoute = require("./Routes/user");
const { globalErrorHandler } = require("./middlewares/globalErrorHandler");
require("dotenv").config();
require("./config/dbConnect");

const app = express();

//Middleware to pass incoming data
app.use(express.json());

// middleware to handle which origins can make request to the domain
app.use(cors());

//routes
app.use("/", usersRoute);

app.use(globalErrorHandler);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

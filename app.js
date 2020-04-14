require("dotenv").config();

// Require Dependancies
const express = require("express"),
  mongoose = require("mongoose"),
  morgan = require("morgan"),
  cors = require("cors"),
  bodyParser = require("body-parser");

// Connect to Mongo DB
mongoose.connect(
  `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@mflix-shard-00-00-mk7jy.mongodb.net:27017,mflix-shard-00-01-mk7jy.mongodb.net:27017,mflix-shard-00-02-mk7jy.mongodb.net:27017/${process.env.DB_NAME}?ssl=true&replicaSet=mflix-shard-0&authSource=admin&retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }
);

const app = express();

// App Set Up
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Serve Frontend
app.use("/", express.static("public"));

// Routes Configuration for the API
app.use("/api/user", require("./routes/user.routes"));
app.use("/api/products", require("./routes/product.routes"));

const PORT = 7003 || process.env.PORT;

// Trying Github actions
// Try two
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

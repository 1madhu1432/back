const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const cors = require("cors");
const Product = require("./product_model");

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.json({ limit: "50mb" }));

const DB = process.env.MONGO_ATLAS.replace("<password>", process.env.MONGO_PASSWORD);

let count = 0;
const handleDisconnect = async () => {
  count++;
  console.log("Trying to connect to mongo. Attempt : " + count);

  await mongoose
    .connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => {
      if (count >= 5) {
        console.log("Mongo ERROR");
        console.error(err);
        process.exit(1);
      } else {
        setTimeout(handleDisconnect, 1000);
      }
    });
};

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));
mongoose.connection.on("error", handleDisconnect);

app.get("/getproduct", async (req, res) => {
  try {
    const { id } = req.query;
    const data = await Product.findById(id).exec();
    res.status(200).json({
      error: 0,
      data,
    });
  } catch (err) {
    console.log(err);
    res.status(500);
  }
});

app.get("/getproducts", async (req, res) => {
  try {
    const { type, category } = req.query;
    const data = await Product.find({ type, category }).exec();
    res.status(200).json({
      data,
      error: 0,
    });
  } catch (err) {
    console.log(err);
    res.status(500);
  }
});

app.post("/addProduct", async (req, res) => {
  const {
    productName,
    category,
    type,
    imageProduct,
    imageFood,
    imageFood2,
    description,
    ingredients,
    preparationMethod,
    cookingTip,
    nutrients,
  } = req.body;

  try {
    const newProduct = await Product.create({
      productName,
      category,
      type,
      imageProduct,
      imageFood,
      imageFood2,
      description,
      ingredients,
      preparationMethod,
      cookingTip,
      nutrients,
    });

    return res.status(200).json({
      status: "success",
      data: {
        newProduct,
      },
    });
  } catch {
    return res.status(500).send(err);
  }
});

app.listen(8080, () => {
  console.log(`App running on http://localhost:8080`);
});

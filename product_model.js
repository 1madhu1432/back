const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  productName: {
    type: String,
  },
  category: {
    type: String,
  },
  type: {
    type: String,
  },
  imageProduct: {
    type: String,
  },
  imageFood: {
    type: String,
  },
  imageFood2: {
    type: String,
  },
  description: {
    type: String,
  },
  ingredients: {
    type: String,
  },
  preparationMethod: {
    type: String,
  },
  cookingTip: {
    type: String,
  },
  nutrients: {
    energy: {
      type: String,
    },
    protein: {
      type: String,
    },
    carbohydrates: {
      type: String,
    },
    totalSugar: {
      type: String,
    },
    dietaryFiber: {
      type: String,
    },
    totalFat: {
      type: String,
    },
    transFat: {
      type: String,
    },
    cholesterol: {
      type: String,
    },
    potassium: {
      type: String,
    },
    iron: {
      type: String,
    },
    calcium: {
      type: String,
    },
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;

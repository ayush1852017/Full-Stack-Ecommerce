const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [(true, "Enter your Product name")],
    trim: true,
  },
  description: {
    type: String,
    required: [(true, "Enter your product description")],
  },
  price: {
    type: Number,
    required: [(true, "Enter your Product Price")],
    maxLength: [8, "price cannot be exceed 8 characters"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please Enter a product category"],
  },
  stock: {
    type: Number,
    required: [true, "Please Enter a product stock"],
    maxLength: [4, "cannot exceed stock more than 9999"],
    default: 1,
  },
  reviews: [
    {
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);

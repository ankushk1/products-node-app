const Product = require("../models/Product");

exports.createProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ name: req.body.name });
    if (product) {
      return res.status(400).json({ message: "Product already exists" });
    }
    const { name, quantity, description, price, bought_by } = req.body;
    const productCreated = await Product.create({
      name: name,
      description: description,
      quantity: quantity,
      price: price,
      bought_by: bought_by
    });

    if (!productCreated) {
      return res.status(400).json({ message: "Product creation failed" });
    }
    return res.status(200).json({ message: "Product creation successfull" });
  } catch (err) {
    return res.status(500).json({ Success: false, message: err.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({ quantity: { $gt: 0 } });
    if (products.length == 0) {
      return res.status(400).json({ message: "No products available" });
    }
    return res.status(200).json({
      productsData: products,
      message: "Product Fetched successfully"
    });
  } catch (err) {
    return res.status(500).json({ Success: false, message: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, quantity, description, price, bought_by } = req.body;
    const productUpdated = await Product.findByIdAndUpdate(productId, {
      name: name,
      description: description,
      quantity: quantity,
      price: price,
      bought_by: bought_by
    });
    if (!productUpdated) {
      return res.status(400).json({ message: "Product updation failed" });
    }
    return res.status(200).json({ message: "Product updation successfull" });
  } catch (err) {
    return res.status(500).json({ Success: false, message: err.message });
  }
};

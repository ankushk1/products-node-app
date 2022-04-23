const Product = require("../models/Product");
const User = require("../models/User");

exports.createProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ name: req.body.name });
    if (product) {
      return res.status(400).json({ message: "Product already exists" });
    }
    const { name, quantity, description, price } = req.body;
    const productCreated = await Product.create({
      name: name,
      description: description,
      quantity: quantity,
      price: price,
      created_by: req.body.user
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
    const { name, quantity, description, price } = req.body;
    const productUpdated = await Product.findByIdAndUpdate(productId, {
      name: name,
      description: description,
      quantity: quantity,
      price: price,
      updated_by: req.body.user
    });
    if (!productUpdated) {
      return res.status(400).json({ message: "Product updation failed" });
    }
    return res.status(200).json({ message: "Product updation successfull" });
  } catch (err) {
    return res.status(500).json({ Success: false, message: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const productDeleted = await Product.findByIdAndDelete(productId);
    if (!productDeleted) {
      return res.status(400).json({ message: "Product deletion failed" });
    }
    return res.status(200).json({ message: "Product deletion successfull" });
  } catch (err) {
    return res.status(500).json({ Success: false, message: err.message });
  }
};

exports.deleteProductByFilter = async (req, res) => {
  try {
    const qunatityNum = req.body.quantityNum;
    const productDeleted = await Product.findOneAndDelete({
      quantity: qunatityNum
    }); // delete first obj matching this condition
    // const productDeleted = await Product.deleteMany({quantity: 0}); // delete all objects matching this condition
    // const productDeleted = req.body.quantityNum ?  await Product.findOneAndDelete({quantity: qunatityNum}):
    // await Product.findOneAndDelete({price: {$lt: req.body.price}})
    // const productDeleted = await Product.findOneAndDelete({quantity: qunatityNum, price: req.body.price })
    if (!productDeleted) {
      return res.status(400).json({ message: "Product deletion failed" });
    }
    return res.status(200).json({ message: "Product deletion successfull" });
  } catch (err) {
    return res.status(500).json({ Success: false, message: err.message });
  }
};

exports.getProductByID = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(400).json({ message: "Error getting Product" });
    }
    const { name, description, price } = product;
    return res.status(200).json({
      productData: { name, description, price },
      message: "Fetched Product successfully"
    });
  } catch (err) {
    return res.status(500).json({ Success: false, message: err.message });
  }
};

exports.getProductByUserId = async (req, res) => {
  try {
    const userId =  req.body.user
    const products = await Product.find({ bought_by: userId });
    if (!products) {
      return res.status(400).json({ message: "Error getting Products" });
    }

    const updatedArr = products.map((product) => {
      const { name, description, price, bought_by } = product;
      return { name, description, price, bought_by: bought_by };
    });

    return res.status(200).json({
      productData: updatedArr,
      message: "Fetched Products successfully"
    });
  } catch (err) {
    return res.status(500).json({ Success: false, message: err.message });
  }
};

exports.productBought = async (req, res) => {
  try {
    const userId =  req.body.user;
    const productID = req.params.productId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "Invalid user" });
    }
    const updatedProduct = await Product.findByIdAndUpdate(productID, {
      $push: { bought_by: userId }
    });
    if (!updatedProduct) {
      return res.status(400).json({ message: "Product updation failed" });
    }
    const product = await Product.findById(productID);
    return res
      .status(200)
      .json({
        product: product,
        message: "Product updated successfully"
      });
  } catch (err) {
    return res.status(500).json({ Success: false, message: err.message });
  }
};

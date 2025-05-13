import Product from "../models/Product.js";

// Create Product
export const createProduct = async (req, res) => {
  try {
    const { company, name, rate, quantity } = req.body;

    // Check if product already exists under the company
    let product = await Product.findOne({ company, name });

    if (product) {
      // If already exists, update only quantity
      product.quantity += quantity;
      await product.save();
      return res
        .status(200)
        .json({ message: "Product quantity updated", product });
    }

    // Else create new product
    const newProduct = await Product.create({ company, name, rate, quantity });
    res.status(201).json({ message: "Product created", product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get All Products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find(); // सगळे products आणतो
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get Products by Company
export const getProductsByCompany = async (req, res) => {
  try {
    const { companyId } = req.params;
    const products = await Product.find({ company: companyId });
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Update Product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.name = name ?? product.name; // Update rate only if provided

    await product.save();
    res.status(200).json({ message: "Product updated", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const Product = require('../models/product-model');

const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        return res.status(200).json({ success: true, data: products });
    } catch (err) {
        return res.status(400).json({ success: false, error: err.message });
    }
};
const getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ success: false, error: "Product not found" });
        }
        return res.status(200).json({ success: true, data: product });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message || "Error retrieving product",
        });
    }
};

const createProduct = async (req, res) => {
    const { name, price, description } = req.body;
    if (!name || !price || !description) {
        return res.status(400).json({
            success: false,
            error: "Name, price, and description are required",
        });
    }

    const newProduct = new Product({ name, price, description });
    try {
        const savedProduct = await newProduct.save();
        return res.status(201).json({ success: true, data: savedProduct });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message || "Error creating product",
        });
    }
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, description } = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { name, price, description },
            { new: true } 
        );

        if (!updatedProduct) {
            return res.status(404).json({ success: false, error: "Product not found" });
        }

        return res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message || "Error updating product",
        });
    }
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ success: false, error: "Product not found" });
        }
        return res.status(200).json({ success: true, data: deletedProduct });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message || "Error deleting product",
        });
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct, 
    deleteProduct,
};

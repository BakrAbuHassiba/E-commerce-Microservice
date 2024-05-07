// const Product = require('../models/product-model');

// getProducts = async (req, res) => {
//     await Product.find({}, (err, products) => {
//         if (err) {
//             return res.status(400).json({ success: false, error: err });
//         }
        
//         return res.status(200).json({ success: true, data: products });
//     }).catch(err => console.log(err));
// }

// checkServiceRunning = (req, res) => {
//     res.send('Hello World! - from products service');
// }


// createProduct = async (req, res) => {
//     const { name, price, description } = req.body;
//     if (!name || !price || !description) {
//       return res.status(400).json({
//         success: false,
//         error: "Name, price, and description are required",
//       });
//     }
  
//     const newProduct = new Product({ name, price, description });
//     try {
//       const savedProduct = await newProduct.save();
//       return res.status(201).json({ success: true, data: savedProduct });
//     } catch (error) {
//       return res.status(500).json({
//         success: false,
//         error: error.message || "Error creating product",
//       });
//     }
//   };
  


// module.exports = {
//     getProducts,
//     checkServiceRunning,
//     createProduct,
// }

const Product = require('../models/product-model');

const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        return res.status(200).json({ success: true, data: products });
    } catch (err) {
        return res.status(400).json({ success: false, error: err.message });
    }
};

const checkServiceRunning = (req, res) => {
    res.send('Hello World! - from products service');
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
    checkServiceRunning,
    createProduct,
    deleteProduct,
};

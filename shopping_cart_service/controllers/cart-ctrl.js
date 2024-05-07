const Cart = require('../models/cart-model')

getProductsFromCart = async (req, res) => {
    console.log(req);
    await Cart.find({ userId: req.params.userId }, (err, cart) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }

        if (!cart) {
            return res
                .status(404)
                .json({ success: false, error: `Cart not found` });
        }
        return res.status(200).json({ success: true, data: cart });
    }).catch(err => console.log(err));
}

addProductsToCart = (req, res) => {
    const body = req.body;

    
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a cart',
        });
    }

    const cart = new Cart(body);
    console.log(cart);

    if (!cart) {
        return res.status(400).json({ success: false, error: err });
    }

    cart
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: cart._id,
                message: 'Cart created!',
            });
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Cart not created!',
            });
        });
}

checkServiceRunning = (req, res) => {
    res.send('Hello World! - from shopping cart service.');
}

module.exports = {
    getProductsFromCart,
    addProductsToCart,
    checkServiceRunning
};

// const Cart = require('../models/cart-model');

// const getProductsFromCart = async (req, res) => {
//     try {
//         const cart = await Cart.findOne({ userId: req.params.userId });
//         if (!cart) {
//             return res.status(404).json({ success: false, error: "Cart not found" });
//         }
//         return res.status(200).json({ success: true, data: cart });
//     } catch (error) {
//         return res.status(500).json({ success: false, error: error.message });
//     }
// };

// const addProductsToCart = async (req, res) => {
//     const { userId, productId, name, price, description } = req.body;

//     try {
//         const cart = await Cart.findOne({ userId });
//         if (!cart) {
//             const newCart = new Cart({
//                 userId,
//                 products: [{ productId, name, price, description }]
//             });
//             await newCart.save();
//             return res.status(201).json({ success: true, data: newCart });
//         } else {
//             cart.products.push({ productId, name, price, description });
//             await cart.save();
//             return res.status(200).json({ success: true, data: cart });
//         }
//     } catch (error) {
//         return res.status(500).json({ success: false, error: error.message });
//     }
// };

// const checkServiceRunning = (req, res) => {
//     res.send('Hello World! - from shopping cart service.');
// };

// module.exports = {
//     getProductsFromCart,
//     addProductsToCart,
//     checkServiceRunning
// };

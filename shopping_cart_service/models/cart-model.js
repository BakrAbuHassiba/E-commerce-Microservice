// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const Cart = new Schema({
//     userId: {
//         type: String,
//         required: true
//     },
//     products: [{
//         productId: {
//             type: String,
//             required: true
//         },
//         name: {
//             type: String,
//             required: true
//         },
//         price: {
//             type: Number,
//             required: true
//         },
//         description: {
//             type: String,
//             required: true
//         }
//     }]
// });

// module.exports = mongoose.model('Cart', Cart);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Cart = new Schema(
    {
        userId: { type: String, required: true },
        productId: { type: String, required: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model('carts', Cart);
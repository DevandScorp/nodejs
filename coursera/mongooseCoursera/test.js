/* eslint-disable prefer-destructuring */
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// Will add the Currency type to the Mongoose Schema types
require('mongoose-currency').loadType(mongoose);

const Currency = mongoose.Types.Currency;

// If you don't have the Currency variable declared you can use 'mongoose.Types.Currency'
const ProductSchema = Schema({
  price: { type: Currency, required: true },
});

const Product = mongoose.model('Product', ProductSchema);

const product = new Product({ price: '$1,200.55' });
console.log(product.price); // Number: 120055
console.log(product.price);
console.log(product.price);

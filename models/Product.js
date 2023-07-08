const mongoose = require('mongoose');


const connection = mongoose.connection;

const ProductSchema = mongoose.Schema({
  name: {
      type: String,
      required: true
  },
  category: {
      type: String,
      required: true
  },
  description: {
      type: String,
      required: true
  },
  price: {
      type: String,
      required: true
  },
  img: {
      type: String,
      required: true
  }
}, { collection: 'products' });

const Product = module.exports = mongoose.model('Product', ProductSchema);

// Method for getting products from database
module.exports.getProducts = async function(callback) {
  const results = await Product.find().exec()
  .catch((err) => {throw err;});
  callback(null, results);
}

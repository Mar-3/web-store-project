const mongoose = require('mongoose');


// Order Schema
const OrderSchema = mongoose.Schema({
    products: {
      type: Object,
      require: true
    },
    address: {
      type: Object,
      require: true
    },
    date: {
      type: Date,
      require: true
    },
    userId: {
      type: String,
      require: true
    }
}, { collection: 'orders' });

const Order = module.exports = mongoose.model('Order', OrderSchema);


// New order to the database
module.exports.addOrder = async function(newOrder) {
  console.log('Order.addOrder()',newOrder);
  await newOrder.save()
  .catch(err => console.log(err));
}
const mongoose = require('mongoose');


// Order Schema
const OrderSchema = mongoose.Schema({
    products: {
      type: Array,
      required: true
    },
    address: {
      type: Object,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    userId: {
      type: String,
      required: true
    }
}, { collection: 'orders' });

const Order = module.exports = mongoose.model('Order', OrderSchema);


// New order to the database
module.exports.addOrder = async function(newOrder) {
  console.log('Order.addOrder()',newOrder);
  await newOrder.save()
  .catch(err => console.log(err));
};

// Get orders from a user
module.exports.getOrders = async function(userId, callback) {
  console.log('Order.js" ', userId);
  const query = {userId : userId};
  const results = await Order.find(query).exec()
  .catch((e) => 
  {
    callback(err, null);
    throw e;  
  });
  callback(null, results);
}
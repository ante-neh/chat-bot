const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
}, { collection: 'Product' });  // Ensure collection name matches


module.exports = mongoose.model('Product', productSchema);


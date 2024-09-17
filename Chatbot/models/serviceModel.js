const mongoose = require('mongoose');
const serviceSchema = new mongoose.Schema({
}, { collection: 'Service' });  // Ensure collection name matches

module.exports = mongoose.model('Service', serviceSchema);
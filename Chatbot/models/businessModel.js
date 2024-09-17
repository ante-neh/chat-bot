const mongoose = require('mongoose');
const bussinessSchema = new mongoose.Schema({
}, { collection: 'Bussiness' });  // Ensure collection name matches

module.exports = mongoose.model('Bussiness', bussinessSchema);
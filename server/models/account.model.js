const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
  email: String,
  password: String,
}, {
  timestamps: true,
  collection: 'Account',
});


module.exports = mongoose.model('Account', AccountSchema);
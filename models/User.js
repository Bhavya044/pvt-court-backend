const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
  email: { type: String, required: true,unique:true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  username:{type:String,required:true}
});

const User = mongoose.model('Users', UsersSchema);

module.exports = User;

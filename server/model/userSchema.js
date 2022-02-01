const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(12);
const jwt = require('jsonwebtoken');
var findOrCreate = require('mongoose-findorcreate');
mongoose.plugin(findOrCreate);

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  cpassword: {
    type: String,
  },
  profession: {
    type: String,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, salt);
    this.cpassword = bcrypt.hashSync(this.cpassword, salt);
  }
  next();
});

// userSchema.methods.generateAuthToken = async function () {
//   try {
//     const token = jwt.sign(
//       { _id: this._id.toString() },
//       process.env.SECRET_KEY
//     );
//     this.tokens = this.tokens.concat({ token: token });
//     await this.save();
//     return token;
//   } catch (error) {
//     console.log(error);
//   }
// };

const User = mongoose.model('USER', userSchema);

module.exports = User;

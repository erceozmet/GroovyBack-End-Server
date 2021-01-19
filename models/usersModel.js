const mongoose = require('mongoose');

const userSchema =  new mongoose.Schema({
    firstName: {
        type: String,
    },
    secondName:{
        type: String,
    },
    userName: {
        type: String,
        required: true,
        unique:true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
}, {
    timestamps: true
})

userSchema.statics.findByLogin = async function (login) {
    let user = await this.findOne({
      userName: login,
    });
   
    if (!user) {
      user = await this.findOne({ email: login });
    }
   
    return user;
  };

userSchema.pre('remove', function(next) {
    this.model('Item').deleteMany({ user: this._id }, next);
});

const User = mongoose.model('User', userSchema)

module.exports = User;
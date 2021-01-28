const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema =  new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName:{
        type: String,
    },
    userName: {
        type: String,
        required: true,
        min:6, 
        max : 15,
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
    items: {type: mongoose.Schema.Types.ObjectId, ref: 'Item'}

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

userSchema.pre('save', function(next){
    if (!this.isModified('password'))
        return next();
    bcrypt.hash(this.password, 1, (err, passwordHash) => {
        if (err)
            return next(err)
        this.password = passwordHash;
        next();
    })
})

userSchema.methods.comparePassword = function(password, cb){
    bcrypt.compare(password, this.password, (err, isMatch)=>{
        if (err)
            return cb(err);
        else {
            if(!isMatch)
                return cb(null, isMatch);
            return cb(null, this)
        }
    })
}

const User = mongoose.model('User', userSchema)

module.exports = User;
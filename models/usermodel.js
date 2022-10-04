const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true,'User should have name']
    },
    email:{
        type: String,
        required:[true,'User should have email'],
        unique:true,
        lowercase:true,
        validate:[validator.isEmail,'give use a valid Email']
    },
    password:{
        type:String,
        required:[true,'User should have password'],
        minLength:8,
        select:false
    },
    passwordConfirm:{
        type:String,
        required:[true,'You must fill password again'],
        validate:function(){
            return this.passwordConfirm===this.password;
        }
    },
    orderDetails:[{}]
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
  });

userSchema.methods.correctPassword = async function(candidatePassword,userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
  };

const User = new mongoose.model('User',userSchema);

module.exports = User;
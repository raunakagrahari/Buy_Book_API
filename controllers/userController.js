const User = require('./../models/usermodel')
const Book = require('./../models/bookModel')
const jwt = require('jsonwebtoken');



const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });
  };

exports.Signup = async (req,res,next)=>{
    try{
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm
        })
        const Token = signToken(User._id)
        res.status(200).json({
            status:'success',
            data: newUser,
            token: Token
        })
    }catch(err){
        res.status(500).json({
            status:'Failed to create user',
            Error: err
        })
    }
}

exports.Login = async (req,res,next)=>{
    try{
        const { email, password } = req.body;
        if (!email || !password) {
          res.status(401).json({
            status:'Failed'
          })
        }
        const user = await User.findOne({ email }).select('+password');
  
        if (!user || !(await user.correctPassword(password, user.password))) {
            res.status(401).json({
                status:'Failed'
              })
        }
        const token = signToken(user._id);
        res.status(200).send({
            status:'success',
            token: token
        })
    }catch(err){
        res.status(500).json({
            status:'Someting went wrong',
            Error: err
        })
    }
}

exports.getAll = async (req,res,next)=>{
    try{
        const user = await User.find()
        res.status(200).json({
            status:'success',
            data: user
        })
    }catch(err){
        res.status(500).json({
            status:'Someting went wrong',
            Error: err
        })
    }
}

exports.getOne = async (req,res,next)=>{
    try{
        const user = await User.findById(req.params.id)
        res.status(200).json({
            status:'success',
            data: user
        })
    }catch(err){
        res.status(500).json({
            status:'Something west Wrong',
            Error: err
        })
    }
}

exports.Updateone = async (req,res,next)=>{
    try{
        const updated = await User.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        })
        if (!updated){
            res.status(500).json({
                Error: 'Something went wrong'
            })
        }
        res.status(200).json({
            status:'success',
            data: updated
        })
    }catch(err){
        res.status(500).json({
            status:'Something went wrong',
            Error:err
        })
    }
}

exports.Deleteone = async (req,res,next)=>{
    try{
        const deleted = await User.findByIdAndDelete(req.params.id)
        if (!deleted){
            res.status(500).json({
                Error: 'Something went wrong'
            })
        }
        res.status(200).json({
            status:'success',
            data: null
        })
    }catch(err){
        res.status(500).json({
            status:'Something went wrong',
            Error:err
        })
    }
}
exports.Buybook = async (req,res,next)=>{
    try{
        const username = req.body.name;
        const bookname = req.body.bookname;
        const result1 = await User.findOne({name:username});
        const result2 = await Book.findOne({ bookname: bookname });

        if (result1.name === username && result2.bookname === bookname) {
            const user = await User.findOneAndUpdate(
              {
                name: username, 
              },
              {
                $push: {
                orderDetails: result2,
                },
              },
            )
            res.status(200).json({
              status: 'OrderSuccessfull',
              data: {
                data: user,
              },
            })
          }
    }catch{
        res.status(404).json({
            status: 'Bookname or Username doesnot exist'
          })
    }
}
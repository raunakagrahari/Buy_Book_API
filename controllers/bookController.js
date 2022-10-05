const Book = require('./../models/bookModel');

exports.createBook = async (req,res,next)=>{
    try{
        const newBook = await Book.create(req.body)
        res.status(200).json({
            status:'success',
            message:'You book is now added to our library',
            newbook: newBook
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            status:'Failed',
            message:'Please provide correct information about your book',

        })
    }
}
exports.getAll = async (req,res,next)=>{
    try{
        const book = await Book.find()
        res.status(200).json({
            status:'success',
            data: book
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
        const book = await Book.findById(req.params.id)
        res.status(200).json({
            status:'success',
            data: book
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
        const updated = await Book.findByIdAndUpdate(req.params.id,req.body,{
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
        const deleted = await Book.findByIdAndDelete(req.params.id)
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
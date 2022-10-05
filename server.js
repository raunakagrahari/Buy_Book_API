const mongoose = require('mongoose');
const app = require('./app');
const dotenv = require('dotenv');

dotenv.config({path:'./config.env'});

const DB = process.env.DATABASE.replace(
    '<password>',
    process.env.PASSWORD
  );

  mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB connection successful!'));
const port = process.env.PORT || 3000;
app.listen(port,(req,res)=>{
    console.log("listening on port " + port);
})
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(express.static( __dirname + '/./public/dist/public' ));
app.use(bodyParser.json())

app.listen(8000, () => {
  console.log("LISTENING TO PORT 8000")
})


mongoose.connect('mongodb://localhost/products');
mongoose.Promise = global.Promise;

const ProductSchema = new mongoose.Schema({
  title: {type: String, 
    required: [true, "Name is required"], 
    minlength: [4, "Name has to be at least 4 characters"]},
  price: {type: Number, required: [true, "Price is required"]},
  imageUrl: {type: String}
})

mongoose.model('Product', ProductSchema);
const Product = mongoose.model('Product')


app.get('/api/products', (req, res) => {
  // get al products
  Product.find().then(result => {
    res.json({status: "success", data: result});
  }).catch(err => {
    res.json({status: "error", data: err});
  });
})

app.get('/api/products:id', (req, res) => {
  // get product by id
  Product.findById(req.params.id).then(result => {
    res.json({status: "success", data: result});
  }).catch(err => {
    const errMessages = Object.entries(err.errors).map((key, val) => 
      ({tag: key, message: val})
    )
    res.json({status: "error", data: errMessages});
  });
})

app.post('/api/products', (req, res) => {
  // post new product
  Product.create(req.body).then(result => {
    res.json({status: "success", data: result});
  }).catch(err => {
    const errMessages = Object.keys(err.errors)
      .map(key => ({tag: key, message: err.errors[key].message}));
    res.json({status: "error", data: errMessages});
  });
})

app.put('/api/products/:id', (req, res) => {
  // update product
  Product.findByIdAndUpdate(
    req.params.id, req.body, {runValidators:true ,new: true}
  ).then(result => {
    res.json({status: "success", data: result});
  }).catch(err => {
    const errMessages = Object.keys(err.errors)
      .map(key => ({tag: key, message: err.errors[key].message}));
    res.json({status: "error", data: errMessages});
  });
})

app.delete('/api/products/:id', (req, res) => {
  // delete product
  Product.findByIdAndDelete(req.params.id).then(result => {
    res.json({status: "success", data: result});
  }).catch(err => {
    res.json({status: "error", data: err});
  });

})

app.all("*", (req,res) => {
  res.sendFile(__dirname + "/./public/dist/public/index.html")
});

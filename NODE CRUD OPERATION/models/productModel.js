const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name:String,
    catid:String 
});
const productModel = mongoose.model('products', productSchema);



module.exports = productModel;
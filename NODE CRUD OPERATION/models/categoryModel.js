const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const catSchema = new Schema({
    name: String    
});
const catModel = mongoose.model('categories', catSchema);



module.exports = catModel;


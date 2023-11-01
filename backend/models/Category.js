const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CategorySchema = new Schema({
    categoryName: { type: String, unique: true,require: true  }
},
    { timestamps: true, }
);


module.exports = mongoose.model('Categories', CategorySchema);


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PriceSchema = new Schema({
    name:{
        type: String,
        require: true,
    },

    price: {
        type: Number,
        require: true
    },

},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('price', PriceSchema);


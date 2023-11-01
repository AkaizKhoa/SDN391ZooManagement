const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CageSchema = new Schema({

    name: {
        type: String,
        require: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        require: true
    },
    isEmpty: {
        type: Boolean,
        default: false
    },

    area: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "area", require: true
    }



},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('cage', CageSchema);


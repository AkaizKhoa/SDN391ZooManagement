const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AreaSchema = new Schema({
   
    name: {
        type: String,
        require: true
    },

},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('area', AreaSchema);


const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name:{
        type    : String,
        required: true
    },
    phoneNumber:{
        type    : Number,
        required: true
    },
   
    price:{
        type    : Number,
        required: true
    }
});

module.exports = mongoose.model("Prod", productSchema);
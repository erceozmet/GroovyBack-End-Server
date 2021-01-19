const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    itemName: {
        type: String,
    },
    itemType:{
        type: String,
    },
    id: {
        type: Number
    },
    age:{
        type: Number
    },
    price:{
        type: Number
    }

}, {
    timestamps: true
})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item;
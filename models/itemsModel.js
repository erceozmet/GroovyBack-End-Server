const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    itemName: {
        type: String,
    },
    itemType:{
        type: String,
    },
    age:{
        type: Number
    },
    price:{
        type: Number
    },
    description:{
        type: String,
    },
    seller: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}

}, {
    timestamps: true
})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item;
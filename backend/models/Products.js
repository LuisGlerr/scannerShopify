const {Schema, model} = require('mongoose')

const ProductSchema = new Schema({
    prodId: {type: Number},
    prodTitle: {type: String},
    id: {type: Number},
    title: {type: String},
    price: {type: Number},
    sku: {type: String},
    inventory_item_id: {type: String},
    inventory_quantity: {type: Number},
    status: {type: Number, default: 1},
    price_cost: {type: Number},
    price_may: {type: Number},
    category: {type: String},
    brand: {type: String},
    updateAt: {type: Date, default: Date.now}
})

module.exports = model('productos', ProductSchema);
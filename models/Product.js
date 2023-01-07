"use strict"
const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    nombre: { type: String, index: true },
    venta: { type: Boolean, index: true },
    precio: { type: Number, index: true },
    foto: {
        type: String, default: "https://picsum.photos/400/500"
    },
    tags: [String]
}, { collection: "products" })

productSchema.statics.list = function (filter, skip, limit, fields, maxPrice, minPrice, nombre) {
    let query = Product.find(filter)
    if (nombre) {
        query = query.find({ nombre: { $regex: `^${nombre}`, $options: "i" } })
    }
    if (maxPrice) {
        query = query.find({ precio: { $lte: maxPrice } })
    }
    if (minPrice) {
        query = query.find({ precio: { $gte: minPrice } })
    }
    query.skip(skip)
    query.limit(limit)
    query.select(fields)
    return query.exec()

}
productSchema.statics.listTags = function () {
    const fields = "tags -_id"
    let query = Product.find()
    query.select(fields)
    return query.exec()
}
const Product = mongoose.model("Product", productSchema)
module.exports = Product

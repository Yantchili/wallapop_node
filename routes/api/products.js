"use strict"
const express = require('express')
const { model } = require('mongoose')
const Product = require("../../models/Product")
const router = express.Router()
//Lista de anuncios
router.get("/", async (req, res, next) => {
    try {
        const skip = req.query.skip
        const limit = req.query.limit
        const fields = req.query.fields
        const nombre = req.query.nombre
        const tags = req.query.tags
        const venta = req.query.venta
        const precio = req.query.precio
        const maxPrice = parseFloat(req.query.max)
        const minPrice = parseFloat(req.query.min)
        const filter = {}

        if (precio) {
            filter.precio = precio
        }
        if (tags) {
            filter.tags = tags
        }
        if (venta) {
            filter.venta = venta
        }
        const searchedProducts = await Product.list(filter, skip, limit, fields, maxPrice, minPrice, nombre)
        res.json({ Result: searchedProducts })
    }
    catch (err) {
        next(err)
    }
})
//Buscar anuncios con id

router.get("/:id([0-9a-fA-F]{24})", async (req, res, next) => {
    try {
        const id = req.params.id
        const result = await Product.findById(id)
        res.json({ result })
    }
    catch (err) {
        next(err)
    }
})
//lista de tag existentes

router.get("/tags", async (req, res, next) => {
    try {
        const result = await Product.listTags()
        const listTags = []
        for (let object of result) {
            object.tags.forEach(element => {
                if (!listTags.includes(element)) {
                    listTags.push(element)
                }
            });
        }
        res.json({ listTags })
    }
    catch (err) {
        next(err)
    }
})

//crear un nuevo producto
router.post("/", async (req, res, next) => {
    try {
        const newProductData = {
            nombre: req.body.nombre,
            venta: req.body.venta,
            precio: req.body.precio,
            tags: req.body.tags,
            foto: req.body.foto
        }
        const newProduct = new Product(newProductData)
        await newProduct.save()
        res.json({ ProductoCreado: newProduct })

    }
    catch (err) {
        next(err)
    }
})

//actualizar un producto
router.put('/:id([0-9a-fA-F]{24})', async (req, res, next) => {
    try {
        const id = req.params.id;
        const newProductData = req.body;
        const productoActualizado = await Product.findOneAndUpdate({ _id: id }, newProductData, {
            new: true
        });

        res.json({ result: productoActualizado });

    } catch (err) {
        next(err);
    }
});

//Eliminar un producto
router.delete("/:id([0-9a-fA-F]{24})", async (req, res, next) => {
    try {
        const id = req.params.id
        const productoEliminado = await Product.findByIdAndDelete({ _id: id })
        res.json({ Deleted: productoEliminado })
    }
    catch (err) {
        next(err);
    }
})
module.exports = router
"use strict"
const express = require('express')
const { model } = require('mongoose')
const { render } = require('../../app')
const Product = require("../../models/Product")
const router = express.Router()

router.get("/", async (req, res, next) => {
    try {
        res.render("home")
    }
    catch (err) {
        next(err)
    }
})
router.get("/all_roduct", async (req, res, next) => {
    try {
        const searchedProducts = await Product.find({})
        res.render("index", { searchedProducts })
    }
    catch (err) {
        next(err)
    }
})
router.get("/search_result?:nombre", async (req, res, next) => {
    try {
        const nombre = req.query.nombre
        const searchedProducts = await Product.find({ nombre: { $regex: `^${nombre}`, $options: "i" } })
        if (searchedProducts.length > 0) {
            res.render("index", { searchedProducts })
        } else {
            const allProducts = await Product.find({})
            res.render("no_result", { nombre, allProducts })
        }
    }
    catch (err) {
        next(err)
    }
})
router.get("/:id([0-9a-fA-F]{24})", async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id)
        if (product) {
            console.log(product)
            res.render("detail", { product })
        }

    }

    catch (err) {
        next(err)
    }
}
)
router.get("/edit/:id([0-9a-fA-F]{24})", async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id)
        if (product) {
            res.render("edit", { product })
        }

    }

    catch (err) {
        next(err)
    }
}
)
router.post('/:id([0-9a-fA-F]{24})', async (req, res, next) => {
    try {
        const id = req.params.id;
        const newProductData = {
            nombre: req.body.nombre,
            venta: req.body.venta,
            precio: req.body.precio,
            tags: req.body.tags,
            foto: req.body.foto
        }
        const productoActualizado = await Product.findOneAndUpdate({ _id: id }, newProductData, {
            new: true
        });
        console.log(productoActualizado)
        res.redirect(`/${id}`)

    } catch (err) {
        next(err);
    }
});
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
        res.redirect(`/${newProduct._id}`)

    }
    catch (err) {
        next(err)
    }
})
router.get("/new", (req, res) => {
    res.render("add_product")
}
)
router.get("/delete/:id([0-9a-fA-F]{24})", async (req, res, next) => {
    try {
        const id = req.params.id
        const productoEliminado = await Product.findByIdAndDelete({ _id: id })
        const searchedProducts = await Product.find({})
        res.redirect("/all_roduct")
    }

    catch (err) {
        next(err)
    }
}
)

module.exports = router
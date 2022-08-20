import express, { Router } from "express";
import asyncHandler from 'express-async-handler'
const router = express.Router()

import Product from '../models/productModel.js'


//fetch all products
// Get /api/products
// Public route
router.get('/', asyncHandler(async (req, res) => {
    const products = await Product.find({})

    res.json(products)
}))

//fetch single product
// Get /api/products/:id
// Public route
router.get('/:id', asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found!')
    }
}))

export default router
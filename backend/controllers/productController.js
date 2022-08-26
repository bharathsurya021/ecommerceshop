import asyncHandler from 'express-async-handler'

import Product from '../models/productModel.js'

//fetch all products
// Get /api/products
// Public route
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})

    res.json(products)
})

//fetch single product
// Get /api/products/:id
// Public route
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found!')
    }
})

//delete a product
// Delete /api/products/:id
// Private/admin route
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {

        await product.remove()
        res.send({ message: 'Product removed' })
    } else {
        res.status(404)
        throw new Error('Product not found!')
    }
})

export { getProductById, getProducts, deleteProduct }
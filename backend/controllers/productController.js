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

//create a product
// Post /api/products
// Private/admin route
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample Brand',
        category: 'Sample Category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample Description'
    })

    const createdProduct = await product.save()

    res.status(201).json(createdProduct)
})


//update a product
// Put /api/products/:id
// Private/admin route
const updateProduct = asyncHandler(async (req, res) => {
    const {
        name,
        price,
        brand,
        category,
        description,
        image,
        countInStock
    } = req.body
    const product = await Product.findById(req.params.id)

    if (product) {
        product.name = name
        product.price = price
        product.description = description
        product.brand = brand
        product.category = category
        product.image = image
        product.countInStock = countInStock

        const updatedProduct = await product.save()
        res.status(201).json(updatedProduct)

    } else {
        res.status(404)
        throw new Error('productn not found')
    }


})


export { getProductById, getProducts, deleteProduct, createProduct, updateProduct }
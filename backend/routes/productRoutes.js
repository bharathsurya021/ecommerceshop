import express from "express";
const router = express.Router()
import { getProductById, getProducts } from '../controllers/productController.js'

//fetch all products
// Get /api/products
// Public route
router.route('/').get(getProducts)

//fetch single product
// Get /api/products/:id
// Public route
router.route('/:id').get(getProductById)
export default router
import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
dotenv.config()

connectDB()
const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.get('/', (req, res) => {
    res.send('Api is running')
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID)
})

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on http://localhost:${PORT}`))
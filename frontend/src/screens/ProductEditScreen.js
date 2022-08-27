import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProductDetails, updateProduct } from '../actions/productActions'
import FormContainer from '../components/FormContainer'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

const ProductEditScreen = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState('')
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)


    const navigate = useNavigate()
    const params = useParams()
    const productId = params.id

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate

    useEffect(() => {

        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            navigate('/admin/productlist')
        } else {
            if (!product.name || product._id !== productId) {
                dispatch(listProductDetails(productId))
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }

        }

    }, [dispatch, productId, successUpdate, navigate, product])

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }

            const { data } = await axios.post('/api/upload', formData, config)

            setImage(data)
            setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        //Dispatch update

        dispatch(updateProduct({
            _id: productId,
            name, price, brand, category, description, image, countInStock
        }))

    }
    return (
        <>
            <Link to='/admin/productlist' className='btn btn-light my-3'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit Product</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name' className='mb-3'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='name' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='price' className='mb-3'>
                            <Form.Label>price</Form.Label>
                            <Form.Control type='number' placeholder='Enter Price' value={price} onChange={(e) => setPrice(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='image-file' className='mb-3'>
                            <Form.Label>Image</Form.Label>
                            <Form.Control type='text' placeholder='Enter image url' value={image} onChange={(e) => setImage(e.target.value)}></Form.Control>
                            <Form.Control type="file" label="Choose file" onChange={uploadFileHandler} />

                            {uploading && <Loader />}

                        </Form.Group>

                        <Form.Group controlId='brand' className='mb-3'>
                            <Form.Label>Brand</Form.Label>
                            <Form.Control type='text' placeholder='Enter brand' value={brand} onChange={(e) => setBrand(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='countInStock' className='mb-3'>
                            <Form.Label>CountInStock</Form.Label>
                            <Form.Control type='number' placeholder='Enter countInStock' value={countInStock} onChange={(e) => setCountInStock(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='category' className='mb-3'>
                            <Form.Label>Category</Form.Label>
                            <Form.Control type='text' placeholder='Enter category' value={category} onChange={(e) => setCategory(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='description' className='mb-3'>
                            <Form.Label>description</Form.Label>
                            <Form.Control type='text' placeholder='Enter description' value={description} onChange={(e) => setDescription(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Button type='submit' variant='primary' onClick={() => submitHandler}>
                            Update
                        </Button>

                    </Form>
                )}

            </FormContainer>
        </>

    )
}

export default ProductEditScreen
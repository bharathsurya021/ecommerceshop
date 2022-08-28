import React, { useEffect } from 'react'
// import products from '../products'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Product from '../components/Product'
import { Col, Row } from 'react-bootstrap'
import { listProducts } from '../actions/productActions'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import Message from '../components/Message'
import ProductCarousel from '../components/ProductCarousel'

const HomeScreen = () => {
    const params = useParams()
    const keyword = params.keyword
    const pageNumber = params.pageNumber || 1
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products, page, pages } = productList
    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber))

    }, [dispatch, keyword, pageNumber])

    // const products = []


    return (
        <>
            {!keyword && <ProductCarousel />}
            <h1>Latest Products</h1>
            {loading ? <Loader /> : error ? <Message variant='danger'>
                {error}</Message> :

                <>
                    <Row>
                        {products.map(product => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
                    <Paginate page={page} pages={pages} keyword={keyword ? keyword : ''} />
                </>


            }

        </>
    )
}

export default HomeScreen
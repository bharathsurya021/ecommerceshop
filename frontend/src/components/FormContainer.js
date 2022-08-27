import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const FormContainer = ({ children }) => {
    return (
        <Container className='mx-auto my-0 w-50' >
            <Row className='justify-content-md-center  '>
                <Col xs={12} md={12} >
                    {children}
                </Col>
                <Col></Col>
            </Row>
        </Container>
    )
}

export default FormContainer
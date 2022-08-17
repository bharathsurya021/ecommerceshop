import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Container, Nav, Navbar } from 'react-bootstrap'

const Header = () => {
    return (
        <header>
            <Navbar bg="dark" variant='dark' expand="lg">
                <Container >
                    <LinkContainer to='/'>

                        <Navbar.Brand>E-SHOP</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="ml-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <LinkContainer to={`/cart`}>
                                <Nav.Link > <i className='fas fa-shopping-cart'></i> Cart</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to={`/login`}>
                                <Nav.Link><i className='fas fa-user'></i>Sign In</Nav.Link>
                            </LinkContainer>


                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
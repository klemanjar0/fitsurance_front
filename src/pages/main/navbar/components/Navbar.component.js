import React from "react";
import {Button, Container, Form, FormControl, Nav, Navbar} from "react-bootstrap";
import './Navbar.css';
import {Link} from "react-router-dom";


function NavbarComponent(){
    return(
        <Navbar bg="light" variant="light">
            <Container style = {{width:'100%'}}>
                <Navbar.Brand>
                    <Link to="/" style={{ textDecoration: 'none' }}>FitSurance</Link>
                </Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link>
                        <Link to="/">Home</Link>
                    </Nav.Link>
                    <Nav.Link>
                        <Link to="/">Features</Link>
                    </Nav.Link>
                    <Nav.Link>
                        <Link to="/">Pricing</Link>
                    </Nav.Link>
                    <Nav.Link>
                        <Link to="/">Dashboard</Link>
                    </Nav.Link>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search FitSurance" className="mr-sm-2" />
                    <Button variant="link" style={{ textDecoration: 'none' }}>
                        <Link to="/login" style={{ textDecoration: 'none' }}>Sign In</Link>
                    </Button>
                    <Button variant="outline-primary">
                        <Link to="/registration">Sign Up</Link>
                    </Button>
                </Form>
            </Container>
        </Navbar>
    );
}
export default NavbarComponent;

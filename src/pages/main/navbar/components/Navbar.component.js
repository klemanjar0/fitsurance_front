import React, {useCallback, useState} from "react";
import {Button, ButtonGroup, Container, Form, FormControl, Nav, Navbar, ToggleButton} from "react-bootstrap";
import './Navbar.css';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setLocale } from '../../../../actions/Locale.actions'

function NavbarComponent(){

    const dispatch = useDispatch();
    const lang = useSelector(state => state.locale.language)
    const setEnglish = useCallback(() => {
        dispatch({type: setLocale(), payload : {language: 'en'}});
    }, []);

    const setUkrainian = useCallback(() => {
        dispatch({type: setLocale(), payload : {language: 'ua'}});
    }, []);


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
            <ButtonGroup aria-label="language">
                <Button variant={lang === 'en' ? "outline-secondary" : "outline-primary"} disabled={lang === 'en'} onClick={setEnglish}>EN</Button>
                <Button variant={lang === 'ua' ? "outline-secondary" : "outline-primary"} disabled={lang === 'ua'} onClick={setUkrainian}>UA</Button>
            </ButtonGroup>
        </Navbar>
    );
}
export default NavbarComponent;

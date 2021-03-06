import React, {useCallback, useEffect, useState} from "react";
import {
    Badge,
    Button,
    ButtonGroup,
    Container,
    Form,
    FormControl,
    Image,
    Nav,
    Navbar,
    ToggleButton
} from "react-bootstrap";
import './Navbar.css';
import {BrowserRouter as Router, Link, Redirect} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setLocale } from '../../../../actions/Locale.actions'

import { EOLocale } from 'eo-locale';
import { locales } from './Locale'
import {clearCurrentUser} from "../../../../actions/SignUp.actions";
import storage from "../../../../store/sessionStore";
import {clearDiscount, clearMeasures, clearPulse, clearSteps} from "../../../../actions/Measure.actions";
import IconLogo from '../rpg_fantasy.png'

function NavbarComponent(){

    const isAuth = useSelector((state) => !!state.currentUser.name);

    const userCurrent = useSelector((state) => state.currentUser);

    const discount = useSelector((state) => state.app.discount);

    const dispatch = useDispatch();
    const lang = useSelector(state => state.locale.language)
    const setEnglish = useCallback(() => {
        dispatch({type: setLocale(), payload : {language: 'en'}});
    }, []);

    const setUkrainian = useCallback(() => {
        dispatch({type: setLocale(), payload : {language: 'ua'}});
    }, []);

    const logoutUser = () => {
        dispatch({type: clearCurrentUser()})
        dispatch({type: clearSteps()})
        dispatch({type: clearMeasures()})
        dispatch({type: clearPulse()})
        dispatch({type: clearDiscount()})
        storage.clearUser();
        return (<Redirect to="/"/>);
    }
    useEffect(()=>{

    },[discount])
    return(
        <>
            <EOLocale.Provider language={lang} locales={locales}>

        <Navbar bg="light" variant="light" sticky="top">
            <Container  style = {{width:'100%'}}>
                <Navbar.Brand className='text-uppercase'>
                    <Link to="/" style={{ textDecoration: 'none'}}><b>FitSurance</b></Link>
                </Navbar.Brand>
                <Nav className="mr-auto">
                    {
                        !isAuth && <>
                        <Nav.Link>
                            <Link to="/"><EOLocale.Text id="features"/></Link>
                        </Nav.Link>

                        </>
                    }

                    {
                        isAuth &&<> <Nav.Link>
                            <Link to="/dashboard"><EOLocale.Text id="dashboard"/></Link>
                        </Nav.Link>
                        <Nav.Link>
                        <Link to="/pricing"><EOLocale.Text id="pricing"/></Link>
                        </Nav.Link>
                        </>
                    }

                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder={lang === 'en' ? 'Search FitSurance' : '?????????? ???? FitSurance'} className="mr-sm-2" />

                    {
                        isAuth ?
                            <Button variant="link" onClick={logoutUser} style={{ textDecoration: 'none', color: 'red' }}>
                                <EOLocale.Text id="signOut"/>
                            </Button> :
                            <Button variant="link" style={{ textDecoration: 'none' }}>
                                <Link to="/login" style={{ textDecoration: 'none' }}><EOLocale.Text id="signIn"/></Link>
                            </Button>
                    }

                    <Button variant="outline-primary">
                        {isAuth ? <Link to="/profile">{userCurrent.name}</Link> : <Link to="/registration"><EOLocale.Text id="signUp"/></Link>}
                        {isAuth && <Badge style={{marginLeft: '10px'}} variant="success">{discount}%</Badge>}
                    </Button>
                </Form>
            </Container>
            <ButtonGroup aria-label="language" style={{paddingBlock: '5px', marginBlock: '5px'}}>
                <Button variant={lang === 'en' ? "outline-secondary" : "outline-primary"} disabled={lang === 'en'} onClick={setEnglish}>EN</Button>
                <Button variant={lang === 'ua' ? "outline-secondary" : "outline-primary"} disabled={lang === 'ua'} onClick={setUkrainian}>UA</Button>
            </ButtonGroup>
        </Navbar>

            </EOLocale.Provider>
        </>
    );
}
export default NavbarComponent;

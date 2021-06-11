import React from "react";
import './Home.css';
import {Alert, Button, Card, Col, Container, Row, ToastHeader} from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";
import bg from "../assets/insurance001.jpg";
import bg1 from "../assets/bg.jpg";
import { EOLocale } from 'eo-locale';
import { locales } from './Locale'

import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

function HomeComponent(){

    const lang = useSelector(state => state.locale.language)

    const font = {
        fontFamily: "Lato",
        marginTop: '1rem'
    }
    return(
        <EOLocale.Provider language={lang} locales={locales}>

        <div style={{color: 'white'}}>
            <div className="wrapper">
                <ModalHeader>
                    <h1 style={{fontSize : '65px', color: 'white'}}>
                        <b>FitSurance</b>
                    </h1>
                </ModalHeader>
            </div>

            <Row>
                <Col className="h-75 m-auto">
                    <div style={{width: '80%', marginLeft: '5rem', paddingTop: '5rem', paddingBottom: '5rem', color: 'black', backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: '2rem'}}>
                        <div style={{fontSize: 'xx-large', textAlign: 'center', padding: '1rem'}}>
                            <Alert variant='light'><EOLocale.Text id="alert"/></Alert>
                        </div>

                        <div style={{marginLeft:'3rem', marginRight: '3rem'}}>
                            <EOLocale.Text id="content"/>
                        </div>
                        <div style={{margin:'1rem'}}>
                            <Link to="/registration">
                                <Button block variant="light" className="w-75 m-auto">
                                    <EOLocale.Text id="btn"/>
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Col>
                <Col xs={7}>
                    <div style={{paddingTop : '33px', width: '80%'}}>
                        <h1 className="myh1 text-center">
                            <EOLocale.Text id="h1"/>
                        </h1>
                        <div className="mytext" style={{marginTop:'1rem'}}>
                            <EOLocale.Text id="description"/>
                            </div>
                        <div style={font}>
                            <ul>
                                <li>
                                    <EOLocale.Text id="l1"/>
                                </li>
                                <li>
                                    <EOLocale.Text id="l2"/>
                                </li>
                                <li>
                                    <EOLocale.Text id="l3"/>
                                </li>
                            </ul>
                        </div>
                        <div className="text-center mb-3" >
                            <img src={bg} style={{width:'75%', opacity:'80%', borderRadius: "8px", margin: 'auto'}}/>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
        </EOLocale.Provider>
    );
}
export default HomeComponent;

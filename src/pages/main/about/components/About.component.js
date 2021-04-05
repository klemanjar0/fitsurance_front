import './About.css';
import React from "react";
import {Badge, Col, Container, ListGroup, ListGroupItem, NavLink, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import DividerComponent from "../../divider/components/Divider.component";
import {useSelector} from "react-redux";

import { EOLocale } from 'eo-locale';
import { locales } from './Locale'


function AboutComponent() {

    const lang = useSelector(state => state.locale.language)

    const aboutStyle = {
        margin : '0 auto',
        marginBlock : '1rem',
        marginBottom : '0px',
        backgroundColor : "white",
    };

    return (
        <EOLocale.Provider language={lang} locales={locales}>
        <div style={aboutStyle} className="wrapper">
                <DividerComponent/>
                <Container>
                    <Row>
                        <Col>
                            <h1 className="mt-4">
                                <Badge variant="dark">FitSurance</Badge>
                            </h1>
                            © 2021
                        </Col>
                        <Col>
                            <h4><EOLocale.Text id="features"/></h4>
                                <Link className="text-black-50"><EOLocale.Text id="newFeatures"/></Link><br/>
                                <Link className="text-black-50"><EOLocale.Text id="lastUpdates"/></Link><br/>
                                <Link className="text-black-50"><EOLocale.Text id="algorithms"/></Link><br/>
                        </Col>
                        <Col>
                            <h4><EOLocale.Text id="resources"/></h4>
                            <Link className="text-black-50">GitHub</Link><br/>
                            <Link className="text-black-50">Twitter</Link><br/>
                            <Link className="text-black-50">React</Link><br/>
                        </Col>
                        <Col>
                            <h4><EOLocale.Text id="about"/></h4>
                            <Link className="text-black-50"><EOLocale.Text id="team"/></Link><br/>
                            <Link className="text-black-50"><EOLocale.Text id="locations"/></Link><br/>
                            <Link className="text-black-50"><EOLocale.Text id="privacy"/></Link><br/>
                            <Link className="text-black-50"><EOLocale.Text id="terms"/></Link><br/>
                        </Col>
                    </Row>
                    <br/>
                </Container>
        </div>
        </EOLocale.Provider>
    )
}

export default AboutComponent;

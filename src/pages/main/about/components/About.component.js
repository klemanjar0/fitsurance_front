import './About.css';
import React from "react";
import {Badge, Col, Container, ListGroup, ListGroupItem, NavLink, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import DividerComponent from "../../divider/components/Divider.component";

function AboutComponent() {
    const aboutStyle = {
        margin : '0 auto',
        marginBlock : '2rem',
        marginBottom : '0px',
        backgroundColor : "#F9F9FA",
    };

    return (
        <div style={aboutStyle}>
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
                            <h4>Features</h4>
                                <Link className="text-black-50">New Features</Link><br/>
                                <Link className="text-black-50">Last Updates</Link><br/>
                                <Link className="text-black-50">Algorithms</Link><br/>
                        </Col>
                        <Col>
                            <h4>Resources</h4>
                            <Link className="text-black-50">Github</Link><br/>
                            <Link className="text-black-50">Twitter</Link><br/>
                            <Link className="text-black-50">React</Link><br/>
                        </Col>
                        <Col>
                            <h4>About</h4>
                            <Link className="text-black-50">Team</Link><br/>
                            <Link className="text-black-50">Locations</Link><br/>
                            <Link className="text-black-50">Privacy</Link><br/>
                            <Link className="text-black-50">Terms</Link><br/>
                        </Col>
                    </Row>
                    <br/>
                </Container>
        </div>
    )
}

export default AboutComponent;

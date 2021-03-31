import React from "react";
import './SignIn.css';
import {Button, Card, Form} from "react-bootstrap";
import AboutComponent from "../../main/about/components/About.component";


function SighInComponent(){
    return(
        <div>
            <Card>
                <h1 style={{float: "Left", margin: "12px"}}><b>Log In</b></h1>
                <Card.Body>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-5 float-right">
                            Log In
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}
export default SighInComponent;

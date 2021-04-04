import {Button, Card, Col, Form, InputGroup, Row} from "react-bootstrap";
import {useState} from "react";
import AboutComponent from "../../main/about/components/About.component";
import {Link} from "react-router-dom";

function SignUpComponent(){
    const [validated, setValidated] = useState(false);
    const [user, setUser] = useState({});

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };
    return(
        <div>
            <Card>
                <h1 style={{float: "Left", margin: "12px"}}><b>Register New User</b></h1>
                <Card.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group as={Row} controlId="formHorizontalEmail">
                            <Form.Label column sm={2}>
                                Email
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="email" placeholder="Email" pattern="^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$" required/>
                                <Form.Control.Feedback type="invalid">
                                    Please enter correct e-mail
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formBasicPassword">
                            <Form.Label column sm={2}>
                                Password
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="password" placeholder="Password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" required/>
                                <Form.Control.Feedback type="invalid">
                                    Please provide strong password, use at least one letter, number, and capital letter
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
            <br/>
            <Card>
                <Card.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Row>
                            <Form.Group as={Col} md="4" controlId="validationCustom01">
                                <Form.Label>First name</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="First name"
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="validationCustom02">
                                <Form.Label>Last name</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Last name"
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                                <Form.Label>Username</Form.Label>
                                <InputGroup hasValidation>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control
                                        type="text"
                                        placeholder="Username"
                                        aria-describedby="inputGroupPrepend"
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please choose a username.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="6" controlId="validationCustom03">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control type="text" placeholder="Phone" pattern=".{10}" required />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid phone.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="6" controlId="validationCustom04">
                                <Form.Label>Sex</Form.Label>
                                <Form.Control as="select" defaultValue="Choose...">
                                    <option>Male</option>
                                    <option>Female</option>
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="6" controlId="validationCustom05">
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="text" placeholder="Description (You can justify you blood type, disability, or other)" />
                            </Form.Group>
                            <Form.Group as={Col} md="6" controlId="validationCustom05">
                                <Form.Label>Birthday</Form.Label>
                                <Form.Control type="text" placeholder="Enter your birth day." pattern="\d{4}-\d{2}-\d{2}" required />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid birthday like 2021-12-21.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Form.Group>
                            <Form.Check
                                required
                                label="Agree to terms and conditions"
                                feedback="You must agree before submitting."
                            />
                        </Form.Group>
                        <Form.File
                            id="custom-file"
                            label="Pick a photo for your profile (unavailable in beta yet)"
                            custom
                        />
                        <Button type="submit" className="mt-5 float-right">Register</Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}
export default SignUpComponent;

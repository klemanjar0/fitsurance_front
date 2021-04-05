import {Button, Card, Col, Form, InputGroup, Row} from "react-bootstrap";
import React, {useCallback, useEffect, useState} from "react";
import AboutComponent from "../../main/about/components/About.component";
import {useDispatch, useSelector} from "react-redux";
import {setLocale} from "../../../actions/Locale.actions";
import { Link, Redirect } from 'react-router-dom';
import {userRegisterRequest} from "../../../thunks/User.thunks";
import { EOLocale } from 'eo-locale';
import { locales } from './Locale'

function SignUpComponent(){
    const [validated, setValidated] = useState(false);
    const [user, setUser] = useState({});
    const isAuth = useSelector((state) => !!state.currentUser.name);
    const lang = useSelector(state => state.locale.language)
    const dispatch = useDispatch();


    const handleSubmit = (event) => {
        event.preventDefault()
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };

    // useEffect(()=>{
    //     console.log(user)
    //     console.log(isAuth)
    // },[user])


    const registerUser = () => {
        return dispatch(userRegisterRequest(user));
    }

    if (isAuth) {
        return (<Redirect to="/"/>);
    }
    return(
        <div>
            <EOLocale.Provider language={lang} locales={locales}>
            <Card bg='light'>
                <h1 style={{ textAlign: 'left', margin: "1rem"}}><b><EOLocale.Text id="registerNew"/></b></h1>
                <hr/>
                <Card.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group as={Row} controlId="formHorizontalEmail">
                            <Form.Label column sm={2}>
                                E-mail
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="email" placeholder="Email" onChange={(event) => {
                                    setUser(
                                            (prevState) => {
                                                return {...prevState, email: event.target.value}
                                            }
                                        )
                                }} pattern="^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$" required/>
                                <Form.Control.Feedback type="invalid">
                                    Please enter correct e-mail
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formBasicPassword">
                            <Form.Label column sm={2}>
                                <EOLocale.Text id="password"/>
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="password" placeholder="Password" onChange={(event) => {
                                    setUser(
                                        (prevState) => {
                                            return {...prevState, password: event.target.value}
                                        }
                                    )
                                }} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" required/>
                                <Form.Control.Feedback type="invalid">
                                    Please provide strong password, use at least one letter, number, and capital letter
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
            <br/>
            <Card bg='light'>
                <Card.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Row>
                            <Form.Group as={Col} md="4" controlId="validationCustom01">
                                <Form.Label><EOLocale.Text id="firstname"/></Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    onChange={(event) => {
                                        setUser(
                                            (prevState) => {
                                                return {...prevState, firstname: event.target.value}
                                            }
                                        )
                                    }}
                                    placeholder="First name"
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="validationCustom02">
                                <Form.Label><EOLocale.Text id="lastname"/></Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    onChange={(event) => {
                                        setUser(
                                            (prevState) => {
                                                return {...prevState, lastname: event.target.value}
                                            }
                                        )
                                    }}
                                    placeholder="Last name"
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                                <Form.Label><EOLocale.Text id="username"/></Form.Label>
                                <InputGroup hasValidation>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control
                                        type="text"
                                        placeholder="Username"
                                        onChange={(event) => {
                                            setUser(
                                                (prevState) => {
                                                    return {...prevState, name: event.target.value}
                                                }
                                            )
                                        }}
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
                                <Form.Label><EOLocale.Text id="phone"/></Form.Label>
                                <Form.Control type="text" placeholder="Phone" onChange={(event) => {
                                    setUser(
                                        (prevState) => {
                                            return {...prevState, phone: event.target.value}
                                        }
                                    )
                                }}pattern=".{10}" required />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid phone.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="6" controlId="validationCustom04">
                                <Form.Label><EOLocale.Text id="sex"/></Form.Label>
                                <Form.Control as="select" onChange={(event) => {
                                    setUser(
                                        (prevState) => {
                                            return {...prevState, sex: event.target.value}
                                        }
                                    )
                                }}>
                                    <option>Undefined Sex</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="6" controlId="validationCustom05">
                                <Form.Label><EOLocale.Text id="description"/></Form.Label>
                                <Form.Control type="text" onChange={(event) => {
                                    setUser(
                                        (prevState) => {
                                            return {...prevState, description: event.target.value}
                                        }
                                    )
                                }} placeholder="Description (You can justify you blood type, disability, or other)" />
                            </Form.Group>
                            <Form.Group as={Col} md="6" controlId="validationCustom06">
                                <Form.Label><EOLocale.Text id="birthday"/></Form.Label>
                                <Form.Control type="text" placeholder="Enter your birth day." onChange={(event) => {
                                    setUser(
                                        (prevState) => {
                                            return {...prevState, birthday: event.target.value}
                                        }
                                    )
                                }} pattern="\d{4}-\d{2}-\d{2}" required />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid birthday like 2021-12-21.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Form.Group>
                            <Form.Check
                                required
                                label={lang === 'en' ? 'Agree to terms and conditions' : 'Приймаю умови використання'}
                                feedback="You must agree before submitting."
                            />
                        </Form.Group>
                        <Form.File
                            id="custom-file"
                            label="Pick a photo for your profile (unavailable in beta yet)"
                            custom
                            onChange={(event) => {
                                setUser(
                                    (prevState) => {
                                        return {...prevState, image: event.target.value}
                                    }
                                )
                            }}
                        />
                        <Button type="submit" className="mt-5 float-right" onClick={registerUser}><EOLocale.Text id="register"/></Button>
                    </Form>
                </Card.Body>
            </Card>
            </EOLocale.Provider>
        </div>
    );
}
export default SignUpComponent;

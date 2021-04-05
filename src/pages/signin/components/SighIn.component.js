import React, {useState} from "react";
import './SignIn.css';
import {Button, Card, Form} from "react-bootstrap";
import AboutComponent from "../../main/about/components/About.component";
import {useDispatch, useSelector} from "react-redux";
import {userLoginRequest, userRegisterRequest} from "../../../thunks/User.thunks";
import {Redirect} from "react-router-dom";
import { EOLocale } from 'eo-locale';
import { locales } from './Locale'

function SighInComponent(){
    const [userLog, setUserLog] = useState({});
    const isAuth = useSelector((state) => !!state.currentUser.name);
    const lang = useSelector(state => state.locale.language)
    const dispatch = useDispatch();

    const loginUser = () => {
        return dispatch(userLoginRequest(userLog));
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
    };

    if (isAuth) {
        return (<Redirect to="/"/>);
    }

    return(
        <div style={{minHeight: 'calc(65vh - 50px)'}}>
            <EOLocale.Provider language={lang} locales={locales}>
            <Card bg='light'>
                <h1 style={{float: "Left", margin: "12px"}}><b><EOLocale.Text id="log"/></b></h1>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" onChange={(event) => {
                                setUserLog(
                                    (prevState) => {
                                        return {...prevState, email: event.target.value}
                                    }
                                )
                            }} placeholder="Enter email" />
                            <Form.Text className="text-muted">
                                <EOLocale.Text id="tint"/>
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label><EOLocale.Text id="password"/></Form.Label>
                            <Form.Control type="password" onChange={(event) => {
                                setUserLog(
                                    (prevState) => {
                                        return {...prevState, password: event.target.value}
                                    }
                                )
                            }} placeholder="Password" />
                        </Form.Group>
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label={lang === 'en' ? "Check me out" : 'Залишатися у системi'} />
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={loginUser} className="mt-5 float-right">
                            <EOLocale.Text id="login"/>
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            </EOLocale.Provider>
        </div>
    );
}
export default SighInComponent;

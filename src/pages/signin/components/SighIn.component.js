import React, {useState} from "react";
import './SignIn.css';
import {Button, Card, Form} from "react-bootstrap";
import AboutComponent from "../../main/about/components/About.component";
import {useDispatch, useSelector} from "react-redux";
import {userLoginRequest, userRegisterRequest} from "../../../thunks/User.thunks";
import {Redirect} from "react-router-dom";


function SighInComponent(){
    const [userLog, setUserLog] = useState({});
    const isAuth = useSelector((state) => !!state.currentUser.name);

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
        <div style={{minHeight: 'calc(72vh - 50px)'}}>
            <Card bg='light'>
                <h1 style={{float: "Left", margin: "12px"}}><b>Log In</b></h1>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" onChange={(event) => {
                                setUserLog(
                                    (prevState) => {
                                        return {...prevState, email: event.target.value}
                                    }
                                )
                            }} placeholder="Enter email" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" onChange={(event) => {
                                setUserLog(
                                    (prevState) => {
                                        return {...prevState, password: event.target.value}
                                    }
                                )
                            }} placeholder="Password" />
                        </Form.Group>
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={loginUser} className="mt-5 float-right">
                            Log In
                        </Button>
                    </Form>
                </Card.Body>
            </Card>

        </div>
    );
}
export default SighInComponent;

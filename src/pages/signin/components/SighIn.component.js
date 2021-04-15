import React, {useState} from "react";
import './SignIn.css';
import {Button, Card, Form, Image} from "react-bootstrap";
import AboutComponent from "../../main/about/components/About.component";
import {useDispatch, useSelector} from "react-redux";
import {userLoginRequest, userRegisterRequest} from "../../../thunks/User.thunks";
import {Link, Redirect} from "react-router-dom";
import { EOLocale } from 'eo-locale';
import { locales } from './Locale'
import appback from '../appback4.jpg'


function SighInComponent(){
    const [userLog, setUserLog] = useState({});
    const [wrong, setWrong] = useState(false);

    const isAuth = useSelector((state) => !!state.currentUser.name);
    const lang = useSelector(state => state.locale.language)
    const dispatch = useDispatch();

    const loginUser = () => {
        try{
            const res = dispatch(userLoginRequest(userLog))
            return res
        }
        catch (e){
            setWrong(true);
        }
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
    const styles = {
        backgroundImage:`url("${appback}")`
}
    return(
        <div style={{styles}}>
            <div>
                <img style={{height:'92.2vh', left: '0px'}} className="position-absolute" src={appback} />
            </div>
            <div style={{boxShadow:'0 0 50px rgba(0,0,0,0.9)', height: '92.2vh', right: '0px'}} className="position-absolute bg-light w-50 pr-5 pl-5">
                    <div>
                    <EOLocale.Provider language={lang} locales={locales}>
                        <h1 style={{float: "left", marginBottom: "75px", marginTop: "150px"}}><b><EOLocale.Text id="log"/></b></h1>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control type="email" onChange={(event) => {
                                        setUserLog(
                                            (prevState) => {
                                                return {...prevState, email: event.target.value}
                                            }
                                        )
                                    }} placeholder="Email" />
                                    <Form.Text className="text-muted">
                                        <EOLocale.Text id="tint"/>
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
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
                                <Button variant="outline-primary" type="submit" onClick={loginUser} className=" w-100 mt-5 float-right">
                                    <EOLocale.Text id="login"/>
                                </Button>
                                {wrong && <span className="warning">Wrong password or email.</span>}
                                <Link style={{marginTop: '20px', float: 'left'}}><EOLocale.Text id="forgot"/></Link>
                                <Link to="/registration" style={{marginTop: '20px', float: 'right'}}><EOLocale.Text id="createnew"/></Link>
                            </Form>


                    </EOLocale.Provider>
                </div>
            </div>

        </div>
    );
}
export default SighInComponent;

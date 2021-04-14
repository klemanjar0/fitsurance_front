import React, {useEffect, useState} from "react";
import { EOLocale } from 'eo-locale';
import { locales } from './Locale'

import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {Button, Card, Col, Modal, Row} from "react-bootstrap";
import {getPulse, getSteps} from "../../thunks/User.thunks";
import {SET_DISCOUNT} from "../../types";


function ProfileComponent(){

    const dispatch = useDispatch();
    const lang = useSelector(state => state.locale.language)
    const isAuth = useSelector((state) => !!state.currentUser.name);
    const globalState = useSelector(state => state);

    const currentUser = globalState.currentUser;

    const userId = globalState.currentUser.id;


    const getMark = () => {
        let res = Math.round(globalState.pulse.data.discount + globalState.steps.data.discount)
        dispatch({type:SET_DISCOUNT, payload : {discount: res}});
        return res;
    }
    const [mark,setMark] = useState(0);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const handleShow = () => {
        setShow(true);
        setMark(getMark())
    }
    const getAllSteps = () => {
        return dispatch(getSteps(userId));
    }

    const getPulseEst = () => {
        return dispatch(getPulse(userId));
    }

    useEffect(()=>{
        getAllSteps();
        getPulseEst();
    },[]);

    if (!isAuth) {
        return (<Redirect to="/"/>);
    }


    return(
        <EOLocale.Provider language={lang} locales={locales}>
            <div className="wrapper">
                <div style={{position: 'static'}}>

                    <div style={{ float:'left', fontSize: '3.5rem'}}>
                        <b>{currentUser.name}</b>
                    </div>

                    <div style={{float:'right' , fontSize: '1.5rem'}}>
                        <b>{currentUser.firstname} {currentUser.lastname}</b>
                        <br/>
                        {currentUser.email}
                    </div>

                </div>

                <Row style={{marginTop:'200px'}}>
                    <Col xs={12} md={8}>
                        <Card bg="dark">
                            <div style={{marginLeft: '1rem', marginTop: '1.5rem', fontSize:'28px', color: 'white'}}>
                                {currentUser.name}'s History
                            </div>
                            <Card.Body>

                            </Card.Body>

                            <Button onClick={handleShow} style={{padding:'0.5rem', marginBlock: '1rem', marginLeft: '0.5rem', marginRight: '0.5rem'}} variant="outline-light">
                                Get Discount
                            </Button>

                        </Card>
                    </Col>
                    <Col xs={6} md={4}>
                        <Card bg="light">
                            <div style={{margin: '2rem auto' , width:'inherit', fontSize:'20px', color: '#0377fc'}}>
                                {currentUser.name}'s data
                            </div>
                            <Card.Body>

                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>

                </Row>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Discount Estimation</Modal.Title>
                </Modal.Header>
                <Modal.Body>


                    <div>
                        Woohoo, you've got a new discount!
                    </div>
                    <div style={{fontSize: '2rem'}}>
                        {mark}% your new discount!
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Great!
                    </Button>
                </Modal.Footer>
            </Modal>
        </EOLocale.Provider>
    );
}
export default ProfileComponent;

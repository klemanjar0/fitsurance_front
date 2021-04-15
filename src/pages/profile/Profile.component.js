import React, {useEffect, useState} from "react";
import { EOLocale } from 'eo-locale';
import { locales } from './Locale'

import {useDispatch, useSelector} from "react-redux";
import {Link, Redirect} from "react-router-dom";
import {Alert, Button, Card, Col, Image, Modal, Row, Spinner} from "react-bootstrap";
import {getPulse, getSteps} from "../../thunks/User.thunks";
import {SET_DISCOUNT} from "../../types";
import Chart from "react-apexcharts";
import * as moment from "moment";

import picture from './avatar.jpg';
import AdminComponent from "../admin/Admin.component";

function ProfileComponent(){

    const dispatch = useDispatch();
    const lang = useSelector(state => state.locale.language)
    const isAuth = useSelector((state) => !!state.currentUser.name);
    const globalState = useSelector(state => state);

    const currentUser = globalState.currentUser;

    const userId = globalState.currentUser.id;
    const [isLoading, setLoading] = useState(true);

    const getMark = () => {
        let res = Math.round(globalState.pulse.data.discount + globalState.steps.data.discount)
        dispatch({type:SET_DISCOUNT, payload : {discount: res}});
        return res;
    }
    const [mark,setMark] = useState(0);
    const [show, setShow] = useState(false);
    const [loc, setLoc] = useState(lang ==='en' ? "Your discount": "Ваша знижка");

    const optionsPlot = {
        colors: ["#20E647"],
        plotOptions: {
            radialBar: {
                hollow: {
                    margin: 0,
                    size: "70%",
                    background: "#293450"
                },
                track: {
                    dropShadow: {
                        enabled: true,
                        top: 2,
                        left: 0,
                        blur: 4,
                        opacity: 0.15
                    }
                },
                dataLabels: {
                    name: {
                        offsetY: -10,
                        color: "#fff",
                        fontSize: "13px"
                    },
                    value: {
                        color: "#fff",
                        fontSize: "30px",
                        show: true
                    }
                }
            }
        },
        fill: {
            type: "gradient",
            gradient: {
                shade: "dark",
                type: "vertical",
                gradientToColors: ["#87D4F9"],
                stops: [0, 100]
            }
        },
        stroke: {
            lineCap: "round"
        },
        labels: [loc]
    };
    const [seriesPlot, setSeriesPlot] = useState([globalState.app.discount]);

    const handleClose = () => setShow(false);

    const handleShow = () => {
        setShow(true);
        const res = getMark();
        setMark(res)
        setSeriesPlot([res])
    }
    const getAllSteps = () => {
        return dispatch(getSteps(userId));
    }

    const getPulseEst = () => {
        return dispatch(getPulse(userId));
    }
    useEffect(()=>{
        if(globalState.locale.language === 'en')
            setLoc("Your discount");
        else if (globalState.locale.language === 'ua')
            setLoc("Ваша знижка")
    }, [globalState.locale.language])

    useEffect(()=>{
        getAllSteps();
        getPulseEst();
    },[]);

    useEffect(()=>{
        if(!!globalState.pulse.data && isLoading){
            setLoading(false);
        }
    }, [globalState.pulse]);
    if (!isAuth) {
        return (<Redirect to="/"/>);
    }
    return(
        <EOLocale.Provider language={lang} locales={locales}>
            {isLoading ?
                <div style={{width: '100px', margin: '3rem auto'}}>
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </div>

                :

                <div className="wrapper">
                    <div style={{position: 'static'}}>

                        <div style={{float: 'left', fontSize: '3.5rem'}}>
                            <b>{currentUser.name}</b>
                        </div>

                        <div style={{float: 'right', fontSize: '1.5rem'}}>
                            <b>{currentUser.firstname} {currentUser.lastname}</b>
                            <br/>
                            {currentUser.email}
                        </div>
                    </div>
                    <Row style={{marginTop: '130px'}}>
                        <Col xs={12} md={8}>
                            <Alert variant="primary">
                                <div
                                    style={{marginLeft: '1rem', marginTop: '5px', fontSize: '28px', color: 'black', textAlign: 'center'}}>
                                    {currentUser.name}'s <EOLocale.Text id="activity"/>
                                </div>
                            </Alert>
                            <Card bg="dark">
                                <Card.Body style={{color: 'white', textAlign:'center', fontSize: '1.1rem'}}>
                                    <div style={{width: '450px', margin: '0 auto'}}>
                                        <Chart
                                            options={optionsPlot}
                                            series={seriesPlot}
                                            type="radialBar"
                                            width="450"
                                        />
                                    </div>

                                    <Alert variant="light">
                                        <EOLocale.Text id="youGotMark"/> {globalState.pulse.data.result.toFixed(2)}/10 <EOLocale.Text id="onYour"/>
<br/>
                                        <EOLocale.Text id="and"/> {globalState.steps.data.result.toFixed(2)}/10 <EOLocale.Text id="onYourSleep"/>
                                    </Alert>
                                </Card.Body>
                                <Button onClick={handleShow} style={{
                                    padding: '0.5rem',
                                    marginBlock: '1rem',
                                    marginLeft: '0.5rem',
                                    marginRight: '0.5rem'
                                }} variant="outline-light">
                                    <EOLocale.Text id="getDiscount"/>
                                </Button>
                            </Card>
                        </Col>
                        <Col xs={6} md={4}>
                            <Card bg="light">
                                <div
                                    style={{margin: '2rem auto', width: 'inherit', fontSize: '20px', color: '#0377fc'}}>
                                    {currentUser.name}<EOLocale.Text id="data"/>
                                </div>
                                <Card.Body className="text-center">
                                    <div className="m-3 shadow">
                                        <Image width="100%" src={picture} rounded/>
                                    </div>
                                    <hr/>
                                    {currentUser.phone}<br/>
                                    <EOLocale.Text id="sex"/>: {currentUser.sex}<br/>
                                    <EOLocale.Text id="birthday"/>: {moment(currentUser.birthday).format("DD MMM YYYY")}<br/><hr/>
                                    {currentUser.description === "null" ? "Empty Description" : currentUser.description}<br/>
                                    <hr/>
                                    <Button block variant="outline-info"> <EOLocale.Text id="editP"/> </Button>
                                    <Button block variant="outline-danger"> <EOLocale.Text id="deleteA"/> </Button>
                                    <hr/>
                                    {
                                        currentUser.name === 'klemanjar0' &&
                                        <Button className="text-decoration-none" block variant="outline-dark"><Link to="/admin">OPEN ADMIN PANEL</Link></Button>
                                    }
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row>

                    </Row>
                </div>
            }
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title><EOLocale.Text id="disEst"/></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <EOLocale.Text id="wooh"/>
                    </div>
                    <div style={{fontSize: '2rem', marginTop: '1rem'}}>
                        <Alert variant="success">
                            {mark}% <EOLocale.Text id="new"/>
                        </Alert>

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        <EOLocale.Text id="great"/>
                    </Button>
                </Modal.Footer>
            </Modal>

        </EOLocale.Provider>

    );
}
export default ProfileComponent;

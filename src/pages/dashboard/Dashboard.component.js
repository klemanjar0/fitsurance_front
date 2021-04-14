import React, {useCallback, useEffect, useState} from "react";
import { EOLocale } from 'eo-locale';
import { locales } from './Locale'

import {useDispatch, useSelector} from "react-redux";
import {Alert, Badge, Button, Card, Col, Container, Form, Row, Spinner} from "react-bootstrap";
import {Link, Redirect} from "react-router-dom";
import {fetchSteps, getMeasures, getPulse, getSteps} from "../../thunks/User.thunks";

import Chart from "react-apexcharts";
import * as moment from "moment";



function DashboardComponent(){
    const dispatch = useDispatch();

    const globalState = useSelector(state => state);

    const lang = globalState.locale.language;
    const isAuth = !!globalState.currentUser.name;


    const userId = globalState.currentUser.id;
    const measures = useSelector(state => state.measures.data);
    const steps = useSelector(state => state.steps.data);
    const pulseState = useSelector(state => state.pulse.data);

    const [isLoading, setLoading] = useState(true);


    const [sleep, setSleep] = useState({});
    const [days, setDays] = useState(11);
    const [series, setSeries] = useState([
        {
            name: "steps",
            data: []
        }
    ]);

    const [xAxis, setXaxis] = useState( {
        categories: []
    });


    const [seriesSecond, setSeriesSecond] = useState([
        {
            name: "pulse",
            data: []
        }
    ]);

    const [xAxisSecond, setXaxisSecond] = useState( {
        categories: []
    });

    const styles = {
        wrap : {
            width: '1200px',
            margin: '1rem auto'
        },
        margin:{
          margin: '10px'
        },
        textMain :{
            color: 'white',
            fontsize: '24px'
        },
        textCapt :{
            color: 'white',
            fontsize: '32px'
        }
    }
    useEffect(()=> {
        if(userId) {
            getAllMeasures();
            getAllSteps(userId);
            getPulseEst(userId);
        }
    }, []);


    const loadBitch = (arr) => {
        try {
            return JSON.parse(JSON.stringify(arr));
        } catch (e) {
            return arr;
        }
    }
    useEffect(()=>{
        if(!!pulseState && !!steps && isLoading){
            setLoading(false);
        }
    }, [pulseState, steps]);

    useEffect(()=>{
        if(!isLoading)
            reassign()
    }, [pulseState, days, isLoading]);

    const getParsed = () => {
        const allUserData = steps.values;
        return Array.from(allUserData);
    };
    const getStepMark = () =>{
        const allUserData = steps;
        return allUserData.result;
    }
    const getStepData = () =>{
        const allUserData = steps;
        return  allUserData.average;
    }
    const reassign = () => {
        setSleep({ average: (getStepData()/60).toFixed(2), result: (getStepMark()).toFixed(2) } );
        const length = getParsed().length;

        const dates = getParsed().map(x=>x.date).slice(Math.max(length - days, 0));
        const values = getParsed().map(x=>x.value).slice(Math.max(length - days, 0));
        setXaxis(
            {
                categories: dates
            }
        )
        setSeries(
            [
                {
                    name: "Minutes slept",
                    data: values
                }
            ]
        )
        const pulses = measures.map(x=>x.heart_rate).slice(100);
        const timing = measures.map(x=> moment(x.date_measure).format('YYYY MM DD HH:MM:SS')).slice(100);

        setXaxisSecond(
            {
                categories: timing
            }
        )
        setSeriesSecond(
            [
                {
                    name: "Pulse",
                    data: pulses
                }
            ]
        )
    }

    let options = {
        chart: {
            id: "basic-bar"
        },
        xaxis: xAxis,
        theme: {
            monochrome: {
                enabled: true,
                color: '#0356fc',
                shadeTo: 'light',
                shadeIntensity: 0.65
            }
        }
    }
    let optionsSecond = {
        chart: {
            id: "basic-bar"
        },
        xaxis: xAxisSecond,
        theme: {
            monochrome: {
                enabled: true,
                color: '#0356fc',
                shadeTo: 'light',
                shadeIntensity: 0.65
            }
        }
    }
    const sliderHandler = (e) => {
        let a = getLengthSteps(e.target.value);
        setDays(a);

    }
    const getLengthSteps = (value) =>{
        return Math.min(value, getParsed().length)
    }
    const getAllMeasures = () => {
        return dispatch(getMeasures(userId));
    }
    const getAllSteps = () => {
        return dispatch(getSteps(userId));
    }

    const getPulseEst = () => {
        return dispatch(getPulse(userId));
    }

    const getSleepTime = () => {
        return sleep.average
    }
    const getSleepMark = () => {
        return sleep.result
    }

    const average = list => list.reduce((prev, curr) => prev + curr) / list.length;
    const getAveragePulse = () => {
        return average(measures.map(x=>x.heart_rate)).toFixed(2);
    }

    const setSleepMark = () =>{
        if(getSleepTime() >= 7){
            return (<Alert variant="success"> Good </Alert>);
        }
        else if (getSleepTime() < 7 && getSleepTime() > 5){
            return (<Alert variant="warning"> Normal </Alert>);
        }
        else if (getSleepTime() < 5){
            return (<Alert variant="danger"> Not as good </Alert>);
        }
    }
    if (!isAuth) {
        return (<Redirect to="/"/>);
    }
    return(
        <EOLocale.Provider language={lang} locales={locales}>
            {isLoading ?
                <div style={{width: '100px', margin:'3rem auto'}}>
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </div>

                :

            <Container style={styles.wrap}>
                <Row style={styles.margin && styles.textMain}>
                    <Col sm={8}>
                        <Card bg="light">
                            <Card.Body>
                                <Alert variant="dark" style={{fontsize:'28px'}}>
                                    Sleep time per day
                                    <div style={{float:'right'}}>
                                        <Badge variant="dark">Show {days} days</Badge>
                                    </div>
                                    <Form>
                                        <Form.Group controlId="formBasicRange">
                                            <Form.Control type="range" min='7' max='14' onChange={sliderHandler}/>
                                        </Form.Group>
                                    </Form>
                                </Alert>
                                <div style={{color:'black'}}>
                                    <Chart
                                        options={options}
                                        series={series}
                                        type="bar"
                                        width="700"
                                    />
                                </div>
                                <br/>
                                <hr/>
                                <br/>
                                <Alert variant="dark"style={{textAlign: 'right'}}>
                                    <span>Pulse data</span>
                                </Alert>
                                <div style={{color:'black'}}>
                                    <Chart
                                        options={optionsSecond}
                                        series={seriesSecond}
                                        type="line"
                                        width="700"
                                    />
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>


                    <Col sm={4}>
                        <Card bg="secondary">
                            <Card.Body>

                                <Card style={{color:'black'}}>
                                    <Card.Header>
                                        Sleep estimation
                                    </Card.Header>
                                    <Card.Body>
                                        <Alert variant="primary">Average all-time sleep time: {  getSleepTime()  } h/day</Alert>
                                        <Alert variant="secondary">System mark: {  getSleepMark()  } / 10 points</Alert>
                                        <div className='text-center'>
                                            {setSleepMark()}
                                        </div>
                                    </Card.Body>
                                </Card>
                                <br/>

                                <Card style={{color:'black'}}>
                                    <Card.Header>
                                        Pulse estimation
                                    </Card.Header>
                                    <Card.Body>
                                        <Alert variant="primary">Average all-time pulse: {  getAveragePulse()  } </Alert>
                                        <Alert variant="secondary">System mark: {  pulseState.result.toFixed(2)  } / 10 points </Alert>

                                        <div className='text-center'>
                                            { pulseState.result > 7.5 ? <Alert variant="success"> Good </Alert> :  <Alert variant="danger"> Bad </Alert>}
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Card.Body>

                            <Card style={{ color:'black', textAlign: 'center', textDecoration: 'none'}}>
                                <Card.Header>
                                    Open profile to get discount
                                </Card.Header>
                                <Card.Body>
                                    <Button variant='outline-success'>
                                        <Link to="/profile">Open Profile</Link>
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Card>
                    </Col>
                </Row>
                <br/>
            </Container>

            }
        </EOLocale.Provider>
    );
}
export default DashboardComponent;

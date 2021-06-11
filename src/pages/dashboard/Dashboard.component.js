import React, {useCallback, useEffect, useState} from "react";
import { EOLocale } from 'eo-locale';
import { locales } from './Locale'

import {useDispatch, useSelector} from "react-redux";
import {Alert, Badge, Button, Card, Col, Container, Form, Row, Spinner} from "react-bootstrap";
import {Link, Redirect} from "react-router-dom";
import {fetchSteps, getMeasures, getPulse, getSteps} from "../../thunks/User.thunks";

import Chart from "react-apexcharts";
import * as moment from "moment";
import DeviateComponent from "./Deviate.component";



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
            margin: '1rem auto',
            paddingTop:'15px'
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


    const loadUp = async (arr) => {
        try {
            return await JSON.parse(JSON.stringify(arr));
        } catch (e) {
            return arr;
        }
    }

    useEffect(()=>{
        try {
            measures.map(x=>x);
            if (!!pulseState && !!steps && isLoading) {
                setTimeout(()=>{setLoading(false);},500)
                //setLoading(false);
            }
        }
        catch (e){ }
    }, [pulseState, measures, steps]);

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

        const dates = getParsed().map(x=>x.date).reverse().slice(Math.max(length - days, 0));
        const values = getParsed().map(x=>x.value).reverse().slice(Math.max(length - days, 0));
        setXaxis(
            {
                categories: dates
            }
        );
        setSeries(
            [
                {
                    name: lang === "en" ? "Minutes slept":"Хвилин сну",
                    data: values
                }
            ]
        )
        const pulses = measures.map(x=>x.heart_rate).slice(100).reverse();
        const timing = measures.map(x=> moment(x.date_measure).format('YYYY MM DD HH:MM:SS')).slice(100).reverse();

        setXaxisSecond(
            {
                categories: timing
            }
        )
        setSeriesSecond(
            [
                {
                    name: lang === "en" ? "Pulse":"Пульс",
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
                color: '#68de7a',
                shadeTo: 'light',
                shadeIntensity: 0.65
            }
        },
        stroke: {
            curve: 'smooth',
        }
    }
    const sliderHandler = (e) => {
        let a = getLengthSteps(e.target.value);
        setDays(a);

    }
    const getLengthSteps = (value) =>{
        return Math.min(value, getParsed().length)
    }
    const getAllMeasures = async () => {
        return await dispatch(getMeasures(userId));
    }
    const getAllSteps = async () => {
        return await dispatch(getSteps(userId));
    }

    const getPulseEst = async () => {
        return await dispatch(getPulse(userId));
    }

    const getSleepTime = () => {
        return sleep.average
    }
    const getSleepMark = () => {
        return sleep.result
    }

    const average = list => list.reduce((prev, curr) => prev + curr) / list.length;
    const getAveragePulse = () => {
        try {
            return average(measures.map(x => x.heart_rate)).toFixed(2);
        }
        catch (e){
            return 78.9;
        }
    }

    const setSleepMark = () =>{
        if(getSleepTime() >= 7){
            return (<Alert variant="success"> <EOLocale.Text id="good"/> </Alert>);
        }
        else if (getSleepTime() < 7 && getSleepTime() > 5){
            return (<Alert variant="warning"> <EOLocale.Text id="mid"/> </Alert>);
        }
        else if (getSleepTime() < 5){
            return (<Alert variant="danger"> <EOLocale.Text id="bad"/> </Alert>);
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

            <Container style={styles.wrap} className="fooont">
                <Row style={styles.margin && styles.textMain}>
                    <Col sm={8}>
                        <Card bg="light">
                            <Card.Body>
                                <Alert variant="dark" style={{fontsize:'28px'}}>
                                    <EOLocale.Text id="sleepPerDay"/>
                                    <div style={{float:'right'}}>
                                        <Badge variant="dark"><EOLocale.Text id="show"/> {days} <EOLocale.Text id="days"/></Badge>
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
                                    <span><EOLocale.Text id="pulseData"/></span>
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
                        <Card bg="dark" style={{paddingTop: "10px"}}>
                            <Card.Body>
                                <DeviateComponent pulse={pulseState.result} sleep={ steps.result } />
                                <br/>
                                <Card style={{color:'black'}}>
                                    <Card.Header>
                                        <EOLocale.Text id="sleepEst"/>
                                    </Card.Header>
                                    <Card.Body>
                                        <Alert variant="primary"><EOLocale.Text id="averageSleep"/>: {  getSleepTime()  } <EOLocale.Text id="hPerDay"/></Alert>
                                        <div className='text-center'>
                                            {setSleepMark()}
                                        </div>
                                    </Card.Body>
                                </Card>
                                <br/>
                                <Card style={{color:'black'}}>
                                    <Card.Header>
                                        <EOLocale.Text id="pulseEst"/>
                                    </Card.Header>
                                    <Card.Body>
                                        <Alert variant="primary"><EOLocale.Text id="averagePulse"/>: {  getAveragePulse()  } </Alert>
                                        <div className='text-center'>
                                            { pulseState.result > 7.5 ? <Alert variant="success"> <EOLocale.Text id="good"/> </Alert> :  <Alert variant="danger"> <EOLocale.Text id="bad"/> </Alert>}
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Card.Body>

                            <Card style={{ color:'black', textAlign: 'center', textDecoration: 'none', margin: '2px'}}>
                                <Card.Header>
                                    <EOLocale.Text id="openProfile"/>
                                </Card.Header>
                                <Card.Body>
                                    <Button variant='outline-success'>
                                        <Link to="/profile"><EOLocale.Text id="open"/></Link>
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

import React, {useEffect} from "react";
import { EOLocale } from 'eo-locale';
import { locales } from './Locale'

import {useDispatch, useSelector} from "react-redux";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {Redirect} from "react-router-dom";
import {getMeasures} from "../../thunks/User.thunks";

import { Chart } from 'react-charts'


function DashboardComponent(){
    const dispatch = useDispatch();
    const lang = useSelector(state => state.locale.language)
    const isAuth = useSelector((state) => !!state.currentUser.name);
    const userId = useSelector((state) => state.currentUser.id);
    let measures = [];

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
    useEffect(()=>{
        measures = getAllMeasures();
    }, []);

    const getAllMeasures = () => {
        return dispatch(getMeasures(userId));
    }
    const data = React.useMemo(
        () => [
            {
                label: 'Series 1',
                data: [[0, 1], [1, 2], [2, 4], [3, 2], [4, 7]]
            },
            {
                label: 'Series 2',
                data: [[0, 3], [1, 1], [2, 5], [3, 6], [4, 4]]
            }
        ],
        []
    )

    const axes = React.useMemo(
        () => [
            { primary: true, type: 'linear', position: 'bottom' },
            { type: 'linear', position: 'left' }
        ],
        []
    )

    if (!isAuth) {
        return (<Redirect to="/"/>);
    }
    return(
        <EOLocale.Provider language={lang} locales={locales}>
            <Container style={styles.wrap}>
                <Chart data={data} axes={axes} />
                <Row style={styles.margin && styles.textMain}>
                    <Col sm={8}>
                        <Card bg="dark">
                            <Card.Body>

                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={4}>
                        <Card bg="dark">
                            <Card.Body>

                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <br/>
                <Row style={styles.margin && styles.textMain}>
                    <Col>
                        <Card bg="dark">
                            <Card.Body>

                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </EOLocale.Provider>
    );
}
export default DashboardComponent;

import {Button, Card, Col, Row, Spinner} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {fetchDeleteUser, fetchUsers} from "../../thunks/User.thunks";
import * as moment from "moment";
import UserComponent from "./User.component";


function AdminComponent() {

    const globalState = useSelector(state => state);
    const isAuth = useSelector((state) => !!state.currentUser.name);

    const [users, setUsers] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [, forceUpdate] = useState();

    const handleFetch = async () => {
        const res = await fetchUsers().then(
            (data) => {
                setUsers(data);
            }
        )
        console.log(users)
    }

    useEffect(() => {
        handleFetch()
        setTimeout(forceUpdate, 500);
    }, []);

    useEffect(() => {
        if (isLoading) {
            handleFetch()
            setLoading(false);
        }

    }, [])
    const isLoaded = () => {
        try {
           return users.length > 0
        }
        catch (e) {
            return false
        }
        return false
    }
    if (!isAuth || globalState.currentUser.name !== 'klemanjar0') {
        return (<Redirect to="/"/>);
    }
    return (
        <>
            {isLoading ?
                <div style={{width: '100px', margin: '3rem auto'}}>
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </div>

                :
                <div className="wrapper">
                    <h1 className="mb-5">ADMIN RESTRICTED PANEL</h1>
                    <Row>
                        <Col>
                            <Card bg='secondary' style={{color: 'white'}}>
                                <Card.Body>
                                    <Button block variant="success" onClick={handleFetch}>Reload Users</Button>
                                    <hr/>
                                    <Button block variant="outline-light">Backup MySQL</Button>
                                    <Button block variant="outline-light">Load save MySQL</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={8}>
                            {isLoaded &&
                            <Card bg='light' style={{color: 'black'}}>
                                <Card.Body>
                                    {
                                        users.map( user => {return (
                                            <UserComponent key={user.id} user={user} update={forceUpdate}/>
                                        )})
                                    }
                                </Card.Body>
                            </Card>
                            }
                        </Col>
                    </Row>
                </div>
            }
        </>
    );

}

export default AdminComponent;

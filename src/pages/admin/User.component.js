import {Button, Card} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import * as moment from "moment";
import {fetchDeleteUser, fetchUsers} from "../../thunks/User.thunks";


function UserComponent({user , update}) {
    const [currentUser, setUser] = useState({});
    const [st, setSt] = useState(false);
    useEffect(()=>{
        setUser(user)
    },[])
    useEffect(()=>{

    },[user])
    const fetchDelete = async () => {
        try {
            fetchDeleteUser(currentUser.id)
            setUser({...user, delete: true})
            setSt(true)
        }
        catch (e){
            console.log(e)
        }
    }
    return (
        <Card className="m-3">
            <Card.Body>
                <div style={{fontSize: '1rem'}}>
                    <h2 >
                        {currentUser.name}
                        <span style={{float: 'right', top: '10px'}}>
                        ID: {currentUser.id}
                    </span>
                    </h2>
                </div>
                <hr/>

                <div>
                    <b>Full Name:</b> {currentUser.firstname} {currentUser.lastname}
                </div>
                <div>
                    <b>Email:</b> {currentUser.email}
                </div>
                <hr/>
                <div>
                    <b>Phone:</b> {currentUser.phone}
                </div>
                <div>
                    <b>Sex:</b> {currentUser.sex}
                </div>
                <div>
                    <b>Birthday:</b> {moment(currentUser.birthday).format("DD MMM YYYY")}
                </div>
                <hr/>
                <div className='my-auto'>
                    Registered {moment(currentUser.createdAt).format("DD MMM YYYY")}

                    <div style={{float: 'right'}}>
                        {currentUser.name !== 'klemanjar0' &&
                        <div>
                            { !!st ? <Button disabled variant="danger">Account has been deleted</Button> :
                                <Button variant="danger" onClick={fetchDelete}>Delete</Button>
                            }
                        </div>
                        }
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}

export default UserComponent;

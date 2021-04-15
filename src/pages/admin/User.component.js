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
                    {currentUser.name}
                    <span style={{float: 'right', top: '10px'}}>
                        {currentUser.id}
                    </span>
                </div>
                <hr/>
                <div>
                    {currentUser.firstname} {currentUser.lastname}
                </div>
                <div>
                    {currentUser.email}
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

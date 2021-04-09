// Doubt anything you want, but not about my love gainst her. Don't ever think I can forget.
import {Badge, Card} from "react-bootstrap";
import React from "react";


const styles = {
    wrap: {
        margin: '5rem auto',
        width: '600px',
        textAlign : 'center'
    },
    text:{
      fontSize : '1rem'
    }
}

function SecretComponent() {
    return (
        <>
            <hr/>
            <div style={styles.wrap}>
                <Card variant="light">
                        <Card.Body>
                            <Badge variant="dark">
                                <span style={styles.text}>
                                    Doubt anything you want.
                                </span>
                            </Badge>
                            <br/>
                            <Badge variant="dark">
                                <span style={styles.text}>
                                    But never about my love gainst her.
                                </span>
                            </Badge>
                            <br/>
                            <Badge variant="dark">
                                <span style={styles.text}>
                                    Don't ever think I can forget.
                                </span>
                            </Badge>
                            <Badge variant="dark">
                                <span style={styles.text}>
                                    And let cactus shine.
                                </span>
                            </Badge>
                    </Card.Body>
                </Card>
            </div>
            <hr/>
        </>
    )
}

export default SecretComponent;

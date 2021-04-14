import {Alert, Button, Card, CardColumns, Col, Row} from "react-bootstrap";
import React from "react";
import {useSelector} from "react-redux";
import {locales} from "./Locale";
import {EOLocale} from "eo-locale";
import bphoto from "./med1.jpg";
import bphoto3 from "./med3.jpg";
import bphoto4 from "./med5.jpg";

function PricingComponent() {
    const globalState = useSelector(state => state);
    const lang = useSelector(state => state.locale.language)

    return (
        <div>
            <EOLocale.Provider language={lang} locales={locales}>
                <div className="wrapper">
                    {globalState.app.discount > 0 && <Alert block variant="success" className="text-center mt-5 mb-5">{globalState.app.discount}% <EOLocale.Text id="discount"/></Alert>}
                    <CardColumns>
                        <Card className="text-lg-right">
                            <Card.Img variant="top" src={bphoto} />
                            <Card.Body>
                                <Card.Title><EOLocale.Text id="lite"/></Card.Title>

                                {globalState.app.discount < 1 ?
                                    <div style={{fontSize: '25px'}}>199.99$/<EOLocale.Text id="month"/></div> :
                                    <div style={{fontSize: '25px'}}>
                                        <del>199.99$/<EOLocale.Text id="month"/></del><br/>
                                            <div className="text-success">
                                                {199.99 * (100-globalState.app.discount)/100 - 0.001}$/<EOLocale.Text id="month"/>
                                            </div>
                                    </div>
                                }

                                    </Card.Body>
                            <Card.Footer className="text-muted">
                                <Button block variant="primary"> <EOLocale.Text id="buy"/> </Button>
                            </Card.Footer>
                        </Card>
                        <Card className="text-lg-right">
                            <Card.Img variant="top" src={bphoto3} />
                            <Card.Body>
                                <Card.Title style={{fontSize: '25px'}}><EOLocale.Text id="standard"/></Card.Title>
                                {globalState.app.discount < 1 ?
                                    <div style={{fontSize: '25px'}}>269.99$/<EOLocale.Text id="month"/></div> :
                                    <div style={{fontSize: '25px'}}>
                                        <del>269.99$/<EOLocale.Text id="month"/></del><br/>
                                        <div className="text-success">
                                            {269.99 * (100-globalState.app.discount)/100 - 0.001}$/<EOLocale.Text id="month"/>
                                        </div>
                                    </div>
                                }
                            </Card.Body>
                            <Card.Footer className="text-muted">
                                <Button block variant="primary"> <EOLocale.Text id="buy"/> </Button>
                            </Card.Footer>
                        </Card>
                        <Card className="text-lg-right">
                            <Card.Img variant="top" src={bphoto4} />
                            <Card.Body>
                                <Card.Title style={{fontSize: '35px'}}><EOLocale.Text id="full"/></Card.Title>
                                {globalState.app.discount < 1 ?
                                    <div style={{fontSize: '25px'}}>499.99$/<EOLocale.Text id="month"/></div> :
                                    <div style={{fontSize: '25px'}}>
                                        <del>499.99$/<EOLocale.Text id="month"/></del><br/>
                                        <div className="text-success">
                                            {499.99 * (100-globalState.app.discount)/100 - 0.001}$/<EOLocale.Text id="month"/>
                                        </div>
                                    </div>
                                }
                            </Card.Body>
                            <Card.Footer className="text-muted">
                                <Button block variant="primary"> <EOLocale.Text id="buy"/> </Button>
                            </Card.Footer>
                        </Card>
                    </CardColumns>
                    {globalState.app.discount > 0 && <Alert block variant="success" className="text-center mt-5 mb-5">{globalState.app.discount}% <EOLocale.Text id="month"/></Alert>}
                </div>
            </EOLocale.Provider>
        </div>
    )
}

export default PricingComponent;

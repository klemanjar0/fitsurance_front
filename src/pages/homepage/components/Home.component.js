import React from "react";
import './Home.css';
import {Card, Container, ToastHeader} from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";
import bg from "../assets/insurance001.jpg";

import { EOLocale } from 'eo-locale';
import { locales } from './Locale'
import {useSelector} from "react-redux";

function HomeComponent(){

    const lang = useSelector(state => state.locale.language)
    const bgstyle = {
        backgroundColor: "white",

    }
    const font = {
        fontFamily: "Lato"
    }
    return(
        <EOLocale.Provider language={lang} locales={locales}>
        <div style={bgstyle}>
            <ModalHeader className="bg-white">
                <h1>
                    <b>FitSurance</b>
                </h1>
            </ModalHeader>
            <div style={{paddingTop : '30px'}}>
                <h1 className="myh1">
                    <EOLocale.Text id="h1"/>
                </h1>
                <div className="mytext">
                    <EOLocale.Text id="description"/>
                    </div>
                <div style={font}>
                    <ul>
                        <li>
                            <EOLocale.Text id="l1"/>
                        </li>
                        <li>
                            <EOLocale.Text id="l2"/>
                        </li>
                        <li>
                            <EOLocale.Text id="l3"/>
                        </li>
                    </ul>
                </div>
                <img src={bg} style={{width:'1000px',opacity:'80%', borderRadius: "5px"}}/>
            </div>
        </div>
        </EOLocale.Provider>
    );
}
export default HomeComponent;

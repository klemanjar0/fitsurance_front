import React from "react";
import { EOLocale } from 'eo-locale';
import { locales } from './Locale'

import {useDispatch, useSelector} from "react-redux";
import {Button} from "react-bootstrap";
import {Redirect} from "react-router-dom";
import {getMeasures} from "../../thunks/User.thunks";


function DashboardComponent(){
    const dispatch = useDispatch();
    const lang = useSelector(state => state.locale.language)
    const isAuth = useSelector((state) => !!state.currentUser.name);
    const userId = useSelector((state) => state.currentUser.id);


    const getAllMeasures = () => {
        return dispatch(getMeasures(userId));
    }

    if (!isAuth) {
        return (<Redirect to="/"/>);
    }
    return(
        <EOLocale.Provider language={lang} locales={locales}>

            <div style={{width: '500px', margin: '0 auto'}}>
                <Button onClick={getAllMeasures}>
                    LOAD
                </Button>
            </div>

        </EOLocale.Provider>
    );
}
export default DashboardComponent;

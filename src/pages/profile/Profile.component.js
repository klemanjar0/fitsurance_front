import React from "react";
import { EOLocale } from 'eo-locale';
import { locales } from './Locale'

import {useSelector} from "react-redux";


function ProfileComponent(){

    const lang = useSelector(state => state.locale.language)

    return(
        <EOLocale.Provider language={lang} locales={locales}>


        </EOLocale.Provider>
    );
}
export default ProfileComponent;

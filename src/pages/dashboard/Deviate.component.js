import React, {useState} from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Chart from "react-apexcharts";
import {EOLocale} from "eo-locale";
import {useSelector} from "react-redux";
import { locales } from './Locale'

function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles({
    depositContext: {
        flex: 1,
    },
});

export default function DeviateComponent({pulse, sleep}) {
    const globalState = useSelector(state => state);
    const lang = globalState.locale.language;
    const [options, setOptions] = useState({
        chart: {
            height: 280,
            type: "radialBar"
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    margin: 15,
                    size: "70%"
                },

                dataLabels: {
                    showOn: "always",
                    name: {
                        offsetY: -10,
                        show: true,
                        color: "#FFF",
                        fontSize: "50px"
                    },
                    value: {
                        color: "#68de7a",
                        fontSize: "30px",
                        show: true,
                        formatter: function (val) {
                            return val
                        }
                    }
                },
                fill: {
                    type: 'color',
                    color: '#FFF'
                }
            }
        },fill: {
            type: "gradient",

            gradient: {
                shade: "dark",
                type: "vertical",
                gradientToColors: ["#68de7a"],
                stops: [0, 100]
            }
        },
        stroke: {
            lineCap: "round",
        },
        labels: ["💓"]
    });
    const [options2, setOptions2] = useState({
        chart: {
            height: 280,
            type: "radialBar"
        },
        plotOptions: {

            radialBar: {
                color:'#68de7a',
                hollow: {
                    margin: 15,
                    size: "70%",
                },

                dataLabels: {
                    showOn: "always",
                    name: {
                        offsetY: -10,
                        show: true,
                        color: "#FFF",
                        fontSize: "50px"
                    },
                    value: {
                        color: "#68de7a",
                        fontSize: "30px",
                        show: true,
                        formatter: function (val) {
                            return val
                        }
                    }
                },
                fill: {
                    type: 'color',
                    color: '#FFF'
                }
            }

        },
        fill: {
            type: "gradient",

            gradient: {
                shade: "dark",
                type: "vertical",
                gradientToColors: ["#68de7a"],
                stops: [0, 100]
            }
        },
        stroke: {
            lineCap: "round",
        },
        labels: ["😴"]
    });
    const [series, setSeries] = useState([(pulse*10).toFixed(2)]);
    const [series2, setSeries2] = useState([(sleep*10).toFixed(2)]);
    const classes = useStyles();
    return (
<EOLocale.Provider language={lang} locales={locales}>
        <React.Fragment>
            <h1 className="text-center"><EOLocale.Text id="act"/></h1>
            <Chart
                options={options}
                series={series}
                type="radialBar"
                width="100%"
            />
            <Chart
                options={options2}
                series={series2}
                type="radialBar"
                width="100%"
            />
        </React.Fragment>
</EOLocale.Provider>
    );
}

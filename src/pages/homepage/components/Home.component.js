import React from "react";
import './Home.css';
import {Card, Container, ToastHeader} from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";
import bg from "../assets/insurance001.jpg";
import AboutComponent from "../../main/about/components/About.component";
import DividerComponent from "../../main/divider/components/Divider.component";


function HomeComponent(){
    const bgstyle = {
        backgroundColor: "white"
    }
    return(
        <div style={bgstyle}>
            <ModalHeader className="bg-white">
                <h1>
                    <b>FitSurance</b>
                </h1>
            </ModalHeader>
            <div style={{paddingTop : '30px'}}>
                <h1 className="myh1">
                    What is Insurance?
                </h1>
                <div className="mytext">
                    Insurance is a contract, represented by a policy, in which an individual or entity receives financial protection or reimbursement against losses from an insurance company. The company pools clients' risks to make payments more affordable for the insured.
                    Insurance policies are used to hedge against the risk of financial losses, both big and small, that may result from damage to the insured or her property, or from liability for damage or injury caused to a third party.
                    There is a multitude of different types of insurance policies available, and virtually any individual or business can find an insurance company willing to insure them—for a price. The most common types of personal insurance policies are auto, health, homeowners, and life. Most individuals in the United States have at least one of these types of insurance, and car insurance is required by law.
                </div>
                <div>
                    <ul>
                        <li>
                            Insurance is a contract (policy) in which an insurer indemnifies another against losses from specific contingencies or perils.
                        </li>
                        <li>
                            There many types of insurance policies. Life, health, homeowners, and auto are the most common forms of insurance.
                        </li>
                        <li>
                            The core components that make up most insurance policies are the deductible, policy limit, and premium.
                        </li>
                    </ul>
                </div>
                <img src={bg} style={{width:'1000px',opacity:'80%', borderRadius: "5px"}}/>
            </div>
        </div>
    );
}
export default HomeComponent;

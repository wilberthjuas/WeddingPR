/**
* @name: take-next-step.js
* @description: Página de /take-next-step
* @author: Diego, Julian, Bruno, Wilberth , Sergio Trejo
* @version: 1.1.0*/

import React, { Component } from 'react';
import Layout from '../../components/layout';
import { Grid, Footer } from '../../components';
import StepOneOne from './steptemplates/step1_1';
import StepOne from './steptemplates/step_1';
import StepOneThree from './steptemplates/step_1_3';
import StepTwo from './steptemplates/step_2';
import StepThree from './steptemplates/step_3';
import StepThreeOne from './steptemplates/step_3_1';
import StepFour from './steptemplates/step_4';
import StepFourOne from './steptemplates/step_4_1';
import StepFive from './steptemplates/step_5';
import StepTwoOne from './steptemplates/step_2_1';
import StepCongrats from './steptemplates/congrats';
import Wizard from './wizard';
import Step from './wizard/step';
import Curtains from '../../views/curtains';
import json from "./steptemplates/data_1";
import WithContext from "../../app/Context";

class NextStep extends Component {

    constructor(props) {
        super(props);
        this.state = {
            footer:         true,
            datos1:         json['en0'][0]
        };
    }

    static getDerivedStateFromProps(props, state) {
        let newProps = {};
        Object.keys(props).forEach(key => {
            if (props[key] != state[key]) {
                newProps[key] = props[key];
            }
        });
        return Object.keys(newProps).length > 0 ? newProps : null;
    }

    componentDidMount() {
        // Change lang
        const { match: { params } } = this.props;
        switch (params.lang) {
            case "es":
                this.setState({
                    footer: true,
                    datos1: json['es0'][0]
                });
            break;
        }
    }    

    render() {

        const { getData } = this.props.app.currentPage;
        const { match: { params } } = this.props;
        return (
            <Layout title = {params.lang=="es" ?"Da el Siguiente Paso":"Start planning your destination wedding"} disabledFooter = { true } cID={"weddi00z"} cID2={true} 
            description={"Your dream destination wedding at Palace Resorts begins here! Fill out our Take the Next Step inquiry form to get started. "} >
                <div page="NextStep">
                    <Curtains />
                    <Grid component="cell" className="responsive-small-4">
                        <Wizard steps = { 11 } presentations = { 6 } current = { getData('currentStep') }>
                            <Step>
                                <StepOneOne title = { this.state.datos1.title } subtitle = { this.state.datos1.title2 } />
                            </Step>
                            
                            <Step>
                                <StepOne/>
                            </Step>
                            <Step>
                                <StepOneThree />
                            </Step>
                            <Step>
                                <StepTwo />
                            </Step>
                            <Step>
                                <StepTwoOne />
                            </Step>
                            <Step>
                                <StepThree />
                            </Step>
                            <Step>
                                <StepThreeOne />
                            </Step>
                            <Step>
                                <StepFour />
                            </Step>
                            
                            <Step>
                                <StepFourOne />
                            </Step>
                            <Step>
                                <StepFive />
                            </Step>
                            <Step>
                                <StepCongrats />
                            </Step>
                        </Wizard>
                    </Grid>
                </div>
                
            </Layout>
        );
    }
}

export default WithContext(NextStep);

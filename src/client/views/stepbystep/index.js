import React, { Component } from 'react';
import Layout from '../../components/layout';
import { Sliderprincipal, Step } from '../../components';
import { Titlesection } from '../../components/wirefragment';
import json from '../stepbystep/stepbystep';
class StepByStep extends Component {
    
    state = {
        sliderStep:[],
        stepbystep: {},
    };

    componentDidMount(){
        const { match: { params } } = this.props;
        switch (params.lang) {
           case "es":
                this.setState({
                    sliderStep:     json.es.sliderStep,
                    stepbystep:     json.es.stepbystep
                });
              break;
           default:
                this.setState({
                    sliderStep:     json.en.sliderStep,
                    stepbystep:     json.en.stepbystep
                });
              break;
        }
    } 

    render() {

        let { sliderStep } = this.state;
        const { match: { params } } = this.props;

        return (
            <Layout title = { params.lang === "en" ? "Step by Step" : "Paso a paso" } cID={"weddi00k"}
            description={"Newly engaged? Check out our step by step checklist with the 10 essential things to do as soon as you get engaged."} > 
                { sliderStep.length &&
                    <section page="StepByStep">
                        <Sliderprincipal slides = { sliderStep }/>
                        <section component="step">
                            <Titlesection
                            title={this.state.stepbystep.title}
                            subtitle={this.state.stepbystep.subtitle}
                            description={this.state.stepbystep.description}
                            urlBtnBack={[params.lang === "es" ? "/es/planeacion" : "/en/planning", params.lang === "es" ? "Regresar" : "Back"]}
                            />
                        </section>
                        <Step steps={this.state.stepbystep.steps}/>
                        <section component="step">
                            <div className="endSpace"></div>
                        </section>
                    </section>
                }
            </Layout>
        );
        
    }
}

export default StepByStep;
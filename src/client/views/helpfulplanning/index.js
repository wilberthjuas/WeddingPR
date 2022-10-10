/**
* @name: helpfulplanning.js
* @description: Página de /planning/get-in-the-know
* @author: Diego, Julian, Bruno, Wilberth , Sergio Trejo
* @version: 1.1.0*/
// TODO: Traducir

import React, { Component } from 'react';
import Layout from '../../components/layout';
import { Sliderprincipal,HelpfulList} from '../../components';
import { Titlesection } from '../../components/wirefragment';
import json from '../helpfulplanning/helpfulplanning';
class HelpfulPlanning extends Component {
    
    state = {
        sliderHelpful: [],
        helpful: {}
    };

    componentDidMount(){
        const { match: { params } } = this.props;
        switch (params.lang) {
            case "es":
                this.setState({
                    sliderHelpful:  json.es.sliderHelpful,
                    helpful:        json.es.helpful
                });
            break;
            default:
                this.setState({
                    sliderHelpful:  json.en.sliderHelpful,
                    helpful:        json.en.helpful
                });
            break;
        }
    } 

    render() {

        let { sliderHelpful } = this.state;
        const { match: { params } } = this.props;
      
        return (
            <Layout title = { params.lang === "en" ? "Helpful Planning Resources" : "Recursos de planificación útiles" } cID={"weddi00m"}
            description={"Let us help you on your destination wedding planning journey. Download PDF location guides, honeymoon packages, legal guidelines, and more."} >
                { sliderHelpful.length > 0 &&
                    <section page="HelpfulPlanning" component="helpfulList">
                        <Sliderprincipal slides = { sliderHelpful }/>
                        <Titlesection
                            title={this.state.helpful.title}
                            subtitle={this.state.helpful.subtitle}
                            description={this.state.helpful.description}
                            urlBtnBack={[params.lang === "es" ? "/es/planeacion" : "/en/planning", params.lang === "es" ? "Regresar" : "Back"]}
                        />
                        <p className="description">
                            {this.state.helpful.pdfText}
                        </p>
                        <HelpfulList helpful={this.state.helpful}/>
                    </section>
                }
            </Layout>
        );
        
    }
}

export default HelpfulPlanning;
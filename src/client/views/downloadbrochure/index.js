/**
* @name: downloadbrochure.js
* @description: Página de /planning/read-all-about-it
* @author: Diego, Julian, Bruno, Wilberth , Sergio Trejo
* @version: 1.1.0*/
// TODO: Traducir

import React, { Component } from 'react';
import Layout from '../../components/layout';
import { Sliderprincipal,BrochureForm } from '../../components';
import { Titlesection } from '../../components/wirefragment';
import json from '../downloadbrochure/downloadbrochure';

class DownloadBrochure extends Component {

    state = {
        sliderBrochure: [],
        downloadbrochure: {}
    };

    componentDidMount(){
        const { match: { params } } = this.props;
        switch (params.lang) {
           case "es":
                this.setState({
                    sliderBrochure:     json.es.sliderBrochure,
                    downloadbrochure:   json.es.downloadbrochure
                });
            break;
           default:
                this.setState({
                    sliderBrochure:     json.en.sliderBrochure,
                    downloadbrochure:   json.en.downloadbrochure
                });
            break;
        }
    } 

    render() {

        let { sliderBrochure } = this.state;
        const { match: { params } } = this.props;

        return(
            <Layout title = { params.lang === "en" ? "Palace Resorts Weddings Brochure" : "Folleto de bodas de Palace Resorts"} cID={"weddi00n"}
            description={"Download our Palace Resorts Weddings Brochure to learn more about all-inclusive destination weddings in Mexico and Jamaica. "} >
                { sliderBrochure.length > 0 &&
                   <section page="downloadbrochure">
                        <Sliderprincipal slides = { sliderBrochure }/>
                        <Titlesection
                            title={this.state.downloadbrochure.title}
                            subtitle={this.state.downloadbrochure.subtitle}
                            description={this.state.downloadbrochure.description}
                            urlBtnBack={[params.lang === "es" ? "/es/planeacion" : "/en/planning", params.lang === "es" ? "Regresar" : "Back"]}
                        />
                        <BrochureForm downloadbrochure = {this.state.downloadbrochure}/>
                    </section>
                }
            </Layout>
        );

    }
}

export default DownloadBrochure;
/**
* @name: planning.js
* @description: Página de /planning
* @author: Diego, Julian, Bruno, Wilberth , Sergio Trejo
* @version: 1.1.0*/

import React, { Component } from 'react';
import Layout from '../../components/layout';
import { Sliderprincipal } from '../../components';
import { Titlesection } from '../../components/wirefragment';
import Wemakeuniquegalery from '../../components/wemakeuniquegalery';
import json from '../planning/planning';
class Planning extends Component {

    state = {
        lang: "en",
        sliderPlanning: [],
        planning: {}
    };

    
    componentDidMount(){

        
        const { match: { params } } = this.props;
        
        switch (params.lang) {
           case "es":
                this.setState({
                    lang:               "es",
                    sliderPlanning:     json.es.sliderPlanning,
                    planning:           json.es.planning
                });
              break;
           default:
                this.setState({
                    sliderPlanning:     json.en.sliderPlanning,
                    planning:           json.en.planning
                });
              break;
        }
    } 

    render() {

        let { lang, sliderPlanning } = this.state;
                
        return(
            <Layout title = { lang === "en" ? "Wedding Planning" : "Tu boda perfecta paso a paso"} cID={"weddi00j"} 
            description={"Our helpful wedding resources make planning your dream destination wedding at Palace Resorts a breeze. "}            >
                { sliderPlanning.length > 0 &&
                    <section page="Planning">
                        <Sliderprincipal slides = { sliderPlanning }/>
                        <article component="planning">
                            <Titlesection title = { this.state.planning.title } subtitle = { this.state.planning.title2 } 
                                description = { this.state.planning.description }
                            />
                        </article>
                        <section component="wemakeunique">
                            <div className="wemakwuniqueContent">
                                <div className="separadorwemake-ttl-cont"></div>
                                <div className="container">
                                    <div className="content-galery flex">
                                        <Wemakeuniquegalery galery={this.state.planning.galery} take={true} btn={false}/>
                                    </div>
                                </div>
                            </div>
                            <div className="divicion-section"></div>
                        </section>
                    </section>

                }
            </Layout>
        );
    }
}

export default Planning;
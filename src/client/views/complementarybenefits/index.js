/**
 * @name: complementarybenefits.js
 * @description: Página de /complementary-benefits
 * @author: Wilberht, Otro, Sergio Trejo
 * @version: 1.1.0
*/

import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import Layout from '../../components/layout';
import { Sliderprincipal, Tabs, TabsDesk, Otherguest } from '../../components';
import benefits from './data';
import benefitsEs from './data_es';
import { Titlesection } from '../../components/wirefragment';
import WithContext from '../../app/Context';

class CompBenefits extends Component {

    state = {
        slider: [],
        compbenefits: [],
        otherguest: []
    };

    componentDidMount() {

        // Get the :lang param
        const { match: { params } } = this.props;
        switch (params.lang) {
           case "es":
              this.setState({
                slider:         benefitsEs.slider,
                compbenefits:   benefitsEs.compbenefits,
                otherguest:     benefitsEs.otherguest
              });
              break;
           default:
              this.setState({
                slider:         benefits.slider,
                compbenefits:   benefits.compbenefits,
                otherguest:     benefits.otherguest
              });
              break;
        }
        
     }

    render() {

        let { slider } = this.state;
        const { match: { params } } = this.props;
        
        return (
            <Layout title = { params.lang == "en" ? "Complimentary Benefits" : "Beneficios Complementarios" } cID={"weddi00h"}
            description={"Take advantage of complimentary wedding group benefits such as free rooms, free private events, free cocktail receptions, & more—up to $30K in value."}
            >
                { slider.length > 0 && 
                    <div page = "compbenefits">                
                        <Sliderprincipal slides={slider}/>
                        <Titlesection header title={this.state.compbenefits.Title} subtitle={this.state.compbenefits.Title2} description={this.state.compbenefits.Subtitle}></Titlesection>
                        <Tabs tabs={this.state.compbenefits.tabs}/>
                        <TabsDesk tabs={this.state.compbenefits.tabs}/>
                        <Otherguest />
                    </div> 
                }
            </Layout>
        );
    }
}

export default withRouter(WithContext(CompBenefits));
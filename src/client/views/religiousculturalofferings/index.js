/**
* @name: religious-and-cultural-offerings.js
* @description: Página de /religious-and-cultural-offerings
* @author: Diego, Julian, Bruno, Wilberth , Sergio Trejo
* @version: 1.1.0
// TODO: Indian sublista, otherguest
*/

import React, { Component } from 'react';
import Layout from '../../components/layout';
import { Compreligiousmain, Compreligiousmainmov, Sliderprincipal, Otherguest } from '../../components';

// JSON Data
import json from './data';

class ViewReligious extends Component {

    state = {
        lang:            "en",
        religiousSlider: [],
        religious:       [],
        religiousItems:  [],
        otherguest:      json.otherguest,
    };

    componentDidMount(){

        // Get the :lang param
      const { match: { params } } = this.props;
      switch (params.lang) {
         case "es":
            this.setState({
                lang:               "es",
                religiousSlider:    json.ReligiousMainSlider,
                religious:          json.ReligiousMainES,
                religiousItems:     json.ReligiousMainES[0].religiousItems,
                otherguest:      json.otherguestES,             
                carousel:           json.carouselES,
            });
            break;
         default:
            this.setState({
                religiousSlider:    json.ReligiousMainSlider,
                religious:          json.ReligiousMain,
                religiousItems:     json.ReligiousMain[0].religiousItems,
                carousel:           json.carousel,                
            });
            break;
      }
    } 

    render() {

        let { lang, religiousSlider } = this.state;
        return (
            <Layout title = { lang === "en" ? "Religious & Multicultural Weddings" : "Ceremonias Religiosas y Culturales"} cID={"weddi00o"}
            description={"Celebrate your traditions, your way. We host all kinds of wedding ceremonies: nondenominational, Catholic, Jewish, interfaith, South Asian, & Mayan. "} >
                { religiousSlider.length > 0 &&
                    <section page="ReligiousCultural">
                        <Sliderprincipal slides = { religiousSlider } />
                        <Compreligiousmain heading = { this.state.religious } itemsrel = { this.state.religiousItems } 
                            params = { this.props.match.params }/>
                        <Compreligiousmainmov heading = { this.state.religious } itemsrel = { this.state.religiousItems } />
                        <Otherguest state = {
                            {
                                title:this.state.carousel[0].title,
                                title2:this.state.carousel[0].title2,
                                galery:this.state.carousel[0].carouselItems}
                            }/>
                    </section>
                }
            </Layout>
        );
    }
}

export default ViewReligious;
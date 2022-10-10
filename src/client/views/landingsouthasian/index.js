import React, { Component } from 'react';
import Layout from '../../components/layout';
import json from './data';
import { Sliderprincipal, Compreligiousmain, Compreligiousmainmov } from '../../components';

class LandingSouthAsian extends Component {
    constructor(props) {
        super(props);
        this.state = {   lang:            "en",
        religiousSlider: [],
        religious:       [],
        religiousItems:  [],
        otherguest:      json.otherguest, };
    }


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
           <Layout title={"South Asian"}>
                { religiousSlider.length > 0 &&
                    <section page="ReligiousCultural" className="landingsouthasianweddings">
                        <Sliderprincipal slides = { religiousSlider } />
                        <Compreligiousmain heading = { this.state.religious } itemsrel = { this.state.religiousItems } 
                            params = { this.props.match.params }/>
                        <Compreligiousmainmov heading = { this.state.religious } itemsrel = { this.state.religiousItems } />
                   
                    </section>
                }
           </Layout>
        );
    }
}

export default LandingSouthAsian;
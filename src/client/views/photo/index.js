/**
* @name: photo.js
* @description: Página de /real-weddings-gallery/:string
* @author: Diego, Julian, Bruno, Wilberth , Sergio Trejo
* @version: 1.1.0*/

import React, { Component } from 'react';
import Layout from '../../components/layout';
import { Sliderprincipal, CompPhotos } from '../../components';

// JSON Data
import datos from './datos';

class ViewPhoto extends Component {
    
    state = {
        lang:       "en",
        mainSlider: [],
        heading:    [],
        items:      []
    };
    

    componentDidMount(){

        let resort = this.props.match.params.resort;
        resort = resort.replace(/-/g, "");
        
        const { match: { params } } = this.props;
        switch (params.lang) {
            case "es":
                this.setState({
                    lang:       "es",
                    mainSlider: datos.resortES[0][resort][0].slide,
                    heading:    datos.resortES[0][resort][0].heading,
                    items:      datos.resortES[0][resort][0].items,
                    cID:      datos.resortES[0][resort][0].cID
                });
            break;
            default:
                this.setState({
                    mainSlider: datos.resort[0][resort][0].slide,
                    heading:    datos.resort[0][resort][0].heading,
                    items:      datos.resort[0][resort][0].items,
                    cID:      datos.resort[0][resort][0].cID
                });
            break;
        }

    } 

    render(){

        let { lang, mainSlider } = this.state;
            
        return (
            <Layout title = { lang === "en" ? "Gallery": "Galería" } cID={ this.state.cID ? this.state.cID : "" } >
                { mainSlider.length > 0 && 
                    <section page="Photos">
                        <Sliderprincipal slides={this.state.mainSlider} />
                        <CompPhotos heading={this.state.heading} itemsPhotos={this.state.items} />
                    </section>
                }
            </Layout>
        );
    }
}

export default ViewPhoto;
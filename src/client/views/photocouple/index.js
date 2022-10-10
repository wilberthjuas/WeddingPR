/**
* @name: photocouple.js
* @description: Página de real-weddings-gallery/playacar-palace/:string
* @author: Diego, Julian, Bruno, Wilberth , Sergio Trejo
* @version: 1.1.0*/

import React, { Component } from 'react';
import Layout from '../../components/layout';
import { Sliderprincipal, CompPhotoCouple } from '../../components';
import datos from './datos';

class ViewPhotoCouple extends Component {

    state = {
        lang: "en",
        mainSlider:[],
        heading:[],
        items:[],
    };

    componentDidMount(){

        let resort = this.props.match.params.resort;
        let resort_couple = this.props.match.params.couple;
        resort = resort.replace(/-/g, "");
        resort_couple = resort_couple.replace(/-/g, "");
        
        const { match: { params } } = this.props;
        switch (params.lang) {
            case "es":
                this.setState({
                    lang:       "es",
                    mainSlider: datos.resortES[0][resort][0][resort_couple][0].slide,
                    heading:    datos.resortES[0][resort][0][resort_couple][0].heading,
                    items:      datos.resortES[0][resort][0][resort_couple][0].items,
                });
            break;
            default:
                this.setState({
                    mainSlider: datos.resort[0][resort][0][resort_couple][0].slide,
                    heading:    datos.resort[0][resort][0][resort_couple][0].heading,
                    items:      datos.resort[0][resort][0][resort_couple][0].items,
                });
            break;
        }

    } 

    render(){

        let { lang, mainSlider } = this.state;

        return (
            <Layout title = { lang === "en" ? "Gallery": "Galería" }>
                { mainSlider.length > 0&&
                    <section page="Photos">
                        <Sliderprincipal slides={mainSlider} />
                        <CompPhotoCouple heading={this.state.heading} itemsPhotos={this.state.items} />
                    </section>
                }
            </Layout>
        );
    }
}

export default ViewPhotoCouple;
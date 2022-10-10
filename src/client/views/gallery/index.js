/**
* @name: gallery.js
* @description: Página de /gallery
* @author: Diego, Julian, Bruno, Wilberth , Sergio Trejo
* @version: 1.1.0*/

import React, { Component } from 'react';
import Layout from '../../components/layout';
import datos from './datos';
import jsonData from './../../views/home/data';;
import { Sliderprincipal, Compgallery } from '../../components';

class ViewGallery extends Component {

    state = {
        lang: "en",
        gallerySlider:[],
        gallerySliderTitle:[],
        carousel:datos.carousel,
        morethan:jsonData.morethan
    };

    componentDidMount() {

        const { match: { params } } = this.props;
        switch (params.lang) {
            case "es":
                this.setState({
                    lang:               "es",
                    gallerySlider:      datos.GalleryMainSliderES,
                    carousel:           datos.carouselES,
                    gallerySliderTitle: datos.GalleryMainSlider2
                });
                break;
            default:
                this.setState({
                    gallerySlider:      datos.GalleryMainSlider,
                    gallerySliderTitle: datos.GalleryMainSlider2
                });
            break;
        }
    } 

    render() {
        let { lang, gallerySlider } = this.state;
        return (
            <Layout title = { lang === "en" ? "Gallery" : "Galería"} cID={"weddi00p"}
            description={"Want to see what a Palace Resorts destination wedding is all about? Explore our gallery of real weddings. "} >
                { gallerySlider.length > 0 &&
                    <section page="GalleryWeddings">
                        <Sliderprincipal slides = { this.state.gallerySliderTitle } />
                        <Compgallery heading = { gallerySlider } carousel = { this.state.carousel } 
                            morethan = { this.state.morethan } 
                        />
                    </section>
                }
            </Layout>
        );
    }
}

export default ViewGallery;
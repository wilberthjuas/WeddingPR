/**
* @name: real-weddings/testimonials.js
* @description: Página de /real-weddings/testimonials
* @author: Diego, Julian, Bruno, Wilberth , Sergio Trejo
* @version: 1.1.0*/

import React, { Component } from 'react';
import Layout from '../../components/layout';
import { Sliderprincipal, CompTestimonials } from '../../components';
import secciones from './datos';

class ViewTestimonials extends Component {

    state = {
        lang: "en",
        testimonialsSlider:[],
        testimonialsHeading:[],
        facebook:[],
        tripadvisor:[],
        videos:[],
    };

    componentDidMount(){
        const { match: { params } } = this.props;
        switch (params.lang) {
            case "es":
                this.setState({
                    lang:                   "es",
                    testimonialsSlider:     secciones.MainSlider,
                    testimonialsHeading:    secciones.HeadingES,
                    facebook:               secciones.FacebookES,
                    tripadvisor:            secciones.TripadvisorES,
                    videos:                 secciones.VideosES,
                });
                break;
            default:
                this.setState({
                    testimonialsSlider:     secciones.MainSlider,
                    testimonialsHeading:    secciones.Heading,
                    facebook:               secciones.Facebook,
                    tripadvisor:            secciones.Tripadvisor,
                    videos:                 secciones.Videos,
                });
            break;
        }
    } 

    render() {

        let { lang, testimonialsSlider } = this.state;

        return (
            <Layout title = {lang == "en" ? "Testimonials" : "Testimonios"}
            description={"Take a look at what our real couples have to say about a destination wedding at Palace Resorts. "} >
                { testimonialsSlider.length > 0 &&
                    <section page="Testimonials">
                        <Sliderprincipal slides = { testimonialsSlider } />
                        <CompTestimonials heading={this.state.testimonialsHeading} facebook={this.state.facebook} tripadvisor={this.state.tripadvisor} videos={this.state.videos}/>
                    </section>
                }
            </Layout>
        );
    }
}

export default ViewTestimonials;
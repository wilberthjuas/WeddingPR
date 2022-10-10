/**
* @name: real-weddings/videos.js
* @description: Página de /real-weddings/videos
* @author: Diego, Julian, Bruno, Wilberth , Sergio Trejo
* @version: 1.1.0*/

import React, { Component } from 'react';
import Layout from '../../components/layout';
import { Sliderprincipal, CompVideos } from '../../components';

// JSON Data
import secciones from './datos';

class ViewVideos extends Component {

    state = {
        testimonialsSlider: [],
        testimonialsHeading: [],
        videos: []
    };

    componentDidMount(){
        const { match: { params } } = this.props;
        switch (params.lang) {
            case "es":
                this.setState({
                    testimonialsSlider:     secciones.MainSlider,
                    testimonialsHeading:    secciones.HeadingES,
                    videos:                 secciones.Videos
                });
                break;
            default:
                this.setState({
                    testimonialsSlider:     secciones.MainSlider,
                    testimonialsHeading:    secciones.Heading,
                    videos:                 secciones.Videos
                });
            break;
        }
    } 

    render(){

        let { testimonialsSlider } = this.state;
        const { match: { params } } = this.props;

        return(
            <Layout title={params.lang == "en" ? "Videos" : "Videos" }
            descriptions={"View videos of real destination weddings at Palace Resorts. "} >
                { testimonialsSlider.length > 0 &&
                    <section page="Videos">
                        <Sliderprincipal slides = { testimonialsSlider } />
                        <CompVideos heading={this.state.testimonialsHeading} videos={this.state.videos}/> 
                    </section>
                }
            </Layout>
        );
    }

}

export default ViewVideos;
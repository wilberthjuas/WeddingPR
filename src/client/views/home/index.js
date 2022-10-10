/**
 * @name: index.js
 * @description: Página de /home
 * @author: Team
 * @version: 1.1.0
 *
*/

import React, { Component } from 'react';
import Layout from '../../components/layout';
import {
    Sliderprincipal, Planingslider, Morethan, Sweptaway, Nowdream,
    Realwedding, Wellmakeyour, Allaboutweddings, Ourplaningservice
} from '../../components';
import ErrorCatching from "../../components/error";

// JSON Data
import data     from './data';
import dataES     from './data_ES';

export default class HomeView extends Component {

    state = {
        lang:               "en",
        sliderPrincipal:    data.sliderPrincipal,
        letplanwedd:        data.letplanwedd,
        morethan:           data.morethan,
        nowthedream:        data.nowthedream,
        realwedd:           data.realwedd,
        Wellmakeyour:       data.Wellmakeyour,
        allabout:           data.allabout,
        Ourplaningservice:  data.Ourplaningservice
    };

    componentDidMount() {

        const { match: { params } } = this.props;
        if (params.lang === "es") {
            this.setState({
                lang:               "es",
                sliderPrincipal:    dataES.sliderPrincipalES,
                letplanwedd:        dataES.letplanweddES,
                morethan:           dataES.morethanES,
                nowthedream:        dataES.nowthedreamES,
                realwedd:           dataES.realweddES,
                Wellmakeyour:       dataES.WellmakeyourES,
                allabout:           dataES.allaboutES,
                Ourplaningservice:  dataES.OurplaningserviceES,
            });
        }else{
            this.setState({
                sliderPrincipal:    data.sliderPrincipal,
                letplanwedd:        data.letplanwedd,
                morethan:           data.morethan,
                nowthedream:        data.nowthedream,
                realwedd:           data.realwedd,
                Wellmakeyour:       data.Wellmakeyour,
                allabout:           data.allabout,
                Ourplaningservice:  data.Ourplaningservice,
            });
        }
    }

    render() {

        let { lang, sliderPrincipal } = this.state;
        const { match: { params } } = this.props;


        return (
            <Layout
                title = { lang === "en" ? "Leader in All-Inclusive Destination Weddings" : "Los mejores destinos de bodas" }
                description={"Palace Resorts does destination weddings in Mexico & Jamaica like no one else. If you can dream it, our wedding planners can help make it a reality."}
                cID={"weddi000"}
            >
                <div page="home">
                    <div page="content">
                        <Sliderprincipal class="filterImg" typeCaptionBg={"type1"} slides={sliderPrincipal} />
                        <Planingslider items = { this.state.letplanwedd } />
                        <Sweptaway data={this.state.nowthedream} />
                        <Morethan data={this.state.morethan} />
                        <Nowdream data = { this.state.nowthedream } />
                        <Realwedding data={this.state.realwedd} />
                        <ErrorCatching  message={"Oops! an error has ocurred"}>
                            <Wellmakeyour static={true} state={this.state.Wellmakeyour} />
                        </ErrorCatching>
                        <Allaboutweddings state = { this.state.allabout }  />
                        <Ourplaningservice state={this.state.Ourplaningservice} />
                    </div>
                </div>
            </Layout>
        );
    }
}

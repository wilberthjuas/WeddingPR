/**
 * @name: destinationweddings.js
 * @description: Página de /destinationweddings
 * @author: Wilberht, Otro, Sergio Trejo
 * @version: 1.1.0
*/

import React, { Component } from 'react';
import Layout from '../../components/layout';
import { Wemakeunique, Sliderprincipal } from '../../components';

// JSON Data
import data from './data';
import dataES from './data_es';

class CompDestination extends Component {    

    state = {
        lang: "en",
        sliderwemakeunique: [],
        wemakeunique: [],
    };

    componentDidMount() {
        // Get the :lang param
        const { match: { params } } = this.props;
        switch (params.lang) {
            case "es":
                this.setState({
                    sliderwemakeunique:dataES.sliderwemakeunique,
                    wemakeunique:dataES.wemakeunique,
                    lang: "es"
                })
                break;
            default:
                this.setState({
                    sliderwemakeunique:data.sliderwemakeunique,
                    wemakeunique:data.wemakeunique,
                });
            break;
        }
    }

    render() {

        let { lang, sliderwemakeunique, wemakeunique } = this.state;

        return (
            <Layout title = { lang === "en" ? "The Benefits of a Destination Wedding" : "Destinos de Bodas"} cID={"weddi00g"}
            description={"Countless locations across 10 resorts in Mexico & Jamaica, inspiring collections, amazing offers… The wedding benefits add up at Palace Resorts. "} >
                { sliderwemakeunique.length > 0 &&
                    <div page = "destinationweddings">
                        <Sliderprincipal slides={sliderwemakeunique}/>
                        <Wemakeunique state={wemakeunique}/>
                    </div>
                }
            </Layout>
        );
        
    }
}

export default CompDestination;
/**
 * @name: whydestinationweddings.js
 * @description: Página de /whydestinationweddings
 * @author: Wilberht, Otro, Sergio Trejo
 * @version: 1.1.0
*/

import React, { Component } from 'react';
import Layout from '../../components/layout';
import { Sliderprincipal, Whydestinationwedd, Otherguest } from '../../components';

// JSON Data
import data from './data';
import dataES from './data_es';
import { Titlesection } from '../../components/wirefragment';

class Componentwhydestinationwed extends Component {

    state = {
        sliderwhydestiwedd: [],
        whydestiwedd: [],
        otherguest: [],
    };

    componentDidMount() {
        // Get the :lang param
        const { match: { params } } = this.props;
        switch (params.lang) {
            case "es":
                this.setState({
                    sliderwhydestiwedd: dataES.sliderwhydestiwedd,
                    whydestiwedd: dataES.whydestiwedd,
                    otherguest: dataES.otherguest,
                    carousel: dataES.carousel,
                })
                break;
            default:
                this.setState({
                    sliderwhydestiwedd: data.sliderwhydestiwedd,
                    whydestiwedd: data.whydestiwedd,
                    otherguest: data.otherguest,
                    carousel: data.carousel,
                });
            break;
        }
    }
    render() {

        let { sliderwhydestiwedd, whydestiwedd, otherguest } = this.state;
        const { match: { params } } = this.props;

        return (
            <Layout title={ params.lang === "en" ? "Why You Should Have a Destination Wedding" : "¿Por qué una boda en Palace Resorts?"}
            description={"Here are 3 reasons to have a destination wedding at Palace Resorts: Less stress, less expense, and more fun. Set your wedding date and then relax."} >
                {sliderwhydestiwedd.length > 0 &&
                    <div page="whydestination">
                        <Sliderprincipal slides={sliderwhydestiwedd} />
                        <Whydestinationwedd lang = { params.lang } state={whydestiwedd} />
                        <Titlesection title={otherguest.title} />
                        <Otherguest  />
                    </div>
                }
            </Layout>
        );
    }
}

export default Componentwhydestinationwed;
/**
* @name: helpfulinspiringinfo.js
* @description: Página de /destinationweddings/helpfulinspiringinfo
* @author: Diego, Julian, Bruno, Wilberth , Sergio Trejo
* @version: 1.1.0
*/
// TODO: Traducir

import React, { Component } from 'react';
import Layout from '../../components/layout';
import { withRouter } from 'react-router-dom';
import { Sliderprincipal, Helpfulinspiringinfo } from '../../components';

// JSON Data
import json from '../comphelpfulinspiringinfo/comphelpfulinspiringinfo';
import jsonEs from '../comphelpfulinspiringinfo/data_ES';

class Comphelpfulinspiringinfo extends Component {

    state = {
        sliderhelpfulinspiringinfo: [],
        helpfulinspiringinfo: [],
    };

    componentDidMount() {
        const { match: { params } } = this.props;
        switch (params.lang) {
            case "es":
                this.setState({
                    sliderhelpfulinspiringinfo: jsonEs.sliderhelpfulinspiringinfo,
                    helpfulinspiringinfo: jsonEs.helpfulinspiringinfo
                });
                break;
            default:
                // Code
                this.setState({
            sliderhelpfulinspiringinfo: json.sliderhelpfulinspiringinfo,
            helpfulinspiringinfo: json.helpfulinspiringinfo
        });
            break;
        }
        
    }
    

    render() {

        let { sliderhelpfulinspiringinfo } = this.state;
        const { match: { params } } = this.props;

        return (
            <Layout title={ params.lang === "en" ? "Planning Resources" : "Información útil"}
            description={"Learn more about our collections, locations, important dates, honeymoon packages, and more with our helpful destination wedding planning resources. "} >
                {sliderhelpfulinspiringinfo.length > 0 &&
                    <div page="Destination">
                        <Sliderprincipal slides={sliderhelpfulinspiringinfo} />
                        <Helpfulinspiringinfo lang = { params.lang } state={this.state.helpfulinspiringinfo} />
                    </div>
                }
            </Layout>
        );
    }
}

export default withRouter(Comphelpfulinspiringinfo);
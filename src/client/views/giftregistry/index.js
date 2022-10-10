/**
* @name: giftregistry.js
* @description: Página de /planning/giftregistry
* @author: Diego, Julian, Bruno, Wilberth , Sergio Trejo
* @version: 1.1.0*/

import React, { Component } from 'react';
import Layout from '../../components/layout';
import { Sliderprincipal } from '../../components';
import { Titlesection,Input } from '../../components/wirefragment';
import { Cell } from '../../components/grid';
import { Grid } from '../../components';

// JSON Data
import json from './../../../../planning';

class GiftRegistry extends Component {
    
    state = {
        sliderCheckList: [],
        giftregistry: {}
    };

    componentDidMount(){
        this.setState({
            sliderCheckList:    json.sliderGift,
            giftregistry:       json.giftregistry
        });
    } 

    render(){

        let { sliderCheckList } = this.state;
                 
        return (
            <Layout title = "Gift Registry">
                { sliderCheckList.length > 0 && 
                    <section page="GiftRegistry">
                        <Sliderprincipal slides = { sliderCheckList }/>
                        <Titlesection
                        title={this.state.giftregistry.title}
                        subtitle={this.state.giftregistry.subtitle}
                        description={this.state.giftregistry.description}
                        urlBtnBack={["/en/planning","Back"]}
                        />
                        <div className="movil">
                        <article component="giftregistry">
                            <p className="description">{this.state.giftregistry.texto1}</p>
                            <p className="description secondDesciption">{this.state.giftregistry.texto2}
                            <br></br> <br></br>{this.state.giftregistry.texto3}</p>
                        </article>
                        </div>
                        <div className="desktop"  component="giftregistry">
                            <article className="container">
                                <Grid type="x" >
                                    <Cell large="6" small="6">
                                    <p className="description"> {this.state.giftregistry.texto1}</p>
                                    </Cell>
                                    <Cell large="6" small="6">
                                        <p className="description secondDesciption" >{this.state.giftregistry.texto2}<br></br> <br></br>{this.state.giftregistry.texto2}</p>
                                    </Cell>
                                </Grid>
                            </article>
                        </div>
                        <article component="checkl">
                            <center className="printButton">
                                <Input type={"href"} typBtn={5} value={"Learn more"} color={"pink"} to={'https://palaceresorts.honeymoonwishes.com/'} target={true}/>
                            </center>
                        </article>
                    </section>
                }
            </Layout>
        );
    }
}

export default GiftRegistry;
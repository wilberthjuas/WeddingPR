/**
* @name: checklist.js
* @description: Página de /planning/i-do-to-do
* @author: Diego, Julian, Bruno, Wilberth , Sergio Trejo
* @version: 1.1.0*/

import React, { Component } from 'react';
import Layout from '../../components/layout';
import { Sliderprincipal ,CheckL } from '../../components';
import json from '../checklist/checklist';
import { Titlesection,Input } from '../../components/wirefragment';


class CheckList extends Component {

    state = {
        sliderCheckList:[],
        checkList: {},
    };

    componentDidMount(){
        const { match: { params } } = this.props;
        switch (params.lang) {
           case "es":
                this.setState({
                    sliderCheckList:    json.es.sliderCheckList,
                    checkList:          json.es.checkList
                });
              break;
           default:
                this.setState({
                    sliderCheckList:    json.en.sliderCheckList,
                    checkList:          json.en.checkList
                });
              break;
        }
    } 

    render(){
        let { sliderCheckList } = this.state;
        const { match: { params } } = this.props;
        return(
            <Layout title = { params.lang === "en" ? "\"I Do\" To-Do's" : "¿No sabes cómo organizar tu boda?" } cID={"weddi00l"}
            description={"Save these dates. Download our custom timeline checklist to keep you on track while planning your destination wedding at Palace Resorts."}>
                { sliderCheckList.length > 0 &&
                    <section page="CheckList">
                        <Sliderprincipal slides = { sliderCheckList }/>
                        <article component="checkl">
                        <Titlesection
                            title={this.state.checkList.title}
                            subtitle={this.state.checkList.subtitle}
                            description={this.state.checkList.description}
                            urlBtnBack={[params.lang === "es" ? "/es/planeacion" : "/en/planning", params.lang === "es" ? "Regresar" : "Back"]}
                        />
                        <CheckL list={this.state.checkList.list}/>
                        <center className="printButton">
                            <Input type={"href"} typBtn={5} to={this.state.checkList.buttonUrl} value={this.state.checkList.buttonText} color={"pink "} />
                        </center>
                        </article>
                    </section>
                }
            </Layout>
        );
    }
}

export default CheckList;
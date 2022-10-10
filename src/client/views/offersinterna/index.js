/**
* @name: offersinterna.js
* @description: Página de /offers/:string
* @author: Diego, Julian, Bruno, Wilberth , Sergio Trejo
* @version: 1.1.0*/

// TODO: Traducir

import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Layout from '../../components/layout';
import { Sliderprincipal,Sweptaway, CompLandingTabs, Nowdream, BookingWidgetMobile } from '../../components';
import { Titlesection } from '../../components/wirefragment';
import api from '../../app';

class OffersInsterna extends Component {

    state = {
        lang: "en",
        items:[],
        offer:{},
    };

    async getIP() {
        try {
           let ip2 = ""
           let response = await fetch('https://api.ipify.org');
           ip2 = await response.text();
           let country_list = ["CO", "AR", "BO", "CL", "CR", "CU", "EC", "SV", "GT", "HT", "HN", "NI", "PA", "PY", "PE", "DO", "UY", "VE", "MX"]
           let iso_get = "";

           setTimeout(() => {
              if (ip2 != "" && /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip2)) {
              api.getCountrybyIP(ip2)
                 .then(res => {

                    iso_get = res.data.country_code_iso_2

                    this.setState({
                        iso:iso_get
                    })
                 }).catch(e => console.error(e));
              }
           }, 1000);

        } catch {
           this.setState({
              versionlang: "/en"
           })
        }
     }

    componentDidMount(){
        const { match: { params } } = this.props;
        const offer = params.offersId.split('-').join('')
        this.getIP();


        var jsonEn = require('./internaOffers');
        var jsonEs = require('./internaOffersEs');

        if (!jsonEn.default[offer] && !jsonEs.default[offer]){
            let lenguage = 'en'
            lenguage = localStorage.getItem('language') ?? localStorage.getItem('langWeddings')
            window.location.href = `/${lenguage}/404notfound`;
        }
        switch (params.lang) {
           case "es":
                var json = require('./internaOffersEs');
                this.setState({
                    lang: "es",
                    items:json.default[offer].items,
                    slider:json.default[offer].slider,
                    title:json.default[offer].title,
                    seoTitle:json.default[offer].seoTitle,
                    seoDesc:json.default[offer].seoDesc,
                    description:json.default[offer].subtitle,
                    Nowdream:json.default[offer].nowthedream,
                    offer:json.default[offer],
                    country:""
                });
            break;
           default:
                var json = require('./internaOffers');
                this.setState({
                    lang: "en",
                    items:json.default[offer].items,
                    slider:json.default[offer].slider,
                    title:json.default[offer].title,
                    seoTitle:json.default[offer].seoTitle,
                    seoDesc:json.default[offer].seoDesc,
                    description:json.default[offer].subtitle,
                    Nowdream:json.default[offer].nowthedream,
                    offer:json.default[offer]  ,
                    country:""
                });

            break;
        }




    }


    componentWillReceiveProps (){
        window.location.reload();
    }
    render(){
        let { lang } = this.state;
        let check = lang=="es"?"/ofertas":"/offers"
        return(
            <Layout title = { this.state.seoTitle ? this.state.seoTitle : this.state.title }
            description={this.state.seoDesc ? this.state.seoDesc : null  } >
            {this.state.items.length > 0 &&
                <section page="OffersInterna">
                    <Sliderprincipal typeCaptionBg={"type2"} slides={this.state.slider} />
                    <Titlesection header btnOffers="yes" title={this.state.title} subtitle={this.state.description} urlBtnBack={["/"+this.props.match.params.lang+check,this.props.match.params.lang=='en'?"Back":"Regresar"]}></Titlesection>
                    <CompLandingTabs offer={this.state.offer} imgbanner={this.state.slider} description={this.state.description} lang={this.state.lang} iso={this.state.iso}title_share={this.state.title}/>
                    <Nowdream data={this.state.Nowdream} />
                    <Sweptaway data={this.state.Nowdream}/>

                </section>
            }
            </Layout>
        );
    }
}
export default OffersInsterna;

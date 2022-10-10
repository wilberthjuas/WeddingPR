/**
* @name: faq.js
* @description: Página de /faqs
* @author: Diego, Julian, Bruno, Wilberth , Sergio Trejo
* @version: 1.1.0*/
// TODO: Traducir

import React, { Component } from 'react';
import Layout from '../../components/layout';
import { Sliderprincipal, FaqList} from '../../components';
import { Titlesection } from '../../components/wirefragment';

// JSON Data
import api from '../../app';
import json from './datos';

class FAQ extends Component {
	
    state = {
        lang: "en",
        sliderFAQ:[],
        faq: {},
    };
    
    getFaq() {
        let obj = {
          "id_market": 1,
          "id_content_type": 3,
          "status": 1,
          "id_general": 8
        };
        api.getSingleContent(obj)
        .then( 
            res => {
                this.concludePost(JSON.parse(res.data))
            }).catch( e =>{
                console.error(e)
                this.localJsonFaq()
            }
        );
    }

    concludePost(response)
    {   
        let slider = response.data[0].slider;
        let faq = response.data[0]
        this.setState({
            sliderFAQ:slider,
            faq:faq
        });
    }

    componentDidMount(){   
        const { match: { params } } = this.props;
        switch (params.lang) {
            case "es":
                this.setState({
                    lang: "es",
                    sliderFAQ:json.es.faq.slider,
                    faq:json.es.faq,
                    lang: params.lang
                });
                break;
            default:
                this.setState({
                    sliderFAQ:json.en.faq.slider,
                    faq:json.en.faq,
                    lang: params.lang
                });
            break;
        }
    } 

    render() {

        let { lang, sliderFAQ } = this.state;
                
        return (
            <Layout title = { lang === "en" ? "FAQs" : "Preguntas frecuentes"} cID={"weddi00v"}
            description={"Find answers to frequently asked questions about destination weddings and honeymoons at Palace Resorts."} >
                { sliderFAQ.length > 0 &&
                    <section page="faq">
                        <Sliderprincipal slides = { sliderFAQ }/>
                        <article component="checkl">
                            <Titlesection
                                title={this.state.faq.title}
                                subtitle={this.state.faq.subtitle}
                                description={this.state.faq.description}
                            />
                            <FaqList list = { this.state.faq.list } lang = { this.state.lang } />
                        </article>
                    </section>
                }
            </Layout>
        );
    }
}

export default FAQ;

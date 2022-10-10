/**
* @name: componentpalaceresortzquiz.js
* @description: Página de /destinationweddings/palaceresortzquiz
* @author: Diego, Julian, Bruno, Wilberth , Sergio Trejo
* @version: 1.1.0*/
// TODO: Traducir

import React, { Component } from 'react';
import Layout from '../../components/layout';
import { Sliderprincipal, Whichpalaceresorts } from '../../components';
import data from './data';
import data_ES from './data_ES';
import { withRouter } from 'react-router-dom';

class Componentpalaceresortzquiz extends Component {
    
    constructor() {
        super();
        this.state = {
            lang: "en",
            sliderstart: [],
            sliderquizwhichpalace: [],
            quizall: [],
            whichpalaceresorts: [],
            formQuiz: [],
            resultQuiz:[]
        }
        this.refSldPrn = React.createRef();
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        console.log(params.lang)
        switch (params.lang) {
            case "es":
                this.setState({
                    lang: "es",
                    sliderstart: data_ES.sliderstart,
                    sliderquizwhichpalace: data_ES.sliderquizwhichpalace,
                    quizall: data_ES.quizall,
                    whichpalaceresorts: data_ES.whichpalaceresorts,
                    formQuiz: data_ES.formQuiz,
                    resultQuiz: data_ES.resultQuiz,
                });       
            break;
            default:
                this.setState({
                    lang: "en",
                    sliderstart: data.sliderstart,
                    sliderquizwhichpalace: data.sliderquizwhichpalace,
                    quizall: data.quizall,
                    whichpalaceresorts: data.whichpalaceresorts,
                    formQuiz: data.formQuiz,
                    resultQuiz: data.resultQuiz,
                });
            break;
        }
    }

    render() {

        let { lang, sliderstart } = this.state;        
        
        return (
            <Layout title = { lang === "en" ? "Resort Quiz" : "¿Cuál resort es ideal para tu boda?" }>
                { sliderstart.length > 0 &&
                    <div page="palaceresortzquiz">
                        <section ref = { this.refSldPrn }>
                            <Sliderprincipal slides = { sliderstart } />
                        </section>
                        <Whichpalaceresorts refPr={this.refSldPrn} 
                        state={this.state.whichpalaceresorts} 
                        quiz={this.state.quizall.quiz} 
                        slides={this.state.sliderstart} 
                        sliders={this.state.sliderquizwhichpalace
                        }
                        lang={this.state.lang}
                        resultQuiz={this.state.resultQuiz}
                        formQuiz={this.state.formQuiz} />
                    </div>
                }
            </Layout>
        );
    }
}

export default withRouter(Componentpalaceresortzquiz);
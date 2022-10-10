/**
* @name: tour.js
* @description: Página de /tours/:string
* @author: Bruno, Wilberth 
* @version: 1.1.0*/

import React, { Component } from 'react';
import Layout from '../../components/layout';
import { Sliderprincipal, Otherguest,Tabs } from '../../components';
import { Titlesection,Input } from '../../components/wirefragment';

class Tour extends Component {

    constructor(props){
        super();
        this.state = {
            slidertour:[],
            tour: {},
            dest: props.location.pathname.split('/')[3].split('-').join('')  
        };
        this.tourItems = this.tourItems.bind(this);
    }

    componentDidMount(){
        const dest = this.state.dest
        const { match: { params } } = this.props;
        switch (params.lang) {
           case "es":
                var json = require('../tour/tourEs')
                this.setState({
                    slidertour: json.default[dest].slider,
                    tour:       json.default[dest]
                });
              break;
           default:
                var json = require('../tour/tourEn')
                this.setState({
                    slidertour: json.default[dest].slider,
                    tour:       json.default[dest]
                });
              break;
        }
    }

    tourItems(){
        const content = this.state.tour.tours.map((element,index) => {
            return(
                <section key={index}>
                    {(index%2)!=1?
                        <article  className="tourItem">
                            <div className="imgCont">
                                <div className="tittleCont">
                                    <h2 className="imgcaptions  tourTitle">{element.Title}</h2>
                                </div>
                                <img alt={element.Title} src={element.ImgMobile} />
                            </div>
                            <div className="infoCont">
                                {element.description.map((element,index)=>{ 
                                    return(
                                        <p  key={index} className="description tourText description">{element}</p>
                                    )})
                                }
                            </div>
                        </article>:
                        <article  className="tourItem">
                            <div className="infoCont">
                                {element.description.map((element,index)=>{ 
                                    return(
                                        <p  key={index} className="description tourText description">{element}</p>
                                    )})
                                }
                            </div>
                            <div className="imgCont">
                                <div className="tittleContRight">
                                    <h2 className="imgcaptions tourTitle tourTitleRight">{element.Title}</h2>
                                </div>
                                <img alt={element.Title} src={element.ImgMobile} />
                            </div>
                        </article>
                    }
                </section>
            )})
        return content
    }
    
    render() {

        let { slidertour } = this.state;
        const { match: { params } } = this.props;
               console.log(this.state)
        return (
            <Layout title = { this.state.tour.title2 }>
                    { slidertour.length > 0 &&
                    <section page="tour" component="tour">
                        <Sliderprincipal slides = { slidertour }/>
                        <Titlesection title={this.state.tour.title} subtitle={this.state.tour.subtitle} 
                        description={this.state.tour.description} 
                        urlBtnBack={[("/"+this.props.match.params.lang + (params.lang === "es" ? "/destino/" : "/destination/") + this.state.tour.destination),params.lang === "es" ? "REGRESAR": "BACK"]}
                        ></Titlesection>
                        <article className="desktop container tourDesktop">
                            {this.tourItems()}
                            <Titlesection title={params.lang === "es" ? "Otros huéspedes <span>están disfurtando</span>" : "Other guests <span>are also enjoying</span>"}/>
                            <Otherguest data={{otherguest:this.state.tour.otherguest}} />
                        </article>
                        <article className="movil tourMovil">
                            <Tabs tabs={this.state.tour.tours}/>
                            <Titlesection title={"Other guets <span>are also enjoying</span>"}/>
                            <Otherguest data={{otherguest:this.state.tour.otherguest}} />
                        </article>
                    </section>
                }
            </Layout>
        );
        
    }
}

export default Tour;

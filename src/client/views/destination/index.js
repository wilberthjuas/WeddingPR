/**
* @name: destination.js
* @description: Página de /destination/:string
* @author: Bruno, Wilberth 
* @version: 1.1.0*/

import React, { Component } from 'react';
import Layout from '../../components/layout';
import { Sliderprincipal, Sliders, Otherguest } from '../../components';
import { Titlesection, Input } from '../../components/wirefragment';
import ReactHtmlParser from 'react-html-parser';

class Destination extends Component {

    constructor(props) {
        super();
        this.state = {
            sliderDestination: [],
            destination: {},
            dest: props.location.pathname.split('/')[3].split('-').join('')
        };
        this.renderSliderOne = this.renderSliderOne.bind(this)
        this.sendToDestination = this.sendToDestination.bind(this);
    }

    componentDidMount() {
        const dest = this.state.dest//cancun
        const { match: { params } } = this.props;


        var jsonEs = require('../destination/destinationEs');
        var jsonEn = require('../destination/destinationEn');

        if (!jsonEs.default[dest] && !jsonEn.default[dest]){
            window.location.href = "/en/404notfound";
        }

        switch (params.lang) {
            case "es":
                var json = require('../destination/destinationEs')
                this.setState({
                    sliderDestination: json.default[dest].slider,
                    destination: json.default[dest]
                });
                break;
            default:
                var json = require('../destination/destinationEn')
                this.setState({
                    cID: json.default[dest].cID,
                    sliderDestination: json.default[dest].slider,
                    destination: json.default[dest]
                });
                break;
        }
    }

    componentWillReceiveProps (){
        window.location.reload();
    }

    renderSliderOne() {
        const content = this.state.destination.sliderOne.map((element, index) => {
            return (
                <section key={index}>
                    <article className="textHover">
                        <p className="sliderOneHoverText">{element.text}</p>
                    </article>
                    <img alt={"sample"} src={element.imageDesk} />
                </section>
            )
        })
        return content
    }

    renderSliderTwo() {
        const { match: { params } } = this.props;

        const content = this.state.destination.sliderTwo.map((element, index) => {
            return (
                <section key={index} className="viewMoreContainer">
                    <img alt={"sample"} src={element.imageDesk} />
                    <center className="contet-text">
                        <p className="paragraph img-caption">{element.title}</p>
                        <p className="description">{element.description}</p>
                        <Input type={"view-more"} color="img-caption" to={params.lang + "/tours/" + this.state.destination.destination} value={"View More"} />
                    </center>
                </section>
            )
        })
        return content
    }

    renderSliderThree(resort) {
        const content = resort.sliderThree.galery.map((element, index) => {
            return (
                <section key={index}>
                    <img alt={"sample"} src={element.imageDesk} />
                </section>
            )
        })
        return content
    }

    renderSliderOneMobile() {
        const content = this.state.destination.sliderOne.map((element, index) => {
            return (
                <section key={index}>
                    <article className="textHover">
                        <p className="sliderOneHoverText">{element.text}</p>
                    </article>
                    <img alt={"sample"} src={element.imageMov} />
                </section>
            )
        })
        return content
    }

    renderSliderTwoMobile() {
        const content = this.state.destination.sliderTwo.map((element, index) => {
            return (
                <section key={index} className="viewMoreContainer">
                    <img alt={"sample"} src={element.imageMov} />
                    <center className="sliderTwoContainer">
                        <span className="paragraph bold">{element.title}</span>
                        <p className="paragraph">{element.description}</p>
                    </center>
                </section>
            )
        })
        return content
    }

    renderSliderThreeMobile() {
        const content = this.state.destination.sliderThree.map((element, index) => {
            return (
                <section key={index}>
                    <img alt={"sample"} src={element.imageMov} />
                </section>
            )
        })
        return content
    }

    sendToDestination(path, a) {
        this.props.history.push(path);
    }

    sendToTour(path, a) {
        this.props.history.push("/en/tours/" + path);
    }
    render() {

        let { sliderDestination } = this.state;
        const { match: { params } } = this.props;

        return (
            <Layout title={this.state.destination.title} cID={ this.state.cID ? this.state.cID : ""  }>
                {sliderDestination.length > 0 &&
                    <section page="destination" component="destination">
                        <Sliderprincipal slides={sliderDestination} />
                        <article className="desktop container desktopDestination">
                            <Titlesection
                                title={this.state.destination.title}
                                subtitle={this.state.destination.subtitle}
                                description={this.state.destination.description} />
                            <div id="sliderOne">
                                <Sliders nameSlide={"destination-one"} viewItems={3}>
                                    {this.renderSliderOne()}
                                </Sliders>
                            </div>
                            <center >
                                <h2 className="subtitle">{this.state.destination.smallDescription}</h2>
                            </center>
                        
                            <section>
                                {this.state.destination.resorts.map((element, index) => {
                                    return (
                                        <center key={index} className="sliderThreeCont">
                                            <div className={"sliderGris" + index}></div>
                                            <div className="sliderTitle">
                                                <h2 className="title">{ReactHtmlParser(element.title)}</h2>
                                                <Titlesection
                                                    subtitle={element.subtitle}
                                                    description={element.description} />
                                                <div className="botonResortsCont">
                                                    <div className="botonResortsContTwo">
                                                        <Input type={"button"} value={params.lang === "es" ? "Comencemos" : "Let's Plan"} to={params.lang == "es" ? "../da-el-siguiente-paso" : "../take-next-step"} name="link" id="viewPlan" />
                                                    </div>
                                                    <div className="botonResortsContTwo">
                                                        <Input color="white" type={"button"} value={params.lang === "es" ? "Ver Resort" : "View Resort"} to={element.path} name="link" id="viewResorts" />
                                                    </div>
                                                </div>
                                            </div>
                                            <Sliders nameSlide={"destination-three"}>
                                                {this.renderSliderThree(element)}
                                            </Sliders>
                                        </center>
                                    )
                                })
                                }
                            </section>
                            <Titlesection
                                title={(params.lang === "es" ? "Otros" : "Other") + "<span> " + (params.lang === "es" ? "Destinos de Boda" : "Wedding Destinations") + "</span>"} />
                            <div>
                                <div className="otherGris"></div>
                                <section className="otherContainer" >
                                    {this.state.destination.other.map((element, index) => {
                                        return (
                                            <p key={index} className="subtitle description" style={{ paddingLeft: "40px", paddingRight: "40px", cursor: "pointer" }} onClick={this.sendToDestination.bind(this, element.url)}>
                                                {element.destination}
                                                <span className="separador">{(index + 1) < this.state.destination.other.length ? "|" : ""}</span>
                                            </p>
                                        )
                                    })
                                    }
                                </section>
                            </div>
                        </article>
                        <article className="movil movilDestination">
                            <Titlesection
                                title={this.state.destination.title}
                                subtitle={this.state.destination.subtitle}
                                description={this.state.destination.description} />
                            <Sliders nameSlide={"destination-one"} viewItems={3}>
                                {this.renderSliderOneMobile()}
                            </Sliders>
                            <center>
                                <h2 className="subtitle">{this.state.destination.smallDescription}</h2>
                            </center>
                
                            {this.state.destination.resorts.map((element, index) => {
                                return (
                                    <section className="sliderThreeCont" key={index}>
                                        <div className="sliderTitle">
                                            <h2 className="title">{ReactHtmlParser(element.title)}</h2>

                                        </div>
                                        <Otherguest data={{ otherguest: element.sliderThree }} />
                                        <center className="destinationDesc">
                                            <p className="description">{element.description}</p>
                                        </center>
                                        <div className="botonResortsCont">
                                            <div className="botonResortsContTwo">
                                                <Input type={"button"} value={params.lang === "es" ? "Comencemos" : "Let's Plan"} to={params.lang == "es" ? "../da-el-siguiente-paso" : "../take-next-step"} name="link" id="viewPlan" />
                                            </div>
                                            <div className="botonResortsContTwo">
                                                <Input type={"button"} value={params.lang === "es" ? "Ver Resort" : "View Resort"} to={element.path} name="link" id="viewResorts" />
                                            </div>
                                        </div>
                                    </section>
                                )
                            })
                            }
                           
                        </article>
                    </section>
                }
            </Layout>
        );
    }
}

export default Destination;

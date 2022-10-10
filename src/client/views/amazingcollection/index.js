/**
* @name: amazingcollection.js
* @description: Página de /destinationweddings/personaliyourday/:string
* @author: Diego, Julian, Bruno, Wilberth , Sergio Trejo
* @version: 1.1.0*/

import React, { Component } from 'react';
import Layout from '../../components/layout';
import ReactHtmlParser from 'react-html-parser';
import { Sliderprincipal, Footermobile, Footer, Otherguest, Sliders, Grid } from '../../components';
import { Titlesection, Input, Iconwedd } from '../../components/wirefragment';
import WithContext from "../../app/Context";

// JSON Data
import json from './amazingcollection';
import jsones from './amazingcollectionEs';

class AmazingCollection extends Component {

    constructor(props) {
        super();
        this.state = {
            slideramazing: [],
            collection: {},
            amazing: props.location.pathname.split('/')[3].split('-').join(''),
            viewPrice: false,
            viewCollection: false,
            flecha: "chevron-down",
            colapsar: "none",
        }
        this.refTabsTwo = React.createRef()
        this.bodyContent = React.createRef();
        this.viewMore = this.viewMore.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        let newProps = {};
        Object.keys(props).forEach(key => {
            if (props[key] != state[key]) {
                newProps[key] = props[key];
            }
        });
        return Object.keys(newProps).length > 0 ? newProps : null;
    }

    componentDidMount() {

        const { getData, setData } = this.props.app.currentPage;
        
        localStorage.setItem('fromCollections', true);


        const collection = this.state.amazing
        console.log(collection)
        var jsonEs = require('./amazingcollection');
        var jsonEn = require('./amazingcollectionEs');

        if (!jsones[collection] && !json[collection]){
            window.location.href = "/en/404notfound";
        }


        const { match: { params } } = this.props;
        switch (params.lang) {
            case "es":
                this.setState({
                    slideramazing: jsones[collection].slider,
                    collection: jsones[collection]
                });    
            break;
            default:
                this.setState({
                    slideramazing: json[collection].slider,
                    collection: json[collection]
                });
            break;
        }



        
    }

    componentDidUpdate(){
        
        this.refTabsTwo.current.querySelectorAll(".separadorGaleryPoints")[0].classList.add("remove")

        if (window.innerWidth > 1025) {
            this.refTabsTwo.current.querySelectorAll(".controlPoints")[0].classList.add("remove")
            this.refTabsTwo.current.querySelectorAll(".controlArrow")[0].classList.add("remove")
        }
    }


    

    viewMore(index, more, less, e) {
        let father = this.bodyContent.current.querySelectorAll(".body-contentt")[index]
        let sizechildren = this.bodyContent.current.querySelectorAll(".body-contentt")[index].children[0].clientHeight
        let buttons = this.bodyContent.current.querySelectorAll(".content-button")[index]
        if (father.clientHeight >= sizechildren) {
            father.style = ""
            father.classList.remove("cortina-close")
            this.bodyContent.current.querySelectorAll(".expant")[index].innerText = more
            buttons.classList.remove("close-chevron")
        } else {
            father.classList.add("cortina-close")
            buttons.classList.add("close-chevron")
            father.style = "height:" + (sizechildren + 46) + "px;"
            this.bodyContent.current.querySelectorAll(".expant")[index].innerText = less
        }
    }

    changeArrow(){
        this.setState({
            flecha : this.state.flecha === "chevron-down"?"chevron-up2":"chevron-down",
            colapsar: this.state.colapsar === "none"?"block":"none"
        });
    }

    content() {


        const { match: { params } } = this.props;

        let arrayContent = [];
        let arrayContentSlider = [];
        let arrayContentSlider2 = [];
        let arrayContentSlider3 = [];
        let key = 0
        let index = 0
        this.state.collection.content.forEach(element => {
            key++
            if (element.slider) {
                arrayContent.push(
                    <div className="background-title" key={key + "b"}>
                        <div className="container">
                           {/* <img alt={"flowers exotic peacock"} src={this.state.collection.imageDesk} className="desktop"   />
                            <img alt={"flowers exotic peacock"} src={this.state.collection.imageMov} className="movil icon-title" /> */ }
                            <p className="description" style={{ fontWeight: "bold" }}>{ReactHtmlParser(element.title)}</p> 
                        </div>
                    </div>
                )
                element.slider.forEach(subelement => {
                    key++
                    arrayContentSlider.push(this.htmlParse(subelement, key, "slide"))
                    //console.log("arrayContentSlider",subelement,key)
                });

                //console.log("arrayContentSlider final",arrayContentSlider)
                arrayContent.push(
                    <>
                        <div className="container" key={key + "a"} ref={this.refTabsTwo}>
                            <Sliders nameSlide="amazing">{arrayContentSlider}</Sliders>
                            
                            {this.state.collection.terms != null ?
                                <section>
                                <center  onClick={() => {this.changeArrow();this.props.onClick()}}>
                                    <span className="collapselink">
                                        { params.lang ==  "en" ? "Terms & Conditions " : "Términos y Condiciones" }
                                        </span>&nbsp; 
                                        <Iconwedd icon={this.state.flecha} color={"pink"}/>
                                </center>                            
                                <p className="description terms-collection" style={{display:this.state.colapsar}}>
                                    {this.state.collection.terms}                                    
                                </p>
                                <br />        
                                </section>                     
                                : "" }
                            </div>
                    </>
                )
            }

            else if (element.slider2) {
                arrayContent.push(
                    <div className="background-title" key={key + "b"}>
                        <div className="container">
                                 {/* <img alt={"flowers exotic peacock"} src={this.state.collection.imageDesk} className="desktop"   />
                            <img alt={"flowers exotic peacock"} src={this.state.collection.imageMov} className="movil icon-title" /> */ }
                            <p className="description" style={{ fontWeight: "bold" }}>{ReactHtmlParser(element.title)}</p>
                        </div>
                    </div>
                )
                element.slider2.forEach(subelement => {
                    key++
                    arrayContentSlider2.push(this.htmlParse(subelement, key, "slide"))
                });
                arrayContent.push(
                    <>
                        <div className="container" key={key + "a"}>
                            <Sliders nameSlide="amazing">{arrayContentSlider2}</Sliders>
                        </div>
                    </>
                )
            }
            else if (element.slider3) {
                arrayContent.push(
                    <div className="background-title" key={key + "b"}>
                        <div className="container">
                                 {/* <img alt={"flowers exotic peacock"} src={this.state.collection.imageDesk} className="desktop"   />
                            <img alt={"flowers exotic peacock"} src={this.state.collection.imageMov} className="movil icon-title" /> */ }
                            <p className="description" style={{ fontWeight: "bold" }}>{ReactHtmlParser(element.title)}</p>
                        </div>
                    </div>
                )
                element.slider3.forEach(subelement => {
                    key++
                    arrayContentSlider3.push(this.htmlParse(subelement, key, "slide"))
                });
                arrayContent.push(
                    <>
                        <div className="container" key={key + "a"}>
                            <Sliders nameSlide="amazing">{arrayContentSlider3}</Sliders>
                        </div>
                    </>
                )
            }

            else {
                arrayContent.push(
                    <>
                        <div className="background-title" key={key + "k"}>
                            <div className="container">
                                     {/* <img alt={"flowers exotic peacock"} src={this.state.collection.imageDesk} className="desktop"   />
                            <img alt={"flowers exotic peacock"} src={this.state.collection.imageMov} className="movil icon-title" /> */ }
                                <p className="description" style={{ fontWeight: "bold" }}>{ReactHtmlParser(element.title)}</p>
                            </div>
                        </div>
                        <div className="container body-contentt close">{this.htmlParse(element, key)}
                            {element.labelshowMore ? <div className="cortina"></div> : ""}
                        </div>
                        {element.labelshowMore ?
                            <center className="content-button">
                                <div component="inputwedd">

                                    <button onClick={this.viewMore.bind(this, index, element.labelshowMore, element.labelshowLess)} style={{ paddingRight: ".325rem" }} className="expant">{element.labelshowMore}

                                    </button>
                                        <Iconwedd icon={"chevron-down"} color={"light-melon"} />
                                        <Iconwedd icon={"chevron-up"} color={"light-melon"} />
                                </div>
                            </center>
                            : ""}
                    </>
                )
                index++
            }
            key++
        });
        return (arrayContent)
    }
    htmlParse(element, key, slide) {
        return (
            <section className="list-slider" key={key}>
                <div className={"list-ul" + (slide != null ? slide : "")}>
                    {element.imgeMovilOne != null ? <> <img alt={element.alt} src={element.imgeDeskOne} className="desktop" /> <img alt={element.alt} src={element.imgeMovilOne} className="movil" />
                        <h2 className="imgcaptions">{element.titleImg1}</h2></> : ""}
                    {element.titleCash != null ? <p className="description states">{ReactHtmlParser(element.titleCash)}</p> : ""}
                    {ReactHtmlParser(element.listOne)}
                    {element.footeOne != null ? <p className="description cash">{ReactHtmlParser(element.footeOne)}</p> : ""}
                    {element.cashOne != null ? <p className="description cash">{ReactHtmlParser(element.cashOne)}</p> : ""}
                </div>
                {slide == null ?
                    <div className="list-ul">
                        <div className="line-sep"></div>
                        {element.imgeMovilTwo != null ? <><img src={element.imgeDeskTwo} alt={element.alt} className="desktop" /> <img src={element.imgeMovilTwo} alt={element.alt} className="movil" />
                            <h2 className="imgcaptions">{element.titleImg2}</h2>
                        </> : ""}
                        {ReactHtmlParser(element.listTwo)}
                        {element.footeTwo != null ? <p className="description cash">{ReactHtmlParser(element.footeTwo)}</p> : ""}
                        {element.cashTwo != null ? <p className="description cash">{ReactHtmlParser(element.cashTwo)}</p> : ""}
                    </div> : ""}

                   
                    {element.imgeMovilTwo != null ?  <p className="description">{this.state.collection.termsextras}</p>: ""}
            </section>
        )
    }
    render() {
         
            
                
        
                       
                



        const { match: { params } } = this.props;
        let { slideramazing } = this.state;
        return (
            <Layout title={this.state.collection.titleh}>
                {slideramazing.length > 0 &&
                    <section page="AmazingCollection" ref={this.bodyContent}>
                        <Sliderprincipal slides={slideramazing} />
                        <Titlesection
                            title={this.state.collection.title}
                            description={this.state.collection.description}
                            urlBtnBack={["/en/destinationweddings/personalize-your-day/", params.lang=="es"?"REGRESAR":"BACK"]} />
                        <section className="container">
                            <Otherguest data={{ otherguest: this.state.collection.gallery }} />
                        </section>
                        {this.content()}
                        <div className="container-movil footer-amazing">
                            <p className="description">{this.state.collection.descriptionFooter}</p>
                            <Input type={"button"} value={this.state.collection.textBtn} to={this.state.collection.urlBtn} name="link" id="link" />
                            <h2 className="subtitle footer-description">{this.state.collection.footer}</h2>
                        </div>
                    </section>
                }
            </Layout>
        );
    }
}

export default WithContext(AmazingCollection);
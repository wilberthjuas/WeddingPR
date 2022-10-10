import React, { Component } from 'react';

import { Sliders, Negocios } from '../../components';
import Personalizeyoureeddingalery from '../personalizeyoureeddingalery';
import { Titlesection, Input } from '../../components/wirefragment';
import Tabstwo from '../../components/tabstwo';
import CallUs from '../callus';
import { withRouter } from 'react-router-dom'
import WithContext from '../../app/Context';



class Personalizeyoureedding extends Component {
    constructor(props) {
        super();
        //        this.tabs = React.createRef()
        this.BodyTabs = React.createRef()
        this.headFloat = React.createRef()
        this.activeTabs = this.activeTabs.bind(this);
        this.headTabsStatic = this.headTabsStatic.bind(this);
        this.headFloatLimit = React.createRef()
        this.refPersonalize = React.createRef()

        let lang = location.pathname.slice(1).split("/")[0]
        let  urls = lang == "en" ? ["designer-themes", "personalize-your-day"] : ["disenos", "personaliza-tu-dia"]
        let urlValue = location.pathname.split("/")[4] ? (props.location.pathname.split("/")[4].split('-').join('') + "").toLocaleLowerCase() : "-"
        let tabClick = urlValue == urls[0].split("-").join("") ? 0 : 1
            
        this.state = {
            select_tab: tabClick,
            urls: urls,
            lng: lang
        }
    }


    componentDidMount() {
        this.activeTabs(this.state.select_tab)
        window.addEventListener("scroll", this.headTabsStatic);
    }

    activeTabs(index) {
        let tabsBody = this.BodyTabs.current.childNodes
        for (let i = 0; i < tabsBody.length; i++) {
            tabsBody[i].classList.add("hideTabs")
            tabsBody[i].classList.remove("showTabs")
        }
        tabsBody[index].classList.remove("hideTabs")
        tabsBody[index].classList.add("showTabs")

        this.tab_index.querySelectorAll("li")[index].click()
        if (this.state.urls[index]) {
            let urlNavegator = location.href.split("/")
            if (index > 0) {
                let subBase=location.pathname.split("/")
                subBase[4]=""
                subBase=subBase.join("/")
                urlNavegator = location.origin+subBase +  "/" + this.state.urls[index]
                urlNavegator = urlNavegator.split("/")                
            } else {
                urlNavegator[urlNavegator.length - 1] = urlNavegator[urlNavegator.length - 1] + "/" + this.state.urls[index]                
            }

            urlNavegator = urlNavegator.join("/").split("/")
            let removRepeat = urlNavegator
            urlNavegator = [...new Set(removRepeat)]

            urlNavegator = urlNavegator.join("/")
            history.pushState(null, "", urlNavegator);
        }
    }

    headTabsStatic() {
        if (this.headFloat.current != null) {
            if (innerWidth > 1024) {
                if (window.pageYOffset > 901) {
                    this.headFloat.current.style = "position: fixed;top: 108px;width: 100%;transition:.5s;"
                } else {
                    this.headFloat.current.style = "position: relative;top: 0px;width: 100%;transition:.5s;"
                }
            } else {
                if ((this.BodyTabs.current.childNodes[2].offsetTop - window.pageYOffset) > 0) {
                    let posWindow = (this.headFloat.current.getBoundingClientRect().top)
                    let posWindowLimit = (this.headFloatLimit.current.getBoundingClientRect().top)

                    let size = window.getComputedStyle(document.body).fontSize.substring(-2, 2)
                    if (posWindow <= (45 / 16) * size) {
                        this.headFloat.current.style = "position: fixed;top: " + ((45 / 16) * size) + "px;width: 100%;"
                        document.getElementById("replace-size").style = "height:" + (this.headFloat.current.offsetHeight) + "px;"
                    }
                    if (posWindowLimit >= (45 / 16) * size) {
                        this.headFloat.current.style = "position: relative;top: 0px;width: 100%"
                        document.getElementById("replace-size").style = ""
                    }
                }
            }
            if ((this.BodyTabs.current.childNodes[2].offsetTop - window.pageYOffset) < 0) {
                //this.headFloat.current.style = "position: relative;top: 0px;width: 100%;transition:.5s;"
                this.headFloat.current.style = "position: fixed;top: -107px;width: 100%;transition:.5s;"
            }
        }
    }

    render() {

        const head = this.props.state.map((element, index) => {
            return (
                <Titlesection key={index} title={element.title} description={element.description}
                    urlBtnBack={[element.urlBtn, element.buttonTxt]}
                ></Titlesection>
            )
        });
        const headSlide = this.props.state[0].personalizeslid.map((element, index) => {

            return (
                <a key={index} onClick={this.activeTabs.bind(this, index)}>{element.title}</a>
            )
        });
        

        const contentperzonalized = this.props.unidades.map((element, index) => {
            return (
                <Negocios key={index} unidadId={element.idservice_unidad_negocio} unidadNombre={element.nombre}> </Negocios>
            )
        });

        const phons = this.props.state[0].personalizeslid[0].content.map((element, index) => {
            return (
                    <Negocios key={index} unidadNombre={element.title+" "+element.title2} no_catalog="1" sliders={element.sliders}> </Negocios>
            )
        });
        let descripOne = this.props.state[0].personalizeslid[0].descriptionHead
        let descripTwo = this.props.state[0].personalizeslid[1].descriptionHead

        const { match: { params } } = this.props;

        return (
            <section component="personalizeyoureedding">
                {head}
                <div className="contentheadSlide" ref={this.props.refPersonalize} >
                    <div id="replace-size" ref={this.headFloatLimit}></div>
                    <div ref={this.headFloat} className="head-sticki">
                        <div className="fondo-head"></div>
                        <Tabstwo class="container" referencia={input => { this[`tab_index`] = input; }}>
                            {headSlide}
                        </Tabstwo>
                    </div>
                    {/*<div className="divisor-head-slide"></div>*/}
                    <section className="content-tabs" ref={this.BodyTabs}>

                        <div className="tab-2" >
                            <center>
                                <p className="description tab">{descripTwo}</p>
                                <p className="description txt-light">{this.props.state[0].personalizeslid[1].descriptionHeadTwo}</p>
                         
                                <Personalizeyoureeddingalery Items={this.props.state[0].personalizeslid[1].content[0].sliders} />

                                <div className="separation-one"></div>
                                <div className="footer-galr-mov">
                                    <section className="footer-One">
                                        <article>
                                            <p className="description txt-light" style={{ margin: "auto" }}>{this.props.state[0].personalizeslid[1].descriptionFooter}</p>
                                        </article>
                                    </section>

                                    <section className="footer-Two-tb2" style={{padding:"unset"}}>
                                        <article>
                                            <p className="description">
                                                {this.props.state[0].personalizeslid[1].descriptionFooter2}
                                            </p>
                                        </article>
                                    </section>
                                    <Input key={"btn_tabs"} to={this.props.state[0].personalizeslid[1].url} type={"button"} typBtn={5 + " btn-playnow"}
                                        value={this.props.state[0].personalizeslid[1].buttonTxt} color={"pink "} />
                                    <br />
                                    <br />
                                </div>
                            </center>
                        </div>
                        <div className="tab-1">
                            <p className="description tab">{descripOne}</p>
                            <div className="slide-description"></div>
                            {contentperzonalized}
                            {phons}
                            <center >
                                <div className="footer-galr-mov">

                                    {<CallUs textTooltip={this.props.state[0].personalizeslid[0].textCall}
                                        phons={this.props.state[0].personalizeslid[0].phons} head={this.props.state[0].personalizeslid[0].descriptionFooter} />}
                                </div>
                            </center>
                        </div>
                        
                        <span className="limit-head" />
                    </section>
                </div>
            </section>
        )
    }
}
export default withRouter((WithContext(Personalizeyoureedding)));
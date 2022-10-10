import React, { Component } from 'react';
import { Sliders } from '../../components';
import { Titlesection, Input, Iconwedd } from '../../components/wirefragment';
import data from "./data";
import dataES from "./dataES";

class Otherguest extends Component {

    //Verificar si un Objecto está vacío
    isEmpty(obj) {
        for (var x in obj) { return false; }
        return true;
    }
    constructor(props) {
        super(props);
        this.state = {
            otherguest: null,
        };
        this.modalShow = this.modalShow.bind(this);
        this.refSldPrn = React.createRef()
    }
    componentDidMount() {
        if (this.props.data == null) {
            switch (localStorage.langWeddings) {
                case "es":
                    this.setState({
                        otherguest: dataES.otherguest
                    });
                    break;
                default:
                    this.setState({
                        otherguest: data.otherguest
                    });
                    break;
            }
        } else {
            this.setState({
                otherguest: this.props.data.otherguest
            });
        }
        this.setState({ modal: "hideModal" })
    }
    modalShow(e, index) {
        if (index != null) {
            this.refSldPrn.current.querySelectorAll(".controlPoints")[0].children[index].click()
            this.setState({
                modal: this.state.modal == "hideModal" ? "showModal" : "hideModal"
            });
        } else {
            this.setState({
                modal: this.state.modal == "hideModal" ? "showModal" : "hideModal"
            });
        }
        try {
            if (this.state.modal == "hideModal") {
                document.querySelector("[page=resort]").querySelectorAll("[class=container]").forEach((e) => { e.style.maxWidth = "unset" })
                document.querySelector("[page=resort]").querySelector("[class=subcontainer]").style.float = "unset"
            }
            else {
                document.querySelector("[page=resort]").querySelectorAll("[class=container]").forEach((e) => { e.style = "" })
                document.querySelector("[page=resort]").querySelector("[class=subcontainer]").style = ""
            }
        } catch (ex) {
            console.log(ex)
        }
    }

    items_modal() {
        let itemsModal = this.state.otherguest != null ? this.state.otherguest.galery : []
        itemsModal = itemsModal.map((element, index) => {
            return (
                <div key={index}>
                    <img src={element.imageDesk} alt={element.alttext}></img>
                </div>
            )
        });
        return (itemsModal)
    }
    render() {
        let mdl = this.props.withModal
        const sliderTemplate = this.state.otherguest != null ? this.state.otherguest.galery.map((element, index) => {
            return (
                <div className="galery" ref={this.title} key={index} style={{ cursor: mdl ? "pointer" : "" }} onClick={() => { this.modalShow(this, index) }}>
                    {!this.isEmpty(element) &&
                        <>
                            {element.link ?
                                <section>
                                    <a href={element.link}> <img src={element.imageDesk} className="desktop img-other-guest" alt={element.title} /></a>
                                    <a href={element.link}><img src={element.imageMov} className="movil img-other-guest" alt={element.title2} /></a>
                                </section>
                                :
                                <section>
                                    <img src={element.imageDesk} className="desktop img-other-guest" alt={element.title} />
                                    <img src={element.imageMov} className="movil img-other-guest" alt={element.title2} />
                                </section>
                            }
                            {element.title ? <h2 className="imgcaptions titlesliderother">{element.title}</h2> : ""}
                            {element.description ? <p className="description">{element.description}</p> : ""}
                            {element.link ?
                                <Input type={"button"} to={element.link} value={element.caption} color={"pink nav-link-weddings"} /> : ""
                            } </>
                    }
                </div>
            )
        }) : null

        if (this.state.otherguest != null) {
            return (
                <>
                    <section component="otherguest">
                        <div className="wemakwuniqueContent">
                            {this.state.otherguest.title ? <Titlesection title={this.state.otherguest.title} description={this.state.otherguest.description} /> : ""}
                            <div className="divisor-title-slider"></div>
                            <div className="container">
                                <div className="contentSliderPrinc">
                                    <center><div className="bg-carousel"></div></center>
                                    {sliderTemplate != null ?
                                        <Sliders nameSlide={this.state.otherguest.title} subtitle={this.state.otherguest.title2} >
                                            {sliderTemplate}
                                        </Sliders> : <div></div>
                                    }
                                </div>
                                <div className="divisor-points-botton"></div>
                                <center>
                                    {/*this.props.data.urlBtn!=null && !(this.props.data.urlBtn=="/")?
                                <Link to={this.props.data.urlBtn} className="nav-link-weddings">
                                    <Input type={"button"} value={this.props.data.buttonTxt} color={"pink "} />
                                </Link>
                        : ""*/}
                                </center>
                            </div>
                        </div>
                        {/*this.props.data.title ? <div className="divicion-section"></div> : ""*/}
                    </section>
                    
                    {/*en caso de que se envie el parametro modal en el props*/}
                    {mdl ?
                        <section component="compphotos" style={{position: "absolute" }}>
                            <section className={this.state.modal + " modal-photos"} >
                                <section className="closeModal">
                                    <a onClick={() => { this.modalShow() }}>
                                        <Iconwedd icon={"alt-close"} color={"pink"} />
                                    </a>
                                </section>
                                <section className="slider-photos" ref={this.refSldPrn}>
                                    <Sliders nameSlide="slidmmln">
                                        {this.items_modal()}
                                    </Sliders>
                                </section>
                            </section>
                        </section> : <></>
                    }
                </>
            )
        } else {
            return (<section component="otherguest"></section>)
        }
    }
}
export default Otherguest;
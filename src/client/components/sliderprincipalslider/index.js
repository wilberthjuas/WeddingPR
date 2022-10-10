import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Input, Iconwedd } from '../../components/wirefragment';
import { Sliders } from '../../components';
import ModalVideo from '../modalvideo';

class Sliderprincipalslider extends Component {

    constructor(props) {
        super(props);
        this.state = {  
            cast : 1
        };

        this.showModal = this.showModal.bind(this);
    }

    showModal(){
        this.setState({
            cast:this.state.cast==1?2:1
        })
    }

    render(){


    const parents = this.props.slide.map((element, index) => {
        return (
            <div key={index} className={"content-item"}>
                <div className="items">{/*onLoad={props.scrollCenter}*/}
                    {element.urlIframe != null ? <div> <iframe className="desktop" src={element.urlIframe} width="100%" height="550"></iframe> <div className="fade"></div></div>: element.url != null ?
                        <Link to={element.url}>
                            <img alt={"Weddings Palace Resorts"} src={element.imageDesk} className="item-img-dream-desktop desktop" />
                        </Link>
                        :element.urlVideoSlider!= null ? <div className="desktop iframeVideoUrl">
                        <img style={{cursor:"pointer"}}  alt={"Weddings Palace Resorts"} src={element.imageDesk} className="item-img-dream-desktop desktop"  onClick={this.showModal.bind(this)}/>
                        <div className="containerplay" onClick={this.showModal.bind(this)}><Iconwedd icon={"play-circled"}/></div>
                        {this.state.cast==1?"":<ModalVideo close={this.showModal.bind(this)}>
                                <iframe className="desktop" src={element.urlVideoSlider} width="100%" height="550" style={{border:"none"}}></iframe>
                        </ModalVideo>  }
                        </div>
                        :
                        <img alt={"Weddings Palace Resorts"} src={element.imageDesk} className="item-img-dream-desktop desktop" />
                    }                    
                    {element.urlIframe != null ?<div> <iframe className="movil iframeMovil" src={element.urlIframeMov} width="100%" ></iframe> <div className="fade"> </div></div>: element.url != null ?
                        <Link to={element.url}>
                            <img  alt={"Weddings Palace Resorts"}  src={element.imageMov} alt={element.textAlt} className="item-img-dream-movil movil" />
                            <div className="movil slider-pr-url" className="movil">
                                    <center>
                                        {element.buttonTxt != null ?
                                            <Input to={element.url} type={"button"} typBtn={4} color={"pink"} value={element.buttonTxt} /> : <div className="rellerindo"></div>
                                        }
                                    </center>
                                </div>
                        </Link>
                        :element.urlVideoSlider!= null ? element.urlVideoSlider != ""?<div className="movil iframeVideoUrl">
                        <img style={{cursor:"pointer"}}  src={element.imageMov} alt={"Weddings Palace Resorts"} className="item-img-dream-movil movil"  onClick={this.showModal.bind(this)}/>
                        <div className="containerplay" onClick={this.showModal.bind(this)}><Iconwedd icon={"play-circled"}/></div>
                        {this.state.cast==1?"":<ModalVideo close={this.showModal.bind(this)}>
                                <iframe className="movil iframeMovil" src={element.urlVideoSlider} width="100%"  style={{border:"none"}}></iframe>
                        </ModalVideo>  }
                        </div>:null
                        :
                        <>
                        <img src={element.imageMov} alt={"Weddings Palace Resorts"} className="item-img-dream-movil movil" />
                        </>
                    }
                    

                    {element.title != "" ?
                        <div className="container">
                            <section className="description-pr-sl " style={{ display: element.title != null ? "view" : "none" }}>
                                <div className="content-text-slider " style={{ display:"none"}}>

                                    <h1 style={{ display: element.title != null ? "view" : "none" }}>
                                        {element.title != null ? <span className="title-one">{element.title} </span> : ""}
                                        {element.title2 != null ? <span className="title-two"> {element.title2}</span> : ""}
                                    </h1>
                                    <p className="description">{element.description}</p>
                                    {element.buttonTxt != null ? <Input to={element.url} type={"button"} typBtn={1} color={"pink desktop"} value={element.buttonTxt} id={"dream" + index} name={"dream" + index} /> : ""}
                                </div>
                                <div className="movil slider-pr-url" className="movil">
                                    <center>
                                        {element.buttonTxt != null ?
                                            <Input to={element.url} type={"button"} typBtn={4} color={"pink"} value={element.buttonTxt} /> :""
                                        }
                                    </center>
                                </div>
                            </section>
                        </div>
                        : ""
                    }
                </div>
            </div>
        )
    });

    return (
        <article className={this.props.typeCaptionBg}>
            <Sliders ref={this.props.refSlide} tra nameSlide={"slider-principal"} viewItems={2}>
                {parents}
            </Sliders>
        </article>
    );
    }
}
export default Sliderprincipalslider;
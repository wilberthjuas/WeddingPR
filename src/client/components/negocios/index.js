/**
* @name: personaliyourday.js
* @description: Página de /destinationweddings/personaliyourday
* @author: Diego, Julian, Bruno, Wilberth , Sergio Trejo
* @version: 1.1.0*/

import React, { Component } from 'react';

import { Sliders } from '../../components';
import GradientBar from '../../views/catalog/gradientbar';
import api from '../../app/index';
import { Input } from '../../components/wirefragment';
import { ServiceConsumer } from '../../app/Context';
import { withRouter } from 'react-router-dom';
import Otherguest from '../otherguest';

class Negocios extends Component {

    constructor(props) {
        super(props);
        this.getUnidadesNegocio = this.getUnidadesNegocio.bind(this)
        this.addDefaultSrc = this.addDefaultSrc.bind(this)
    }

    state = {
        negocios: []
    }

    componentDidMount() {

        if (!this.props.no_catalog ){
            this.getUnidadesNegocio()
        }else {
            this.setState({ negocios : this.props.sliders })
        }


    }

    getUnidadesNegocio() {
        api.getBusinessUnit(this.props.unidadId)
            .then(res => res.data)
            .then(
                negocios => {
                    this.setState({ negocios })
                }).catch(e => console.error(e));


    }

    addDefaultSrc(ev) {
        ev.target.src = 'https://s3.amazonaws.com/webfiles_palace/clever/products/assets/delight_signature_cakes.jpg'
    }

    render() {
        const { match: { params } } = this.props;


        const sliderTemplate = this.state.negocios.map((element, indexOne) => {

            if(element.path.trim() !== "") {
                return (

                  <div className="galery" id={"galery_" + element.idservice_unidad_negocio}
                       key={indexOne}>
                      <img src={element.path} className="desktop" alt={element.descripcion + " "}
                           style={{ cursor: "pointer" }}
                           onClick={() => {
                               if (this.props.unidadId) location.href = localStorage.langWeddings + "/catalog/" + this.props.unidadId
                           }}/>

                      <img src={element.path} className="movil" alt={element.descripcion + " "}
                           onClick={() => {
                               if (this.props.unidadId) location.href = localStorage.langWeddings + "/catalog/" + this.props.unidadId
                           }}/>

                      <h2 style={{ cursor: "pointer" }}
                          onClick={() => {
                              if (this.props.unidadId) location.href = localStorage.langWeddings + "/catalog/" + this.props.unidadId
                          }}
                          className="imgcaptions titlesliderother">{element.title ? element.title : params.lang == "en" ? (element.descripcion != null ? element.descripcion : "") : (element.nombreespanol != null ? element.nombreespanol != "" ? element.nombreespanol : element.descripcion : "")}</h2>

                      <div className="content-desc">
                          <article><p
                            className="description">{element.title ? element.title : params.lang == "en" ? (element.descripcion != null ? element.descripcion : "") : (element.nombreespanol != null ? element.nombreespanol != "" ? element.nombreespanol : element.descripcion : "")}</p>
                          </article>
                      </div>
                  </div>

                )
            }
            return "";
        });

        return (
            <ServiceConsumer>
                {value => (
                    <section component="negocios" className={"negocios"+this.props.unidadNombre}>
                        {
                            sliderTemplate != "" ?
                                <>
                                    {this.props.outhead == null ?
                                        <GradientBar>
                                            <section className="container">
                                                <h1 className="title">{this.props.unidadNombre}</h1>
                                            </section>
                                        </GradientBar>
                                        : ""
                                    }
                                    {this.props.extra ? this.props.extra : ""}
                                    <div className="title-slide-sep" />
                                    <div className="container" component="otherguest">
                                        <div className="contentSliderPrinc">
                                            <div className="bg-carousel"></div>
                                            <Sliders nameSlide={"negocios"}>
                                                {sliderTemplate}
                                            </Sliders>
                                        </div>
                                    </div>
                                    {this.props.no_catalog == null ?
                                        this.props.no_catalog2 == null ?

                                        <center className="view-catalog" style={{position: "relative"}}>
                                            <Input key={+this.props.unidadId} to={"/" + value.lang + "/catalog/" + this.props.unidadId}
                                            type={"button"} typBtn={" bg-spr"}
                                            color={"pink "}
                                            value={ params.lang === "en" ? "Browse Catalog" : "Navega nuestro catálogo" } />
                                        </center>: ""


                                        : <div><br /><br /></div>
                                    }
                                </>
                                : ""
                        }
                    </section>
                )}
            </ServiceConsumer>
        )
    }
}
export default withRouter(Negocios);

/**
 * @name: catalog.js
 * @version: 1.1.0
 * @author: alanjimenez, Sergio Trejo
 * @description: Página de /catalog/:id
*/

import React, { Component, createRef } from "react";
import Layout from '../../components/layout';
import { Cell, Sliderprincipal } from '../../components';
import GradientBar from './gradientbar';
import Personalizeyourcatalog from './Personalizeyourcatalog';
import { Titlesection, Input, Iconwedd } from "../../components/wirefragment";
import { ServiceProvider } from '../../app/Context';
import { ServiceConsumer } from '../../app/Context';
import json from '../../../../state';
import api from '../../app/index';
import { Link } from 'react-router-dom';
import WithContext from "../../app/Context";
import { withRouter } from "react-router-dom";

class Catalog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataDestination: [],
            property: "",
            sliderpersonalizeyourwedd: [],
            countWishes: 0,
            unidades: [],
            tabDataContent: {
                title: "",
                title2: "",
                description: "",
                cover: "",
            },
            tipo_catalogo: "",
            desc_catalog: "",
            cover_stat: "",
            sliderpersonalizeyourwedd2: [],
            countInCart: 0,
            carArray: [],
            inCartArr: [],
        };
        this.property_name = "";
        this.unidad_negocio = props.match.params.service || 0;
        this.selectPro = createRef();
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

        const { match: { params } } = this.props;
        const idService = params.service;
        if (idService == "2") {
            this.setState({
                tipo_catalogo: params.lang == "en" ? "cakes" : "pasteles",
                sliderpersonalizeyourwedd: json.delight,
                toknow : json.delight[0].toknow,
                title_toknow: json.delight[0].title_toknow,
                title_toknowEs:json.delight[0].title_toknowEs,
                /*desc_catalog: params.lang == "en" ? json.delight[0].desc_eng : json.delight[0].desc_esp,
                cover_stat: "https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/home/Desktop/logo-delight-cake-studio.jpg",*/
                service: 2,
                pdfs:params.lang=="en"?json.delight[0].pdfs:json.delight[0].pdfsEs
            })
        }
        if (idService == "12") {
            this.setState({
                tipo_catalogo: params.lang == "en" ? "flower arrangements" : "arreglos florales",
                sliderpersonalizeyourwedd: json.amada,
                toknow : json.amada[0].toknow,
                title_toknow: json.amada[0].title_toknow,
                title_toknowEs: json.amada[0].title_toknowEs,
                /*desc_catalog: params.lang == "en" ? json.amada[0].desc_eng : json.amada[0].desc_esp,
                cover_stat: "https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/home/Desktop/logo-amada-flower-design.jpg",*/
                service: 12,
                pdfs:params.lang=="en"?json.amada[0].pdfs:json.amada[0].pdfsEs
            })
        }
        if (idService == "5") {
            this.setState({
                tipo_catalogo: params.lang == "en" ? "items" : "items ",
                sliderpersonalizeyourwedd: json.evoke,
                toknow : json.evoke[0].toknow,
                title_toknow: json.evoke[0].title_toknow,
                title_toknowEs: json.evoke[0].title_toknowEs,
                /*desc_catalog: params.lang == "en" ? json.evoke[0].desc_eng : json.evoke[0].desc_esp,
                cover_stat: "https://e-commercepr.s3.amazonaws.com/assets/images/home/Movile/logo-evoke.jpg",*/
                pdfs:params.lang == "en" ? json.evoke[0].pdfs: json.evoke[0].pdfsEs
            })
        }
        if (idService == "4") {
            this.setState({
                tipo_catalogo: params.lang == "en" ? "items" : "items",
                sliderpersonalizeyourwedd: json.quantum,
                toknow : json.quantum[0].toknow,
                title_toknow: json.quantum[0].title_toknow,
                title_toknowEs: json.quantum[0].title_toknowEs,
                /*desc_catalog: params.lang == "en" ? json.quantum[0].desc_eng : json.quantum[0].desc_esp,
                cover_stat: "https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/home/Desktop/quantumn-logo.jpg",*/
                service: 4,
                pdfs:params.lang == "en" ? json.quantum[0].pdfs:json.quantum[0].pdfsEs
            })
        }

        this.getUnidadesNegocio();
        this.getProperties();
        if(!sessionStorage.shopping_cart){
            localStorage.removeItem("items_wish")
            localStorage.removeItem("wishList")
            localStorage.removeItem("dateFilterPack")
            localStorage.removeItem("subService")
            localStorage.subService
        }

        if(sessionStorage.logged_in == "true"){
            this.property_name = sessionStorage.resort;
            this.setState({ property: sessionStorage.id_resort});
            this.setState({htlPopert:sessionStorage.id_resort});
        }

        this.onCart();
    }

    getUnidadesNegocio() {
        api.getBusinessUnits()
            .then(res => {
                this.setState({
                    unidades: res.data
                });
                const { match: { params } } = this.props;
                const idService = params.service;
                const currentService = res.data.filter(service => service.idservice_unidad_negocio === idService);

                let extras = JSON.parse(currentService[0].extra)
                let logo = ""
                if (extras) {

                    let desk = extras.banner?extras.banner[0][0]:"";
                    let mov = extras.banner[1][0];
                    logo = extras.logo[0];
                    let new_arreglo = [{
                        imageDesk: desk.replace(/ /g, ""),
                        imageMov: mov.replace(/ /g, ""),
                        desc_eng: this.state.sliderpersonalizeyourwedd[0].desc_eng,
                        desc_esp: this.state.sliderpersonalizeyourwedd[0].desc_esp,
                    }]
                    this.state.sliderpersonalizeyourwedd[0].imageDesk = desk.replace(/ /g, "");
                   this.state.sliderpersonalizeyourwedd[0].imageMov = mov.replace(/ /g, "");
                }

                if (currentService[0].nombre === currentService[0].descripcion) {
                    this.setState(prevState => ({
                        tabDataContent: {
                            ...prevState.tabDataContent,
                            title: `${currentService[0].nombre}`,
                            description: `${currentService[0].descripcion}`,
                            //cover: `${currentService[0].cover}`,
                            cover: logo
                        }
                    }));
                } else {
                    this.setState(prevState => ({
                        tabDataContent: {
                            ...prevState.tabDataContent,
                            title: `${currentService[0].nombre} <span>${currentService[0].descripcion}</span>`,
                            description: `${currentService[0].descripcion}`,
                            //cover: `${currentService[0].cover}`,
                            cover: logo
                        }
                    }));
                }
            }).catch(e => console.error(e));


    }
    getProperties() {
        let { setData } = this.state.app.currentPage;
        const { match: { params } } = this.props;

        api.getProperties()
            .then(res => {
                var data = Object.keys(res.data.dropdownData).map(function (key) {
                    if (params.lang == "en"){
                        return [res.data.dropdownData[key], key];
                    }else {
                        return [res.data.dropdownData[key].replace('Cancun', 'Cancún'), key];
                    }
                });




                setData("dataDestination", data)
                this.setState({ dataDestination: data });
            })
            .catch(e => { console.log(e) });
    }

    changeHandler(event, value) {
        if (value) {
            this.property_name = this.selectPro.current.select.current.querySelectorAll("input")[0].value;
            this.setState({ property: this.selectPro.current.select.current.querySelectorAll("select")[0].value });
            this.setState({htlPopert:value.getAttribute("value")})
        }
    }

    onCart() {
        var carrito = [];
        if(sessionStorage.logged_in){
            api.getShoppingCart(sessionStorage.id, sessionStorage.id_resort)
                .then((res) => {
                    if (res.data.length > 0) {
                        let datos = res.data;
                        let sumresult = 0;
                        for (const it of datos.filter(e => e['cantidad_pendiente'] != 0)) {
                            sumresult += isNaN(it.cantidad) ? 0 : parseInt(it.cantidad);
                        }
                        this.setState({
                            countInCart: sumresult,
                            carArray: res.data
                        });
                        let carritos = res.data.map((item, index) => {
                            carrito.push(item.idservice_evento);
                        }
                        );
                        this.setState({ inCartArr: carrito });
                    } else {
                        this.setState({
                            countInCart: 0,
                            inCartArr: [] });
                    }
                })
                .catch((err) => {
                });
            }else{
                console.warn("NO hay una sesión iniciada");
            }
	}

    render() {
        const { match: { params } } = this.props;
        let { getData } = this.state.app.currentPage;
        let { setData } = this.state.app.currentPage;
        return (
            <ServiceProvider value={{ lang: params.lang, setData: setData, getData: getData }}>
                <Layout title={params.lang === "en" ? "Catalog" : "Catálogo"}>
                    <div page="personalizeyourcatalog">
                        {this.state.sliderpersonalizeyourwedd.length > 0 ?
                            <Sliderprincipal slides={this.state.sliderpersonalizeyourwedd} /> : null}
                        <section component="personalizeyourcatalog">
                            <Cell small="12" medium="12" large="12">

                                {this.state.tabDataContent.cover != null ?
                                    <center className="covercatalog">
                                        <img src={this.state.tabDataContent.cover}></img>
                                    </center>
                                    :
                                    <Titlesection
                                        key={"title"}
                                        title={this.state.tabDataContent.title}
                                        subtitle={this.state.desc_catalog}
                                    //description={this.state.tabDataContent.description}
                                    />
                                }


                            </Cell>
                            <GradientBar>
                                <div className="container">
                                    <div component="grid-x">
                                        <div component="cell" small="4" medium="4" large="4">
                                            <div className="back-btn">

                                                        <a style={{cursor:"pointer"}}onClick={()=>{window.history.back();}} className="arrow">
                                                            <p className="description">
                                                                {params.lang == "en" ? "BACK" : "REGRESAR"}
                                                                <Iconwedd icon={"chevron-left"} color={"light-melon"} />
                                                            </p>
                                                        </a>
                                            </div>
                                        </div>
                                       {sessionStorage.logged_in == "true"?null:<div component="cell" small="4" medium="4" large="4">
                                            <div className="content"> {/*Parte del wishlidt*/}
                                                <p className="description" style={{cursor:"pointer"}} onClick={()=>{
                                                    window.location.href =localStorage.langWeddings+"/wishList";
                                                }}>
                                                    {params.lang == "en" ? "Your Selections" : "Tus Deseos"}
                                                </p>
                                                <div className="heart">
                                                    <Iconwedd icon={"heart-empty"} color={"pink icon-check checked"} />
                                                    <section style={{    position: "relative",top: -"11px",left: "-7px",top: "-12px"}}>
                                                        <p style={{margin: "auto",height: "maxContent",lineHeight:"25px"}}>
                                                            {this.state.countWishes!=0?this.state.countWishes:localStorage.wishList?localStorage.wishList:0}
                                                        </p>
                                                    </section>
                                                </div>
                                            </div>
                                        </div>}
                                        <div component="cell" small="4" medium="4" large="4">
                                        {sessionStorage.logged_in == "true"?<div className="content">
                                                <p className="description" style={{cursor:"pointer"}} onClick={()=>{
                                                    window.location.href = "/postlogin/my-cart";
                                                }}>
                                                    {params.lang == "en" ? "My Cart" : "Mi Carrito"}
                                                </p>
                                                <div className="heart">
                                                    <i className="material-icons"></i>
                                                    <section style={{    position: "relative",top: -"11px",left: "-7px",top: "-12px"}}>
                                                        <p style={{margin: "auto",height: "maxContent",lineHeight:"25px"}}>
                                                            {this.state.countInCart}
                                                        </p>
                                                    </section>
                                                </div>
                                            </div>
                                            :
                                            null
                                            }
                                        </div>
                                    </div>
                                </div>
                            </GradientBar>
                            <div className="push"></div>
                            <div component="grid-x">
                                <Cell small="12" medium="12" large="12">
                                    <div component="grid-x" className="selectresorts">
                                        <div component="cell" small="1" medium="4" large="4"></div>
                                        <div component="cell" small="10" medium="4" large="4">
                                           {sessionStorage.logged_in=="true"?null: <Input
                                                type={"select"}
                                                data={this.state.dataDestination}
                                                withSearch={false}
                                                placeholder={params.lang == "en" ? "Choose a property" : "Selecciona una propiedad"}
                                                ref={this.selectPro}
                                                onchange={(event, value) => { this.changeHandler(event, value) }}
                                                catalogos={true}
                                            />}
                                        </div>
                                    </div>
                                </Cell>
                                <Cell small="12" medium="12" large="12">
                                    <Personalizeyourcatalog
                                        unidad_negocio={this.unidad_negocio}
                                        tipo_catalogo={this.state.tipo_catalogo}
                                        property={this.state.property}
                                        property_name={this.property_name}
                                        property_hotel={this.state.htlPopert}
                                        onWishList={(data) => { this.setState({ countWishes: data.length }) }}
                                        paramService={this.state.service}
                                        toknow = {this.state.toknow}
                                        title_toknow = {this.state.title_toknow}
                                        title_toknowEs = {this.state.title_toknowEs}
                                        pdfs = {this.state.pdfs}
                                        onCartList = { (data) => {this.setState({ countInCart : data.length })} }
                                        onCarValues = { (data) => {this.setState({inCartArr : data})}}
                                        valuesInCart = { this.state.inCartArr}
                                        cart = { this.state.carArray }
                                    />
                                </Cell>
                            </div>
                        </section>
                    </div>
                </Layout>
            </ServiceProvider>
        );
    }
}

export default withRouter(WithContext(Catalog));

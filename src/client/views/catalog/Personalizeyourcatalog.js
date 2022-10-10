import React, { Component } from "react";
import Tabstwo from "../../components/tabstwo";
import GalleryChecks from '../../components/clever/gallery';
import ViewDetail from './ViewDetail';
import ViewDetailSpecial from './ViewDetailSpecial';
import ViewDetailSpecialPlg from './ViewDetailSpecialPlg';

import WithContext from "../../app/Context";
import Paginator from './paginator';
import api from '../../app';
import { Titlesection, Iconwedd } from '../../components/wirefragment';
import { Redirect, withRouter, BrowserRouter as Router } from "react-router-dom";
import ErrorCatching from "../../components/error";
class Personalizeyourcatalog extends Component {
    constructor(props) {
        super(props);

        this.BodyTabs = React.createRef();
        this.headFloat = React.createRef();
        this.activeTabs = this.activeTabs.bind(this);
        this.headTabsStatic = this.headTabsStatic.bind(this);
        this.property = this.props.property;
        this.onSelectTab = null;
        this.descripcion = "";
        this.title = "";

        this.state = {
            gallery_data: [],
            values_checked: [],
            dataServices: null,
            page: [],
            detail: {},
            notGallery: false,
            notCakes: false,
            goodtoknow: null,
            load:0,
            redirect: false,
            carrito: [],
            cakeSelected: 0,
            valuesInCart: [],
            idservice: 0
        };
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
        window.addEventListener("scroll", this.headTabsStatic);
        this.setState({ values_checked: this.addShoppingCart() });
        this.setState({ valuesInCart : this.props.valuesInCart });
        this.setState({ carrito : this.props.cart });
        this.getServiceByProperty();
        this.headFloatLimit = React.createRef()
        this.setState({thisIsLogin:true})
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.property != this.props.property) {
            this.property = this.props.property;
            this.getServiceByProperty();
            this.setState({ valuesInCart : this.props.valuesInCart });
            this.setState({ carrito : this.props.cart });
        }

    }
    getServiceByProperty() {
        let currentPdf = "";
        if (this.property == "" || this.props.unidad_negocio < 1) return;
        this.descripcion = "";
        this.setState({load:1})
        api.getServiceByProperty(this.property, this.props.unidad_negocio)
            .then(res => {
                if(this.props.toknow){
                switch (this.property) {
                    case "ZCJG"://moonpalacejamaica
                        currentPdf = this.props.pdfs.pdfJamaica
                        break;
                    case "ZMGR"://thegrand
                        currentPdf = this.props.pdfs.pdfCancun
                        break;
                    case "ZMNI"://moonpalacecancun
                        currentPdf = this.props.pdfs.pdfCancun
                        break;
                    case "ZHLB"://leblancancun
                        currentPdf = this.props.pdfs.pdfCancun
                        break;
                    case "ZPLB"://leblancloscabps
                        currentPdf = this.props.pdfs.pdfCabos
                        break;
                    case "ZRPL"://playacar
                    currentPdf = this.props.pdfs.pdfPlaya
                        break;
                    case "ZHBP"://beachpalace
                        currentPdf = this.props.pdfs.pdfCancun
                        break;
                    case "ZRCZ"://cozumel palace
                        currentPdf = this.props.pdfs.pdfCozumel
                        break;
                    // case "ZHIM"://isla mujeres palace
                    // currentPdf = this.props.pdfs.pdfIsla
                    //     break;
                    case "ZHSP"://sun palace
                        currentPdf = this.props.pdfs.pdfCancun
                        break;
                    default:
                        break;
                }
            }

                if (currentPdf!=""){
                    let toknow = {
                        "idservice_servicio_tipo" : "",
                        "descripcion": this.props.title_toknow,
                        "idpropiedad": "",
                        "idservice_unidad_negocio": "",
                        "nombre" : this.props.title_toknow,
                        "nombreespanol":this.props.title_toknowEs,
                        "pdf":currentPdf
                    }
                    res.data.push(toknow)
                }



                const { match: { params } } = this.props;
                let cats_amada = []
                if (params.lang == "en") {
                    cats_amada = res.data;
                }else {
                    cats_amada = res.data.filter((e, i) => { return e.idservice_servicio_tipo != "142" })
                }

                this.setState({ dataServices: cats_amada, notCakes: cats_amada.length <= 0 ,});
                this.onSelectTab(0);
                this.activeTabs(0, res.data[0].idservice_servicio_tipo, this.state.dataServices[0]);
                this.props.onWishList(this.state.values_checked);
            })
            .catch(e => { this.setState({ dataServices: [], gallery_data: [], page: [], notCakes: true, notGallery: false }); });
    }

    getServicesByCategory(tipo_servicio, property) {

        let regex = /(\d+)/g;
        const { match: { params } } = this.props;
        const varCarrito = this.props.cart;
        api.getServicesByCategory(tipo_servicio, property)
            .then(res => {
                setTimeout(()=>{
                let dataRes=[]
                let dateFilterPack=[]
                let datos= res.data;
                res.data.forEach(element => {
                    if(element.propiedades!=null){
                        if(element.idservicio_agrupador!=0 && element.coleccion==0){
                            if(element.idservicio_agrupador!=0){
                                dateFilterPack.push(element)
                            }else{
                                dataRes.push(element)
                            }
                        }else{
                            if(element.coleccion!=0){
                                dateFilterPack.push(element)
                            }else{
                                dataRes.push(element)
                            }
                        }
                    }
                    else{
                        //console.log(element)
                    }
                }
                );
                dateFilterPack=dateFilterPack.filter((e,i)=>{
                    //if(e.propiedades!=null){
                        return (e.propiedades.indexOf(this.props.property_hotel)>-1)
                    //}
                })
                this.setState({dateFilterPack:dateFilterPack})
                let tag_special=[...new Set(dateFilterPack.map(({idservicio_agrupador})=>idservicio_agrupador))];

                try{
                tag_special.forEach(element => {
                        dataRes.push(dateFilterPack.filter((resTag)=>{
                            return resTag.idservicio_agrupador==element && element!=0
                        })[0])
                })
                }
                catch(ex){
                    console.log(ex)
                }
                //console.log("tipo_servicio",tipo_servicio,">>>>>tag:especial",tag_special)
                dataRes=dataRes.filter((res)=>{
                    if(res){
                        if(res.propiedades!=null){
                            return res.propiedades.indexOf(this.props.property_hotel) > -1
                        }
                    }
                })
                let data = dataRes.map((item, index) => {
                    let aux_=item.descripcion
                    let varCarritos = this.props.cart.filter(carrito => carrito.idservice_evento === item.idservice_servicio);

                   if(item.tag!=null){
                       let splitNum=item.descripcion.match(regex)
                       let ttlAlt= splitNum==null?item.descripcion: item.descripcion.split(splitNum[0])
                       aux_=splitNum!=null?ttlAlt[0]:ttlAlt
                   }
                   let dataResult=dateFilterPack.filter((res)=>{return res.idservicio_agrupador==item.idservicio_agrupador })
                    if(varCarritos.length > 0){
                        item["idevent_detalle_item"] = varCarritos[0].idevent_detalle_item;
                    }
                   //console.log(item.descripcion,"<<-->>",item.descripcion)
                    return {
                        indice:index,
                        family:this.state.family,
                        serviceEn:this.state.serviceEn,
                        serviceEs:this.state.serviceEs,
                        tag:    item.tag==null  ?   ""  :   item.tag,
                        idservicio_agrupador:   item.idservicio_agrupador ==null    ?   0   :   item.idservicio_agrupador,
                        idservice_servicio_tipo:    item.idservice_servicio_tipo==null  ? 0   :   item.idservice_servicio_tipo,
                        coleccion:  item.coleccion==null    ?   0   :   item.coleccion,
                        id: item.idservice_servicio==null   ?   0   :   item.idservice_servicio,
                        image_src: item.images[0]==null     ?   ""  :   item.images[0].thumb,
                        value:  item.idservice_servicio==null   ?   0   :   item.idservice_servicio,
                        label: this.nombreItemGrid(item,dataResult.length),
                        descripcion:item.descripcion,
                        descripcionespanol:item.descripcionespanol,
                        logo: item.images[0]==null  ?   ""  :   item.images[0].path,
                        src: item.images[0]==null   ?   ""  :   item.images[0].thumb,
                        img_extra: item.images[0]==null ?   ""  :   item.images[0].imagen_extra==" "?"":item.images[0].imagen_extra,
                        title: item.descripcion==null   ?   ""  :   item.descripcion,
                        include: item.include[0]==null  ?   ""  :   params.lang == "en" ? item.include[0].texto : item.include[1] ? item.include[1].texto : "",
                        codigo_produccion : item.codigo_produccion==null    ?   ""  :   item.codigo_produccion,
                        terms_conditions : item.termcondiciones.length == 0    ?   null  :   item.termcondiciones,
                        unidad_negocio:this.props.unidad_negocio,
                        precio:item.price.precio==null ? null:item.price.precio,
                        personalizable: item.personalizable,
                        num_pax:item.num_pax,
                        idconcepto_ingreso: item.idconcepto_ingreso,
                        idevent_detalle_item: item.idevent_detalle_item,
                    };
                });
                this.setState({ gallery_data: data.sort(this.compare), page: [], notGallery: data.length <= 0, goodtoknow : null,load:0});
                setTimeout(()=>{
                    this.setState({heigthGlry:this.heightGaleryCh()})
                },250)

            },200)
            })
            .catch(e => {
                this.setState({ gallery_data: [], page: [], notGallery: true, goodtoknow : 1});
                if(this.state.notGallery){
                    this.setState({load:0})
                }
            });
    }


    compare(a, b) {
        const unidadA = a.id;
        const unidadB = b.id;

        let comparison = 0;
        if (unidadA > unidadB) {
          comparison = 1;
        } else if (unidadA < unidadB) {
          comparison = -1;
        }
        return comparison;
      }


    nombreItemGrid(item,dataResult){
        let nameGrid=localStorage.langInt==1?
        item.descripcion:
        item.descripcionespanol!=""?
        item.descripcionespanol:item.descripcion

        return (dataResult>0?nameGrid.split("-")[0]:nameGrid)
    }

    activeTabs(index, idservice_servicio_tipo,element) {
        this.setState({
            family:element.nombre,
            serviceEn:element.descripcion,
            serviceEs:element.nombreespanol,
            load:1
        })
        //console.log(element.descripcion,element.nombreespanol)
        this.setState({idservice:idservice_servicio_tipo,idservice_servicio_tipo})
        this.descripcion = this.state.dataServices[index].descripcion;
        this.title = this.state.dataServices[index].descripcion;
        this.getServicesByCategory(idservice_servicio_tipo, this.property);
    }

    addShoppingCart(data, setData) {
        var session = window.sessionStorage;
        data = data && Object.keys(data).length > 0 ? data : [];
        setData = setData == true || data.length > 0 ? true : false;
        if (setData) {
            let dataString = JSON.stringify(data);
            session.setItem("shopping_cart", dataString);
        } else if (session.getItem("shopping_cart")) {
            data = JSON.parse(session.getItem('shopping_cart'));
        }
        return data;
    }

    addToShoppingCart(detail, dataFl){
        let services = [];
        let data = Object.assign([], this.state.valuesInCart2==null?this.state.valuesInCart:this.state.valuesInCart2);
        const idevent = sessionStorage.id;

        if (data.includes(detail.id)){
        services.push({
            "img" : detail['image_src'],
            "description" : detail['descripcion'],
            "amount" : detail['precio'],
            "currency" : "USD",
            "quantity" : "1",
            "u_price" :  detail['precio'],
            "id": detail['idevent_detalle_item'],
        });

        this.setState({
            idservice: detail['idevent_detalle_item'],
            services: services,
            redirect: true
        });
        }else{
            let di = {
                id_evento: idevent,
                idevent_evento: idevent,
                id_locacion: 0,
                idservice_evento_coleccion: detail.idservicio_agrupador,
                idservice_evento: detail.id,
                id_proveedor: "1",
                precio_unitario: detail.precio,
                cantidad: 1,
                cantidad_pendiente: detail.precio,
                coleccion: detail.coleccion,
                list_colections: {},
                personalizado: detail.personalizable,
                comentario_recepcion: '_',
                estado_recepcion: 1,
                cantidad_pagada: 0,
                estado: 1,
                idservice_unidad_negocio: this.props.unidad_negocio,
                //por si va
                procesable: 1,
                usuario_creacion: "weddingweb",
                fecha_hora: "1000-01-01 00:00:00",
                fecha_creacion: "1000-01-01 00:00:00",
                oculto: 0,
                pax: detail.num_pax,
                notas: " ",
                cantidad_coleccion: 0,
                idservice_servicio_tipo: detail.idservice_servicio_tipo,
                json_formato: "{}",
                idconcepto_ingreso: detail.idconcepto_ingreso,
                venta_en_linea: 1

            };

            api.sendShoppingCart(di)
                .then((res) => {
                    let response = JSON.parse(res.data);
                    if(response.error === false){
                        data.push(detail.id)
                        let check =  data
                        this.props.onCartList(check);
                        console.log(check);
                        this.props.onCarValues(check);
                        this.state.gallery_data[detail.indice].idevent_detalle_item = response.id;
                        let de_notes = {
                            idevent_detalle: response.id,
                            extra_informacion: (detail.include) ? detail.include : " - ",
                            tipo: 1, // Novia
                            tipo_extrainfo: 2, // Notas
                            path: " - ",
                            thumb:" - ",
                            usuario_creacion:"weddingweb",
                            estado: 1,
                            fecha_creacion: Date.now(),
                        };

                        api.postComment(de_notes)
                        .then((res) => {
                        })
                        .catch((e) => {
                        });

                   }

            })
            .catch(e => {
            })
        }

    }


    addToShoppingCartEsp(detail){
        let services = [];
        let data = Object.assign([], this.state.valuesInCart2==null?this.state.valuesInCart:this.state.valuesInCart2);
        const idevent = sessionStorage.id;

        if (data.includes(detail.idservice_servicio)){
        services.push({
            "img" : detail.images['thumb'],
            "description" : detail['descripcion'],
            "amount" : detail.price['precio'],
            "currency" : "USD",
            "quantity" : "1",
            "u_price" :  detail.price['precio'],
            "id": null,
        });

        this.setState({
            idservice: detail.idevent_detalle_item,
            services: services,
            redirect: true
        });
        }else{
            let di = {
                id_evento: idevent,
                idevent_evento: idevent,
                id_locacion: 0,
                idservice_evento_coleccion: detail.idservicio_agrupador,
                idservice_evento: detail.idservice_servicio,
                id_proveedor: "1",
                precio_unitario: detail.price['precio'],
                cantidad: 1,
                cantidad_pendiente: detail.price['precio'],
                coleccion: detail.coleccion,
                list_colections: {},
                personalizado: detail.personalizable,
                comentario_recepcion: '_',
                estado_recepcion: 1,
                cantidad_pagada: 0,
                estado: 1,
                idservice_unidad_negocio: this.props.unidad_negocio,
                //por si va
                procesable: 1,
                usuario_creacion: "weddingweb",
                fecha_hora: "1000-01-01 00:00:00",
                fecha_creacion: "1000-01-01 00:00:00",
                oculto: 0,
                pax: detail.num_pax,
                notas: " ",
                cantidad_coleccion: 0,
                idservice_servicio_tipo: detail.idservice_servicio_tipo,
                json_formato: "{}",
                idconcepto_ingreso: detail.idconcepto_ingreso,
                venta_en_linea: 1

            };

            api.sendShoppingCart(di)
                .then((res) => {
                    let response = JSON.parse(res.data);
                    if(response.error === false){
                        data.push(detail.idservice_servicio)
                        let check =  data
                        this.props.onCartList(check);
                        console.log(check);
                        this.props.onCarValues(check);
                        this.state.dataFilterSelect.filter( (e) => {
                            if(e.idservice_servicio==detail.idservice_servicio){
                                e.idevent_detalle_item = response.id
                            }
                        })
                        let de_notes = {
                            idevent_detalle: response.id,
                            extra_informacion: (detail.include) ? detail.include : " - ",
                            tipo: 1, // Novia
                            tipo_extrainfo: 2, // Notas
                            path: " - ",
                            thumb:" - ",
                            usuario_creacion:"weddingweb",
                            estado: 1,
                            fecha_creacion: Date.now(),
                        };

                        api.postComment(de_notes)
                        .then((res) => {
                        })
                        .catch((e) => {
                        });

                   }

            })
            .catch(e => {
            })
        }

    }

    addWishes(detail,dataFl) {

        let { setData,getData } = this.state.app;
        let data = Object.assign([], this.state.values_checked);

        if (data.includes(detail.value)){

            let removeItem=JSON.parse("["+localStorage.items_wish+"]")
            removeItem=removeItem.filter((e)=>{return e.value!==detail.value});
            localStorage.items_wish=JSON.stringify(removeItem).slice(0,-1).slice(1)

            let removeItemFilter=JSON.parse("["+localStorage.dateFilterPack+"]")
            removeItemFilter=removeItemFilter.filter((e)=>{
                return e.idservicio_agrupador!==detail.value
            });
            localStorage.dateFilterPack=JSON.stringify(removeItemFilter).slice(0,-1).slice(1)

            data = data.filter(e => e !== detail.value);
        }else{
            data.push(detail.value)

            localStorage.dateFilterPack+=JSON.stringify(dataFl).slice(0,-1).slice(1)
            localStorage.dateFilterPack=(localStorage.dateFilterPack+"").replace("undefined","").replace("}{","},{")
            //localstore para visualizar los servicios seleccionados
            localStorage.items_wish+=JSON.stringify(detail)
            localStorage.items_wish=(localStorage.items_wish+"").replace("undefined","").replace("}{","},{")
        }
        this.setState({ values_checked: data }, () => { this.addShoppingCart(data); });
        setData('items_wish', data);
        this.addShoppingCart(data, true);
        this.setState({ values_checked: data });
        this.props.onWishList(data);

        localStorage.wishList=data.length
    }

    viewDetail(value) {
        this.setState({ detail: value });
    }

    onCharge() {

    }

    headTabsStatic() {
        if (this.headFloat.current != null) {
            if (innerWidth > 1024) {
                if (window.pageYOffset > 901) {
                    this.headFloat.current.style =
                        "left: 0; position: fixed;top: 108px;width: 100%;transition:.5s;";
                } else {
                    this.headFloat.current.style = "position: relative;top: 0px;width: 100%;transition:.5s;";
                }
            } else {
                if ((this.BodyTabs.current.childNodes[1].offsetTop - window.pageYOffset) > 0) {
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
            if(scrollY>0){
            localStorage.localScrolY=scrollY
            }
           /* console.log(this.BodyTabs.current.childNodes[1].offsetTop-window.pageYOffset)
            if ((this.BodyTabs.current.childNodes[1].offsetTop - window.pageYOffset) < 0) {
                //this.headFloat.current.style = "position: relative;top: 0px;width: 100%;transition:.5s;"
                this.headFloat.current.style = "position: fixed;top: -107px;width: 100%;transition:.5s;"
            }*/
        }
    }
    heightGaleryCh(){
            return this.chkGalery?this.chkGalery.lastChild.offsetHeight+"px":""
    }
    render() {
        let tipo_catalogo = "cakes"
        const { match: { params } } = this.props;
        const redirect = this.state.redirect;

        if (redirect) {
            location.href=`/postlogin/checkout?idservice=${this.state.idservice}`;
        }

        return (
            <div className="contentheadSlide">
                <div id="replace-size" ref={this.headFloatLimit}></div>
                <div ref={this.headFloat} className="head-sticki" >
                    <div className="fondo-head"></div>
                    <Tabstwo class="container tabcategoriescake" onSelectTab={(item) => { this.onSelectTab = item; }}>
                        {this.state.dataServices && Object.keys(this.state.dataServices).length > 0 ?
                            this.state.dataServices.map((element, index) => {
                                return (
                                    <a onClick={this.activeTabs.bind(this, index, element.idservice_servicio_tipo,element)} key={index}>
                                        {params.lang=="en"?(element.descripcion!=null?element.descripcion:""):(element.nombreespanol!=null?(element.nombreespanol!=""?element.nombreespanol:element.descripcion):"")}
                                    </a>
                                );
                            })
                            : []
                        }
                    </Tabstwo>
                    <div className={this.state.notCakes ? "show" : "hide"} >
                        <Titlesection subtitle={"Not Found " + this.props.tipo_catalogo + " to " + this.props.property_name} />
                    </div>
                </div>
                <div className="divisor-head-slide"></div>
                <section className="content-tabs container" ref={this.BodyTabs}>
                    <div component="grid-x">
                        <div component="cell" small="12" medium="12" large="12">
                            <center className={this.state.notCakes ? "hide" : "show"}>
                                {this.props.property ?
                                    params.lang == "en" ?
                                        <p className="description">
                                           Select which  {this.props.tipo_catalogo} appeal to you most.

                                        </p>
                                        :
                                        <p className="description">
                                            Elija tantos {this.props.tipo_catalogo} como desee y comience a planificar con nosotros
                                        </p>
                                    : ""}
                            </center>
                        </div>
                        <div className="slide-description"></div>
                        <div componet="cell" small="12" medium="12" large="12" className={this.state.detail && Object.keys(this.state.detail).length > 0 ? "hide" : "show"} >
                            <>
                                {<div className={"content-load"} style={this.state.load==1?{opacity:"1"}:{opacity:"0",marginTop:"0px"}}><div className="loader"></div></div>}
                                <section style={this.state.load==0?{opacity:"1",transition:".5s",overflow:"hidden"}:{opacity:"0",height:"0px",transition:".5s",overflow:"hidden"}} ref={input => { this[`chkGalery`] = input; }}>
                                        <GalleryChecks
                                        key={`GalleryChecks`}
                                        item_list={this.state.page}
                                        galleryClick={(value, id, item) => {
                                            this.viewDetail(item);
                                            this.setState({id_select_item:item.id})
                                            let dataResult=this.state.dateFilterPack.filter((res)=>{return res.idservicio_agrupador==item.idservicio_agrupador })
                                            let normal=((item.coleccion==0))
                                            let special=((item.coleccion==1) && (item.idservicio_agrupador!=0) && (item.idservice_servicio_tipo!=22))
                                            let specialPlPl=((item.coleccion==0) && (item.idservicio_agrupador!=0) && (item.idservice_servicio_tipo==22))
                                            this.setState({dataFilterSelect:dataResult,special:special,specialPlPl:specialPlPl,normal:normal})
                                            //console.log(dataResult)//dataResult,this.props.idservice_servicio
                                        }}
                                        card={true}
                                        values_checked={this.state.values_checked}
                                        unidad_negocio={this.props.unidad_negocio}
                                    />
                                    </section>
                            <br/>
                            {this.state.load==1?<><br/><br/></>:<></>}
                            </>
                        </div>
                        <div className={this.state.notGallery ? "show" : "hide"} component="cell" small="12" medium="12" large="12">

                            {
                                this.state.goodtoknow == null ?
                                    <center>
                                        {params.lang == "en" ?
                                            <Titlesection subtitle={"Not Found " + this.props.tipo_catalogo + " to " + this.title} />
                                            :
                                            <Titlesection subtitle={"No se encontraron " + this.props.tipo_catalogo + " para " + this.title} />
                                        }
                                    </center>
                                :
                                    <iframe frameborder="0" height="500" width="100%" src={this.state.dataServices[this.state.dataServices.length-1].pdf} ></iframe>
                            }

                        </div>
                        <div component="grid-x" style={{width:"100%"}} className={this.state.detail && Object.keys(this.state.detail).length > 0 ? "show" : "hide"} >
                            <div component="cell" small="0" medium="2" large="3"></div>
                            <div component="cell" small="12" medium="8" large="6">
                                {
                                   this.state.special?
                                    <section >
                                       <ErrorCatching  message={params.lang=="en"?"Oops! an error has ocurred":"Oops! ha ocurrido un error"}>
                                        <ViewDetailSpecial
                                            data={this.state.detail}
                                            onBack={() => { this.setState({ detail: {} }) }}
                                            onAdd={() => { this.addWishes(this.state.detail,this.state.dataFilterSelect) }}
                                            onAddCart={(detalle) => { console.log(detalle[0])
                                                this.addToShoppingCartEsp(detalle[0])
                                            }}
                                            onSelected={this.state.values_checked.includes(this.state.detail.value)}
                                            dataFilter={this.state.dataFilterSelect}
                                            lang_site={params.lang}
                                            unidad_negocio={this.props.unidad_negocio}
                                            onCart={this.state.valuesInCart.includes(this.state.detail.value)}
                                            onCartValues={this.state.valuesInCart}
                                        />
                                        </ErrorCatching>
                                    </section>
                                    :this.state.specialPlPl?
                                    <section>
                                      <ErrorCatching  message={params.lang=="en"?"Oops! an error has ocurred":"Oops! ha ocurrido un error"}>
                                        <ViewDetailSpecialPlg
                                            data={this.state.detail}
                                            onBack={() => { this.setState({ detail: {} }) }}
                                            onAdd={() => { this.addWishes(this.state.detail,this.state.dataFilterSelect) }}
                                            onAddCart={() => { this.addToShoppingCart(this.state.detail,this.state.dataFilterSelect) }}
                                            onSelected={this.state.values_checked.includes(this.state.detail.value)}
                                            dataFilter={this.state.dataFilterSelect}
                                            property_hotel={this.props.property_hotel}
                                            lang_site={params.lang}
                                            unidad_negocio={this.props.unidad_negocio}
                                            onCart={this.state.valuesInCart.includes(this.state.detail.value)}
                                        />
                                         </ErrorCatching>
                                    </section>
                                    :
                                    <section>
                                    <ErrorCatching  message={params.lang=="en"?"Oops! an error has ocurred":"Oops! ha ocurrido un error"}>
                                    <ViewDetail
                                    dataFilter={this.state.dataFilterSelect!=null?this.state.dataFilterSelect:[]}
                                        data={this.state.detail}
                                        onBack={() => { this.setState({ detail: {} }) }}
                                        onAdd={() => { this.addWishes(this.state.detail,this.state.dataFilterSelect)}}
                                        onAddCart={() => { this.addToShoppingCart(this.state.detail,this.state.dataFilterSelect) }}
                                        onSelected={this.state.values_checked.includes(this.state.detail.value)}
                                        unidad_negocio={this.props.unidad_negocio}
                                        lang_site={params.lang}
                                        thisIsLogin={false}
                                        onCart={this.state.valuesInCart.includes(this.state.detail.value)}
                                    />
                                    </ErrorCatching>
                                    </section>
                                 }
                            </div>
                            <div component="cell" small="0" medium="2" large="3"></div>
                        </div>

                    </div>

                    <Paginator
                        total={200}
                        data={this.state.gallery_data}
                        onClick={(value) => {
                            this.setState({ page: value, detail: {} })
                    }}
                    />
                    <span className="limit-head" />
                </section>
            </div>
        );
    }
}

Personalizeyourcatalog.defaultProps = {
    unidad_negocio: 0,
    property: "",
    property_name: "",
    onWishList: (item) => { },
    onCartList: (item) => {},
    cart: []
};

export default withRouter(WithContext(Personalizeyourcatalog));

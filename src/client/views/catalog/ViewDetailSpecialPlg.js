import React, { Component } from 'react';
import { Titlesection } from "../../components/wirefragment";
import { Iconwedd } from '../../components/wirefragment';
import { Input } from "../../components/wirefragment";
import InputRange from '../../components/clever/inputrange';
import { Sliders } from '../../components';
import jsonTest from './test'
import ReactHtmlParser from 'react-html-parser';

class ViewDetailSpecialPlg extends Component {
    constructor(props) {
        super(props);
    };

    componentDidUpdate() {
        setTimeout(() => {
            if (this.props.id_item_select != null) {
                this.load_range_data()
            }
        }, 200)
        this.didUpdt()
    }
    didUpdt() {
        try {
            if (this.props.data.title != null) {
                if (window.innerWidth < 1025) {
                    document.querySelector(".slider").style.display = "none"
                    document.querySelector(".titlesection").style.display = "none"
                    document.querySelector(".GradientBar").style.display = "none"
                }
                document.querySelectorAll(".FormNewsletter")[2].style.display = "none"
                document.querySelector(".commonlinks").style.display = "none"
                document.querySelector(".tabcategoriescake").style.display = "none"
                document.querySelector(".push").style.display = "none"
                document.querySelector(".paginator") != null ? document.querySelector(".paginator").style.display = "none" : null
                document.querySelector(".selectresorts").style.display = "none"
                document.querySelector(".show").style.display = "none"
                document.querySelector(".covercatalog").style.display = "none"
                document.querySelector("#replace-size") != null ? document.querySelector("#replace-size").style.display = "none" : null
            } else {
                document.querySelectorAll(".FormNewsletter")[2].style.display = ""
                document.querySelector(".commonlinks").style.display = ""
                document.querySelector(".slider").style.display = ""
                document.querySelector(".titlesection").style.display = ""
                document.querySelector(".GradientBar").style.display = ""
                document.querySelector(".tabcategoriescake").style.display = ""
                document.querySelector(".push").style.display = ""
                document.querySelector(".selectresorts").style.display = ""
                document.querySelector(".show").style.display = ""
                document.querySelector(".covercatalog").style.display = ""
                document.querySelector(".paginator") != null ? document.querySelector(".paginator").style.display = "" : null
                document.querySelector("#replace-size") != null ? document.querySelector("#replace-size").style.display = "" : null
            }
        } catch (ex) { console.log(ex) }
    }
    componentWillUnmount() {
        try {
            document.querySelectorAll(".FormNewsletter")[2].style.display = ""
            document.querySelector(".commonlinks").style.display = ""
            document.querySelector(".slider").style.display = ""
            document.querySelector(".titlesection").style.display = ""
            document.querySelector(".GradientBar").style.display = ""
            document.querySelector(".tabcategoriescake").style.display = ""
            document.querySelector(".push").style.display = ""
            document.querySelector(".paginator") != null ? document.querySelector(".paginator").style.display = "" : null
            document.querySelector(".selectresorts").style.display = ""
            document.querySelector(".show").style.display = ""
            document.querySelector(".covercatalog").style.display = ""
        } catch (ex) {
            console.log(ex)
        }
    }
    handleChange(e) {
        this.setState({ renge_value: e })

        this.lodDataChange(e)
        localStorage.removeItem("clearstate")
    }
    lodDataChange(e) {
        let level = 0
        let range = [...new Set(this.dataPropsFilter(this.props.dataFilter).map(({ num_pax }) => parseInt(num_pax)))];
        range.push(0)
        range.sort(function (a, b) { return a - b; })
        let ndRepeat = [...new Set(range)];
        this.setState({ guest_range: e })
        setTimeout(() => {
            ndRepeat.forEach((element, index) => {
                let rangeValid = this.rangeNumPax(parseInt(ndRepeat[index - 1]), ndRepeat[index], parseInt(e), index)
                if (rangeValid) {
                    this.load_range_data(index - 1)
                }
            });
        })
    }
    rangeNumPax(x, y, e, i) {
        //console.log(x,y,e,i-1,)
        return (y >= e, x <= e)
    }

    load = 0
    load_range_data(index) {
        let regex = /(\d+)/g;
        let desc = this.dataPropsFilter(this.props.dataFilter)[index].descripcion
        try {
            desc = desc.match(regex)[0]
        } catch (ex) {

        }
        let dataFilter = this.dataPropsFilter(this.props.dataFilter)[index]
        let img_slider = []
        try {
            img_slider.push(dataFilter.detallecoleccion[0].services[0].images[0].path)
        } catch (ex) {
            //console.group(ex)
        }
        try {
            img_slider.push(dataFilter.detallecoleccion[0].services[1].images[0].path)
        } catch (ex) {
            //console.group(ex)
        }

        this.setState({
            g: desc + "G",
            tag: dataFilter.tag,
            desc_ext: dataFilter.descripcion,
            num_pax: dataFilter.num_pax,
            path: dataFilter.images[0].path,
            descripcionespanol: dataFilter.descripcionespanol,
            descripcion: dataFilter.descripcion,
            include: dataFilter.include[localStorage.langInt - 1] ? dataFilter.include[localStorage.langInt - 1].texto : "",
            terms_text: dataFilter.termcondiciones.length == 0 ? "" : this.props.lang_site == "en" ? dataFilter.termcondiciones[0].texto : dataFilter.termcondiciones[1] ? dataFilter.termcondiciones[1].texto : "",
            precio:dataFilter.price.precio
        })
    }
    col_aud_ligh(arr, tipo) {
        let html_ = []
        let index = 0
        try {
            if (arr.length > 0) {
                arr.forEach(element => {
                    index++
                    html_.push(<p key={index} className="description">{element}</p>)
                });
                html_ = (
                    <>
                        <section style={{ width: "50%" }}>
                            <p className="description ttl_dsc"><b>{tipo == 0 ? "Audio" : tipo == 2 ? "" : "Lighting"}</b></p>
                            <section className="list_package">{html_}
                            </section>
                        </section>
                    </>)
            }
        } catch (ex) {
            //console.log(ex)º
        }
        return html_
    }
    dataPropsFilter(data) {
        let data_aux = []
        let isHour = false

        data.forEach((element) => {
            if (element.cantidad_unidades == "3") {
                data_aux.push(element)
                isHour = true
            }
        })
        if (isHour) {
            return data_aux
        } else {
            return data
        }
    }

    titleValidacion(data) {
        return localStorage.langInt == 1 ?
            data.descripcion.split("-")[0] :
            data.descripcionespanol != "" ?
                data.descripcionespanol.split("-")[0] : data.descripcion.split("-")[0]
    }
    openCloseTerms(e){
        e.preventDefault();
        this.terms.style = "transform: rotate(" + (this.terminos == 0 ? "180" : "0") + "deg);position: absolute;transition: .5s;"; 
        this.terminos = this.terminos == 0 ? 1 : 0
        this.terms_text.style = "text-align: justify; padding: 0px 10px;font-family: Avenir;transition: .5s;font-size: 16px;overflow: hidden;height:" + (this.terminos == 0 ? this.terms_text.children[0].offsetHeight + "px" : "0px")
    }
    render() {
        let terms_negocios =  ["4","6"]
        setTimeout(() => { this.didUpdt() }, 100)
        let data = this.props.dataFilter
        let hoursDescrip = []
        data.forEach((element, index) => {
            if (element.descripcion.split(" (")[1] != null) {
                hoursDescrip.push({ hour: (element.descripcion.split(" (")[1] + "").replace(")", "") })
            }
        })

        let hour_result = [...new Set(hoursDescrip.map(({ hour }) => hour))];

        let data_aux = this.dataPropsFilter(data)

        let terms_ini = data[0].termcondiciones.length == 0 ? "" : this.props.lang_site == "en" ? data[0].termcondiciones[0].texto : data[0].termcondiciones[1] ? data[0].termcondiciones[1].texto : ""

        let ini = data_aux[0]
        let tag = data_aux[0].tag
        let regex = /(\d+)/g;
        let desc = ini.descripcion
        //desc = desc.match(regex)[0]
        let images = ini.images[0].path
        let range = [...new Set(data_aux.map(({ num_pax }) => num_pax))];
        let max_range = Math.max.apply(null, range)

        if (localStorage.clearstate) {
            this.state = null
        }

        if (max_range < 3) {
            data.forEach((element, index) => {
                if (element.num_pax <= 0) {
                    this[`min_range`] = 1
                    element.num_pax = index + 1
                    max_range = index + 1
                }
            })
        }
        let descripcionIni = this.titleValidacion(ini)
        return (
            <div component="cakeDetail" style={{ height: "unset" }}>
                <div component="grid-x" >
                    <div component="cell" small="2" medium="2" large="2" style={{ display: "flex", alignItems: "center", justifyContent: "center", border: "solid 1px #FEDFD9", borderRight: "none" }}>
                        <a onClick={this.props.onBack} onClickCapture={(e) => {
                            localStorage.isBackTabs = true;
                            localStorage.clearbarprogress = true;
                            localStorage.clearstate = true;
                            this.terminos=1
                            this.openCloseTerms(e)
                        }} style={{cursor:"pointer"}}>
                            <Iconwedd icon={"chevron-carousel-left"} color={"pink"} />
                        </a>
                    </div>

                    {sessionStorage.logged_in=="true"?null: <div component="cell" small="10" medium="10" large="10" className={"grid-flex-20-20-f2f2f2"}  >
                        <Input key="WISHING_LIST" type={"button"} value={localStorage.langInt == 1 ? `${this.props.onSelected ? "  REMOVE" : "  ADD"} TO WISH LIST` : `${this.props.onSelected ? "  QUITAR DE" : "  AGREGAR A"} LA LISTA DE DESEOS`} widthIcon={"heart-full"} handleClick={this.props.onAdd} />
                    </div>
                    }
                </div>
                <div component="grid-x" className={"border-20-20-f2f2f2 bor-top"}>
                </div>
                {/*------------------------------------------aplica para party rime, Dance floor-----------------------------------------------------*/}
                <div component="grid-x" className={"border-20-20-f2f2f2 bor-top"} style={{ display: "block" }}>
                    <section style={{ width: "max-content", margin: "auto", maxWidth: "100%" }} className="title_detail_special">
                        <Titlesection title={descripcionIni} //this.state != null ? this.state.ppt : 2
                            description={((this.state != null ? this.state.guest_range : 2)) + (localStorage.langInt == 1 ? " Guests" : " Invitados")} /></section>
                    <section style={{ width: "100%", maxWidth: "100%", width: "80%", margin: "auto" }}>
                        <br />
                        <InputRange
                            minValue={this.min_range == null ? 2 : this.min_range}
                            maxValue={max_range}
                            value={0}
                            linercolor={{ active: "#F26193", inactive: "#dbdbdb" }}
                            identify={false}
                            _onChange={x => {
                                this.handleChange(x);
                            }}
                            type2
                        />
                        <br />
                    </section>
                    <section style={{ width: "max-content", margin: "auto", maxWidth: "100%" }}>
                        <p className="description txt-light">{this.state != null ? (localStorage.langInt == 1 ? (this.state.descripcion != null ? this.state.descripcion : "") : (this.state.descripcionespanol = !"" ? this.state.descripcionespanol : this.state.descripcion)) : (localStorage.langInt == 1 ? (ini.descripcion != null ? ini.descripcion : "") : (ini.descripcionespanol = !"" ? ini.descripcionespanol : ini.descripcion))}</p>
                        <p>{ReactHtmlParser(sessionStorage.logged_in=="true"?this.state == null ? "<p class=\"description\"> USD $"+data[0].price.precio+"</p>":"<p class=\"description\"> USD $"+this.state.precio+"</p>":null)}</p>
                        {sessionStorage.logged_in=="true"?
                            <center>
                                <Input key="ADD_TO_CART" type={"button"} value={localStorage.langInt == 1 ? `${this.props.onCart ? "  PAY NOW" : "  ADD TO CART"}` : `${this.props.onCart ? "  PAGAR" : "  AGREGAR A CARRITO DE COMPRAS"}`} handleClick={this.props.onAddCart} />
                            </center>
                            :
                            null
                        }  
                        <p className="description" style={{ margin: "auto", width: "100%" }}>
                            { ReactHtmlParser( (this.state ? this.state.include : (ini.include[localStorage.langInt - 1] ? ini.include[localStorage.langInt - 1].texto : "")))}
                        </p>
                    </section>
                    <br />
                    {
                    this.props.unidad_negocio == "4" ?
                    <section>
                        <p  className="description quantum" >
                        {ReactHtmlParser( this.props.lang_site == "en" ? "For further information, please contact us at <a href='mailto:palaceproductions@palaceresorts.com'>palaceproductions@palaceresorts.com</a>" : "Para mayor información, por favor contáctanos: <a href='mailto:palaceproductions@palaceresorts.com'>palaceproductions@palaceresorts.com</a>")}
                        </p>  
                        <br />
                    </section> : ""
                    }


                    <section>
                        <img src={(this.state != null ? this.state.path : images)} style={{ width: "100%" }} alt={ini.descripcion.split("-")[0]} />
                    </section>
                    <br />
                    {hour_result[1] != null ?
                        <>
                            <Titlesection subtitle={(descripcionIni != null ? descripcionIni : "") + " " + (this.state != null ? this.state.g : desc + "G")} />
                            <section style={{ display: "flex" }}><Titlesection description={hour_result[0]} /> <Titlesection description={hour_result[1]} /></section>
                        </>
                        : <></>
                    }

                    {
                        terms_negocios.includes(this.props.unidad_negocio) ?

                    <section>
                        <label htmlFor="termsconditions2" className="check-box"
                            onClick={(e) => {
                                this.openCloseTerms(e);
                            }}>
                            <span style={{ display: "unset", cursor: "pointer" }} className="txt-light">
                                {localStorage.langInt == 1 ? "Terms & Conditions" : "Términos y Condiciones"}  &nbsp;
                                <span ref={input => { this[`terms`] = input; }} style={{ position: "absolute", transition: ".5s" }}>
                                    <Iconwedd icon={"chevron-down"} color="pink" ></Iconwedd>
                                </span>
                            </span>
                        </label>
                        <section ref={input => { this[`terms_text`] = input; }} style={{ overflow: "hidden", height: "0px", textAlign: "justify", padding: "0px 10px", fontFamily: "Avenir", transition: ".5s", fontSize: "16px" }}>
                            <section>
                                {
                                    this.state != null ? this.state.terms_text : terms_ini
                                }
                            </section>
                        </section>
                        <br /><br />
                    </section>

                    :  "" }
                    
                </div>
                {/*------------------------------------------aplica para party rime, Dance floor-----------------------------------------------------*/}
            </div>
        );
    }
}

ViewDetailSpecialPlg.defaultProps = {
    data: {},
    onBack: () => { },
    onAdd: () => { },
    onClick: () => { },
    onSelected: false,
    onAddCart: () => { },
    onCart: false,
};

export default ViewDetailSpecialPlg; 
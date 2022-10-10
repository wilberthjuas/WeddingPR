import React, { Component } from 'react';
import { Titlesection } from "../../components/wirefragment";
import { Iconwedd } from '../../components/wirefragment';
import { Input } from "../../components/wirefragment";
import ReactHtmlParser from 'react-html-parser';
import { Sliders, Button } from '../../components';

class ViewDetail extends Component {

    constructor(props) {
        super();
        this.state = { loaded: false, value: [] };
    }



    componentDidUpdate() {

        if (this.props.data.title != null) {

            if (window.innerWidth < 1025) {
                try {
                    document.querySelectorAll(".FormNewsletter")[2].style.display = "none"
                    document.querySelector(".commonlinks").style.display = "none"
                    if (document.querySelector(".slider")) {
                        if (document.querySelector(".slider").parentNode.nodeName != "UL") {
                            document.querySelector(".slider").style.display = "none"
                        }
                    }

                    document.querySelector(".titlesection").style.display = "none"
                    document.querySelector(".GradientBar").style.display = "none"

                    document.querySelector(".tabcategoriescake").style.display = "none"
                    document.querySelector(".push").style.display = "none"
                    document.querySelector(".selectresorts").style.display = "none"
                    document.querySelector(".show").style.display = "none"
                    document.querySelector(".covercatalog").style.display = "none"
                } catch (ex) {
                    console.log(ex)
                }
                let height1 = document.querySelector(".mask").clientHeight;
                let height2 = document.querySelector(".floatingMenu").clientHeight;
                let height3 = height1 + height2;

                //console.log("data lenbgt: ",this.props.data.include.length)


                if (this.props.unidad_negocio != 4 && this.props.unidad_negocio != 6) {
                    if (this.props.data.include.length < 50) {
                        let height4 = document.querySelector(".up-banner").clientHeight;
                        document.querySelector(".cakeDetail").style.height = (innerHeight - height3) + "px";
                        let height5 = height4 + height3;
                        document.querySelector("._card_detail").style.height = (innerHeight - height5) + "px";
                    }
                }
            }
            document.querySelectorAll(".FormNewsletter")[2].style.display = "none"
            document.querySelector(".commonlinks").style.display = "none"

        } else {
            try {
                document.querySelectorAll(".FormNewsletter")[2].style.display = ""
                document.querySelector(".commonlinks").style.display = ""
                if (document.querySelector(".slider")) {
                    document.querySelector(".slider").style.display = ""
                }

                document.querySelector(".titlesection").style.display = ""
                document.querySelector(".GradientBar").style.display = ""

                document.querySelector(".tabcategoriescake").style.display = ""
                document.querySelector(".push").style.display = ""
                document.querySelector(".selectresorts").style.display = ""
                document.querySelector(".show").style.display = ""
                document.querySelector(".covercatalog").style.display = ""
                document.querySelector(".paginator") != null ? document.querySelector(".paginator").style.display = "" : null
                document.querySelector("#replace-size") != null ? document.querySelector("#replace-size").style.display = "" : null
            } catch (ex) {
                console.log(ex)
            }
        }
    }

    componentWillUnmount() {
        document.querySelectorAll(".FormNewsletter")[2].style.display = ""
        document.querySelector(".commonlinks").style.display = ""
        document.querySelector(".slider").style.display = ""
        document.querySelector(".titlesection").style.display = ""
        document.querySelector(".GradientBar").style.display = ""
        try {
            document.querySelector(".tabcategoriescake").style.display = ""
            document.querySelector(".push").style.display = ""
            document.querySelector(".selectresorts").style.display = ""
            document.querySelector(".covercatalog").style.display = ""
            document.querySelector(".show").style.display = ""
        } catch (ex) {
            console.log(ex)
        }
        document.querySelector(".paginator") != null ? document.querySelector(".paginator").style.display = "" : null
    }

    componentWillReceiveProps() {
        this.setState({
            loaded: false
        })
    }
    titleValidacion(data, includ) {
        try {
            if (!includ) {
                //toLowerCase por que quantum todos los titulos vienen en mayusculas
                return ((localStorage.langInt == 1 ?
                    data.descripcion.toLowerCase() :
                    data.descripcionespanol != "" ?
                        data.descripcionespanol.toLowerCase().replace(" xv ", " XV ").replace("dj", "DJ").replace("mc", "MC").replace("hdmi", "HDMI") : data.descripcion.toLowerCase()) + "").replace(" xv ", " XV ").replace("dj", "DJ").replace("mc", "MC").replace("hdmi", "HDMI")
            } else {
                let includEs = data.include[1]
                let includEn = data.include[0]
                if (includEs) {
                    includEs = includEs.texto
                }
                if (includEn) {
                    includEn = includEn.texto
                }

                if (this.props.unidad_negocio == "12") {
                    return (((localStorage.langInt == 1 ?
                        includEn :
                        includEs != "" ?
                            includEs : includEn) + ""))
                } else {
                    return (((localStorage.langInt == 1 ?
                        includEn() :
                        includEs != "" ?
                            includEs.toLowerCase().replace(" xv ", " XV ").replace("dj", "DJ").replace("mc", "MC").replace("hdmi", "HDMI") : includEn.toLowerCase()) + "").replace(" xv ", " XV ").replace("dj", "DJ").replace("mc", "MC").replace("hdmi", "HDMI"))

                }


            }
        }
        catch (ex) {
            return ""
        }
    }
    openCloseTerms(e) {
        e.preventDefault();
        this.terms.style = "transform: rotate(" + (this.terminos == 0 ? "180" : "0") + "deg);position: absolute;transition: .5s;";
        this.terminos = this.terminos == 0 ? 1 : 0
        this.terms_text.style = "text-align: justify; padding: 0px 10px;font-family: Avenir;transition: .5s;font-size: 16px;overflow: hidden;height:" + (this.terminos == 0 ? this.terms_text.children[0].offsetHeight + "px" : "0px")
    }
    addSubService(e) {
        try {
            if (localStorage.subService == null) {
                localStorage.subService = `{"id_service":` + this.props.data.id + `,"value":["` + e.idservice_servicio + `"]}`
            } else {
                let subServ = JSON.parse("[" + localStorage.subService.replace("undefined", "") + "]")
                let FilsubServ = subServ.filter((e) => { return e.id_service == this.props.data.id })
                let exist = false
                if (FilsubServ.length > 0) {
                    FilsubServ[0].value.forEach((elmnt, i) => {
                        if (elmnt == e.idservice_servicio) {
                            exist = true
                        }
                    })
                    if (exist) {
                        FilsubServ = FilsubServ[0].value.filter((elmn) => {
                            return elmn != e.idservice_servicio
                        })
                        let deletFilsubService = subServ.filter((e) => { return e.id_service != this.props.data.id })

                        let Text = deletFilsubService.length > 0 ? JSON.stringify(deletFilsubService).replace("}]", "}").replace("[{", "{") + "," : ""
                        let pushFilsubServ = Text + `{"id_service":` + this.props.data.id + `,"value":` + (JSON.stringify(FilsubServ)) + `}`
                        setTimeout(() => {
                            localStorage.subService = pushFilsubServ
                        })
                    } else {
                        FilsubServ[0].value.push(e.idservice_servicio)
                        let deletFilsubService = subServ.filter((e) => { return e.id_service != this.props.data.id })
                        let Text = deletFilsubService.length > 0 ? JSON.stringify(deletFilsubService).replace("}]", "}").replace("[{", "{") + "," : ""
                        let pushFilsubServ = Text + `{"id_service":` + this.props.data.id + `,"value":` + (JSON.stringify(FilsubServ[0].value)) + `}`
                        localStorage.subService = pushFilsubServ
                    }
                }
                if (FilsubServ.length == 0) {
                    localStorage.subService += `,{"id_service":` + this.props.data.id + `,"value":["` + e.idservice_servicio + `"]}`
                }
            }
        } catch (ex) { console.log(ex) }
    }
    ischecked(id_) {
        //if (this.state.id) {
        if (localStorage.subService) {
            let data = JSON.parse("[" + localStorage.subService + "]")
            let value = data.filter((e) => {
                return e.id_service == this.props.data.id
            })[0]
            if (!this.props.data.id) {
                try {
                    if (this[this.props.data.id]) {
                        let reset = document.querySelectorAll("#ulReset input")
                        for (let index = 0; index < reset.length; index++) {
                            let element = reset[index];
                            element.checked = false
                            element.className = ""
                        }
                    }
                } catch (ex) { console.log(ex) }
            }

            try {
                let input = this[this.props.data.id].querySelector("[id='" + id_ + "']")
                if (value.value.includes(id_)) {
                    if (input.className == "") {
                        input.checked = true
                        input.classList.add("checked")
                        return true
                    }
                }

            } catch (ex) { }
        }
        else { }
    }
    changeImgThumb(data, index) {
        try {
            this.image_thumb.querySelector("img").src = data[index].images[0].path
        } catch (ex) {
            this.image_thumb.querySelector("img").src = this.props.data.src
            console.log(ex)
        }
    }


    html_list(element, index) {
        return (
            <li key={index} style={{ listStyle: "none" }}>
                {
                    element.descripcion != null ?
                        <div className="_description_detail">
                            <section style={{ width: "max-content", margin: "auto", maxWidth: "100%", display: "flex" }} >
                                {this.props.thisIsLogin ?
                                    <><Input
                                        checked={false}
                                        type={"checkbox"} styleForm={"square"} name={element.id}
                                        title={""}
                                        id={element.idservice_servicio}
                                        click={() => { this.addSubService(element) }}
                                    />
                                        <p style={{ margin: "0px 0px 0px 10px", cursor: "pointer" }} onClick={() => { if (innerWidth < 1025) { this.changeImgThumb(this.props.dataFilter, index) } }}
                                            onMouseOver={() => { if (innerWidth > 1024) { this.changeImgThumb(this.props.dataFilter, index) } }}
                                        >
                                            {this.titleValidacion(element, true)}
                                        </p>
                                        {ReactHtmlParser(
                                            this.props.lang_site == "en" ? element.include[0].texto+"<p>"+element.precio+"</p>" : element.include[1].texto+"<p>"+element.precio+"</p>"
                                        )}
                                    </>
                                    :
                                    <p style={{ margin: "0px 0px 0px 10px", cursor: "pointer" }}
                                        onClick={() => { if (innerWidth < 1025) { this.changeImgThumb(this.props.dataFilter, index) } }}
                                        onMouseOver={() => { if (innerWidth > 1024) { this.changeImgThumb(this.props.dataFilter, index) } }}
                                    >
                                        {ReactHtmlParser(this.props.lang_site == "en" ? element.include[0].texto : element.include[1].texto)/*Donut Wall */}
                                        {ReactHtmlParser(sessionStorage.logged_in=="true"?this.props.dataFilter.length?"<p> USD $"+element.price.precio+"</p>":"<p> USD $"+element.precio+"<p>":null)}
                                    </p>
                                    
                                }
                                
                            </section>
                        </div> : null
                }
                {/*</div>*/}
            </li>
        )
    }

    list_slider(data) {
        
        let li = []
        let list_block = []
        let flags = 0

        data.forEach((element, index) => {
            
            if (flags < 9) {
                li.push(this.html_list(element, index))
            }

            if (flags == 8 || (data.length - 1) == index) {
                list_block.push(<div key={index}>{li}</div>)
                li = []
                flags = 0
            }else {
                flags++
            }
        });


        return (<Sliders nameSlide={"list_title"}>{list_block}</Sliders>)
    }

    render() {
        let terms_negocios = ["4", "6"]
        let data = this.props.dataFilter

        //try { data.forEach(element => { data.push(element) }); } catch (ex) { console.log(ex) }

        if (this.props.data.id) {
            if (!this.state.id) {
                this.setState({ id: this.props.data.id })
            }
        }
        return (
            <div component="cakeDetail" className="cakeDetail">
                <div component="grid-x" className="up-banner" >
                    <div component="cell" small="2" medium="2" large="2" style={{ display: "flex", alignItems: "center", justifyContent: "center", border: "solid 1px #FEDFD9", borderRight: "none" }}>
                        <a onClick={this.props.onBack} onClickCapture={(e) => {
                            localStorage.isBackTabs = true
                            this.terminos = 1
                            this.openCloseTerms(e)
                            this.setState({ id: null })
                        }} style={{ cursor: "pointer" }}>
                            <Iconwedd icon={"chevron-carousel-left"} color={"pink"} />
                        </a>
                    </div>
                    {sessionStorage.logged_in=="true"?null:<div component="cell" small="10" medium="10" large="10" className={"grid-flex-20-20-f2f2f2"}  >
                        <Input key="WISHING_LIST" type={"button"} value={localStorage.langInt == 1 ? `${this.props.onSelected ? "  REMOVE" : "  ADD"} TO WISH LIST` : `${this.props.onSelected ? "  QUITAR DE" : "  AGREGAR A"} LA LISTA DE DESEOS`} widthIcon={"heart-full"} handleClick={this.props.onAdd} />
                    </div>}
                </div>
                <div component="grid-x" className={"border-20-20-f2f2f2 bor-top"} style={innerWidth < 1025 ? { overflow: "auto" } : {}}>
                    <div component="cell" small="6" medium="6" large="6">
                        <div className="_media_detail">
                            {
                                this.props.data.hasOwnProperty('logo') ?
                                    <div className="_card_detail" ref={input => { this[`image_thumb`] = input; }}>

                                        {this.state.loaded ? null :
                                            <img
                                                src={this.props.data.src}
                                                alt={this.props.data.title.toLowerCase().charAt(0).toUpperCase() + this.props.data.title.toLowerCase().slice(1)}
                                            />
                                        }
                                        <img
                                            style={this.state.loaded ? {} : { display: 'none' }}
                                            src={this.props.data.logo}
                                            alt={this.props.data.title.toLowerCase().charAt(0).toUpperCase() + this.props.data.title.toLowerCase().slice(1)}
                                            onLoad={() => this.setState({ loaded: true })}
                                        />

                                    </div>
                                    : null
                            }

                        </div>
                    </div>
                    <div component="cell" small="6" medium="6" large="6" className="content-detail-cont" style={{ display: data.length == 0 ? "" : "block" }}>
                        {data.length == 0 ?
                            <div className="_content_detail">
                                {(this.props.data.img_extra + "").replace(" ", "") != "" ? <div className="_logo_detail"><img src={this.props.data.img_extra} alt={this.props.data.title} /></div> : null}
                                {this.props.unidad_negocio == "12" || this.props.data.unidad_negocio == "12" ? <h2 className="subtitle">{this.props.data.codigo_produccion}</h2> : null}
                                <Titlesection subtitle={this.props.data.hasOwnProperty('title') ? this.titleValidacion(this.props.data) : ""}
                                    description={this.props.data.hasOwnProperty('description') ? this.titleValidacion(this.props.data) : ""}
                                />
                                <div>
                                    <hr className="divider"></hr>
                                </div>
                                {
                                    this.props.data.hasOwnProperty('include') ?
                                        <div className="_description_detail">
                                            <p>{ReactHtmlParser(sessionStorage.logged_in=="true"?"<p> USD $"+this.props.data.precio+"</p>":null)}</p>
                                            {   sessionStorage.logged_in=="true" ?
                                                    <div component="cell" small="12" medium="12" large="12" style={{ padding: "10px"}}>
                                                        <center>
                                                            <Input key="ADD_TO_CART" type={"button"} value={localStorage.langInt == 1 ? `${this.props.onCart ? "  PAY NOW" : "  ADD TO CART"}` : `${this.props.onCart ? "  PAGAR" : "  AGREGAR A CARRITO DE COMPRAS"}`} handleClick={this.props.onAddCart} />
                                                        </center>
                                                    </div>
                                                    : null
                                                }
                                            <p> {ReactHtmlParser(this.props.data.include)} </p>
                                        </div> : null
                                }



                            </div>
                            :
                            <>
                                <br />
                                <Titlesection subtitle={this.titleValidacion(this.props.data)} />
                                <div className="_content_detail" ><hr className="divider"></hr></div>
                                <ul ref={input => { this[`${this.props.data.id}`] = input; }} id={"ulReset"}>
                                    {data.length <= 9 ?
                                        data.map((element, index) => {
                                            return (
                                                this.html_list(element, index)
                                            )
                                        })
                                        :
                                        this.list_slider(data)
                                    }

                                </ul>

                            </>
                        }
                    </div>

                    {
                        this.props.unidad_negocio == "4" ?
                            <section style={{ width: "100%" }}>
                                <p className="description quantum" >
                                    {ReactHtmlParser(this.props.lang_site == "en" ? "For further information, please contact us at <a href='mailto:palaceproductions@palaceresorts.com'>palaceproductions@palaceresorts.com</a>" : "Para mayor información, por favor contáctanos: <a href='mailto:palaceproductions@palaceresorts.com'>palaceproductions@palaceresorts.com</a>")}
                                </p>
                            </section> : ""
                    }

                    <section>
                        {
                            terms_negocios.includes(this.props.unidad_negocio) ?

                                this.props.data.terms_conditions != null ?
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
                                        <section ref={input => { this[`terms_text`] = input; }} style={{ overflow: "hidden", height: "0px" }}>
                                            <section>
                                                {
                                                    this.props.lang_site == "en" ? this.props.data.terms_conditions[0].texto : this.props.data.terms_conditions[1] ? this.props.data.terms_conditions[1].texto : ""
                                                }
                                            </section>
                                        </section>
                                        <br /><br />

                                    </section>


                                    : ""
                                : ""
                        }
                    </section>
                </div>
            </div>
        );
    }
}

ViewDetail.defaultProps = {
    data: {},
    onBack: () => { },
    onAdd: () => { },
    onAddCart: () => { },
    onClick: () => { },
    onSelected: false,
    onCart: false,

};

export default ViewDetail;
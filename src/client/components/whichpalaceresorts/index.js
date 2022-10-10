import React, { Component } from 'react';
import Whichpalaceresortsgalery from '../whichpalaceresortsgalery';
import { Link } from "react-router-dom";
import { Titlesection, Input, Iconwedd } from '../../components/wirefragment';
import Barprogress from '../barprogress';
import api from '../../app';
import ReactDOMServer from 'react-dom/server';
import HtmlParser from 'react-html-parser';
class Whichpalaceresorts extends Component {
    constructor() {
        super();
        this.moveForm = this.moveForm.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.resultQuiz = this.resultQuiz.bind(this);
        this.form = React.createRef();
        this.refForm = React.createRef();
        this.sendHubspot = this.sendHubspot.bind(this)
    }

    state = {
        numForm: 0,
        nameUser: "",
        emailUser: "",
        hzselected: [],
        allresult: [],
        hzresultunique: [],
    }

    resultQuiz(values, posicion, numForm) {
        if (posicion == null && this.state.hzselected[-(numForm)] != null) {
            let index = numForm > 0 ? -(numForm) : numForm
            let arrayselectedhz = this.state.hzselected

            this.setState(prevState => {
                return {
                    hzselected: index != 0 ? arrayselectedhz.slice(index) : [],
                }
            })
        }
        if (values != null && posicion != null) {
            let valuequiz = this.state.hzselected
            valuequiz.push(values)

            setTimeout(() => {
                this.setState(prevState => {
                    return {
                        hzselected: valuequiz,
                    }
                })

                let hoteles = ["islamujeres", "playacar", "cozumel", "sun", "beach", "lbcancun", "lbcabos", "mooncancun", "nizuk", "thegrand", "jamaica"]
                let cadena = this.state.hzselected.toString().replace(",", " ").split(" ").toLocaleString().split(",")
                let dataresult = []
                for (let a = 0; a < hoteles.length; a++) {
                    let count = 0
                    for (let i = 0; i < cadena.length; i++) {
                        if (hoteles[a].toLowerCase() === cadena[i]) {
                            count = count + 1
                        }
                    }
                    dataresult.push(count + " " + hoteles[a])
                }
                this.setState(prevState => {
                    return {
                        allresult: dataresult,
                    }
                })
                this.setState(prevState => {
                    return {
                        hzresultunique: this.state.allresult.sort()[this.state.allresult.length - 1].split(" ")[1],
                    }
                })
            })
        }
    }

    moveForm(porcen, values, posicion) {
        let porcenPstv = porcen < 0 ? -(porcen) : porcen
        let formItem = this.form.current.children
        if (porcenPstv >= formItem.length + 1) {
            return false;
        }
        this.setState(prevState => {
            return {
                numForm: porcenPstv,
            }
        })
        if (porcenPstv >= formItem.length - 1) {
            return false;
        }
        let input = this.form.current.querySelectorAll(".content-quiz > section")[porcenPstv].querySelector("input[type=text]")
        let email = this.form.current.querySelectorAll(".content-quiz > section")[porcenPstv].querySelector("input[type=email]")
        setTimeout(() => {
            input != null ? input.focus() : "";
            email != null ? email.focus() : "";
        }
            , 1500)
        for (let i = 0; i < formItem.length; i++) {
            formItem[i].style = "left:" + porcen + "00%"
        }
        if (porcenPstv < 7) {
            this.props.refPr.current.querySelectorAll("img")[0].src = this.props.sliders[porcenPstv].imageDesk
            this.props.refPr.current.querySelectorAll("img")[1].src = this.props.sliders[porcenPstv].imageMov
        } else {
            if (porcenPstv > 6 && porcenPstv < 9) {
                this.form.current.classList.add('open')
                this.props.refPr.current.children[0].children[0].classList.add('close-slide')
            } else {
                this.props.refPr.current.querySelectorAll("img")[0].src = this.props.sliders[0].imageDesk
                this.props.refPr.current.querySelectorAll("img")[1].src = this.props.sliders[0].imageMov
                this.form.current.classList.remove('open')
                this.props.refPr.current.children[0].children[0].classList.remove('close-slide')
            }
        }
        this.resultQuiz(values, posicion, porcen)
    }

    onSubmit(event) {
        this.moveForm(-(this.state.numForm + 1))
        let userName = event.target.elements.firstName.value + " " + event.target.elements.lastname.value;
        let maiUser = event.target.elements.email.value;
        this.setState(prevState => {
            return {
                nameUser: " " + userName,
                emailUser: " " + maiUser,
            }
        })
        if (this.form.current.children[this.form.current.children.length - 1]) {
            if (this.state.numForm > this.props.quiz.length) {

                this.sendHubspot()

                api.loginEmail()
                    .then(res => {
                        this.sendMail(res.data)
                    }).catch(e => console.error(e));
            } else {
                this.form.current.children[this.form.current.children.length - 1].classList.remove("result-close")
            }
        }

        event.preventDefault();
    }

    componentDidMount() {
        this.resultQuiz()
        this.moveForm(0)
        /*window.onbeforeunload = function () {
            return "Dude, are you sure you want to refresh? Think of the kittens!";
        }*/
    }

    async sendCRM() {
        var fecha = new Date
        const dataCRM =
        {
            "estado": 1,
            "fecha_creacion": fecha.getDate() + "-" + (fecha.getMonth() + 1) >= 10 ? (fecha.getMonth() + 1) : "0" + (fecha.getMonth() + 1) + "-" + fecha.getFullYear(),
            "usuario_creacion": "wedding_interface",
            "idlead_interface_venta": 2,
            "descripcion": "Palace Weddings",
            "idlead_contacto": 0,
            "informacion_interface": {
                "nombre_contacto": this.state.nameUser,
                "apellido_contacto": this.state.nameUser,
                "correo": this.state.emailUser,
                "pais": "na",
                "estado" : "na",
                "telefono": "na",
                "formulario": "quiz_resort",
                "lead_general": true,
                "destination_get_married" : this.state.hzresultunique,
            }
        }
        api.sendDataCRM(dataCRM)
        .then(res => {
        }).catch(e => console.error(e));
    }

    async sendHubspot() {
        var text = ""
        try {
            var response = await fetch('https://api.ipify.org');
            text = await response.text();
        }
        catch { console.log("") }
    
        
        id_form = "1ef310f0-a504-475c-9569-b7ce3023ad26";
        
        var querystring = require('querystring');
        var postData = querystring.stringify({
            'firstname': this.state.nameUser,
            'lastname': this.state.nameUser,
            'email': this.state.emailUser,
            'utm_campaign':'direct',
            'utm_medium':'direct',
            'source':'direct',
            'utm_content':'direct',
            'utm_term':'direct',
            'hs_context': JSON.stringify({
                "ipAddress": text,
                "pageUrl": "https://weddings.palaceresorts.com",
                "pageName": "Weddings Palace Resorts - Quiz Resort"
            })
        });
        api.sendHubspot(postData,id_form);
    }


    sendMail(res) {
        const email = "wilsanchez@palaceresorts.com,edgperez@palaceresorts.com"
        var object = {}
        let formData = new FormData(this.refForm.current);
        formData.forEach((value, key) => { object[key] = value });
        let htmlbody = ReactDOMServer.renderToStaticMarkup(this.htmlDisplay(object))
        let emailData = {
            TO_ADDRESSES: email,
            CC_ADDRESSES: "",
            TEXTBODY: "Resort Quiz - Weddings Palace Resorts",
            HASH: "Resort Quiz - Weddings Palace Resorts",
            SUBJECT: "Resort Quiz - Weddings Palace Resorts",
            HTMLBODY: htmlbody,
            token: res.token
        }

        this.sendCRM()
        api.sendEmail(emailData)
            .then(
                this.form.current.children[this.form.current.children.length - 1].classList.remove("result-close")
            ).catch(e => console.error(e));
    }

    htmlDisplay(object) {
        var fecha = new Date
        return (
            <div>
                <h1 style={
                    {
                        color: "#000000",
                        fontSize: "48px",
                        fontFamily: "Tangerine",
                        fontWeight: "normal",
                        "marginBottom": "4px"
                    }
                }>Resort</h1>
                <h2 style={
                    {
                        color: "#f86290",
                        fontSize: "60px",
                        fontFamily: "Miso",
                        fontWeight: "300",
                        fontStretch: "normal",
                        fontStyle: "normal",
                        lineHeight: "1",
                        letterSpacing: "normal",
                        textTransform: "uppercase",
                        margin: "0px",
                        marginBottom: "20px"
                    }
                }>Quiz</h2>

                <h2>Name:</h2> <p>{this.state.nameUser}</p>
                <h2>Email:</h2> <p>{this.state.emailUser}</p>
                <h2>Resort Result Quiz:</h2> <p>{this.state.hzresultunique}</p>
                <h2>Submited on:</h2>
                <p>{fecha.getDate()}/{(fecha.getMonth() + 1) >= 10 ? (fecha.getMonth() + 1) : "0" + (fecha.getMonth() + 1)}/{fecha.getFullYear()}</p>
            </div>
        )
    }

    render() {
        const head = this.props.state.map((element, index) => {
            return (
                <div className="titleWemake" key={index} style={this.state.numForm > 0 ? { display: "none" } : { display: "block" }}>
                    <Titlesection title={element.title} key={index} subtitle={element.title2} description={element.description}
                        urlBtnBack={[element.urlBtn, element.buttonTxt]}
                    ></Titlesection>
                </div>
            )
        });

        const quizall = this.props.quiz.map((element, index) => {
            return (
                <section key={index} className="">
                    <div className="separator-ttl-sbttl2"></div>
                    <div className="titleGeneral container"><div className="circle"><b>{index + 1}</b></div><p className="description">{element.titleGeneral}</p></div>
                    <div className="separator-ttl-sbttl3"></div>
                    <Whichpalaceresortsgalery click={this.moveForm} move={index + 1} galery={element.galery} id={index} />
                    <div className="galeryContent container">
                        {element.buttonback != null ?
                            <div onClick={this.moveForm.bind(this, -(index) + 1)} className="footer-next"><Input type={"button"} value={element.buttonback} color={"white"} /></div>
                            : ""}
                    </div>
                </section>
            )
        });
        return (
            <section component="Whichpalaceresorts">
                {head}
                <div style={(this.state.numForm >= 1 && (this.state.numForm <= 6)) ? { display: "block" } : { display: "none" }}>
                    <Barprogress size={7} progress={this.state.numForm} />
                </div>
                <form ref={this.refForm} method="GET" onSubmit={this.onSubmit.bind()}>
                    <section className="content-quiz" ref={this.form}>
                        <img src={"https://e-commercepr.s3.amazonaws.com/assets/images/takethenextstep/desktop/bg-telon-left.jpg"} className="curtain curtain-left" />
                        <img src={"https://e-commercepr.s3.amazonaws.com/assets/images/takethenextstep/desktop/bg-telon-right.jpg"} className="curtain curtain-right" />
                        {quizall}
                        <section className="quiz-form-1">
                            <div className="icon-qz1"><Iconwedd icon={"palace-crown"} color={"pink"} /></div>
                            <header >
                                <section className="palace-header">
                                    <h1 className="title">{HtmlParser(this.props.formQuiz[0].title)}{this.props.formQuiz[0].subtitle}</h1>
                                </section>
                                <h2 className="subtitle">{HtmlParser(this.props.formQuiz[0].description)}</h2>
                            </header>
                            <div className="input-content-qz1">
                                <Input type="text" name="firstName" id="firstName" input required={this.state.numForm == 7 ? true : false} placeholder={this.props.formQuiz[0].input[0].placeholder} />
                                <Input type="text" name="lastname" required={this.state.numForm == 7 ? true : false} placeholder={this.props.formQuiz[0].input[1].placeholder} />
                            </div>
                            <Input className="" value={this.props.formQuiz[0].txtbutton} type="submit" />
                        </section>
                        <section className="quiz-form-1">
                            <div className="icon-qz1"><Iconwedd icon={"palace-crown"} color={"pink"} /></div>
                            <header >
                                <section className="palace-header">
                                    <h1 className="title">{this.props.formQuiz[1].title}<br /><span>{this.state.nameUser}</span></h1>
                                </section>
                                <p className="description-qz2 description">{HtmlParser(this.props.formQuiz[1].description)}</p>
                            </header>
                            <div className="input-content-qz1">
                                <Input type="email" name="email" id="email" required={this.state.numForm == 7 ? false : true} placeholder={this.props.formQuiz[1].input[0].placeholder} />
                            </div>
                            <Input className="" value={this.props.formQuiz[1].txtbutton} type="submit" />
                        </section>
                        <section className="result-close">
                            <span className="result-header">
                                <Titlesection title={this.props.resultQuiz.title + " " + this.props.resultQuiz.subtitle} />
                            </span>
                            <span className="quiz-resutl txt-light" style={{ textTransform: "capitalize" }}>
                                <Titlesection subtitle={this.state.nameUser} description={this.props.resultQuiz.description} />
                            </span>
                            <section className="img-result-quiz">
                                <img src={this.props.resultQuiz.result[this.state.hzresultunique.length > 0 ? this.state.hzresultunique : "lbcancun"].imgdesktop} className="desktop" />
                                <img src={this.props.resultQuiz.result[this.state.hzresultunique.length > 0 ? this.state.hzresultunique : "lbcancun"].imgMovil} className="movil" />
                                <div style={{ width: "max-content", margin: "auto", maxWidth: "100%" }}><Titlesection subtitle={this.props.resultQuiz.result[this.state.hzresultunique.length > 0 ? this.state.hzresultunique : "lbcancun"].titleImg} /></div>
                            </section>
                            <article className="description-result">
                                <p className="description">
                                    {this.props.resultQuiz.result[this.state.hzresultunique.length > 0 ? this.state.hzresultunique : "lbcancun"].descriptionImg}
                                </p>
                                <span>
                                    <section component="inputwedd">
                                        <a href={this.props.resultQuiz.result[this.state.hzresultunique.length > 0 ? this.state.hzresultunique : "lbcancun"].url} className="btn white">{this.props.resultQuiz.txtbuttonOne}</a>
                                    </section>
                                    <section component="inputwedd">
                                        <a href={this.props.lang == "en" ? "/en/take-next-step" : "/es/da-el-siguiente-paso"} className="btn pink">{this.props.resultQuiz.txtbuttonTwo}</a>
                                    </section>
                                </span>
                            </article>
                        </section>
                    </section>
                </form>
            </section>
        )
    }
}
export default Whichpalaceresorts;
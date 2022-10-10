/*
Ya envia CRM, Correo, Hubspot
*/

import React, { Component } from 'react';
import { Titlesection, Input, Iconwedd } from '../../components/wirefragment';
import Tabstwo from '../tabstwo';
import Sliders from '../sliders';
import { Otherguest } from '../../components';
import ReactHtmlParser from 'react-html-parser';
import api from '../../app/index';
import ReactDOMServer from 'react-dom/server';
import WithContext from "../../app/Context";
import { withRouter } from 'react-router-dom';

class Contactus extends Component {
    constructor(props) {
        super();
        this.deslizeform = this.deslizeform.bind(this);
        this.loadcountry = this.loadcountry.bind(this);
        this.showcontact = this.showcontact.bind(this);
        this.contactWith = this.contactWith.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.chooseCountry = this.chooseCountry.bind(this)
        this.changeTest = this.changeTest.bind(this);
        this.formslize = React.createRef()
        this.contacts = React.createRef()
        this.selectCountry = React.createRef();
        this.titlePage = React.createRef();
        this.refForm = React.createRef();
        this.refFormSpe = React.createRef();
        this.selectState = React.createRef();
        this.changeHandler = this.changeHandler.bind();
        this.changeHandlerPhone = this.changeHandlerPhone.bind();
        this.sendHubspot = this.sendHubspot.bind(this)

        let lang = location.pathname.slice(1).split("/")[0]

        let urls = lang == "en" ? ["contact-us", "find-a-prospecialist"] : ["contacto", "encontrar-a-un-especialista"]

        let urlValue = location.pathname.split("/")[3] ? (props.location.pathname.split("/")[3].split('-').join('') + "").toLocaleLowerCase() : "-"

        let tabClick =
            urlValue == urls[0].split("-").join("") ? 0 :
                urlValue == urls[1].split("-").join("") ? 1 : 0
        this.state = {
            country: null,
            agency: null,
            contact: null,
            agentMail: "",
            phone: "",
            countries: [],
            states: [],
            dataDestination: [],
            contacts: props.formsContent.contact,
            contactsShow: props.formsContent.contact,
            showAlert: "none",
            confirmMsg: "none",
            showForm: "",
            contact_module: tabClick,
            urls: urls,
            urlreplace: location.pathname.split("/")[3],
            urlIni: location.href,
            lng: lang
        }

        this.onHandleTelephoneChange = this.onHandleTelephoneChange.bind(this);

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

    deslizeform(index, name, agency, email) {

        if (this.state.urls[index]) {
            let urlNavegator = location.href.split("/")
            if (index > 0) {
                urlNavegator[urlNavegator.length - 1] = urlNavegator[urlNavegator.length - 1] + "/" + this.state.urls[index]
            } else {
                urlNavegator = location.origin + "/" + this.state.lng + "/" + this.state.urls[index]
                urlNavegator = urlNavegator.split("/")
            }

            urlNavegator = urlNavegator.join("/").split("/")
            let removRepeat = urlNavegator
            urlNavegator = [...new Set(removRepeat)]

            urlNavegator = urlNavegator.join("/")
            history.pushState(null, "", urlNavegator);
        }

        let itemform = this.formslize.current.children
        if (itemform[index]) {
            let inputFocus = itemform[index].querySelector("input[type=text]")
            if (inputFocus != null) {
                setTimeout(() => { inputFocus.focus() }, 800)
            }
        }
        for (let i = 0; i < itemform.length; i++) {
            itemform[i].style = "left:-" + index + "00%;" + (index != i ? "height:0px" : "")
        }
        if (index == 2) {
            this.setState(prevState => {
                return {
                    agency: agency,
                    contact: name,
                    agentMail: email
                }
            }
            )
            this.titlePage.current.scrollIntoView()
        }
    }

    showcontact(e) {
        if (e != null) {
            e.preventDefault()
        }
        let country = this.selectCountry.current.select.current.querySelectorAll("select")[0].value
        let state = this.selectState.current.select.current.querySelectorAll("select")[0].value
        let contacts = this.state.contacts
        let contactsShow = contacts.filter((element) => {
            return element.country == country && element.state == state
        })
        this.setState({
            contactsShow: contactsShow
        })
        if (contactsShow.length > 0) {

            this.timer = setTimeout(() => this.toElement(), 100);

            this.contacts.current.classList.add("open")
            this.contacts.current.children[0].style = "max-height: 0;height: 100%;"
            this.contacts.current.children[1].style = "max-height: max-content;height: 100%;"
            this.contacts.current.children[2].style = "max-height: max-content;height: 100%;"
        } else {
            this.contacts.current.classList.add("open")
            this.contacts.current.children[0].style = "max-height: 100%;height: 100%;"
            this.contacts.current.children[1].style = "max-height: max-content;height: 100%;"
            this.contacts.current.children[2].style = "max-height: max-content;height: 100%;"
            this.timer = setTimeout(() => this.toElement(), 100);
        }
    }

    loadcountry() {
        let country = []
        this.props.selectcountry.country.forEach(element => {
            country.push([element.country[0], element.country[1]])
        });
        return country;
    }

    chooseCountry() {
        const lang_ = this.state.lang == "en" ? "2" : "1";
        let code = this.selectCountry.current.select.current.querySelector("select").value;
        let isemptyCode = code != "" ? code : "df"
        let stateByCountry = this.props.selectcountry.state.filter((element) => {
            return element.name == isemptyCode
        })

        this.setState({
            states: stateByCountry[0].data
        })

        if (Array.isArray(stateByCountry) && stateByCountry.length) {
            setTimeout(() => {
                this.selectState.current.select.current.querySelectorAll(".options p")[0].click()
            })
        } else {
            this.selectState.current.select.current.querySelectorAll("select")[0].value = "0"
            this.selectState.current.select.current.querySelectorAll("input")[0].value = "NA";

        }
        /*api.getStatesbyLang(code, lang_)
            .then(res => {
                Object.keys(res.data).forEach(function (key) {
                    statec.push([[res.data[key]], key])
                }
                )
                this.setState({
                    states: statec
                })
            }).catch(e => console.error(e));*/
    }

    contactWith(evnt) {
        evnt.preventDefault();
        api.loginEmail()
            .then(res => {
                this.sendMailSpecialist(res.data, evnt)
            }).catch(e => console.error(e));
        window.scrollTo(0, 0);
    }

    async handleSubmit(e) {
        e.preventDefault();
        var object = {}
        let formData = new FormData(this.refForm.current);
        formData.forEach((value, key) => { object[key] = value });
        if (object["email"] == object["confirmMail"]) {

            this.sendCRM(object)
            this.sendHubspot(object)

            this.setState({
                showForm: "none"
            })
            this.setState({ formOver: true }),
                this.setState({ confirmMsg: "" })

            window.scrollTo(0, 0)

            api.loginEmail()
                .then(res => {
                    this.sendMail(res.data, object)
                }).catch(e => console.error(e));
        } {
            this.setState({
                showAlert: "none"
            })
        }
    }

    async sendHubspot(obj) {
        var text = ""
        try {
            var response = await fetch('https://api.ipify.org');
            text = await response.text();
        }
        catch { console.log("") }

        let id_form = "";
        if (this.state.lang == "es") {
            id_form = "f28211b0-aa6b-408e-9153-5d3007ab46aa";
        } else {
            id_form = "4f7179b7-522e-4bf3-b056-466a7c75cacb";
        }
        var querystring = require('querystring');
        var postData = querystring.stringify({
            'firstname': obj["firstName"],
            'lastname': obj["lastName"],
            'email': obj["email"],
            "country": obj["country"],
            "phone": obj["phone"],
            "destination": obj["destination"],
            "message": obj["message"],
            'hs_context': JSON.stringify({
                "ipAddress": text,
                "pageUrl": "https://weddings.palaceresorts.com",
                "pageName": "Weddings Palace Resorts - Contact US"
            })
        });
        console.log({
            'firstname': obj["firstName"],
            'lastname': obj["lastName"],
            'email': obj["email"],
            "country": obj["country"],
            "phone": obj["phone"],
            "destination": obj["destination"],
            "message": obj["message"],
            'hs_context': {
                "ipAddress": text,
                "pageUrl": "https://weddings.palaceresorts.com",
                "pageName": "Weddings Palace Resorts - Contact US"
            }});
        api.sendHubspot(postData, id_form);
    }

    async sendCRM(object) {
        var fecha = new Date
        let telefono = object.phone;
        telefono = telefono.replace(/-/g, "")
        const dataCRM =
        {
            "estado": 1,
            "fecha_creacion": fecha.getDate() + "-" + (fecha.getMonth() + 1) >= 10 ? (fecha.getMonth() + 1) : "0" + (fecha.getMonth() + 1) + "-" + fecha.getFullYear(),
            "usuario_creacion": "wedding_interface",
            "idlead_interface_venta": 2,
            "descripcion": "Palace Weddings",
            "idlead_contacto": 0,
            "informacion_interface": {
                "nombre_contacto": object.firstName,
                "apellido_contacto": object.lastName,
                "nombre_novia": object.firstName,
                "apellido_novia": object.lastName,
                "correo": object.email,
                "pais": object.country,
                "telefono": telefono,
                "mensaje": object.message,
                "utm_medium_palace": "direct",
                "utm_source_palace": "direct",
                "utm_term_palace": "direct",
                "utm_content_palace": "direct",
                "utm_campaign_palace": "direct",
                "idioma": this.state.lang,
                "formulario": "contact_us",
                "destination_get_married": object.destination,
                "lead_general": true
            }
        }
        api.sendDataCRM(dataCRM)
            .then(res => {
            }).catch(e => console.error(e));
    }

    sendMail(res, object) {
        const email = "wilsanchez@palaceresorts.com,weddingleadcatcher@palaceresorts.com,weddingmgr@palaceresorts.com,dsosa@palaceresorts.com"
        let htmlbody = ReactDOMServer.renderToStaticMarkup(this.htmlDisplay(object))
        let emailData = {
            TO_ADDRESSES: email,
            CC_ADDRESSES: "",
            TEXTBODY: "Contac Us Weddings",
            HASH: "Contac Us Weddings",
            SUBJECT: "Contac Us Weddings",
            HTMLBODY: htmlbody,
            ATTACHMENT: "",
            token: res.token
        }
        api.sendEmail(emailData)
            .then(res => {


            }).catch(e => console.error(e));
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
                }>Contact</h1>
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
                }>Us</h2>
                <p><h2>Submited on:</h2> {fecha.getDate()}/{(fecha.getMonth() + 1) >= 10 ? (fecha.getMonth() + 1) : "0" + (fecha.getMonth() + 1)}/{fecha.getFullYear()}</p>
                <p><h2>First Name:</h2> {object.firstName}</p>
                <p><h2>Last Name:</h2>  {object.lastName}</p>
                <p><h2>Email:</h2>  {object.email}</p>
                <p><h2>Phone:</h2>  {object.phone}</p>
                <p><h2>Country:</h2>  {object.country}</p>
                <p><h2>Destination:</h2>  {object.destination}</p>
                <p><h2>Message:</h2>  {object.message}</p>
                <p><h2>Terms and contidions:</h2> Yes</p>
                <p><h2>Lang:</h2> {this.state.lang} </p>
            </div>
        )
    }
    sendMailSpecialist(res, evnt) {
        var object = {}
        let formData = new FormData(this.refFormSpe.current);
        formData.forEach((value, key) => { object[key] = value });
        const email = this.state.agentMail
        let htmlbody = ReactDOMServer.renderToStaticMarkup(this.htmlDisplaySpecialist(object))
        let emailData = {
            TO_ADDRESSES: email,
            CC_ADDRESSES: "",
            TEXTBODY: "ProSpecialist - Weddings",
            HASH: "ProSpecialist - Weddings",
            SUBJECT: "ProSpecialist - Weddings",
            HTMLBODY: htmlbody,
            ATTACHMENT: "",
            token: res.token
        }
        api.sendEmail(emailData)
            .then(res => {
                this.deslizeform(3)
                evnt.preventDefault();
            }).catch(e => console.error(e));
    }

    htmlDisplaySpecialist(object) {
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
                }>Contact</h1>
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
                }>Us</h2>
                <p><h2>Submited on:</h2> {fecha.getDate()}/{(fecha.getMonth() + 1) >= 10 ? (fecha.getMonth() + 1) : "0" + (fecha.getMonth() + 1)}/{fecha.getFullYear()}</p>
                <p><h2>First Name:</h2> {object.firstName}</p>
                <p><h2>Last Name:</h2>  {object.lastName}</p>
                <p><h2>Email:</h2>  {object.email}</p>
                <p><h2>Phone:</h2>  {object.phone}</p>
                <p><h2>Message:</h2>  {object.message}</p>
                <p><h2>Lang:</h2> {this.state.lang} </p>
            </div>
        )
    }

    getCountries() {
        const { match: { params } } = this.props;
        api.getCountrybyLang(params.lang)
            .then(res => {
                var arrayCountries = []
                Object.keys(res.data).forEach(function (key) {
                    arrayCountries.push([[res.data[key]], key])
                }
                )
                this.setState({
                    countries: arrayCountries
                })
            }).catch(e => console.error(e));
    }

    getProperties() {
        const { match: { params } } = this.props;
        const lang_ = params.lang;

        if (lang_ == "en") {
            api.getProperties()
                .then(res => {
                    var data = Object.keys(res.data.dropdownData).map(function (key) {
                        return [res.data.dropdownData[key], key];
                    });
                    this.setState({ dataDestination: data });
                })
                .catch(e => { console.log(e) });
        } else {
            api.getProperties()
                .then(res => {
                    var data = Object.keys(res.data.dropdownData).map(function (key) {
                        return [res.data.dropdownData[key].replace('Cancun', 'Cancún'), key];
                    });
                    this.setState({ dataDestination: data });
                })
                .catch(e => { console.log(e) });
        }
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        this.setState({ lang: params.lang })
        this.getCountries()
        this.getProperties()
        this.deslizeform(0)
        setTimeout(() => { this.chooseCountry() }, 100)

        this.tab_index.querySelectorAll("li")[this.state.contact_module].click()
        this.deslizeform(this.state.contact_module)
    }

    changeHandlerPhone = e => {
        const re = /^[0-9\b]+$/;
        let oldState = this.state.phone

        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({phone: e.target.value})
        }else{
            e.target.value = oldState
            this.setState({phone: oldState})
        }
    }

    changeHandler = event => {
        const name = event.target.name;
        const value = event.target.value
        let { setData, getData } = this.state.app.currentPage;

        if (name == "confirmMail") {
            setData("confirmMail", value)
            if (value == getData("email")) {
                this.setState({
                    showAlert: "none"
                })
            } else {
                this.setState({
                    showAlert: ""
                })
            }
        }
        else {
            setData(name, value)
            if (value == getData("confirmMail")) {
                this.setState({
                    showAlert: "none"
                })
            } else {
                this.setState({
                    showAlert: ""
                })
            }
        }
    }

    contact() {
        const contact = this.state.contactsShow.map((element, index) => {
            return (
                <section key={index} style={{ maxHeight: "max-content", height: "100%" }}>
                    <h2 style={{ margin: "auto" }} className="subtitle">{element.name}</h2>
                    <p className="description">{element.labelAgency} {element.agency}</p>
                    <center>
                        <h2 className="subtitle" onClick={this.deslizeform.bind(this, 2, element.agency, element.contactName, element.email)} className={"contac subtitle"}>{element.contactName}</h2>
                    </center>
                </section>
            )
        });
        return contact
    }

    changeTest(e) {

        console.log("contect");
    }

    onHandleTelephoneChange = e => {
        let telephone = e.target.value;

        if (!Number(telephone)) {
            return;
        }
        this.setState({
            [e.target.name]: telephone
        });
    };

    toElement() {


        clearTimeout(this.timer);
        let targetElement = document.querySelector(".contact-show2");
        if (targetElement) {
            // Usar scrollIntoView() para ir al contenido.
            if (typeof targetElement.scrollIntoView === 'function') {
                targetElement.scrollIntoView({ block: 'start', behavior: 'smooth' });
            } else {
                console.error(':goTo: scrollIntoView not available for', targetElement);
            }
        } else {
            console.error(':goTo: invalid selector "', selector, '" returned: ', targetElement);
        }
    }

    render() {
        let formone = this.props.formsContent.formone
        let formtwo = this.props.formsContent.formtwo
        let formthree = this.props.formsContent.formThree
        let tabs = this.props.formsContent.tabs
        let thankyou = this.props.formsContent.thankyou
        return (
            <section component="contactus">
                <span className="head-pr" ref={this.titlePage}>
                    <Titlesection title={formone.title} />
                </span>
                <section >
                    <section className="container">
                        <Tabstwo referencia={input => { this[`tab_index`] = input; }}>
                            <a onClick={this.deslizeform.bind(this, 0)}>{tabs[0]}</a>
                            <a onClick={this.deslizeform.bind(this, 1)}>{tabs[1]}</a>
                        </Tabstwo>
                    </section>
                    {/*--------------*/}<section className="boody-tabs" ref={this.formslize}>{/*--------------*/}
                        <section className="body-content">
                            <form ref={this.refForm} className="container" onSubmit={this.handleSubmit} autoComplete="new2" style={{ display: this.state.showForm }}>
                                <div className="inline-input flex">
                                    <div className="group-input">
                                        <div className="name-input">
                                            <Input type={"text"} text={formone.lblFullName} id="firstName" name="firstName" required placeholder={formone.lblFirstName} />
                                            <Input type={"text"} text={"jump"} id="lastName" name="lastName" required placeholder={formone.lblLastName} />
                                        </div>
                                    </div>
                                    <div className="group-input">
                                        <Input data={this.state.countries} type={"select"} id="country" name="country" text={formone.lblCountry} required withSearch placeholder={formone.inputCountry} />
                                    </div>
                                </div>

                                <div className="inline-input">
                                    <div className="group-input">
                                        <Input id="email" name="email" type={"email"} text={formone.lblEmail} required placeholder={formone.inputEmail} changeHandler={this.changeHandler} />
                                        <Input type={"email"} id="confirmMail" text="jump" name="confirmMail" required placeholder={formone.inputEmailRepeat} changeHandler={this.changeHandler} />
                                        <Input text={formone.alertMsg} type={"alertMsg"} display={this.state.showAlert} />
                                    </div>

                                    <div className="group-input number-phone">
                                        <Input type={"tel"} changeHandler={this.changeHandlerPhone} text={formone.lblPhone} id="phone" name="phone"
                                               value={this.state.phone}
                                               required placeholder={"333-333-3333"} />
                                    </div>
                                </div>

                                <div className="inline-input">
                                    <div className="group-input destination-input">
                                        <Input type={"select"} text={formone.lblDestInteres} id="destination" name="destination" required placeholder={formone.inputDestInteres} data={this.state.dataDestination} />
                                    </div>

                                    <div className="group-input text-area">
                                        <Input type={"textarea"} id="message" name="message" text={formone.lblMessage} required placeholder={formone.inputMessage} />
                                    </div>
                                </div>

                                <div className="term-and-conditions conditions">
                                    <Input type={"checkbox"} styleForm={"square"} required name="termsconditions" id="termsconditions" title={formone.termsConditions} />
                                </div>

                                <div className="submit-btn-form">
                                    <div className="submit movil">
                                        <Input type={"submit"} value={formone.btnSubmit} />
                                    </div>
                                    <center className="submit desktop">
                                        <Input type={"submit"} value={formone.btnSubmit} />
                                    </center>
                                </div>

                                <p className="description contact-papace">{formone.footer}</p>
                            </form>

                            <div style={{ display: this.state.confirmMsg }}>
                                <Titlesection title={formone.confirmMsg} />
                            </div>
                        </section>
                        {/*--------------*/}<section className="body-content ">{/*--------------*/}
                            <div className="container">
                                <form onSubmit={this.showcontact.bind(this)} className="form-two">
                                    <div className="group-input">
                                        <p className="description desktop txt-light">{formtwo.title}</p>
                                        <p className="description">{ReactHtmlParser(formtwo.description)}</p>
                                        <p className="description movil txt-light">{formtwo.title}</p>
                                    </div>
                                    <div className="group-input">

                                        <Input data={this.props.selectcountry.country} type={"select"} id="country" name="country" required text={formtwo.lblCountry} placeholder={this.props.selectcountry.placeholder} onchange={this.chooseCountry} name={"country"} ref={this.selectCountry} />

                                        <div style={{ marginTop: "5px" }}>
                                            <Input data={this.state.states} type={"select"} id="state" name="state" text={formtwo.lblState} ref={this.selectState} placeholder="Select Your State" />
                                        </div>
                                    </div>
                                    <div className="submit">
                                        <center>
                                            <Input type={"submit"} value={formtwo.btnSend} />
                                        </center>
                                    </div>
                                </form>
                            </div>

                            <section className="contact-show2" style={{ width: "100%", height: "30px" }}></section>

                            <section className="contact-show" ref={this.contacts}>
                                <section className="contact-awww container">
                                    <h1 className="title">{formtwo.erroTitle}</h1>
                                    <p style={{ maxWidth: "90%", margin: "auto" }}>{formtwo.descriptionOne}</p>
                                </section>
                                <article className={"contact-ok container-movil movil " + (this.state.contactsShow.length == 1 ? "one-item" : "")}>
                                    <Sliders nameSlide={"contacts-ok"} viewItems={2}>
                                        {this.contact()}
                                    </Sliders>
                                </article>
                                <article className="contact-ok container desktop">
                                    {this.contact()}
                                </article>
                                <div className="arrow-inverse"></div>
                            </section>
                        </section>
                        {/*--------------*/}<section className="body-content">{/*--------------*/}

                            <form ref={this.refFormSpe} className="form-three" onSubmit={this.contactWith.bind(this)}>
                                <section className="head-form contact-head-form">

                                    <h1 className="title"> {this.state.agency}</h1>
                                    <p className="description"><span>{this.props.formsContent.contact[0].labelAgency}</span>{this.state.contact}</p>
                                    <div className="back-btn">
                                        <label><a>
                                            <span className="text-light" onClick={this.deslizeform.bind(this, 1)}>{formthree.back}<Iconwedd icon={"chevron-left"} color={"pink"} /></span>
                                        </a></label>
                                    </div>
                                </section>
                                <div className="inline-input">
                                    <div className="group-input">
                                        <div className="name-input">
                                            <Input type={"text"} name="firstName" text={formthree.lblFirstName} required placeholder={formthree.inputFirstname} />
                                            <Input type={"text"} name="lastName" text={formthree.lblLastName} required placeholder={formthree.inputLastName} />
                                        </div>
                                    </div>
                                </div>
                                <div className="inline-input">
                                    <div className="group-input">
                                        <div className="name-input">
                                            <Input name="phone" type={"tel"} text={formthree.lblPhon} changeHandler={this.changeTest.bind(this)} required placeholder={formthree.inputPhone} />
                                            <Input name="email" type={"email"} text={formthree.lblEmail} required placeholder={formthree.inputEmail} />
                                        </div>
                                    </div>
                                </div>
                                <div className="inline-input message">
                                    <Input name="message" type={"textarea"} required text={formthree.lblYourMessage} placeholder={formthree.inputYourMessage} />
                                </div>

                                <div className="row-group " style={{ position: "relative" }}>
                                    <div className="col">
                                        <span className="terms-conditions learn-more">
                                            <Input type={"checkbox"} required styleForm={"square"} name="learnMore" id="learnMore" title={formthree.learnMoreText} />
                                        </span>
                                    </div>
                                </div>
                                <div className="submit movil">
                                    <span ><Input type={"submit"} value={formthree.btnSubmit} /></span>
                                </div>
                                <center className="submit desktop">
                                    <span ><Input type={"submit"} value={formthree.btnSubmit} /></span>
                                </center>
                            </form>
                        </section>
                        {/*--------------*/}<section className="body-content">{/*--------------*/}
                            <article className="container">
                                <section className="head-form contact-head-form-finish">
                                    <h1 className="title">{thankyou.title}</h1>
                                    <p className="description">{thankyou.subtitle}</p>
                                </section>
                            </article>
                            <div className="slider-other-guest">
                                <Otherguest />
                            </div>
                        </section>
                    </section>
                </section>
            </section>
        )
    }
};

export default withRouter((WithContext(Contactus)));

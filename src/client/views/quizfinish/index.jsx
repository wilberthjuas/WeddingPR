// TODO: Estilos en general
/*
Envia correo, envia CRM, revueltos los datos
*/

import React, { Component } from 'react';
import Layout from '../../components/layout';
import { Input, Titlesection } from '../../components/wirefragment';
import ReactDOMServer from 'react-dom/server';
import CheckboxButton from "../../components/clever/checkbox";
import data from './data';
import data_ES from './data_ES';
import api from '../../app/';
import WithContext from "../../app/Context";
import { Link } from 'react-router-dom';
import { DatePK } from '../../components';
import '../../components/';

import { set } from 'react-ga';
import ReCAPTCHA from "react-google-recaptcha"
// Images
const headingImage = "https://e-commercepr.s3.amazonaws.com/Produccion/theming/quiz-planning-your-wedding-min.jpg";
const flowerLeft = "https://cdn.zeplin.io/5d38951fdde9a677723b680d/assets/9CE16E6A-E3AF-47F0-B959-12C0CB2B3FFC.png";
const flowerRight = "https://cdn.zeplin.io/5d38951fdde9a677723b680d/assets/F948040B-0E1A-4A0C-BDF0-484247FE553A.png";

class QuizResortsFinish extends Component {

    constructor(props) {
        super(props);
        this.state = {
            heading: [],
            steps: [],
            countries: [],
            states: [],
            who_is_checked: "",
            list_checked: [],
            form: []
        };
        this.handleCheckRadio = this.handleCheckRadio.bind(this);
        this.selectCountry = React.createRef();
        this.selectState = React.createRef();
        this.chooseCountry = this.chooseCountry.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.handleCheckPK = this.handleCheckPK.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.changedata = this.changedata.bind(this);
        this.invalidData = this.invalidData.bind(this);
        this.onChange = this.onChange.bind(this);
        this.datapicker = React.createRef();
        this.dataSeson = React.createRef();
        this.requiredCheck = React.createRef();

        this.formFinish = React.createRef();

        this.loadstate = this.loadstate.bind(this);
        this.requiredC = this.requiredC.bind(this);
    }
    captchat = false
    onChange(e) {
        this.captchat = true
        //let { setData } = this.props.app.currentPage;
        //setData("recaptcha", true);
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

    handleCheckRadio(_value, _id, _component) {
        let { setData } = this.state.app.currentPage;
        const who_is_checked = _component ? _component.current.value : _value ? _value : "";
        setData('youAre', who_is_checked)
        this.validateForm()
        this.setState({ who_is_checked });
        let data = this.requiredCheck.current.querySelectorAll(".checkbox > input")
        data.forEach(element => {
            element.removeAttribute("required")
        });
    }

    getCountries(lang_) {
        //api.getCountries()
        api.getCountrybyLang(lang_)
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

    chooseCountry() {
        let code = this.selectCountry.current.select.current.querySelectorAll("select")[0].value
        let statec = []
        api.getStatesbyLang(code, "en")
            .then(res => {

                console.log("state sort/lang", res)

                Object.keys(res.data).forEach(function (key) {
                    statec.push([[res.data[key]], key])
                }
                )
                this.setState({
                    states: statec
                })

                let { setData } = this.props.app.currentPage;
                let { getData } = this.props.app.currentPage;
                setData('countryAgency', code)
                setData('countryAgencyName', this.selectCountry.current.select.current.querySelectorAll("input")[0].value)

                if (Array.isArray(statec) && statec.length) {
                    this.selectState.current.select.current.querySelectorAll("select")[0].value = "";
                    this.selectState.current.select.current.querySelectorAll("input")[0].value = "";
                    document.getElementById("state").required = true;
                    //this.selectState.current.select.current.querySelectorAll("select")[0].value = statec[0][1];
                    //this.selectState.current.select.current.querySelectorAll("input")[0].value = statec[0][0];
                    
                    
                } else {
                    document.getElementById("state").required = false;
                    this.selectState.current.select.current.querySelectorAll("select")[0].value = "0"
                    this.selectState.current.select.current.querySelectorAll("input")[0].value = "NA";
                    
                    
                }
                //this.validateForm()
            }).catch(e => console.error(e));
    }

    changedata(refForm, e) {
        try {
            let inputpicker = this.datapicker.current.querySelectorAll("[component=p4_datepicker]")[0]
            if (e != null && e.target.getAttribute("id") == "iknow") {
                inputpicker.style.display = ""
                inputpicker.querySelectorAll("input")[0].setAttribute("required", true)
                inputpicker.querySelectorAll("input")[0].setAttribute("name", "exactDate")
                inputpicker.querySelector("input").click()
                inputpicker.querySelector("input").focus()
            } else {
                inputpicker.style.display = "none"//IknowTheExactDate
                inputpicker.querySelectorAll("input")[0].removeAttribute("required")
            }
            if (refForm != null) {
                let data = refForm.current.querySelectorAll(".checkbox > input")
                data.forEach(element => {
                    element.removeAttribute("required")
                });
            }
            if (e != null && e.target.getAttribute("id") == "ihave") {
                this.dataSeson.current.style = "display:view"
            } else {
                this.dataSeson.current.style = "display:none"
            }
        }
        catch (exception) {

        }
    }
    loadstate(e) {
        let statec = []

        if (e.target != null) {
            const name = "country";
            const value = e.target.getAttribute("value");
            let { setData } = this.state.app.currentPage;
            setData(name, value)

            api.getStatesByCountry({ "iso": e.target.getAttribute("value") })
                .then(res => {
                    res.data.forEach(function (estado) {
                        statec.push([estado.descripcion, estado.clave_region])
                    })
                    this.setState({
                        states: statec
                    })
                    if (this.state.states.length == 0) {
                        this.setState({
                            states: [["N/A", "N/A"]]
                        })
                    }
                }).catch(e => console.error(e));
        }
    }
    componentDidMount() {


        const { match: { params } } = this.props;
        switch (params.lang) {
            case "es":
                this.setState({
                    heading: data_ES.heading,
                    steps: data_ES.steps,
                    countries: [],
                    states: [],
                    who_is_checked: "",
                    list_checked: [],
                    form: data_ES.form
                });
                break;
            default:
                this.setState({
                    heading: data.heading,
                    steps: data.steps,
                    countries: [],
                    states: [],
                    who_is_checked: "",
                    list_checked: [],
                    form: data.form
                });
                break;
        }


        this.getCountries(params.lang)
        let { setData } = this.state.app.currentPage;
        setData('formFinish', false)
        this.changedata()
       // this.setDataForm()

    }
    setDataForm() {
        try {
            if (localStorage.quizHomeFrm3 == null) {
                this.props.history.push("extras", {})
            }
            setTimeout(() => {
                if (localStorage.quizHomeFrm4 != null) {
                    let json = JSON.parse(localStorage.quizHomeFrm4)
                    let form = this.formFinish.current
                    json.forEach(element => {
                        if (element.name != "") {
                            let elemento = form.querySelector("[name=" + element.name + "]")
                            if (elemento != null) {
                                let elementForm = form.querySelector("[name=" + element.name + "]")

                                if (elementForm.type == "radio" || elementForm.type == "checkbox") {
                                    elementForm.click()
                                }
                                if (elementForm.type == "text" || elementForm.type == "email" || elementForm.type == "tel") {
                                    setTimeout(() => {
                                        elementForm.value = element.value
                                    }, 400)
                                }
                                if (elementForm.type == "select-one") {
                                    try {

                                        form.querySelectorAll("[op=" + elementForm.name + "] [value='" + element.value + "']")[0].click()
                                    } catch (exception) {
                                        setTimeout(() => {
                                            form.querySelectorAll("[op=" + elementForm.name + "] [value='" + element.value + "']")[0].click()
                                        }, 700)
                                    }
                                }
                            }
                        }
                    });
                }
            }, 3500)
        } catch (exception) {
            //console.log(exception)
        }
    }

    validateForm() {
        let { setData } = this.state.app.currentPage;
        let { getData } = this.state.app.currentPage;
        if (getData("country") && getData("youAre") && getData("state") && getData("firstname") && getData("lastname")) {
            setData('formFinish', true)
        }
    }

    changeHandler = event => {
        let inputCheck=this.datapicker.current.parentNode.querySelectorAll("input[type=radio]")
        inputCheck.forEach((element,index) => {
            if(element.checked){
                this.setState({deciding:index})
            }
        });
        const name = event.target.name;
        const value = event.target.value;
        let { setData } = this.state.app.currentPage;
        setData(name, value)

        this.changedata(this._checkrequired, event)
        this.validateForm()
    }
    handleCheckPK(e) {
        //console.log(e)
    }
    saveDataJsonTemp() {
        let json = []
        let array = this.formFinish.current.querySelectorAll("input")
        array.forEach((element, index) => {
            if ((element.type == "checkbox" && element.checked) || (element.type == "radio" && element.checked)) {
                json.push({ name: element.name, value: element.value })
            }
            if ((element.type == "text" || element.type == "email" || element.type == "tel")) {
                json.push({ name: element.name, value: element.value })
            }
        })
        array = this.formFinish.current.querySelectorAll("select")
        array.forEach((element, index) => {
            if (element.getAttribute("type") == "select") {
                json.push({ name: element.name, value: element.value })
            }
        })
        localStorage.setItem("quizHomeFrm4", JSON.stringify(json))
    }
    getAllDataForm() {
        return ([
            JSON.parse(localStorage.quizHomeFrm0),
            JSON.parse(localStorage.quizHomeFrm1),
            JSON.parse(localStorage.quizHomeFrm2),
         //   JSON.parse(localStorage.quizHomeFrm3),
            JSON.parse(localStorage.quizHomeFrm4)
        ])
    }

  

    armarObj(data){

        const { match: { params } } = this.props;

        let destinos_list = []
        let interested_in = null
        let how_many_guests = null
        data[0].map((item,index) => {
            if (item.name == "whicOp10"){
                interested_in = item.value;
            }
            if (item.name == "whicOp32"){
                how_many_guests = item.value;
            }
            if (item.name == "whicOp21"){
                destinos_list.push(item.value)
            }
        });
        let propiedades = []
        data[1].map((item,index) => {
            propiedades.push(item.value)
        });        
        let collections = []
        data[2].map((item,index) => {
            collections.push(item.value)
        });
        /*let extras = []
        data[3].map((item,index) => {
            extras.push(item.value)
        });*/

       
        let telefono = data[3].filter((e)=>{return e.name=="phoneNumber"})[0].value;
        telefono = telefono.replace(/-/g,"")
        let obj = {
            interested_in : interested_in,
            how_many_guests: how_many_guests,
            destination_get_married : destinos_list,
            propiedades : propiedades,
            collections: collections,
            //extras: extras,
            fecha_ceremonia: data[3].filter((e)=>{return e.name=="option-first"})[0].value,
            fecha_propuesta: 
            this.state.deciding==0?
            data[3].filter((e)=>{return e.name=="exactDate"})[0].value:
            this.state.deciding==1?
            data[3].filter((e)=>{return e.name=="season"})[0].value:
            "",

            tipo_contacto: data[3].filter((e)=>{return e.name.includes("seeTheWedding")})[0].value,
            nombre_contacto: data[3].filter((e)=>{return e.name=="firstname"})[0].value,
            apellido_contacto: data[3].filter((e)=>{return e.name=="lastname"})[0].value,
            correo: data[3].filter((e)=>{return e.name=="email"})[0].value,
            telefono: telefono,
            pais: data[3].filter((e)=>{return e.name=="country"})[0].value,
            estado: data[3].filter((e)=>{return e.name=="state"})[0].value,
            formulario : "quiz_home",
            idioma: params.lang,
            lead_general : true,
       }

       return obj;
    }

    async sendCRM(object) {
        var fecha = new Date
        const dataCRM =
        {
            "estado": 1,
            "fecha_creacion": fecha.getDate() + "-" + (fecha.getMonth() + 1) >= 10 ? (fecha.getMonth() + 1) : "0" + (fecha.getMonth() + 1) + "-" + fecha.getFullYear(),
            "usuario_creacion": "wedding_interface",
            "idlead_interface_venta": 2,
            "descripcion": "Palace Weddings",
            "idlead_contacto": 0,
            "informacion_interface": object
        }
        console.log("dataCRM",dataCRM)

        api.sendDataCRM(dataCRM)
            .then(res => {

            }).catch(e => console.error(e));
    }

    sendMail(res = false,objeto) {
        const email = "wilsanchez@palaceresorts.com,edgmartinez@palaceresorts.com"
        let htmlbody = ReactDOMServer.renderToStaticMarkup(this.htmlDisplay(objeto));
        let emailData = {
            TO_ADDRESSES: email,
            CC_ADDRESSES: "",
            TEXTBODY: "Form submission from: Quizz Home",
            HASH: "Form submission from: Quizz Home",
            SUBJECT: "Form submission from: Quizz Home",
            HTMLBODY: htmlbody,
            token: res.token,
        }
        //console.log("html: ",htmlbody)
        api.sendEmail(emailData)
            .then(res => { }).catch(e => console.error(e));


    }

    htmlDisplay(obj) {
        var fecha = new Date
        let { getData } = this.state.app.currentPage;
        let pais = getData("countryName");
        let estado = getData("stateName")
        return (
            <div>
                <h2>Form submission from: Quizz Home</h2>
                <table>
                    <tr><td><strong>Fecha:</strong> {fecha.getDate()}/{(fecha.getMonth() + 1) >= 10 ? (fecha.getMonth() + 1) : "0" + (fecha.getMonth() + 1)}/{fecha.getFullYear()}</td></tr>
                    <tr><td><strong>Nombre:</strong> {obj.nombre_contacto}</td></tr>
                    <tr><td><strong>Apellido:</strong> {obj.apellido_contacto}</td></tr>
                    <tr><td><strong>Interesado en:</strong> {obj.interested_in}</td></tr>
                    <tr><td><strong>Telefono:</strong> {obj.telefono}</td></tr>
                    <tr><td><strong>E-mail:</strong> {obj.correo}</td></tr>
                    <tr><td><strong>Pais:</strong> {obj.pais}</td></tr>
                    <tr><td><strong>Estado:</strong> {obj.estado}</td></tr>
                    
                    <tr><td><strong>Fecha ceremonia:</strong> {obj.fecha_ceremonia}</td></tr>

                    <tr><td><strong>Fecha propuesta::</strong> {obj.fecha_propuesta}</td></tr>
                    <tr><td><strong>Tipo de Contacto:</strong> {obj.tipo_contacto}</td></tr>
                    <tr><td><strong>Destinos de Interes:</strong></td></tr>
                    {
                        obj.destination_get_married.map(function (item) {
                            return (
                                <tr key={item}><td>{item}</td></tr>
                            )
                        })
                    }
                    <tr><td><strong>Propiedades de Interes:</strong></td></tr>
                    {
                        obj.propiedades.map(function (item) {
                            return (
                                <tr key={item}><td>{item}</td></tr>
                            )
                        })
                    }
                    <tr><td><strong>Colecciones de Interes:</strong></td></tr>
                    {
                        obj.collections.map(function (item) {
                            return (
                                <tr key={item}><td>{item}</td></tr>
                            )
                        })
                    }                     
                    <tr><td><strong>Idioma:</strong> {obj.idioma}</td></tr>
                    <tr><td><strong>Formulario:</strong> {obj.formulario}</td></tr>
                </table>
            </div>
        )
    }


    onSubmit = e => {
        let flag = 0
        e.preventDefault();

        console.log("flag: ",flag)

        const formData = new FormData(e.target)
        formData.forEach(element => {
            flag++
        });

        console.log("flag: ",flag)
        
        if (flag > 0) {
            this.saveDataJsonTemp()
            let objeto = this.armarObj(this.getAllDataForm())
            this.sendCRM(objeto)
            this.sendHubspot(objeto)
            //this.sendMail(false, objeto)

            api.loginEmail()
                .then(res => {
                    this.sendMail(res.data, objeto)
                }).catch(e => console.error(e));


            //console.log("Objeto para todos lados:", objeto)

            //finaliza el formulario
            //console.log(this.getAllDataForm())
            //se eliminan todas la variables almacenadas successForm
            if (this.captchat) {
                localStorage.removeItem('quizHomeFrm0');
                localStorage.removeItem('quizHomeFrm1');
                localStorage.removeItem('quizHomeFrm2');
                //localStorage.removeItem('quizHomeFrm3');
                localStorage.removeItem('quizHomeFrm4');
                localStorage.succesquiz = "succes"
                this.props.history.push("/")
            }
            else {
                let lang = this.props.app.lang
                alert(lang == "es" ? "Completa el captcha por favor" : "Complete the captcha please")
                return null
            }
            return data
        } else {clearImmediategoit 
            return false
        }
    }
    requiredC(option, event) {
        if (option != null) {
            if (option.target == null) {//1
                let current = this.requiredCheck.current.querySelectorAll("input[type=checkbox]")

                let remov = false
                current.forEach(element => {
                    if (element.checked) {
                        remov = true
                    }
                });
                if(remov){
                    current.forEach(element => {
                        element.removeAttribute("required")
                    })
                }
            }
        }
        //console.log(option.querySelectorAll("input[type=checkbox]"))
        /* let data = event.target == "" ? event.querySelectorAll("input ") : event.target.querySelectorAll("input")
         data.forEach(element => {
             if (element.type != "submit") {
                 if (option == 1) {
                     element.setAttribute('required', true)
                 } else {
                     if (element.checked == false) {
                         element.removeAttribute("required")
                     }
                 }
             }
             if (option == 1 && element.type == "submit") {
                 setTimeout(() => {
                     element.click()
                 });
             }
         });*/
    }
    invalidData(e, message) {
        if (e.target.value != this.state.app.currentPage.data.email) {
            e.target.setCustomValidity(message)
        } else {
            e.target.setCustomValidity("")
        }
    }

    async sendHubspot(obj) {

        let id_form = "b9800ace-8c8a-4664-89be-92707e399763";

        var querystring = require('querystring');
        var postData = querystring.stringify({
            who_are_you_label: this.state.who_is_checked,
            firstname: obj.nombre_contacto,
            lastname:obj.apellido_contacto,
            country:obj.pais,
            state:obj.estado,
            email:obj.correo,
            phone:obj.telefono,
            exact_date_label:obj.fecha_ceremonia,
            season_mind_label:obj.fecha_propuesta,
            still_deciding_label:obj.fecha_propuesta

        });
        api.sendHubspot(postData, id_form);
    }



    render() {

        let { heading, steps, form } = this.state;

        return (
            <Layout title="Resort Quiz">
                {heading.title != null ?
                    <section page="quizresorts">
                        <div className="desktop">
                            <div className=" main-heading" style={{ backgroundImage: `url(${headingImage})` }}>
                                <div className="content">
                                    <div style={{ margin: "2%" }}>
                                        <p style={{ textTransform: "initial" }} className="description txt-light">{heading.title}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="movil">
                            <div className="main-heading" style={{ backgroundImage: `url(https://e-commercepr.s3.amazonaws.com/Produccion/theming/quiz-planning-your-wedding-mob.jpg)`,    height: "10.125rem",    minHeight: "unset" }}>
                                <div className="content">
                                    <div style={{ margin: "2%" }}>
                                        <p style={{ textTransform: "initial",    margin: "auto" }} className="description txt-light">{heading.title}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="steps">
                            <div className="_container">
                                <div className="indicator active">
                                    <div className="number">
                                        <p className="description">1</p>
                                    </div>
                                    <div className="title">
                                        <p className="description numn-step">{steps.one.title}</p>
                                    </div>
                                </div>
                                <div className="divider">
                                    <div className="line"></div>
                                </div>
                                <div className="indicator active">
                                    <div className="number">
                                        <p className="description">2</p>
                                    </div>
                                    <div className="title">
                                        <p className="description numn-step">{steps.two.title}</p>
                                    </div>
                                </div>
                                <div className="divider " style={{display:"none"}}>
                                    <div className="line"></div>
                                </div>
                                <div className="indicator" style={{display:"none"}}>
                                    <div className="number">
                                        <p className="description" >3</p>
                                    </div>
                                    <div className="title">
                                        <p className="description numn-step">{steps.three.title}</p>
                                    </div>
                                </div>
                                <div className="divider">
                                    <div className="line"></div>
                                </div>
                                <div className="indicator active">
                                    <div className="number">
                                        <p className="description">3</p>
                                    </div>
                                    <div className="title">
                                        <p className="description numn-step">{steps.four.title}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <form onSubmit={this.onSubmit.bind()} id={"form-finish"} ref={this.formFinish}>
                            <div className="main-title form-finish">
                                <img className="flower-left movil" src={flowerLeft} alt="Flower Left" />
                                <img className="flower-right movil" src={flowerRight} alt="Flower Right" />
                                <div className="content-form --container-small">
                                    <Titlesection title={heading.titlePage} description={heading.subtitlePage} />
                                    <div className="caption-desktop">
                                        <section className="firts-form-finish container" ref={this._checkrequired}>
                                            <section ref={this.datapicker} className="p4_datepicker" component="inputwedd">
                                                <Input required changeHandler={this.changeHandler} styleForm={"filledcircle"} type={"radio"} value={"I know the exact date"} title={form.labe1} id={"iknow"} name={"option-first"} />

                                                <div component="cell" small="12">
                                                    <div style={this.state.hideDate} >
                                                        <DatePK name={"exatDate"} placeholder={localStorage.langWeddings=="es"?"Selecciona fecha de boda":"Select wedding date"} style={{ "display": "none" }} required _onClick={this.handleCheckPK} _active={this.state.vsual} _returnChange={(e) => this.handleCheckPK(e)}
                                                        />
                                                    </div>
                                                </div>
                                            </section>
                                            <section type="section" className="seson">{/* this.state.seson==null?this.setState({seson:"ocult"}): this.setState({seson:"ocult"})  */}
                                                <Input required changeHandler={this.changeHandler} styleForm={"filledcircle"} type={"radio"} value={localStorage.langWeddings=="es"?"Temporada En Mente":"I have a season in mind"} title={form.labe2} id={"ihave"} name={"option-first"} />
                                                <div component="p4_datepicker" style={{ display: this.state.seson == null ? "none" : "view" }} ref={this.dataSeson}>
                                                    <Input type={"select"} data={form.seasons} placeholder={form.hold} id="season" name="season" />
                                                </div>
                                            </section>
                                            <Input required changeHandler={this.changeHandler} styleForm={"filledcircle"} type={"radio"} value={"I'm still deciding"} title={form.labe3} id={"imstill"} name={"option-first"} />
                                        </section>
                                    </div>
                                </div>
                            </div>
                            <div className="dreams">
                                <div className="content container">
                                    <Titlesection subtitle={form.titleForm} description={form.subtitleForm} />
                                    {/*************************/}
                                    <div component="grid-x" >
                                        <div component="cell" small="1" medium="2" large="2"></div>
                                        <div component="cell" small="10" medium="8" large="8">
                                            <div component="grid-x" ref={this.requiredCheck} onClick={this.requiredC.bind(1)}>
                                                <div component="cell" small="6" medium="6" large="3">
                                                    <CheckboxButton
                                                        _onClick={this.handleCheckRadio}
                                                        changeHandler={this.changeHandler}
                                                        value={"The Beautiful Bride"}
                                                        is_checked={this.state.who_is_checked == "The Beautiful Bride"}
                                                        image_src={
                                                            "https://e-commercepr.s3.amazonaws.com/assets/images/home/Desktop/the-beautiful-bride.png"
                                                        }
                                                        text_to_display={form.checkLabel1}
                                                        is_square={false}
                                                        styleForm="filledcircle"
                                                        required
                                                        id={"seeTheWedding"}
                                                    />
                                                </div>
                                                <div component="cell" small="6" medium="6" large="3">
                                                    <CheckboxButton
                                                        _onClick={this.handleCheckRadio}
                                                        value={"The Lucky Groom"}
                                                        is_checked={this.state.who_is_checked == "The Lucky Groom"}
                                                        image_src={
                                                            "https://e-commercepr.s3.amazonaws.com/assets/images/home/Desktop/the-lucky-groom.png"
                                                        }
                                                        text_to_display={form.checkLabel2}
                                                        is_square={false}
                                                        styleForm="filledcircle"
                                                        required
                                                        id={"seeTheWedding2"}
                                                    />
                                                </div>
                                                <div component="cell" small="6" medium="6" large="3">
                                                    <CheckboxButton
                                                        _onClick={this.handleCheckRadio}
                                                        value={"Proud Parent"}
                                                        is_checked={this.state.who_is_checked == "Proud Parent"}
                                                        image_src={
                                                            "https://e-commercepr.s3.amazonaws.com/assets/images/home/Desktop/proud parent.png"
                                                        }
                                                        text_to_display={form.checkLabel3}
                                                        is_square={false}
                                                        styleForm="filledcircle"
                                                        required
                                                        id={"seeTheWedding3"}
                                                    />
                                                </div>

                                                <div component="cell" small="6" medium="6" large="3">
                                                    <CheckboxButton
                                                        _onClick={this.handleCheckRadio}
                                                        value={"Helpfull Friend/Planner"}
                                                        is_checked={this.state.who_is_checked == "Helpfull Friend/Planner"}
                                                        image_src={
                                                            "https://e-commercepr.s3.amazonaws.com/assets/images/home/Desktop/helpful-friend-planner.png"
                                                        }
                                                        text_to_display={form.checkLabel4}
                                                        is_square={false}
                                                        styleForm="filledcircle"
                                                        required
                                                        id={"seeTheWedding4"}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div component="cell" small="1" medium="2" large="2"></div>
                                    </div>
                                    {/*************************/}
                                    <div className="cell content-father">
                                        <div component="grid-x content-child">
                                            <div component="cell" small="12" medium="8" large="8">
                                                <div component="grid-x" ref={this.requiredC.bind()}>


                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/**/}
                                <div component="contactus" >
                                    <div className="back-ground">
                                        <div className="container contact-head-form-finish">
                                            <div className="inline-input">
                                                <div className="group-input">
                                                    <div className="name-input">
                                                        <Input changeHandler={this.changeHandler} required type={"text"} text={form.labelInput1} placeholder={form.labelPlaceHold1} refInput={this.fname} id={"firstname"} name={"firstname"} />
                                                        <Input changeHandler={this.changeHandler} required type={"text"} text={"jump"} placeholder={form.labelPlaceHold1_} refInput={this.fname} id={"lastname"} name={"lastname"} />
                                                    </div>
                                                </div>
                                                <div className="group-input">
                                                    <div className="name-input">
                                                        <Input required type={"select"} placeholder={form.labelPlaceHold2} text={form.labelInput2} data={this.state.countries} id={"country"} name={"country"} ref={this.selectCountry} onchange={this.chooseCountry} withSearch />
                                                        <Input required type={"select"} placeholder={form.labelPlaceHold2_} text={"jump"} data={this.state.states} id={"state"} name={"state"} ref={this.selectState} withSearch/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="inline-input  email-reply">
                                                <div className="group-input">
                                                    <div className="name-input">
                                                        <Input type={"email"} text={form.labelInput3} changeHandler={this.changeHandler} required placeholder={form.labelPlaceHold3} refInput={this.fname} id={"email"} name={"email"} />
                                                        <div component="inputwedd">
                                                            <label className="labelInput">&nbsp;</label>
                                                            <input type="email" required onInvalid={(e) => { this.invalidData(e, form.labelInputMessage3) }}
                                                                pattern={this.state.app.currentPage.data.email}
                                                                placeholder={form.labelPlaceHold3_}
                                                                id={"reemail"} name={"reemail"}
                                                                autoComplete="new"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="group-input">
                                                    <Input type={"tel"} text={form.labelInput4} required changeHandler={this.changeHandler} placeholder={form.labelPlaceHold4} refInput={this.fname} id={"phoneNumber"} name={"phoneNumber"} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="container">
                                    <div component="contactus">
                                        <div className="contact-head-form-finish">
                                            <p className="description">{form.description1}</p>
                                        </div>
                                    </div>
                                    <div className="tems-conditions" >
                                        <Input required value={true} type={"checkbox"} styleForm={"square"} name="terminosConditions" id="terminosConditions"
                                            title={form.labelInput5} />
                                    </div>
                                    <div style={{ width: "max-content", margin: "auto" }}>
                                        <ReCAPTCHA sitekey="6LdNHNYUAAAAAL657L42DV80YsWmrsdo_uoyMH8_" theme="light" onChange={this.onChange.bind(this)} />
                                    </div>
                                    <div className="to-center" component="inputwedd">
                                        <button type="button" style={{ display: "none" }} onClick={() => { this.props.history.push("extras") }} className="btn-back btn pink">{heading.back}</button>
                                        <button className="btn-melon btn white" id="quizfinish">{heading.accept}</button>
                                    </div>
                                    <p className="description">{form.description2}</p>
                                    <div className="white-space-16"></div>
                                </div>
                            </div>
                        </form>
                    </section>
                    : <div></div>}
            </Layout>
        );
    }

}

export default WithContext(QuizResortsFinish);
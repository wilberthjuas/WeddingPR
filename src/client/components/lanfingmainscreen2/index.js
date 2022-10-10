import React, { Component } from 'react';
import { Titlesection, Iconwedd, Input } from '../../components/wirefragment';
import HtmlParser from 'react-html-parser';
import Sliders from '../sliders';
import { TwitterShareButton, FacebookShareButton } from 'react-share';
import json from "./data_1";
import CheckboxButton from '../clever/checkbox';
import api from '../../app';
import { DatePK } from '..';
import InputRange from '../clever/inputrange';
import Nowdream from '../nowdream';
import Sweptaway from '../sweptaway';

class Landingmainscreenc extends Component {

    constructor(props) {
        super(props);
        this.tabone = React.createRef();
        this.tabtwo = React.createRef();
        this.tabthree = React.createRef();
        this.notsureCheck = React.createRef();
        const { getData } = this.props.currentPage;
        this.state = {
            finish: false,
            datos1: json['en5'][0],
            list_checked: getData("resorts") ? getData("resorts") : [],
            list_checked2: getData("resorts") ? getData("resorts") : [],
            primero: "",
            referService: false,
            clientAgency: false,
            weddingSpecialist: false,
            val: "",
            email: "",
            confirm_mail: "",
            phone: "",
            /* norefer: getData('clientAgency') == "Yes" ? true : false,
             norefer2: getData('weddingSpecialist') == "Yes" ? true : false,*/
            countries: [],
            seasons: true,
            states: [],
            termsconditions: false,
            lang_web: "en",
            error_resorts: "Select a destination option *",
            error_agency_radios: "Select an option *",
            error_agency: "Complete all fields of the travel agent *",
            error_agency_name: "Fill the Name fields *",
            error_agency_country: "Fill the Country fields *",
            error_agency_agency: "Fill the Agency fields *",
            error_specialist: "Complete all specialist fields *",
            error_specialist_radios: "Select an option *",
            error_email: "E-mails Don't Match *",
            error_email_format: "Incorrect E-mail format *",
            error_phone: "Fill the field Phone number *",
            error_phone_format: "Incorrect Phone Number format (ej, 333-333-3333)",
            error_refer: "Select an option *",
            error_recaptcha: "Fill the Recaptcha field *",
            error_terms: "Accept terms & conditions *",
            disabled: true,
            the_sure: getData('notsure_resort') ? true : false,
            refer_yes: getData('referService') == "Yes" ? true : false,
            refer_no: getData('referService') == "No" ? true : false,
            agency_yes: getData('clientAgency') == "Yes" ? true : false,
            agency_no: getData('clientAgency') == "No" ? true : false,
            specialist_yes: getData('weddingSpecialist') == "Yes" ? true : false,
            specialist_no: getData('weddingSpecialist') == "No" ? true : false,
            terms_yes: getData('termsconditions') ? true : false,
            web_form: "",
            country_code: getData('countryAgency') ? getData('countryAgency') : "",
            country_name: getData('countryAgencyName') ? getData('countryAgencyName') : "",
            state_code: getData('stateAgency') ? getData('stateAgency') : "",
            state_name: getData('stateAgencyName') ? getData('stateAgencyName') : "",
            error_phone_agency: "Fill the field Phone number *",
            error_phone_format_agency: "Incorrect Phone Number format (ej, 333-333-3333)",

            finish: false,
            datos2: json['en4'][0],
            val: getData('guestNumber') ? getData('guestNumber') : 0,
            deciding: "",
            sure: "",
            date: new Date(),
            fname: getData('guestNumber') ? getData('guestNumber') : "",
            valuepk: getData('celebrationDate') ? getData('celebrationDate') : "",
            hideDate: { padding: "5px 10px", display: "none" },
            hideSeasons: { padding: "5px 10px", display: "none" },
            the_date: false,
            the_season: false,
            the_still: false,
            the_sure: getData("notsure") ? true : false,
            error_format: "Error in Date Format (ej, YYYY-MM-DD) *",
            //--------------------------
            heading: [],
            steps: [],
            countries: [],
            states: [],
            who_is_checked: "",
            list_checked: [],
            form: [],
            terms_opn: false,
            share_open: false,
            send_succe: false,
            open_curtain: false
        }

        this.refe3 = React.createRef();
        this.refe4 = React.createRef();
        this.refe5 = React.createRef();
        this.refe6 = React.createRef();
        this.refe7 = React.createRef();
        this.refe8 = React.createRef();
        this.refe9 = React.createRef();
        this.refe10 = React.createRef();
        this.refe11 = React.createRef();
        this.refe12 = React.createRef();
        this.refRe = React.createRef();
        this.stepContainer = React.createRef();

        this.handleCheckbox = this.handleCheckbox.bind(this);
        this.handleCheckRadioSure = this.handleCheckRadioSure.bind(this);
        //this.sendMail = this.sendMail.bind(this);
        //this.htmlDisplay = this.htmlDisplay.bind(this);

        this.parent1 = this.parent1.bind(this);
        this.parent2 = this.parent2.bind(this);
        this.parent3 = this.parent3.bind(this);
        // this.parent4 = this.parent4.bind(this);
        this.parent5 = this.parent5.bind(this);

        this.selectCountry = React.createRef();
        this.selectState = React.createRef();
        this.chooseCountry = this.chooseCountry.bind(this);
        this.chooseState = this.chooseState.bind(this);
        this.changeHandlerTerms = this.changeHandlerTerms.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.validateAgency = this.validateAgency.bind(this);
        this.agency = this.agency.bind(this)
        this.validateSpecialist = this.validateSpecialist.bind(this);
        //this.sendHubspot = this.sendHubspot.bind(this)

        this.fname = React.createRef();
        this.selectSeasons = React.createRef();
        this.selectSeasonsChange = this.selectSeasonsChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCheckRadio_step = this.handleCheckRadio_step.bind(this);
        this.handleCheckRadio = this.handleCheckRadio.bind(this);
        this.handleCheckRadioSure = this.handleCheckRadioSure.bind(this);
        this.validateChecks = this.validateChecks.bind(this)
        this.onDateChange = this.onDateChange.bind(this);
        this.handleDrops = this.handleDrops.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.handleCheckPK = this.handleCheckPK.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.stepContainer = React.createRef();
        this.valFormat = this.valFormat.bind(this);
        this.requiredCheck = React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    async handleSubmit(e) {
        e.preventDefault();
        //console.log("imagen:",this.props.imgbanner[0]['imageDesk'])
        //console.log("descr:",this.props.description)
        setTimeout(() => { this.setState({ send_succe: false }) }, 8000)
        api.loginEmail()
            .then(res => {
                this.sendMail(res.data, false)
                this.setState({ send_succe: true })
            }).catch(e => console.error(e));
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

    handleCheckRadioSure(_value, _id) {
        let { setData } = this.props.currentPage;
        if (_value.target.checked) {
            setData('notsure_resort', true)
        } else {
            setData('notsure_resort', false);
        }
        setData('error_resorts', false);
    }

    agency(_value, _id) {

        console.log("*****", _value.target.value, _value.target.name)

        let { setData } = this.props.currentPage;

        if (_value.target.name == "referService") {
            setData('error_refer', false);
        }

        if (_value.target.name == "clientAgency") {
            setData('error_agency_radios', false);
            if (_value.target.value == "Yes") {
                this.setState({ norefer: true });
            } else {
                this.setState({ norefer: false });
            }
        }

        if (_value.target.name == "weddingSpecialist") {
            setData('error_specialist_radios', false);
            if (_value.target.value == "Yes") {
                this.setState({ norefer2: true });
            } else {
                this.setState({ norefer2: false });
            }
        }
        this.setState({ [_value.target.name]: _value.target.value });
        setData(_value.target.name, _value.target.value);
    }

    handleCheckbox(_value, _id, _component) {

        if (this.state.web_form == "take-next-step-paradise") {

            let { getData, setData } = this.props.currentPage;
            const list_checked2 = []
            list_checked2.push(_value)
            this.setState({ list_checked: list_checked2 });
            let resorts = [];
            resorts.push(_value)
            console.log("Resorts: ", resorts)
            setData("resorts", resorts);

            if (_value == "ZMNI") {
                this.setState({
                    seasons: false
                })
            } else {
                this.setState({
                    seasons: true
                })
            }


        } else {
            const who_is_checked = _component ? _component.current.value : _value ? _value : "";
            const list_checked = [...this.state.list_checked];
            if (list_checked.indexOf(who_is_checked) < 0) list_checked.push(who_is_checked);
            else list_checked.splice(list_checked.indexOf(who_is_checked), 1);
            this.setState({ list_checked });
            let { setData } = this.props.currentPage;
            let { getData } = this.props.currentPage;
            let resorts = getData("resorts") != null ? getData("resorts") : [];
            if (resorts.indexOf(_value) >= 0) {
                console.log("quito", _value)
                let index = resorts.indexOf(_value);
                if (index !== -1) resorts.splice(index, 1);

            } else {
                console.log("agrego", _value)
                resorts.push(_value);
            }

            if (resorts.length > 0) {
                setData('error_resorts', false);
            } else {
                setData('error_resorts', true);
            }
            setData("resorts", resorts);
        }

        this.validateForm();
    }

    /** Resorts  */
    parent1() {
        return (
            <section style={{ padding: "10px" }} key="1001">
                <CheckboxButton
                    id="resortSelect"
                    onRef={this.refe3}
                    _onClick={this.handleCheckbox}
                    value={"ZCJG"}
                    styleForm="circle"
                    image_src={
                        "https://e-commercepr.s3.amazonaws.com/assets/images/takethenextstep/desktop/ttns-moon-palace-jamaica.jpg"
                    }
                    is_checked={this.state.list_checked.indexOf("ZCJG") > -1}
                    text_to_display="Moon Palace Jamaica"
                    required={!this.state.list_checked.length > 0}

                />
            </section>
        );
    }
    parent2() {
        return (
            <section style={{ padding: "10px" }} key="1002">
                <CheckboxButton
                    onRef={this.refe4}
                    _onClick={this.handleCheckbox}
                    id="resortSelect"
                    value={"ZHLB"}
                    styleForm="circle"
                    image_src={
                        "https://e-commercepr.s3.amazonaws.com/assets/images/takethenextstep/desktop/ttns-le-blanc-cancun.jpg"
                    }
                    is_checked={this.state.list_checked.indexOf("ZHLB") > -1}
                    text_to_display="Le Blanc Spa Resort Cancun"
                    required={!this.state.list_checked.length > 0}
                />
            </section>
        );
    }
    parent3() {
        return (
            <section style={{ padding: "10px" }} key="1003">
                <CheckboxButton
                    onRef={this.refe5}
                    _onClick={this.handleCheckbox}
                    id="resortSelect"
                    value={"ZRCZ"}
                    styleForm="circle"
                    image_src={
                        "https://e-commercepr.s3.amazonaws.com/assets/images/takethenextstep/desktop/ttns-cozumel-palace.jpg"
                    }
                    is_checked={this.state.list_checked.indexOf("ZRCZ") > -1}
                    text_to_display="Cozumel Palace"
                />
            </section>
        );
    }
    /*
    parent4() {
        return (
            <section style={{ padding: "10px" }} key="1004">
                <CheckboxButton
                    onRef={this.refe6}
                    _onClick={this.handleCheckbox}
                    id="resortSelect"
                    value={"ZHIM"}
                    styleForm="circle"
                    image_src={
                        "https://e-commercepr.s3.amazonaws.com/assets/images/takethenextstep/desktop/ttns-isla-mujeres.jpg"
                    }
                    is_checked={this.state.list_checked.indexOf("ZHIM") > -1}
                    text_to_display="Isla Mujeres Palace"
                />
            </section>
        );
    }

     */
    parent5() {
        return (
            <section style={{ padding: "10px" }} key="1005">
                <CheckboxButton
                    onRef={this.refe7}
                    _onClick={this.handleCheckbox}
                    id="resortSelect"
                    value={"ZPLB"}
                    styleForm="circle"
                    image_src={
                        "https://e-commercepr.s3.amazonaws.com/assets/images/takethenextstep/Take+the+Next+Step/ttns-le-blanc-los-cabos.jpg"
                    }
                    is_checked={this.state.list_checked.indexOf("ZPLB") > -1}
                    text_to_display="Le Blanc Spa Resort Los Cabos"
                    required={!this.state.list_checked.length > 0}
                />
            </section>
        );
    }
    parent6() {
        return (
            <section style={{ padding: "10px" }} key="1006">
                <CheckboxButton
                    onRef={this.refe8}
                    _onClick={this.handleCheckbox}
                    value={"ZMGR"}
                    id="resortSelect"
                    styleForm="circle"
                    image_src={
                        "https://e-commercepr.s3.amazonaws.com/assets/images/takethenextstep/desktop/ttns-the-grand-at-moon-palace-cancun.jpg"
                    }
                    is_checked={this.state.list_checked.indexOf("ZMGR") > -1}
                    text_to_display="Moon Palace The Grand - Cancun"
                />
            </section>
        );
    }
    parent7() {
        return (
            <section style={{ padding: "10px" }} key="1007">
                <CheckboxButton
                    onRef={this.refe9}
                    _onClick={this.handleCheckbox}
                    value={"ZMNI"}
                    id="resortSelect"
                    styleForm="circle"
                    image_src={
                        "https://e-commercepr.s3.amazonaws.com/assets/images/takethenextstep/desktop/ttns-moon-palace-cancun.jpg"
                    }
                    is_checked={this.state.list_checked.indexOf("ZMNI") > -1}
                    text_to_display="Moon Palace Cancun"
                />
            </section>
        );
    }
    parent8() {
        return (
            <section style={{ padding: "10px" }} key="1008">
                <CheckboxButton
                    onRef={this.refe10}
                    _onClick={this.handleCheckbox}
                    value={"ZRPL"}
                    id="resortSelect"
                    styleForm="circle"
                    image_src={
                        "https://e-commercepr.s3.amazonaws.com/assets/images/takethenextstep/desktop/ttns-playacar-palace.jpg"
                    }
                    is_checked={this.state.list_checked.indexOf("ZRPL") > -1}
                    text_to_display="Playacar Palace"
                />
            </section>
        );
    }
    parent9() {
        return (
            <section style={{ padding: "10px" }} key="1009">
                <CheckboxButton
                    onRef={this.refe11}
                    _onClick={this.handleCheckbox}
                    value={"ZHBP"}
                    id="resortSelect"
                    styleForm="circle"
                    image_src={
                        "https://e-commercepr.s3.amazonaws.com/assets/images/takethenextstep/desktop/ttns-beach-palace.jpg"
                    }
                    is_checked={this.state.list_checked.indexOf("ZHBP") > -1}
                    text_to_display="Beach Palace"
                />
            </section>
        );
    }
    parent10() {
        return (
            <section style={{ padding: "10px" }} key="1010">
                <CheckboxButton
                    onRef={this.refe12}
                    _onClick={this.handleCheckbox}
                    id="resortSelect"
                    value={"ZHSP"}
                    styleForm="circle"
                    image_src={
                        "https://e-commercepr.s3.amazonaws.com/assets/images/takethenextstep/Take+the+Next+Step/ttns-sun-palace.jpg"
                    }
                    is_checked={this.state.list_checked.indexOf("ZHSP") > -1}
                    text_to_display="Sun Palace"
                />
            </section>
        );
    }

    parent11() {
        return (
            <section style={{ padding: "10px" }} key="1007">
                <CheckboxButton
                    onRef={this.refe9}
                    _onClick={this.handleCheckbox}
                    value={"ZMNI"}
                    id="resortSelect"
                    styleForm="circle"
                    image_src={
                        "https://e-commercepr.s3.amazonaws.com/assets/images/takethenextstep/desktop/ttns-moon-palace-cancun.jpg"
                    }
                    is_checked={this.state.list_checked.indexOf("ZMNI") > -1}
                    text_to_display="Palace Resorts"
                    required={!this.state.list_checked.length > 0}
                />
            </section>
        );
    }
    /** End Resorts  */

    getCountries() {
        api.getCountrybyLang(localStorage.langWeddings)
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
        api.getStatesbyLang(code, this.state.lang_web)
            .then(res => {

                console.log("state sort/lang", res)

                Object.keys(res.data).forEach(function (key) {
                    statec.push([[res.data[key]], key])
                }
                )
                this.setState({
                    states: statec
                })

                let { setData } = this.props.currentPage;
                let { getData } = this.props.currentPage;
                setData('countryAgency', code)
                setData('countryAgencyName', this.selectCountry.current.select.current.querySelectorAll("input")[0].value)

                if (Array.isArray(statec) && statec.length) {
                    this.selectState.current.select.current.querySelectorAll("select")[0].value = statec[0][1];
                    this.selectState.current.select.current.querySelectorAll("input")[0].value = statec[0][0];

                    this.selectState.current.select.current.querySelectorAll("select")[0].removeAttribute("required");
                    this.selectState.current.select.current.querySelectorAll("input")[0].removeAttribute("required");

                    setData('stateAgency', statec[0][1])
                    setData('stateAgencyName', statec[0][0][0])
                } else {
                    this.selectState.current.select.current.querySelectorAll("select")[0].value = "0"
                    this.selectState.current.select.current.querySelectorAll("input")[0].value = "NA";
                    this.selectState.current.select.current.querySelectorAll("select")[0].removeAttribute("required");
                    this.selectState.current.select.current.querySelectorAll("input")[0].removeAttribute("required");
                    setData('stateAgency', "0")
                    setData('stateAgencyName', "N/A")
                }
                this.validateForm()
            }).catch(e => console.error(e));
    }

    chooseState() {
        let code = this.selectState.current.select.current.querySelectorAll("select")[0].value

        let { setData } = this.props.currentPage;

        setData('stateAgency', code)
        setData('stateAgencyName', this.selectState.current.select.current.querySelectorAll("input")[0].value);
        //this.validateForm()
    }

    /*  changeHandler = event => {
          const name = event.target.name;
          const value = event.target.value;
          let { setData } = this.props.currentPage;
          setData(name, value)
          this.validateForm();
      }*/

    changeHandlerTerms = event => {
        const value = event.target.value;
        let { setData } = this.props.currentPage;
        if (JSON.parse(value)) {
            this.setState({
                termsconditions: false
            });
            setData("error_terms", true);
            setData("termsconditions", false);
        } else {
            this.setState({
                termsconditions: true
            });
            setData("error_terms", false);
            setData("termsconditions", true);
        }
        this.validateForm();
    }

    onChange() {
        let { setData } = this.props.currentPage;
        setData("recaptcha", true);
        setData("error_recaptcha", false);

        this.validateForm();
    }

    componentDidMount() {
        if (innerWidth > 1024) {
            setTimeout(() => {
                document.getElementById("landing_main_screen").style = "";
            }, 500)
        }
        landing_main_screen
        this.setState({ color: false })
        switch (localStorage.langWeddings) {
            case "es":
                this.setState({
                    datos2: json['es4'][0],
                    val: 0,
                    deciding: "",
                    sure: "",
                    date: new Date(),
                    fname: "",
                    // valuepk:"",
                    hideDate: { display: "none" }
                });
                break;
        }
        switch (localStorage.langWeddings) {
            case "es":
                this.setState({
                    datos1: json['es5'][0],
                    list_checked: [],
                    primero: "",
                    referService: false,
                    clientAgency: false,
                    weddingSpecialist: false,
                    val: "",
                    email: "",
                    confirm_mail: "",
                    phone: "",
                    norefer: false,
                    norefer2: false,
                    countries: [],
                    states: [],
                    termsconditions: false,
                    lang_web: localStorage.langWeddings == "en" ? "en" : "es",

                    error_resorts: "Seleccione una opción de destino *",
                    error_agency_radios: "Selecciona una opción *",
                    error_agency: "Completa todos los campos del agente de viaje *",
                    error_agency_name: "Rellene los campos de nombre*",
                    error_agency_country: "Rellene los campos del país*",
                    error_agency_agency: "Rellene los campos de la agencia *",
                    error_specialist: "Completa todos los campos del especialista *",
                    error_specialist_radios: "Selecciona una opción *",
                    error_email: "Los correos no coinciden *",
                    error_email_format: "Formato de correo electrónico incorrecto*",
                    error_phone: "Rellene el campo Número de teléfono *",
                    error_phone_format: "Formato de número de teléfono incorrecto (ej, 333-333-3333)",
                    error_refer: "Selecciona una opción *",
                    error_recaptcha: "Rellene el campo Recaptcha *",
                    error_terms: "Acepta Terminos & Condiciones *",
                })
                break;
        }
        const { getData, setData } = this.props.currentPage;
        //setData('mounted', true);
        setData('guests', false)

        if (getData("deciding")) {

            this.setState({ finish: true })

            console.log("fecha: ", getData('celebrationDate'))
            if (getData("deciding") == 1) {
                this.setState({
                    the_date: true,
                    hideDate: { display: "block" },
                    //valuepk : "2020-04-25"
                })

            }
            if (getData("deciding") == 2) {
                this.setState({ the_season: true, hideSeasons: { display: "block" } })
                this.selectSeasons.current.select.current.querySelectorAll("select")[0].value = getData("season_in_mind");
                this.selectSeasons.current.select.current.querySelectorAll("input")[0].value = getData("season_in_mind");
            }
            if (getData("deciding") == 3) {
                this.setState({ the_still: true })
            }
        } else {
            setData('season_in_mind', false);
        }


        this.getCountries();

    }

    validateAgency(to_where) {
        let { setData, getData } = this.props.currentPage;
        if (getData("clientAgency") == "No") {
            return [true, to_where];
        } else {
            let validar_campos = 0;
            if (getData("agencyname") && getData("optiontrfa")) {
                setData("error_agency_name", false)
            } else {
                setData("error_agency_name", true)
                to_where.push("error_agency_name")
                validar_campos = validar_campos + 1;
            }

            if (getData("countryAgency")) {
                setData("error_agency_country", false)
            } else {
                setData("error_agency_country", true)
                to_where.push("error_agency_country")
                validar_campos = validar_campos + 1;
            }

            if (getData("agencyadd") && getData("agencypho")) {
                setData("error_agency_agency", false)
                let agency_number_format = true
                //let agency_number_format = this.validateFormatPhoneAgency()
                if (agency_number_format) {
                    setData("error_phone_agency", false)
                    setData("error_phone_format_agency", false)

                } else {
                    setData("error_phone_agency", true)
                    setData("error_phone_format_agency", true)
                    to_where.push("error_agency_addres")
                }
            } else {
                setData("error_agency_agency", true)
                to_where.push("error_agency_addres")
                validar_campos = validar_campos + 1;
            }
            if (validar_campos == 0) {
                return [true, to_where];
            } else {
                return [false, to_where];
            }
        }
    }

    validateSpecialist(to_where) {
        let { setData, getData } = this.props.currentPage;

        if (getData("weddingSpecialist") == "No") {
            return [true, to_where];
        } else {
            if (getData("fname")) {
                setData("error_specialist", false)
                return [true, to_where];
            } else {
                setData("error_specialist", true)
                to_where.push("specialist_error_name")
                return [false, to_where];
            }
        }
    }



    validateFormatPhone() {
        let { getData, setData } = this.props.currentPage;
        let sPhone = getData('phone')
        if (getData('phone')) {
            setData('error_phone', false);
            var filter = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
            if (filter.test(sPhone)) {
                setData("error_phone_format", false)
                return true;
            }
            else {
                setData("error_phone_format", true)
                return false;
            }
        } else {
            setData('error_phone', true);
            setData("error_phone_format", false)
            return false;
        }
    }

    validateFormatPhoneAgency() {
        let { getData, setData } = this.props.currentPage;
        let sPhone = getData('agencypho')
        if (getData('agencypho')) {
            setData('error_phone_agency', false);
            var filter = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
            if (filter.test(sPhone)) {
                setData("error_phone_format_agency", false)
                return true;
            }
            else {
                setData("error_phone_format_agency", true)
                return false;
            }
        } else {
            setData('error_phone_agency', true);
            setData("error_phone_format_agency", false)
            return false;
        }
    }



    validateFormatMail() {
        let { getData, setData } = this.props.currentPage;
        let sEmail = getData("email");

        var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        if (filter.test(sEmail)) {
            setData("error_email_format", false)
            return true;
        }
        else {
            setData("error_email_format", true)
            return false;
        }


    }


    validateEmail() {

        let { getData, setData } = this.props.currentPage;

        if (getData("email")) {

            let valFormat = this.validateFormatMail();
            if (!valFormat) {
                return false;
            }

            if (getData('confirm_mail')) {
                if (getData("email") != getData("confirm_mail")) {
                    setData('reemail', true);
                    return false;
                } else {

                    setData('reemail', false);
                    return true;
                }
            } else {
                setData('reemail', true);
                return false;
            }
        } else {
            setData('reemail', true);
            return false;
        }
    }

    validateForm(nextbutton = false) {
        let { setData, getData } = this.props.currentPage;
        let to_where = []
        let suma2 = 0
        if (getData("resorts")) {
            let resort_array = getData("resorts")
            console.log("len: ", resort_array.length)
            if (resort_array.length <= 0) {

                if (getData("notsure_resort") && getData("notsure_resort") == true) {
                    setData('error_resorts', false)
                }
                else if (getData("notsure_resort") && getData("notsure_resort") == false) {
                    setData('error_resorts', true)
                    to_where.push("resort_section")
                }
                else {
                    setData('error_resorts', true)
                    to_where.push("resort_section")
                }
            } else {
                setData('error_resorts', false)
            }
        } else {
            if (getData("notsure_resort") && getData("notsure_resort") == true) {
                setData('error_resorts', false)
            }
            else if (getData("notsure_resort") && getData("notsure_resort") == false) {
                setData('error_resorts', true)
                to_where.push("resort_section")
            }
            else {
                setData('error_resorts', true)
                to_where.push("resort_section")
            }
        }

        if (getData("referService")) {
            setData('error_refer', false);
        } else {
            setData('error_refer', true);
            to_where.push("refer_error")
        }

        if (getData("clientAgency")) {
            setData('error_agency_radios', false);
        } else {
            setData('error_agency_radios', true);
            to_where.push("agency_error")
        }
        let validatAgency = this.validateAgency(to_where);
        to_where = validatAgency[1]
        console.log("Validando agencia: ", validatAgency[0])


        if (getData("weddingSpecialist")) {
            setData('error_specialist_radios', false);
        } else {
            setData('error_specialist_radios', true);
            to_where.push("specialist_error")
        }
        let validateSpecialist = this.validateSpecialist(to_where);
        to_where = validateSpecialist[1]
        console.log("Validando specialist: ", validateSpecialist[0])


        let validateEmail = this.validateEmail();
        console.log("Validando email: ", validateEmail)
        if (!validateEmail) {
            to_where.push("email_error")
        }

        let validateFormatPhone = true;
        //let validateFormatPhone = this.validateFormatPhone();
        if (!validateFormatPhone) {
            to_where.push("phone_error")
        }

        if (getData("termsconditions")) {
            setData("error_terms", false)
        } else {
            to_where.push("terms_error")
            setData("error_terms", true)
        }

        if (getData("recaptcha")) {
            setData("error_recaptcha", false);
        } else {
            setData("error_recaptcha", true);
        }

        if (!getData('error_resorts') && !getData("error_refer") && validatAgency[0] && validateSpecialist && validateEmail && validateFormatPhone && getData("termsconditions") && getData("recaptcha")) {
            //if (!getData('error_resorts') && !getData("error_refer") && validatAgency && validateSpecialist && validateEmail &&  validateFormatPhone && getData("termsconditions") && getData("recaptcha")){
            //console.log("return true")
            return true;
        } else {
            console.log("return false", to_where)
            if (nextbutton) {
                this.gotoError(to_where)
            }
            return false;
        }
    }

    gotoError(list) {
        if (list[0] == "error_agency_name") {
            this.timer = setTimeout(() => this.toElement("agency_error", list[0]), 500);
        }
        else if (list[0] == "error_agency_addres") {
            this.timer = setTimeout(() => this.toElement("agency_error", list[0]), 500);
        }
        else if (list[0] == "error_agency_country") {
            this.timer = setTimeout(() => this.toElement("agency_error"), 500);
        }
        else if (list[0] == "specialist_error_name") {
            this.timer = setTimeout(() => this.toElement("specialist_error", list[0]), 500);
        }
        else {
            this.timer = setTimeout(() => this.toElement(list[0]), 500);
        }
    }

    toElement(toElement, otherFocus = "") {
        clearTimeout(this.timer);
        let targetElement = document.querySelector("#" + toElement);
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
        if (toElement == "email_error") {
            this.timer2 = setTimeout(() => this.toFocus("email"), 800);
        }
        if (toElement == "phone_error") {
            this.timer2 = setTimeout(() => this.toFocus("phone"), 800);
        }
        if (otherFocus == "error_agency_name") {
            this.timer2 = setTimeout(() => this.toFocus("agencyname"), 800);
        }
        if (otherFocus == "error_agency_addres") {
            this.timer2 = setTimeout(() => this.toFocus("agencyadd"), 800);
        }
        if (otherFocus == "specialist_error_name") {
            this.timer2 = setTimeout(() => this.toFocus("fname"), 800);
        }
    }

    toFocus(campo) {
        clearTimeout(this.timer2);
        document.getElementById(campo).focus();
    }
    invalidData(e, message) {
        if (e.target.value) {
            e.target.setCustomValidity(message);
        } else {
            e.target.setCustomValidity("");
        }
    }

    handleNext(event) {
        event.preventDefault();
        let valDatas = this.validateForm(true);

        if (valDatas) {
            //this.sendMail()
            api.loginEmail()
                .then(res => {
                    this.sendMail(res.data, true)
                }).catch(e => console.error(e));
        } else {
            console.log("*")
        }

    }
    /****************************** */

    static getDerivedStateFromProps(props, state) {
        let newProps = {};
        Object.keys(props).forEach(key => {
            if (props[key] != state[key]) {
                newProps[key] = props[key];
            }
        });
        return Object.keys(newProps).length > 0 ? newProps : null;
    }

    // [x] El numero maximo de la barra es 100
    // [ ] Si el campo numerico es >= 100, la barra se llena
    // [ ] El valor de la barra debe reflejarse igual en el campo numerico
    // [ ] Mobil: Campo "how many guests" , quitar la leyenda: Just the two of us.
    // [ ]
    // [ ] No mostrar el campo numérico
    // [ ] Cuando se llena a barra, la leyenda dira "+100 guests"
    // [ ] Si la barra no esta llena la leyenda sera: " numero_invitados guests"

    handleChange(val) {


        let value_val = ""
        if (val) {
            value_val = val;
        }

        if (val > 0){
            document.getElementById("notsurResworts").required = false;
        }else {
            document.getElementById("notsurResworts").required = true;
        }

        console.log("val: ", val)

        this.fname.current.value = val == "101" ? "+100" : val;
        this.setState({
            val: value_val
        });
        let { setData } = this.props.currentPage;
        setData('guestNumber', value_val);
        this.validateForm();
    }

    changeHandler(event) {
        let value_val = "";
        const name = event.target.name;
        const value = event.target.value;
        if (value) {
            value_val = value;
        }
        this.setState({
            [name]: value,
            val: value_val > 0 ? value_val : 0
        });
    }

    selectSeasonsChange() {
        let code = this.selectSeasons.current.select.current.querySelectorAll("select")[0].value;
        console.log("code: ", code)
        let { setData } = this.props.currentPage;
        setData("season_in_mind", code);
        this.validateForm();
    }

    handleCheckRadioSure(_value, _id) {
        let { setData } = this.props.currentPage;

        if (_value.target.checked) {

            document.getElementById("fname").required = false;

            setData('notsure', true)
            this.setState({ the_sure: true })
        } else {
            document.getElementById("fname").required = true;
            setData('notsure', false)
            this.setState({ the_sure: false })
        }


        this.validateForm();

    }
    handleCheckRadio_step(_value, _id) {

        let { setData } = this.props.currentPage;
        this.setState({
            the_date: false,
            the_season: false,
            the_still: false
        })



        if (_id == "deciding" && _value == 1) {
            setData("deciding2", "I know the exact date");
            this.setState({
                hideDate: { display: "block" },
                hideSeasons: { display: "none" },
                the_date: true
            });

        } else if (_value == 2) {
            setData("deciding2", "I have a season in mind");
            this.setState({
                hideDate: { display: "none" },
                hideSeasons: { display: "block" },
                the_season: true
            });
        } else {
            setData("deciding2", "I'm still deciding");
            this.setState({
                hideDate: { display: "none" },
                hideSeasons: { display: "none" },
                the_still: true
            });
        }

        this.setState({ [_id]: _value });
        setData(_id, _value);
        this.validateForm();
    }
    handleCheckRadio(_value, _id, _component) {
        let { setData } = this.state.currentPage;
        const who_is_checked = _component ? _component.current.value : _value ? _value : "";
        setData('youAre', who_is_checked)
        this.validateForm()
        this.setState({ who_is_checked });
        let data = this.requiredCheck.current.querySelectorAll(".checkbox > input")
        data.forEach(element => {
            element.removeAttribute("required")
        });
        this.validateForm();
    }

    handleDrops = (param) => {
        this.setState({
            activedroppdown: this.state.activedroppdown == param ? "" : param
        })
    }

    onDateChange(newDate) {
        this.setState({
            selectedDate: DateUtils.formatDate(newDate, 'YYYY') + "-" + DateUtils.formatDate(newDate, 'MM') + "-" + DateUtils.formatDate(newDate, 'DD')
        })
    }

    handleCheckPK(dk) {
        let { getData, setData } = this.props.currentPage;
        setData('celebrationDate', dk);
        setData("format_error", false)
        this.validateForm();
    }

    valFormat = event => {
        const value = event.target.value;
        let formatcorrect = this.validateFormatDate(value)
        let { setData } = this.props.currentPage;
        if (formatcorrect) {
            setData("error_format", false)
            setData('celebrationDate', value);
        } else {
            setData("error_format", true)
        }
        this.validateForm()
    }

    validateFormatDate(value) {
        var filter = /^([12]\d{3})?[-]?(0[1-9]|1[0-2])[-]?(0[1-9]|[12]\d|3[01])$/;
        if (filter.test(value)) {
            return true;
        }
        else {
            return false;
        }
    }

    validateChecks() {
        let { getData } = this.props.currentPage;
        let valor = false;
        if (getData("deciding")) {
            if (getData("deciding") == 1) {
                if (getData("celebrationDate") && !getData("error_format")) {
                    valor = true;
                }
            } else if (getData("deciding") == 2) {
                if (getData("season_in_mind")) {
                    valor = true;
                }
            } else {
                valor = true;
            }
        }
        return valor;
    }

    validateForm() {
        let { setData, getData } = this.props.currentPage;
        let validate = this.validateChecks();


        if (validate) {
            if (getData('notsure') === true) {
                this.setState({ finish: true });
            } else {
                if (getData("guestNumber") > 0) {
                    setData('guests', true)
                    this.setState({ finish: true });
                } else {
                    this.setState({ finish: false });
                }
            }
        } else {
            this.setState({ finish: false });
        }


        setData('formFinish', false);
        if (getData('notsure') === true) {
            this.setState({ finish: true });
        } else {
            if (getData("celebration") == 'Saying "I do"' || getData("celebration") == 'Honeymoon') {
                if (getData("guestNumber") > 0 && validate) {
                    this.setState({ finish: true });
                }
            } else {
                if (getData("guestNumber") > 0 && validate) {
                    this.setState({ finish: true });
                }
            }
        }
    }

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    }
    onSubmit_prop(e) {
        let flag = 0
        e.preventDefault();
        const formData = new FormData(e.target)
        formData.forEach(element => {
            flag++
        });
        if (flag > 0) {
            /*const data = Array.from(formData.entries()).reduce((memo, pair) => ({
                [pair[0]]: pair[1],
            }), {});*/
            this.required(e, 0)
            //console.log(e.target.querySelectorAll("input"))
            let data = this.serealizeForm(e)
            //se muestra la pagina de success
            this.setState({ color: true })
            this.tabone.current.style = "left:-200%;height:0px";
            this.tabtwo.current.style = "left:-200%;height:0px";
            this.tabthree.current.style = "left:-200%;";
            document.querySelector("[component=sliderprincipal]").style = "display:none"
            this.setState({ open_curtain: true, form_data_pro: data })
            scrollTo(0, 0)
            this.setState({ list_checked: [] })
            e.target.reset();
            return data//resultados
        } else {
            this.required(e, 1)

            return false
        }
    }
    serealizeForm(form) {
        let json = []
        let array = form.target.querySelectorAll("input")
        array.forEach((element, index) => {
            if ((element.type == "checkbox" && element.checked) || (element.type == "radio" && element.checked)) {
                if (element.name != "resortSelect") {
                    json.push({ name: element.name, value: element.value })
                }
            }
            if ((element.type == "text" || element.type == "email" || element.type == "tel")) {
                json.push({ name: element.name, value: element.value })
            }
        })
        array = form.target.querySelectorAll("select")
        array.forEach((element, index) => {
            if (element.getAttribute("type") == "select") {
                json.push({ name: element.name, value: element.value })
            }
        })
        json.push({ name: "resortSelect", value: this.state.list_checked })
        return json
    }
    required(event, option) {
        let data = event.target == "" ? event.querySelectorAll("input") : event.target.querySelectorAll("input")
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
        });
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
                if (remov) {
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

    handleNext(event) {

        event.preventDefault();
        const { setData, getData } = this.props.currentPage;
        this.stepContainer.current.classList.remove('animated-fast');
        this.stepContainer.current.classList.remove('slideInRight');
        this.stepContainer.current.classList.add('animated-fastly');
        this.stepContainer.current.classList.add('fadeOut');
        setTimeout(() => {
            const currentStep = getData('currentStep') + 1;
            setData('currentStep', currentStep);
            setData('mounted', false);
        }, 1250);

    }
    formshareOffer(url_share) {
        return (
            <>
                <form ref={this.refForm} onSubmit={this.handleSubmit} style={{ display: this.state.formStatus, paddingTop: "20px" }}>
                    <h2 className="title" style={{ textAlign: "center" }}>{this.props.offer.share}</h2>
                    <div className="inputshare">
                        <Input required type="text" name="name" placeholder={this.props.offer.nameLabel}> </Input>
                        <Input required type="email" name="email" placeholder={this.props.offer.emailLabel}> </Input>
                    </div>
                    <div className="shareButtons container">
                        <Input type="submit" value={this.props.offer.sendLabel}></Input>
                    </div>
                </form>
                <h2 className={"subtitle result_send_mail " + (this.state.send_succe ? "active" : "")}>{localStorage.langWeddings == "en" ? "Thank you for sharing this offer" : "Gracias por compartoir esta oferta"}</h2>
                <div className="separator"></div>
                <div className="throughsocial">
                    <span className="text">{this.props.offer.socialMediaLabel}</span>
                    <TwitterShareButton url={url_share} title={this.props.title_share}>
                        <Iconwedd icon={"twitter-circled"} color={"pink"}></Iconwedd>
                    </TwitterShareButton>
                    <FacebookShareButton url={url_share} quote={this.props.title_share}>
                        <Iconwedd icon={"facebook-circled"} color={"pink"}></Iconwedd>
                    </FacebookShareButton>
                </div>
            </>
        )
    }
    requiredeciding() {
        let selctOne = this.state.deciding == 1 || this.state.deciding == 2 || this.state.deciding == 3
        return !selctOne
    }

    render() {
        let dta = this.props.content
        let dtaDs = this.props.pageds
        let dt2 = this.state.datos2

        const { getData } = this.props.currentPage;
        let heading = this.props.heading
        let steps = this.props.steps
        let form = this.props.form
        let url_share = "https://weddings.palaceresorts.com" + dta.urlShare;
        const html_carusel = dta.carusel.map((element, index) => {
            return (
                <div className="gradient_bar" key={index}>
                    <div className="movil"><Titlesection subtitle={element.titleCarusel} /></div>
                    <div className="contet_carusel">
                        <div style={{ position: "relative", display: "flex" }}>
                            <img alt={element.titleCarusel} src={element.imgDes} className="img_carusel_view1" />
                            <div className="title_banner desktop"><Titlesection subtitle={element.titleCarusel} /></div>
                        </div>
                        <div component="complandingtabs" >
                            <div className="content_slide">
                                <div className="list-slider">
                                    <div page="AmazingCollection">
                                        <article className="list-ulslide">
                                            {HtmlParser(element.listado)}
                                        </article>
                                    </div>
                                </div>
                                <div component={"complandingtabs"} className="movil">
                                    <div className="terms">
                                        <article className="terms-nav1" onClick={() => {
                                            document.getElementById("share_content" + index).style = "height:0px"
                                            document.getElementById("arrow_down_share" + index).style = ""
                                            if (document.getElementById("_temrs_content" + index).offsetHeight == 0) {
                                                document.getElementById("_temrs_content" + index).style = ""
                                                document.getElementById("arrow_down_terms" + index).style = "transform:rotate(180deg)"
                                            } else {
                                                document.getElementById("_temrs_content" + index).style = "height:0px"
                                                document.getElementById("arrow_down_terms" + index).style = ""
                                            }

                                        }}>
                                            <span className="collapselink">{element.terms}&nbsp;
                                            <span id={"arrow_down_terms" + index} className="arrow_down">
                                                    <Iconwedd icon={"chevron-down"} color={"pink"} />
                                                </span>
                                            </span>
                                        </article>
                                        &nbsp;
                                        <article className="terms-nav2" onClick={() => {
                                            document.getElementById("_temrs_content" + index).style = "height:0px"
                                            document.getElementById("arrow_down_terms" + index).style = ""
                                            if (document.getElementById("share_content" + index).offsetHeight <= 5) {
                                                document.getElementById("share_content" + index).style = ""
                                                document.getElementById("arrow_down_share" + index).style = "transform:rotate(180deg)"
                                            } else {
                                                document.getElementById("share_content" + index).style = "height:0px"
                                                document.getElementById("arrow_down_share" + index).style = ""
                                            }

                                        }}>
                                            <span className="collapselink">{element.shareoffer}&nbsp;
                                            <span id={"arrow_down_share" + index} className="arrow_down">
                                                    <Iconwedd icon={"chevron-down"} color={"pink"} />
                                                </span>
                                            </span>
                                        </article>
                                    </div>
                                </div>
                                <div >
                                    <div page="AmazingCollection" className="movil">
                                        <div className="tabstermscontent" id={"_temrs_content" + index} style={{ height: "0px" }}>
                                            <article className="list-ulslide list-temrs" id={"move_scroll_" + index}>
                                                {HtmlParser(element.terms_cont)}
                                            </article>
                                            <div className="fade" id={"fade_ocult" + index}></div>
                                            <div className="tabstermsbuttons movil">
                                                <div className="scroll-control">
                                                    <div onClick={() => {
                                                        let scroll = document.getElementById("move_scroll_" + index)
                                                        scroll.scrollBy(0, -100)
                                                        let limitScroll = (scroll.children[0].getBoundingClientRect().top + scroll.children[0].getBoundingClientRect().height) - (scroll.getBoundingClientRect().bottom)
                                                        if ((limitScroll + 100) < 0) {
                                                            document.getElementById("fade_ocult" + index).style = "height: 0px;"
                                                        } else {
                                                            document.getElementById("fade_ocult" + index).style = ""
                                                        }

                                                    }}><Iconwedd icon={"scroll-up"} color={"pink"} /></div>

                                                    <div onClick={() => {
                                                        let scroll = document.getElementById("move_scroll_" + index)
                                                        scroll.scrollBy(0, 100)
                                                        let limitScroll = (scroll.children[0].getBoundingClientRect().top + scroll.children[0].getBoundingClientRect().height) - (scroll.getBoundingClientRect().bottom)
                                                        if ((limitScroll - 100) < 0) {
                                                            document.getElementById("fade_ocult" + index).style = "height: 0px;"
                                                        } else {
                                                            document.getElementById("fade_ocult" + index).style = ""
                                                        }

                                                    }}><Iconwedd icon={"scroll-down"} color={"pink"} /></div>
                                                </div>
                                            </div>
                                        </div>
                                        <section className="share-content" id={"share_content" + index} style={{ height: "0px" }}>
                                            {this.formshareOffer(url_share)}
                                        </section>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        });
        return (
            <>
                <section className="landing_mains_creenc" style={{ display: this.state.open_curtain ? "view" : "none" }}>
                    <Titlesection description={this.props.pagedesc} />
                </section>
                <section component="Whichpalaceresorts" style={{ height: "0px" }}>
                    <section className={"content-quiz " + (this.state.open_curtain ? "open" : "")}>
                        <img src={"https://e-commercepr.s3.amazonaws.com/assets/images/takethenextstep/desktop/bg-telon-left.jpg"} className="curtain curtain-left" />
                        <img src={"https://e-commercepr.s3.amazonaws.com/assets/images/takethenextstep/desktop/bg-telon-right.jpg"} className="curtain curtain-right" />
                    </section>
                </section>

                <section className="container">
                    <div className="landing_mains_creenc" style={{ display: !this.state.open_curtain ? "view" : "none" }}>
                        <div component="inputwedd" className="head-btn">
                            <span>&nbsp;</span>
                            <a className={"btn " + (!this.state.color ? "white" : "pink")} onClick={(e) => {
                                this.setState({ color: false })
                                this.tabone.current.style = "left:-00%"; this.tabtwo.current.style = "left:00%;height:0px";
                            }
                            }>{dta.button1}</a>
                            <span>&nbsp;&nbsp;</span>
                            <a className={"btn " + (this.state.color ? "white" : "pink")} onClick={(e) => {
                                this.setState({ color: true })
                                this.tabone.current.style = "left:-100%;height:0px"; this.tabtwo.current.style = "left:-100%";
                            }}>{dta.button2}</a>
                            <span>&nbsp;</span>
                        </div>

                        <div style={{ width: "max-content", margin: "auto" }}>
                            <div class="module-border-wrap"><div className="module" ></div></div>
                        </div>
                    </div>

                    <section className="body_content_view contaie">
                        {/*<!--------------------------------------->*/}
                        <section ref={this.tabone} className="views" style={{ left: "00%" }}>
                            <div className="landing_mains_creenc">
                                <Titlesection title={dta.title} description={dta.description2} />
                                <Sliders nameSlide={"landing_main_screen"}>
                                    {html_carusel}
                                </Sliders>

                                <section component="complandingtabs" className="desktop">
                                    <section className="gardien_bar">
                                        <section className="terms">
                                            <div className="group">
                                                <article className={"terms-nav1 " + (this.state.terms_opn ? "active_term_share" : "")}>
                                                    <span className="collapselink" onClick={() => {
                                                        this.setState({ terms_opn: this.state.terms_opn ? false : true, share_open: false, })
                                                    }
                                                    }>{dta.terms}&nbsp;<Iconwedd icon={"chevron-down"} color={"pink"} /></span>
                                                </article>
                                                <article className={"terms-nav2 " + (this.state.share_open ? "active_term_share" : "")}>
                                                    <span className="collapselink" onClick={() => { this.setState({ terms_opn: false, share_open: this.state.share_open ? false : true, }) }}>{dta.shareoffer}</span>&nbsp;<Iconwedd icon={"chevron-down"} color={"pink"} />
                                                </article>
                                            </div>
                                        </section>
                                        <section className={"desktop"}>
                                            <section className="terms-content_desk" style={this.state.terms_opn ? { height: "auto" } : {}}>
                                                <div className="tabstermscontent desktop" id={"tabstermscontent_desk"}>
                                                    {HtmlParser(dta.carusel[0].terms_cont)}
                                                </div>
                                            </section>
                                            <section className="share_desk" style={this.state.share_open ? { height: "auto" } : {}}>
                                                <section className="share-content " id={"share_content"}>
                                                    {this.formshareOffer(url_share)}
                                                </section>
                                            </section>
                                            <div style={{ marginBottom: "60px" }}></div>
                                        </section>
                                    </section>

                                </section>

                                <div component="inputwedd" style={{ width: "max-content", margin: "auto" }}>
                                    <span><input className="btn type pink " type="submit" id="" name="" value="Start Proposal"
                                        onClick={() => {
                                            let top = this.tabone.current.getBoundingClientRect().top
                                            document.querySelector("html").style = "scroll-behavior: smooth;"
                                            scrollTo(0, top < 0 ? -top : top)
                                            this.tabone.current.style = "left:-100%;height:0px"; this.tabtwo.current.style = "left:-100%";
                                            this.setState({ color: true })
                                        }
                                        } /></span>
                                </div>
                            </div>
                        </section>
                        {/*<!--------------------------------------->*/}
                        <section ref={this.tabtwo} className="views" style={{ left: "00%", height: "0px" }}>

                            <Titlesection title={dta.title} description={dtaDs.description} />

                            <form onSubmit={(e) => { this.onSubmit_prop(e) }}>
                                <div page="NextStep">
                                    {/*------------------------------Step4--------------------------------*/}
                                    <article className="item-form-container animated-fast" ref={this.stepContainer}>
                                        <div className={"container-margin-top"}>
                                            <div component="grid-x">
                                                <div component="cell" small="1" medium="2" large="2"></div>
                                                <div component="cell" small="10" medium="8" large="8">
                                                    <div component="grid-x">

                                                        <div component="cell">
                                                            <section className="bg-gray ">
                                                                <div className="">
                                                                    <Titlesection subtitle={dtaDs.title} />
                                                                </div>
                                                                <div component="grid-x">
                                                                    <div component="cell" small="2" medium="1" large="1"></div>
                                                                    <div component="cell" small="8" medium="10" large="10">
                                                                        <div component="grid-x" style={{ textAlign: "initial" }}>
                                                                            <div component="cell" small="12" large="4">
                                                                                <div component="grid-x">
                                                                                    <div component="cell" small="12">
                                                                                        <CheckboxButton
                                                                                            _onClick={this.handleCheckRadio_step}
                                                                                            id="deciding"
                                                                                            value={1}
                                                                                            is_checked={this.state.deciding == 1}
                                                                                            has_image={false}
                                                                                            text_to_display={dt2.exact_date}
                                                                                            is_checked={this.state.the_date}
                                                                                            required={this.requiredeciding()}
                                                                                        />
                                                                                    </div>
                                                                                    {/** input fechas */}
                                                                                    <div component="cell" small="12">
                                                                                        <label className="input-error">{getData('error_format') && this.state.error_format}</label>
                                                                                    </div>


                                                                                    <div component="cell" small="12">
                                                                                        <div style={this.state.hideDate} >
                                                                                            <DatePK
                                                                                                placeholder={this.state.datos1.place_holder_date}
                                                                                                value={this.state.valuepk}
                                                                                                checked={"0"}
                                                                                                //_onClick={this.handleCheckPK}
                                                                                                _active={this.state.vsual}
                                                                                                _returnChange={(e) => this.handleCheckPK(e)}
                                                                                                handleKeyPress={this.valFormat}
                                                                                                required={this.state.deciding == 1}
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>

                                                                            </div>
                                                                            <div component="cell" small="12" large="4">
                                                                                <div component="grid-x">
                                                                                    <div component="cell" small="12">
                                                                                        <CheckboxButton
                                                                                            _onClick={this.handleCheckRadio_step}
                                                                                            id="deciding"
                                                                                            value={2}
                                                                                            is_checked={this.state.deciding == 2}
                                                                                            has_image={false}
                                                                                            text_to_display={dt2.season}
                                                                                            is_checked={this.state.the_season}
                                                                                            required={this.requiredeciding()}
                                                                                        />
                                                                                    </div>
                                                                                    <div component="cell" small="12" style={this.state.hideSeasons} >
                                                                                        <Input type={"select"}
                                                                                            id="seasons"
                                                                                            name="seasons"
                                                                                            placeholder={dt2.place_holder}
                                                                                            ref={this.selectSeasons}
                                                                                            data={dt2.seasons}
                                                                                            onchange={this.selectSeasonsChange}
                                                                                            required={this.state.deciding == 2}
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div component="cell" small="12" large="4">
                                                                                <CheckboxButton
                                                                                    _onClick={this.handleCheckRadio_step}
                                                                                    id="deciding"
                                                                                    value={3}
                                                                                    is_checked={this.state.deciding == 3}
                                                                                    has_image={false}
                                                                                    text_to_display={dt2.deciding}
                                                                                    is_checked={this.state.the_still}
                                                                                    required={this.requiredeciding()}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div component="cell" small="12" medium="1" large="1"></div>
                                                                </div>
                                                            </section>
                                                        </div>

                                                        <div component="cell" style={{ display: "display" }}>
                                                            <div className="content-text-padding-10-10"></div>
                                                            <div>
                                                                <Titlesection color="pink" subtitle={dt2.many_guest} classAdd={"step2title"} />
                                                            </div>
                                                            <div component="grid-x">
                                                                <div component="cell">
                                                                    <div component="grid-x" className={"_display-activate-inactive"}>
                                                                        <div component="cell" medium="2" large="2"></div>
                                                                        <div component="cell" small="5" medium="5" large="5" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                                            <label className="labelInput">
                                                                                {dt2.number_guest}
                                                                            </label>
                                                                        </div>
                                                                        <div component="cell" small="2" medium="3" large="2">
                                                                            <div ref={this.props.InputonRef} >

                                                                                <Input
                                                                                    type={"text"}
                                                                                    placeholder={"0"}
                                                                                    refInput={this.fname}
                                                                                    id={"fname"}
                                                                                    value={dt2.fname}
                                                                                    name={"fname"}
                                                                                    onClick={this.handleClick}
                                                                                    changeHandler={this.changeHandler}
                                                                                    handleKeyPress={this.handleKeyPress}
                                                                                    required
                                                                                />

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div component="grid-x" className={"_display-inactive-activate"}>
                                                                        <div component="cell">
                                                                            <label className="labelInput ">{((this.state.val != "101") ? (this.state.val) : "+100") + " " + dt2.guests}</label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/** Scroll input flower */}
                                                        <div component="cell" style={{ "padding": "15px 0", display: "display" }}>
                                                            <div component="grid-x">
                                                                <div component="cell" small="1" medium="2" large="3"></div>
                                                                <div component="cell" small="10" medium="8" large="6">
                                                                    {<InputRange
                                                                        minValue={0}
                                                                        maxValue={101}
                                                                        value={this.state.val}
                                                                        linercolor={{ active: "#F26193", inactive: "#dbdbdb" }}
                                                                        identify={false}
                                                                        refInput={this.fname}
                                                                        _onChange={x => {
                                                                            this.handleChange(x);
                                                                        }}
                                                                    />}
                                                                </div>
                                                                <div component="cell" small="1" medium="2" large="3"></div>
                                                            </div>
                                                        </div>
                                                        {/** input "I'm not sure" */}
                                                        <div component="cell" style={{ display: "display" }}>
                                                            <div component="grid-x">
                                                                <div component="cell" small="3" medium="1" large="1"></div>
                                                                <div component="cell" small="6" medium="10" large="10">
                                                                    <div style={{ width: "max-content", margin: "auto" }}>
                                                                        <Input
                                                                            type={"checkbox"}
                                                                            styleForm={"filledcircle"}
                                                                            name="notsurResworts"
                                                                            id="notsurResworts"
                                                                            className="notsur"
                                                                            title={localStorage.langWeddings === "es" ? "No estoy seguro" : "I'm not sure"}
                                                                            click={this.handleCheckRadioSure}
                                                                            checked={this.state.the_sure}
                                                                            ref={this.notsureCheck}

                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div component="cell" small="3" medium="1" large="1"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div component="cell" small="1" medium="2" large="2"></div>
                                            </div>
                                        </div>
                                    </article>
                                    {/*--------------------------------------------------------------*/}
                                    {/*------------------------------Step5--------------------------------*/}
                                    <article className="item-form-container animated-fast slideInRight bg-gray" ref={this.stepContainer}>
                                        <div className={"container-margin-top slider_content"}>
                                            <div className="content-text-padding-10-10" id="resort_section">
                                                <Titlesection color="pink" subtitle={this.state.datos2.title} classAdd={"step2title"} />
                                            </div>
                                            <div component="grid-x">
                                                <div component="cell">
                                                    <div component="grid-x">
                                                        <div component="cell" medium="2" large="1"></div>
                                                        <div component="cell" small="12" medium="8" large="10">
                                                            <div className={"content-text-padding-10-10 margin_top"}>
                                                                <label className="labelInput aln_text" >
                                                                    {
                                                                        this.state.web_form == "take-next-step" ? this.state.datos1.title_resorts : this.state.datos1.title_resorts2
                                                                    }
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div component="cell" medium="2" large="1"></div>
                                                        <div component="cell" medium="2" large="4"></div>
                                                        <div component="cell" small="12" medium="4" large="4">
                                                            <label className="input-error">{getData('error_resorts') && this.state.error_resorts}</label>
                                                        </div>
                                                        <div component="cell" medium="4" large="4"></div>
                                                    </div>
                                                </div>
                                                <div component="cell">
                                                    <div component="grid-x">
                                                        <div component="cell" small="1" medium="2" large="2"></div>
                                                        <div component="cell" small="12" medium="8" large="8">
                                                            {this.state.web_form == "take-next-step" ?
                                                                <Sliders nameSlide={"events"} viewItems={1}>
                                                                    {this.parent1()}
                                                                    {this.parent6()}
                                                                    {this.parent7()}
                                                                    {this.parent2()}
                                                                    {this.parent5()}
                                                                    {this.parent8()}
                                                                    {this.parent9()}
                                                                    {this.parent3()}
                                                                    {/*{this.parent4()}*/}
                                                                    {this.parent10()}
                                                                </Sliders>
                                                                :
                                                                <Sliders nameSlide={"events"} viewItems={1}>

                                                                    {this.parent11()}
                                                                    {this.parent1()}
                                                                    {this.parent5()}
                                                                    {this.parent2()}
                                                                </Sliders>
                                                            }
                                                        </div>
                                                        <div component="cell" small="1" medium="2" large="2"></div>
                                                    </div>
                                                    {/** I'm not sure */}
                                                    <div component="cell">
                                                        <div component="grid-x">
                                                            <div component="cell" small="3" medium="2" large="3"></div>
                                                            <div component="cell" small="6" medium="8" large="6" style={{ marginTop: "20px" }}>
                                                                <div style={{ width: "max-content", margin: "auto" }}>
                                                                    <Input
                                                                        type={"checkbox"}
                                                                        styleForm={"filledcircle"}
                                                                        name="notSureWhenIs"
                                                                        id="notsur"
                                                                        className="notsur"
                                                                        title={localStorage.langWeddings === "es" ? "No estoy seguro" : "I'm not sure"}
                                                                        click={this.handleCheckRadioSure}
                                                                        checked={this.state.the_sure}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div component="cell" small="1" medium="2" large="3" id="refer_error"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </article>
                                    {/*--------------------------------------------------------------*/}
                                </div>

                                {/*---------------------------Quiz_finish-----------------------------------*/}
                                <section page="quizresorts" >
                                    <div className="main-title form-finish">
                                        <div className="content-form --container-small">
                                            <Titlesection title={heading.titlePage} />{/*description={heading.subtitlePage} */}

                                        </div>
                                    </div>

                                    <div className="dreams">
                                        <div className="content container">
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
                                                                id={"seeTheWedding"}
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
                                                                id={"seeTheWedding"}
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
                                                                id={"seeTheWedding"}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div component="cell" small="1" medium="2" large="2"></div>
                                            </div>
                                        </div>
                                        {/**/}
                                        <div component="contactus" >
                                            <div className="back-ground">
                                                <div className="container contact-head-form-finish">
                                                    <div className="inline-input">
                                                        <div className="group-input">
                                                            <div className="name-input">
                                                                <Input changeHandler={this.changeHandler} required type={"text"} text={form.labelInput1} placeholder={form.labelPlaceHold1} id={"firstname"} name={"firstname"} />
                                                                <Input changeHandler={this.changeHandler} required type={"text"} text={"jump"} placeholder={form.labelPlaceHold1_} id={"lastname"} name={"lastname"} />
                                                            </div>
                                                        </div>
                                                        <div className="group-input">
                                                            <div className="name-input">
                                                                <Input required type={"select"} placeholder={form.labelPlaceHold2} text={form.labelInput2} data={this.state.countries} id={"country"} name={"country"} ref={this.selectCountry} onchange={this.chooseCountry} />
                                                                <Input required selectDefault={1} type={"select"} placeholder={form.labelPlaceHold2_} text={"jump"} data={this.state.states} id={"state"} name={"state"} ref={this.selectState} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="inline-input  email-reply">
                                                        <div className="group-input">
                                                            <Input type={"tel"} text={form.labelInput4} required changeHandler={this.changeHandler} placeholder={form.labelPlaceHold4} id={"phoneNumber"} name={"phoneNumber"} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                {/*--------------------------------------------------------------*/}
                                <div component="inputwedd" className="head-btn" style={{ width: "max-content", margin: "auto" }}>
                                    <button className="btn pink" >{localStorage.langWeddings == "en" ? "Send Request" : "Send Request"}</button>
                                </div>
                            </form>
                        </section>
                        {/*<!--------------------------------------->*/}
                        <section ref={this.tabthree} className="views" style={{ left: "00%", height: "0px" }}>
                            <section component="Whichpalaceresorts">

                                <section className={"content-quiz " + (this.state.open_curtain ? "open" : "")}>
                                    <section className="content_success">
                                        <section style={{ textTransform: "capitalize" }}><Titlesection title={this.props.thankyou.title + ", <br/>" + this.state.firstname} /></section>
                                        <section>
                                            <br />
                                            <Titlesection description={this.props.thankyou.description} />

                                            <Titlesection subtitle={this.props.thankyou.pl} />

                                            <Titlesection description={this.props.thankyou.atention} />
                                        </section>

                                    </section>
                                </section>
                                <Nowdream data={this.props.Nowdream} />
                                <Sweptaway data={this.props.Nowdream} />

                            </section>
                        </section>
                    </section>
                </section>
            </>
        );
    }
}
//onSubmit_prop(e) meotodo donde estan los resultados
export default Landingmainscreenc;

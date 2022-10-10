/*
Consume correo, hub spot, y crm
*/

import React, { Component, createRef } from "react";
import ReactDOMServer from 'react-dom/server';
import CheckboxButton from "../../../components/clever/checkbox/index";
import Sliders from "../../../components/sliders";
import { Input } from "../../../components/wirefragment";
import WizStep from '../wizard/controls/wizbutton';
import WithContext from "../../../app/Context";
import api from '../../../app/index';
import ReactHtmlParser from 'react-html-parser';
import ReCAPTCHA from "react-google-recaptcha"
import json from "./data_1";
import { Titlesection } from '../../../components/wirefragment';
import { withRouter } from "react-router-dom"

class StepFive extends Component {
    constructor(props) {
        super(props);
        const { getData } = this.props.app.currentPage;
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
            norefer: getData('clientAgency') == "Yes" ? true : false,
            norefer2: getData('weddingSpecialist') == "Yes" ? true : false,
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
            error_member: "Select an option *",
            error_recaptcha: "Fill the Recaptcha field *",
            error_terms: "Accept terms & conditions *",
            disabled: true,
            the_sure: getData('notsure_resort') ? true : false,
            refer_yes: getData('referService') == "Yes" ? true : false,
            refer_no: getData('referService') == "No" ? true : false,
            agency_yes: getData('clientAgency') == "Yes" ? true : false,
            agency_no: getData('clientAgency') == "No" ? true : false,
            member_yes: getData('member') == "Yes" ? true : false,
            member_no: getData('member') == "No" ? true : false,
            member_member: getData('member') == "Member" ? true : false,
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
        this.stepContainer = createRef();

        this.handleCheckbox = this.handleCheckbox.bind(this);
        this.handleCheckRadioSure = this.handleCheckRadioSure.bind(this);
        this.sendMail = this.sendMail.bind(this);
        this.htmlDisplay = this.htmlDisplay.bind(this);

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
        this.changeHandlerPhone = this.changeHandlerPhone.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.validateAgency = this.validateAgency.bind(this);
        this.agency = this.agency.bind(this)
        this.validateSpecialist = this.validateSpecialist.bind(this);
        this.sendHubspot = this.sendHubspot.bind(this)
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
        let { setData } = this.props.app.currentPage;
        if (_value.target.checked) {
            setData('notsure_resort', true)
        } else {
            setData('notsure_resort', false);
        }
        setData('error_resorts', false);
    }

    agency(_value, _id) {

        let { setData } = this.props.app.currentPage;

        if (_value.target.name == "referService") {
            setData('error_refer', false);
        }

        if (_value.target.name == "member") {
            setData('error_member', false);
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

            let { getData, setData } = this.props.app.currentPage;
                const list_checked2 = []
                list_checked2.push(_value)
                this.setState({ list_checked: list_checked2 });
                let resorts =[];
                resorts.push(_value)

                setData("resorts", resorts);

                if (_value == "ZMNI") {
                    this.setState({
                        seasons: false
                    })
                }else {
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
            let { setData } = this.props.app.currentPage;
            let { getData } = this.props.app.currentPage;
            let resorts = getData("resorts") != null ? getData("resorts") : [];
            if (resorts.indexOf(_value) >= 0) {

                let index = resorts.indexOf(_value);
                if (index !== -1) resorts.splice(index, 1);

            } else {

                resorts.push(_value);
            }

            if (resorts.length > 0) {
                setData('error_resorts', false);
            } else {
                setData('error_resorts', true);
            }
            setData("resorts", resorts);
        }

        //this.validateForm();
    }

    /** Resorts  */
    parent1() {
        return (
            <section style={{ padding: "10px" }} key="1001">
                <CheckboxButton
                    onRef={this.refe3}
                    _onClick={this.handleCheckbox}
                    value={"ZCJG"}
                    styleForm="circle"
                    image_src={
                        "https://e-commercepr.s3.amazonaws.com/assets/images/takethenextstep/desktop/ttns-moon-palace-jamaica.jpg"
                    }
                    is_checked={this.state.list_checked.indexOf("ZCJG") > -1}
                    text_to_display="Moon Palace Jamaica"
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
                    value={"ZHLB"}
                    styleForm="circle"
                    image_src={
                        "https://e-commercepr.s3.amazonaws.com/assets/images/takethenextstep/desktop/ttns-le-blanc-cancun.jpg"
                    }
                    is_checked={this.state.list_checked.indexOf("ZHLB") > -1}
                    text_to_display="Le Blanc Spa Resort Cancun"
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
                    value={"ZPLB"}
                    styleForm="circle"
                    image_src={
                        "https://e-commercepr.s3.amazonaws.com/assets/images/takethenextstep/Take+the+Next+Step/ttns-le-blanc-los-cabos.jpg"
                    }
                    is_checked={this.state.list_checked.indexOf("ZPLB") > -1}
                    text_to_display="Le Blanc Spa Resort Los Cabos"
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
                    styleForm="circle"
                    image_src={
                        "https://e-commercepr.s3.amazonaws.com/assets/images/takethenextstep/desktop/ttns-moon-palace-cancun.jpg"
                    }
                    is_checked={this.state.list_checked.indexOf("ZMNI") > -1}
                    text_to_display="Palace Resorts"
                />
            </section>
        );
    }
    /** End Resorts  */

    getCountries() {
        api.getCountrybyLang(this.state.lang_web)
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



                Object.keys(res.data).forEach(function (key) {
                    statec.push([[res.data[key]], key])
                }
                )
                this.setState({
                    states: statec
                })

                let { setData } = this.props.app.currentPage;
                let { getData } = this.props.app.currentPage;
                let { removeData } = this.props.app.currentPage;

                setData('countryAgency', code)
                setData('countryAgencyName', this.selectCountry.current.select.current.querySelectorAll("input")[0].value)

                if (Array.isArray(statec) && statec.length) {
                    this.selectState.current.select.current.querySelectorAll("select")[0].value = "";
                    this.selectState.current.select.current.querySelectorAll("input")[0].value = "";
                    removeData('stateAgency');
                    removeData('stateAgencyName');
                } else {
                    this.selectState.current.select.current.querySelectorAll("select")[0].value = "0"
                    this.selectState.current.select.current.querySelectorAll("input")[0].value = "NA";
                    setData('stateAgency', "0")
                    setData('stateAgencyName', "N/A")
                }
                //this.validateForm()
            }).catch(e => console.error(e));
    }

    chooseState() {
        let code = this.selectState.current.select.current.querySelectorAll("select")[0].value

        let { setData } = this.props.app.currentPage;

        setData('stateAgency', code)
        setData('stateAgencyName', this.selectState.current.select.current.querySelectorAll("input")[0].value);
        //this.validateForm()
    }

    changeHandler = event => {
        const name = event.target.name;
        const value = event.target.value;
        let { setData } = this.props.app.currentPage;
        setData(name, value)
        //this.validateForm();
    }

    changeHandlerPhone = e => {
        const re = /^[0-9\b]+$/;

        let { setData, getData } = this.props.app.currentPage;
        let oldData = getData('phone');
        // if value is not blank, then test the regex
        let $this = this
        if (e.target.value === '' || re.test(e.target.value)) {
            console.log(e.target.value);

            setData("phone", e.target.value)
            return true
        }else{
            e.target.value = oldData || ""
        }
    }

    changeHandlerTerms = event => {
        const value = event.target.value;
        let { setData } = this.props.app.currentPage;
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
        // this.validateForm();
    }

    onChange() {
        let { setData } = this.props.app.currentPage;
        setData("recaptcha", true);
        setData("error_recaptcha", false);

        //this.validateForm();
    }

    componentDidMount() {
        let { getData, setData } = this.props.app.currentPage;
        const { match: { params } } = this.props;
        const { match: { url } } = this.props;
        switch (params.lang) {
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
                    lang_web: params.lang == "en" ? "en" : "es",

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
                    error_member: "Selecciona una opción *",
                    error_recaptcha: "Rellene el campo Recaptcha *",
                    error_terms: "Acepta Terminos & Condiciones *",
                })
                break;
        }

        if(getData('youAre')!="Helpful Friend/Planner/Travel Advisor"){
        this.selectCountry.current.select.current.querySelectorAll("select")[0].value = this.state.country_code
        this.selectCountry.current.select.current.querySelectorAll("input")[0].value = this.state.country_name

        this.selectState.current.select.current.querySelectorAll("select")[0].value = this.state.state_code
        this.selectState.current.select.current.querySelectorAll("input")[0].value = this.state.state_name
        }
        if (url == "/en/offers/preview-paradise/take-next-step" || url == "/es/ofertas/conoce-el-paraiso/da-el-siguiente-paso") {
            this.setState({ web_form: "take-next-step-paradise" })
        } else {
            this.setState({ web_form: "take-next-step" })
        }



        //setData('mounted', true);
        this.getCountries();

        this.setState({lang:params.lang})
        if(getData('youAre')=="Helpful Friend/Planner/Travel Advisor"){
            setData("countryAgency",getData('country'));
            setData("countryAgencyName",getData('countryName'));
            setData("stateAgency",getData('state'));
            setData('stateAgencyName',getData('stateName'));
        }
        setData("resorts",getData("resorts")?getData("resorts"):[]);
    }

    validateAgency(to_where) {
        let { getData, setData } = this.props.app.currentPage;
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

            if (getData("agencyadd") && getData("agencypho") && getData("agencycity") && getData("agencyzip") ) {
                setData("error_agency_agency", false)
                let agency_number_format = this.validateFormatPhoneAgency()
                //let agency_number_format = true
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
        let { setData, getData } = this.props.app.currentPage;

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
        let { getData, setData } = this.props.app.currentPage;
        let sPhone = getData('phone')
        console.log(sPhone);
        if (getData('phone')) {
            setData('error_phone', false);
            //var filter = /^[0-9\b]+$/;
            //if (filter.test(sPhone)) {
            if (sPhone.length >= 9) {
                console.log("limpando bandera");
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
        let { getData, setData } = this.props.app.currentPage;
        let sPhone = getData('agencypho')
        if (getData('agencypho')) {
            setData('error_phone_agency', false);
            //var filter = /^\(?\d{3}\)?[-]?(\d{3})[-]?(\d{4})$/;
            //if (filter.test(sPhone) && sPhone.length == 12) {
            if (sPhone.length >= 9) {
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
        let { getData, setData } = this.props.app.currentPage;
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

        let { getData, setData } = this.props.app.currentPage;

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

        let { setData, getData } = this.props.app.currentPage;


        let to_where = []
        let suma2 = 0




        if (getData("resorts")) {
            let resort_array = getData("resorts")

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

        if (getData("member")) {
            setData('error_member', false);
        } else {
            setData('error_member', true);
            to_where.push("refer_member")
        }

        if (getData("clientAgency")) {
            setData('error_agency_radios', false);
        } else {
            setData('error_agency_radios', true);
            to_where.push("agency_error")
        }
        let validatAgency = this.validateAgency(to_where);
        to_where = validatAgency[1]



        if (getData("weddingSpecialist")) {
            setData('error_specialist_radios', false);
        } else {
            setData('error_specialist_radios', true);
            to_where.push("specialist_error")
        }
        let validateSpecialist = this.validateSpecialist(to_where);
        to_where = validateSpecialist[1]



        let validateEmail = this.validateEmail();

        if (!validateEmail) {
            to_where.push("email_error")
        }

        let validateFormatPhone =  this.validateFormatPhone();
        //let validateFormatPhone =  true;

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

        if (!getData('error_resorts') && !getData("error_refer") && !getData("error_member") && validatAgency[0] && validateSpecialist && validateEmail && validateFormatPhone && getData("termsconditions") && getData("recaptcha")) {
            //if (!getData('error_resorts') && !getData("error_refer") && validatAgency && validateSpecialist && validateEmail &&  validateFormatPhone && getData("termsconditions") && getData("recaptcha")){
            //console.log("return true")
            return true;
        } else {

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

        document.querySelector(".btnCnt").style.transition = "1s";
        document.querySelector(".btnCnt").style.opacity = "0";
        document.querySelector(".finish").disabled = true;

        let { getData, setData } = this.props.app.currentPage;

        let telefono2 = getData("phone") ? getData("phone") : "";
        telefono2 = telefono2.replace(/-/g,"")

        let telefono_agencia2 = getData("agencypho") ? getData("agencypho") : "";
        telefono_agencia2 = telefono_agencia2.replace(/-/g,"")

        let obj = {
            proposito_de_reunion: getData("celebration") ? getData("celebration") : "",
            tipo_contacto: getData("youAre") ? getData("youAre") : "",
            nombre_contacto: getData("contactName") ? getData("contactName") : "",
            apellido_contacto: getData("contactLastname") ? getData("contactLastname") : "",
            pais: getData("country") ? getData("country") : "",
            //getData("countryName")
            estado: getData("state") ? getData("state") : "",
            //getData("stateName")
            nombre_novia: getData("brideFirstName") ? getData("brideFirstName") : "",
            apellido_novia: getData("brideLastName") ? getData("brideLastName") : "",
            nombre_novio: getData("groomeFirstName") ? getData("groomeFirstName") : "",
            apellido_novio: getData("groomeLastName") ? getData("groomeLastName") : "",
            fecha_ceremonia: getData("deciding2") ? getData("deciding2") : "",
            fecha_propuesta: getData("celebrationDate") ? getData("celebrationDate") : "",
            invitados_huespedes: getData("guests") ? getData("guests") : "",
            numero_de_asistentes: getData("guestNumber") ? getData("guestNumber") : "",
            season_in_mind: getData("season_in_mind") ? getData("season_in_mind") : "",
            destination_get_married: getData("resorts").length > 0 ? getData("resorts")[0] : "",
            otros_destination_get_married: getData("resorts").length > 0 ? getData("resorts") : "",
            destination_not_sure: getData("notsure_resort") ? "YES" : "NO",
            is_lead_refered: getData("referService") ? getData("referService") : "",
            es_agencia: getData("clientAgency") ? getData("clientAgency") : "",
            nombre_agencia: getData("agencyname") ? getData("agencyname") : "",
            iata_agencia: getData("optiontrfa") ? getData("optiontrfa") : "",
            direccion_agencia: getData("agencyadd") ? getData("agencyadd") : "",
            telefono_agencia: telefono_agencia2,
            pais_agencia: getData("countryAgency") ? getData("countryAgency") : "",
            //pais_agencia_name: getData("countryAgencyName") ? getData("countryAgencyName") : "",
            estado_agencia: getData("stateAgency") ? getData("stateAgency") : "",
            //estado_agencia_name: getData("stateAgencyName") ? getData("stateAgencyName") : "",
            ciudad_agencia: getData("agencycity") ? getData("agencycity") : "",
            zip_agencia : getData("agencyzip") ? getData("agencyzip") : "",
            wedding_specialist: getData("weddingSpecialist") ? getData("weddingSpecialist") : "",
            especialist: getData("fname") ? getData("fname") : "",
            correo: getData("email") ? getData("email") : "",
            miembro_palace_resrots : getData("member") == "No" ? "No" : "YES",
            telefono: telefono2,
            accept_terms_conditions: getData("termsconditions") ? getData("termsconditions") : "",
            accept_privacy_notice: getData("termsconditions") ? getData("termsconditions") : "",
            items_whishlist: getData("items_wish") ? getData("items_wish") : "N/A",
            idioma: "en",
            formulario: getData("celebration") == "Honeymoon" ? "honeymoon" : this.state.web_form,

        }

        this.sendHubspot(obj)
        this.sendCRM(obj)

            api.loginEmail()
                .then(res => {
                    this.sendMail(res.data, obj)
                }).catch(e => console.error(e));
        } else {
            console.log("*")
        }

    }


    async sendHubspot(obj) {
        let { getData } = this.props.app.currentPage;
        let { match: { params } } = this.props;


        var text = ""
        try {
            var response = await fetch('https://api.ipify.org');
            text = await response.text();
        }
        catch { console.log("") }

        let id_form = "";

        if (params.lang == "en"){
            id_form = "5e45fd61-030e-4b41-91d7-1511e7124486";
        }else {
            id_form = "eec44835-2f6f-4dab-8399-435fa0e40a4d";
        }

        var querystring = require('querystring');
        var postData = querystring.stringify({
            interested_in: getData("celebration") ? getData("celebration") : "",
            tipo_contacto: getData("youAre") ? getData("youAre") : "",
            firstname: getData("contactName") ? getData("contactName") : "",
            lastname: getData("contactLastname") ? getData("contactLastname") : "",
            country: getData("country") ? getData("country") : "",
            //getData("countryName")
            estado: getData("state") ? getData("state") : "",
            //getData("stateName")
            nombre_novia: getData("brideFirstName") ? getData("brideFirstName") : "",
            apellido_novia: getData("brideLastName") ? getData("brideLastName") : "",
            groom_first_name: getData("groomeFirstName") ? getData("groomeFirstName") : "",
            groom_last_name: getData("groomeLastName") ? getData("groomeLastName") : "",
            fecha_ceremonia: getData("deciding2") ? getData("deciding2") : "",
            fecha_propuesta: getData("celebrationDate") ? getData("celebrationDate") : "",
            inviting_guests: getData("guests") ? getData("guests") : "",
            how_many_guests: getData("guestNumber") ? getData("guestNumber") : "",
            season_in_mind: getData("season_in_mind") ? getData("season_in_mind") : "",
            destination_get_married: getData("resorts").length > 0 ? getData("resorts")[0] : "",
            otros_destination_get_married: getData("resorts").length > 0 ? getData("resorts") : "",
            destination_not_sure: getData("notsure_resort") ? "YES" : "NO",
            is_lead_refered: getData("referService") ? getData("referService") : "",
            is_travel_agent: getData("clientAgency") ? getData("clientAgency") : "",
            name_travel_agents: getData("agencyname") ? getData("agencyname") : "",
            iata_true_travel_agent: getData("optiontrfa") ? getData("optiontrfa") : "",
            agency_address_2: getData("agencyadd") ? getData("agencyadd") : "",
            agency_phone_2: getData("agencypho") ? getData("agencypho") : "",
            pais_agencia: getData("countryAgency") ? getData("countryAgency") : "",
            //pais_agencia_name: getData("countryAgencyName") ? getData("countryAgencyName") : "",
            estado_agencia: getData("stateAgency") ? getData("stateAgency") : "",
            //estado_agencia_name: getData("stateAgencyName") ? getData("stateAgencyName") : "",
            ciudad_agencia: getData("agencycity") ? getData("agencycity") : "",
            zip_agencia : getData("agencyzip") ? getData("agencyzip") : "",
            wedding_specialist: getData("weddingSpecialist") ? getData("weddingSpecialist") : "",
            especialist: getData("fname") ? getData("fname") : "",
            email: getData("email") ? getData("email") : "",
            phone: getData("phone") ? getData("phone") : "",
            miembro_palace_resrots : getData("member") ? getData("member") : "",
            accept_terms_conditions: getData("termsconditions") ? getData("termsconditions") : "",
            accept_privacy_notice: getData("termsconditions") ? getData("termsconditions") : "",
            items_whishlist: getData("items_wish") ? getData("items_wish") : "N/A",

            'hs_context': JSON.stringify({
                "ipAddress": text,
                "pageUrl": "https://weddings.palaceresorts.com",
                "pageName": "Weddings Palace Resorts - Take the Next Step"
            })
        });
        api.sendHubspot(postData, id_form);
    }

    async sendCRM(object) {
        var fecha = new Date
        const dataCRM =
        {
            "estado": 1,
            "fecha_creacion": fecha.getDate() + "-" + (fecha.getMonth() + 1) >= 10 ? (fecha.getMonth() + 1) : "0" + (fecha.getMonth() + 1) + "-" +  fecha.getDay() + "-" + fecha.getFullYear(),
            "usuario_creacion": "wedding_interface",
            "idlead_interface_venta": 2,
            "descripcion": "Palace Weddings",
            "idlead_contacto": 0,
            "informacion_interface": object,
        }
        api.sendDataCRM(dataCRM)
            .then(res => {

            }).catch(e => console.error(e));
    }


    sendMail(res = false,obj) {
        let { getData, setData } = this.props.app.currentPage;


        const email = getData("celebration")=="Honeymoon"?"wilsanchez@palaceresorts.com,reservbodaspr@palaceresorts.com":"wilsanchez@palaceresorts.com,weddingleadcatcher@palaceresorts.com,dsosa@palaceresorts.com";
        //const email = getData("celebration")=="Honeymoon"?"jmas@palaceresorts.com,reservbodaspr@palaceresorts.com":"jmas@palaceresorts.com";
        let htmlbody = ReactDOMServer.renderToStaticMarkup(this.htmlDisplay(obj));
        let emailData = {
            TO_ADDRESSES: email,
            CC_ADDRESSES: "",
            TEXTBODY: "Take the next step",
            HASH: "Take the next step",
            SUBJECT: "Take the next step",
            HTMLBODY: htmlbody,
            token: res.token,
            FORCE_SES: true
        }
        api.sendEmail(emailData)
            .then(res => { }).catch(e => console.error(e));
        /*api.sendNextStep(obj)
            .then(res => { }).catch(e => console.error(e));*/


        this.stepContainer.current.classList.remove('animated-fast');
        this.stepContainer.current.classList.remove('slideInRight');
        this.stepContainer.current.classList.add('animated-fastly');
        this.stepContainer.current.classList.add('fadeOut');
        setTimeout(() => {
            const currentStep = getData('currentStep') + 1;
            setData('currentStep', currentStep);
            setData('mounted', false);
        }, 1500);

    }

    htmlDisplay(obj) {

        var fecha = new Date
        let { getData } = this.state.app.currentPage;
        let pais = getData("countryName");
        let estado = getData("stateName")

        let paisA = getData("countryAgencyName");
        let estadoA = getData("stateAgencyName")


        return (
            <div>
                <h2>Form submission from: Take the next step</h2>
                <table>
                    <tr><td><strong>Fecha:</strong> {fecha.getDate()}/{(fecha.getMonth() + 1) >= 10 ? (fecha.getMonth() + 1) : "0" + (fecha.getMonth() + 1)}/{fecha.getFullYear()}</td></tr>
                    <tr><td><strong>Proposito de reunion:</strong> {obj.proposito_de_reunion}</td></tr>
                    <tr><td><strong>Tipo contacto:</strong> {obj.tipo_contacto}</td></tr>
                    <tr><td><strong>Nombre contacto:</strong> {obj.nombre_contacto}</td></tr>
                    <tr><td><strong>Apellido contacto:</strong> {obj.apellido_contacto}</td></tr>
                    <tr><td><strong>Nombre de la novia:</strong> {obj.nombre_novia}</td></tr>
                    <tr><td><strong>Apellido de la novia:</strong> {obj.apellido_novia}</td></tr>
                    <tr><td><strong>Nombre del novio:</strong> {obj.nombre_novio}</td></tr>
                    <tr><td><strong>Apellido del novio:</strong> {obj.apellido_novio}</td></tr>
                    <tr><td><strong>Correo de contacto:</strong> {obj.correo}</td></tr>
                    <tr><td><strong>Miembro Palace Resorts:</strong> {obj.miembro_palace_resrots}</td></tr>
                    <tr><td><strong>Pais:</strong> {obj.pais} ( {pais} ) </td></tr>
                    <tr><td><strong>Estado:</strong> {obj.estado} ( {estado} )</td></tr>
                    <tr><td><strong>Telefono:</strong> {obj.telefono}</td></tr>
                    <tr><td><strong>Feche de ceremonia:</strong> {obj.fecha_ceremonia}</td></tr>
                    <tr><td><strong>Fecha propuesta:</strong> {obj.fecha_propuesta}</td></tr>
                    <tr><td><strong>Season in mind:</strong> {obj.season_in_mind}</td></tr>
                    <tr><td><strong>Numero de asistentes:</strong> {obj.numero_de_asistentes}</td></tr>
                    <tr><td><strong>Eres de una agencia?:</strong> {obj.es_agencia}</td></tr>
                    <tr><td><strong>Nombre de agencia:</strong> {obj.nombre_agencia}</td></tr>
                    <tr><td><strong>Pais de la agencia:</strong> {obj.pais_agencia} ( {paisA} )  </td></tr>
                    <tr><td><strong>Estado de la agencia:</strong> {obj.estado_agencia} ( {estadoA} )</td></tr>
                    <tr><td><strong>IATA de agencia:</strong> {obj.iata_agencia}</td></tr>
                    <tr><td><strong>Direccion de la agencia:</strong> {obj.direccion_agencia}</td></tr>
                    <tr><td><strong>Telefono de la agencia:</strong> {obj.telefono_agencia}</td></tr>
                    <tr><td><strong>Ciudad de la agencia:</strong> {obj.ciudad_agencia}</td></tr>
                    <tr><td><strong>ZIP agencia:</strong> {obj.zip_agencia}</td></tr>
                    <tr><td><strong>Has sido referido?:</strong> {obj.is_lead_refered}</td></tr>
                    <tr><td><strong>Te gustaria trabajar con un especialista especifico?:</strong> {obj.wedding_specialist}</td></tr>
                    <tr><td><strong>Nombre del especialista:</strong> {obj.especialist}</td></tr>
                    <tr><td><strong>Destinos Elegidos:</strong> {obj.destination_get_married}</td></tr>
                    <tr><td><strong>No estoy segura (destinos):</strong> {obj.destination_not_sure}</td></tr>
                    <tr><td><strong>Otros destinos elegidos:</strong></td></tr>
                    {
                        obj.otros_destination_get_married!=""?obj.otros_destination_get_married.map(function (item) {
                            return (
                                <tr key={item}><td>{item}</td></tr>
                            )
                        }):
                        ""
                    }
                    <tr><td><strong>Idioma:</strong> ENG </td></tr>
                    <tr><td><strong>Formulario:</strong> {obj.formulario}</td></tr>
                    <tr><td><strong>Terminos Aceptados:</strong> YES</td></tr>
                    <tr><td><strong>Privacidad Ysuario Aceptada:</strong> YES</td></tr>
                </table>
            </div>
        )
    }

    render() {
        let { getData } = this.props.app.currentPage;
        const { match: { params } } = this.props;

        let mail = getData("email") ? getData("email") : "";
        let remail = getData("confirm_mail") ? getData("confirm_mail") : "";
        let phone = getData("phone") ? getData("phone") : "";
        let fname = getData("fname") ? getData("fname") : "";

        let agencyname1 = getData("agencyname") ? getData("agencyname") : "";
        let optiontrfa1 = getData("optiontrfa") ? getData("optiontrfa") : "";
        let agencyadd = getData("agencyadd") ? getData("agencyadd") : "";
        let agencypho = getData("agencypho") ? getData("agencypho") : "";

        let agencycity = getData("agencycity") ? getData("agencycity") : "";
        let agencyzip = getData("agencyzip") ? getData("agencyzip") : "";

        return (
            <article className="item-form-container animated-fast" ref={this.stepContainer}>
                <div className={"container-margin-top"}>
                    <div className="content-text-padding-10-10" id="resort_section">
                        <Titlesection color="pink" subtitle={this.state.datos1.title} classAdd={"step2title"} />
                    </div>
                    <div component="grid-x">
                        <div component="cell">
                            <div component="grid-x">
                                <div component="cell" medium="2" large="1"></div>
                                <div component="cell" small="12" medium="8" large="10">
                                    <div className={"content-text-padding-10-10"}>
                                        <label className="labelInput">
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
                                <div component="cell" small="10" medium="8" large="8">
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
                        </div>

                        {/* seasons */}
                        <div component="cell" style={this.state.seasons ? { "display": "none" } : {}} >
                            <div component="grid-x">
                                <div component="cell" small="2" medium="2" large="3"></div>
                                <div component="cell" small="8" medium="8" large="6" style={{ marginTop: "20px" }}>

                                    <Input type={"select"}
                                        id="seasons"
                                        name="seasons"
                                        placeholder={this.state.datos1.place_holder}
                                        ref={this.selectSeasons}
                                        data={this.state.datos1.seasons}
                                        onchange={this.selectSeasonsChange}
                                    />
                                </div>
                                <div component="cell" small="2" medium="2" large="3" id="refer_error"></div>
                            </div>
                        </div>


                        {/** I'm not sure */}
                        <div component="cell">
                            <div component="grid-x">
                                <div component="cell" small="4" medium="2" large="3"></div>
                                <div component="cell" small="6" medium="8" large="6" style={{ marginTop: "20px" }}>

                                    <Input
                                        type={"checkbox"}
                                        styleForm={"filledcircle"}
                                        name="notSure"
                                        id="notsur"
                                        className="notsur"
                                        title={params.lang === "es" ? "No estoy seguro" : "I'm not sure"}
                                        click={this.handleCheckRadioSure}
                                        checked={this.state.the_sure}
                                    />

                                </div>
                                <div component="cell" small="1" medium="2" large="3" id="refer_error"></div>
                            </div>
                        </div>
                        {/** Did someone refer you to aour services? */}
                        <div component="cell">
                            <div className={"content-text-padding-10-10"} >
                                <Titlesection color="pink" subtitle={this.state.datos1.title_did} classAdd={"step2title"} />
                            </div>
                            <div component="grid-x">
                                <div component="cell" small="12" medium="12" large="12">
                                    <label className="input-error">{getData('error_refer') && this.state.error_refer}</label>
                                </div>
                                <div component="cell" small="2" medium="2" large="4"></div>
                                <div component="cell" small="5" medium="4" large="2">
                                    <Input styleForm={"filledcircle"} keyValue={1} type={"radio"} title={params.lang == "es" ? "Sí" : "Yes"} id={"referService-1"} name={"referService"} value="Yes" click={this.agency}
                                        checked={this.state.refer_yes}
                                    />
                                </div>
                                <div component="cell" small="5" medium="4" large="2">
                                    <Input styleForm={"filledcircle"} keyValue={2} type={"radio"} title={"No"} id={"referService-2"} name={"referService"} value="No" click={this.agency}
                                        checked={this.state.refer_no}
                                    />
                                </div>
                                <div component="cell" small="1" medium="2" large="4" id="agency_error"></div>
                            </div>
                        </div>

                        {/** Agency */}
                        <div component="cell">
                            <div className={"content-text-padding-10-10"} >
                                <Titlesection color="pink" subtitle={this.state.datos1.title_agency} classAdd={"step2title"} />
                            </div>
                            <div component="grid-x">
                                <div component="cell" small="12" medium="12" large="12">
                                    <label className="input-error">{getData('error_agency_radios') && this.state.error_agency_radios}</label>
                                </div>
                                <div component="cell" small="2" medium="2" large="4"></div>
                                <div component="cell" small="5" medium="4" large="2">
                                    <Input styleForm={"filledcircle"} keyValue={1} type={"radio"} title={params.lang == "es" ? "Sí" : "Yes"} id={"clientAgency-1"} name={"clientAgency"} value="Yes" click={this.agency}
                                        checked={this.state.agency_yes}
                                    />
                                </div>
                                <div component="cell" small="5" medium="4" large="2">
                                    <Input styleForm={"filledcircle"} keyValue={1} type={"radio"} title={"No"} id={"clientAgency-2"} name={"clientAgency"} value="No" click={this.agency}
                                        checked={this.state.agency_no}
                                    />
                                </div>
                                <div component="cell" small="1" medium="2" large="4"></div>


                            </div>
                        </div>
                        <div component="cell" style={!this.state.norefer ? { "display": "none" } : {}} >
                            <div component="grid-x">
                                <div component="cell" small="1" medium="2" large="3"></div>
                                <div component="cell" small="10" medium="8" large="6">
                                    <div component="grid-x">
                                        <div component="cell">
                                            <div className={"content-text-padding-10-10"}>
                                                <label className="labelInput">{this.state.datos1.agency_name}</label>
                                            </div>
                                            <div component="grid-x">
                                                <div component="cell" small="12" medium="12" large="12">
                                                    <label className="input-error">{getData('error_agency_name') && this.state.error_agency_name}</label>
                                                </div>
                                                <div component="cell" small="12" medium="6" large="6">
                                                    <div style={{ padding: "5px 10px" }}>
                                                        <Input type={"text"} placeholder={this.state.datos1.agency_name} value={agencyname1} refInput={this.agencyname} id={"agencyname"} name={"agencyname"} changeHandler={this.changeHandler} required
                                                            onInvalid={(e) => { this.invalidData(e, "Email") }} />
                                                    </div>
                                                </div>
                                                <div component="cell" small="12" medium="6" large="6">
                                                    <div style={{ padding: "5px 10px" }}>
                                                        <Input type={"text"} placeholder={this.state.datos1.agency_iata} value={optiontrfa1} refInput={this.optiontrfa} id={"optiontrfa"} name={"optiontrfa"} changeHandler={this.changeHandler}
                                                            required onInvalid={(e) => { this.invalidData(e, "IATA") }} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {getData('youAre')!="Helpful Friend/Planner/Travel Advisor"?
                                        <div component="cell">
                                            <div className={"content-text-padding-10-10"}>

                                                <label className="labelInput">{this.state.datos1.form_country}</label>

                                            </div>
                                            <div component="grid-x">

                                                <div component="cell" small="12" medium="12" large="12">
                                                    <label className="input-error">{getData('error_agency_country') && this.state.error_agency_country}</label>
                                                </div>

                                                <div component="cell" small="12" medium="6" large="6">
                                                    <div style={{ padding: "5px 10px" }}>
                                                        <Input type={"select"} placeholder={this.state.datos1.form_place_country} withSearch required
                                                            data={this.state.countries} ref={this.selectCountry} onchange={this.chooseCountry}
                                                        />
                                                    </div>
                                                </div>
                                                <div component="cell" small="12" medium="6" large="6">
                                                    <div style={{ padding: "5px 10px" }}>
                                                        <Input type={"select"} required placeholder={this.state.datos1.form_place_state} withSearch
                                                            data={this.state.states} ref={this.selectState} onchange={this.chooseState}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        <div></div>
                                        }
                                        <div component="cell">
                                            <div className={"content-text-padding-10-10"}>
                                                <label className="labelInput">{this.state.datos1.agency_address}</label>
                                            </div>
                                            <div component="grid-x">

                                                <div component="cell" small="12" medium="12" large="12">
                                                    <label className="input-error">{getData('error_agency_agency') && this.state.error_agency_agency}</label>
                                                </div>

                                                <div component="cell" small="12" medium="6" large="6">
                                                    <div style={{ padding: "5px 10px" }}>
                                                       <Input type={"text"} placeholder={this.state.datos1.agency_city} value={agencycity} refInput={this.agencycity} id={"agencycity"} name={"agencycity"} changeHandler={this.changeHandler} required
                                                            onInvalid={(e) => { this.invalidData(e, "City") }} />
                                                    </div>
                                                </div>
                                                <div component="cell" small="12" medium="6" large="6">
                                                    <div style={{ padding: "5px 10px" }}>
                                                        <label className="input-error">{getData('error_phone_format_agency') && this.state.error_phone_format_agency}</label>
                                                        <Input type={"text"} placeholder={this.state.datos1.agency_address_address} value={agencyadd} refInput={this.agencyadd} id={"agencyadd"} name={"agencyadd"} changeHandler={this.changeHandler} required
                                                            onInvalid={(e) => { this.invalidData(e, "Address") }} />
                                                    </div>
                                                </div>

                                                <div component="cell" small="12" medium="6" large="6">
                                                    <div style={{ padding: "5px 10px" }}>
                                                        <Input type={"tel"} placeholder={this.state.datos1.agency_addres_phone} value={agencypho} refInput={this.agencypho} id={"agencypho"} name={"agencypho"} changeHandler={this.changeHandler} required
                                                            onInvalid={(e) => { this.invalidData(e, "Agcy Phone") }} />
                                                    </div>
                                                </div>
                                                <div component="cell" small="12" medium="6" large="6">
                                                    <div style={{ padding: "5px 10px" }}>
                                                        <Input type={"text"} placeholder={this.state.datos1.agency_zip} value={agencyzip} refInput={this.agencyzip} id={"agencyzip"} name={"agencyzip"} changeHandler={this.changeHandler} required
                                                            onInvalid={(e) => { this.invalidData(e, "Zip Code") }} />
                                                    </div>
                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div component="cell" small="1" medium="2" large="3"></div>
                            </div>
                        </div>

                        {/** Specialist */}
                        <div component="cell">
                            <div className={"content-text-padding-10-10"} id="specialist_error">
                                <Titlesection color="pink" subtitle={this.state.datos1.title_cert} classAdd={"step2title"} />
                            </div>
                            <div component="grid-x">
                                <div component="cell" small="12" medium="12" large="12">
                                    <label className="input-error">{getData('error_specialist_radios') && this.state.error_specialist_radios}</label>
                                </div>
                                <div component="cell" small="2" medium="2" large="4"></div>
                                <div component="cell" small="5" medium="4" large="2">
                                    <Input styleForm={"filledcircle"} keyValue={1} type={"radio"} title={params.lang == "es" ? "Sí" : "Yes"} id={"weddingSpecialist-1"} name={"weddingSpecialist"} value="Yes" click={this.agency}
                                        checked={this.state.specialist_yes}
                                    />
                                </div>
                                <div component="cell" small="5" medium="4" large="2">
                                    <Input styleForm={"filledcircle"} keyValue={1} type={"radio"} title={"No"} id={"weddingSpecialist-2"} name={"weddingSpecialist"} value="No" click={this.agency}
                                        checked={this.state.specialist_no}
                                    />
                                </div>
                                <div component="cell" small="1" medium="2" large="4"></div>
                            </div>
                        </div>

                        <div component="cell" style={!this.state.norefer2 ? { "display": "none" } : {}}>
                            <div component="grid-x">
                                <div component="cell" small="12" medium="12" large="12">
                                    <label className="input-error">{getData('error_specialist') && this.state.error_specialist}</label>
                                </div>
                                <div component="cell" small="1" medium="4" large="4"></div>
                                <div component="cell" small="10" medium="4" large="4">
                                    <Input type={"text"} placeholder={this.state.datos1.specialist} refInput={this.fname} id={"fname"} value={fname} name={"fname"} changeHandler={this.changeHandler} required
                                        onInvalid={(e) => { this.invalidData(e, "Esp Full Name") }} />
                                </div>
                                <div component="cell" small="1" medium="4" large="4"></div>
                            </div>
                        </div>


                           {/** member? */}
                           <div component="cell">
                            <div className={"content-text-padding-10-10"} id="refer_member">
                                <Titlesection color="pink" subtitle={this.state.datos1.member} classAdd={"step2title"} />
                            </div>
                            <div component="grid-x">
                                <div component="cell" small="12" medium="12" large="12" style={{ marginTop: "5px" }}>
                                    <label className="input-error">{getData('error_member') && this.state.error_member}</label>
                                </div>
                                <div component="cell" small="2" medium="1" large="4"></div>
                                <div component="cell" small="10" medium="2" large="1">
                                    <Input styleForm={"filledcircle"} keyValue={1} type={"radio"} title={params.lang == "es" ? "Sí" : "Yes"} id={"member-1"} name={"member"} value="Yes" click={this.agency}
                                        checked={this.state.member_yes}
                                    />
                                </div>
                                <div component="cell" small="2" medium="1" large="4" className="movil"></div>
                                <div component="cell" small="10" medium="2" large="1" style={{ marginTop: "5px" }}>
                                    <Input styleForm={"filledcircle"} keyValue={2} type={"radio"} title={"No"} id={"member-2"} name={"member"} value="No" click={this.agency}
                                        checked={this.state.member_no}
                                    />
                                </div>
                                <div component="cell" small="2" medium="1" large="4" className="movil"></div>
                                <div component="cell" small="10" medium="2" large="2" style={{ marginTop: "5px" }}>
                                    <Input styleForm={"filledcircle"} keyValue={3} type={"radio"} title={this.state.datos1.member_booking} id={"member-3"} name={"member"} value="Member" click={this.agency}
                                        checked={this.state.member_member}
                                    />
                                </div>

                            </div>
                        </div>





                        <div component="cell">
                            <div className={"content-text-padding-10-10"} id="email_error">
                                <Titlesection color="pink" subtitle={this.state.datos1.title_tell_us} classAdd={"step2title"} />
                            </div>
                            <div component="grid-x">
                                <div component="cell" small="1" medium="1" large="1"></div>
                                <div component="cell" small="10" medium="10" large="10">
                                    <div component="grid-x">
                                        <div component="cell" small="12" medium="4" large="4" className="alignInputFlex">
                                            <div className={"content-text-padding-10-10"}>
                                                <label className="labelInput">{this.state.datos1.your_mail}</label>
                                            </div>

                                            <div component="cell" small="12" medium="12" large="12">
                                                <div style={{ padding: "5px 10px" }}>
                                                    <label className="input-error">{getData('reemail') && this.state.error_email}</label>
                                                    <label className="input-error">{getData('error_email_format') && this.state.error_email_format}</label>

                                                </div>
                                            </div>

                                            <div style={{ padding: "5px 10px" }}>
                                                <Input type={"email"} placeholder={this.state.datos1.label_mail} refInput={this.email} id={"email"} value={mail} name={"email"} changeHandler={this.changeHandler} required
                                                    onInvalid={(e) => { this.invalidData(e, "Ur Email") }} />
                                            </div>
                                        </div>
                                        <div component="cell" small="12" medium="4" large="4" className="alignInputFlex">
                                            <div style={{ padding: "5px 10px" }}>
                                                <Input type={"email"} placeholder={this.state.datos1.label_mail_confirm} refInput={this.confirm} id={"confirm_mail"} value={remail} name={"confirm_mail"} changeHandler={this.changeHandler} required
                                                    onInvalid={(e) => { this.invalidData(e, "Ur Email 2") }} ref={this.refRe} />
                                            </div>
                                        </div>
                                        <div component="cell" small="12" medium="4" large="4">
                                            <div className={"content-text-padding-10-10"} id="phone_error">
                                                <label className="labelInput">{this.state.datos1.your_phone}</label>
                                            </div>
                                            <div component="cell" small="12" medium="12" large="12">
                                                <div style={{ padding: "5px 10px" }}>
                                                    <label className="input-error">{getData('error_phone') && this.state.error_phone}</label>
                                                    <label className="input-error">{getData('error_phone_format') && this.state.error_phone_format}</label>
                                                </div>
                                            </div>
                                            <div style={{ padding: "5px 10px" }}>
                                                <Input type={"tel"} placeholder={this.state.datos1.label_your_phone}
                                                       refInput={this.phone} id={"phone"} value={phone}
                                                       name={"phone"} changeHandler={this.changeHandlerPhone} required
                                                    onInvalid={(e) => { this.invalidData(e, "Phone") }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div component="cell" small="1" medium="1" large="1"></div>
                            </div>
                        </div>
                        <div component="cell">
                            <div className={"content-text-padding-10-10"} >
                                <label className="labelInput">{this.state.datos1.text}</label>
                            </div>
                        </div>
                        <div component="cell" className="content-text-padding-10-10" id="terms_error">
                            <div component="grid-x">
                                <div component="cell" small="" medium="12" large="12">
                                    <label className="input-error">{getData('error_terms') && this.state.error_terms}</label>
                                </div>
                                <div component="cell" small="1" medium="2" large="2"></div>
                                <div component="cell" small="10" medium="8" large="8">
                                    <Input changeHandler={this.changeHandlerTerms} value={this.state.termsconditions} type={"checkbox"} styleForm={"square"} required name="termsconditions" id="termsconditions"
                                        title={this.state.datos1.terms}
                                        checked={this.state.terms_yes}
                                    />
                                </div>
                                <div component="cell" small="1" medium="2" large="2"></div>
                            </div>
                        </div>
                        <div component="cell" className="content-text-padding-10-10">
                            <div component="grid-x">
                                <div component="cell" small="" medium="12" large="12">
                                    <label className="input-error">{getData('error_recaptcha') && this.state.error_recaptcha}</label>
                                </div>
                                <div component="cell" small="1" medium="5" large="5"></div>
                                <div component="cell" small="12" medium="7" large="7">
                                    <ReCAPTCHA sitekey="6LdNHNYUAAAAAL657L42DV80YsWmrsdo_uoyMH8_" theme="light" onChange={this.onChange.bind(this)} />
                                </div>

                            </div>
                        </div>

                        <div component="cell" className="content-text-padding-10-10">
                            <div component="grid-x">

                                <div component="cell" small="1" medium="4" large="4"></div>

                                <div component="cell" small="10" medium="4" large="4">
                                    <section className="btnCnt">
                                        <WizStep className="btn type pink finish next" value={params.lang == "es" ? "enviar" : "send"} type="button" onClick={this.handleNext.bind(this)} />
                                    </section>
                                </div>

                            </div>
                        </div>


                    </div>
                </div>


            </article>
        );
    }
}
export default withRouter(WithContext(StepFive));

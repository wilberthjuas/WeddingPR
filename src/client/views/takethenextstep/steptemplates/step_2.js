import React, { Component, createRef } from "react";
import { Input } from "../../../components/wirefragment";
import CheckboxButton from "../../../components/clever/checkbox/index";
import WizStep from '../wizard/controls/wizbutton';
import api from '../../../app/index.js';
import WithContext from "../../../app/Context";
import json from "./data_1";
import { Titlesection } from '../../../components/wirefragment';
import { withRouter } from "react-router-dom"

class StepTwo extends Component {


    constructor(props) {
        super(props);

        const { getData } = this.props.app.currentPage;

        this.state = {
            list_checked: [],
            countries: [],
            states: [],
            who_is_checked: "",
            datos1: json['en2'][0],
            form_name: "",
            lang_web: "1",
            show_items: "none",
            show_br: "block",
            finish: false,
            the_bride : false,
            the_groom : false,
            the_parent : false,
            the_planner : false,
            country_code : getData('country') ? getData('country') : "",
            country_name : getData('countryName') ? getData('countryName') : "",
            state_code : getData('state') ? getData('state') : "",
            state_name : getData('stateName') ? getData('stateName') : "",
        }

        this.handleCheckRadio = this.handleCheckRadio.bind(this);
        this.selectCountry = React.createRef();
        this.selectState = React.createRef();
        this.refInput = React.createRef();
        this.chooseCountry = this.chooseCountry.bind(this);
        this.clearState = this.clearState.bind(this);
        this.clearCountry = this.clearCountry.bind(this);
        this.chooseState = this.chooseState.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.validateEnter = this.validateEnter.bind(this);
        this.toElement = this.toElement.bind(this);
        this.stepContainer = createRef();
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
        const { setData } = this.props.app.currentPage;

        this.setState({ the_bride : false,  the_groom : false, the_parent : false, the_planner : false  })
        if (_id == "the_bride"){
            this.setState({ the_bride : true})
        }
        if (_id == "the_groom"){
            this.setState({ the_groom : true })
        }
        if (_id == "the_parent"){
            this.setState({the_parent : true})
        }
        if (_id == "the_planner"){
            this.setState({the_planner : true})
        }

        const who_is_checked = _component ? _component.current.value : _value ? _value : "";
        setData('youAre', who_is_checked);
        this.validateForm();
        this.setState({ who_is_checked });
        this.setState({ show_items: "" });
        this.timer = setTimeout(() => this.toElement(), 500);


    }

    toElement() {


        clearTimeout(this.timer);
        let targetElement = document.querySelector(".intermedio");
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

        this.timer2 = setTimeout(() => this.toFocus(), 800);




    }

    validateEnter(e){

    }

    toFocus(){
        clearTimeout(this.timer2);
        document.getElementById("contactName").focus();
    }

    getCountries() {
        const { getData } = this.props.app.currentPage;
        api.getCountrybyLang(getData("lang2"))
        //api.getCountrybyLang("en")
        //api.getCountries()
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

    clearState(){
        const { removeData } = this.props.app.currentPage;
        let ss = this.selectState.current.select.current.querySelectorAll("input")[0].value;

        if(ss.length == 0 && ss == ""){
            this.selectState.current.select.current.querySelectorAll("select")[0].value = "";
            this.selectState.current.select.current.querySelectorAll("input")[0].value = "";
            removeData('state');
            removeData('stateName');
        }
        this.validateForm()
    }

    clearCountry(){
        const { removeData } = this.props.app.currentPage;
        let ss2 = this.selectCountry.current.select.current.querySelectorAll("input")[0].value
        if(ss2.length == 0 && ss2 == ""){
            this.selectCountry.current.select.current.querySelectorAll("input")[0].value = ""
            this.selectCountry.current.select.current.querySelectorAll("select")[0].value = ""
            this.selectState.current.select.current.querySelectorAll("select")[0].value = "";
            this.selectState.current.select.current.querySelectorAll("input")[0].value = "";
            removeData('state');
            removeData('stateName');
            removeData('country');
            removeData('countryName');
        }
        this.validateForm()
    }

    chooseCountry() {
        const { setData, getData, removeData } = this.props.app.currentPage;
        let code = this.selectCountry.current.select.current.querySelectorAll("select")[0].value;
        let statec = [];
        api.getStatesbyLang(code, getData("lang2"))
        //api.getStatesbyLang(code, "en")
            .then(res => {
                Object.keys(res.data).forEach(function (key) {
                    statec.push([[res.data[key]], key])
                }
                )
                this.setState({
                    states: statec
                });

                setData('country', code);
                setData('countryName', this.selectCountry.current.select.current.querySelectorAll("input")[0].value);

                console.log("pais: ",code,this.selectCountry.current.select.current.querySelectorAll("input")[0].value)

                if (Array.isArray(statec) && statec.length) {
                    this.selectState.current.select.current.querySelectorAll("select")[0].value = "";
                    this.selectState.current.select.current.querySelectorAll("input")[0].value = "";
                    removeData('state');
                    removeData('stateName');
                } else {
                    this.selectState.current.select.current.querySelectorAll("select")[0].value = "0";
                    this.selectState.current.select.current.querySelectorAll("input")[0].value = "NA";
                    setData('state', "0");
                    setData('stateName', "NA");
                }
                this.validateForm();
            }).catch(e => console.error(e));
    }

    chooseState() {
        let code = this.selectState.current.select.current.querySelectorAll("select")[0].value;
        const { setData } = this.props.app.currentPage;
        setData('state', code);
        setData('stateName', this.selectState.current.select.current.querySelectorAll("input")[0].value);
        console.log("estado: ",code, this.selectState.current.select.current.querySelectorAll("input")[0].value)
        this.validateForm();
    }

    componentDidMount() {
        let langs2 = "en";
        const { match: { params } } = this.props;
        switch (params.lang) {
            case "es":
                this.setState({
                    list_checked: [],
                    countries: [],
                    states: [],
                    who_is_checked: "",
                    datos1: json['es2'][0],
                    form_name: "",
                    lang_web: "1"
                });
                langs2 = "es";
                break;
        }

        const { getData, setData, removeData } = this.props.app.currentPage;

        setData('currentStep', 3);
        //setData('mounted', true);
        setData('lang2', langs2);
        this.getCountries();

            this.selectCountry.current.select.current.querySelectorAll("select")[0].value = this.state.country_code
            this.selectCountry.current.select.current.querySelectorAll("input")[0].value = this.state.country_name

            this.selectState.current.select.current.querySelectorAll("select")[0].value = this.state.state_code
            this.selectState.current.select.current.querySelectorAll("input")[0].value = this.state.state_name

        if (getData("youAre")){
            this.setState({ show_items : "", finish : true })

            if (getData("youAre") == "The Beautiful Bride"){
                this.setState({ the_bride : true})
            }
            if (getData("youAre") == "The Lucky Groom"){
                this.setState({ the_groom : true })
            }
            if (getData("youAre") == "Proud Parent"){
                this.setState({the_parent : true})
            }
            if (getData("youAre") == "Helpfull Friend/Planner"){
                this.setState({the_planner : true})
            }
        }

        this.validateForm();
    }

    validateForm() {

        const { getData } = this.props.app.currentPage;

        if (getData("country") && getData("youAre") && getData("state")
            && getData("contactName") && getData("contactLastname")) {

            this.setState({ show_br: "none", finish: true });

        } else {
            this.setState({ show_br: "block", finish: false });
        }

        //this.setState({ show_br: "none", finish: true });
    }

    changeHandler = event => {
        const name = event.target.name;
        const value = event.target.value;
        const { setData } = this.props.app.currentPage;
        setData(name, value);
        this.validateForm();
    }

    handleNext(event) {

        event.preventDefault();

        const { setData, getData } = this.props.app.currentPage;

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

    render() {
        const { match: { params } } = this.props;
        const { setData, getData } = this.props.app.currentPage;

        let nombre = getData("contactName") ? getData("contactName") : "";
        let apellido = getData("contactLastname") ? getData("contactLastname") : "";

        return (
            <article className="item-form-container animated-fast" ref={this.stepContainer}>
                <div className={"container-margin-top"}>
                    <div component="grid-x" className="firstSection">

                        <Titlesection color="pink" subtitle={this.state.datos1.title} classAdd={"step2title"} />

                        <div component="cell">
                            <div component="grid-x">
                                <div component="cell" small="1" medium="2" large="2"></div>
                                <div component="cell" small="10" medium="8" large="8">
                                    <div component="grid-x">
                                        <div component="cell" small="6" medium="6" large="3">
                                            <CheckboxButton
                                                _onClick={this.handleCheckRadio}
                                                value={this.state.datos1.bride_val}
                                                is_checked={this.state.who_is_checked == "The Beautiful Bride"}
                                                image_src={
                                                    "https://e-commercepr.s3.amazonaws.com/assets/images/home/Desktop/the-beautiful-bride.png"
                                                }
                                                text_to_display={this.state.datos1.bride}
                                                is_square={false}
                                                styleForm="filledcircle"
                                                id="the_bride"
                                                is_checked={this.state.the_bride}
                                            />
                                        </div>
                                        <div component="cell" small="6" medium="6" large="3">
                                            <CheckboxButton
                                                _onClick={this.handleCheckRadio}
                                                value={this.state.datos1.groom_val}
                                                is_checked={this.state.who_is_checked == "The Lucky Groom"}
                                                image_src={
                                                    "https://e-commercepr.s3.amazonaws.com/assets/images/home/Desktop/the-lucky-groom.png"
                                                }
                                                text_to_display={this.state.datos1.groom}
                                                is_square={false}
                                                styleForm="filledcircle"
                                                id="the_groom"
                                                is_checked={this.state.the_groom}
                                            />
                                        </div>
                                        <div component="cell" small="6" medium="6" large="3">
                                            <CheckboxButton
                                                _onClick={this.handleCheckRadio}
                                                value={this.state.datos1.parent_val}
                                                is_checked={this.state.who_is_checked == "Proud Parent"}
                                                image_src={
                                                    "https://e-commercepr.s3.amazonaws.com/assets/images/home/Desktop/proud parent.png"
                                                }
                                                text_to_display={this.state.datos1.parent}
                                                is_square={false}
                                                styleForm="filledcircle"
                                                id="the_parent"
                                                is_checked={this.state.the_parent}
                                            />
                                        </div>
                                        <div component="cell" small="6" medium="6" large="3">
                                            <CheckboxButton
                                                _onClick={this.handleCheckRadio}
                                                value={this.state.datos1.friend_val}
                                                is_checked={this.state.who_is_checked == "Helpfull Friend/Planner"}
                                                image_src={
                                                    "https://e-commercepr.s3.amazonaws.com/assets/images/home/Desktop/helpful-friend-planner.png"
                                                }
                                                text_to_display={this.state.datos1.friend}
                                                is_square={false}
                                                styleForm="filledcircle"
                                                id="the_bride"
                                                is_checked={this.state.the_bride}
                                                id="the_planner"
                                                is_checked={this.state.the_planner}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div component="cell" small="1" medium="2" large="2"></div>
                            </div>
                        </div>
                    </div>

                </div>
                <br ref={this.myDivToFocus} />
                <div className="intermedio">


                </div>

                <div className={"container-margin-top"}>
                    <section className={"info-details secondSection"}>

                        <div component="grid-x" style={{ display: this.state.show_items }}>
                            <div component="cell" small="1" medium="2" large="2"></div>
                            <div component="cell" small="10" medium="8" large="8">
                                <div component="cell" medium="12" large="12" style={{ textAlign: "left", padding: "5px", marginTop: "30px", display: "block" }} >
                                    <label className="labelInput">{this.state.datos1.form_name}</label>
                                </div>
                                <div component="grid-x">
                                    <div component="cell" medium="6" large="6">
                                        <div>
                                            <Input
                                                value={nombre}
                                                changeHandler={this.changeHandler}
                                                required
                                                type={"text"}
                                                placeholder={this.state.datos1.form_place_name}
                                                ref={this.refInput}
                                                id={"contactName"}
                                                name={"contactName"}
                                                enterValidation
                                            />
                                        </div>
                                    </div>
                                    <div component="cell" medium="6" large="6">
                                        <div>
                                            <Input
                                                value={apellido}
                                                changeHandler={this.changeHandler}
                                                required
                                                type={"text"}
                                                placeholder={this.state.datos1.form_place_lastname}
                                                id={"contactLastname"}
                                                name={"contactLastname"}
                                                enterValidation
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div component="cell" small="1" medium="2" large="2"></div>
                            {/* Country */}
                            <div component="cell" small="1" medium="2" large="2"></div>
                            <div component="cell" small="10" medium="8" large="8">
                                <div component="cell" medium="12" large="12" style={{ textAlign: "left", padding: "5px", marginTop: "30px" }} >
                                    <label className="labelInput">{this.state.datos1.form_country}</label>
                                </div>
                                <div component="grid-x">
                                    <div component="cell" medium="6" large="6">
                                        <div>
                                            <Input
                                                type={"select"}
                                                placeholder={this.state.datos1.form_place_country}
                                                withSearch
                                                data={this.state.countries}
                                                ref={this.selectCountry}
                                                changeHandlerInput={this.clearCountry}
                                                onchange={this.chooseCountry}
                                                enterValidation
                                            />
                                        </div>
                                    </div>
                                    <div component="cell" medium="6" large="6">
                                        <div>
                                            <Input
                                                type={"select"}
                                                placeholder={this.state.datos1.form_place_state}
                                                withSearch
                                                data={this.state.states}
                                                ref={this.selectState}
                                                changeHandlerInput={this.clearState}
                                                onchange={this.chooseState}
                                                enterValidation
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div component="cell" small="1" medium="2" large="2"></div>
                        </div>
                        <section className="btnCnt">
                        { this.state.finish &&
                            <WizStep className="btn type pink finish next" value={params.lang == "es" ? "continuar" : "continue"} onClick={this.handleNext.bind(this)} />
                        }
                        </section>
                    </section>
                    {/*end second section*/}
                    <div className="here-iam row" style={{ marginLeft: "3rem", textAlign: "center", display: this.state.show_items }}>
                        {this.state.show_br == "block" ? <div></div> : ""}
                    </div>
                </div>
            </article>
        );
    }
}
export default withRouter(WithContext(StepTwo));

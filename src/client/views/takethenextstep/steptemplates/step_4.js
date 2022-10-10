import React, { Component, createRef } from "react";
import InputRange from "../../../components/clever/inputrange/index";
import { Input } from "../../../components/wirefragment";
import WizStep from '../wizard/controls/wizbutton';
import CheckboxButton from "../../../components/clever/checkbox/index";
import DatePK from "../../../components/clever/datepk/index";
import WithContext from "../../../app/Context";
import json from "./data_1";
import { Titlesection } from '../../../components/wirefragment';
import { withRouter } from "react-router-dom"

class StepFour extends Component {
    constructor(props) {
        super(props);

        const { getData } = this.props.app.currentPage;

        this.state = {
            finish:         false,
            datos1:         json['en4'][0],
            val:            getData('guestNumber') ? getData('guestNumber') : 0,
            deciding:       "",
            sure:           "",
            date:           new Date(),
            fname:          getData('guestNumber') ? getData('guestNumber') : "",
            valuepk:        getData('celebrationDate') ? getData('celebrationDate') :  "",
            hideDate:       { padding: "5px 10px", display: "none" },
            hideSeasons:    { padding: "5px 10px", display: "none" },
            the_date : false,
            the_season : false,
            the_still :false,
            the_sure : getData("notsure") ? true : false,
            error_format: "Error in Date Format (ej, YYYY-MM-DD) *"

        } 
        
        this.fname = React.createRef();
        this.selectSeasons = React.createRef();
        this.selectSeasonsChange = this.selectSeasonsChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCheckRadio = this.handleCheckRadio.bind(this);
        this.handleCheckRadioSure = this.handleCheckRadioSure.bind(this);
        this.validateChecks = this.validateChecks.bind(this)
        this.onDateChange = this.onDateChange.bind(this);
        this.handleDrops = this.handleDrops.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.handleCheckPK=this.handleCheckPK.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.stepContainer = createRef();
        this.valFormat = this.valFormat.bind(this);
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

        console.log("val: ",val)

        this.fname.current.value = val == "101" ? "+100" : val;
        this.setState({
            val: value_val
        });
        let { setData } = this.props.app.currentPage;
        setData('guestNumber', value_val);
        this.validateForm();
    }

    changeHandler(event){
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

    selectSeasonsChange(){
        let code = this.selectSeasons.current.select.current.querySelectorAll("select")[0].value;
        console.log("code: ",code)
        let { setData } = this.props.app.currentPage;
        setData("season_in_mind",code);
        this.validateForm();
    }

    handleCheckRadioSure(_value, _id) {
    let { setData } = this.props.app.currentPage;

    if(_value.target.checked){
        setData('notsure', true)
        this.setState({ the_sure : true })
    }else {
        setData('notsure', false)
        this.setState({ the_sure : false })
    }
    
    
    this.validateForm();
    
    }
    
    handleCheckRadio(_value, _id) {
       
        let { setData } = this.props.app.currentPage;
        this.setState({
            the_date : false,
            the_season : false,
            the_still: false
        })

        

        if (_id=="deciding" && _value == 1) {

            setTimeout(() => {
                document.querySelector('._inputdatepk').click();
            });
            
            setData("deciding2", "I know the exact date");
            this.setState({
                hideDate: { display: "block"},
                hideSeasons: { display: "none"},
                the_date : true
            });
            
        }else if (_value == 2) {
            setData("deciding2", "I have a season in mind");
            this.setState({
                hideDate: { display: "none"},
                hideSeasons: { display: "block"},
                the_season : true
            });
        } else {
            setData("deciding2", "I'm still deciding");
            this.setState({
                hideDate: { display: "none"},
                hideSeasons: { display: "none"},
                the_still : true
            });
        }

        this.setState({ [_id]: _value });
        setData(_id, _value);
        this.validateForm();
    }

    handleDrops  = (param) =>  {
        this.setState({
            activedroppdown:this.state.activedroppdown==param?"":param
        })
    }

    onDateChange(newDate){
        this.setState({
            selectedDate:DateUtils.formatDate(newDate,'YYYY')+"-"+DateUtils.formatDate(newDate,'MM')+"-"+DateUtils.formatDate(newDate,'DD')
        })
    }

    handleCheckPK(dk){
        let { getData,setData } = this.props.app.currentPage;
        setData('celebrationDate', dk);    
        setData("format_error", false)
        this.validateForm();
    }

    valFormat = event => {
        const value = event.target.value;
        let formatcorrect = this.validateFormatDate(value)
        let { setData } = this.props.app.currentPage;
        if (formatcorrect){
            setData("error_format", false)
            setData('celebrationDate', value);    
        }else {
            setData("error_format", true)
        }
        this.validateForm()
    }

    validateFormatDate(value){
            var filter =  /^([12]\d{3})?[-]?(0[1-9]|1[0-2])[-]?(0[1-9]|[12]\d|3[01])$/;
            if (filter.test(value)) {
		        return true;
		    }
		    else {
		        return false;
		    }    
    }

    componentDidMount(){
        const { match: { params } } = this.props;
        switch (params.lang) {
            case "es":
                this.setState({
                    datos1: json['es4'][0],
                    val: 0,
                    deciding:"",
                    sure: "",
                    date:new Date(),
                    fname:"",
                   // valuepk:"",
                    hideDate: {display: "none"}
                });
            break;
        }
        const { getData, setData } = this.props.app.currentPage;
        //setData('mounted', true);
        setData('guests',false)

        if (getData("deciding")){

            this.setState({finish: true })

            console.log("fecha: ",getData('celebrationDate'))
            if (getData("deciding") == 1){
                this.setState({ 
                    the_date :true, 
                    hideDate: { display: "block"}, 
                    //valuepk : "2020-04-25" 
                })

            }
            if (getData("deciding") == 2){
                this.setState({ the_season :true, hideSeasons: { display: "block"} })
                this.selectSeasons.current.select.current.querySelectorAll("select")[0].value = getData("season_in_mind");
                this.selectSeasons.current.select.current.querySelectorAll("input")[0].value = getData("season_in_mind");
            }
            if (getData("deciding") == 3){
                this.setState({ the_still :true })
            }
        }else {
            setData('season_in_mind', false);
        }
        

    }

    validateChecks(){
        let { getData } = this.props.app.currentPage;
        let valor = false;
        if (getData("deciding")){
            if (getData("deciding") == 1) {
                if (getData("celebrationDate") && !getData("error_format")){
                    valor =  true;
                }
            }else if (getData("deciding") == 2){
                if (getData("season_in_mind")){
                    valor =  true;
                }
            }else {
                valor =  true;
            }
        }
        return valor;
    }

    validateForm(){
        let { setData, getData } = this.props.app.currentPage;
        let validate = this.validateChecks();
        

        if (validate){
            if(getData('notsure') === true){
                this.setState({ finish: true });    
            }else {
                if (getData("guestNumber") > 0){
                    setData('guests',true)
                    this.setState({ finish: true });    
                }else {
                    this.setState({ finish: false });    
                }
            }
        }else {
            this.setState({ finish: false });
        }


        /*setData('formFinish', false);
        if(getData('notsure') === true) {
            this.setState({ finish: true });
        } else {
            if(getData("celebration") ==  'Saying "I do"' || getData("celebration") ==  'Honeymoon' ){
                if (getData("guestNumber") > 0 && validate){
                    this.setState({ finish: true });
                }
            } else {
                if (getData("guestNumber") > 0 && validate){
                    this.setState({ finish: true });
                }
            }
        }*/
    }
    
    handleKeyPress = (event) => {
        console.log("ammmmm")
        if(event.key === 'Enter'){
            event.preventDefault();
       }
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
        const { getData } = this.props.app.currentPage; 
        const { match: { params } } = this.props;
        let display = "none";
        if(getData("celebration") ==  'Saying "I do"' || getData("celebration") ==  'Honeymoon' ){
            display = "";
        }
        display = "";

        


        return (
            <article className="item-form-container animated-fast" ref = { this.stepContainer }>
                <div className={"container-margin-top"}>
                    <div component="grid-x">
                        <div component="cell" small="1" medium="2" large="2"></div>
                        <div component="cell" small="10" medium="8" large="8">
                            <div component="grid-x">
                                <div component="cell">
                                    <div className="">
                                        <Titlesection color="pink" subtitle={this.state.datos1.title} classAdd={"step2title"} />
                                    </div> 
                                    <div component="grid-x">
                                        <div component="cell" small="2" medium="1" large="1"></div>
                                        <div component="cell" small="8" medium="10" large="10">
                                            <div component="grid-x" style={{textAlign:"initial"}}>
                                                <div component="cell" small="12" large="4">
                                                    <div component="grid-x">
                                                        <div component="cell" small="12">
                                                            <CheckboxButton
                                                                _onClick={this.handleCheckRadio}
                                                                id="deciding"
                                                                value={1}
                                                                is_checked={this.state.deciding == 1}
                                                                has_image={false}
                                                                text_to_display={this.state.datos1.exact_date}
                                                                is_checked={this.state.the_date}
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
                                                                    _returnChange={(e)=>this.handleCheckPK(e)}
                                                                    handleKeyPress={this.valFormat}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div component="cell" small="12" large="4">
                                                    <div component="grid-x">
                                                        <div component="cell" small="12">
                                                            <CheckboxButton
                                                                _onClick={this.handleCheckRadio}
                                                                id="deciding"
                                                                value={2}
                                                                is_checked={this.state.deciding == 2}
                                                                has_image={false}
                                                                text_to_display={this.state.datos1.season}
                                                                is_checked={this.state.the_season}
                                                                />
                                                        </div>
                                                        <div component="cell" small="12" style={this.state.hideSeasons} >
                                                            <Input type={"select"} 
                                                                id="seasons" 
                                                                name="seasons" 
                                                                placeholder={this.state.datos1.place_holder} 
                                                                ref={this.selectSeasons}
                                                                data={this.state.datos1.seasons} 
                                                                onchange={this.selectSeasonsChange}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div component="cell" small="12" large="4">
                                                    <CheckboxButton
                                                        _onClick={this.handleCheckRadio}
                                                        id="deciding"
                                                        value={3}
                                                        is_checked={this.state.deciding == 3}
                                                        has_image={false}
                                                        text_to_display={this.state.datos1.deciding}
                                                        is_checked={this.state.the_still}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div component="cell" small="12" medium="1" large="1"></div>
                                    </div>
                                </div>
                                <div component="cell" style={{ display: display }}>
                                    <div className="content-text-padding-10-10"></div>
                                    <div>
                                        <Titlesection color="pink" subtitle={this.state.datos1.many_guest} classAdd={"step2title"} />
                                    </div>
                                    <div component="grid-x">
                                        <div component="cell">
                                            <div component="grid-x" className={"_display-activate-inactive"}>
                                                <div component="cell" medium="2" large="2"></div>
                                                <div component="cell" small="5" medium="5" large="5" style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                                                    <label className="labelInput">
                                                        {this.state.datos1.number_guest}
                                                    </label>
                                                </div>
                                                <div component="cell" small="2" medium="3" large="2">
                                                    <div ref={this.props.InputonRef} >
                                                        <form>
                                                        <Input 
                                                            type={"text"} 
                                                            placeholder={"0"} 
                                                            refInput={this.fname} 
                                                            id={"fname"} 
                                                            value={this.state.fname} 
                                                            name={"fname"} 
                                                            onClick={this.handleClick}
                                                            changeHandler={this.changeHandler} 
                                                            handleKeyPress={this.handleKeyPress}
                                                            />
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                            <div component="grid-x" className={"_display-inactive-activate"}>
                                                <div component="cell">
                                                        <label className="labelInput ">{((this.state.val!="101")? (this.state.val): "+100")+" "+this.state.datos1.guests}</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/** Scroll input flower */}
                                <div component="cell" style={{"padding":"15px 0", display: display}}>
                                    <div component="grid-x">
                                        <div component="cell" small="1" medium="2" large="3"></div>
                                        <div component="cell" small="10" medium="8" large="6">
                                            {<InputRange
                                                minValue={0}
                                                maxValue={101}
                                                value={this.state.val}
                                                linercolor={{ active: "#F26193", inactive: "#dbdbdb" }}
                                                identify={false}
                                                _onChange={x => {
                                                    this.handleChange(x);
                                                }}
                                            />}
                                        </div>
                                        <div component="cell" small="1" medium="2" large="3"></div>
                                    </div>
                                </div>
                                {/** input "I'm not sure" */}
                                <div component="cell" style={{ display: display }}>
                                    <div component="grid-x">
                                        <div component="cell" small="3" medium="1" large="1"></div>
                                        <div component="cell" small="6" medium="10" large="10">
                                             <Input 
                                                type={"checkbox"} 
                                                styleForm={"filledcircle"} 
                                                name="notSure" 
                                                id="notsur"
                                                className="notsur"
                                                title={params.lang === "es" ? "No estoy seguro" :"I'm not sure"} 
                                                click={this.handleCheckRadioSure}
                                                checked={this.state.the_sure}
                                            />
                                        </div>
                                        <div component="cell" small="3" medium="1" large="1"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div component="cell" small="1" medium="2" large="2"></div>
                    </div>
                    { this.state.finish &&
                        <section className="btnCnt">
                            <WizStep className="btn type pink finish next" value={params.lang == "es" ? "continuar" : "continue"} onClick={this.handleNext.bind(this)} />
                        </section>
                    }
                </div>
            </article>
        );
    }
}
export default withRouter(WithContext(StepFour));
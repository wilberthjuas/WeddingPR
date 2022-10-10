import React, { Component, createRef } from "react";
import CheckboxButton from "../../../components/clever/checkbox/index";
import WizStep from '../wizard/controls/wizbutton';
import WithContext from "../../../app/Context";
import json from "./data_1";
import { Titlesection } from '../../../components/wirefragment';
import { withRouter } from "react-router-dom";

class StepOne extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list_checked:   [],
            who_is_checked: '',
            datos1:         json['en1'][0],
            finish:         false,
            renewal : false,
            anniversary : false,
            ido : false,
            honeymoon : false
        }

        this.stepContainer = createRef();
        this.handleCheckRadio = this.handleCheckRadio.bind(this);
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
        const { getData, setData } = this.props.app.currentPage;
        const who_is_checked = _component ? _component.current.value : _value ? _value : "";

        console.log("id: ",_id)

        this.setState({ honeymoon : false,  anniversary : false, renewal : false, ido : false  })

        if (_id ==  "honeymoon"){
            this.setState({ honeymoon : true })
        }

        if (_id ==  "anniversary"){
            this.setState({ anniversary : true })
        }

        if (_id ==  "renewal"){
            this.setState({ renewal : true })
        }

        if (_id == "ido"){
            this.setState({ ido : true })
        }

        setData('celebration', who_is_checked);

        console.log(getData('celebration'));

        this.validateForm();
        this.setState({ who_is_checked });


    }

    validateForm(){

        const { getData } = this.props.app.currentPage;

        if(getData("celebration")){
            this.setState({ finish: true });
        }
    }

     componentDidMount(){

        const { match: { params } } = this.props;
        switch (params.lang) {
            case "es":
                this.setState({
                    datos1: json['es1'][0],
                });
            break;
        }



        const { getData, setData } = this.props.app.currentPage;
        setData("formFinish",false)

                localStorage.setItem('formFinish', false);


        if (getData("celebration")){
            this.setState({ finish : true })

            if (getData("celebration") == 'Saying "I do"'){
                this.setState({ ido : true })
            }
            if (getData("celebration") == "Honeymoon"){
                this.setState({ honeymoon : true })
            }
            if (getData("celebration") == "Anniversary"){
                this.setState({ anniversary : true })
            }
            if (getData("celebration") == "Vow Renewal"){
                this.setState({ renewal : true })
            }
        }


        setData('currentStep', 1);
        //setData('mounted', true);

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
        return (
            <article className="item-form-container animated-fast" ref = { this.stepContainer }>
                <div className={"container-margin-top"}>
                    <div>
                        <Titlesection color="pink" subtitle={this.state.datos1.title} classAdd={"step2title"} />
                    </div>
                    <div component="grid-x">
                        <div component="cell" small="1" medium="2" large="2"></div>
                        <div component="cell" small="10" medium="8" large="8">
                            <div component="grid-x">
                                <div component="cell" small="6" medium="6" large="3">
                                    <CheckboxButton
                                        _onClick={this.handleCheckRadio}
                                        value={this.state.datos1.say_i_do_val}
                                        is_checked={this.state.who_is_checked == 'Saying "I do"'}
                                        image_src={
                                            "https://e-commercepr.s3.amazonaws.com/assets/images/takethenextstep/Take+the+Next+Step/saying-i-do.png"
                                        }
                                        text_to_display={this.state.datos1.say_i_do}
                                        is_square={false}
                                        styleForm="filledcircle"
                                        id="ido"
                                        is_checked={this.state.ido}
                                    />
                                </div>
                                <div component="cell" small="6" medium="6" large="3">
                                    <CheckboxButton
                                        _onClick={this.handleCheckRadio}
                                        value={this.state.datos1.honeymoon_val}
                                        is_checked={this.state.who_is_checked == "Honeymoon"}
                                        image_src={
                                            "https://e-commercepr.s3.amazonaws.com/assets/images/takethenextstep/Take+the+Next+Step/honeymoon.png"
                                        }
                                        text_to_display={this.state.datos1.honeymoon}
                                        is_square={false}
                                        id={"honeymoon"}
                                        is_checked={this.state.honeymoon}
                                        styleForm="filledcircle"
                                    />
                                </div>
                                <div component="cell" small="6" medium="6" large="3">
                                    <CheckboxButton
                                        _onClick={this.handleCheckRadio}
                                        value={this.state.datos1.anniversary_val}
                                        is_checked={this.state.who_is_checked == "Anniversary"}
                                        image_src={
                                            "https://e-commercepr.s3.amazonaws.com/assets/images/takethenextstep/Take+the+Next+Step/anniversary.png"
                                        }
                                        text_to_display={this.state.datos1.anniversary}
                                        is_square={false}
                                        is_checked={this.state.anniversary}
                                        id={"anniversary"}
                                        styleForm="filledcircle"
                                    />
                                </div>
                                <div component="cell" small="6" medium="6" large="3">
                                    <CheckboxButton
                                        _onClick={this.handleCheckRadio}
                                        value={this.state.datos1.vow_renewal_val}
                                        is_checked={this.state.who_is_checked == "Vow Renewal"}
                                        image_src={
                                            "https://e-commercepr.s3.amazonaws.com/assets/images/takethenextstep/desktop/vow-renewal.png"
                                        }
                                        text_to_display={this.state.datos1.vow_renewal}
                                        is_square={false}
                                        is_checked={this.state.renewal}
                                        id={"renewal"}
                                        styleForm="filledcircle"
                                    />
                                </div>
                            </div>
                        </div>
                        <div component="cell" small="1" medium="2" large="2"></div>
                    </div>
                    <section className="btnCnt">
                    { this.state.finish &&
                        <WizStep className="btn type pink finish next" value={params.lang=="es"?"continuar":"continue"} onClick = { this.handleNext.bind(this) } />
                    }
                    </section>
                </div>
            </article>
        );
    }
}

export default withRouter(WithContext(StepOne));

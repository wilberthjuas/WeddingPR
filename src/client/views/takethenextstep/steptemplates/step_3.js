import React, { Component, createRef } from "react";
import { Input } from "../../../components/wirefragment";
import WizStep from '../wizard/controls/wizbutton';
import WithContext from "../../../app/Context";
import json from "./data_1";
import { Titlesection } from '../../../components/wirefragment';
import { withRouter } from "react-router-dom"

class StepThree extends Component {

    constructor(props) {
        super(props);
        this.state = {
            datos1: json['en3'][0],
            finish: false
        }
        this.validateForm = this.validateForm.bind(this);
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

    changeHandler = event => {
        const name = event.target.name;
        const value = event.target.value;
        let { setData } = this.props.app.currentPage;
        setData(name, value);
        this.validateForm() ;
    }

    validateForm(){
        
        let { getData } = this.props.app.currentPage; 
        
        this.setState({ finish: false });

        if (getData("youAre") == "The Beautiful Bride"){
            if(getData("groomeFirstName") && getData("groomeLastName")){
                this.setState({ finish: true });
            }
        } else if (getData("youAre") == "The Lucky Groom"){
            if(getData("brideFirstName") && getData("brideLastName")){
                this.setState({ finish: true });
            }
        } else {
            if(getData("groomeFirstName") && getData("groomeLastName") && getData("brideFirstName") && getData("brideLastName")){
                this.setState({ finish: true });
            } 
        }
    }

    componentDidMount(){
        const { match: { params } } = this.props;
        switch (params.lang) {
            case "es":
                this.setState({
                    datos1: json['es3'][0],
                })
            break;
        }
        let { getData, setData } = this.props.app.currentPage;
        //setData('mounted', true);
        if (getData("youAre") == "The Beautiful Bride"){
            document.getElementById("groomeFirstName").focus();
                if (getData("groomeFirstName") && getData("groomeLastName")){
                    this.setState({
                        finish : true
                    })
                }

        } else if (getData("youAre") == "The Lucky Groom"){
            document.getElementById("brideFirstName").focus();
            if (getData("brideFirstName") && getData("brideFirstName")){
                this.setState({
                    finish : true
                })
            }

        } else {
            document.getElementById("brideFirstName").focus();
            if (getData("brideFirstName") && getData("brideFirstName") && getData("groomeFirstName") && getData("groomeLastName")){
                this.setState({
                    finish : true
                })
            }
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
        const { match: { params } } = this.props;
        let titulo;
        let  displayGroom = "";
        let  displayBride = "";

        const { getData } = this.props.app.currentPage;
        let novia = getData("brideFirstName") ? getData("brideFirstName") : "";
        let novial = getData("brideLastName") ? getData("brideLastName") : "";
        let novio = getData("groomeFirstName") ? getData("groomeFirstName") : "";
        let noviol = getData("groomeLastName") ? getData("groomeLastName") : "";

        


        if (getData("youAre") == "The Beautiful Bride"){
            titulo = this.state.datos1.title;
            displayBride = "none";
            //document.getElementById("groomeFirstName").focus();

        } else if (getData("youAre") == "The Lucky Groom"){
            titulo = this.state.datos1.titleBride;
            displayGroom = "none";
            //document.getElementById("brideFirstName").focus();
        } else {
            titulo = this.state.datos1.titleCouple;
        }
        return (
            <article className="item-form-container animated-fast" ref = { this.stepContainer }>
                <div className={"container-margin-top"}>
                    <div>
                        <Titlesection color="pink" subtitle={titulo} classAdd={"step2title"} />
                    </div>
                    <div component="grid-x" style = {{ display: displayBride }}>
                        <div component="cell" small="1" medium="2" large="2"></div>
                        <div component="cell" small="10" medium="8" large="8">
                            <div component="cell" medium="12" large="12" style = {{ textAlign: "left" , padding: "5px" }} className={"content-text-padding-10-10"}>
                                <label className="labelInput">{ this.state.datos1.bride }</label>
                            </div>
                            <div component="grid-x">
                                <div component="cell" medium="6" large="6">
                                    <div>
                                        <Input value={novia} changeHandler={this.changeHandler} type={"text"} placeholder={this.state.datos1.form_place_name} refInput={this.fname} id={"brideFirstName"} name={"brideFirstName"} enterValidation/>
                                    </div>
                                </div>
                                <div component="cell" medium="6" large="6">
                                    <div>
                                        <Input value={novial} changeHandler={this.changeHandler} type={"text"} placeholder={this.state.datos1.form_place_lastname} refInput={this.lname} id={"brideLastName"} name={"brideLastName"} enterValidation/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div component="cell" small="1" medium="2" large="3"></div>
                    </div>
                    <div component="grid-x" style={{ display: displayGroom }}>
                        <div component="cell" small="1" medium="2" large="2"></div>
                        <div component="cell" small="10" medium="8" large="8">
                            <div component="cell" medium="12" large="12" style={{ textAlign: "left" , padding: "5px" }} className={"content-text-padding-10-10"}>
                                <label className="labelInput">{this.state.datos1.groom}</label>
                            </div>
                            <div component="grid-x">
                                <div component="cell" medium="6" large="6">
                                    <div>
                                        <Input value={novio} changeHandler={this.changeHandler} type={"text"} placeholder={this.state.datos1.form_place_name} refInput={this.fname} id={"groomeFirstName"} name={"groomeFirstName"} enterValidation/>
                                    </div>
                                </div>
                                <div component="cell" medium="6" large="6">
                                    <div>
                                        <Input value={noviol} changeHandler={this.changeHandler} type={"text"} placeholder={this.state.datos1.form_place_lastname} refInput={this.lname} id={"groomeLastName"} name={"groomeLastName"} enterValidation/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div component="cell" small="1" medium="2" large="3"></div>
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
export default withRouter(WithContext(StepThree));
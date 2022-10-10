import React, { Component } from 'react';
import WithContext from '../../../app/Context';
import { Barprogress, Cell, Grid, FloatingMenu, Footer } from '../../../components';
import WizStep from './controls/wizbutton';
import { Iconwedd } from '../../../components/wirefragment';
import { withRouter } from "react-router-dom"

class Wizard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            txtBck : "Back <",
        }
        this.handleChat = this.handleChat.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        let newProps = {};
        Object.keys(props).forEach(key => {
            if (props[key] != state[key]) {
                newProps[key] = props[key];
                if (key === "children" && Array.isArray(props["children"])) {
                    newProps["steps"] = props["children"];
                }
            }
        });
        return Object.keys(newProps).length > 0 ? newProps : null;
    }

    /**
     * Reglas para mostrar el botón de Back     
    */
    getBackButton = () => {
        let visible;
        let classname;
        const { getData } = this.props.app.currentPage;
        const currentStep = getData('currentStep');
        if (currentStep == 0 || currentStep == 1 || currentStep == 2 ||
            currentStep == 4 || currentStep == 6 || currentStep == 8) {
            visible = false;
        } else {
            visible = true;
        }
        classname = this.props.className || "";
        classname = classname.concat(this.props.classname || "") + " back" + (visible ? "" : " invisible");
        return <WizStep value = { this.state.txtBck } className = { classname } onClick = { this.goToBackStep } />;
    };

    getBackButtonMov = () => {
        let visible;

        const { getData } = this.props.app.currentPage;
        const currentStep = getData('currentStep');

        if (currentStep == 0 || currentStep == 1 || currentStep == 2 || currentStep == 4 || currentStep == 6 || currentStep == 8){
            visible = "invisible";
        }else {
            visible = "";
        }
        return <button onClick = { this.goToBackStep } className = { "btnFloatTake "+visible} >
                <Iconwedd icon={"back-circled"} color={"white"} />
            </button>;
    }

    /**
     * Ir al paso anterior
    */
    goToBackStep = () => {

        const { setData, getData } = this.props.app.currentPage;
        let currentStep = getData('currentStep');
        if (currentStep > 0) {
            // Some logic for animations to back
            setData('currentStep', getData('currentStep') - 2);
        }
    };

    /**
     * Mostar el Chat
    */
    handleChat() {
        acquireIO.max();
    }

    componentDidMount(){
        const { match: { params } } = this.props;
        switch (params.lang) {
            case "es":
                this.setState({ txtBck : "REGRESAR <" });
            break;
        }
    }

    render() {

        let { current, steps } = this.props;
        let current2 = ""
        
        if (current == "0" || current == "1"){
            current2 = 0
        }
        else if (current == "2" || current == "3"){
            current2 = 1
        }
        else if (current == "4" || current == "5"){
            current2 = 2
        }
        else if (current == "6" || current == "7"){
            current2 = 3
        }
        else if (current == "8" || current == "9"){
            current2 = 4
        }
        else if (current == "10" || current == "11"){
            current2 = 5
        }
        
        const stepcount = steps;

        const { getData } = this.props.app.currentPage;

            let form_check = "";


        

        if (localStorage.getItem('formFinish') == "false" && current2 == 5){
            form_check = this.props.children[current]
        }else if (localStorage.getItem('formFinish') == "true" && current2 == 5){
            form_check = this.props.children[0]
        }else {
            form_check = this.props.children[current]
        }

        return (
            <div>
            <Grid type="x" page="wizard" className="wizard-component container">
                <Cell className="wiz-step-container">
                    { form_check }
                </Cell>
                
                { current2 == 5 ?
                    <FloatingMenu />
                :                 
                <section className="floatTake floatingMenu">                    
                    <Grid type="x" style = {{ paddingTop:(7/16) + "rem" }}>
                        <Cell small="2">
                            <center className="desktop">
                                { this.getBackButton() }
                            </center>
                            <center className="movil">
                                { this.getBackButtonMov() }
                            </center>
                        </Cell>
                        <Cell small="8">
                            <Barprogress size = { stepcount / 2 } progress = { current2 } />
                        </Cell>
                        <Cell small="2">
                            <center className="movil">
                                <button onClick = { this.handleChat.bind(this) } className = "btnFloatTake">
                                    <Iconwedd icon = { "chat-circled" } color = { "white" } />
                                </button>
                            </center>
                        </Cell>
                    </Grid>
                </section>
                
                }
            </Grid>
            { current2 == 5 ?
               <Footer /> : ""
            }
            </div>
            
            
        );
    }
}

export default withRouter(WithContext(Wizard));
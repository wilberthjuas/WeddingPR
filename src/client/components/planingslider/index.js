import React, { Component } from 'react';
import { Cell } from '../grid';
import { Grid } from '../../components'
import { Titlesection, Input } from '../../components/wirefragment';
import { withRouter,Link } from 'react-router-dom';
import LazyImage from "react-lazy-progressive-image";
import ReactHtmlParser from 'react-html-parser';

class Planingslider extends Component {

    state = {
        formRequired: 0,
        direction: 1
    }
    ver = 0
    constructor() {
        super();
        this.nextOne = this.nextOne.bind(this);
        this.nextTwo = this.nextTwo.bind(this);
        this.letsSlider = this.letsSlider.bind(this);
        this.showImgSlideOpacity = this.showImgSlideOpacity.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.moveForm = this.moveForm.bind(this);
        this.checkboxRequired = this.checkboxRequired.bind(this);
        this.checksRef = React.createRef()
        this.form = React.createRef()
        this.state = {
            opt1: null
        };
    }
    setDataForm() {
        try {
            if (localStorage.quizHomeFrm0 != null) {
                setTimeout(() => {
                    let json = JSON.parse(localStorage.quizHomeFrm0)
                    let form = this.form.current.querySelectorAll("input")
                    json.forEach(element => {
                        form.forEach(elementHtml => {
                            if (elementHtml.type == "checkbox" || elementHtml.type == "radio") {
                                if (elementHtml.value == element.value) {
                                    elementHtml.click()
                                }
                            }
                        });
                    });
                }, 1000)
            }
        } catch (exception) {
            console.log(exception)
        }
    }
    letsSlider() {
        let items = document.querySelectorAll(".quiz-bg")
        if (items.length > 0) {
            items[0] != null ? items[0].style = "" : ""
            items[1] != null ? items[1].style = "position: absolute;z-index: -1;opacity:0;left:100%" : ""
            items[2] != null ? items[2].style = "position: absolute;z-index: -2;opacity:0;left:100%" : ""
        }
    }
    serealizeForm(form) {
        let json = []
        let array = form.querySelectorAll("input")
        array.forEach((element, index) => {
            if (element.checked) {
                var nm = element.name
                json.push({ name: element.name, value: element.value })
            }
        })
        return json
    }
    onSubmit(event) {
        event.preventDefault();
        if (this.ver >= (document.querySelectorAll(".quiz-bg").length - 1)) {
            let type = event.target.whicOp10.value;
            let destinations = [];
            let checkbox = event.target.querySelectorAll('input[type="checkbox"]');
            checkbox.forEach(element => {
                if (element.checked) {
                    destinations.push(element.value);
                }
            });
            let capacity = event.target.whicOp32.value;
            // Send values
            localStorage.setItem("quizHomeFrm0", JSON.stringify(this.serealizeForm(event.target)))
            this.props.history.push({
                pathname: "/" + localStorage.langWeddings + "/quiz-resorts",
                state: { query: { type, destinations, capacity } },
            });
        } else {
            if (this.state.direction == 1) {
                this.ver += 1;
            }
            if (this.state.direction == 0) {
                this.ver -= 1;
            }
            this.setState(prevState => {
                return {
                    formRequired: this.ver
                }
            })
            this.moveForm();
        }
    }

    moveForm() {
        let items = document.querySelectorAll(".quiz-bg")
        for (let i = 0; i < items.length; i++) {
            if (i == this.ver) {
                items[i].style = "";
            } else if (i < this.ver) {
                items[i].style = "position: absolute;z-index: -1;opacity:0;left:-100%;margin:0px;";
            }
            else if (i > this.ver) {
                items[i].style = "position: absolute;z-index: -1;opacity:0;left:100%;margin:0px;";
            }
        }
    }
    componentDidMount() {

        window.addEventListener("load", this.letsSlider);
        window.addEventListener("scroll", this.showImgSlideOpacity);
        window.addEventListener("click", this.showImgSlideOpacity);
        this.letsSlider()
        this.setState(prevState => {
            return {
                formRequired: 0,
            }
        })
        this.setDataForm()
        if (localStorage.succesquiz != null) {
            setTimeout(() => {
                localStorage.removeItem('succesquiz')
                let sizeMenu = window.innerWidth < 1024 ? 58 / 16 * parseInt(window.getComputedStyle(document.body).fontSize.substring(-2, 2)) : 290
                window.scroll(0, this.form.current.getBoundingClientRect().y - sizeMenu)
            }, 1000)
        }
        if (localStorage.endquiz) {
            setTimeout(() => {
                localStorage.removeItem('endquiz')
                let sizeMenu = window.innerWidth < 1024 ? 85 / 16 * parseInt(window.getComputedStyle(document.body).fontSize.substring(-2, 2)) : 290
                window.scroll(0, this.form.current.getBoundingClientRect().y - sizeMenu)
                this.ver = 2
                this.moveForm()
            }, 1000)
        }
    }
    checkboxRequired() {
        if (this.checksRef.current != null) {
            if (this.state.formRequired == 1) {
                let itemChecks = this.checksRef.current.querySelectorAll('.option1')
                let removeRequired = false
                itemChecks.forEach(element => {
                    if (element.checked == true) {
                        removeRequired = true
                    }
                });
                if (removeRequired) {
                    itemChecks.forEach(element => {
                        element.removeAttribute('required')
                    })
                }
            }
        }
        return true;
    }

    showImgSlideOpacity() {
        let content = document.getElementById("lets-slider")
        if (content != null) {
            let position = content.getBoundingClientRect()
            let tamanio = content.offsetHeight == 430 ? content.offsetHeight + 150 : content.offsetHeight + 50;
            let imgsLpln = document.querySelectorAll("#lets-slider img")
            if (position.y <= tamanio) {
                for (let x = 0; x < imgsLpln.length; x++) {
                    imgsLpln[x].style = "opacity:1"
                }
            } else {
                for (let x = 0; x < imgsLpln.length; x++) {
                    imgsLpln[x].style = "opacity:0"
                }
            }
        }
    }
    nextOne() {
        this.setState(prevState => {
            return {
                direction: 1,
            }
        })
    }
    nextTwo() {
        this.ver -= 1
        this.moveForm()
        this.setState(prevState => {
            return {
                direction: 0,
                formRequired: this.ver,
            }
        })

    }
    render() {
        const letPlanTwo = this.props.items.quiz.map((element, index) => {
            const letPlanRadioBtn = this.props.items.quiz[index].RadioBtn.map((elementRadio, indexOne) => {
                return (
                    <Input type={index == 1 ? "checkbox" : "radio"}
                        value={elementRadio.value} styleForm={index == 1 ? "circle" : "filledcircle"}
                        key={index + indexOne}
                        title={elementRadio.text}
                        required={this.state.formRequired == index ? this.checkboxRequired() : false}
                        id={"whichoption" + indexOne + "" + element.circle}
                        name={"whicOp" + element.circle + index}
                        className={"option" + index} />
                )
            });
            return (
                <div className={"quiz-bg margin-btn-" + index} key={index}
                style={
                    (index + 1) > 1 ?{position: "absolute",zIndex: "-1",opacity:"0",left:"100%",margin:"0px"}:{}
                    }
                >
                    <div className={"container-movil " + ((index + 1) > 1 ? "lets-slider " : index)} id={"oneLets"}  >
                        <div className="container ">
                            <div className="container-movil-which-option container-desk-lets">
                                <div >
                                    {/****************************************/}
                                    <Grid type="x" key={index}>
                                        <Cell large="6" small="6">
                                            <div className="col-md-9 lista-div which-option-movil" id={"type" + (index + 1)}>
                                                {/*<div className="separador movil">&nbsp;</div> --*/}
                                                <div className="Elipse-3 lista-div text-center">
                                                    {/*<p className="paragraph point-back "><span>{element.circle}</span></p> -- */}
                                                    { /*<p className="paragraph subtitle-option which-option">{ReactHtmlParser(element.description2)}</p> -- */}
                                                    <h1 style={{margin:"unset"}} className="title">{ReactHtmlParser(element.description2)}</h1>
                                                </div>
                                                <div className={index == 0 ? "inputCheck" : " inputCheck inputCheck2"}>
                                                    <span className="radio-block">
                                                        {/*letPlanRadioBtn -- */}
                                                        <p className="description"> {ReactHtmlParser(element.description3)} </p>
                                                    </span>
                                                    {index == 0 ?
                                                    <>
                                                        <section component="inputwedd">
                                                            <a href={element.href_next_step?element.href_next_step:""} className="btn pink btn-nextwhitch">{element.textAlt}</a>
                                                        </section>
                                                        <span onClick={this.nextOne.bind(this)} style={{display:"none"}}>
                                                            <Input type={"submit"} color={"pink btn-nextwhitch"} value={element.buttonTxt} id={"btn" + (index + 1)} name={"btn" + (index + 1)}
                                                                refInput={input => { this[`btn${index}`] = input; }}
                                                            /></span>
                                                    </>
                                                        :
                                                        <div className="content-flex">
                                                            <span onClick={this.nextTwo.bind(this)}>
                                                                <Input type={"button"} color={"white btn-nextwhitch_1"} value={element.buttonTxt2} id={"btno" + (index + 1)} name={"btno" + (index + 1)}
                                                                    refInput={input => { this[`btn${index}`] = input; }} />
                                                            </span>
                                                            <span onClick={this.nextOne.bind(this)}>
                                                                <Input type={"submit"} color={"pink btn-nextwhitch_3"} value={element.buttonTxt} id={"btnt" + (index + 1)} name={"btnt" + (index + 1)}
                                                                    refInput={input => { this[`btn${index + 1}`] = input; }} />
                                                            </span>
                                                        </div>
                                                    }
                                                </div>

                                                <img alt={element.textAlt} className={"bride-" + index + "-img movil"} style={{ opacity: "0" }} src={element.imageMov} />

                                            </div>
                                        </Cell>
                                        <Cell large="6" small="6">
                                            <div className="col-4 img-wedd">
                                                <div className="content-img-wedding">

                                                    <img alt={element.textAlt} className={"bride-" + (index + 1) + "-img desktop"} style={{ opacity: "0" }} src={element.imageDesk} />

                                                    <br className="desktop" />
                                                </div>
                                            </div>
                                        </Cell>
                                    </Grid>
                                    {/****************************************/}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        });

        let success = this.props.items.succesform
        return (
            <section component="letplanwedding">
                <article className="" id="ltplnwddSection">
                    <div className="let-plan-wedding" >
                        <div className="container">
                            <div className="width-head">
                                <div className="">
                                    <div className="">
                                        {this.props.header!=null?"":<Titlesection header title={this.props.items.title} description={this.props.items.description}></Titlesection>}
                                    </div>
                                    <div className="col-md-6"></div>
                                </div>
                            </div>
                        </div>
                        <form className="" ref={this.form} id="form-let-planing" onSubmit={this.onSubmit.bind()} >
                            <div className="lets-slider " id="lets-slider" ref={this.checksRef}>
                                {localStorage.succesquiz != null ?
                                    /***************************************** */
                                    <div className="quiz-bg">
                                        <Grid type="x" className="container succes-message" style={window.innerWidth>1024?{ display: "flex",width:"115%"}:{position:"relative"}}>
                                            <Cell large="6" small="12">

                                                <h1 className="title succes-title" id="ThankYouQuizz">{success.title}</h1>
                                                <div className="body-success" >
                                                    <LazyImage placeholder=""
                                                        src={success.imgMov} >
                                                        {(src) => <img alt={"success thank you"} src={src} className="movil success-img" />}
                                                    </LazyImage>
                                                    <p className="description one" style={window.innerWidth>1024?{width: "70%",margin: "auto"}:{}}>{ReactHtmlParser(success.description)}</p>
                                                    {this.props.urlHome}
                                                    <Input 
                                                    type={"button"} 
                                                    color={"pink special_btn"} 
                                                    value={success.subtitle}
                                                    to={success.to}></Input>
                                                    <br/>
                                                    <div className="succes-message-contact" style={window.innerWidth>1024?{width: "52%"}:{}}>
                                                        <p className="description">
                                                            {ReactHtmlParser(success.infoday)}
                                                        </p>
                                                        <p className="description">
                                                            {ReactHtmlParser(success.infostate)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </Cell>
                                            <Cell large="6" small="6" className="desktop">
                                                <div style={{ position: "absolute" }} className="lista-div which-option-movil success-thank-you" id={"type--1"}>
                                                    <div className="separador movil">&nbsp;</div>
                                                 
                                                 
                                                            
                                                            
                                                             <img alt={"success thank you"} src={success.imgDesk} className="desktop" />
                                                </div>
                                            </Cell>
                                        </Grid>
                                    </div>
                                    /************************************************* */
                                    :
                                    letPlanTwo
                                }
                            </div>
                        </form>
                    </div>
                </article>
                <div className="divicion-section"></div>
            </section>
        )
    }
}

export default withRouter(Planingslider);

import React, { Component } from 'react';
import Layout from '../../components/layout';
import GradientBar from '../../views/catalog/gradientbar';
import { Otherguest } from '../../components';
import { Input, Titlesection } from '../../components/wirefragment';
import { withRouter, Link } from 'react-router-dom';
import data from './data';
import data_ES from './data_ES';
import data_PT from './data_PT';
const headingImage = "https://e-commercepr.s3.amazonaws.com/Produccion/theming/quiz-planning-your-wedding-min.jpg";

class QuizResortsDecor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            heading: [],
            steps: [],
            theming: []
        };
        this.activeHeading = this.activeHeading.bind(this);
        this.form = React.createRef()
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleClick = () => {
        const { history } = this.props;
        history.push('extras');

    };

    activeHeading(index, e) {
        let header = null
        let button = null
        let checkbox = null
        let { heading } = this.state;
        if (e.target.type != null) {
            header = this.form.current.querySelectorAll(".heading")[index]
            if (header.className.indexOf("heading-active") < 0) {
                header.classList.add("heading-active")
                button = header.querySelectorAll("button")[0]
                checkbox = header.querySelectorAll("input")[0]
                if (button) {
                    button.setAttribute('disabled', true)
                    button.innerText = heading.selected
                } if (checkbox) {
                    checkbox.checked = true
                    this.required(this.form.current, 0)
                }
            } else {
                header.classList.remove("heading-active")
                button = header.querySelectorAll("button")[0]
                checkbox = header.querySelectorAll("input")[0]
                if (button) {
                    button.removeAttribute("disabled")
                    button.innerText = heading.select
                } if (checkbox) {
                    checkbox.checked = false
                }
            }
        }
    }
    setDataForm() {
        try {

            setTimeout(() => {
                if (localStorage.quizHomeFrm1 == null) {
                    this.props.history.push("quiz-resorts", {})
                }
                if (localStorage.quizHomeFrm2 != null) {
                    let json = JSON.parse(localStorage.quizHomeFrm2)
                    let form = this.form.current
                    json.forEach(element => {
                        if (form.querySelector("[name=" + element.name + "]") != null) {
                            form.querySelector("[name=" + element.name + "]").click()
                        }
                    });
                }
            }, 1500)
        } catch (exception) {
            console.log(exception)
        }
    }
    componentDidMount() {
        this.setDataForm()
        const dest = this.state.dest
        const { match: { params } } = this.props;
        switch (params.lang) {
            case "es":
                this.setState({
                    heading: data_ES.heading,
                    steps: data_ES.steps,
                    theming: data_ES.theming
                });
                break;
            default:
                this.setState({
                    heading: data.heading,
                    steps: data.steps,
                    theming: data.theming
                });
                break;
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
    onSubmit(e) {
        let flag = 0
        e.preventDefault();
        const formData = new FormData(e.target)
        formData.forEach(element => {
            flag++
        });
        if (flag > 0) {
            const data = Array.from(formData.entries()).reduce((memo, pair) => ({
                [pair[0]]: pair[1],
            }), {});
            this.required(e, 0)
            //console.log(data)
            localStorage.setItem("quizHomeFrm2", JSON.stringify(this.serealizeForm(e.target)))
            this.props.history.push("extras", {})

            return data
        } else {
            this.required(e, 1)
            //console.log("no pasable")
            return false
        }
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


    render() {

        let heading=this.state.heading
        let steps=this.state.steps
        let theming=this.state.theming
        return (
            <Layout title="Resort Quiz">
                {heading!=null>0?
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
                                        <p className="description ">2</p>
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
                                        <p className="description ">3</p>
                                    </div>
                                    <div className="title">
                                        <p className="description numn-step">{steps.three.title}</p>
                                    </div>
                                </div>
                                <div className="divider">
                                    <div className="line"></div>
                                </div>
                                <div className="indicator">
                                    <div className="number">
                                        <p className="description ">3</p>
                                    </div>
                                    <div className="title">
                                        <p className="description numn-step">{steps.four.title}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <Titlesection title={heading.titlePage} subtitle={heading.subtitlePage} />
                    <form className="resorts" onSubmit={this.onSubmit.bind()} ref={this.form}>
                        <div className="city">
                            {theming.length > 0 ?
                                theming.map((theme, index) => (
                                    <div className={"resort" + (index)} key={index}>
                                        <div className="heading" onClick={this.activeHeading.bind(this, index)} type="div">
                                            <section className="check-container container">
                                                <Input type={"checkbox"} styleForm={"circle"} required name={(theme.name + theme.preffix).replace(/ /g, "-")}
                                                    value={theme.name + theme.preffix} id={index} title={theme.name + "<span> " + theme.preffix + "</span>"} >
                                                </Input>
                                                <div className="option" component="inputwedd">
                                                    <button type="button" className="btn pink">{heading.select}</button>
                                                </div>
                                            </section>
                                        </div>


                                        <div className="content">
                                            {!theme.not && <Otherguest data={{otherguest:{galery:theme.slide}}} />}
                                        </div>
                                    </div>
                                )) : <p style={{ paddingLeft: "8px" }}> {heading.noData}</p>
                            }
                        </div>

                        <div className="to-center" component="inputwedd">
                            <button onClick={() => { window.history.go(-1); }} className="btn white btn-back ">
                                {heading.back}
                            </button>
                            <input type="submit" className="btn pink" value={heading.accept} />
                        </div>
                    </form>
                </section>
                :<div></div>}
            </Layout>
        );
    }

}

export default withRouter(QuizResortsDecor);
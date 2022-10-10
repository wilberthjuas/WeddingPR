import React, { Component } from 'react';
import Layout from '../../components/layout';
import { Negocios } from '../../components';
import { ServiceProvider } from '../../app/Context';
import api from '../../app/index';
import { withRouter, Link } from 'react-router-dom';
const headingImage = "https://e-commercepr.s3.amazonaws.com/Produccion/theming/quiz-planning-your-wedding-min.jpg";

import data from './data';
import data_ES from './data_ES';
import data_PT from './data_PT';
import { Input, Titlesection } from '../../components/wirefragment';

class QuizResortsExtras extends Component {

    constructor(props) {
        super(props);
        this.state = {
            heading: {},
            steps: {},
            unidades: null,
            negocios2: {},
        };
        this.getUnidadesNegocio = this.getUnidadesNegocio.bind(this);
        this.activeHeading = this.activeHeading.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.form = React.createRef()
    }
    handleClick = () => {
        /*  const { history } = this.props;
          history.push('extras');*/
    };
    componentDidMount() {
        const { match: { params } } = this.props;
        switch (params.lang) {
            case "es":
                this.setState({
                    heading: data_ES.heading,
                    steps: data_ES.steps,
                    unidades: null,
                    negocios2: []
                });
                break;
            default:
                this.setState({
                    heading: data.heading,
                    steps: data.steps,
                    unidades: null,
                    negocios2: []
                });
                break;
        }
        this.getUnidadesNegocio();
        this.setDataForm()
    }
    setDataForm() {
        try {
            if (localStorage.quizHomeFrm2 == null) {
                this.props.history.push("decor", {})
            }
            if (localStorage.quizHomeFrm3 != null) {
                setTimeout(() => {
                    let json = JSON.parse(localStorage.quizHomeFrm3)
                    let form = this.form.current
                    json.forEach(element => {
                        if (form.querySelector("[name=" + element.name + "]") != null) {
                            form.querySelector("[name=" + element.name + "]").click()
                        }
                    });
                }, 1500)
            }
        } catch (exception) {
            console.log(exception)
        }
    }
    getUnidadesNegocio() {

        api.getBusinessUnits()
            .then(res => {

                this.setState({
                    unidades: res.data
                });
            }).catch(e => console.error(e));

    }
    head(element, index) {
        return (
            <div className="heading " headingcheck="true" key={index + "a"} type="div" onClick={this.activeHeading.bind(this, index)}>
                <section className="check-container container">
                    <Input type={"checkbox"} required styleForm={"circle"} name={element.nombre.replace(/ /g, "-")} name={element.nombre.replace(/ /g, "-")}
                        value={element.nombre} id={index} title={element.nombre} >
                    </Input>
                    <div className="option" component="inputwedd">
        <button className="btn pink" >{this.state.heading.select}</button>
                    </div>
                </section>
            </div>
        )
    }
    activeHeading(index, e) {
        let header = this.form.current.querySelectorAll("[headingcheck=true]")
        let button = null
        let checkbox = null
        if (index == null) {
            index = header.length
        }
        if (e != null) {
            e = e.target.type
        }
        let { heading } = this.state;
        if (e != null) {
            header = header[index]
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

            localStorage.setItem("quizHomeFrm3", JSON.stringify(this.serealizeForm(e.target)))
            this.props.history.push("finish", {})

            return data
        } else {
            this.required(e, 1)

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
        this.props.history.push("finish")
        let { heading, steps } = this.state;
        const { match: { params } } = this.props;
        let contentperzonalized = [];

        if (this.state.unidades) {
            const contentD = this.state.unidades.filter((element, index) => [2, 12, 5, 4].indexOf(parseInt(element.idservice_unidad_negocio)) >= 0);
            contentperzonalized = contentD.map((element, index) => {
                return (
                    <>
                        <Negocios extra={this.head(element, index)} key={index} outhead oubutton unidadId={element.idservice_unidad_negocio} unidadNombre={element.nombre} no_catalog2="1"> </Negocios>
                    </>
                );
            });
        }

        return (
            <ServiceProvider value={{ lang: params.lang }}>
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
                                    <div className="divider" style={{display:"none"}}>
                                        <div className="line"></div>
                                    </div>
                                    <div className="indicator active" style={{display:"none"}}>
                                        <div className="number">
                                            <p className="description">3</p>
                                        </div>
                                        <div className="title">
                                            <p className="description numn-step">{steps.three.title}</p>
                                        </div>
                                    </div>
                                    <div className="divider ">
                                        <div className="line"></div>
                                    </div>
                                    <div className="indicator">
                                        <div className="number">
                                            <p className="description">3</p>
                                        </div>
                                        <div className="title">
                                            <p className="description numn-step">{steps.four.title}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Titlesection title={heading.titlePage} subtitle={heading.subtitlePage} />
                            <form className="resorts" id="form-extras" onSubmit={this.onSubmit.bind()} ref={this.form}>
                                {contentperzonalized}


                                <div className="heading " headingcheck="true" type="div" onClick={this.activeHeading.bind(this, null)}>
                                    <section className="check-container container">
                                        <Input type={"checkbox"} styleForm={"circle"} name="notSure"
                                            value={"notsure"} id={"notsure"} title={heading.notsure} >
                                        </Input>
                                        <div className="option" component="inputwedd">
                                            <button className="btn pink">{heading.select}</button>
                                        </div>
                                    </section>
                                </div>

                                <div className="to-center" component="inputwedd">
                                    <button onClick={() => { this.props.history.push("decor") }} className="btn white btn-back">{heading.back}</button>
                                    <input type="submit" className="btn pink" id="quizfinish" value={heading.accept} />
                                </div>
                            </form>
                        </section>
                        : <div></div>}

                </Layout>
            </ServiceProvider>
        );

    }

}

export default withRouter(QuizResortsExtras);

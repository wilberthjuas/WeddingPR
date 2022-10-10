import React, { Component } from 'react';
import Layout from '../../components/layout';
import { Input, Titlesection } from '../../components/wirefragment';
import { ResortVenues } from '../../components';
import data from './data';
import data_ES from './data_ES';
import data_PT from './data_PT';
import { withRouter } from 'react-router-dom';

const headingImage = "https://e-commercepr.s3.amazonaws.com/Produccion/theming/quiz-planning-your-wedding-min.jpg";

class QuizResorts extends Component {
    vns = new ResortVenues()
    state = {

    }
    constructor(props) {
        super(props);
        const { match: { params } } = this.props;

        switch (params.lang) {
            case "es":
                this.state = {
                    titleOne: data_ES.titleOne,
                    nodta: data_ES.nodta,
                    maxpeople: data_ES.maxpeople,
                    heading: data_ES.heading,
                    //steps: data_ES.steps,
                    //hotels: data_ES.hotels,
                    title: data_ES.title,
                    subTitle: data_ES.subTitle,
                    buttonSelect: data_ES.buttonSelect,
                    buttonSelected: data_ES.buttonSelected,
                    notsure: data_ES.notsure,
                    btnAccept: data_ES.btnAccept,
                    resorts: data_ES.resorts,
                    steps: data_ES.steps,
                    hotels: [],
                    query: {
                        type: "Weddings",
                        destinations: [],
                        capacity: "24",
                    }
                };
                break;
            case "pt":
                this.state = {
                    titleOne: data_PT.titleOne,
                    //nodta: data_PT.nodta,
                    maxpeople: data_PT.maxpeople,
                    heading: data_PT.heading,
                    //steps: data_PT.steps,
                    //hotels: data_PT.hotels,
                    title: data_PT.title,
                    subTitle: data_PT.subTitle,
                    buttonSelect: data_PT.buttonSelect,
                    buttonSelected: data_PT.buttonSelected,
                    notsure: data_PT.notsure,
                    nodta: data_PT.nodta,
                    btnAccept: data_PT.btnAccept,
                    resorts: data_PT.resorts,
                    steps: data_PT.steps,
                    hotels: [],
                    query: {
                        type: "Weddings",
                        destinations: [],
                        capacity: "24",
                    }
                };
                break;
            default:
                this.state = {
                    titleOne: data.titleOne,
                    //nodta: data.nodta,
                    maxpeople: data.maxpeople,
                    heading: data.heading,
                    //steps: data.steps,
                    //hotels: data.hotels,
                    title: data.title,
                    subTitle: data.subTitle,
                    buttonSelect: data.buttonSelect,
                    buttonSelected: data.buttonSelected,
                    notsure: data.notsure,
                    nodta: data.nodta,
                    btnAccept: data.btnAccept,
                    resorts: data.resorts,
                    steps: data.steps,
                    hotels: [],
                    query: {
                        type: "Weddings",
                        destinations: [],
                        capacity: "24",
                    }
                };
                break;
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.activeHeading = this.activeHeading.bind(this);
        this.form = React.createRef()
    }

    componentDidMount() {

        // Obtener el estado recibido desde Home: query
        const query = null
        try {
            query = this.props.history.location.state.query;
        } catch (exception) {
            localStorage.quizHomeFrm0R = JSON.stringify(this.props.history.location.state.query)
        }

        const queryState = query == null ? JSON.parse(localStorage.quizHomeFrm0R) : query;
        let { resorts } = this.state;
        let all = 0
        queryState.destinations.forEach(element => {
            if (element == "all") {
                all = 1
            }
        });
        if (all == 1) {
            this.setState({ hotels: resorts });
        } else {
            let getResorts = []
            for (let index = 0; index < queryState.destinations.length; index++) {
                const element = queryState.destinations[index];
                resorts.forEach(elementSub => {
                    if (elementSub.name == element) {
                        getResorts.push(elementSub)
                    }
                });
            }
            this.setState({ hotels: getResorts });
        }
        this.setDataForm()
    }
    dataContetn(hotels, city) {
        return this.vns.venues(hotels.venues)
    }
    emptyData = 0
    indice = 0
    resorts(htlContent, city) {
        let titleIndicador = 0
        let html = []
        let htmlContent = []
        let indicador = 0
        let { buttonSelect } = this.state;
        let capacity = JSON.parse(localStorage.quizHomeFrm0R).capacity
        let isContent = 0
        capacity=parseInt(capacity == "" ? 0 : capacity)

        htlContent.forEach(content => {
            if (
                capacity==99?content.capacity >= 50:content.capacity >= capacity
               ) {
                this.emptyData = 1
                this.indice++
                indicador++
                html.push(
                    <div className="resort" key={this.indice}>
                        <div className={"heading " + (city.replace(" ", "")) + this.indice} onClick={this.activeHeading.bind(this, (city.replace(" ", "")) + this.indice)} type="div">
                            <section className="check-container">
                                <Input type={"checkbox"} required styleForm={"circle"} name={content.title.replace(/ /g, "-")}
                                    value={content.title} id={city.replace(" ", "") + this.indice} title={content.title}>
                                </Input>
                                <div className="option" component="inputwedd">
                                    <button type="button" className="btn pink">{buttonSelect}</button>
                                </div>
                            </section>
                        </div>
                        <div className="content container">
                            <section component="resortvenues">{this.dataContetn(content.venues, city)}</section>
                        </div>
                    </div>
                )
                if (indicador >= 2 || htlContent.length == (titleIndicador + 1)) {
                    indicador = 0
                    isContent = 1
                    htmlContent.push(<div className="resort-content" key={this.indice + "zbcd"}>{html}</div>)
                    html = []
                }
            }
            titleIndicador++
        });
        if (isContent == 0) {
            setTimeout(() => {
                document.getElementById((city).replace(" ", "")).style = "display:none"
            }
                , 200
            )
        }
        return (htmlContent)
    }
    setDataForm() {
        try {
            setTimeout(() => {
                if (localStorage.quizHomeFrm0 == null) {
                    this.props.history.push("/", {})
                }
                if (localStorage.quizHomeFrm1 != null) {
                    let json = JSON.parse(localStorage.quizHomeFrm1)
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
    activeHeading(index, e) {
        let header = this.form.current.querySelector("." + index + "")
        if (header == null) {
            return null
        }
        let button = null
        let checkbox = null
        let { buttonSelected, buttonSelect } = this.state;
        /* if (index == null) {
             index = header.length
         }*/
        if (e != null) {
            e = e.target.type
        }
        if (e != null) {
            //header = header[index]
            if (header.className.indexOf("heading-active") < 0) {
                header.classList.add("heading-active")
                button = header.querySelectorAll("button")[0]
                checkbox = header.querySelectorAll("input")[0]
                if (button) {
                    button.setAttribute('disabled', true)
                    button.innerText = buttonSelected
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
                    button.innerText = buttonSelect
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

        console.log(e)
        if (flag > 0) {
            /*const data = Array.from(formData.entries()).reduce((memo, pair) => ({
                [pair[0]]: pair[1],
            }), {});*/
            this.required(e, 0)
            //console.log(data)
            localStorage.setItem("quizHomeFrm1", JSON.stringify(this.serealizeForm(e.target)))
            this.props.history.push("quiz-resorts/decor", {})//formone:data,dataHome:this.props.location.state.dataHome.home

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
        let { heading, steps, hotels, titleOne, subTitle, buttonSelected, notsure, nodta, btnAccept } = this.state;
        return (
            <Layout title="Resort Quiz">
                {this.state.heading != null ?
                    <section page="quizresorts" >
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
                                <div className="indicator">
                                    <div className="number">
                                        <p className="description">2</p>
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
                                        <p className="description">3</p>
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
                                        <p className="description">3</p>
                                    </div>
                                    <div className="title">
                                        <p className="description numn-step">{steps.four.title}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Titlesection title={titleOne} subtitle={subTitle} />

                        <form className="resorts" onSubmit={this.onSubmit.bind()} ref={this.form}>
                            {hotels &&
                                hotels.map((hotel, key) => (
                                    <div className="city " key={key}>
                                        {
                                            hotel.content.length > 0 ?
                                                <>
                                                    <div className="container" >
                                                        <div className="title container" id={(hotel.city).replace(" ", "")}>
                                                            <h2 className="subtitle">
                                                                {hotel.city}
                                                            </h2>
                                                        </div>

                                                        {this.resorts(hotel.content, hotel.city)}
                                                    </div>
                                                </>
                                                : <p className="description" style={{ paddingLeft: "8px" }}>
                                                    {nodta} {hotel.city}
                                                    <br />
                                                    <br />
                                                </p>

                                        }
                                    </div>
                                )
                                )}
                            {this.emptyData == 1 ?
                                <>
                                    <div className="heading not-sure" type="div" onClick={this.activeHeading.bind(this, "not-sure")}>
                                        <section className="check-container container">
                                            <Input type={"checkbox"} styleForm={"circle"} name="notSure"
                                                value={"notsure"} id={"notsure"} title={notsure} >
                                            </Input>
                                            <div className="option" component="inputwedd">
                                                <button className="btn pink" >{buttonSelected}</button>
                                            </div>
                                        </section>
                                    </div>
                                    <div className="to-center inicial" component="inputwedd">
                                        <input type="submit" className="btn pink" value={btnAccept} />
                                    </div>
                                </>
                                :
                                <>
                                    <br />
                                    <br />
                                    <p className="description">{this.state.maxpeople}</p>
                                    <div className="to-center inicial" style={{ margin: "auto", width: "max-content", marginBottom: "7%", marginTop: "7%" }}
                                        onClick={() => { localStorage.endquiz = true }}
                                        component="inputwedd">
                                        <button onClick={() => { this.props.history.push("/", {}) }} className="btn white">back</button>
                                    </div>
                                </>
                            }
                        </form>
                    </section>
                    : <div></div>}
            </Layout>
        );
    }

    handleNext(e) {
        console.log(e)
    }
}

export default withRouter(QuizResorts);

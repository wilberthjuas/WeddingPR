import React, { Component } from 'react';
import {
    Sliderprincipal, Footermobile, Footer,
    CallUs, PreviewBox
} from '../../components';
import { Input } from '../../components/wirefragment';
import { Sliders } from '../../components';
import { Iconwedd } from '../../components/wirefragment';
import json from './sample';
import { Titlesection } from '../../components/wirefragment';
import Tabstwo from '../../components/tabstwo';
import Barprogress from '../../components/barprogress';
class Sample extends Component {
    state = {}
    constructor() {
        super();
        this.state = {
            sliderSample: [],
            previewBox: {},
            checkBoxList: [],
            select: {},
            selected: null
        }
    }

    componentDidMount() {
        this.setState({
            Title: json.title,
            Subtitle: json.subtitle,
            description: json.description,
            sliderSample: json.sliderSample,
            previewBox: json.previewBox,
            checkBoxList: json.checkBoxList,
            select: [
                ["Alabama", "AL"],
                ["Alaska", "AK"],
                ["American Samoa", "AS"],
                ["Arizona", "AZ"],
                ["Arkansas", "AR"],
                ["California", "CA"],
                ["Colorado", "CO"],
                ["Connecticut", "CT"],
                ["Delaware", "DE"],
                ["District Of Columbia", "DC"],
                ["Federated States Of Micronesia", "FM"],
                ["Florida", "FL"],
                ["Georgia", "GA"],
                ["Germany", "GM"],
                ["Guam", "GU"],
                ["Hawaii", "HI"],
                ["Idaho", "ID"],
                ["Illinois", "IL"],
                ["Indiana", "IN"],
                ["Iowa", "IA"],
                ["Kansas", "KS"],
                ["Kentucky", "KY"],
                ["Louisiana", "LA"],
                ["Maine", "ME"],
                ["Marshall Islands", "MH"],
                ["Maryland", "MD"],
                ["Massachusetts", "MA"],
                ["Michigan", "MI"],
                ["Minnesota", "MN"],
                ["Mississippi", "MS"],
                ["Missouri", "MO"],
                ["Montana", "MT"],
                ["Nebraska", "NE"],
                ["Nevada", "NV"],
                ["New Hampshire", "NH"],
                ["New Jersey", "NJ"],
                ["New Mexico", "NM"],
                ["New York", "NY"],
                ["North Carolina", "NC"],
                ["North Dakota", "ND"],
                ["Northern Mariana Islands", "MP"],
                ["Ohio", "OH"],
                ["Oklahoma", "OK"],
                ["Oregon", "OR"],
                ["Palau", "PW"],
                ["Pennsylvania", "PA"],
                ["Puerto Rico", "PR"],
                ["Rhode Island", "RI"],
                ["South Carolina", "SC"],
                ["South Dakota", "SD"],
                ["Tennessee", "TN"],
                ["Texas", "TX"],
                ["Utah", "UT"],
                ["Vermont", "VT"],
                ["Virgin Islands", "VI"],
                ["Virginia", "VA"],
                ["Washington", "WA"],
                ["West Virginia", "WV"],
                ["Wisconsin", "WI"],
                ["Wyoming", "WY"]
            ]

        })
        this.dataselect = this.state
    }
    dataselect = []
    pasise() {
        console.log(this.state.select, this.dataselect)
        return this.state.select
    }


    render() {
        if (this.state.sliderSample.length) {
            return (
                <section page="sample">
                    <Sliderprincipal slides={this.state.sliderSample} />
                    <Titlesection icon="palace-crown" color="pink" title={this.state.Title} subtitle={this.state.Subtitle} description={this.state.Description} />
                    <PreviewBox content={this.state.previewBox.content} />
                    <div style={{ display: "flex" }}>

                        {this.state.checkBoxList.map((element, index) => {
                            return (
                                <Input keyValue={index} type={"checkBoxSquare"} title={element.title} id={"whichoption-" + index} name={"whicOp"} checkboxRound={true} />
                            )
                        })
                        }

                    </div>
                    {/******************** */}

                    <center>
                        <div style={{ display: "inline-block" }}>
                            <div style={{ display: "flex" }}>
                                {this.state.checkBoxList.map((element, index) => {
                                    return (
                                        <Input styleForm={"filledcircle"} keyValue={index} type={"radio"} title={element.title} id={"filledcircle-" + index} name={"filledcircle"} value="as" />
                                    )
                                })
                                }
                            </div>
                            <div style={{ display: "flex" }}>
                                {this.state.checkBoxList.map((element, index) => {
                                    return (
                                        <Input styleForm={"filledcircle"} keyValue={index + 1} type={"radio"} title={element.title} id={"1filledcircle-" + index} name={"1filledcircle"} value="as" />
                                    )
                                })
                                }
                            </div>
                            <div style={{ display: "flex" }}>
                                {this.state.checkBoxList.map((element, index) => {
                                    return (
                                        <Input styleForm={"square"} keyValue={index} type={"radio"} title={element.title} id={"square-" + index} name={"square"} />
                                    )
                                })
                                }
                            </div>
                            <div style={{ display: "flex" }}>
                                {this.state.checkBoxList.map((element, index) => {
                                    return (
                                        <Input styleForm={"circle"} keyValue={index} type={"radio"} title={element.title} id={"circle-" + index} name={"circle"} />
                                    )
                                })
                                }
                            </div>
                            <Input type={"checkbox"} styleForm={"filledcircle"} name="filledcirclecheckbox" id="filledcirclecheckbox" title="filledcirclecheckbox" />
                            <Input type={"checkbox"} styleForm={"circle"} name="circlecheckbox" id="circlecheckbox" title="circlecheckbox" />
                            <Input type={"checkbox"} styleForm={"square"} name="squarecheckbox" id="squarecheckbox" title="squarecheckbox" />
                            <Input type={"checkbox"} styleForm={"heart"} name="heart-check" id="heart-check" title="heart" />
                            <Input type={"radio"} styleForm={"heart"} name="heart-radio" id="heart-radio" title="heart" />


                            <Input type={"text"} text={"text"} placeholder={"text"} name="text" id="text" />
                            <Input type={"email"} text={"email"} placeholder={"email"} name="email" id="email" />
                            <Input type={"password"} text={"password"} name="password" id="password" />
                            <Input type={"search"} text={"search"} placeholder={"search"} name="search" id="search" />
                            <Input type={"tel"} text={"tel"} name="tel" id="tel" />
                            <Input type={"button"} value={"button"} name="button" id="button" />
                            <br />
                            <Input type={"href"} value={"href"} to="https://github.com/" name="href" id="href" />
                            <br />
                            <Input type={"submit"} value={"btn-submit"} name="btn-submit" id="btn-submit" />
                            <br />
                            <Input type={"button"} value={"link"} to={"/link"} name="link" id="link" />
                            <br />
                            <Input type={"buttton"} value={"icon buttton"} widthIcon={"heart-full"} />
                            <br />
                            <Input type={"button"} value={"icon text extra large button"} color={"white"} widthIcon={"heart-full"} />
                            <br />
                            <Input type={"reset"} value={"icon text extra large reset"} color={"white"} widthIcon={"heart-full"} />
                            <br />
                            <Input type={"href"} widthIcon={"heart-full"} value={"href"} to="https://github.com/" name="href" id="href" />
                            <br />
                            <Input type={"href"} widthIcon={"heart-full"} value={"href"} to="https://github.com/" name="href" id="href" />
                            <br />
                            <Input type={"href"} widthIcon={"heart-full"} value={"href"} to="https://github.com/" name="href" id="href" />
                            <br />
                            <Input type={"view-more"} widthIcon={"heart-full"} value={"view more"} to="https://github.com/" name="href" id="href" target="_blank" />
                            <br />
                            este
                            <Input type={"radio"} styleForm={"circle"} name="destinationRadio" id={"destinationRadio"} alt="sample" img={""} >
                                <img src="https://e-commercepr.s3.amazonaws.com/assets/images/takethenextstep/mobile/ttns-moon-palace-cancun.jpg" />
                            </Input>
                            <br />
                            <br />
                            <Input type={"checkbox"} styleForm={"heart"} name="heart-check" id="heart-check2" title="heart" />
                            <Tabstwo>
                                <a>1</a>
                                <a>2</a>
                                <a>3</a>
                            </Tabstwo>
                            <br />
                            <Input type={"select"}
                                data={this.pasise()}
                                withSearch
                                placeholder={"with Search"}
                                selectDefault={0}
                                getData={(e) => { this.setState({ selected: e.target.getAttribute("value") }); console.log(e.target.getAttribute("value")) }}
                            />
                            <hr />
                            <div component="inputwedd">
                                <input type="text" onChange={(e) => { this.setState({ value: e.target.value }) }} />
                            </div>
                            <hr />
                            <button onClick={(e) => { console.log(this.state) }}>asd</button>
                            <hr />
                            <Input type={"select"} placeholder={"without Wearch"}
                                data={["Japón", "Toki", "Nueva York"]}
                            />
                            <br />
                            <Input type={"select"}
                                data={["Japón", "Toki", "Nueva York"]}
                                firstEmpty
                                selectDefault={0}
                            />
                            <br />
                            <Barprogress size={5} progress={0} />
                            <br />
                        </div>
                    </center>
                    <div className="container">
                        <Tabstwo>
                            <a>contenedor</a>
                            <a>testeo tabs</a>
                        </Tabstwo>
                        <Tabstwo>
                            <a>texto1</a>
                            <a>contenedor</a>
                            <a>testeo tabs</a>
                        </Tabstwo>
                        <Tabstwo>
                            <a>texto1</a>
                            <a>contenedor</a>
                            <a>testeo tabs</a>
                            <a>testeo tabs</a>
                            <a>texto1</a>
                            <a>contenedor</a>
                            <a>testeo tabs</a>
                            <a>testeo tabs</a>
                        </Tabstwo>
                        <Tabstwo>
                            <a>texto de relleno</a>
                            <a>poco texto</a>
                            <a>demaciado textoc aca 1</a>
                            <a>4</a>
                            <a>5</a>
                            <a>0-4::5 Items</a>
                            <a>7</a>
                            <a>sample-test</a>
                            <a>texto de relleno</a>
                            <a>poco texto</a>
                            <a>demaciado textoc aca 1</a>
                            <a>4</a>
                            <a>5</a>
                            <a>0-4::5 Items</a>
                            <a>7</a>
                            <a>sample-test</a>
                        </Tabstwo>
                    </div>
                    <br />
                    <br /><br /><br /><br /><br /><br />
                    <center style={{ fontSize: "30px" }}>0-3::4 Items</center>
                    <Sliders nameSlide={"sample-test"}>
                        <section><div>0</div></section>
                        <section><div>1</div></section>
                        <section><div>2</div></section>
                        <section><div>3</div></section>
                    </Sliders>
                    <br /><br /><br /><br /><br /><br />
                    <center style={{ fontSize: "30px" }}>0-4::5 Items</center>
                    <Sliders nameSlide={"sample-test"}>
                        <section><div>0</div></section>
                        <section><div>1</div></section>
                        <section><div>2</div></section>
                        <section><div>3</div></section>
                        <section><div>4</div></section>
                    </Sliders>
                    <br /><br /><br /><br /><br /><br />
                    <center style={{ fontSize: "30px" }}>0-5::6 Items</center>
                    <Sliders nameSlide={"sample-test"}>
                        <section><div>0</div></section>
                        <section><div>1</div></section>
                        <section><div>2</div></section>
                        <section><div>3</div></section>
                        <section><div>4</div></section>
                        <section><div>5</div></section>
                    </Sliders>
                    <br /><br /><br /><br /><br /><br />
                    <center style={{ fontSize: "30px" }}>0-7::8 Items</center>
                    <Sliders nameSlide={"sample-test"}>
                        <section><div>0</div></section>
                        <section><div>1</div></section>
                        <section><div>2</div></section>
                        <section><div>3</div></section>
                        <section><div>4</div></section>
                        <section><div>5</div></section>
                        <section><div>6</div></section>
                        <section><div>7</div></section>
                    </Sliders>
                    <br /><br /><br /><br /><br /><br />
                    <div className="container-movil">
                        <div className="div-sample rem">
                            Sample(width: initial 320px)<br />
                            Sample(height: initial 120px)
                    </div>
                    </div>
                    <br /><br /><br /><br /><br /><br />
                    <Footer />
                    <Footermobile />
                </section>
            );
        } else {
            return (<section page="sample"></section>);
        }
    }
}

export default Sample;
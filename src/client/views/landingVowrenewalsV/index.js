import React, { Component } from 'react';
import { Footer, Sliderprincipal, Footermobile, landingVowrenewals, Mainmenu, MenuResorts, Navbar } from '../../components';
import { Titlesection, Iconwedd, Input } from '../../components/wirefragment';
import data from './datos';
import data_es from './datos_es';
import data_quiz from '../quizfinish/data'
import data_quiz_ES from '../quizfinish/data_ES'
import WithContext from '../../app/Context';
import json_now_ES from '../offersinterna/internaOffersEs.js';
import json_now from '../offersinterna/internaOffers.js';
import { Link } from 'react-router-dom';
import HtmlParser from 'react-html-parser/lib/HtmlParser';

class landingVowrenewalsV extends Component {
    state = {}

    constructor() {
        super();
        this.state = {
            sliderPrincipal: [],
        }
        this.activetabs = this.activetabs.bind(this)
    }

    componentDidMount() {
        if (localStorage.langWeddings === "es") {
            this.setState({
                lang: "es",
                sliderPrincipal: data_es.sliderPrincipal,
                contentPage:data_es.contentPage,
                linkOne:data_es.linkOne,
                linkTwo:data_es.linkTwo,
                list:data_es.list
            });
        } else {
            this.setState({
                sliderPrincipal: data.sliderPrincipal,
                contentPage:data.contentPage,
                linkOne:data.linkOne,
                linkTwo:data.linkTwo,
                list:data.list
            });
        }

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
    activetabs(index, e) {
        setTimeout(() => {
            this.setState({
                tab1: index == 1 ? true : false,
                tab2: index == 2 ? true : false,
                tab3: index == 3 ? true : false,
                tab4: index == 4 ? true : false,
            })
        })
    }
    render() {
        const { getData } = this.props.app.currentPage;
        if (this.state.sliderPrincipal.length) {
            let { lang, sliderPrincipal, linkOne, linkTwo, pageDs,contentPage} = this.state;
            console.log(contentPage);
            return (
                <div page={"page"}>
                    <section page="landingmainscreen">
                        <nav component="navbar" className="nav_height">
                            <div className="container">
                                <div className="mask"></div>
                                <a className={"navbar-brand"} style={{ cursor: "pointer" }} onClick={() => {
                                    window.location = "en"
                                }} >
                                    <Iconwedd icon="palace-weddings-logo"></Iconwedd>
                                </a>
                                <div className="menu_actions">
                                    {/*-----------------------------------------*/}
                                    <ul>
                                        <li className={"item_top " + (this.state.tab1 ? "active" : "")} onClick={this.activetabs.bind(this, 1)}>
                                            <span style={{ marginTop: "3px;" }}><Iconwedd icon="phone" color="white" /></span>
                                    &nbsp;
                                    1-877-725-4933
                                        &nbsp;<Iconwedd icon="chevron-down" color="white" />&nbsp;
                                    <ul className="submenu phone" style={{ opacity: this.state.tab1 ? "1" : "0" }}>
                                                <li><span className="callus">US &amp; Canada Reservations:</span>&nbsp;<a href="tel:1 (877) 725-4933" target="_blank"><span style={{ color: "var(--light-melon)" }}>1-877-725-4933</span></a></li>
                                                <li><span className="callus">UK Reservations:</span>&nbsp;<a href="tel:0-808-258-0083" target="_blank"><span style={{ color: "var(--light-melon)" }}>0-808-258-0083</span></a></li>
                                                <li><span className="callus">Mexico Reservations:</span>&nbsp;<a href="tel:8008416641" target="_blank"><span style={{ color: "var(--light-melon)" }}>800-841-6641</span></a></li>
                                            </ul>
                                        </li>
                                        <li className={"item_top " + (this.state.tab3 ? "active" : "")} onClick={() => {
                                            window.open(localStorage.langWeddings == "en" ? "/en/contact-us" : "/es/contacto")
                                        }}>
                                            {localStorage.langWeddings == "en" ? "Contact Us" : "Contacto"}
                                    &nbsp;{/*<Iconwedd icon="chevron-down" color="white" />&nbsp;*/}
                                        </li>
                                        {/*}  <li className={"item_top " + (this.state.tab4 ? "active" : "")} onClick={this.activetabs.bind(this, 4)} style={{ textTransform: "capitalize" }}>
                                    <span style={{ marginTop: "3px;" }}><Iconwedd icon="lang-button" color="white" /></span>&nbsp;
                                        {(localStorage.langWeddings + "")}
                                    &nbsp;<Iconwedd icon="chevron-down" color="white" />&nbsp;
                                    <ul className="submenu lang" style={{ opacity: this.state.tab4 ? "1" : "0" }}>
                                        <li onClick={() => { location.href = "en/landingmainscreen"; }} >En</li>
                                        <li onClick={() => { location.href = "es/landingmainscreen"; }}>Es</li>
                                    </ul>
                            </li>*/}
                                    </ul >
                                    {/*-----------------------------------------*/}
                                </div >
                            </div >
                        </nav >
                    </section >
                    <section page="landingmainscreen">
                        <Sliderprincipal slides={sliderPrincipal} />
                        <Titlesection title={contentPage.title} />
                        <br />
                        <div className="content_description">
                            <Titlesection description={contentPage.description} />
                            <br/>
                            <article component="titlesection" class="titlesection">
                                <ul>
                                    {HtmlParser(contentPage.list)}
                                </ul>
                            </article>
                            <div style={{textAlign:"center"}}>
                                <div style={{display:"inline-block",margin:"20px"}}>
                                    <Input color="pink" to={linkOne.url} type="button" value={linkOne.text} target={false} />
                                </div>
                                <div  style={{display:"inline-block",margin:"20px"}}>
                                    <Input color="pink" to={linkTwo.url} type="button" value={linkTwo.text} target={false}/>
                                </div>
                            </div>
                        </div>
                    </section>
                    <br /><br />
                    <br /><br />
                        <Footer landing={true}/> <Footermobile landing={true} />
                </div>
            );
        } else {
            return (<section page="landingmainscreen"> &nbsp; </section>);
        }
    }
}

export default WithContext(landingVowrenewalsV);
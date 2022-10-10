import { Cell } from '../grid';
import { Grid } from '../../components';
import { Titlesection, Input } from '../../components/wirefragment';
import Compreligioustabs from '../compreligioustabs';
import React, { Component } from 'react';
import { Iconwedd } from '../../components/wirefragment';
import { scroller, Element } from 'react-scroll';




class Compreligiousmain extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            displayImg1: "none",
            displayImg2: "none"
        }
    }


    handleClick = (receive, e) => {
        if (receive == "Palace Resorts Weddings") {
            this.setState({
                displayImg1: this.state.displayImg1 == "none" ? "" : "none"
            });
        } else if (receive == "Traditional Cuisine") {
            this.setState({
                displayImg2: this.state.displayImg2 == "none" ? "" : "none"
            })
        }
    }


    componentDidMount() {
        if (this.props.params.typeWed) {
            const scrollType = {
                duration: 2500,
                delay: 50,
                smooth: true,
                offset: -120,
            };
            scroller.scrollTo(this.props.params.typeWed.toString(), scrollType);
        }
    }

    componentDidUpdate(){
        if (this.props.params.typeWed) {
            const scrollType = {
                duration: 2500,
                delay: 50,
                smooth: true,
                offset: -120,
            };
            scroller.scrollTo(this.props.params.typeWed.toString(), scrollType);
        }
    }

    render() {

        const head = this.props.heading.map((element, index) => {
            return (

                <Titlesection key={index} title={element.title} subtitle={element.title2} description={element.description} />
            )
        });
        const religious_items = this.props.itemsrel.map((element, index) => {
            return (

                <Element key={index} name={element.hashrouter}>

                    <section className="Grid-Row" id={element.hashrouter}>
                        <article className={"wemakeuniq-itmes-content type-" + element.aling}>
                            {element.aling == 1 ?
                                <Grid type="x" className="0">
                                    <Cell large="5" small="12">
                                        <section className="contRel">
                                            <h2 className="text23 bg-caption">{element.title}</h2>
                                            <img src={element.imagen} className="desktop item-img-galery" alt={element.imagen_alt} />
                                            {element.hashrouter == "indian" ? <><div className="color" style={{ display: this.state.displayImg1 }} ></div><img src={element.imagen2} style={{ display: this.state.displayImg1 }} className="desktop item-img-galery otherImg" /><div className="color" style={{ display: this.state.displayImg2 }} ></div>           <img src={element.imagen3} style={{ display: this.state.displayImg2 }} className="desktop item-img-galery otherImg" /></> : ""}
                                        </section>
                                    </Cell>
                                    <Cell large="7" small="12">
                                        <section className="content-1">
                                            <article className="description-btn">
                                                <p className="paragraph">{element.description}</p>
                                                {element.prw.map((data, key) => {
                                                    return <div key={key}><Compreligioustabs onClick={this.handleClick.bind(this, data.title)} titulo={data.title} lista={data.lista} lista2={data.lista2} /></div>
                                                })}

                                                <Grid type="x" className="0" style={{ float: "left", marginTop: "53px" }}>
                                                    <Cell large="8" small="12">
                                                        <p className="paragraph kind">{element.kind}</p>
                                                    </Cell>
                                                    <Cell large="4" small="12">
                                                        <a href="/en/whydestinationweddings">

                                                            <Input type={"button"} typBtn={5} to={element.link} value={element.linkTxt || "Let's Plan"} color={"pink "} />
                                                        </a>
                                                    </Cell>
                                                </Grid>
                                            </article>
                                        </section>
                                    </Cell>
                                    <div className="division-galery"></div>
                                </Grid>
                                :
                                <Grid type="x" className="0">
                                    <Cell large="7" small="12">
                                        <img src={element.imagen} className="movil item-img-galery" alt={element.imagen_alt} />
                                        <section className="content-2">
                                            <article className="description-btn realign">
                                                <p className="paragraph">{element.description}</p>
                                                {element.prw.map((data, key) => {
                                                    return <div key={key}><Compreligioustabs titulo={data.title} lista={data.lista} lista2={data.lista2} /></div>
                                                })}
                                                   {element.newUrl!=null?<Grid type="x" className="0" style={{ float: "left"}}>
                                                    <Cell large="12" small="12">
                                                            <a className="collapselink" href={element.newUrl}> {element.newlink} </a>
                                                    </Cell>
                                                </Grid>:null}
                                                <Grid type="x" className="0" style={{ clear:"both", float: "left", marginTop: "53px" }}>
                                                    <Cell large="8" small="12">
                                                        <p className="paragraph kind">{element.kind}</p>
                                                    </Cell>
                                                    <Cell large="4" small="12">
                                                        <a href="/en/whydestinationweddings">
                                                            <Input type={"button"} typBtn={5} to={element.link} value={element.linkTxt || "Let's Plan"} color={"pink "} />
                                                        </a>
                                                    </Cell>
                                                </Grid>
                                            </article>
                                        </section>
                                    </Cell>
                                    <Cell large="5" small="12">
                                        <section className="contRel">
                                            <h2 className="text23 bg-caption">{element.title}</h2>
                                            <img src={element.imagen} className="desktop item-img-galery" alt={element.imagen_alt} />
                                        </section>
                                    </Cell>
                                    <div className="division-galery"></div>

                                </Grid>
                            }
                        </article>
                        <div className="separadorwemake"></div>
                    </section>

                </Element>
            )
        });


        return (

            <section component="compreligiousmain" className="container">
                <section className="desktop">
                    {head}
                    <section className="container">
                        {religious_items}
                    </section>
                </section>
                <div className="divicion-section"></div>
            </section>

        )
    }
}


class Compreligiousmainmov extends Component {

    constructor() {
        super();
        this.handleCollapse = this.handleCollapse.bind(this);

        this.state = {
            collapseTab: (115 /16) + "rem",
            titleCollapse: "tabtitle",
            chevronTab: "chevron-down",
            chevronColor: "white",
            chevronTerms: "bg-chevron-down-pink",
            refs: [],
            tabToCollapse: 0
        }
    }


    handleCollapse(tab, e) {
        if (tab == this.state.tabToCollapse) {

            this.setState({
                collapseTab: this.state.collapseTab == (115 /16) + "rem" ? "auto" : (115 /16) + "rem",
                titleCollapse: this.state.titleCollapse=="tabtitle"?"tabtitlecollapse":"tabtitle",
                chevronTab: this.state.chevronTab == "chevron-up" ? "chevron-down" : "chevron-up",
                chevronColor: this.state.chevronColor == "pink" ? "white" : "pink"
            });
        } else {
            this.setState({
                tabToCollapse: tab,
                collapseTab: this.state.collapseTab == (115 /16) + "rem" ? "auto" : "auto",
                titleCollapse: this.state.titleCollapse=="tabtitle"?"tabtitlecollapse":"tabtitlecollapse",
                chevronTab: this.state.chevronTab == "chevron-up" ? "chevron-up" : "chevron-up",
                chevronColor: this.state.chevronColor == "pink" ? "pink" : "pink"
            })
        }
    }

    componentDidMount() {
        for (let index = 0; index < this.props.itemsrel.length; index++) {
            let ref = this.index = React.createRef()
            this.setState(state => {
                const refs = state.refs.push(ref);
                return refs;
            })
        }
    }

    render() {
        let tabs = this.props.itemsrel.map((tabs, e) => {

            return <section component="compreligiousmainmov" key={e}>
                <article className="singletab" style={{ height: this.state.tabToCollapse == e ? this.state.collapseTab : null }}>
                    <article style={{position: "relative"}}>
                        <img alt={tabs.Title} onClick={this.handleCollapse.bind(this, e)} src={tabs.imagen} ></img>
                        <div className={this.state.tabToCollapse==e ? this.state.titleCollapse:"tabtitle"} onClick={this.handleCollapse.bind(this, e)}>
                            <h2 className="imgcaptions">{tabs.title}</h2>&nbsp;<Iconwedd icon={this.state.tabToCollapse == e ? this.state.chevronTab : "chevron-down"} color={this.state.tabToCollapse == e ? this.state.chevronColor : "white"} />
                        </div>
                    </article>
                    <article className="content">
                        <p className="paragraph">
                            {tabs.description}
                        </p>
                        {tabs.prw.map((data, key) => {
                            return (
                                <Compreligioustabs titulo={data.title} lista={data.lista} lista2={data.lista2} key={key} />
                            )
                        })}
                    </article>
                    <section className="ReligiousTabs aling-center-tabs">
                        <span className="desc-p-movil p-intro">
                    {tabs.kind}</span>
                            <Input type={"button"} typBtn={5} to={tabs.link} value={tabs.linkTxt || "Let's Plan"} color={"pink "} />
                    </section>
                </article>
            </section>
        })

        const head = this.props.heading.map((element, index) => {
            return (
                <Titlesection key={index} title={element.title}  to={element.link} subtitle={element.title2} description={element.description} />
            )
        });

        return (
            <section component="compreligiousmain">
                <section className="movil">

                    {head}
                    <section component="compreligiousmainmov">
                        <section className="cont-mainnov">
                            {tabs}
                        </section>
                    </section>
                </section>
            </section>
        )
    }
}



export { Compreligiousmain, Compreligiousmainmov };
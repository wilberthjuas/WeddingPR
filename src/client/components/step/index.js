import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser'

class Step extends Component {

    constructor() {
        super();
    }

    render() {
        return (
            <section component="">
                <article className="movil">
                    {this.props.steps.map((element, index) => {
                        return (
                            <article key={index} component="step">
                                {element.order % 2 == 0 ?
                                    <div className={"textRight " + element.extraClass}>
                                        {element.flechamobile ? <img alt={"flechamobile"} className={element.claseFlecha} src={element.flechamobile} /> : ""}
                                        <article className="header-aling">
                                            <article className="title-aling">
                                                <section className={element.order==10||element.order==6||element.order==12?"extra content-text-ttl":"content-text-ttl"}>
                                                    <h2 className="title textinLine">{ReactHtmlParser(element.title)}</h2>
                                                    <article className="description">
                                                        <div className={"content-img-right " + element.imgClass}>
                                                            <img alt={element.title} className={"imageleft movil " + element.imgClass} src={element.imageMov} />
                                                        </div>
                                                        <p className="description">{element.description}</p>
                                                    </article>
                                                </section>
                                            </article>
                                            {element.order != 0 ?
                                                <div className="ordenLeft">
                                                    {element.order}
                                                </div> :
                                                ""}
                                        </article>
                                    </div> :
                                    <div className={"textLeft"}>
                                        {element.flechamobile ? <img alt={"flechamobile"} className={element.claseFlecha} src={element.flechamobile} /> : ""}
                                        <article className="header-aling">
                                            {element.order != 0 ? <div className="ordenright">
                                                {element.order}</div> :
                                                ""}
                                            {element.order == 3 || element.order == 4 || element.order == 6 || element.order == 7 || element.order == 8 || element.order == 10 || element.order == 11 || element.order == 12 ?
                                             
                                                    <h2 className="title textinLine">{ReactHtmlParser(element.title)}</h2>
                                               :
                                             
                                                    <h2 className="title textinLine">{ReactHtmlParser(element.title)} </h2>
                                             
                                            }
                                        </article>
                                        {element.order == 1 || element.order == 2 || element.order == 7 || element.order == 11 || element.order == 12 || element.order == 3 || element.order == 4 || element.order == 5 || element.order == 6 || element.order == 8 || element.order == 9 || element.order == 10 ?
                                            <img alt={element.title} j className={"imagerigth movil " + element.imgClass} src={element.imageMov} /> : ""
                                        }
                                        <p className="description">{element.description}</p>
                                    </div>
                                }
                            </article>
                        )
                    })}
                </article>
                <article className="desktop container">
                    {this.props.steps.map((element, index) => {
                        return (
                            <article key={index} component="step">
                                {element.order % 2 == 0 ?
                                    <div className={"textRight " + element.extraClass}>
                                        <img alt={element.title} className={"imageleft desktop  " + element.imgClass} src={element.imageDesk} />
                                        <div className="containerleft">
                                            {element.flechamobile ?
                                                <img alt={"flechamobile"} className={element.claseFlecha} src={element.flechamobile} /> : ""
                                            }
                                            <div className="ordenright">
                                                {element.order}
                                            </div>
                                            <div>
                                                <h2 className="title textinLine">{ReactHtmlParser(element.title)} </h2>
                                                <h2 className="subtitle textinLine textinLineRight">{element.subtitle}<span className="dummy">a</span></h2>
                                            </div>
                                        </div>
                                        <p className="description descrigth">{element.description}</p>
                                    </div> :
                                    <div className={"textLeft " + element.extraClass}>
                                        <img alt={element.title} className={"imagerigth desktop " + element.imgClass} src={element.imageDesk} />
                                        <div className="containerright">
                                            {element.flechamobile ?
                                                <img alt={"flechamobile"} className={element.claseFlecha} src={element.flechamobile} /> : ""
                                            }
                                            <div className="ordenright">
                                                {element.order}
                                            </div>
                                            <div>
                                                <h2 className="title textinLine textinLineLeft">{ReactHtmlParser(element.title)} </h2>
                                                <h2 className="subtitle textinLine">{element.subtitle}</h2>
                                            </div>
                                        </div>
                                        <p className="description descleft ">{element.description}</p>
                                    </div>
                                }
                            </article>
                        )
                    })}
                </article>
            </section>
        )

    }
};

export default Step;
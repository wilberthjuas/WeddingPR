import React, { Component } from 'react';
import { Cell } from '../grid';
import { Grid } from '../../components';
import { Input, Titlesection } from '../../components/wirefragment';

class PreviewBox extends Component {

    render() {

        let section = this.props.section;

        const mobile = this.props.content.map((element, index) => {
            return (
                <Cell style={{paddingTop:"30px"}} key={index} large={element.title !== "" ? "6" : "12"} small={element.title != "" ? "6" : "12"} middle={element.title != "" ? "6" : "12"}>
                    {element.title != "" ?
                        <div className="content-text-gallery">
                            <article className="itemsGalery">
                                <img className="desktop compliments-palace-resorts" src={element.imageDesk} alt={element.title} />
                                <img className="movil  compliments-palace-resorts" src={element.imageMov} alt={element.title} />
                                <section className="text-style-1">
                                    <h2 className="title">
                                        {element.title}
                                    </h2>
                                    <article className="description-item">
                                        {element.description}
                                    </article>
                                    { section === null ?
                                        <Input type={"button"} typBtn={5} to={element.link} value={element.caption} color={"pink "} />
                                        :
                                        <Input type={"view-more"} typBtn={5} to={element.link} value={element.caption} color={"pink "} />
                                    }
                                </section>
                            </article>
                            <section className="seprator-itemsg"></section>
                        </div>
                        :
                        <span></span>
                    }
                </Cell>)
        });
        const desktop = this.props.content.map((element, index) => {
            return (
                <article key={index} className={element.title != "" ? "real-short" : "real-large"} >
                    {element.title != "" ?
                        <div>
                            <article className="itemsGalery">
                                <img className="desktop compliments-palace-resorts" src={element.imageDesk} alt={element.title} />
                                <img className="movil  compliments-palace-resorts" src={element.imageMov} alt={element.title} />
                                <section className="text-style-1">
                                    <Titlesection
                                        subtitle={element.title}
                                        description={element.description} />
                                    {section === null ?
                                        <Input type={"button"} to={element.link} value={element.caption} color={"pink "} />
                                        :
                                        <div className="to-center">
                                            <Input type={"view-more"} to={element.link} value={element.caption} color={"pink "} />
                                        </div>
                                    }

                                </section>
                            </article>
                            <section className="seprator-itemsg"></section>
                        </div>
                        :
                        <div>
                            <article className="itemsGalery-large">
                                <img className="desktop compliments-palace-resorts" src={element.imageDesk} alt={element.title} />
                                <img className="movil  compliments-palace-resorts" src={element.imageMov} alt={element.title} />
                                <section className="text-style-1 to-center">
                                    <p className="description">
                                        {element.description}
                                    </p>
                                    <Input type={"button"} typBtn={5} to={element.link} value={element.caption} color={"pink "} />
                                </section>
                            </article>
                            <section className="seprator-itemsg"></section>
                        </div>
                    }
                </article>)
        });
        return (
            <section component="previewbox">
                <Grid type="x" className="movil">
                    { mobile }
                </Grid>
                <div style = {{ width: "100%", display: "flex", justifyContent: "center" }}>
                    <article className="desktop center-section-real-gallery">
                        { desktop }
                    </article>
                </div>
            </section>
        )
    }
}
export default PreviewBox;

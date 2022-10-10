import React, { Component } from 'react';
import { Cell } from '../grid';
import { Grid } from '../../components';
import { Link } from "react-router-dom";
import { Input } from '../../components/wirefragment';
import ReactHtmlParser from 'react-html-parser';
class Ourplaningservice extends Component {


    render() {

        const parents = this.props.state.map((element, index) => {
            return (
                <Grid type="x" key={index}>
                    <Cell large="6" small="4">
                        <div className="img-our-planing">
                            <img alt={element.textAlt} src={element.imageDesk} className="our-planing-img desktop" />
                            <img alt={element.textAlt} src={element.imageMov} className="our-planing-img movil" />
                        </div>
                    </Cell>
                    <Cell large="6" small="7">
                        <div className="text-our-planing">
                            <center>
                                <div className="text2 Our-planning-text">{element.title}</div>
                                <div className="text5 uppercase are-free-are">{ReactHtmlParser(element.title2)}</div>
                                <Input to={element.urlBtn} type={"button"} value={element.buttonTxt} typBtn={5} color={"pink btn-getStarted"} />

                            </center>
                        </div>
                    </Cell>
                </Grid>
            )
        });

        return (
            <section component="ourplaningservice" style={{display:"none"}}>
                <div className="our-planing-service container">
                    <section className="container-movil">
                        {parents}
                    </section>
                </div>
                <div className="divicion-section"></div>
            </section>
        )
    }
}
export default Ourplaningservice;
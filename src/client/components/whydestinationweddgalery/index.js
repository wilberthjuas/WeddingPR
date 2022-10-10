import React from 'react';

import { Cell } from '../grid';
import { Grid } from '../../components';
import { Link } from "react-router-dom";

const Whydestinationweddgalery = (props) => {
    const parents = props.galery.map((element, index) => {
        return (
            <div className="Grid-Row" key={index}>
                <div className={"wemakeuniq-itmes-content type-" + element.aling}>
                    {element.aling == 1 ?
                        <Grid type="x" className="0">
                            <Cell large="5" small="12">
                                <div>
                                    <img alt={element.title + " " + element.title2} src={element.imageDesk} className="desktop item-img-galery" />
                                    <img alt={element.title + " " + element.title2} src={element.imageMov} className="movil item-img-galery" />
                                </div>
                            </Cell>
                            <Cell large="7" small="12">
                                <div className="content-1">
                                    <h2 className="bg-caption imgcaptions"><span style={element.number == "" ? { opacity: "0" } : { "": "" }} className="circle">{element.number}</span>{element.title}&nbsp;<span>{element.title2}</span></h2>
                                    <div className="description-btn">
                                        <p className="description description-galery">{element.description}</p>
                                    </div>
                                </div>
                            </Cell>
                            <div className="division-galery"></div>
                        </Grid>
                        :
                        <Grid type="x" className="0">
                            <Cell large="7" small="12">
                                <img alt={element.title + " " + element.title2} src={element.imageMov} className="movil item-img-galery" />
                                <div>
                                    <div className="content-2">
                                        <h2 className="bg-caption imgcaptions"><span className="circle">{element.number}</span>{element.title}&nbsp;<span>{element.title2}</span></h2>
                                        <div className="description-btn">
                                            <p className="description description-galery">{element.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </Cell>
                            <Cell large="5" small="12">
                                <img alt={element.title + " " + element.title2} src={element.imageDesk} className="desktop item-img-galery" />
                            </Cell>
                            <div className="division-galery"></div>
                        </Grid>
                    }
                </div>
                <div className="separadorwemake"></div>
            </div>
        )
    }
    )

    return (
        parents
    );
}
export default Whydestinationweddgalery;
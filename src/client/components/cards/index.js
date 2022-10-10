import React from 'react';

import { Cell } from '../grid';
import { Grid } from '..';
import { Link } from "react-router-dom";

const Cards = (props) => {
    const parents = props.galery.map((element,index) => {
        return (
            <div className="Grid-Row" key={index}>
                <div className="wemakeuniq-itmes-content">
     
                            <div> 
                                    <img src={element.imageDesk} className="desktop item-img-galery"/>
                                    <img src={element.imageMov} className="movil item-img-galery"/>
                            </div>
                            <div>
                                <div className="text23 uppercase bg-caption">{element.title}</div>
                                    <div className="description-btn">
                                        <Grid type="x" className="0">
                                            <Cell large="12" small="7"> 
                                                <div className="desctiption">{element.description}</div>
                                            </Cell>
                                            <Cell large="12" small="5"> 
                                                <Link to={element.urlBtn}><button className="btn btn3 uppercase btn-galery-wemakeunique">{element.buttonTxt}</button></Link>
                                            </Cell>
                                        </Grid>
                                    </div>
                            </div>

                    
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
export default Cards;
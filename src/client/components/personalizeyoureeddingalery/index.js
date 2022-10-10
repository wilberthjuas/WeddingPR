import React from 'react';

import { Cell } from '../grid';
import { Grid } from '../../components';
import { Input } from '../../components/wirefragment';
import ReactHtmlParser from 'react-html-parser';
const Personalizeyoureeddingalery = (props) => {
    let tpe = 0
    const parents = props.Items.map((element, index) => {
        return (
            <Cell key={index} large="4" small="6" middle="6">
                <div className="itemsGalery">
                    <img alt={element.title} className="desktop compliments-palace-resorts" src={element.imageDesk} />
                    <img alt={element.title} className="movil  compliments-palace-resorts" src={element.imageMov} />
                    <section >
                        <p className="description" style={{ margin: "auto", textTransform: "capitalize" }}>
                            {ReactHtmlParser(element.title)}
                        </p>
                    </section>
                    <div className="view-more" onClick={(()=>{ localStorage.amazing=element.indicadorJson})}>
                        <Input type={"view-more"} to={element.url} value={element.textBtn} />
                    </div>
                </div>
                <div className="seprator-itemsg"></div>
            </Cell>
        )
    }
    )

    return (
        <div className="container">
            <Grid type="x" >
                {parents}
            </Grid>
        </div>
    );
}
export default Personalizeyoureeddingalery;
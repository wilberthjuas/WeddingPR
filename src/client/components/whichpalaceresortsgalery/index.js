import React from 'react';

import { Cell } from '../grid';
import { Grid } from '../../components';
import { Link } from "react-router-dom";

const Whichpalaceresortsgalery = (props) => {
    let tpe = 0
    const parents = props.galery.map((element, index) => {
        tpe++
        if (tpe == 2) { tpe = 0 }
        return (
            <div className={"quirky type-g" + tpe} key={index} >
                <input type="radio" name={props.id} value={element.title} id={props.id + "" + index} />
                <div key={index} onClick={props.click.bind(this, -(props.move), element.value, props.id)} name={props.id}>
                    <div className="img-item-which">
                        <label className="background-rosy" htmlFor={props.id + "" + index} />
                        <img alt={element.title} src={element.imageDesk} className="desktop quirkyImg" />
                        <img alt={element.title} src={element.imageMov} className="movil quirkyImg" />
                        <p className="paragraph Quirky ">{element.title}</p>
                    </div>
                </div>
            </div>
        )
    }
    )

    return (
        <div className="galeryContent container" >{parents}</div>
    );
}
export default Whichpalaceresortsgalery;
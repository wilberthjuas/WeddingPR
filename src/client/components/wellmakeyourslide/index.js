import React from 'react';
import Wellmakeyour from '../wellmakeyour';

import { Cell } from '../grid';
import { Grid } from '../../components';
import { Input } from '../../components/wirefragment';
import { Sliders } from '../../components';

const Wellmakeyourslide = (props) => {
    let orientation = "1";
    const parents = props.data.map((element, index) => {//element.orientation=="2" element.orientation=="1"
        if (orientation == "1") {
            orientation = "2";
            return (
                <div className="one" key={index}>
                    <div className="container-movil">
                        <div>
                            <section>
                                <img alt={element.textAlt} src={element.extra.logo[0]} className={"" + element.nombre.toLowerCase() + "-lgo desktop"} />
                                <article className="aling-items-desk">
                                    <p className="description">{element.descripcion}</p>
                                    <p className="description">{element.description2}</p>
                                </article>
                                <img alt={element.textAlt} src={element.extra.logo[0]} className={"" + element.nombre.toLowerCase() + "-lgo movil"} />
                            </section>
                        </div>
                        <img alt={element.textAlt} src={element.cover} className={" " + element.nombre.toLowerCase() + "-img"} />
                    </div>
                    <Input type={"button"} to={'/'+props.lang+'/catalog/'+element.idservice_unidad_negocio} value={props.lang == "en" ? 'CATALOG' : 'VER CATÁLOGO'} color={"pink"} />
                    <div className="catalog-bg" />
                    <div className="separating-line desktop" />
                </div>)
        } else {
            orientation = "1";
            return (
                <div className="two" key={index}>
                    <div className="container-movil">
                        <img alt={element.textAlt} src={element.cover} className={" " + element.nombre.toLowerCase() + "-img"} />
                        <div>
                            <section>
                                <article className="aling-items-desk">
                                    <p className="description">{element.descripcion}</p>
                                    <p className="description">{element.description2}</p>
                                </article>
                                <img alt={element.textAlt} src={element.extra.logo[0]} className={"logo " + element.nombre.toLowerCase() + "-lgo"} />
                            </section>
                        </div>
                    </div>
                    <Input type={"button"} to={'/'+props.lang+'/catalog/'+element.idservice_unidad_negocio} value={props.lang == "en" ? 'CATALOG' : 'VER CATÁLOGO'} color={"pink"} />
                    <div className="catalog-bg " />
                    <div className="separating-line desktop" />
                </div>)
        }
    }
    )

    const parents2 = props.slide[0].slide.map((element, index) => {//element.orientation=="2" element.orientation=="1"
        if (element.orientation == "1") {
            return (
                <div className="one" key={index}>
                    <div className="container-movil">
                        <div>
                            <section>
                                <img alt={element.textAlt} src={element.logo} className={"" + element.name + "-lgo desktop"} />
                                <article className="aling-items-desk">
                                    <p className="description">{element.description}</p>
                                    <p className="description">{element.description2}</p>
                                </article>
                                <img alt={element.textAlt} src={element.logo} className={"" + element.name + "-lgo movil"} />
                            </section>
                        </div>
                        <img alt={element.textAlt} src={element.ImageDesk} className={" " + element.name + "-img"} />
                    </div>
                    <Input type={"button"} to={element.urlBtn} value={element.buttonTxt} color={"pink"} />
                    <div className="catalog-bg" />
                    <div className="separating-line desktop" />
                </div>)
        } else {
            return (
                <div className="two" key={index}>
                    <div className="container-movil">
                        <img alt={element.textAlt} src={element.ImageDesk} className={" " + element.name + "-img"} />
                        <div>
                            <section>
                                <article className="aling-items-desk">
                                    <p className="description">{element.description}</p>
                                    <p className="description">{element.description2}</p>
                                </article>
                                <img alt={element.textAlt} src={element.logo} className={"logo " + element.name + "-lgo"} />
                            </section>
                        </div>
                    </div>
                    <Input type={"button"} to={element.urlBtn} value={element.buttonTxt} color={"pink"} />
                    <div className="catalog-bg " />
                    <div className="separating-line desktop" />
                </div>)
        }
    }
    )



    return (
        <Sliders nameSlide={"wll-make-your"} nonindicator>
            {props.static?parents2:parents}
        </Sliders>
    );
}
export default Wellmakeyourslide;
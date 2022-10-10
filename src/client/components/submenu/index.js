import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import { Cell } from '../grid';
import { Grid } from '../grid';
import { Iconwedd } from '../wirefragment';


const Submenu = (props) => {

    const { match: { params } } = props;
    if (props.menus != null) {
        if (props.title == "Our Resorts & Venues" || props.title == "Resorts") {
            let acumulador = [];
            const parents = props.menus.map((e, index) => {
                if (acumulador.length == 2) {
                    acumulador = []
                }
                if (index == 0) {
                    return (
                        <Cell key={index} style={{ width: "23%" }} >
                            <li>
                                {/*<span className="wedding-sprite-desktop bg-mini-chevron-right-pink"></span>*/}
                                <Iconwedd icon={"chevron-right"} color={"light-melon"} />
                                &nbsp;
                                <Link className="parent" to={e['url']} >{e['Titulo']}</Link>
                                <ul>
                                    {e['menu'].map((a, index) => {
                                        return <li key={index} >
                                            {/*<span className="wedding-sprite-desktop bg-mini-chevron-right-pink"></span>*/}
                                            <Link key={index} className={props.active == a.Url ? "active" : ""} to={a.Url}>{a.Titulo}</Link>
                                        </li>
                                    }
                                    )}
                                </ul>
                            </li>
                        </Cell>)
                } else {
                    if (e['Titulo'] == "Los Cabos") {
                        acumulador.push(
                            <li key={index} style={{ paddingRight: "unset", width: "118%" }}>
                                {/*<span className="wedding-sprite-desktop bg-mini-chevron-right-pink"></span>*/}
                                <Iconwedd icon={"chevron-right"} color={"light-melon"} />
                                &nbsp;
                            <Link className="parent" to={e['url']} >{e['Titulo']}</Link>
                                <ul>{e['menu'].
                                    map((a, index) => {
                                        return (
                                            <li key={index} >
                                                {/*<Iconwedd icon={"chevron-right"} color={"light-melon"} />*/}
                                                {/*<span className="wedding-sprite-desktop bg-mini-chevron-right-pink"></span>*/}
                                                <Link key={index} className={props.active == a.Url ? "active" : ""} to={a.Url}>{a.Titulo}</Link></li>)
                                    })}
                                </ul>
                            </li>);
                    } else {
                        acumulador.push(
                            <li key={index}>
                                {/*<span className="wedding-sprite-desktop bg-mini-chevron-right-pink"></span>*/}
                                <Iconwedd icon={"chevron-right"} color={"light-melon"} />
                                &nbsp;
                            <Link className="parent" to={e['url']} >{e['Titulo']}</Link>
                                <ul>{e['menu'].
                                    map((a, index) => {
                                        return (
                                            <li key={index} >
                                                {/*<Iconwedd icon={"chevron-right"} color={"light-melon"} />*/}
                                                {/*<span className="wedding-sprite-desktop bg-mini-chevron-right-pink"></span>*/}
                                                <Link key={index} className={props.active == a.Url ? "active" : ""} to={a.Url}>{a.Titulo}</Link></li>)
                                    })}
                                </ul>
                            </li>);
                    }
                }
                if (acumulador.length == 2) {
                    return <Cell key={index} small="2">{acumulador}</Cell>;
                } else if (index == 5) {
                    return <Cell key={index} small="2">{acumulador}</Cell>;
                }

            })
            return <ul onMouseLeave={props.mouseout} component="submenu">
                <div className="container">
                    <div><span> {params.lang == "en" ? "Destinations" : "Destinos"}  </span></div>
                    <Grid type="x">{parents}<Cell><img style={{ position: "absolute", top: "0", width: "auto", left: "70%", height: "100%" }} src={'../../../../public/img/weddings/menu/submenu-our-resorts.jpg'}></img></Cell></Grid>
                </div></ul>
        } else {
            let acumulador = [];
            const parents = props.menus.map((e, index) => {

                switch (props.title) {
                    case "Destination Weddings":
                        if (acumulador.length == 2) {
                            acumulador = []
                        }

                        acumulador.push(<li key={index}>
                            <Iconwedd icon={"chevron-right"} color={"light-melon"} />
                            <Link className={props.active == e['Url'] ? "active" : ""} to={e['Url']}>{e['Titulo']}</Link></li>);

                        if (acumulador.length == 2) {
                            return <Cell key={index}>{acumulador}</Cell>;
                        } else if (index == 2) {
                            return <Cell key={index}>{acumulador}</Cell>;
                        }
                        break;
                    case "Nuestros Destinos":
                        if (acumulador.length == 2) {
                            acumulador = []
                        }

                        acumulador.push(<li key={index}>
                            <Iconwedd icon={"chevron-right"} color={"light-melon"} />
                            <Link className={props.active == e['Url'] ? "active" : ""} to={e['Url']}>{e['Titulo']}</Link></li>);

                        if (acumulador.length == 2) {
                            return <Cell key={index}>{acumulador}</Cell>;
                        } else if (index == 2) {
                            return <Cell key={index}>{acumulador}</Cell>;
                        }
                        break;
                    case "Planning":
                        if (acumulador.length == 2) {
                            acumulador = []
                        }

                        acumulador.push(<li key={index}>
                            <Iconwedd icon={"chevron-right"} color={"light-melon"} />
                            <Link className={props.active == e['Url'] ? "active" : ""} to={e['Url']}>{e['Titulo']}</Link></li>);

                        if (acumulador.length == 2) {
                            return <Cell key={index}>{acumulador}</Cell>;
                        }
                        break;
                    case "Organiza":
                        if (acumulador.length == 2) {
                            acumulador = []
                        }

                        acumulador.push(<li key={index}>
                            <Iconwedd icon={"chevron-right"} color={"light-melon"} />
                            <Link className={props.active == e['Url'] ? "active" : ""} to={e['Url']}>{e['Titulo']}</Link></li>);

                        if (acumulador.length == 2) {
                            return <Cell key={index}>{acumulador}</Cell>;
                        } else if (index == 2) {
                            return <Cell key={index}>{acumulador}</Cell>;
                        }
                        break;
                    case "Religious & Cultural Offerings":
                    case "Ceremonias Religiosas y Culturales":
                        if (acumulador.length == 3) {
                            acumulador = []
                        }

                        acumulador.push(<li key={index}>
                            <Iconwedd icon={"chevron-right"} color={"light-melon"} />
                            <Link className={props.active == e['Url'] ? "active" : ""} to={e['Url']}>{e['Titulo']}</Link></li>);

                        if (acumulador.length == 3) {
                            return <Cell key={index}>{acumulador}</Cell>;
                        }

                        break;
                    default:
                        break;
                }

            })
            return <ul onMouseLeave={props.mouseout} component="submenu">
                <div className="container padding20">
                    <Grid type="x" small-up="4">{parents}</Grid>
                    <img src={props.Img} style={{ position: "absolute", left: "67%", width: "725px", top: "0", height: "100%" }}></img>
                </div>
            </ul>;
        }
    } else {
        return (<span></span>)
    }
};

export default withRouter(Submenu);
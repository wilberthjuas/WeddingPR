import React, { Component } from 'react';
import Layout from '../../components/layout';
import { Titlesection } from '../../components/wirefragment';
import { Sliderprincipal } from '../../components';
//import json from '../stepbystep/stepbystep';
import { Link } from 'react-router-dom';

import menus from '../../components/navbar/menu';
import menusES from '../../components/navbar/menu_es';
class Sitemap extends Component {

    state = {
        mainMenu: []
    }
    componentDidMount() {

        // Get the :lang param
        const { match: { params } } = this.props;
        switch (params.lang) {
            case "es":
                this.setState({
                    menuOurResorts: menusES.menuResorts,
                    topMenu: menusES.topMenu,
                    mainMenu: menusES.mainMenu,
                });
                break;
            default:
                this.setState({
                    menuOurResorts: menus.menuResorts,
                    topMenu: menus.topMenu,
                    mainMenu: menus.mainMenu
                });
                break;
        }

    }
    siteMap(menu, top) {

        let siteMap = []
        let key = 0;
        menu.forEach(element => {//1
            key++
            if (top != null) {
                if (key >= 5 || (element.Url == null || element.Url == "/")) {
                    return null
                }
            }
            let SubmenuMap = []
            if (element.Submenu != null) {
                element.Submenu.forEach(elementSub => {//2
                    key++
                    let SubmenuTwo = []
                    if (elementSub.menu != null) {
                        elementSub.menu.forEach(elementTwo => {//3
                            key++
                            SubmenuTwo.push(<li key={key}><Link to={elementTwo.Url} className="link" style={{ fontWeight: "normal" }}>{elementTwo.Titulo}</Link></li>)
                        });
                    }
                    let url = elementSub.Url ? elementSub.Url : elementSub.url
                    SubmenuMap.push(<li key={key}><Link to={url} className="link">{elementSub.Titulo}</Link><ul>{SubmenuTwo}</ul></li>)
                });
            }
            siteMap.push(<li key={key}><Link to={element.Url} className="linkalt">{element.Titulo}</Link> <ul>{SubmenuMap}</ul></li>)

        });
        const { match: { params } } = this.props;
        if (top == null) {
            siteMap.push(
                <li key="thnt"><Link className="linkalt" to={"/" + params.lang + "/"+(params.lang === "en" ?"take-next-step":"da-el-siguiente-paso")}>{ params.lang === "en" ? "Take The Next Step" : "Da el Siguiente Paso" }</Link></li>
            )
        }
        return (siteMap)
    }
    render() {

        const { match: { params } } = this.props;

        return (
            <Layout title = { params.lang === "en" ? "Site Map" : "Mapa del sitio" } >
                {this.state.mainMenu.length &&
                    <>
                    <section page="sitemap">
                        <Sliderprincipal slides={[{
                            imageDesk:"https://e-commercepr.s3.amazonaws.com/assets/images/Otros/sitemap-desktop.jpg",
                            imageMov:"https://e-commercepr.s3.amazonaws.com/assets/images/Otros/sitemap-mobile.jpg",
                            title:"", title2:"", description:"", buttonTxt:"", urlBtn:"" }
	                    ]} />
                        <Titlesection title={"Site <span>Map</span>"}/>
                        <section className="container" style={{padding:"0px 1.2rem"}}>
                            <ul>{this.siteMap(this.state.topMenu, "top")}</ul>
                            <hr style={{ backgroundColor: "var(--light-melon)", height: "2px", borderStyle: "none" }} />
                            <ul>{this.siteMap(this.state.mainMenu)}</ul>
                        </section>
                    </section>
                    </>
                }
            </Layout>
        );

    }
}
export default Sitemap;
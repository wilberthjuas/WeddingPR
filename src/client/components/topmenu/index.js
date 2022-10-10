import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import { Iconwedd, Input, Titlesection } from '../wirefragment';
import { Element } from 'react-scroll';

class Topmenu extends Component {

    constructor(props) {
        super(props);
        this.toSubscribe = this.toSubscribe.bind(this);
        this.showHandler = this.showHandler.bind(this);
        this.toogleLogin = this.toogleLogin.bind(this);
    }

    // @description: Función para cambiar el idioma
    handleLocale(selectedLang = "es") {
        const { history } = this.props;
        this.setState({ location: selectedLang });
        history.push(`/${selectedLang}`);
        window.location.reload();
    }

    showHandler(e, params) {
        console.log(e);
        console.log(params);


        if (e == "show") {
            document.querySelector("#HideDesk").style.display = "block";
            document.querySelector("#ShowDesk").style.display = "none";
            document.querySelector("#firstNameDesk").type = "text"
        } else {
            document.querySelector("#ShowDesk").style.display = "block";
            document.querySelector("#HideDesk").style.display = "none";
            document.querySelector("#firstNameDesk").type = "password"
        }
    }

    toogleLogin() {
        let check = document.querySelector(".form-login-desktop").style.display

        check == "none" ? document.querySelector(".form-login-desktop").style.display = "block" : document.querySelector(".form-login-desktop").style.display = "none"

        window.addEventListener("click", (e) => {
            if (e.target.getAttribute("d") == null) {

                document.querySelector(".form-login-desktop").style.display = "none"
            }
        });
    }

    toSubscribe() {
        let targetElement = document.querySelector(".footer-resorts");
        if (targetElement) {
            // Usar scrollIntoView() para ir al contenido
            if (typeof targetElement.scrollIntoView === 'function') {
                targetElement.scrollIntoView();
            } else {
                console.error(':goTo: scrollIntoView not available for', targetElement);
            }
        } else {
            console.error(':goTo: invalid selector "', selector, '" returned: ', targetElement);
        }
    }

    nameUs() {
        let nameUs = ""
        if (sessionStorage.bride) {
            nameUs = sessionStorage.bride.split(",")[1]
            nameUs = nameUs == null ? sessionStorage.bride : nameUs
        }
        return nameUs
    }

    render() {

        return <ul component="topmenu" ref={this.props.menuLiTop}>{this.props.topmenu.map((menus, index) => {
            let hide = menus.valdSesn != null//menus.valdSesn ? sessionStorage.logged_in == "true" ? true : false : false  //key>7 login
            if (hide) {//con sesion inicada
                if (menus.valdSesn == true && (sessionStorage.logged_in == "true" && sessionStorage.logged_in != null)) {
                    let icon = []
                    if (menus.icon) {
                        icon.push(<Iconwedd icon={menus.icon} color={"light-melon"} />)
                    }
                    return (<li className={"border_left "+(menus.concatUsu ? "activeLi" : "")}> <span class=""></span><a href={menus.Url} >
                        {menus.Titulo + (menus.concatUsu ? this.nameUs() : "")} {icon}</a></li>)
                } else {
                    if (menus.valdSesn == false && (sessionStorage.logged_in == "false" || sessionStorage.logged_in == null)) {
                        return (<li className=""><span class=""></span><a href={menus.Url}>{menus.Titulo}</a></li>)
                    }
                }
            } else {
                let icons = "";
                if (menus.Titulo == "Phone") {
                    icons = <Iconwedd icon={"phone"} color={"light-melon"} />
                    {/*<span key={index} className={menus.Titulo + " wedding-sprite-desktop bg-phone-icon "}></span>;*/ }
                } else if (menus.Titulo == "Lang") {
                    icons = <Iconwedd icon={"lang-button"} color={"light-melon"} />
                    {/*<span key={index} className={menus.Titulo + " wedding-sprite-desktop bg-lang-icon "}></span>;*/ }
                }
                else {
                    icons = <a key={index} className={menus.Titulo}>{menus.Titulo}</a>
                }
                if (menus.Submenu == null) {
                    return (
                        <li key={index} className={menus.Key == 11 ? "border-white-left" : ""}>
                            <span className={menus.Titulo == "xxx" ? "wedding-sprite-desktop bg-mail-icon-desk " : ""}></span>

                            {menus.Subs == 1 ?
                                <a key={index} onClick={this.toSubscribe} className={menus.Titulo}><Iconwedd icon={"envelope"} color={"light-melon"} /> {menus.Titulo}</a>
                                :
                                menus.Titulo == "Login" ?
                                    <div >
                                        <span d="true" onClick={this.toogleLogin}>{menus.Titulo}</span>

                                        <div d="true" className="form-login-desktop" d="true" style={{ display: "none" }}>
                                            <h2 d="true" style={{ textAlign: "center" }} className="title">Welcome! <br /> Let the best day of your life begin</h2>
                                            <form d="true" className="form-login">
                                                <div>
                                                    <Input d="true" type={"text"} text={"Email Address"} id="email" name="enmail" required placeholder={"Email Address"} />
                                                </div>
                                                <div d="true" style={{ display: "flex" }}>
                                                    <div d="true">
                                                        <Input d="true" type={"password"} text={"Password"} id="firstNameDesk" name="firstName" required placeholder={"Password"} />
                                                    </div >
                                                    <div d="true" className="show-hide">
                                                        <Input d="true" type={"button"} id="ShowDesk" handleClick={this.showHandler.bind(this, "show")} value={"Show"} />
                                                        <Input d="true" type={"button"} id="HideDesk" handleClick={this.showHandler.bind(this, "hide")} value={"Hide"} />
                                                    </div>
                                                </div>
                                                <div className="inline-buttons">
                                                    <Input d="true" type={"checkbox"} required styleForm={"square"} name={"remember_m"} id={"remember_m"} title={"Remember me"} />
                                                    <Input d="true" type={"submit"} value={"Submit"} />
                                                </div>
                                            </form>
                                        </div>
                                    </div>

                                    :
                                    <Link to={menus.Url}>{menus.Titulo}</Link>
                            }

                        </li>
                    )
                } else {
                    return <li key={index} onClick={this.props.handleClick.bind(this, menus.Titulo)}>
                        {icons}
                        &nbsp;&nbsp;
                    <Iconwedd icon={this.props.variable == menus.Titulo ? "chevron-up" : "chevron-down"} color={"light-melon"} />
                        {/*<span
                        className={this.props.variable == menus.Titulo ?
                            "wedding-sprite-desktop bg-mini-chevron-up-pink" :
                            "wedding-sprite-desktop bg-mini-chevron-down-pink"
                        }>
                    </span>*/}
                        <ul className={menus.Titulo == "Phone" ? "submenu phone" : "submenu"}
                            style={{ display: this.props.variable == menus.Titulo ? "block" : "none" }}>
                            {menus.Titulo == "Phone" ?
                                menus.Submenu.map((e, index) => {
                                    return <li key={index} >
                                        <span className="callus">{e.Titulo}</span>&nbsp;<a href={e.Url} target="_blank">
                                            <span style={{ color: "var(--light-melon)" }}>{e.Titulo2}</span>
                                        </a>
                                    </li>
                                }
                                ) : menus.Titulo == "Our Resorts Websites" || menus.Titulo == "Nuestro Sitios Web" ?
                                    menus.Submenu.map((e, index) => {
                                        return <li key={index} >
                                            <a href={e.Url} target="_blank"> {e.Titulo}
                                                <span style={{ color: "var(--light-melon)" }}>{e.Titulo2}</span>
                                            </a>
                                        </li>
                                    }
                                    ) :
                                    menus.Submenu.map((e, index) => {
                                        return <li key={index}>
                                            <button className="btnLang" type="button" onClick={this.handleLocale.bind(this, e.Titulo)}>
                                                {e.Titulo}
                                            </button>
                                        </li>
                                    })}
                        </ul>
                    </li>
                }
            }
        })}

        </ul>

    }
};

export default withRouter(Topmenu);
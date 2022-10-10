import React, { Component } from 'react';
import { FormNewsletter } from '..';
import { Link, withRouter } from "react-router-dom";
import { Iconwedd, Input } from '../../components/wirefragment';

class MenuMobile extends Component {

    constructor(props) {
        super(props);
        this.menuLiMovil = React.createRef();
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.showHandler = this.showHandler.bind(this);
        this.state = {
            currentLang: 'en'
        };
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        this.setState({ currentLang: params.lang });
    }

    handleChange = (e) => {
        const { history } = this.props;
        this.setState({ location: e.current });
        history.push(`/${e.target.value}`);
        window.location.reload();
    }


    handleClick(e) {
        e.preventDefault();
        if (document.querySelector(".form-login").classList.contains("open-form")) {
            document.querySelector(".form-login").classList.remove("open-form")
        } else {
            document.querySelector(".form-login").classList.add("open-form")
        }
    }

    showHandler(e, params) {
        if (e == "show") {
            document.querySelector("#Hide").style.display = "block";
            document.querySelector("#Show").style.display = "none";
            document.querySelector("#firstName").type = "text"
        } else {
            document.querySelector("#Show").style.display = "block";
            document.querySelector("#Hide").style.display = "none";
            document.querySelector("#firstName").type = "password"
        }
    }

    componentDidUpdate() {
        let urlActual = window.location.pathname.split("/")
        let nav = this.menuLiMovil.current.children;
try {
    for (let i = 0; i < nav.length - 1; i++) {
        nav[i].children[0].children[0].className = ""
        if (urlActual.length > 2) {
            let posUrl = nav[i].children[0].attributes[1].value.split("/");
            let selec = posUrl.length > 2 ? posUrl[posUrl.length - 1] : "noneDataCharge";
            if (urlActual[2] == selec) {
                nav[i].children[0].children[0].className = "active"
            } else {
                nav[i].children[0].children[0].className = ""
            }
        }
    }    
} catch (error) {
    console.log(error);
    
}

    }


    render() {


        const internas = this.props.items.filter((element, index) => !element.hasOwnProperty('External'));
        const externas = this.props.items.filter((element, index) => element.hasOwnProperty('External'));

        const items = internas.map((item, index) => {
            let hide = item.valdSesn!=null//item.valdSesn ? sessionStorage.logged_in == "true" ? true : false : false  //key>7 login
            if (hide) {//con sesion inicada
                if(item.valdSesn==true && (sessionStorage.logged_in=="true" && sessionStorage.logged_in!=null)){
                    return (<li className={(item.concatUsu?"activeLi":"")+" nav-item"}> <span class=""></span><a href={item.Url} className="nav-link nav-link-weddings">
                        {item.Titulo}</a></li>)
                }else{
                    if(item.valdSesn==false && (sessionStorage.logged_in=="false"  || sessionStorage.logged_in==null)){
                        return (<li className="nav-item"><span class=""></span><a href={item.Url} className="nav-link nav-link-weddings">{item.Titulo}</a></li>)
                    }
                }
            } else {

            return (
                <li key={index} className="nav-item">
                    {item.Titulo == "Our Resorts Websites" ?
                        <span to={item.Url} className="nav-link nav-link-weddings">{item.Titulo}
                            <p className=""></p>
                        </span>
                        : item.Titulo == "Nuestros Sitios Web" ?
                            <span to={item.Url} className="nav-link nav-link-weddings">
                                {item.Titulo}
                                <p className=""></p>
                            </span>
                            : item.Titulo == "Login" ?
                                <span className="nav-link nav-link-weddings nav-login" to={item.Url}>
                                    <a onClick={this.handleClick}>{item.Titulo}</a>
                                    <form className="form-login">
                                        <div className="first_input">
                                            <Input type={"text"} text={"Email Address"} id="email" name="enmail" required placeholder={"Email Address"} />
                                        </div>
                                        <div style={{ display: "flex" }} className="second_input">
                                            <div style={{ width: "70%" }}>
                                                <Input type={"password"} text={"Password"} id="firstName" name="firstName" required placeholder={"Password"} />
                                            </div>
                                            <div className="show_hide_container" style={{ width: "30%", alignSelf: "flex-end" }}>
                                                <Input type={"button"} id="Show" handleClick={this.showHandler.bind(this, "show")} value={"Show"} />
                                                <Input type={"button"} id="Hide" handleClick={this.showHandler.bind(this, "hide")} value={"Hide"} />
                                            </div>
                                        </div>
                                        <div className="inline-buttons">
                                            <Input type={"submit"} value={"Submit"} />
                                            <Input type={"checkbox"} required styleForm={"square"} name="remember_me" id="remember_me" title={"Remember me"} />
                                        </div>
                                    </form>
                                </span>
                                :
                                <Link onClick={this.props.handler.bind(this, 1)} className="nav-link nav-link-weddings" to={item.Url}>
                                    {item.Titulo}
                                    <p className=""></p>
                                </Link>
                    }
                </li>
            )

                }
        })

        const items_websites = externas.map((item, index) => {
            return (
                <li key={index} className="nav-item nav-external">
                    <a className="nav-link" href={item.Url} target="_blank">
                        {item.Titulo}
                        <p className=""></p>
                    </a>
                </li>
            )
        })

        let urlActual = window.location.pathname.split("/");

        const estilo = {
            textTransform: "uppercase"
        };

        const button = (
            <select className="select-lang" onChange={this.handleChange.bind(this)} value={this.state.currentLang} style={estilo} >
                <option value="en">EN</option>
                <option value="es">ES</option>
            </select>
        );

        return (
            <div component="menumobile">
                <div className="bg-top-menu-mobile" style={{ paddingTop: 'unset' }}>
                    {button}
                    <Iconwedd icon="chevron-down" color="white arrow-menu"></Iconwedd>
                    <a href="https://co.pinterest.com/prweddings/" target="_blank" className="websites-external">
                        <Iconwedd icon={"pinterest-circled"} color={"pink center icon-social"} />
                    </a>
                    <a href="https://www.instagram.com/palaceresortsweddings/?hl=es-la" target="_blank" className="websites-external">
                        <Iconwedd icon={"instagram-circled"} color={"pink center  icon-social"} />
                    </a>
                    <a href="https://www.facebook.com/PalaceResortsWeddings/" target="_blank" className="websites-external">
                        <Iconwedd icon={"facebook-circled"} color={"pink center  icon-social"} />
                    </a>
                    <a href="https://www.youtube.com/user/PalaceWeddings" target="_blank" className="websites-external">
                        <Iconwedd icon={"youtube-circled"} color={"pink center  icon-social"} />
                    </a>
                    <a href="https://twitter.com/prweddings" target="_blank" className="websites-external">
                        <Iconwedd icon={"twitter-circled"} color={"pink center  icon-social"} />
                    </a>
                </div>
                <div className="list-links">
                    <ul ref={this.menuLiMovil} className="menu-mobile-content">
                        {items}
                        {items_websites}

                        <div><img className="menu-flores" src={"https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/Flores.png"} /></div>
                    </ul>
                    <FormNewsletter />
                    <div className="contact">
                        <div style={{ zIndex: 99 }}>
                            <span ><a style={{ color: "var(--light-melon)" }} href="tel:1 (877) 725-4933">1 (877) 725-4933</a></span>
                        </div>
                        <div style={{ color: "white" }}>
                            {localStorage.langInt == 1 ?
                                <span>Available Mon - Fri 9:00  a.m.-8:00 p.m. Sat 9:00 a.m.-2:00 p.m. EST</span>
                                :
                                <span>Horario Lun - Vie 9:00  a.m.-8:00 p.m. Sab 9:00 a.m.-2:00 p.m. EST</span>
                            }
                            <br />
                            <span>weddings@palaceresorts.com</span>
                        </div>
                    </div>
                </div>
            </div>

        )
    };

}

export default withRouter(MenuMobile);
import React, { Component } from 'react';
import { Input } from '../../components/wirefragment';
import ReactHtmlParser from 'react-html-parser';
import api from '../../app';
import ReactDOMServer from 'react-dom/server';
import { withRouter } from 'react-router-dom';

// JSON Data
import jsonData from '../../../../locales/footer-newsletter';

class FormNewsletter extends Component {

    constructor(props) {
        super(props);
        this.email = React.createRef();
        this.thanks = React.createRef();
        this.sendHubspot = this.sendHubspot.bind(this)
        this.handleShow = this.handleShow.bind(this);
        this.checkForm = React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.refForm = React.createRef();
        this.sendMail = this.sendMail.bind(this);
        this.sendMail2 = this.sendMail2.bind(this);
        this.state = {
            content: {},
            formOver:false
        };
    }

    componentDidMount() {

        this.email.current.addEventListener('click', this.handleShow.bind());
        const { match: { params } } = this.props;
        switch (params.lang) {
            case "es":
                this.setState({
                    content: {
                        title: jsonData.newsletter[1].title,
                        span: jsonData.newsletter[1].span,
                        placeholder: jsonData.newsletter[1].placeholder,
                        terms: jsonData.newsletter[1].terms,
                        offers: jsonData.newsletter[1].offers,
                        submit: jsonData.newsletter[1].submit
                    }
                });
                break;
            case "pt":
                this.setState({
                    content: {
                        title: jsonData.newsletter[2].title,
                        span: jsonData.newsletter[2].span,
                        placeholder: jsonData.newsletter[2].placeholder,
                        terms: jsonData.newsletter[2].terms,
                        offers: jsonData.newsletter[2].offers,
                        submit: jsonData.newsletter[2].submit
                    }
                });
                break;
            default:
                this.setState({
                    content: {
                        title: jsonData.newsletter[0].title,
                        span: jsonData.newsletter[0].span,
                        placeholder: jsonData.newsletter[0].placeholder,
                        terms: jsonData.newsletter[0].terms,
                        offers: jsonData.newsletter[0].offers,
                        submit: jsonData.newsletter[0].submit
                    }
                });
                break;
        }
    }

    handleShow() {
        if (innerWidth > 1024) {
            if (this.checkForm.current.classList[1] == null) {
                //this.checkForm.current.style = "height:170px"
                this.checkForm.current.classList.add("open-form")
            } 
        } else {
            if (this.checkForm.current.classList[1] == null) {
                this.checkForm.current.classList.add("open-form")
            }
        }
    }

    async sendHubspot(formData) {
        var querystring = require('querystring');
        /*enviar los campos tal cual como estan definidos en hubpot*/
        var postData = querystring.stringify({
            'email': formData.emailnewslettewr ,
            'hs_context': JSON.stringify({
                "pageUrl": "https://weddings.palaceresorts.com",
                "pageName": "Weddings Palace Resorts"
            })
        });
        api.sendHubspot(postData,"2fd8fbfb-7a08-4684-9e2a-cad5c4d0936d");
    }

    async handleSubmit(e) {
        e.preventDefault();
        api.loginEmail().then(
            res => {
                this.sendMail2(res.data)
                this.sendMail(res.data)
            }
        ).catch(e => console.error(e));
    }

    sendMail(res) {
        const email = "wilsanchez@palaceresorts.com,edgmartinez@palaceresorts.com"
        var object = {}
        let formData = new FormData(this.refForm.current);
        formData.forEach((value, key) => { object[key] = value });
        let htmlbody = ReactDOMServer.renderToStaticMarkup(this.htmlDisplay(object))

        let emailData = {
            TO_ADDRESSES: email,
            CC_ADDRESSES: "",
            TEXTBODY: "Subscribe To Our Newsletter",
            HASH: "Subscribe To Our Newsletter",
            SUBJECT: "Subscribe To Our Newsletter",
            HTMLBODY: htmlbody,
            token: res.token
        }

        api.sendEmail(emailData).then(
            res => {
                console.log("enviado");
                this.setState({ formOver: true })
               this.sendHubspot(object);
            }
        ).catch(e => console.error(e));
    }

    sendMail2(res){
        var object = {}
        let formData = new FormData(this.refForm.current);
        formData.forEach((value, key) => { object[key] = value });
        let htmlbody = "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"https://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">"+ReactDOMServer.renderToStaticMarkup(this.htmlDisplay2())

        let emailData ={
          TO_ADDRESSES:object.emailnewslettewr,
          CC_ADDRESSES: "",
          TEXTBODY:"Confirmation Subscription Newsletter - Weddings Palace Resorts",
          HASH: "Confirmation Subscription Newsletter - Weddings Palace Resorts",
          SUBJECT:"Confirmation Subscription Newsletter - Weddings Palace Resorts",
          //FORCE_SES: true,
          HTMLBODY: htmlbody,
          token: res.token
        }
        api.sendEmail(emailData)
        .then(res =>{
            console.log("res:",res)
        }
        ).catch( e => console.error(e));
    }


    htmlDisplay(object) {
        var fecha = new Date
        return (
            <div>
                <h1 style={
                    {
                        color: "#000000",
                        fontSize: "48px",
                        fontFamily: "Tangerine",
                        fontWeight: "normal",
                        textAlign: "center",
                        "marginBottom": "4px"
                    }
                }>Subscribe</h1>
                <h2 style={
                    {
                        color: "#f86290",
                        fontSize: "60px",
                        fontFamily: "Miso",
                        fontWeight: "300",
                        fontStretch: "normal",
                        fontStyle: "normal",
                        lineHeight: "1",
                        letterSpacing: "normal",
                        textAlign: "center",
                        textTransform: "uppercase",
                        margin: "0px",
                        marginBottom: "20px"
                    }
                }>Newsletter</h2>
                <p><h2>Submited on:</h2> {fecha.getDate()}/{(fecha.getMonth() + 1) >= 10 ? (fecha.getMonth() + 1) : "0" + (fecha.getMonth() + 1)}/{fecha.getFullYear()}</p>
                <p><h2>Email:</h2>  {object.emailnewslettewr} </p>
                <p><h2>I have read & agree to the Terms & Conditions and Privacy Notice</h2> YES</p>
                <p><h2>I love getting deals! I wish to receive offers & other communications</h2> YES</p>

            </div>
        )
    }

    htmlDisplay2(){
        //console.log("url actual:", urlActual)

        const estilos_btn = {
            color: "#ffffff",
            padding: "10px 15px",
            margin: "10px 15px",
            backgroundColor: "#ea8685",
            textDecoration: "none",
            fontFamily: "Arial",
            textAlign: "center",
            display: "inline-block"
          }

        const estilos_table = {
            width: "320px",
            margin: "auto",
            textAlign: "center",
            border:"0",
            tableLayout:"fixed"
        }

        const estilos_texto = {
            fontFamily: "Arial",
            textAlign: "center",
            fontSize: "16px",
            padding:"10px 0px"
        }

        const estilos_titulo = {
            fontFamily: "Arial",
            textAlign: "center",
            fontSize: "22px",
            padding:"15px 0px"
        }

        const estilos_enlace = {
            fontFamily: "Arial",
            textAlign: "left",
            fontSize: "12px",
            color:"#fff",
            textDecoration:"none",
            paddingLeft:"8px"
        }
 

        const imagen_especial = {
            
            
            width: "10px",
            marginLeft: "auto"
        }
        

        return (
           
            <html xmlns="https://www.w3.org/1999/xhtml">
                <head>
                    <title>Confirmation Subscription Newsletter - Weddings Palace Resorts</title>
                    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0 " />
                </head>
                <body>
                    <table style={estilos_table} cellspacing="0" cellpadding="0" >
                        <tr>
                            <td colSpan="12"> 
                                <img alt="Palace Resorts Weddings" src="https://e-commercepr.s3.amazonaws.com/assets/images/mails/header-email.jpg"></img>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="12" style={estilos_titulo}>
                                   {"Thank you for suscribing to our newsletter"}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="12"> 
                                <img alt="Happy couple in the beach" style={{width:"320px"}}src="https://e-commercepr.s3.amazonaws.com/assets/images/offers/List/honeymoon-offer-mobile.jpg"></img>
                            </td>
                        </tr>
                        <tr >
                            <td colSpan="12"style={estilos_titulo} >     
                                {"Discover the Value of Love "}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="12" style={estilos_texto}>
                                   {" Destination Wedding & Honeymoon Offers"}
                            </td>
                        </tr>                        
                        <tr>
                            <td colSpan="12">
                                <a type={"href"} href={"https://weddings.palaceresorts.com/en/offers"} target='_blank' style={estilos_btn}>{"View Offers"}</a> 
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="12">
                               &nbsp;
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="3">
                                <hr/>
                            </td>
                            <td colSpan="6" style={estilos_titulo}>
                                  {" Our Awards"}
                            </td>
                            <td colSpan="3">
                                <hr/>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="6">
                                <img style={{width:"55px"}}src="https://e-commercepr.s3.amazonaws.com/assets/images/mails/four-diamond.jpg"  alt="Four diamond award" ></img>
                            </td>
                            {/* <td colSpan="4">
                                <img style={{width:"55px"}} src="https://e-commercepr.s3.amazonaws.com/assets/images/mails/tripadvisor.jpg"  alt="Tripadvisor award"></img>
                                </td> */}
                            <td colSpan="6">
                                <img style={{width:"55px"}} src="https://e-commercepr.s3.amazonaws.com/assets/images/mails/five-diamonds.jpg"  alt="Five diamond award"></img>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="12">
                               &nbsp;
                            </td>
                        </tr>
                        <tr style={{backgroundColor:"#ff8788"}}>
                            <td colSpan="12">
                               &nbsp;
                            </td>
                        </tr>
                        <tr style={{backgroundColor:"#ff8788"}}>
                            <td colSpan="3">
                               <a type={"href"} href={"https://co.pinterest.com/prweddings/"} target='_blank' > <img style={{width:"35px"}}src="https://e-commercepr.s3.amazonaws.com/assets/images/mails/pinterest-icon.jpg" alt="Pinterest"></img></a>
                            </td>
                            <td colSpan="2">
                            <a type={"href"} href={"https://www.facebook.com/PalaceResortsWeddings/"} target='_blank' > <img style={{width:"35px"}}src="https://e-commercepr.s3.amazonaws.com/assets/images/mails/facebook-icon.jpg" alt="Facebook"></img></a>
                            </td>   
                            <td colSpan="2">
                            <a type={"href"} href={"https://www.instagram.com/palaceresortsweddings/?hl=es-la"} target='_blank' > <img style={{width:"35px"}}src="https://e-commercepr.s3.amazonaws.com/assets/images/mails/instagram-icon.jpg" alt="Instagram"></img></a>
                            </td>
                            <td colSpan="2">
                            <a type={"href"} href={"https://twitter.com/prweddings"} target='_blank' >  <img style={{width:"35px"}}src="https://e-commercepr.s3.amazonaws.com/assets/images/mails/twitter-icon.jpg" alt="Twitter"></img></a>
                            </td>
                            <td colSpan="3">
                            <a type={"href"} href={"https://www.youtube.com/user/PalaceWeddings"} target='_blank' > <img style={{width:"35px"}}src="https://e-commercepr.s3.amazonaws.com/assets/images/mails/youtube-icon.jpg" alt="Youtube"></img></a>
                            </td>
                        </tr>
                        <tr style={{backgroundColor:"#ff8788"}}>
                            <td colSpan="12">
                               &nbsp;
                            </td>
                        </tr>
                        <tr style={{backgroundColor:"#ff8788"}}>
                            <td colSpan="4">
                                 <img style={{width:"75px"}}src="https://e-commercepr.s3.amazonaws.com/assets/images/mails/palace-resorts.jpg" alt="Palace Resorts"></img>
                            </td>
                            <td colSpan="4">
                                 <img style={{width:"75px"}}src="https://e-commercepr.s3.amazonaws.com/assets/images/mails/le-blanc.jpg" alt="Le Blanc Spa Resorts"></img>
                            </td>
                            <td colSpan="4">
                                  <img style={{width:"75px"}} src="https://e-commercepr.s3.amazonaws.com/assets/images/mails/moon-palace.jpg" alt="Moon Palace Cancun"></img>
                            </td>
                        </tr>
                        <tr style={{backgroundColor:"#ff8788"}}>
                            <td colSpan="12">
                               &nbsp;
                            </td>
                        </tr>
                        <tr style={{backgroundColor:"#ff8788"}}>
                           
                                <td colSpan="6"  align="left" >
                                   <a alt="Palace Resorts" type={"href"} href={"https://www.palaceresorts.com"} target='_blank' style={estilos_enlace}>{"PALACE RESORTS"}</a>
                                </td>
                                <td>
                                    <img  alt="Chevron"  style={imagen_especial} src="https://e-commercepr.s3.amazonaws.com/assets/images/mails/chevron.jpg"></img>
                                </td>
                                <td colSpan="4"  align="left" >
                                   <a type={"href"} href={"https://www.palaceresorts.com"} target='_blank' style={estilos_enlace}>{"PALACE ELITE"}</a>
                                </td>
                                <td>
                                    <img  alt="Chevron"  style={imagen_especial} src="https://e-commercepr.s3.amazonaws.com/assets/images/mails/chevron.jpg"></img>
                                </td>
                            
                        </tr>
                        <tr style={{backgroundColor:"#ff8788"}}>
                            <td colSpan="6"  align="left" >
                                <a type={"href"} href={"https://www.moonpalacecancun.com"} target='_blank' style={estilos_enlace}>{"MOON PALACE RESORTS"} </a>
                            </td>
                            <td>
                                <img style={imagen_especial} alt="Chevron" src="https://e-commercepr.s3.amazonaws.com/assets/images/mails/chevron.jpg"></img> 
                            </td>
                            <td colSpan="4"  align="left" >  
                                 <a type={"href"} href={"https://meetings.palaceresorts.com"} target='_blank' style={estilos_enlace}>{"MEETINGS"}</a>
                            </td>
                            <td>
                                <img style={imagen_especial} alt="Chevron"src="https://e-commercepr.s3.amazonaws.com/assets/images/mails/chevron.jpg"></img> 
                            </td>
                            
                        </tr>
                        <tr style={{backgroundColor:"#ff8788"}}>
                            <td colSpan="6" align="left">  
                                <a type={"href"} href={"https://www.leblancsparesorts.com"} target='_blank' style={estilos_enlace}>{"LE BLANC SPA RESORTS"}</a>
                            </td>
                            <td>
                                <img  alt="Chevron" style={imagen_especial} src="https://e-commercepr.s3.amazonaws.com/assets/images/mails/chevron.jpg"></img> 
                            </td>
                            <td colSpan="4" align="left">  
                                <a type={"href"}href={"https://www.palaceproagents.com"} target='_blank' style={estilos_enlace}>{"TRAVEL AGENTS"}</a> 
                            </td>

                            <td>
                                <img style={imagen_especial} alt="Chevron"src="https://e-commercepr.s3.amazonaws.com/assets/images/mails/chevron.jpg"></img> 
                            </td>
                        </tr>
                        <tr style={{backgroundColor:"#ff8788"}}>
                            <td colSpan="12">
                               &nbsp;
                            </td>
                        </tr>
                    </table>                   
                </body>
            </html>
        )
    } 



    render() {

        let { content } = this.state;
        const { match: { params } } = this.props;

        return (
            <section component="FormNewsletter" className="FormNewsletter">
                <article className="container" id="subscribeContainer">

                {this.state.formOver?<p className="description" ref={this.thanks}>{params.lang=="en"?"Thank you, your submission has been received":"Gracias, tu envío ha sido recibido."}</p>:
                    <form ref={this.refForm} onSubmit={this.handleSubmit}>
                        <div className="input-field-newsletter">
                            <span className="text-paris">{content.title}  </span> <span className="text-rosy"> {content.span}</span>
                            <Input required type={"email"} placeholder={content.placeholder} refInput={this.email} id={"emailnewsletter"} name={"emailnewslettewr"} />
                        </div>
                        <div className="content-check" ref={this.checkForm}>
                            <div className="checks">
                                <Input required type={"checkbox"} styleForm={"square"} name={"termsconditions"} id={"termsconditions" + this.props.type} title={content.terms} />
                            </div>
                            <div className="checks">
                                <Input required type={"checkbox"} styleForm={"square"} name={"receiveoffers"} id={"receiveoffers" + this.props.type} title={content.offers} />
                            </div>
                            <center className="content-submit">
                                <Input type={"submit"} color={"pink"} value={content.submit} />
                            </center>
                        </div>
                    </form>}
                </article>
            </section>
        )
    }
}
export default withRouter(FormNewsletter);
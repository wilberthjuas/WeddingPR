import React, { Component } from 'react';
import { CallUs } from '../../components';
import { Titlesection, Input } from '../../components/wirefragment';
import ReactDOMServer from 'react-dom/server';
import api from '../../app';

class Helpfulinspiringinfo extends Component {

    constructor() {
        super();
        this.refForm = React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.sendMail = this.sendMail.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.state = {
            disabled: "disabled",
            pdfSend:[],
            displayConfirm : "none",
            displayFail : "none"
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        let pdfSend = this.state.pdfSend;
        var object = {}
        let formData = new FormData(this.refForm.current);
        formData.forEach((value, key) => { object[key] = value });
        if(pdfSend.length)
        {
            this.setState({
                alert1:this.state.alert1?0:0
            })
            if(object.email!=''){
                this.setState({
                    alert2:this.state.alert2?0:0
                })
                this.sendCRM(object)
                api.loginEmail()
                .then(res => {
                    this.sendMail(res.data)
                }).catch(e => console.error(e));
            }else{
                this.setState({
                    alert2:1
                })
                return false

            }
        }else{
                this.setState({
                    alert1:1
                })

                return false;
        }
    }
    sendMail(res) {
        var object = {}
        let formData = new FormData(this.refForm.current);
        formData.forEach((value, key) => { object[key] = value });
        const email = object.email
        let htmlbody = ReactDOMServer.renderToStaticMarkup(this.htmlDisplay(object))
        let emailData = {
            TO_ADDRESSES: email,
            CC_ADDRESSES: "",
            TEXTBODY: "Helpful Inspiring Info - Weddings Palace Resorts",
            HASH: "Helpful Inspiring Info - Weddings Palace Resorts",
            SUBJECT: "Helpful Inspiring Info - Weddings Palace Resorts",
            HTMLBODY: htmlbody,
            token: res.token
        }
        api.sendEmail(emailData)
            .then(() => { 
                this.setState({
                    disabled:"",
                    displayConfirm:"block"
                })
            }).catch(e => {
                this.setState({
                    disabled:"",
                    displayFail:"block"
                })
                console.error(e);
            });
    }
    async sendCRM(object) {
        var fecha = new Date

        var pdfs = "";

        if(object.destinationBenefits!=null){
            pdfs+=object.destinationBenefits+","
        }      
        
        if(object.dream!=null){
            pdfs+=object.dream+","
        }
        
        if(object.leBlancInspirtations!=null){
            pdfs+=object.leBlancInspirtations+","
        }
        if(object.palaceInspirtations!=null){
            pdfs+= object.palaceInspirtations+","
        }

        const dataCRM =
        {
            "estado": 1,
            "fecha_creacion": fecha.getDate() + "-" + (fecha.getMonth() + 1) >= 10 ? (fecha.getMonth() + 1) : "0" + (fecha.getMonth() + 1) + "-" + fecha.getFullYear(),
            "usuario_creacion": "wedding_interface",
            "idlead_interface_venta": 2,
            "descripcion": "Palace Weddings",
            "idlead_contacto": 0,
            "informacion_interface": {
                "nombre_contacto": "Weddings PDF",
                "apellido_contacto": "Downlaod PDF",
                "correo": object.email,
                "pdf" :pdfs ,
                "lead_general" : true
            }
        }
        api.sendDataCRM(dataCRM)
            .then(res => {
            }).catch(e => console.error(e));
    }

    changeHandler = event => {
        const name = event.target.name;
        const value = event.target.value;
        console.log(name,value)
        let pdfSend = this.state.pdfSend
        if(pdfSend.indexOf(name)>=0){
            pdfSend.splice(pdfSend.indexOf(name),1)
        }else{
            pdfSend.push(name)
        }
        this.validateForm()
        this.setState({
            pdfSend:pdfSend
        })
    } 

    validateForm(){
        let pdfSend = this.state.pdfSend
        var object = {}
        let formData = new FormData(this.refForm.current);
        formData.forEach((value, key) => { object[key] = value });
        if(pdfSend.length>0&&object.email!='')
        {
            this.setState({
                disabled : '',
                displayConfirm:"none",
                displayFail:"none"
            })
        }else{
            this.setState({
                disabled : 'disabled',
                displayConfirm:"none",
                displayFail:"none"
            })
        }
    }


    htmlDisplay(object) {
        const estilos_btn = {
            float: "left",
            marginBottom: "5px",
            marginTop: "5px",
            color: "#ffffff",
            width: "300px",
            padding: "5px",
            backgroundColor: "#ea8685",
            textDecoration: "none",
            fontFamily: "Arial",
            textAlign: "center"
        }

        const estilos_table = {
            width: "320px",
            margin: "auto",
            textAlign: "center",
            border:"0",
            tableLayout:"fixed"
        }

        const estilos_titulo = {
            fontFamily: "Arial",
            textAlign: "center",
            fontSize: "22px",
            padding:"15px 0px"
        }

        const imagen_especial = {
            width: "10px",
            marginLeft: "auto"
        }

        const estilos_enlace = {
            fontFamily: "Arial",
            textAlign: "left",
            fontSize: "12px",
            color:"#fff",
            textDecoration:"none",
            paddingLeft:"8px"
        }
 

        return (
            <html xmlns="https://www.w3.org/1999/xhtml">
                <head>
                    <title>Helpful Inspiring Info - Weddings Palace Resorts</title>
                    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0 " />
                </head>
                <body>
                <table style={estilos_table} cellspacing="0" cellpadding="0" >
                        <tr>
                            <td>
                                <img alt="Palace Resorts Weddings" src={"https://e-commercepr.s3.amazonaws.com/assets/images/mails/header-email.jpg"} />
                            </td>
                        </tr>
                        {object.palaceInspirtations ?
                            <tr>
                                <td>
                                    <a type={"href"} href={object.palaceInspirtations} target='_blank' style={estilos_btn}><p>Palace Resorts Wedding Inspirtations</p></a>
                                </td>
                            </tr> : ""
                        }

                        {object.dream ?
                            <tr>
                                <td>
                                    <a type={"href"} href={object.dream} target='_blank' style={estilos_btn}><p>Dream Destination Weddings</p></a>
                                </td>
                            </tr> : ""
                        }

                        {object.leBlancInspirtations ?
                            <tr>
                                <td>
                                    <a type={"href"} href={object.leBlancInspirtations} target='_blank' style={estilos_btn}><p>Le Blanc Spa Resort Wedding Inspirations</p></a>
                                </td>
                            </tr> : ""
                        }

                        {object.destinationBenefits ?
                            <tr>
                                <td>
                                    <a type={"href"} href={object.destinationBenefits} target='_blank' style={estilos_btn}><p>Destination Weddings Group Benefits</p></a>
                                </td>
                            </tr> : ""
                        }
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
            </html>)
    }

    render() {
        let separator = 0;
        let arraycontent = [];
        let arraycontent2x2 = [];
        const { lang = "es" } = this.props;
        const body = this.props.state.contentPDF.map((element, index) => {
            
               return (<div className="item-check" key={index}>
                    <Input value={element.url} type={"checkbox"} styleForm={"square"} id={"helpfulins" + index} name={element.name} changeHandler={this.changeHandler}>
                    {element.title}
                    </Input>
                    <div className="url-pdf">
                        <Input type={"view-more" } target="_blank" to={element.url} value={element.viewPdfTxt} />
                    </div>
                </div>)
     
        
                
            
        });

        return (
            <section component="helpfulinspiringinfo">
                <Titlesection title={this.props.state.title} subtitle={this.props.state.title2} description={this.props.state.description}
                    urlBtnBack={[this.props.state.urlBtnBack, this.props.state.buttonTxtBack]}
                ></Titlesection>
                <div className="separador0"></div>
                <center >
                    <p className="choose-as-many-pdf description">{this.props.state.description2}</p>
                </center>
                <div className="separador1"></div>

                <form ref={this.refForm} onSubmit={this.handleSubmit} className="container">
                    <div className="fater">
                    {body}
                    </div>
                    <article >
                        {this.state.displayConfirm=="block"?"":<section className="labelmail-address">
                            <label style={{ margin: "0px auto" }}>{this.props.state.footerTitle}</label>
                        </section>}
                        <center>
                            {this.state.displayConfirm=="block"?<p className="description">{this.props.state.emailMessage}</p>:<div className="fomr-send">
                                <Input type={"email"} placeholder={lang === "es" ? "Correo eléctronico" : "E-mail Address"} defaultValue={this.props.state.email} name={"email"} id={0}  />
                                <Input type={"button"} value={ lang === "es" ? "Enviar" : "Send"} name="button" id={"submit-btn"} handleClick={this.handleSubmit} />
                            </div>}
                        </center>
                        <section style={{margin: "20px"}}>
                        {this.state.alert1?<p className="description" style={ {color: "red", fontWeight: "bold"}  }>{lang === "es" ?  "Selecciona al menos un PDF *" :"Select at least one pdf* "}</p>:null}
                        {this.state.alert2?<p className="description" style={ {color: "red", fontWeight: "bold"}  }>{lang === "es" ?  "Por favor ingresa tu Correo eléctronico *" :  "Please fill your E-mail Address *" }</p>:null}
                        </section>
                        <CallUs textTooltip={this.props.state.textCall} head={this.props.state.headFooter} phons={this.props.state.phons} />
                    </article>
                </form>
            </section>
        )
    }
}
export default Helpfulinspiringinfo;
import React, { Component } from 'react';
import { Iconwedd, Input } from '../../components/wirefragment';
import { Cell } from '../grid';
import { Grid, CallUs, Titlesection } from '../../components';
import { Link } from "react-router-dom";
import ReactDOMServer from 'react-dom/server';
import api from '../../app';

class HelpfulList extends Component {
  state = {}

  constructor(props){
      super();
      this.state = {
        list: props.helpful.list,
        activeList:{}
      }
      this.showList = this.showList.bind(this);
      this.hideList = this.hideList.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.sendMail = this.sendMail.bind(this);
      this.validateForm = this.validateForm.bind(this);
  }

  showList(orden) {
    let newList = this.state.list
    newList[orden].isOpen = 1;
    this.setState({
      list: newList
    })
  }

  hideList(orden) {
    let newList = this.state.list
    newList[orden].isOpen = 0;
    this.setState({
      list: newList
    })
  }

  sendMail(res,idList) {
    const activeList = this.state.activeList
    console.log("activeList",activeList)

    const email = activeList.email
    let htmlbody = ReactDOMServer.renderToStaticMarkup(this.htmlDisplay(activeList))
    let documentosChecked = activeList.documents.filter(function(element){return element.isCheck})
    let emailData ={
        TO_ADDRESSES:email,
        CC_ADDRESSES: "wilsanchez@palaceresorts.com",
        CCO_ADDRESSES: "",
        TEXTBODY:"Get in the know - Weddings Palace Resorts",
        HASH: "Get in the know - Weddings Palace Resorts",
        SUBJECT:"Get in the know - Weddings Palace Resorts",
        HTMLBODY: htmlbody,
        token: res.token
    }
    api.sendEmail(emailData)
      .then(res => {

        let newList = this.state.list
        newList[idList].mailsent = "Thanks, the information has been sent to your email!!!";
        this.setState({
          list: newList
        })

      }).catch(e => console.error(e));
  }

  async sendCRM() {
    var fecha = new Date

    const email = this.state.activeList.email
    var pdfs = "";

    this.state.activeList.documents.forEach((element,index) => {
     if(element.isCheck){
       pdfs+=element.url+","
     }
    });

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
            "correo": email,
            "pdf" :pdfs ,
            "lead_general" : true
        }
    }
    console.log(dataCRM)
    api.sendDataCRM(dataCRM)
        .then(res => {
        }).catch(e => console.error(e));
}

  async handleSubmit(e) {
    e.preventDefault();
    const id = e.target.id

    let list = this.state.list[id]
    this.setState({
      activeList: list
    })

    api.loginEmail()
    .then(res => {
      this.sendMail(res.data,id)
      this.sendCRM();
    }).catch(e => console.error(e));

  }

  changeHandler = event => {
    const name = event.target.name;
    const id = event.target.id;
    const value = event.target.value;
    let newContent = this.state.list
    newContent[id][name] = value
    this.validateForm(newContent,0)
  }

  changeHandlerCheck = event => {
    const name = event.target.name;
    const id = event.target.id;
    const value = event.target.value;
    const status = event.target.checked
    let newContent = this.state.list
    let index = id.substring(0, 1)
    let indexDocumento = id.substring(id.length, (id.length - 1))
    newContent[index].documents[indexDocumento].isCheck = status;
    this.validateForm(newContent,index)
  }

  validateForm(content,index){
        let pdfSend = []
        let documentosChecked = content[index].documents.filter(function(element){return element.isCheck})
        if( content[index].email!='' && documentosChecked.length > 0)
        {
          content[index].disabled = ''
          this.setState({
            list : content
          })
        }else{
          content[index].disabled = 'disabled'
          this.setState({
            list : content
          })
        }
    }

  htmlDisplay(activeList) {
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
      <html>
        <head>
          <title>Get in the know - Weddings Palace Resorts</title>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0 " />
        </head>
        <body>
        <table style={estilos_table} cellspacing="0" cellpadding="0" >
          <tr>
            <td colSpan="2">
              <img alt="Palace Resorts Weddings" src={"https://e-commercepr.s3.amazonaws.com/assets/images/mails/header-email.jpg"} />
            </td>
          </tr>
          {
            activeList.documents.map((item, index) => {
              return (
                <tr>
                  <td key={index}>
                    {item.isCheck ?
                      <a type={"href"} href={item.url} target='_blank' style={estilos_btn}>{item.documentTitle}</a> : ""
                    }
                  </td>
                </tr>
              )
            }
            )}
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

  listDisplay(element, index) {
    return (
      <article className="helpfulContent" key={index}>
        <center style={{ display: element.isOpen ? "none" : "block" }}>
            <Grid type="x"  className="titleContainerClosed" onClick={this.showList.bind(element, index)}>
              <Cell className="centerContent" large="1" small="1" >   <Iconwedd icon={"folder-closed"} color={"white"} /></Cell>
              <Cell large="10" small="10"><h2 className="subtitle subtitleClosed">{element.title}</h2></Cell>
              <Cell className="centerContent" large="1" small="1">   <Iconwedd icon={"chevron-down"} color={"white"} /></Cell>
            </Grid>
        </center>
        {element.isOpen ?
          <section>
            <center>
            <Grid type="x" className="titleContainerOpen" onClick={this.hideList.bind(element, index)}>
              <Cell className="centerContent" large="1" small="1" ><Iconwedd icon={"folder-open"} color={"pink"} /></Cell>
              <Cell large="10" small="10"><h2 className="subtitle subtitleOpen">{element.title}</h2></Cell>
              <Cell className="centerContent" large="1" small="1"><Iconwedd icon={"chevron-up"} color={"pink"} /></Cell>
            </Grid>
            </center>
            <form className="containerOpen">
              {element.documents.map((item, indexd) => {
                return (
                  <Grid  type="x" key={item.documentTitle} className="documentInfo content-text-check">
                    <Cell large="9" small="9" ><Input title={item.documentTitle} checked={item.isCheck} type={"checkbox"} styleForm={"square"} id={index + item.documentTitle.replace(/\s/g, '').toLowerCase() + indexd} name="isCheck" changeHandler={this.changeHandlerCheck} /></Cell>
                    <Cell large="3" className="viewpdf" style={{"textAlign": "center"}} small="3"><a className="linkalt" target="_blank" type={"href"} href={item.url}>{this.props.helpful.viewText}</a></Cell>
                  </Grid>
                  )
              })
              }
                  {element.mailsent==""?<p className="description">{this.props.helpful.sendThemText}</p>:null}
              {element.mailsent==""?<div className="inlineform">
                <Input type={"email"} placeholder={this.props.helpful.sampleText} defaultValue={element.email} claseExtra="inputweddemail" name={"email"}  id={index} changeHandler={this.changeHandler} />
                <Input type={"button"} value={this.props.helpful.sendText} name="button"  id={index} claseExtra="inputweddsubmit" handleClick={this.handleSubmit} disabled={element.disabled}/>
              </div>:<p className="description">{element.mailsent}</p>}
            </form>
          </section> : ""
        }
      </article>
    )
  }


  render() {
    let ln=localStorage.langWeddings
    let acumulador = [];
    let contador = 0;

    let division = parseInt(this.state.list.length) / 2;
    division = Math.round(division);



    return (

      <section component="helpfulList">
         <article>
          <div className="container">
            <div className="listContainer">
              {this.state.list.map((element, index) => {


                contador = contador + 1;

                 if (contador > division) {
                  acumulador = [];
                  contador = 0;
                }
                acumulador.push(
                  this.listDisplay(element, index)
                )


                if (contador==division) {
                  return <section className="content">
                    {acumulador}
                  </section>
                }else if (this.state.list.length - 1 == index){
                  return <section className="content">
                    {acumulador}
                  </section>
                }

              })}
            </div>
            <CallUs
              head={ln=="es"?"¿Necesitas más información?":"Do you need more helpful information in your wedding planning?"}
              textTooltip={ln=="es"?"No te preocupes. <button> Llámanos</button> y un especialista de bodas se pondrá en contacto contigo.":"Don’t worry about it!<br/><button>Call us</button> and a specialist will get back to you."}
              phons={[
                { paisestado: "US & Canada Reservations: ", numero: "1 (877) 725-4933" },
                { paisestado: "UK Reservations: ", numero: "0-808-258-0083" },
                { paisestado: "Mexico Reservations: ", numero: "800-841-6641" },
              ]} />
              </div>
              </article>
      </section>
    )
  }
};

export default HelpfulList;

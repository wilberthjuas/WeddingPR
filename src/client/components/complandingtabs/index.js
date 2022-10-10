import React, { Component, Fragment } from 'react';
import { Iconwedd, Input } from '../../components/wirefragment';
import api from '../../app/index';
import ReactDOMServer from 'react-dom/server';
import WithContext from '../../app/Context';
import { withRouter } from 'react-router-dom';
import BookingWidgetMobile from '../bookingwidgetmobile';
import BookingWidget from '../bookingwidget';
import { FacebookShareButton, FacebookIcon, TwitterShareButton } from 'react-share';
import ReactHtmlParser from 'react-html-parser';
import './custom.css';

class CompLandingTabs extends Component {

  constructor(props) {
    super(props);
    this.handleActive = this.handleActive.bind(this);
    this.ulCollapse = this.ulCollapse.bind(this);
    this.arrowTerms = this.arrowTerms.bind(this);
    this.arrowShare = this.arrowShare.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleWidget = this.handleWidget.bind(this);
    this.sendMail = this.sendMail.bind(this);
    this.refForm = React.createRef();
    this.refBtn = React.createRef();
    this.handleColapse = this.handleColapse.bind(this);
    this.state = {
      activeTab: [
        'active', '', ''
      ],
      activeCont: [
        'active', 'deactivate', 'deactivate'
      ],
      ulCollapse: [
        'uncollapse', 'uncollapse', 'uncollapse',
      ],
      ulCollapseArrow: [
        'chevron-down', 'chevron-down', 'chevron-down',
      ],
      arrowShare: 'chevron-down',
      arrowTerms: 'chevron-down',
      displayTerms: { display: 'none' },
      displayButtons: 'none',
      displayShare: 'none',
      formStatus: 'block',
      formConfirm: 'none',
      country: '',
      widget: 0
    };


  }

  ulCollapse(tab, e) {

    let arr = [];
    let arr2 = [];

    this.state.ulCollapse.map((element, index) => {
      if (tab == index) {
        let newval = element == 'uncollapse' ? 'collapse' : 'uncollapse';
        arr.push(newval);
      } else {
        arr.push(element);
      }
    });

    this.state.ulCollapseArrow.map((element, index) => {
      if (tab == index) {
        let newval = element == 'chevron-down' ? 'chevron-up' : 'chevron-down';
        arr2.push(newval);
      } else {
        arr2.push(element);
      }
    });

    this.setState({
      ulCollapse: arr,
      ulCollapseArrow: arr2,
    });
  }

  arrowTerms() {
    this.setState({
      arrowTerms: this.state.arrowTerms == 'chevron-down' ? 'chevron-up' : 'chevron-down',
      displayTerms: this.state.displayTerms.display == 'none' ? { display: '' } : { display: 'none' },
      displayButtons: this.state.displayButtons == 'none' ? '' : 'none',
      arrowShare: 'chevron-down',
      displayShare: 'none'
    });
  }

  arrowShare() {
    this.setState({
      arrowTerms: 'chevron-down',
      displayTerms: { display: 'none' },
      displayButtons: 'none',
      arrowShare: this.state.arrowShare == 'chevron-down' ? 'chevron-up' : 'chevron-down',
      displayShare: this.state.displayShare == 'none' ? '' : 'none'
    });
  }

  handleWidget() {
    window.scroll({
      top: 820,
      behavior: 'smooth'  // 👈
    });
    setTimeout(() => {
      this.setState({
        widget: this.state.widget ? 0 : 1
      });
    }, 300);
  }

  handleActive(tab, e) {
    if (tab == 0) {
      this.setState({
        activeTab: [
          'active', '', ''
        ],
        activeCont: [
          'activate', 'deactivate', 'deactivate'
        ],

      });
    } else if (tab == 1) {
      this.setState({
        activeTab: [
          '', 'active', ''
        ],
        activeCont: [
          'deactivate', 'active', 'deactivate'
        ],
      });

    } else if (tab == 2) {
      this.setState({
        activeTab: [
          '', '', 'active'
        ],
        activeCont: [
          'deactivate', 'deactivate', 'active'
        ],
      });

    }
  }

  handleScroll = (scroll, e, click) => {
    this.divElement.scrollBy({
      top: scroll,
      left: 0,
      behaviour: 'smooth'
    });
  };

  async handleSubmit(e) {
    e.preventDefault();
    //console.log("imagen:",this.props.imgbanner[0]['imageDesk'])
    //console.log("descr:",this.props.description)
    api.loginEmail()
      .then(res => {
        this.sendMail(res.data, false);
      })
      .catch(e => console.error(e));
  }

  sendMail(res) {
    var object = {};
    let formData = new FormData(this.refForm.current);
    formData.forEach((value, key) => {
      object[key] = value;
    });
    let htmlbody = ReactDOMServer.renderToStaticMarkup(this.htmlDisplay(object));
    const email = object.email;
    let emailData = {
      TO_ADDRESSES: email,
      CC_ADDRESSES: '',
      TEXTBODY: 'Offers - Weddings Palace Resorts',
      HASH: 'Offers - Weddings Palace Resorts',
      SUBJECT: 'Offers - Weddings Palace Resorts',
      //FORCE_SES: true,
      HTMLBODY: htmlbody,
      token: res.token
    };
    api.sendEmail(emailData)
      .then(res => {
          this.setState({
            formStatus: 'none',
            formConfirm: 'block'
          });
        }
      )
      .catch(e => console.error(e));
  }

  htmlDisplay(object) {
    var fecha = new Date;
    let urlActual = window.location.pathname;
    //console.log("url actual:", urlActual)

    const estilos_btn = {
      color: '#ffffff',
      padding: '10px 15px',
      backgroundColor: '#ea8685',
      textDecoration: 'none',
      fontFamily: 'Arial',
      textAlign: 'center'
    };

    const estilos_table = {
      width: '320px',
      margin: 'auto',
      textAlign: 'center',
      border: '0',
      tableLayout: 'fixed'
    };

    const estilos_texto = {
      fontFamily: 'Arial',
      textAlign: 'center',
      fontSize: '16px',
      padding: '10px 0px'
    };

    const estilos_titulo = {
      fontFamily: 'Arial',
      textAlign: 'center',
      fontSize: '22px',
      padding: '15px 0px'
    };

    const imagen_especial = {
      width: '10px',
      marginLeft: 'auto'
    };

    const estilos_enlace = {
      fontFamily: 'Arial',
      textAlign: 'left',
      fontSize: '12px',
      color: '#fff',
      textDecoration: 'none',
      paddingLeft: '8px'
    };


    return (
      <html>
      <head>
        <title>Offers - Weddings Palace Resorts</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0 "/>
      </head>
      <body>
      <table style={estilos_table} cellspacing="0" cellpadding="0">
        <tr>
          <td colSpan="12">
            <img alt="Palace Resorts Weddings"
                 src={'https://e-commercepr.s3.amazonaws.com/assets/images/mails/header-email.jpg'}/>
          </td>
        </tr>
        <tr>
          <td colSpan="12">
            <img style={{ width: '320px' }} alt="Palace Resorts Offers"
                 src={this.props.imgbanner[0]['imageMov']}></img>
          </td>
        </tr>
        <tr>
          <td colSpan="12" style={estilos_texto}>
            {this.props.description}
          </td>
        </tr>
        <tr>
          <td colSpan="12">
            <a type={'href'} href={'http://weddings.palaceresorts.com' + urlActual} target="_blank"
               style={estilos_btn}>{'View Offer'}</a>
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
            {' Our Awards'}
          </td>
          <td colSpan="3">
            <hr/>
          </td>
        </tr>
        <tr>
          <td colSpan="6">
            <img style={{ width: '55px' }}
                 src="https://e-commercepr.s3.amazonaws.com/assets/images/mails/four-diamond.jpg"
                 alt="Four diamond award"></img>
          </td>
          {/* <td colSpan="4">
                                <img style={{width:"55px"}} src="https://e-commercepr.s3.amazonaws.com/assets/images/mails/tripadvisor.jpg"  alt="Tripadvisor award"></img>
                                </td> */}
          <td colSpan="6">
            <img style={{ width: '55px' }}
                 src="https://e-commercepr.s3.amazonaws.com/assets/images/mails/five-diamonds.jpg"
                 alt="Five diamond award"></img>
          </td>
        </tr>
        <tr>
          <td colSpan="12">
            &nbsp;
          </td>
        </tr>
        <tr style={{ backgroundColor: '#ff8788' }}>
          <td colSpan="12">
            &nbsp;
          </td>
        </tr>
        <tr style={{ backgroundColor: '#ff8788' }}>
          <td colSpan="3">
            <a type={'href'} href={'https://co.pinterest.com/prweddings/'} target="_blank"> <img
              style={{ width: '35px' }}
              src="https://e-commercepr.s3.amazonaws.com/assets/images/mails/pinterest-icon.jpg"
              alt="Pinterest"></img></a>
          </td>
          <td colSpan="2">
            <a type={'href'} href={'https://www.facebook.com/PalaceResortsWeddings/'}
               target="_blank"> <img style={{ width: '35px' }}
                                     src="https://e-commercepr.s3.amazonaws.com/assets/images/mails/facebook-icon.jpg"
                                     alt="Facebook"></img></a>
          </td>
          <td colSpan="2">
            <a type={'href'} href={'https://www.instagram.com/palaceresortsweddings/?hl=es-la'}
               target="_blank"> <img style={{ width: '35px' }}
                                     src="https://e-commercepr.s3.amazonaws.com/assets/images/mails/instagram-icon.jpg"
                                     alt="Instagram"></img></a>
          </td>
          <td colSpan="2">
            <a type={'href'} href={'https://twitter.com/prweddings'} target="_blank"> <img
              style={{ width: '35px' }}
              src="https://e-commercepr.s3.amazonaws.com/assets/images/mails/twitter-icon.jpg"
              alt="Twitter"></img></a>
          </td>
          <td colSpan="3">
            <a type={'href'} href={'https://www.youtube.com/user/PalaceWeddings'} target="_blank">
              <img style={{ width: '35px' }}
                   src="https://e-commercepr.s3.amazonaws.com/assets/images/mails/youtube-icon.jpg"
                   alt="Youtube"></img></a>
          </td>
        </tr>
        <tr style={{ backgroundColor: '#ff8788' }}>
          <td colSpan="12">
            &nbsp;
          </td>
        </tr>
        <tr style={{ backgroundColor: '#ff8788' }}>
          <td colSpan="4">
            <img style={{ width: '75px' }}
                 src="https://e-commercepr.s3.amazonaws.com/assets/images/mails/palace-resorts.jpg"
                 alt="Palace Resorts"></img>
          </td>
          <td colSpan="4">
            <img style={{ width: '75px' }}
                 src="https://e-commercepr.s3.amazonaws.com/assets/images/mails/le-blanc.jpg"
                 alt="Le Blanc Spa Resorts"></img>
          </td>
          <td colSpan="4">
            <img style={{ width: '75px' }}
                 src="https://e-commercepr.s3.amazonaws.com/assets/images/mails/moon-palace.jpg"
                 alt="Moon Palace Cancun"></img>
          </td>
        </tr>
        <tr style={{ backgroundColor: '#ff8788' }}>
          <td colSpan="12">
            &nbsp;
          </td>
        </tr>
        <tr style={{ backgroundColor: '#ff8788' }}>

          <td colSpan="6" align="left">
            <a alt="Palace Resorts" type={'href'} href={'https://www.palaceresorts.com'}
               target="_blank" style={estilos_enlace}>{'PALACE RESORTS'}</a>
          </td>
          <td>
            <img alt="Chevron" style={imagen_especial}
                 src="https://e-commercepr.s3.amazonaws.com/assets/images/mails/chevron.jpg"></img>
          </td>
          <td colSpan="4" align="left">
            <a type={'href'} href={'https://www.palaceresorts.com'} target="_blank"
               style={estilos_enlace}>{'PALACE ELITE'}</a>
          </td>
          <td>
            <img alt="Chevron" style={imagen_especial}
                 src="https://e-commercepr.s3.amazonaws.com/assets/images/mails/chevron.jpg"></img>
          </td>

        </tr>
        <tr style={{ backgroundColor: '#ff8788' }}>
          <td colSpan="6" align="left">
            <a type={'href'} href={'https://www.moonpalacecancun.com'} target="_blank"
               style={estilos_enlace}>{'MOON PALACE RESORTS'} </a>
          </td>
          <td>
            <img style={imagen_especial} alt="Chevron"
                 src="https://e-commercepr.s3.amazonaws.com/assets/images/mails/chevron.jpg"></img>
          </td>
          <td colSpan="4" align="left">
            <a type={'href'} href={'https://meetings.palaceresorts.com'} target="_blank"
               style={estilos_enlace}>{'MEETINGS'}</a>
          </td>
          <td>
            <img style={imagen_especial} alt="Chevron"
                 src="https://e-commercepr.s3.amazonaws.com/assets/images/mails/chevron.jpg"></img>
          </td>

        </tr>
        <tr style={{ backgroundColor: '#ff8788' }}>
          <td colSpan="6" align="left">
            <a type={'href'} href={'https://www.leblancsparesorts.com'} target="_blank"
               style={estilos_enlace}>{'LE BLANC SPA RESORTS'}</a>
          </td>
          <td>
            <img alt="Chevron" style={imagen_especial}
                 src="https://e-commercepr.s3.amazonaws.com/assets/images/mails/chevron.jpg"></img>
          </td>
          <td colSpan="4" align="left">
            <a type={'href'} href={'https://www.palaceproagents.com'} target="_blank"
               style={estilos_enlace}>{'TRAVEL AGENTS'}</a>
          </td>

          <td>
            <img style={imagen_especial} alt="Chevron"
                 src="https://e-commercepr.s3.amazonaws.com/assets/images/mails/chevron.jpg"></img>
          </td>
        </tr>
        <tr style={{ backgroundColor: '#ff8788' }}>
          <td colSpan="12">
            &nbsp;
          </td>
        </tr>
      </table>
      </body>
      </html>
    );
  }

  handleColapse() {
    this.refBtn.current.click();
  }

  render() {
    const { match: { params } } = this.props;
    const { match: { url } } = this.props;
    let url_share = 'https://weddings.palaceresorts.com' + url;


    const tabs = this.props.offer.items.map((element, index) => {
      return (
        <ul className={'tab ' + this.state.activeTab[element.tabid]}
            onClick={this.handleActive.bind(this, element.tabid)}>
          <li className="tab-title">
            {element.title}
          </li>
        </ul>
      );
    });
    const content = this.props.offer.items.map((element, index) => {
      return (
        <section key={index} className={this.state.activeCont[element.tabid]}>
          <div className={'generalcontent'}>
            <section className={'tabs-content'}>
              <article className={'item-content'}>
                {element.content.lista_title != '' ?
                  <p className="paragraph"
                     key={502}>{ReactHtmlParser(element.content.lista_title)}</p> : null
                }

                <ul className={'list-items collapse'}>
                  {element.content.lista.map((data, key) => {
                    return (<li className="description" key={key}>{ReactHtmlParser(data)}</li>);
                  })}
                </ul>

                {element.content.txt_adicional != '' ?
                  <p className="paragraph" key={509}>{element.content.txt_adicional}</p> : null
                }

              </article>
            </section>
            <img alt={element.title} className="img-background movil"
                 src={element.content.backgroundmobile}></img>
            <section style={{ width: '-webkit-fill-available' }} className="">
              <img alt={element.title} className="img-background desktop"
                   src={element.content.background}></img>
              <article style={{
                display: 'block',
                width: '99%',
                margin: 'auto'
              }}>
                <br/>
                <h2 style={{ margin: 'auto' }} className="subtitle">{element.content.subTitle}</h2>
                {element.content.subList !== undefined ?
                  <ul>
                    {
                      element.content.subList != null ?
                        element.content.subList.map((data, key) => {
                          return (<li className="description"
                                      key={key}>{ReactHtmlParser(data)}</li>);
                        }) : <></>
                    }
                  </ul>
                  :

                  <div>
                    {element.content.subListEspecial1 != null ?
                      <div>
                        <span className={'titleEspecial'}>{element.content.subListEspecial1.title}</span>
                        <ul className={'subListEspecial'} style={{height:'auto'}}>
                          {element.content.subListEspecial1.dates.map((data, key) => {
                            return (<li key={key}>{ReactHtmlParser(data)}</li>);
                          })
                          }
                        </ul>
                      </div>
                      : null}

                    {element.content.subListEspecial2 != null ?
                      <div>
                        <span className={'titleEspecial'}>{element.content.subListEspecial2.title}</span>
                        <ul className={'subListEspecial'}>
                          {element.content.subListEspecial2.dates.map((data, key) => {
                            return (<li key={key}>{ReactHtmlParser(data)}</li>);
                          })
                          }
                        </ul>
                      </div>
                      : null}
                  </div>
                }
              </article>
            </section>
          </div>
          {element.bookingwindowLabel ?
            <div className="windows">
              <p
                className="description bookingwindow">{element.bookingwindowLabel}{element.bookingwindow}</p>
              <p
                className="description bookingwindow">{element.travelwindowLabel}{element.travelwindow}</p>
            </div> : ''
          }
        </section>
      );
    });
    return (
      <section component="complandingtabs">
        <section className="container tabs-container">
          <section className="tabs">
            {tabs}
          </section>
          <section className={'tabs-body '}>
            {content}
            {params.lang == 'en' ? params.offersId == 'preview-paradise' ?
              <Input type="button" to={'/en/offers/preview-paradise/take-next-step'}
                     value={'BOOK NOW'}/> :
              <Input type="button" value={this.props.lang == 'en' ? 'BOOK NOW' : 'RESERVA AHORA'}
                     handleClick={this.handleColapse.bind(this)}/> : params.offersId == 'conoce-el-paraiso' ?
              <Input type="button" to={'/es/ofertas/conoce-el-paraiso/da-el-siguiente-paso'}
                     value={'RESERVA AHORA'}/> :
              <Input type="button" value={this.props.lang == 'en' ? 'BOOK NOW' : 'RESERVA AHORA'}
                     handleClick={this.handleColapse.bind(this)}/>}
            {
              this.props.offer.planLink != '' ?

                <center>
                  <Input color="pink movil" to={this.props.offer.planLink} type="href"
                         value={this.props.offer.planLbl}></Input>
                </center>
                : ''}

          </section>
          <section className="terms">
            <div className="desktop">

              {params.lang == 'en' ? params.offersId == 'preview-paradise' ?
                <Input type="button" to={'/en/offers/preview-paradise/take-next-step'}
                       value={'BOOK NOW'}/> :
                <Input type="button" value={this.props.lang == 'en' ? 'BOOK NOW' : 'RESERVA AHORA'}
                       handleClick={this.handleWidget.bind(this)}/> : params.offersId == 'conoce-el-paraiso' ?
                <Input type="button" to={'/es/ofertas/conoce-el-paraiso/da-el-siguiente-paso'}
                       value={'RESERVA AHORA'}/> :
                <Input type="button" value={this.props.lang == 'en' ? 'BOOK NOW' : 'RESERVA AHORA'}
                       handleClick={this.handleWidget.bind(this)}/>}
              {this.state.widget ?
                <div style={{ position: 'absolute' }} onClick={this.handleWidget.bind(this)}>
                  <Iconwedd icon="close-menu" color="pink position"></Iconwedd></div> : null}
              {this.state.widget ?
                <BookingWidget lang={this.props.lang} mx={this.props.iso ? true : false}
                               offers={true}></BookingWidget> : null}
            </div>
            {/*<Input color="pink desktop" to={this.props.offer.planLink} type="href" value={this.props.offer.planLbl}></Input>*/}
            <div className="group">
              <article className="terms-nav1">
                            <span className="collapselink" onClick={this.arrowTerms}>
                                {this.props.offer.termsLabel}&nbsp;
                              <Iconwedd icon={this.state.arrowTerms} color={'pink'}/>
                            </span>
              </article>
              <article className="terms-nav2">
                            <span className="collapselink" onClick={this.arrowShare}>
                                {this.props.offer.shareLabel}</span>&nbsp;
                <Iconwedd icon={this.state.arrowShare} color={'pink'}/>
              </article>
            </div>
          </section>
          <section className="terms-content">
            <div className="tabstermscontent" ref={div => this.divElement = div}
                 style={this.state.displayTerms}>
              <div className="fade" style={{ display: this.state.fadedisplay }}></div>
              <p className="offersTerms">{ReactHtmlParser(this.props.offer.terms)}</p>
            </div>
            <div className="tabstermsbuttons movil" style={{ display: this.state.displayButtons }}>
              <a onClick={this.handleScroll.bind(this, -100)}> <Iconwedd icon={'scroll-up'}
                                                                         color={'pink'}/></a>
              <a onClick={this.handleScroll.bind(this, 100)}><Iconwedd icon={'scroll-down'}
                                                                       color={'pink'}/></a>
            </div>
          </section>
          <section className="share-content" style={{ display: this.state.displayShare }}>
            {this.state.formConfirm == 'none' ?

              <form ref={this.refForm} onSubmit={this.handleSubmit} style={{
                display: this.state.formStatus,
                paddingTop: '20px'
              }}>
                <h2 className="title" style={{ textAlign: 'center' }}>{this.props.offer.share}</h2>
                <div className="inputshare">
                  <Input required type="text" name="name"
                         placeholder={this.props.offer.nameLabel}> </Input>
                  <Input required type="email" name="email"
                         placeholder={this.props.offer.emailLabel}> </Input>
                </div>
                <div className="shareButtons container">
                  <Input type="submit" value={this.props.offer.sendLabel}></Input>

                  {/*<Input type="submit" value={this.props.offer.closeLabel} color="white"></Input>*/}
                </div>
              </form> : <h2
                className="subtitle">{params.lang == 'en' ? 'Thank you for sharing this offer' : 'Gracias por compartoir esta oferta'}</h2>}
            <div className="separator"></div>
            <div className="throughsocial">
              <span className="text">{this.props.offer.socialMediaLabel}</span>
              <TwitterShareButton url={url_share} title={this.props.title_share}>
                <Iconwedd icon={'twitter-circled'} color={'pink'}></Iconwedd>
              </TwitterShareButton>
              <FacebookShareButton url={url_share} quote={this.props.title_share}>
                <Iconwedd icon={'facebook-circled'} color={'pink'}></Iconwedd>
              </FacebookShareButton>
            </div>
          </section>
        </section>
        <BookingWidgetMobile offers={true} lang={this.props.lang} refe={this.refBtn}
                             mx={this.props.iso == 'MX' ? true : false}></BookingWidgetMobile>
      </section>
    );
  }
}

export default withRouter(WithContext(CompLandingTabs));

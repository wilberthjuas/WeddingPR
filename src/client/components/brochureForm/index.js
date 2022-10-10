/*
Consume, CRM, Hubspot, Mail
*/

// TODO: Traducir
import React, {Component} from 'react';
import { Input, Titlesection } from '../../components/wirefragment';
import { Cell } from '../grid';
import { Grid,Sliders } from '../../components';
import api from '../../app/index';
import ReactDOMServer from 'react-dom/server';
import { withRouter } from 'react-router-dom';
import WithContext from "../../app/Context";

class BrochureForm extends Component {

  constructor(props){
    super(props);
  	this.state = {
      firstName:"",
      lastName:"",
      email:"",
      country:"",
      phone:"",
      formOver:false,
      countries:[],
      required_check : "0"
  	}
    this.idForm = 'form';
    this.idFormMov = 'formMov';
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitMov = this.handleSubmitMov.bind(this);
    this.getKey = this.getKey.bind(this);
    this.refForm = React.createRef();
    this.refFormMov = React.createRef();
    this.sendMail = this.sendMail.bind(this);
    this.keyCount = 0
    this.sendHubspot = this.sendHubspot.bind(this)
    this.getCountries()
  }

  static getDerivedStateFromProps(props, state) {
    let newProps = {};
    Object.keys(props).forEach(key => {
       if (props[key] != state[key]) {
          newProps[key] = props[key];
       }
    });
    return Object.keys(newProps).length > 0 ? newProps : null;
}

  changeHandler = event => {
    const name = event.target.name;
    const value = event.target.value;
    const checked = event.target.checked;

    let data = this.refFormMov.current.querySelectorAll(".contentSlider > .ItemSlider input");
    let validateChecked = false;
    data.forEach(element => {
      if (element.checked){
        validateChecked = true;
      }
      element.removeAttribute("required")
    });

    if (!validateChecked){
      data.forEach(element => {
        if (element.checked){
          validateChecked = true;
        }
        element.setAttribute("required",true)
      });
    }

  }

  changeHandlerDesk = event => {
    const name = event.target.name;
    const value = event.target.value;
    const checked = event.target.checked;

    let data = this.refForm.current.querySelectorAll(".contentSlider > .ItemSlider input");
    let validateChecked = false;
    data.forEach(element => {
      if (element.checked){
        validateChecked = true;
      }
      element.removeAttribute("required")
    });

    if (!validateChecked){
      data.forEach(element => {
        if (element.checked){
          validateChecked = true;
        }
        element.setAttribute("required",true)
      });
    }

  }

  getKey(){
    this.keyCount++
    return this.keyCount
  }

  async handleSubmit(e){
    e.preventDefault();

    //this.sendMail(false,false)

    api.loginEmail()
        .then( res =>{
            this.sendMail(res.data,false)
        }).catch( e => console.error(e));
  }

  async handleSubmitMov(e){
    e.preventDefault();
    //this.sendMail(false,true)
    api.loginEmail()
        .then( res =>{
            this.sendMail(res.data,true)
        }).catch( e => console.error(e));
  }

  getCountries(lang_){
    //api.getCountries()
    api.getCountrybyLang(lang_)
        .then( res =>{
          var arrayCountries = []
          Object.keys(res.data).forEach(function(key){
              arrayCountries.push([[res.data[key]],key])
            }
          )
          this.setState({
              countries:arrayCountries
          })
      }).catch( e => console.error(e));
  }

  async sendCRM(object){
    var fecha = new Date

    let telefono = object.phone;
    telefono = telefono.replace(/-/g,"")

    const dataCRM =
    {

      "estado":1,
        "fecha_creacion":fecha.getDate()+"-"+(fecha.getMonth() + 1) >= 10 ? (fecha.getMonth() + 1) : "0" + (fecha.getMonth() + 1)+"-"+fecha.getFullYear(),
        "usuario_creacion":"wedding_interface",
        "idlead_interface_venta":2,
        "descripcion":"Palace Weddings",
        "idlead_contacto": 0,
        "informacion_interface":{
            "nombre_contacto": object.firstName,
            "apellido_contacto": object.lastName,
            "nombre_novia" : object.firstName,
            "apellido_novia" : object.lastName,
            "correo": object.email,
            "pais": object.country,
            "telefono": telefono,
            "wedding_confirmed": object.touch ? true :false,
            "is_travel_agent" : object.agent ? true : false,
            "destination_get_married": object.resort,
            "other_destination_get_married": object.resorts,
            "idioma" : this.state.lang,
            "formulario" : "download_brochure",
            "utm_medium_palace" : "direct",
            "utm_source_palace" : "direct",
            "utm_term_palace" : "direct",
            "utm_content_palace" : "direct",
            "utm_campaign_palace" : "direct",
            "lead_general" : true
        }
    }
    api.sendDataCRM(dataCRM)
        .then(res => {

        }).catch(e => console.error(e));
}

  async sendHubspot(obj) {
    var text = ""
    try {
        var response = await fetch('https://api.ipify.org');
        text = await response.text();
    }
    catch { console.log("") }

    let id_form = "";
    if (this.state.lang == "es"){
        id_form = "6815f863-b4d7-43f3-b410-fc89c7fcfedf";
    }else {
        id_form = "a8dd16b7-7933-4a08-ad2d-156913a71a9c";
    }
    var querystring = require('querystring');
    var postData = querystring.stringify({
        'firstname': obj["firstName"],
        'lastname': obj["lastName"],
        'email': obj["email"],
        "country" : obj["country"],
        "is_travel_agent" : obj["agent"] ? "Yes" : "No",
        "do_you_have_a_wedding_confirmed_with_palace_resort_or_have_you_been_in_touch_with_a_palace_resorts" : obj["inTouch"] ? "Yes" : "No",
        "resort" : obj["resort"],
        "resorts_selected" : obj["resorts"],
        "telephone_number" : obj["phone"],
        'hs_context': JSON.stringify({
            "ipAddress": text,
            "pageUrl": "https://weddings.palaceresorts.com",
            "pageName": "Weddings Palace Resorts - Download Brochure"
        })
    });
    api.sendHubspot(postData,id_form);
}

  sendMail(res,isMov){
    const email = "wilsanchez@palaceresorts.com,dsosa@palaceresorts.com"
    var object = {}
    let formData = isMov ? new FormData(this.refFormMov.current) : new FormData(this.refForm.current);
    let suma = 0
    let resorts = ""
    formData.forEach(
      (value, key) => {
        suma++;
        if (suma <= 8 && key != "notSure"){
          object[key] = value;
        }else if (suma >= 8 && (key == "notSure" || key == "agree")) {
          object[key] = value;
        }
        else {
          resorts = resorts+" "+value;
          object["resort"] = value;

        }
      });
    object["resorts"] = resorts;

    let htmlbody = ReactDOMServer.renderToStaticMarkup(this.htmlDisplay(object,isMov));
    let emailData ={
      TO_ADDRESSES:email,
      CC_ADDRESSES: "",
      TEXTBODY:"Download Brochure",
      HASH: "Download Brochure",
      SUBJECT:"Download Brochure",
      HTMLBODY: htmlbody,
      ATTACHMENT:"Download Brochure - Weddings Palace Resorts",
      token: res.token
    }

    this.sendHubspot(object)
    this.sendCRM(object)

    api.sendEmail(emailData)
    .then(res =>{
      this.setState({formOver:true})
    }
    ).catch( e => console.error(e));
  }

  htmlDisplay(object,isMov){
    var fecha = new Date
    return (
      <div>
        <h1 style={
          {
            color:"#000000",
            fontSize:"48px",
            fontFamily: "Tangerine",
            fontWeight: "normal",
            "marginBottom": "4px"
          }
        }>Download</h1>
        <h2 style={
          {
            color:"#f86290",
            fontSize:"60px",
            fontFamily: "Miso",
            fontWeight: "300",
            fontStretch: "normal",
            fontStyle: "normal",
            lineHeight: "1",
            letterSpacing: "normal",
            textTransform: "uppercase",
            margin: "0px",
            marginBottom: "20px"
          }
        } >Brochure</h2>
        <p><h2>Submited on:</h2> {fecha.getDate()}/{(fecha.getMonth()+1)>=10?(fecha.getMonth()+1):"0"+(fecha.getMonth()+1)}/{fecha.getFullYear()}</p>
        <p><h2>First Name:</h2> {object.firstName}</p>
        <p><h2>Last Name:</h2>  {object.lastName}</p>
        <p><h2>Email:</h2>  {object.email}</p>
        <p><h2>Phone:</h2>  {object.phone}</p>
        <p><h2>Country:</h2>  {object.search}</p>
        <p><h2>Are you a travel agent?</h2></p>
        {isMov?
        <div>
          {JSON.parse(object.agent)?<p>Yes</p>:<p>No</p>}
        </div>:
        <div>
          {JSON.parse(object.agent)?<p>Yes</p>:<p>No</p>}
        </div>
        }
        <p><h2>CHOOSE YOUR PREFERRED PALACE RESORTS WEDDING DESTINATION:</h2></p>
        {object.resorts}
        <p><h2>Do you have a wedding confirmed with Palace Resorts or have you been in touch with a Palace Resorts specialist?</h2></p>
        {isMov?
        <div>
          {JSON.parse(object.touch)?<p>Yes</p>:<p>No</p>}
        </div>:
        <div>
          {JSON.parse(object.inTouch)?<p>Yes</p>:<p>No</p>}
        </div>
        }
      </div>
    )
  }

  renderSliderOneMobile(){
      const content = this.props.downloadbrochure.resortList.map((element,index) => {
          return(
              <section key={this.getKey()} className="checkshadown">
                <Input type={"checkImagen"} value={element.resortCode}  styleForm={"circle"} name={element.resortName} id={"destinationRadio-"+index}
                alt="sample" img={element.imageMov} title = { element.title } required changeHandler={this.changeHandler} />
              </section>
          )})
      return content
  }

  renderSliderOne(){
      const content = this.props.downloadbrochure.resortList.map((element,index) => {
          return(
              <section key={this.getKey()} className="checkshadown">
                <Input type={"checkImagen"} value={element.resortCode} styleForm={"circle"} name={element.resortName} id={"destinationRad-"+index}
                alt={element.title} img={element.imageDesk} title = { element.title } required changeHandler={this.changeHandlerDesk} />
              </section>
          )})
      return content
  }

  componentDidMount(){
    const { match: { params } } = this.props;
    this.setState({lang:params.lang})
    let lang_ = this.state.lang == "en" ? "en" : "es"
    this.getCountries(params.lang)
  }

  render(){
    const { match: { params } } = this.props;
    let data=this.props.downloadbrochure
    return(
    <section component="brochureForm">
      <article className="movil">
        <div className="container">
        { true?
          <center className="thankyouCont">
            <div style={{position:"relative",top: "-3.5rem"}}>
              <Input type={"href"} to={"https://e-commercepr.s3.amazonaws.com/assets/documentos/resourcecenter/102_Palace+Weddings+TRIFOLD_2021_Pages.pdf"} typBtn={2} value={this.props.downloadbrochure.btnDownload} color={"pink"}/>
            </div>
            {/*<Titlesection description={this.props.downloadbrochure.txt1} />
            <Titlesection description={this.props.downloadbrochure.txt2} /> */}
            <Titlesection title={this.props.downloadbrochure.thanks} />
            <div component="inputwedd">
              <Titlesection description={this.props.downloadbrochure.txt3} />
            </div>
            {/*window.scrollTo(0,document.querySelector(".items").clientHeight)*/}
          </center>:
          <div className="radio-btn-content">
              <form ref={this.refFormMov} id={this.idFormMov} onSubmit={this.handleSubmitMov}>
                <div component="">
                  <Grid type="x">
                    <Cell large="6" small="12">
                      <label className="labelInput">
                        {this.props.downloadbrochure.nameQuestion}
                      </label>
                    </Cell>
                    <Cell small="12">
                      <Input required type={"text"} placeholder={data.placeHoldA} name="firstName" autofoco="true"/>
                    </Cell>
                    <Cell small="12">
                      <Input required type={"text"} placeholder={data.placeHoldB} name="lastName" />
                    </Cell>

                    <Cell small="12">
                      <Input required type={"select"} data={this.state.countries} withSearch placeholder={data.placeHoldCountry} name="country" text={this.props.downloadbrochure.countryQuestion}/>
                    </Cell>
                    <Cell small="12">
                      <Input required type={"email"} placeholder={"Your email @"} name="email" id="" text={this.props.downloadbrochure.emailQuestion} />
                    </Cell>

                    <Cell small="12">
                      <Input required type={"tel"} placeholder={data.phonePlacehold} name="phone" id="phone" text={this.props.downloadbrochure.phoneQuestion}/>
                    </Cell>

                    <Cell large="6" small="12">
                      <label className="labelInput">
                        {this.props.downloadbrochure.agentQuestion}
                      </label>
                    </Cell>
                    <Cell small="12">
                      <Grid type="x">
                        <Cell small="4">
                          <Input required type={"radio"} styleForm={"filledcircle"} name="agent" id="agent1" title={this.props.downloadbrochure.yesAnswer} value={true} />
                        </Cell>
                        <Cell small="4">
                          <Input required type={"radio"} styleForm={"filledcircle"} name="agent" id="agent2" title={this.props.downloadbrochure.noAnswer} value={false} />
                        </Cell>
                      </Grid>
                    </Cell>

                    <Cell small="12">
                      <label className="labelInput">
                      {this.props.downloadbrochure.confirmedQuestion}
                      </label>
                    </Cell>
                    <Cell small="12">
                      <Grid type="x">
                        <Cell small="4">
                        <Input required type={"radio"} styleForm={"filledcircle"} name="touch" id="touch1" title={this.props.downloadbrochure.yesAnswer} value={true} />
                        </Cell>
                        <Cell small="4">
                        <Input required type={"radio"} styleForm={"filledcircle"} name="touch" id="touch2" title={this.props.downloadbrochure.noAnswer} value={false} />
                        </Cell>
                      </Grid>
                    </Cell>
                  </Grid>

                  <Cell small="12">
                      <label className="labelInput sliderResorts">
                        {this.props.downloadbrochure.resortQuestion}
                      </label>
                  </Cell>
                  <Cell small="12">
                    <Sliders nameSlide={"destination"} viewItems={1}>
                      {this.renderSliderOneMobile()}
                    </Sliders>
                  </Cell>

                  <Cell small="12">
                    <Input type={"checkbox"} styleForm={"filledcircle"} name="notsure" id="notsure" title={params.lang === "es" ? "No estoy seguro" :"I'm not sure"} />
                  </Cell>

                  <Cell small="12">
                    <Input required value={true} type={"checkbox"} styleForm={"square"} name="squarecheckbox" id="squarecheckbox" title={params.lang === "es" ? "He leído y acepto los <a class=\"text-rosy-a\" href=\"https://www.palaceresorts.com/es/terminos-y-condiciones\">términos y condiciones</a> y el <a href=\"https://www.palaceresorts.com/es/usuarios\" class=\"text-rosy-a\"> aviso de privacidad</a>" : "Accept our <a class=\"text-rosy-a\" href=\"https://www.palaceresorts.com/en/terms-of-use\">terms</a> and <a href=\"https://www.palaceresorts.com/en/general-privacy-notice-marketing-and-advertising\" class=\"text-rosy-a\">privacy policy</a>"}/>
                  </Cell>

                  <Cell small="12">
                    <div className="buttonbrochure">
                      <Input type={"submit"} typBtn={2} value={this.props.downloadbrochure.sumbitText} color={"pink"}/>
                    </div>
                  </Cell>
                </div>
              </form>
          </div>
      }
        </div>
      </article>
      <article className="desktop">
        <div className="container">
          { true?
              <center className="thankyouCont">

              <div style={{position:"relative",top: "-40px"}}>
                <Input type={"href"} to={"https://e-commercepr.s3.amazonaws.com/assets/documentos/resourcecenter/102_Palace+Weddings+TRIFOLD_2021_Pages.pdf"} typBtn={2} value={this.props.downloadbrochure.btnDownload} color={"pink"}/>
              </div>
              {/*<Titlesection description={this.props.downloadbrochure.txt1} />
            <Titlesection description={this.props.downloadbrochure.txt2} /> */}

            <Titlesection title={this.props.downloadbrochure.thanks} />


            <div component="inputwedd">
              <Titlesection description={this.props.downloadbrochure.txt3} />
            </div>
                {/*window.scrollTo(0,document.querySelector(".items").clientHeight)*/}
              </center>:
              <form ref={this.refForm} id={this.idForm} onSubmit={this.handleSubmit}>

                <Grid type="x">
                                  <Cell large="6" small="6">
                    <div className="info">
                    <label className="label labelName" id="firstNameLbl">
                        {this.props.downloadbrochure.nameQuestion}
                    </label>
                      <Grid type="x">
                        <Cell large="6" small="6">
                          <Input required type={"text"} placeholder={"First Name"} name="firstName" id="firstName" autofoco="true" changeHandler={this.changeHandler}/>
                        </Cell>
                        <Cell large="6" small="6">
                          <Input required type={"text"} placeholder={"Last Name"} name="lastName" id="lastName" />
                        </Cell>
                      </Grid>
                    </div>
                    <div className="info">
                      <label className="label labelCountry" id="firstNameLbl">
                      {this.props.downloadbrochure.countryQuestion}
                      </label>
                      <Input required type={"select"}
                      data={this.state.countries}
                      withSearch placeholder={"Select"} name="country" />
                    </div>
                    <div className="info">
                    <label className="label labelAgent" id="firstNameLbl" htmlFor="email">
                     {this.props.downloadbrochure.agentQuestion}
                    </label>
                    <div className="travelRadio">
                      <div className="travelRadioYes">
                        <Input required type={"radio"} styleForm={"filledcircle"} name="agent" id="agen1" title={this.props.downloadbrochure.yesAnswer} value={true}/>
                      </div>
                      <div className="travelRadioNo">
                        <Input required type={"radio"} styleForm={"filledcircle"} name="agent" id="agen2" title={this.props.downloadbrochure.noAnswer} value={false}/>
                      </div>
                    </div>
                    </div>
                  </Cell>
                  <Cell className="cellRight" large="6" small="6">
                    <div className="info">
                      <label className="label labelInfo" id="firstNameLbl">
                        {this.props.downloadbrochure.emailQuestion}
                      </label>
                      <Input required type={"email"}  placeholder={"Your email @"} name="email" id="email" />
                    </div>
                    <div className="info">
                      <label className="label labelInfo" id="firstNameLbl">
                        {this.props.downloadbrochure.phoneQuestion}
                      </label>
                      <Input required type={"tel"} placeholder={"999-999-9999"} name="phone" id="phone" />
                    </div>
                    <div className="info">
                      <label className="label labelConfirmed" id="firstNameLbl" htmlFor="email">
                         {this.props.downloadbrochure.confirmedQuestion}
                      </label>
                      <div className="travelRadio">
                        <div className="travelRadioYes">
                          <Input required type={"radio"} styleForm={"filledcircle"} name="inTouch" id="touc1" title={this.props.downloadbrochure.yesAnswer} value={true}/>
                        </div>
                        <div className="travelRadioNo">
                          <Input required type={"radio"} styleForm={"filledcircle"} name="inTouch" id="touc2" title={this.props.downloadbrochure.noAnswer} value={false}/>
                        </div>
                      </div>
                    </div>
                  </Cell>
                </Grid>
                {/*
                <center className="info">
                  <label className="label" id="firstNameLbl">
                    {this.props.downloadbrochure.resortQuestion}
                  </label>
                </center>

                <Sliders nameSlide={"destination"} viewItems={4}>
                  {this.renderSliderOne()}
                </Sliders>

                <div className="sureCont info">
                  <Input type={"checkbox"} styleForm={"filledcircle"} name="notSure" id="notsur" title={params.lang === "es" ? "No estoy seguro" :"I'm not sure"} />
                </div>
                */}
                <div className="terms info">
                  <Input required value={true} type={"checkbox"} styleForm={"square"} name="agree" id="squarecheckbx" title={params.lang === "es" ? "He leído y acepto los <a class=\"text-rosy-a\" href=\"https://www.palaceresorts.com/es/terminos-y-condiciones\">términos y condiciones</a> y el <a href=\"https://www.palaceresorts.com/es/usuarios\" class=\"text-rosy-a\"> aviso de privacidad</a>" : "Accept our <a class=\"text-rosy-a\" href=\"https://www.palaceresorts.com/en/terms-of-use\" target='_blank'>terms</a> and <a href=\"https://www.palaceresorts.com/en/general-privacy-notice-marketing-and-advertising\" target='_blank' class=\"text-rosy-a\">privacy policy</a>"}/>
                </div>
                <center className="buttonbrochure">
                  <Input type={"submit"} typBtn={2} value={this.props.downloadbrochure.sumbitText} color={"pink"}/>
                </center>
              </form>
          }
        </div>
      </article>
    </section>
  )

}};
export default withRouter(WithContext(BrochureForm));

/**
* @name: resorts.js
* @description: Página de /our-resorts/:string
* @author: Diego, Julian, Bruno, Wilberth , Sergio Trejo
* @version: 1.1.0*/

import React, { Component } from 'react';
import Layout from '../../components/layout';
import { Titlesection, Iconwedd} from '../../components/wirefragment';
import { Sliderprincipal, Tabstwo, Overview, ResortGallery ,ResortVenues,BookingWidget, BookingWidgetMobile} from '../../components';
import api from '../../app/index';

class Resort extends Component {
    constructor(props) {
        super(props);
        this.handleBooking = this.handleBooking.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.headTabsStatic= this.headTabsStatic.bind(this);
        this.sendTonextStep = this.sendTonextStep.bind(this);

        let lang = location.pathname.slice(1).split("/")[0]

        let  urls = lang == "en" ? ["venues", "overview","gallery"] : ["locaciones", "generales","galeria"]

        let urlValue = location.pathname.split("/")[4] ? (props.location.pathname.split("/")[4].split('-').join('') + "").toLocaleLowerCase() : "-"

        console.log(urlValue,urls[0].split("-").join(""),urls[1].split("-").join(""),urls[2].split("-").join(""))
        let tabClick =
            urlValue == urls[0].split("-").join("") ? 0 :
            urlValue == urls[1].split("-").join("") ? 1 :
            urlValue == urls[2].split("-").join("") ? 2 : 0

        this.state = {
            qtyItems : window.innerWidth < 1025 ? 1 : 0,
            slider:[],
            displaycontainer:"venues",
            referencia: this.headFloat = React.createRef(),
            referencia2:this.BodyTabs = React.createRef(),
            referencia3: this.headActive = React.createRef(),
            resort : props.location.pathname.split("/")[3].split('-').join(''),
            country:"",
            select_tab: tabClick,
            urls: urls,
            lng: lang
        };
    }

    headTabsStatic(){
        if(this.headFloat.current!=null){
            if(innerWidth>1024){
                if((this.BodyTabs.current.childNodes[3].offsetTop-window.pageYOffset)<0){
                    this.headFloat.current.style="position: fixed;top: -183px;width: 246px;z-index:1;transition:.5s;"
                }else{
                if(window.pageYOffset>500){
                    this.headFloat.current.style="position: fixed;top: 108px;width: 246px;z-index:12;"
                } else{
                    this.headFloat.current.style="position: absolute;top: 40px;width: 18%;z-index:12;"
                }}
            } else {
                let sizeHead=(45/16)+"rem"
                if(window.scrollY-((300/3.2)*(innerWidth/100))>0){
                    this.headFloat.current.style="position: fixed;top: "+(sizeHead)+";width: 100%;z-index:2"
                    document.getElementById("replace-size").style= "height:" + (this.headFloat.current.offsetHeight) + "px;"
                }
                else{
                    this.headFloat.current.style="position: relative;top: 0px;width: 100%;z-index:2"
                    document.getElementById("replace-size").style= "height:0px;"
                }
            }
        }
    }


    componentDidMount(){
        const resort = this.state.resort
        const { match: { params } } = this.props;

        var jsonEs = require('./dataEs');
        var jsonEn = require('./dataEn');

        if (!jsonEs.default[resort] && !jsonEn.default[resort]){
            window.location.href = "/en/404notfound";
        }


        switch (params.lang) {
           case "es":
                var json = require('./dataEs');
                this.setState({
                    title:json.default[resort].title,
                    subtitle:json.default[resort].subtitle,
                    fullname:json.default[resort].fullname,
                    description:json.default[resort].description,
                    slider:json.default[resort].venues.slider,
                    overview: json.default[resort].overview,
                    venues:json.default[resort].venues,
                    gallery:json.default[resort].gallery,
                    urlBtnBack: json.default[resort].urlBtnBack,
                    target:this.state.referencia3.current,
                    lang:params.lang,
                });
            break;
           default:
                var json = require('./dataEn');
                this.setState({
                    cID:json.default[resort].cID,
                    title:json.default[resort].title,
                    subtitle:json.default[resort].subtitle,
                    fullname:json.default[resort].fullname,
                    description:json.default[resort].description,
                    slider:json.default[resort].venues.slider,
                    overview: json.default[resort].overview,
                    venues:json.default[resort].venues,
                    gallery:json.default[resort].gallery,
                    urlBtnBack: json.default[resort].urlBtnBack,
                    target:this.state.referencia3.current,
                    lang:params.lang,
                });
            break;
        }

        window.addEventListener("scroll", this.headTabsStatic);
        setTimeout(()=>{
            if(this.state.referencia.current){
                this.state.referencia.current.querySelectorAll("li a")[this.state.select_tab].click()
            }
        })
    }

    UNSAFE_componentWillReceiveProps (){
        window.location.reload();
    //     // const resort = props.location.pathname.split("/")[3] .split('-').join('');
    //     // const { match: { params } } = this.props;
    //     // switch (params.lang) {
    //     //    case "es":
    //     //         var json = require('./dataEs')
    //     //         this.setState({
    //     //             title:json.default[resort].title,
    //     //             subtitle:json.default[resort].subtitle,
    //     //             fullname:json.default[resort].fullname,
    //     //             description:json.default[resort].description,
    //     //             slider:json.default[resort].venues.slider,
    //     //             overview: json.default[resort].overview,
    //     //             venues:json.default[resort].venues,
    //     //             gallery:json.default[resort].gallery,
    //     //             urlBtnBack: json.default[resort].urlBtnBack,
    //     //             target:this.state.referencia3.current
    //     //         });
    //     //     break;
    //     //    default:
    //     //         var json = require('./dataEn')
    //     //         this.setState({
    //     //             title:json.default[resort].title,
    //     //             subtitle:json.default[resort].subtitle,
    //     //             fullname:json.default[resort].fullname,
    //     //             description:json.default[resort].description,
    //     //             slider:json.default[resort].venues.slider,
    //     //             overview: json.default[resort].overview,
    //     //             venues:json.default[resort].venues,
    //     //             gallery:json.default[resort].gallery,
    //     //             urlBtnBack: json.default[resort].urlBtnBack,
    //     //             target:this.state.referencia3.current
    //     //         });
    //     //     break;
    //     //}
    }

    handleChange(index,param,element){
        if(this.state.displaybooking!="booking"){
            window.scrollTo(0,0)
        }
        this.setState({
            displaycontainer:param,
            displaybooking:this.state.displaybooking=="booking"?"":"",
            slider:param=="venues"?this.state.venues.slider:param=="overview"?this.state.overview.slider:this.state.gallery.slider,
            target:element.target
        })
        window.addEventListener("scroll",this.headTabsStatic);
        /************************* */
//        this.state.referencia.current.querySelectorAll("li")[index].click()
        if (this.state.urls[index]) {
            let urlNavegator = location.href.split("/")
            /*if (index > 0) {
                urlNavegator[urlNavegator.length - 1] = urlNavegator[urlNavegator.length - 1] + "/" + this.state.urls[index]
            } else {*/
                let subBase=location.pathname.split("/")
                subBase[4]=""
                subBase=subBase.join("/")
                urlNavegator = location.origin+subBase +  "/" + this.state.urls[index]
                urlNavegator = urlNavegator.split("/")
            //}

            urlNavegator = urlNavegator.join("/").split("/")
            let removRepeat = urlNavegator
            urlNavegator = [...new Set(removRepeat)]

            urlNavegator = urlNavegator.join("/")
            history.pushState(null, "", urlNavegator);
        }
        /************************* */
    }


    handleBooking(param,e){

        this.setState({
            displaybooking:param=="clean"?"clean":"booking"
        });

        if (param=="booking") {
           window.removeEventListener("scroll",this.headTabsStatic)
           this.headFloat.current.style="position: fixed;top: 108px;width: 246px;z-index:16;"
        }else{
            window.addEventListener("scroll",this.headTabsStatic);
            if(this.state.target==null){
                this.state.referencia3.current.click();
            }else{
                this.state.target.click();
            }
            if(window.pageYOffset>500){
                this.headFloat.current.style="position: fixed;top: 108px;width: 246px;z-index:12;"
            }else{
                this.headFloat.current.style="position: absolute;top: 40px;width: 18%;z-index:12;"
            }
        }
    }

    sendTonextStep(){
        let path = this.state.lang=="es" ? "/es/da-el-siguiente-paso" : "/en/take-next-step";
        window.location.href = path;
        //this.props.history.push(path);
    }


    render() {

        let { title, slider } = this.state;
        const { match: { params } } = this.props;
        return (
            <Layout title = { title } cID={ this.state.cID ? this.state.cID : ""  } >
            {slider.length > 0 &&
                <section page="resort">
                 <Sliderprincipal slides={slider}/>
                 <section className="container">
                    <article className="head">
                        <Titlesection btnOffers="yes" title={this.state.title}
                        subtitle={this.state.subtitle} description={this.state.description}
                        urlBtnBack={[this.state.urlBtnBack,params.lang=="es"?"REGRESAR":"BACK"]}/>
                        <div id="replace-size"></div>
                        <Tabstwo referencia={this.state.referencia} isOurResort>
                                <a ref={this.state.referencia3} onClick={this.handleChange.bind(this,0,"venues")}>{params.lang=="es"?"Locaciones":"Venues"}</a>
                                <a onClick={this.handleChange.bind(this,1,"overview")}>{params.lang=="es"?"Generales":"Overview"}</a>
                                <a onClick={this.handleChange.bind(this,2,"gallery")}>{params.lang=="es"?"Galería":"Gallery"}</a>
                                {this.state.qtyItems?<a onClick={this.sendTonextStep}>{params.lang=="es"?"Comienza a organizar":"Let's Plan"}</a>:<a className="bookyourhoneymoon" onClick={this.handleBooking.bind(this,"booking")}>{params.lang=="es"?"Reserva tu luna de miel":"BOOK YOUR HONEYMOON"}</a>}
                                {this.state.displaybooking=="booking"?<BookingWidget  mx={this.state.country=="MX"?true:false} lang={this.state.lang} sortby={this.state.fullname} />:null}
                                {this.state.displaybooking=="booking"?<div onClick={this.handleBooking.bind(this,"clean")}><Iconwedd icon="close-menu" color="pink position"></Iconwedd></div>:null}
                        </Tabstwo>
                    </article>
                    <section className="subcontainer" ref={this.state.referencia2}>
                        {this.state.displaycontainer=="venues"?<ResortVenues venues={this.state.venues}/>:""}
                        {this.state.displaycontainer=="overview"?<Overview  overview={this.state.overview}/>:""}
                        {this.state.displaycontainer=="gallery"?<ResortGallery overview={this.state.gallery}/>:""}
                        <span className="limit-head" />
                    </section>
                </section>
                <BookingWidgetMobile lang={this.state.lang}  sortby={this.state.fullname}  mx={this.state.country=="MX"?true:false}></BookingWidgetMobile>
            </section>

            }</Layout>
        );
    }
}

export default Resort;

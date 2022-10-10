import React, { Component } from "react";
import WithContext from "../../../app/Context";
import { Titlesection } from '../../../components/wirefragment';
import { withRouter } from "react-router-dom"
import {InlineWidget} from 'react-calendly'

class StepCongrats extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title : "",
            txt1 :  "",
            title2 : "",
            schedules :  "",
            phones : "",
            bride : "",
            medidasWidget : {"minWidth":"320px","height":"650px"},
         }
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

     toElement() {


        clearTimeout(this.timer);
        let targetElement = document.querySelector(".item-loader-container");
        if (targetElement) {
            // Usar scrollIntoView() para ir al contenido.
            if (typeof targetElement.scrollIntoView === 'function') {
                targetElement.scrollIntoView({ block: 'start', behavior: 'smooth' });
            } else {
                console.error(':goTo: scrollIntoView not available for', targetElement);
            }
        } else {
            console.error(':goTo: invalid selector "', selector, '" returned: ', targetElement);
        }

        this.timer2 = setTimeout(() => this.toFocus(), 800);




    }

     componentDidMount(){

        this.timer = setTimeout(() => this.toElement(), 500);

        const { match: { params } } = this.props;
        switch (params.lang) {
            case "es":
                this.setState ({
                    title : "Gracias,",
                    txt1 :  "Por su interés en Palace Resorts. Uno de nuestros experimentados especialistas en bodas se comunicará con usted en breve.",
                    title2 : "Palace Resorts Weddings",
                    schedules :  "Lun - Vie 9:00 a.m. - 6:00 p.m. EST <br /> Sábado 9:00 a.m. a 2:00 p.m. EST",
                    phones : "US & Canada 1-877-725-4933<br />Mexico 800-841-6641<br />UK 0-808-258-0083"                })
            break;
            case "en":
                this.setState ({
                    title : "Thank you,",
                    txt1 :  "One of our destination wedding specialists will contact you shortly.",
                    title2 : "Palace Resorts Weddings",
                    schedules :  "Mon. -Fri. 9:00 a.m. - 6:00 p.m. EST<br />Saturday 9:00 a.m. - 2:00 p.m. EST",
                    phones : "US & Canada 1-877-725-4933<br />Mexico 800-841-6641<br />UK 0-808-258-0083"
                 })
            break;
        }

        let { getData } = this.state.app.currentPage;
        this.setState ({
            bride : getData("contactName")
        })

        if (window.innerWidth < 1025) {
            this.setState({
                medidasWidget : {"minWidth":"320px","height":"1100px"},
            })

        }



        this.removemosData()
    }

    removemosData(){
        const { removeData } = this.props.app.currentPage;
            removeData("celebration")
            removeData("youAre")
            removeData("contactName")
            removeData("contactLastname")
            removeData("brideFirstName")
            removeData("brideLastName")
            removeData("country")
            removeData("state")
            removeData("stateName")
             removeData("groomeFirstName")
             removeData("groomeLastName")
             removeData("celebrationDate")
             removeData("celebrationDate")
            removeData("guestNumber")
             removeData("guestNumber")
            removeData("resorts")
            removeData("resorts")
             removeData("weddingSpecialist")
             removeData("referService")
             removeData("agencyname")
             removeData("optiontrfa")
             removeData("agencyadd")
             removeData("agencypho")
            removeData("countryAgency")
            removeData("countryAgencyName")
            removeData("stateAgency")
             removeData("stateAgencyName")
            removeData("fname")
             removeData("email")
             removeData("phone")
            removeData("season_in_mind")
             removeData("termsconditions")
            removeData("termsconditions")
            removeData("items_wish")
            removeData("clientAgency")
            removeData("confirm_mail")
            removeData("countryName")
            removeData("season_in_mind")
            removeData("notsure")
            removeData("notsure_resort")
            removeData("member")
            return true;
    }


    render() {
        return (
            <article className="item-loader-container" >
               <div className="">
                    <Titlesection icon="palace-crown" id={"ThankYouTake"}color="pink" title={this.state.title+" "+this.state.bride+"."}   />
                </div>
                <div className="content-text-padding-10-10">
                    <Titlesection color="pink" description={this.state.txt1}  />
                </div>
                {/*<InlineWidget url="https://calendly.com/d/gvpj-vxpx/palace-resorts-weddings-intro-call?text_color=ea8685&primary_color=ea8685" */}
                {/*              styles={this.state.medidasWidget} />*/}
                    <br />
                    <br />
                    <div className={"black-color-content-text"}>
                        <Titlesection color="pink" subtitle={this.state.title2}  />
                    </div>
                <br />
                    <Titlesection color="pink" description={this.state.schedules}  />
                <br />
                    <Titlesection color="pink" description={this.state.phones}  />
                    <br />


            </article>
        );
    }
}
export default withRouter(WithContext(StepCongrats));

import React, { Component } from 'react';
import { Iconwedd } from '../wirefragment';
import booking from './data';
import Roomsandguests from './roomsandguests';
import Calendar from '../calendar/base';
import DateUtils from '../calendar/base/dateUtils';

class BookingWidget extends Component {
    constructor(props) {
        super(props);
        this.sortArray = this.sortArray.bind(this);
        this.handleDrops = this.handleDrops.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.onDateChange2 = this.onDateChange2.bind(this);
        var date = new Date();
        date.setDate(date.getDate() + 6);
        this.state = {
            resorts:booking.resorts,
            resortArray:[],
            airports:booking.airports,
            searched:[],
            rooms:[
                {adults:2,teens:0,kids:0,infants:0},
            ],
            activetab:"hotelair",
            date:date
        };
        this.inputAiports = React.createRef();
        this.inputResorts = React.createRef();
    }


    onDateChange(newDate){
        this.setState({
            trueselectedDate:newDate,
            selectedDate:DateUtils.formatDate(newDate,'YYYY')+"-"+DateUtils.formatDate(newDate,'MM')+"-"+DateUtils.formatDate(newDate ,'DD')
        })
    }

    onDateChange2(newDate){
        if(newDate>this.state.trueselectedDate){
            this.setState({
                trueselectedDate2:newDate,
                selectedDate2:DateUtils.formatDate(newDate,'YYYY')+"-"+DateUtils.formatDate(newDate,'MM')+"-"+DateUtils.formatDate(newDate,'DD')
            })
        }else{
            alert("validation messsage");
        }
    }
    
    componentDidMount(){
        this.sortArray(this.props.sortby,this);
        window.addEventListener("scroll", this.disableScroll);
        var plusoneday = this.state.date;
        plusoneday.setDate(plusoneday.getDate() + 1)
        var date = new Date();
        date.setDate(date.getDate() + 6);
        this.setState({
            date:date,
            scrollX:window.scrollX,
            scrollY:window.scrollY,
            selectedDate:DateUtils.formatDate(this.state.date,'YYYY')+"-"+DateUtils.formatDate(this.state.date,'MM')+"-"+DateUtils.formatDate(plusoneday,'DD'),
            selectedDate2:DateUtils.formatDate(this.state.date,'YYYY')+"-"+DateUtils.formatDate(this.state.date,'MM')+"-"+DateUtils.formatDate(plusoneday,'DD'),
            trueselectedDate:this.state.date,
            trueselectedDate2:this.state.date,
            activetab:this.props.mx?"hotel":"hotel"
        })
    }  
    
    
    
    
    sortArray = (param,e) => {
        const resorted = this.state.resorts.slice(0).sort((a, b)=> {
            if ( param > b.resort) {
                return -1;
            }
            if (param< b.resort) {
                return -1;
            }
            // a must be equal to b
            return 0;
        })
        
        this.setState({
            resortsSorted:resorted,
            currentResorts:resorted[0].resort,
            resortArray:resorted.splice(1,resorted.length - 1),
            activedroppdown:""
        })

        this.inputResorts.current.value = resorted[0].resort;
    }
    
    
    handleDrops  = (param) =>  {
        this.setState({
            activedroppdown:this.state.activedroppdown==param?"":param
        })
    }

    handleActive = (param) => {
        this.setState({
            activetab:param
        })
    }
    
    changeHandler = event => {
        const value = event.target.value;
        this.setState({
            searchWord:value
        })
        if(value == ""){
            this.setState({
                searched:[]
            })
        }else{
            let searchWord = this.state.searchWord
            let list = this.state.airports.filter(function(e){return e.value.toLowerCase().includes(searchWord.toLowerCase())});
            this.setState({
                searched:list
            })
        } 
    }
    handleAirports(param, e){
        this.setState({
            airportselected:param,
            searched:[]
        });
        
        this.inputAiports.current.value = param.value;
    }

    

    disableScroll = () => {
       window.scrollTo(this.state.scrollX,this.state.scrollY);
    }

    componentWillUnmount(){
        window.removeEventListener("scroll",this.disableScroll);
    }

    handleSubmit = () => {
        let url = "";
        let flag= true;
        let hotel= ""
        if(this.state.activetab=="hotel"){

            switch (this.state.resortsSorted[0].value) {
                case "beachpalace":
                    url = 'https://bookingsbeachpr.palaceresorts.com/';
                    break;
                case "cozumel":
                    url = 'https://bookingscozumelpr.palaceresorts.com';
                    break;
                case "islamujeres":
                    url = 'https://bookingsislamujerespr.palaceresorts.com';
                    break;
                case "playacar":
                    url = 'https://bookingsplayadelcarmenpr.palaceresorts.com';
                    break;
                case "sunpalace":
                    url = 'https://bookingssunpr.palaceresorts.com';
                    break;
                case "leblanccancun":
                    url = 'https://bookingscancunpr.leblancsparesorts.com';
                    break;
                case "leblanccabo":
                    url = 'https://bookingscabopr.leblancsparesorts.com';
                    break;
                case "mooncancun":
                    url = 'https://onlinebookingspr.moonpalace.com';
                    break;
                case "moonjamaica":
                    url = 'https://bookingsjamaicapr.moonpalace.com';
                    break;
                case "thegrand":
                    url = 'https://bookingsthegrandpr.moonpalace.com';
                    break;
            }

            url += "?&skd-total-rooms="+this.state.rooms.length;

            this.state.rooms.forEach((element , index) => {
                url += "&adult_room"+(index+1)+"="+element.adults;
                if (element.teens>0||element.kids>0||element.infants>0) {
                    url += "&child_room"+(index+1)+"="+(element.infants+element.kids+element.teens);

                    if (element.teens>0){
                        url += "&child_room"+(index+1)+"_age15="+element.teens;
                    }


                    if (element.kids>0){
                        url += "&child_room"+(index+1)+"_age8="+element.kids;
                    }

                    if (element.infants>0){
                        url += "&child_room"+(index+1)+"_age3="+element.infants;
                    }
                }
              
            });

            if(flag&this.state.trueselectedDate2 > this.state.trueselectedDate){
                url +=  "&skd-checkin="+this.state.selectedDate;
                url += "&skd-checkout="+this.state.selectedDate2;
            }else{
                alert("validatiion messsage")
                flag= false;
            }
            if(flag){
                window.open(url, '_blank');
            }
        }else{
            switch (this.state.resortsSorted[0].value) {
                case "beachpalace":
                    hotel = 10444;
                    url += 'https://www.reservhotel.com/cancun-mexico/beach-palace-be/booking-engine/ibe5.main';
                    url += "?hotel="+hotel
                    break;
                case "cozumel":
                    hotel = 10445;
                    url += 'https://www.reservhotel.com/cozumel-mexico/cozumel-palace-be/booking-engine/ibe5.main';
                    url += "?hotel="+hotel
                    break;
                case "islamujeres":
                    hotel = 10446;
                    url = 'https://www.reservhotel.com/isla-mujeres-mexico/isla-mujeres-palace-be/booking-engine/ibe5.main';
                    url += "?hotel="+hotel
                    break;
                case "playacar":
                    hotel = 10449;
                    url = 'https://www.reservhotel.com/playa-del-carmen-mexico/playacar-palace/booking-engine/ibe5.main';
                    url += "?hotel="+hotel
                    break;
                case "sunpalace":
                    hotel = 10450;
                    url = 'https://www.reservhotel.com/cancun-mexico/sun-palace/booking-engine/ibe5.main';
                    url += "?hotel="+hotel
                    break;
                case "leblanccancun":
                    hotel = 10447;
                    url = 'https://www.reservhotel.com/cancun-mexico/le-blanc-spa-resort-be/booking-engine/ibe5.main';
                    url += "?hotel="+hotel
                    break;
                case "leblanccabo":
                    hotel = 10458;
                    url = 'https://www.reservhotel.com/los-cabos-mexico/le-blanc-los-cabos-be/booking-engine/ibe5.main';
                    url += "?hotel="+hotel
                    break;
                case "mooncancun":
                    hotel = 10443;
                    url = 'https://www.reservhotel.com/cancun-mexico/moon-palace-cancun-be/booking-engine/ibe5.main';
                    url += "?hotel="+hotel
                    break;
                case "moonjamaica":
                    hotel = 10448;
                    url += "https://www.reservhotel.com/ocho-rios-jamaica/moon-palace-jamaica-grande-be/booking-engine/ibe5.main"
                    url += "?hotel="+hotel
                    break;
                case "thegrand":
                        hotel = 10451;
                    url = 'https://www.reservhotel.com/cancun-mexico/the-grand-at-moon-palace-cancun/booking-engine/ibe5.main';
                    url += "?hotel="+hotel
                    break;
            default:
                break;
        }
        if(flag){
            url+="&airport="+this.state.airportselected.data;
        }else{
            flag=false;
        }
        if(flag==true){
            let totaladults = 0;
          
            totaladults += this.state.rooms[0].adults;
            
            url+="&adults="+totaladults
        }else{
            flag=false
        }
        

        if(flag){
        let totalkids = 0;
            totalkids += this.state.rooms[0].kids;
            totalkids += this.state.rooms[0].infants;
            totalkids += this.state.rooms[0].teens;
            if (totalkids>0) {
                url+="&child="+totalkids;
                for (let index = 0; index < this.state.rooms[0].kids; index++) {
                    url += "&childages=8";
                }
                for (let index = 0; index < this.state.rooms[0].infants; index++) {
                    url += "&childages=3";
                }
                for (let index = 0; index < this.state.rooms[0].teens; index++) {
                    url += "&childages=15";
                }
            }
        }else{
            flag=false
        }


        if(flag&this.state.trueselectedDate2 > this.state.trueselectedDate){
            url +=  "&aDate="+this.state.selectedDate;
            url += "&dDate="+this.state.selectedDate2;
        }else{
            alert("validation message")
            flag= false;
        }
        url += "&date_format=YYYY-MM-DD"
        url += "&currency=USD"

        if(flag){
            url+="&lang=";
            url+=this.props.lang=="es"?"2":"1"
        }
        if(flag){
            url += "&rooms="+this.state.rooms.length
        }

        if(flag){
            window.open(url, '_blank');
        }
    

        }
        
        
    }
    
    render() {
        
        const resortsdropdown = this.state.resortArray.map(element => {
            return <li onClick={this.sortArray.bind(this,element.resort)}>{element.resort}</li>
        }
        );
        
        const airportsdropdown = this.state.searched.map(element => {
            return <li onClick={this.handleAirports.bind(this,element)}>{element.value}</li> 
        }
        );
        
        return (
            <article component="bookingwidget" className="desktop">
                   <div className="blackbackgroung desktop" ></div>
                <section className="tabs" >
                    <div className={this.state.activetab=="hotel"?"active HOTEL":"HOTEL"} onClick={this.handleActive.bind(this,"hotel")}>
                        <Iconwedd icon="hotel" color={this.state.activetab=="hotel"?"pink":"white"}></Iconwedd>
                        <span>{this.props.lang=="en"?"HOTEL ONLY":"SOLO HOTEL"}</span>
                        <div className="tabs-arrow"></div>
                    </div>
                    {this.props.mx?
                    null:
                    <div className={this.state.activetab=="hotelair"?"active HOTEL-AIR":"HOTEL-AIR"}   onClick={this.handleActive.bind(this,"hotelair")}>
                        <Iconwedd icon="hotel-plane" color={this.state.activetab=="hotelair"?"pink":"white"}></Iconwedd>
                        <span>{this.props.lang=="en"?"HOTEL + AIR":"HOTEL + VUELO"}</span>
                        <div className="tabs-arrow"></div>
                    </div>
                    }
                </section>
                <section className="booking">
                    <article className="top-side">
                    {this.state.activetab=="hotelair"?<div className="selector">
                            <input placeholder={this.props.lang=="en"?"Origin":"Origen"} ref={this.inputAiports}  onChange={this.changeHandler} className="airportsearch" type="text"/>
                        </div>:<div className="selector2"></div>}
                        {
                            this.state.searched.length>0?
                                <ul className="dropdownairports">{airportsdropdown}</ul>
                            :
                                ""
                        }
                        <div className="selector"onClick={this.handleDrops.bind(this,"resorts")}>
                             <input placeholder="Resort" ref={this.inputResorts}  onChange={this.changeHandler} disabled className="resortsdropdown" type="text"></input>&nbsp;<Iconwedd icon={this.state.activedroppdown=="resorts"?"chevron-up":"chevron-down"} color="white" ></Iconwedd>
                        </div>
                        {
                        this.state.activedroppdown=="resorts"?
                            <ul className="dropdownresorts">{resortsdropdown}</ul>
                        :
                            ""
                        }
                        <div>
                        <div  className="selector dates" onClick={this.handleDrops.bind(this,"calendar")}>
                            <Iconwedd icon="calendar" color="white"></Iconwedd>&nbsp;{this.state.selectedDate}
                        </div>
                            {
                            this.state.activedroppdown=="calendar"?
                            <div>
                            <Calendar
                            mode="datepicker"
                            today={this.state.date}
                            onDateSelected={this.onDateChange}
                            cleaner={this.handleDrops}
                            ></Calendar>
                          </div>
                            :
                            ""
                        }
                        </div>
                        <div>
                        <div  className="selector dates" onClick={this.handleDrops.bind(this,"calendar2")}>
                            <Iconwedd icon="calendar" color="white"></Iconwedd>&nbsp;{this.state.selectedDate2}
                            </div>
                            {
                               this.state.activedroppdown=="calendar2"?
                               <div>
                               <Calendar
                               mode="datepicker"
                               today={this.state.date}
                               onDateSelected={this.onDateChange2}
                               cleaner={this.handleDrops}
                               ></Calendar>
                               </div>
                               :
                               ""
                            }
                        </div>
                        <div  className="selector"onClick={this.handleDrops.bind(this,"rooms")}>
                            <span>{localStorage.langWeddings=="es"?"No. cuartos":"Rooms and Guests"}</span> &nbsp;<Iconwedd icon={this.state.activedroppdown=="rooms"?"chevron-up":"chevron-down"} color="white" ></Iconwedd>
                        </div>
                        {
                            this.state.activedroppdown=="rooms"?
                                <Roomsandguests rooms={this.state.rooms} resort={this.state.resortsSorted[0].value} config={this.state.activetab}></Roomsandguests>
                            :
                                ""
                        }
                    </article>
                    <article className="btn-booknow">
                        <Iconwedd icon="chevron-left" color="white"></Iconwedd><input type="submit" onClick={this.handleSubmit} value={localStorage.langWeddings=="es"?"Reserva":"BOOK NOW"}></input>
                    </article>
                </section>
            </article>
        );
    }
}
    
export default BookingWidget;
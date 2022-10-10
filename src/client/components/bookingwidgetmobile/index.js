import React, {Component} from 'react';
import { Grid, Cell } from '../grid';
import { Iconwedd, Input } from '../wirefragment';
import Calendar from '../calendar/base';0
import Roomsandguests from '../bookingwidget/roomsandguests';
import booking from '../bookingwidget/data';
import DateUtils from '../calendar/base/dateUtils';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

class BookingWidgetMobile extends Component {
    constructor(props) {
        super(props);
        this.onDateChange = this.onDateChange.bind(this)
        this.onDateChange2 = this.onDateChange2.bind(this)
        this.handleActive = this.handleActive.bind(this)
        this.sortArray = this.sortArray.bind(this);
        this.state = {
            resorts:booking.resorts,
            searched:[],
            rooms:[
                {adults:1,teens:0,kids:0,infants:0},
            ],
            selectedDate:"Arrival Date",
            selectedDate2:"Departure Date",
            collapse:"mainwidget",
            selectResorts:"",
            date: new Date(),
            resortsSorted:[],
            resortsmap:[]
        }
        this.inputAiports = React.createRef();
        this.selectResorts = React.createRef();
    }

    componentDidMount(){
        var plusoneday = this.state.date;
        plusoneday.setDate(plusoneday.getDate() + 1)
        var date = new Date();
        date.setDate(date.getDate() + 6);
        this.getIP();
        this.sortArray(this.props.sortby,this);
        this.setState({
            date:date,
            resorts:booking.resorts,
            airports:booking.airports,
            active:"hotel"
        })
    }

    componentWillUnmount(){
        clearAllBodyScrollLocks();
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

        const resorts= resorted.map( (element) => {
            return [element.resort,element.value]
        }
        )
        
        this.setState({
            resortsSorted:resorted,
            resortsmap:resorts
        })

        this.selectResorts.current.value = resorts[0];
        document.querySelector(".view-selec").value = resorts[0][0]
    }
    
    async getIP() {
        try {
            var response = await fetch('https://api.ipify.org');
            var text = await response.text();
            var textArray = text.split("\n");
  
           console.log("text",text)
           api.getCountrybyIP(text)
           .then( res =>{
               console.log("res",res);
                this.setState({
                    country: res.data['country_code_iso_2']
                })
            }).catch( e => console.error(e));
        }
        catch
        {
        console.log("cake","")
        }
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

    handleDrops  = (param) =>  {
        this.setState({
            activedroppdown:this.state.activedroppdown==param?"":param
        })
    }

    showBooking = () => {
        this.setState({
            collapse:this.state.collapse=="collapse"?"mainwidget":"collapse"
        })
        let height1 = document.querySelector(".mask").clientHeight;
        let height2 = document.querySelector(".tabswidget").clientHeight;
        let height3 = document.querySelector(".floatingMenu").clientHeight;
        let height = innerHeight-height1-height2-height3+3;
         this.elElement.style="height:"+height+"px";

        if(this.state.collapse=="mainwidget"){
            disableBodyScroll(document.querySelector(".bodywidget"))
            disableBodyScroll(document.querySelector(".options"))
        }else{
            enableBodyScroll(document.querySelector(".bodywidget"))
            enableBodyScroll(document.querySelector(".options"))
        }
    }


    onDateChange(newDate){
        this.setState({
            trueselectedDate:newDate,
            date2:newDate,
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
            alert("validation message");
        }
    }

    handleActive(param) {
        this.setState({
            active:param
        })
    }

    handleChat() {
        acquireIO.max();
    }

    validationCalendar(){
        alert(this.props.lang=="en"?"please select a arrival date first":"porfavor primero selecciona una fecha de llegada");
        this.setState({
            activedroppdown:""
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let url = "";
        let flag = true;
        let hotel = ""
        let cant = "";
        if (this.state.active=="hotelair") {
            switch (this.selectResorts.current.value) {
                case "beachpalace":
                        hotel = 10444;
                        url += 'https://www.reservhotel.com/cancun-mexico/beach-palace-be/booking-engine/ibe5.main';
                        url += "?hotel="+hotel
                        break;
                    case "cozumel":
                        hotel = 10445;
                        url += 'https://www.reservhotel.com/cozumel-mexico/cozumel-palace-be/booking-engine/ibe5.main';
                        url += "?hotel="+hotoffersel
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
        }else{
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
                alert("validation message")
                flag= false;
            }
            if(flag){
                window.open(url, '_blank');
            }
        }
    }

    render() {

        const airportsdropdown = this.state.searched.map(element => {
            return <li onClick={this.handleAirports.bind(this,element)}>{element.value}</li> 
        }
        );

        return (
            <section component="bookingwidgetmobile">
                
                    <Grid type="x" className={this.props.offers?this.state.collapse=="collapse"?"staticmenu offers":"staticmenu":"staticmenu"} >
                        <Cell small="2" className="icon-phone">
                            <Iconwedd icon={"phone-circled"} color={"white"} />
                        </Cell>
                        <Cell small="8">
                            {this.state.collapse=="collapse"?<button onClick={this.handleSubmit} className="btn-take-the-next-step" type="submit">{this.props.lang=="en"?"BOOK NOW":"RESERVA AHORA"}</button>:<button ref={this.props.offers?this.props.refe:null} onClick={this.showBooking} className="btn-take-the-next-step" type="submit">{this.props.lang=="en"?"BOOK YOUR HONEYMOON":"RESERVA TU LUNA DE MIEL"}</button>}
                        </Cell>
                        <Cell small="2" className="icon-chat">
                            <center>
                                <button onClick = { this.handleChat.bind(this) }><Iconwedd icon={"chat-circled"} color={"white"} /></button>
                            </center>
                        </Cell>
                    </Grid>
    
                <section  className={this.state.collapse}>
                    <section className="tabswidget">
                        <div onClick={this.handleActive.bind(this,"hotel")} className={this.state.active=="hotel"?"active HOTEL":"HOTEL"}>
                            <Iconwedd icon="hotel" color={this.state.active=="hotel"?"pink":"white"}></Iconwedd>
                            <span>{this.props.lang=="en"?"HOTEL ONLY":"SOLO HOTEL"}</span>
                        </div>
                        {this.props.mx?null
                        :
                        <div onClick={this.handleActive.bind(this,"hotelair")} className={this.state.active=="hotelair"?"active HOTEL-AIR":"HOTEL-AIR"}>
                          <Iconwedd icon="hotel-plane" color={this.state.active=="hotelair"?"pink":"white"}></Iconwedd>
                            <span>{this.props.lang=="en"?"HOTEL + AIR":"HOTEL + VUELO"}</span>
                        </div>
                    }
                     <div className="CLOSE" onClick={this.showBooking}>
                            <Iconwedd icon="alt-close" color="white"></Iconwedd>
                            <span>{this.props.lang=="en"?"CLOSE":"CERRAR"}</span>
                        </div>
                    </section>
                    <section ref={section => this.elElement = section} className="bodywidget">
                            <Input type={"select"} placeholder={"Select Resort"} name="hotel" refInput={this.selectResorts} id="resorts" onchange={this.handleSelect} data={this.state.resortsmap}></Input>
                    {this.state.active=="hotelair"?<input placeholder="Origin" ref={this.inputAiports}  onChange={this.changeHandler} className="airportsearch" type="text"/>:null}
                    {
                            this.state.searched.length>0?
                                <ul className="dropdownairports">{airportsdropdown}</ul>
                            :
                                ""
                        }
                        <div  className="datepicker" onClick={this.handleDrops.bind(this,"calendar")}>
                            <span style={{width:"100%"}}>{this.state.selectedDate}</span><Iconwedd icon="calendar" color="pink"></Iconwedd>
                        </div>
                        {
                            this.state.activedroppdown=="calendar"?
                            <Calendar
                            mode="datepicker"
                            today={this.state.date}
                            onDateSelected={this.onDateChange}
                            cleaner={this.handleDrops}
                            ></Calendar>
                            :
                            ""
                        }
                          <div  className="datepicker" onClick={this.handleDrops.bind(this,"calendar2")}>
                            <span style={{width:"100%"}}>{this.state.selectedDate2}</span><Iconwedd icon="calendar" color="pink"></Iconwedd>
                        </div>
                        {
                            this.state.activedroppdown==="calendar2"?this.state.trueselectedDate!=null?
                            <Calendar
                            mode="datepicker"
                            today={this.state.date2}
                            onDateSelected={this.onDateChange2}
                            cleaner={this.handleDrops}
                            ></Calendar>:this.validationCalendar():""
                           
                        }
                      <div  className="roomsandguests"onClick={this.handleDrops.bind(this,"rooms")}>
                            <span style={{width:"100%"}}>Rooms and Guests</span><Iconwedd icon={this.state.activedroppdown=="rooms"?"chevron-up":"chevron-down"} color="pink" ></Iconwedd>
                        </div>
                        {
                            this.state.activedroppdown=="rooms"?
                                <Roomsandguests config={this.state.active} rooms={this.state.rooms} resort={this.selectResorts.current.value}></Roomsandguests>
                            :
                                ""
                        }
                        </section>
                </section>
            </section>
        );
    }
}

export default BookingWidgetMobile;
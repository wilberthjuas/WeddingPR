/**
 * @class RadioButton
 * @version 1.0.0
 * @author resanchez
 * @summary Componente selccion date piker
 */

import svg from "./../../../../../public/img/weddings/general/sprite.svg";
import { Iconwedd, Input } from "../../wirefragment";
import Calendar from '../../../components/calendar/base';
import DateUtils from '../../calendar/base/dateUtils';

import React from "react";

export default class DatePK extends React.Component {
    valuPrev=""
    constructor(props) {
        super(props);
        this.state = {
            checked: props.checked,
            value: props.value,
            deactive: true,
        };
        this.renderChecked = this.renderChecked.bind(this);
        this.renderUnChecked = this.renderUnChecked.bind(this);

        this.changeHandlerdp = this.changeHandlerdp.bind(this);

        this._handleChange = this._handleChange.bind(this);
        this._handleOnclick = this._handleOnclick.bind(this);
        this._handleOnclick2 = this._handleOnclick2.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.handleDrops = this.handleDrops.bind(this);
        this.inputDateTime = React.createRef()
        this.candelarContent = React.createRef()
    }



    // toggle = (e) => {
    //    this.setState({ checked: !this.state.checked }, this._handleChange, () => {
    //       if (typeof this.props.updater == 'function') {
    //          console.log('llamando función updater');
    //          this.props.onChange(this.state);
    //       }
    //    });
    // }

    /**
     * Se invoca al marcar o desmarcar el componente y se envía la información
     * del control al evento onChange
     */
    // _handleChange = () => {
    //    if (typeof this.props.onChange === 'function') {
    //       return this.props.onChange(this.state);
    //    }
    // }
    componentDidMount() {
        //document.body.addEventListener('click', alert("ads"))
        document.body.addEventListener("click",(e)=>{this.onBlur()})
        //window.addEventListener("click", alert(2));
    }
    changeHandlerdp() { }
    filter(data){
        let colet=""
        
        if(data[0]!=null){if(data[0]=="-"){colet+=""}else{colet+=data[0]}}
        if(data[1]!=null){if(data[1]=="-"){colet+=""}else{colet+=data[1]}}
        if(data[2]!=null){if(data[2]=="-"){colet+=""}else{colet+=data[2]}}
        if(data[3]!=null){if(data[3]=="-"){colet+=""}else{colet+=data[3]+"-"}}

        //if(data.length==4){colet+="-"}

        if(data[5]!=null){if(data[5]=="-"){colet+=""}else{colet+=data[5]}}
        if(data[6]!=null){if(data[6]=="-"){colet+=""}else{colet+=data[6]+"-"}}

        //if(data.length==7){colet+="-"}

        if(data[8]!=null){if(data[8]=="-"){colet+=""}else{colet+=data[8]}}
        if(data[9]!=null){if(data[9]=="-"){colet+=""}else{colet+=data[9]}}
        return colet
    }
    preValue = null
    characterValid(e, ein) {
        try {
            let string = this.filter(e.value)
            let dateValid=new Date(string)
            if((dateValid+"").length>40){
                e.setCustomValidity("");
                /*let now=new Date()
                console.log(dateValid>now)*/
            }else{
                e.setCustomValidity(localStorage.langWeddings=="en"?"Invalid Date":"Fecha invalida");
            }
            let out = '';
            let filtro = '1234567890-';//Caracteres validos
            //Recorrer el texto y verificar si el caracter se encuentra en la lista de validos 
            for (var i = 0; i < string.length; i++)
                if (filtro.indexOf(string.charAt(i)) != -1)
                    //Se añaden a la salida los caracteres validos
                    out += string.charAt(i);
            //Retornar valor filtrado
            return out;
        } catch (ex) {
            console.log(ex)
        }
    }
    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
    
        return [year, month, day].join('-');
    }
    onBlur(e){
       //setTimeout(()=>{
            this.setState({deactive:true})
        //})
        //console.log(e)
        
    }
    //placeholder={this.formatDate(new Date().setDate(new Date().getDate()+1 ))}
    renderChecked() {
        return (
            <div component="p4_datepicker" style={this.props.style!=null?this.props.style:{}}>
                <div className={"_inputdate"}>
                    <label className={"_inputdatelabel"}>
                        <div className={"_inputdateinput"}>
                            <input
                                className={"_inputdatepk"}
                                type="text"
                                placeholder={this.props.placeholder}
                                value={this.state.value}
                                onChange={this._handleChange}
                                pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
                                required={this.props.required ? true : false}
                                disabled={this.props.disabled ? true : false}
                                name={"exactDate"}
                                onClick={()=>{this._handleOnclick();}}
                                onKeyUp={this.props.handleKeyPress}

                                onKeyDown={(e)=>{if (e.keyCode != 8) { e.target.value = this.characterValid(e.target,e) } }}
                                onKeyDownCapture={(e)=>{if (e.keyCode != 8) { e.target.value = this.characterValid(e.target,e) } }}
                                onKeyUpCapture={(e)=>{if (e.keyCode != 8) { e.target.value = this.characterValid(e.target,e) } }}

                                maxLength="10"
                                autoComplete="off"
                                autoCorrect="off" 
                                autoCapitalize="off" 
                                spellCheck={false}
                                //onBlur={()=>{setTimeout(()=>{this.setState({deactive:true})},300)}}
                                ref={this.inputDateTime}
                            />
                            <div className={"_inputdatebottom test"}>
                                <div className={"_inputdatebot"} value="texto del botón" >
                                    <Iconwedd icon={"calendar"} color={"pink"} />
                                    {/* <span className={"_inputdatebot_icon"} style={this.props.style!=null?this.props.style:{"":""}}>
                                 <svg  className={"calendar"+ " "+"_inputdatebot_img" } ref={this.props.refIcon!=null?this.props.refIcon:null}>
                                 <use xlinkHref={`${svg}#calendar`} />
                                 </svg>
                              </span> */}
                                </div>
                            </div>
                        </div>
                    </label>
                </div>
                <div className={"_space_calendar"} component="cell"  style={

                    this.state.deactive ? { height: "0px" } : { height:this.candelarContent.current.offsetHeight+"px"}
                
                } >
                    <div className={"_space_calendar_postrel"} ref={this.candelarContent} onClick={(e)=>{ 
                        this.valuPrev=this.inputDateTime.current.value
                        setTimeout(()=>{                            
                            if(this.inputDateTime.current.value==this.valuPrev){
                                this.setState({deactive:false})
                            }
                        })

                        this.onBlur("-")}}>
                        <Calendar
                            mode="datepicker"
                            today={this.state.date}
                            onDateSelected={this.onDateChange}
                            cleaner={this.handleDrops}
                        />
                    </div>
                </div>
            </div>
        );
    }
    _handleChange(e) {
        this.setState({ value: event.target.value });
    }
    onDateChange(newDate) {
        let dateparticion = DateUtils.formatDate(newDate, 'YYYY') + "-" + DateUtils.formatDate(newDate, 'MM') + "-" + DateUtils.formatDate(newDate, 'DD')
        this.setState({
            value: dateparticion,
            deactive: true
        }, () => { this.props._returnChange(dateparticion); })
    }
    handleDrops(param) {
        this.setState({
            activedroppdown: this.state.activedroppdown == param ? "" : param
        })
    }
    _handleOnclick(e,v) {
        let deactive = true;
        if (this.state.deactive) {
            deactive = false;
        }
        this.setState({ deactive })
    }

    _handleOnclick2(e) {
        let deactive = true;
        if (this.state.deactive) {
            deactive = false;
        }
        this.setState({ deactive })
    }

    renderUnChecked() {
        return <div style={{ display: "inline-block", clear: "both" }}></div>;
    }

    render() {
        return this.state.checked == "0" ? this.renderChecked() : this.renderUnChecked();
    }
}

DatePK.defaultProps = {
    checked: 0,
    value: "",
    _returnChange: ((algo) => { })
};

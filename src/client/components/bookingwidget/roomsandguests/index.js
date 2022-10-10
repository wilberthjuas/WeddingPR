import React, { Component } from 'react';
import { Grid, Cell } from '../../grid';

class Roomsandguest extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            romsqty:1,
            rooms:[]
        };
    }

    addRooms = () => {
        if (this.props.rooms.length<3) {
       let newArray = this.props.rooms;

       newArray.push({adults:2,teens:0,kids:0,infants:0});
       this.setState({
           rooms:newArray
       })}
    }

    removeRooms = () => {
        if (this.props.rooms.length>1) {
            let newArray = this.props.rooms;

            newArray.pop();
    
            this.setState({
                rooms:newArray
            })   
        }
    }

    addElements = (index,param) => {
        if(this.validateMaxQntty(index)){
            let newArray = this.props.rooms;
            switch (param) {
                case "adults":
                    newArray[index].adults += 1 ;
                    break;
                case "teens":
                    newArray[index].teens += 1 ;
                    break;
                case "kids":
                    newArray[index].kids += 1 ;
                    break;
                case "infants":
                    newArray[index].infants += 1 ;
                    break;
                default:
                    break;
            }
            this.setState({
                rooms:newArray
            })
    
        }else {
            alert("no")
        }
    }

    removeElements = (index,param) => {
        let newArray = this.props.rooms;
        switch (param) {
            case "adults":
                if(newArray[index].adults>1)
                    newArray[index].adults -= 1 ;
                break;
            case "teens":
                if(newArray[index].teens>0)
                    newArray[index].teens -= 1 ;
                break;
            case "kids":
                if(newArray[index].kids>0)
                    newArray[index].kids -= 1 ;
                break;
            case "infants":
                if(newArray[index].infants>0)
                    newArray[index].infants -= 1 ;
                break;
            default:
                break;
        }
        this.setState({
            rooms:newArray
        })
    }

    validateMaxQntty = (index) => {
        let data = this.props.rooms[index];
        var check = data.adults + data.infants + data.kids + data.teens

        return check==6?0:1
    }


    render() {

        const rooms = this.props.rooms.map((element,index ) => {
            return <Cell style={{display:this.props.config=="hotelair"&&index>0?"none":""}}>
                    {this.props.config=="hotelair"?"":<article className="roomsadder" >
                        Room {index + 1}
                    </article>}
                    <Grid type="x" className="content" large-up="4" style={{paddingLeft: "20px"}}>
                    
                        <Cell style={{display:"flex",width:"fit-content"}}>
                            <div className="minuscontroller" onClick={this.removeElements.bind(this,index, "adults")}>
                                <span>-</span>
                            </div>
                            <span className="number">{element.adults}</span>
                            <div className="pluscontroller" onClick={this.addElements.bind(this,index, "adults")}>
                                <span>+</span>
                            </div>
                            <span className="adults" >{localStorage.langInt==1?"Adults":"Adultos"}</span> 
                        </Cell>

                        {this.props.resort == "islamujeres" || this.props.resort == "leblanccancun"|| this.props.resort== "leblanccabo" || this.props.resort == "sunpalace"
                        ?""
                        :<><Cell style={{display:"flex",width:"fit-content"}}>
                            <div className="minuscontroller" onClick={this.removeElements.bind(this,index, "teens")}>
                                <span>-</span>
                            </div>
                            <span className="number">{element.teens}</span>
                            <div className="pluscontroller"  onClick={this.addElements.bind(this,index, "teens")}>
                                <span>+</span>
                            </div>
                            <span className="normal">{localStorage.langInt==1?"Teens":"Adolescentes"}</span><span className="subindex">(13-17 years)</span>
                        </Cell >

                        <Cell style={{display:"flex",width:"fit-content"}}>
                            <div className="minuscontroller" onClick={this.removeElements.bind(this,index, "kids")}>
                                <span>-</span>
                            </div>
                            <span className="number">{element.kids}</span>
                            <div className="pluscontroller"   onClick={this.addElements.bind(this,index, "kids")}>
                                <span>+</span>
                            </div>
                            <span className="normal">{localStorage.langInt==1?"Kids":"Niños"}</span><span className="subindex">(4-12 years)</span>
                        </Cell >

                        <Cell style={{display:"flex",width:"fit-content"}}>
                            <div className="minuscontroller" onClick={this.removeElements.bind(this,index, "infants")}>
                                <span>-</span>
                            </div>
                            <span className="number">{element.infants}</span>
                            <div className="pluscontroller" onClick={this.addElements.bind(this,index, "infants")}>
                                <span>+</span>
                            </div>
                            <div style={localStorage.langInt==1?{display:"flex"}:{display:"",margin:"4px 0px 0px 7px"}}>
                                <article className={localStorage.langInt==1?"normal":""}>{localStorage.langInt==1?"Infants":"Infantes"}</article>
                                <article className={localStorage.langInt==1?"subindex":""}>(0-3 years)</article>
                            </div>
                        </Cell></>
                    }
            
                    </Grid>
            </Cell>
        });
        return (

            <article component="roomsandguests">
                <Grid  type="x">
                    <Cell large="2">
                        <div  style={{display:"flex"}}>
                            <span className="roomsadder" >{localStorage.langInt==1?"Rooms":"Habitaciones"}</span>
                            <div className="minuscontroller" onClick={this.removeRooms}>
                                <span>-</span>
                            </div>
                            <span className="number">{this.props.rooms.length}</span>
                            <div className="pluscontroller"  onClick={this.addRooms}>
                                <span>+</span>
                            </div>
                        </div>
                    </Cell>
                    <Cell large="10">
                        <Grid type="y">
                                {rooms}
                        </Grid>
                    </Cell>
                </Grid>
            </article>
        );
    }
}

export default Roomsandguest;
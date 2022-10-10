import React, { Component } from 'react';
import { Iconwedd } from '../../components/wirefragment';

class Sliders extends Component {
    moveToPoint = 0;
    tamanioItem = 0;
    transition = .5;//after=1 Bfr=2

    touchstartX = 0;//posicion x al iniciar el evento
    touchstartY = 0;//posicion Y al iniciar el evento
    touchendX = 0;//posicion x al finalizar el evento
    touchendY = 0;//posicion  Y al finalizar el evento

    temPosNgt = 0//posicion de item en negativo para el swipe


    posOrgNgt = 0//posicion original positivo al iniciar eveneto
    posOrgPstv = 0//posicion original positivo

    limit = 0
    index = 0
    banderMoveTo = 0
    constructor() {
        super()
        this.Item = React.createRef()
        this.refPoint = React.createRef()
        this.refArrow = React.createRef()
        this.moveBefore = this.moveBefore.bind(this);
        this.moveAfter = this.moveAfter.bind(this);

        this.moveTo = this.moveTo.bind(this);

        this.removeDifferntTypeDiv = this.removeDifferntTypeDiv.bind(this);
        this.handleGesure = this.handleGesure.bind(this);
        this.touchend = this.touchend.bind(this);
        this.touchstart = this.touchstart.bind(this);
        this.touchmove = this.touchmove.bind(this);
        this.itemSlide = this.itemSlide.bind(this);

        this.loadSize = this.loadSize.bind(this);
    }

    componentDidMount() {
        this.banderMoveTo = this.props.viewItems > 1 ? 1 : 0
        this.removePointtypespan()
        this.removeDifferntTypeDiv()
        this.Item.current.addEventListener('touchstart', this.touchstart);
        this.Item.current.addEventListener('touchend', this.touchend);
        this.Item.current.addEventListener('touchmove', this.touchmove);
        this.loadSize()
    }

    loadSize() {

        setTimeout(() => {
            try {
                if (this.Item.current) {
                    this.tamanioItem = this.Item.current.children[this.Item.current.children.length - 1].offsetWidth
                    for (let i = 0; i < this.Item.current.children.length; i++) {
                        if (this.Item.current.children[i].classList[1] != null) {
                            this.tamanioItemActive = this.Item.current.children[i].offsetWidth
                            this.heightItemActive = this.Item.current.children[i].offsetHeight
                        }
                    }
                    this.Item.current.style = "display: -webkit-box !important;margin: unset;overflow: hidden;"
                    this.inicial = 1
                    //this.scrolleMovilSlider()
                    this.refArrow.current.style = "top:" + ((this.heightItemActive / 2) - 15) + "px;display:" + (this.props.children.length <= 1 ? "none;" : "view;")
                    if (this.props.transitions != null) {
                        this.transition = this.props.transitions
                    }
                    this.limit = this.Item.current.children.length - 1//variable para mantener el index en el rango de 0 a items.lengh
                    if (innerWidth > 1024) {
                        this.transition = .4;
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }, 500)
    }

    /*******Efectswipe XD*********/
    touchstart(event) {
        this.loadSize()
        this.touchstartX = event.changedTouches[0].screenX;
        this.touchstartY = event.changedTouches[0].screenY;

        //se obtiene la posicion original para mover los elemento con el touch move sin perder la posicion original
        for (let i = 0; i < this.Item.current.children.length; i++) {
            this.posOrgNgt = parseInt(this.Item.current.children[i].style.left)//se obtine la posicion original           
        }
    }
    touchmove(event) {
        //document.scrollingElement.scrollTop=this.scrollMovile
        if (this.props.children.length <= 1) {
            return false
        }
        let resultMovPx = parseInt(event.changedTouches[0].screenX - this.touchstartX)

        for (let i = 0; i < this.Item.current.children.length; i++) {
            this.Item.current.children[i].style = "left:" + (this.posOrgNgt + resultMovPx) + "px;transition:0s;"
        }
    }
    touchend(event) {
        if (this.props.children.length <= 1) {
            return false
        }
        this.touchendX = event.changedTouches[0].screenX;
        this.touchendY = event.changedTouches[0].screenY;
        let resultMove = this.touchendX - this.touchstartX
        let rsultPositive = resultMove < 0 ? -(resultMove) : resultMove
        this.temPosNgt = resultMove
        //determina el movimiento el area que tomarar para que se marque como un movimiento
        let isMovement = rsultPositive > 25//this.tamanioItem - (this.tamanioItem / 1.2)
        this.handleGesure(isMovement);
        this.temPosNgt = 0

        this.posOrgPstv = 0
        this.posOrgNgt = 0
    }

    handleGesure(isMovement) {
        if (this.touchendX < this.touchstartX) {
            if (isMovement == true) {
                this.moveAfter()
            } else {
                /***********Los regresa asu posicion normal enc aso de que no acomplete el porcentaje esperado***************/
                for (let i = 0; i < this.Item.current.children.length; i++) {
                    this.Item.current.children[i].style = "left:0px;transition:" + this.transition + "s;"
                }
            }
        }
        if (this.touchendX > this.touchstartX) {
            if (isMovement == true) {
                this.moveBefore()
            } else {
                for (let i = 0; i < this.Item.current.children.length; i++) {
                    this.Item.current.children[i].style = "left:0px;transition:" + this.transition + "s;"
                }
            }
        }
    }
    removeDifferntTypeDiv() {
        let parent = this.Item.current
        for (let r = 0; r < parent.childNodes.length; r++) {
            let namechild = parent.childNodes[r].getAttribute("type")
            if (namechild != "div") {
                if (namechild != "section") {
                    parent.removeChild(parent.childNodes[r])
                    this.removeDifferntTypeDiv()
                }
            }
        }
    }

    removePointtypespan() {
        let parent = this.refPoint.current
        for (let r = 0; r < parent.childNodes.length; r++) {
            let namechild = parent.childNodes[r].getAttribute("type")
            if (namechild != "div") {
                if (namechild != "section") {
                    parent.removeChild(parent.childNodes[r])
                    this.removePointtypespan()
                }
            }
        }
    }

    moveAfter(transition) {
        this.index = this.index + 1
        if (this.index > this.limit) {
            this.index = 0
        }
        this.loadSize()
        this.itemSlide(this.index, 1, transition)
        //console.log("before")
    }
    moveBefore(transition) {
        this.index = this.index - 1
        if (this.index < 0) {
            this.index = this.limit
        }
        //after ultimo al primero
        this.loadSize()
        this.itemSlide(this.index, 0, transition)
        //console.log("after")
    }
    itemSlide(index, orientation, transition) {
        let Items = this.Item.current.childNodes
        //0 after ultimo al primero
        //1 before primero al ultimo
        let efecttransition = transition == 1 || transition == null ? this.transition : transition
        if (orientation == 0) {
            //console.log("0 after")
            let firstChild = this.Item.current.firstChild
            let lastChild = this.Item.current.lastChild
            this.Item.current.insertBefore(lastChild, firstChild)
            let posswipe = this.temPosNgt - this.tamanioItem
            for (let s = 0; s < Items.length; s++) {
                Items[s].style = "left:" + (posswipe) + "px;"//this.tamanioItem
            }
            setTimeout(() => {
                Items[1].classList.add("active")
                for (let s = 0; s < Items.length; s++) {
                    Items[s].style = "left:00px;transition:" + efecttransition + "s;"
                    if (s != 1) {
                        Items[s].classList.remove("active")
                    }
                }
            }, transition == null ? (efecttransition * 1000) / 7 : efecttransition)
        } else {
            let sizeMove = this.Item.current.querySelector(".ItemSlider").offsetWidth
            //console.log("1 after",sizeMove)
            Items[2] != null ? Items[2].classList.add("active") : Items[0].classList.add("active")
            for (let s = 0; s < Items.length; s++) {
                //modificar
                Items[s].style = "left:-" + sizeMove + "px;transition:" + efecttransition + "s;"
                if (s != 2) {
                    Items[s].classList.remove("active")
                }
            }
            setTimeout(() => {
                this.Item.current.appendChild(Items[0])
                for (let s = 0; s < Items.length; s++) {
                    Items[s].style = "left:0px;"//innerWidth > 1024?"left:0px;":"left:10px;"
                }
            }, efecttransition * 1000)
        }

        let points = this.refPoint.current.children
        for (let i = 0; i < points.length; i++) {
            points[i].classList.remove("activePoint")
        }
        points[index].classList.add("activePoint")
    }

    moveTo(index) {
        let transInterval = .15
        let flag = 0
        let nodPoint = this.refPoint.current.childNodes
        let indexRef = 0

        nodPoint.forEach(element => {
            flag++
            if (element.getAttribute("class") != "") {
                indexRef = flag
            }
        });

        if (indexRef <= index) {
            let interval = setInterval(() => {
                if (indexRef >= index) {
                    clearInterval(interval)
                }
                this.moveAfter(0)
                indexRef++
            }, 100);
        }
        else {
            index++
            let interval = setInterval(() => {
                indexRef--
                if (indexRef <= index) {
                    clearInterval(interval)
                }
                this.moveBefore(0)
            }, 100);
        }
    }

    render() {
        const Items = this.props.children.map((element, index) => {
            let vistaIn = 1
            let type = this.props.children[index].type
            return (
                <div className={index == (vistaIn) ? "ItemSlider active" : index >= (this.props.viewItems) ? "ItemSlider" : "ItemSlider"} type={type} id={this.props.nameSlide + "-" + index} key={index}>{element}</div>
            )
        });
        let activenospan = 0;
        const pointControl = this.props.children.map((element, index) => {
            let pointActive = 1
            if (this.props.viewItems == 1) {
                pointActive = 0
            }
            let type = this.props.children[index].type
            if (type != "div") {
                if (type != "section") {
                    activenospan = activenospan + 1
                }
            }

            if (this.props.children.length <= 1) {
                return (<div key={index}></div>)
            } else {
                return (<div type={type} className={(activenospan == index ? "activePoint" : "")} onClick={this.moveTo.bind(this, index)} id={"P" + this.props.nameSlide + "-" + index} key={index}></div>)
            }
        });
        return (
            <div className={"slider container slider-" + this.props.nameSlide} ref={this.props.refSlide}>
                <div className="controlArrow desktop" ref={this.refArrow} >
                    <div className="moveBefore" id={"moveBefore" + this.props.nameSlide} title={"Bfr"} onClick={this.moveBefore.bind(this, 1)}>
                        <Iconwedd icon={"chevron-carousel-left"} color={"pink"} />
                    </div>
                    <div className="moveAfter" id={"moveAfter" + this.props.nameSlide} title={"Aft"} onClick={this.moveAfter.bind(this, 1)}>
                        <Iconwedd icon={"chevron-carousel-right"} color={"pink"} />
                    </div>
                </div>
                <div className="contentSlider" id={this.props.nameSlide} ref={this.Item}>{Items}</div>
                <div className="extra">{this.props.extra != null ? this.props.extra : ""}</div>
                <div className="separadorGaleryPoints"></div>
                <div className={"controlPoints " + " " + this.props.nameSlide} ref={this.refPoint} style={{ display: this.props.children.length > 1 ? "" : "none" }}>
                    {pointControl}
                </div>
            </div>
        )
    }
}
export default Sliders;
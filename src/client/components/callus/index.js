import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactHtmlParser from 'react-html-parser';
class CallUs extends Component {
  state = {}

  constructor() {
    super();
    this.tooltip = React.createRef();
    //this.opentool = this.opentool.bind(this);
    this.closetool = this.closetool.bind(this);
    this.setFocus = this.setFocus.bind(this);
  }
  componentDidMount() {
    let button = this.tooltip.current.querySelectorAll("button")[0]
    var newSpan = document.createElement("span");
    newSpan.id = "span";

    var respuesta = button
    if (this.props.phons != null) {
      newSpan.setAttribute("callus", "true");
      button.setAttribute("callus", "true");
      button.addEventListener('mouseover', this.setFocus);
      button.addEventListener('mouseout', this.closetool);

      respuesta.appendChild(newSpan);
      let arrayContact = []
      arrayContact.push(<b key={"tooltep"} className="arrow-up"></b>);
      let a = 0
      this.props.phons.forEach(element => {
        arrayContact.push(<b key={a}>{element.paisestado}<a callus="true" href={"tel:+" + element.numero}>{element.numero}</a></b>);
        a = a + 1
      });
      ReactDOM.render(arrayContact, newSpan)
    }
  }
  setFocus(e) {
    if (this.tooltip.current != null) {
      let button = this.tooltip.current.querySelector("button")
      button.classList.add("open")
    }
  }
  closetool() {
    if (this.tooltip.current != null) {
      let button = this.tooltip.current.querySelector("button")
      button.classList.remove("open")
    }
  }

  render() {
    setTimeout(()=>{
      let fontSize=parseInt(window.getComputedStyle(document.body).fontSize.substring(-2, 2))
      let pointArrow=(this.tooltip.current.querySelector("button").getBoundingClientRect().x)/2
      this.tooltip.current.querySelector(".arrow-up").style.left=pointArrow+"px"
    },50)
    //es par que funcion en Iphon
    document.querySelector("body").addEventListener("touchstart", ((e) => {
      //console.log(e.target)
      if (e.target.getAttribute("callus") == null) {
        this.closetool()
      } else {
        this.setFocus()
      }
    }))
    return (
      <>
        <section component="callus" ref={this.tooltip}>
          <article>
            <p className="more-info description txt-light">{this.props.head}</p>
          </article>
          <article>
            <p className="more-info call description" style={{position:"relative"}}>
              {ReactHtmlParser(this.props.textTooltip != null ? this.props.textTooltip : "")}
            </p>
          </article>
        </section>
      </>
    )
  }
};

export default CallUs;
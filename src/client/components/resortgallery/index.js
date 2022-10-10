import React, {Component} from 'react';
import { Iconwedd,Input} from '../../components/wirefragment';
import { Cell } from '../grid';
import { Grid,Otherguest,Sliders } from '../../components';

class ResortGallery extends Component{
	state={}

  constructor(props){
    super();
  	this.state = {
  		resortgallery: props.overview
  	}
  }

  printerest(){
    const script = document.createElement("script");
    script.src = "//assets.pinterest.com/js/pinit.js";
    script.async = true;
    document.body.appendChild(script)
  }
  SliderMamalon(){
    const content = this.state.resortgallery.gallery.map((item,index) => {
      return(
        <section className={"imgGallerySection"}  key={index}>
          {item.galleryItem.map((item,index) => {
            return(
              <div className={"imgGalleryCont imgGalleryCont"+ item.orden } key={index}>
                <img className={"imgGallery"} alt={"sample"} src={item.imageMov}/>
              </div>
            )})
          }
        </section>
      )})
    return content
  }

  SliderMamalonDesk(){
    const content = this.state.resortgallery.gallery.map((item,index) => {
      return(
        <section className={"imgGallerySection"}  key={index}>
          {item.galleryItem.map((item,index) => {
            return(
              <div className={"imgGalleryCont imgGalleryCont"+ item.orden } key={index}>
                <img className={"imgGallery"} alt={"sample"} src={item.imageDesk}/>
              </div>
            )})
          }
        </section>
      )})
    return content
  }  

  componentDidMount() {
    this.printerest();
  }

  render(){ return(
    <section page="resortgallery" style={{display:this.props.display}}>
      <article className="movil">
        <center>
          <p className="description">{this.state.resortgallery.description}</p>
        </center>
        {/*
          <div className={"grisBack"}></div>
          <Sliders nameSlide={"gallery"} viewItems={3}>
            {this.SliderMamalon()}
          </Sliders>
          <h1 className="subtitulo">One of many love stories in this amazing resort</h1>
        </center>*/}
        <Otherguest data={{otherguest:this.state.resortgallery.sliderstories}} withModal/>
      </article>
      <article className="desktop">
        <center>
          <p className="description">{this.state.resortgallery.description}</p>
        </center>
        {/*<center>
          <p className="description">{this.state.resortgallery.description}</p>
          <div className={"grisBack"}></div>
          <Sliders nameSlide={"gallery"} viewItems={3}>
            {this.SliderMamalonDesk()}
          </Sliders>
          <h1 className="subtitulo">One of many love stories in this amazing resort</h1>
        </center>*/}
        <div className="otherguestSlider">
          <Otherguest data={{otherguest:this.state.resortgallery.sliderstories}} withModal/>
        </div>
        <center className="PINTEREST">
          <a data-pin-do="embedUser" data-pin-board-width="900" data-pin-scale-height="320" data-pin-scale-width="115" href="https://www.pinterest.com/prweddings"></a>
        </center>
      </article>
    </section>
  )}
};

export default ResortGallery;
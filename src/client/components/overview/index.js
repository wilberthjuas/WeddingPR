import React, { Component } from 'react';
import { Iconwedd, Input } from '../../components/wirefragment';
import { Cell } from '../grid';
import { Grid, Otherguest } from '../../components';
import ReacHtmlParser from 'react-html-parser';
import {withRouter} from 'react-router-dom';
import WithContext from '../../app/Context';
class Overview extends Component {
  state = {}

  constructor(props) {
    super();
    this.state = {
      overview: props.overview,
      virtualTourOn: false
    }
    this.activateVirtualTour = this.activateVirtualTour.bind(this);
  }

  activateVirtualTour() {
    this.setState({
      virtualTourOn: true
    })
  }

  render() {
    const { match: { params } } = this.props;

    return (
      <section page="overview" style={{ display: this.props.display }}>
        <article className="movil">
          <p className="description">{this.state.overview.description}</p>
          <Grid type="x" style={{ marginTop: "2rem", marginBottom: "2rem" }}>
            
            {
              this.state.overview.highlightContent[0].title != "" ?
            <Cell large="6" small="6" className="grid">
              <div>
                <img className={"imgL"} alt={"sample"} src={this.state.overview.highlightContent[0].imageMov} />
              </div>
              <div className="overviewL">
                <h2 className="subtitle">{this.state.overview.highlightContent[0].title}</h2>
                <p className="description">{this.state.overview.highlightContent[0].content}</p>
              </div>
            </Cell> : null }

            {
              this.state.overview.highlightContent[1].title != "" ?
                       
            <Cell large={this.state.overview.highlightContent[0].title != "" ? "6" : "12"} small={this.state.overview.highlightContent[0].title != "" ? "6" : "12"} className="grid">
              <div className="overviewR">
                <h2 className="subtitle">{this.state.overview.highlightContent[1].title}</h2>
                <p className="description">{this.state.overview.highlightContent[1].content}</p>
              </div>
              <div>
                <img className={"imgR"} alt={"sample"} src={this.state.overview.highlightContent[1].imageMov} />
              </div>
            </Cell> : null }
          
          
          </Grid>
          <div className="sliderTitle">
           <h2 className="title">{ReacHtmlParser(params.lang=="es"?"Servicios en la <span>Habitación</span>":"Room <span> Amenities</span>")}</h2>
          </div>
          <center>
            <div className="amenitiCont">
              {this.state.overview.RoomAmenities.map((ameniti, index) => {
                return (
                  <section key={index}>
                    <div className="amenitiItem">
                      <Iconwedd icon={ameniti.icon} color={"pink"} />
                      <p className="paragraph">{ameniti.name}</p>
                    </div>
                  </section>
                )
              })}
            </div>
          </center>
          <div className="sliderTitle">
          <h2 className="title">{ReacHtmlParser(params.lang=="es"?"Nuestras <span> Habitaciones</span>":"Our <span> Accommodations</span>")}</h2>
          </div>
          <p className="description">{this.state.overview.roomText}</p>
          {this.state.overview.virtualTour!=null?this.state.virtualTourOn
          ?
            <div>
              <iframe src={this.state.overview.virtualTour.urlVirtualTour} className="frametour" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen=""></iframe>
            </div>
            :
            <div className="roomGallery" onClick={this.activateVirtualTour}>
              <div className="grayBackground">
                <p className="virtualTour">{localStorage.langWeddings=="es"?"Tour":"Virtual"} <Iconwedd icon={"virtual-tour"} color={"white"} /> {localStorage.langWeddings=="es"?"virtual":"Tour"}</p>
              </div>
              <img src={this.state.overview.virtualTour.imageMov} className="img-other-guest" />
              <h2 className="imgcaptions galleryText">{this.state.overview.virtualTour.title}</h2>
            </div>
            :
            ""
          }
          <div id="otherguestRooms">
            <Otherguest data={{otherguest:this.state.overview.rooms}} />
          </div>
          <div className="sliderTitle">
          <h2 className="title">{ReacHtmlParser(params.lang=="es"?"Cenas de clase <span>Mundial</span>":"World-class <span>Dining</span>")}</h2>
          </div>
          <div id="otherguestRestaurant">
            <Otherguest data={{otherguest:this.state.overview.worldclassdinning.sliderRestaurant}} />
          </div>
          <Grid type="x">
            <Cell large="6" small="6">
              {this.state.overview.worldclassdinning.restaurants.map((restaurant, index) => {
                return (
                  <div key={index}>
                    {restaurant.orden <= Math.round(this.state.overview.worldclassdinning.restaurants.length / 2) ?
                      <article className="listCont">

                        <ul>
                          <li><p className="paragraph bold">{restaurant.title}</p></li>
                          {restaurant.items.map((item, index) => {
                            return (
                              <li className="description" key={index}>{item}</li>
                            )
                          })
                          }
                        </ul>
                      </article> : ""
                    }
                  </div>
                )
              })
              }
            </Cell>
            <Cell large="6" small="6">
              {this.state.overview.worldclassdinning.restaurants.map((restaurant, index) => {
                return (
                  <div key={index}>
                    {restaurant.orden > Math.round(this.state.overview.worldclassdinning.restaurants.length / 2) ?
                      <article className="listCont">
                        <ul>
                          <li><p className="paragraph bold">{restaurant.title}</p></li>
                          {restaurant.items.map((item, index) => {
                            return (
                              <li className="description" key={index}>{item}</li>
                            )
                          })
                          }
                        </ul>
                      </article> : ""
                    }
                  </div>
                )
              })
              }
            </Cell>
          </Grid>
          <div className="learnMoreCont">
          <p className="paragraph">{params.lang=="es"?"Quieres saber más de este Resort?":"Want to learn more about this resort?"}&nbsp;
            <a type={"href"} className="linkalt" href={this.state.overview.siteUrl} target={"_blank"}>{params.lang=="es"?"VISITA EL SITIO":"VISIT SITE"}</a>
            </p>
          </div>
        </article>
        <article className="desktop">
          <div className="grayFade"></div>
          <center>
            <p className="description">{this.state.overview.description}</p>
          </center>
          
          
          <Grid type="x">

          {
                this.state.overview.highlightContent[0].title != "" ? 

            <Cell large="6" small="6" className="contetn-galery">
              <section className="overviewL">
                <h2 className="subtitle overviewTitle">{this.state.overview.highlightContent[0].title}</h2>
                <p className="overviewSubitle description">{this.state.overview.highlightContent[0].content}</p>
              </section>
              <img className={"imgL"} alt={"sample"} src={this.state.overview.highlightContent[0].imageDesk} />
            </Cell>

            : null }

              {
                this.state.overview.highlightContent[1].title != "" ? 

              

            <Cell large="6" small="6" className="contetn-galery">
              <section className="overviewR">
                <h2 className="subtitle overviewTitle">{this.state.overview.highlightContent[1].title}</h2>
                <p className="overviewSubitle description">{this.state.overview.highlightContent[1].content}</p>
              </section>
              <img className={"imgR"} alt={"sample"} src={this.state.overview.highlightContent[1].imageDesk} />
            </Cell>
             : null }


          </Grid>


          <center>
            <div className="amenitiCont">
              <div className="amenitiTittle">
                <h2 className="title">{ReacHtmlParser(params.lang=="es"?"Servicios <span>en la</span> <span> Habitación</span>":"Room <span> Amenities</span>")}</h2>
              </div>
              {this.state.overview.RoomAmenities.map((ameniti, index) => {
                return (
                  <div className="amenitiItem" key={index}>
                    <Iconwedd icon={ameniti.icon} color={"pink"} />
                    <p className="amenitiText">{ameniti.name}</p>
                  </div>
                )
              })}
            </div>
          </center>
          <div className="sliderTitle">
            <h2 className="title">{ReacHtmlParser(params.lang=="es"?"Nuestras <span> Habitaciones</span>":"Our <span> Accommodations</span>")}</h2>
          </div>
          <center>
            <p className="description">{this.state.overview.roomText}</p>
          </center>
          {this.state.overview.virtualTour!=null?this.state.virtualTourOn ?
            <center>
              <div>
                <iframe src={this.state.overview.virtualTour.urlVirtualTour} className="frametour" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen=""></iframe>
              </div>
            </center> :
            <center className="roomGallery" onClick={this.activateVirtualTour}>
              <div className="grayBackground">
                <p className="virtualTour">Virtual <Iconwedd icon={"virtual-tour"} color={"white"} /> Tour</p>
              </div>
              <img src={this.state.overview.virtualTour.imageDesk} className="img-other-guest" />
              <div className="galleryText">{this.state.overview.virtualTour.title}</div>
            </center>
            :
            ""
          }
          <Otherguest data={{otherguest:this.state.overview.rooms}} />
          <div className="sliderTitle">
            <h2 className="title">{ReacHtmlParser(params.lang=="es"?"Cocina de clase <span>Mundial</span>":"World-class <span>Dining</span>")}</h2>
          </div>
          <Otherguest data={{otherguest:this.state.overview.worldclassdinning.sliderRestaurant}} />
          <center>
            <Grid type="x">
              <Cell large="4" small="4">
                <div className="listContExtra">
                  {this.state.overview.worldclassdinning.restaurants.map((restaurant, index) => {
                    return (
                      <div key={index}>
                        {restaurant.orden <= Math.round(this.state.overview.worldclassdinning.restaurants.length / 3) ?
                          <article key={index}>
                            <p className="description listTitle">{restaurant.title}</p>
                            <div className="listCont">
                              {restaurant.items.map((item, index) => {
                                return (
                                  <p className="description restaurantList" key={index}>- {item}</p>
                                )
                              })
                              }
                            </div>
                          </article> : ""
                        }
                      </div>
                    )
                  })
                  }
                </div>
              </Cell>
              <Cell large="4" small="4">
                {this.state.overview.worldclassdinning.restaurants.map((restaurant, index) => {
                  return (
                    <div key={index}>
                      {restaurant.orden > Math.round(this.state.overview.worldclassdinning.restaurants.length / 3) && restaurant.orden <= (Math.round(this.state.overview.worldclassdinning.restaurants.length / 3) + Math.round(this.state.overview.worldclassdinning.restaurants.length / 3)) ?
                        <article className="listCont">
                          <p className="description listTitle">{restaurant.title}</p>
                          <div className="listCont">
                            {restaurant.items.map((item, index) => {
                              return (
                                <p className="description restaurantList" key={index}>- {item}</p>
                              )
                            })
                            }
                          </div>
                        </article> : ""
                      }
                    </div>
                  )
                })
                }
              </Cell>
              <Cell large="4" small="4">
                {this.state.overview.worldclassdinning.restaurants.map((restaurant, index) => {
                  return (
                    <div key={index}>
                      {restaurant.orden > (Math.round(this.state.overview.worldclassdinning.restaurants.length / 3) + Math.round(this.state.overview.worldclassdinning.restaurants.length / 3)) && restaurant.orden <= this.state.overview.worldclassdinning.restaurants.length ?
                        <article className="listCont">
                          <p className="description listTitle">{restaurant.title}</p>
                          <div className="listCont">
                            {restaurant.items.map((item, index) => {
                              return (
                                <p className="description restaurantList" key={index}>- {item}</p>
                              )
                            })
                            }
                          </div>
                        </article> : ""
                      }
                    </div>
                  )
                })
                }
              </Cell>
            </Grid>
          </center>
          <center className="learnMoreCont">
            <p className="paragraph">{params.lang=="es"?"Quieres saber más de este Resort?":"Want to learn more about this resort?"}&nbsp;
            <a type={"href"} className="linkalt" href={this.state.overview.siteUrl} target={"_blank"}>{params.lang=="es"?"VISITA EL SITIO":"VISIT SITE"}</a>
            </p>
          </center>
        </article>
      </section>
    )
  }
};

export default withRouter(WithContext(Overview));
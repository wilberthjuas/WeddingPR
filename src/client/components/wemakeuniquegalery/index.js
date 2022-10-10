import React from 'react';

import { Cell } from '../grid';
import { Grid } from '../../components';
import { Input } from '../../components/wirefragment';

const wemakeuniquegalery = (props) => {
    const parents = props.galery.map((element,index) => {
        return (
            <section className="Grid-Row" key={index}>
                <section className="wemakeuniq-itmes-content">
     
                            <article className="img-wemake"> 
                                    <img alt={element.title} src={element.imageDesk} className="desktop"/>
                                    <img alt={element.title} src={element.imageMov} className="movil"/>
                            </article>
                            <article>
                                {element.title!=null?<h2 className="imgcaptions bg-caption">{element.title}</h2>:<span></span>}
                                    <div className="info-item">
                                        <div className="desctiption"> 
                                            <p className="paragraph">{element.description}</p>
                                        </div>
                                            <div className="inputgallery">
                                                {element.ishref?
                                                    <Input type={"href"} value={element.buttonTxt} to={element.urlBtn} color={"pink galery-wemakeunique"}/>:
                                                    <Input to={element.urlBtn} type={"button"} value={element.buttonTxt} color={"pink galery-wemakeunique"} />
                                                }
                                            </div>
                                        </div>
                            </article>

                    
                </section>
                <div className="separadorwemake"></div>
            </section>
        )
        }
        
    );
    return <>
    {parents}
    {(props.galery.length%2)?<div className="Grid-Row take-the-next desktop" ><div className="wemakeuniq-itmes-content"><img src="https://e-commercepr.s3.amazonaws.com/assets/images/offers/Main+Offers+Desktop/take-the-next-step.jpg"></img></div></div>:null}  
         </>
}
export default wemakeuniquegalery;
import React from "react";
import CheckboxButton from "../checkbox";
import { Titlesection } from "../../wirefragment";
import ReactHtmlParser from 'react-html-parser';

const GalleryChecks = (props) => {
    
    let _id = "";
    
    return (
        <section ref={props.onRef} className={props.quitFirtsClass?"":"waterfall"}>
            { props.item_list.map((item, key) => {
                const rawName = item.label.split(" ", 1);
                //ttulos quantum en mayus
                let name = rawName[0].toLowerCase().charAt(0).toUpperCase() + rawName[0].toLowerCase().slice(1);
                name = name.replace("dj","DJ").replace("Dj","DJ").replace("Mc","MC").replace("mc","MC").replace("Hdmi","HDMI").replace("hdmi","HDMI").replace("xv","XV").replace("Xv","XV")
                _id = `gallery_${key}_${item.id}`;
                const rawSubtitle = item.label.substring(item.label.split(" ", 1)[0].length + 1);
                let subtitle = (rawSubtitle.toLowerCase()).charAt(0).toUpperCase() + rawSubtitle.toLowerCase().slice(1);
                subtitle = subtitle.replace("dj","DJ").replace("Dj","DJ").replace("Mc","MC").replace("mc","MC").replace("Hdmi","HDMI").replace("hdmi","HDMI").replace("xv","XV").replace("Xv","XV")
                
                
                
                _id = `gallery_${key}_${item.id}`;
                    return (
                        <div key={_id} component={"media-object stack-for-small "} className={"block"} >
                            <CheckboxButton
                                id={_id}
                                value={item.value}
                                is_checked={props.values_checked.includes(item.value)}
                                image_src={item.image_src}
                                is_square={true}
                                has_image={true}
                                container_width={"100%"}
                                container_height={"100%"}
                                alt_to_display={name+" "+subtitle}
                                _onClick={(value, id) => {
                                    props.galleryClick(value, id, item);
                                }}
                                styleForm={props.styleForm}
                                card={props.card}
                            >
                            <div component={"media-object-section"} style={{cursor:"pointer"}} className="media-object-section" 
                            onClick={ () => { props.onClick(item) } }>
                                {
                                    props.unidad_negocio == 12 ?
                                        <h2 className="title">{ReactHtmlParser(item.codigo_produccion)}</h2>
                                    :
                                        <h2 className="title">{ReactHtmlParser(name+" "+subtitle+"")}</h2>
                                }
                            </div>
                            </CheckboxButton>
                        </div>
                    );
                })
            }
        </section>
    );
    
}

GalleryChecks.defaultProps = {
    values_checked: [],
    item_list: [],

    // * Optionals
    galleryClick: (value, id, item) => {},
    onClick: (value) => {},
    onRef: () => {},
    icon_check: "",
    icon_uncheck: "",
    styleForm: "heart", // [ filledcircle | circle | square | heart ]
    card: false
};

export default GalleryChecks;
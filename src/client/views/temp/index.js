import React, { Component } from "react";
import GalleryChecks from "../../components/clever/gallery/index";
import { BrowserRouter as Router,Link } from "react-router-dom";
import Curtains from "../curtains";

export default class TemmView extends Component {
    constructor() {
        super();
        this.state = {
            values_checked: ["val1","val2","val3"],
            gallery_data: [
                {
                    id: "val1",
                    value: "val1",
                    label: "TO",
                    image_src:
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR4l62VLedwKM27QEwAhkMZr_G_JBf2CJ2jUmSxaBoSg3M1F8Ag",
                },
                {
                    id: "val2",
                    value: "val2",
                    label: "TODO: this is an example text val2 to display on card section",
                    image_src:
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSNnFqEA_itH-IKF8k6FMk6Ph3_I2Ft0Y8l-DJMGrrGIdx-3Ad0",
                },
                {
                    id: "val3",
                    value: "val3",
                    label: "TODO: this is an example text val3 to display on card section",
                    image_src:
                        "https://http2.mlstatic.com/hola-angel-floral-papercrafiar-un-jardin-de-flores-de-tarj-D_NQ_NP_898232-MLM31300129797_072019-O.jpg",
                },
                {
                    id: "val4",
                    value: "val4",
                    label: "TODO: this is an example text val4 to display on card section",
                    image_src:
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRF-DwTxSeysRVuAmG8nuJlwks0X7A0mZ1LC52WXZw8l14-bWDS",
                },
                {
                    id: "val5",
                    value: "val5",
                    label: "TODO: this is an example text val5 to display on card section",
                    image_src:
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSHUoQN6ynoOagNuLxffmSCUEogohkShSypbmTqvu7NXJyxphzn",
                },
                {
                    id: "val6",
                    value: "val6",
                    label: "TODO: this is an example text val6 to display on card section",
                    image_src:
                        "https://static.vecteezy.com/system/resources/previews/000/687/574/non_2x/hello-spring-card-with-beautiful-flowers-decoration-vector.jpg",
                },
                {
                    id: "val7",
                    value: "val7",
                    label: "TODO: this is an example text val7 to display on card section",
                    image_src:
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR4l62VLedwKM27QEwAhkMZr_G_JBf2CJ2jUmSxaBoSg3M1F8Ag",
                },
                {
                    id: "val8",
                    value: "val8",
                    label: "TODO: this is an example text val8 to display on card section",
                    image_src:
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSNnFqEA_itH-IKF8k6FMk6Ph3_I2Ft0Y8l-DJMGrrGIdx-3Ad0",
                },
                {
                    id: "val9",
                    value: "val9",
                    label: "TODO: this is an example text val9 to display on card section",
                    image_src:
                        "https://http2.mlstatic.com/hola-angel-floral-papercrafiar-un-jardin-de-flores-de-tarj-D_NQ_NP_898232-MLM31300129797_072019-O.jpg",
                },
                {
                    id: "val13",
                    value: "val13",
                    label: "TODO: this is an example text val10 to display on card section",
                    image_src:
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRF-DwTxSeysRVuAmG8nuJlwks0X7A0mZ1LC52WXZw8l14-bWDS",
                },
                /*
                {
                    id: "val11",
                    value: "val11",
                    label:"TODO: this is an example text val11 to display on card section",
                },
                {
                    id: "val12",
                    value: "val12",
                    label:"TODO: this is an example text val12 to display on card section",
                },
                {
                    id: "val13",
                    value: "val13",
                    label:"TODO: this is an example text val13 to display on card section",
                },
                {
                    id: "val14",
                    value: "val14",
                    label:"TODO: this is an example text val14 to display on card section",
                },
                {
                    id: "val15",
                    value: "val15",
                    label:"TODO: this is an example text val15 to display on card section",
                },
                {
                    id: "val16",
                    value: "val16",
                    label:"TODO: this is an example text val16 to display on card section",
                },
                {
                    id: "val17",
                    value: "val17",
                    label:"TODO: this is an example text val17 to display on card section",
                }, */
            ],
        };

        // this.handleChange = this.handleChange.bind(this);
    }

    /* handleChange(Data) {
        //console.log(Data);
    } */

    render() {
        return (
                <Curtains></Curtains>
        );
    }
}

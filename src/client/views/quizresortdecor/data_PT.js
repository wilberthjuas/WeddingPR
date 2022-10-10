const data = {

    heading: {
        title: "Custom recommendations for your special occasion",
        titlePage:"Personalize <span>your wedding</span>",
        subtitlePage:"(Select as many as you’d like)",
        back:"Back",
        select:"Select Décor",
        selected:"Selected",
        accept:"Keep Choosing",
        noData:"No hay opciones disponibles para su selección"
    },
    steps: {
        one: {
            title: "RESORTS"
        },
        two: {
            title: "DÉCOR"                                
        },
        three: {
            title: "EXTRAS"
        },
        four: {
            title: "ABOUT YOU"
        }
    },
    theming: [
        { 
            name: "Romantic", preffix: "Red",
            title: "",
            title2: "",
            type: "1",
            link: "https://www.google.com",
            slide: [
                {
                    imageDesk: "https://e-commercepr.s3.amazonaws.com/Produccion/theming/romantic-gallery-2-min.jpg",
                    imageMov: "https://e-commercepr.s3.amazonaws.com/Produccion/theming/romantic-gallery-2-min.jpg"
                },
                {
                    imageDesk: "https://e-commercepr.s3.amazonaws.com/Produccion/theming/romantic-gallery-ceremony-setup-min.jpg",
                    imageMov: "https://e-commercepr.s3.amazonaws.com/Produccion/theming/romantic-gallery-ceremony-setup-min.jpg"
                },
                {
                    imageDesk: "https://e-commercepr.s3.amazonaws.com/Produccion/theming/romantic-gallery-1-min.jpg",
                    imageMov: "https://e-commercepr.s3.amazonaws.com/Produccion/theming/romantic-gallery-1-min.jpg",
                },
            ]
        },
        { 
            name: "Lavender", preffix: "Luxe",
            title: "",
            title2: "",
            type: "1",
            slide: [
                {
                    imageDesk: "https://e-commercepr.s3.amazonaws.com/Produccion/theming/lavender-gallery-1-min.jpg",
                    imageMov: "https://e-commercepr.s3.amazonaws.com/Produccion/theming/lavender-gallery-1-min.jpg",
                },
                {
                    imageDesk: "https://e-commercepr.s3.amazonaws.com/Produccion/theming/lavender-ceremony-setup-min.jpg",
                    imageMov: "https://e-commercepr.s3.amazonaws.com/Produccion/theming/lavender-ceremony-setup-min.jpg"
                },
                {
                    imageDesk: "https://e-commercepr.s3.amazonaws.com/Produccion/theming/lavender-gallery-3-min.jpg",
                    imageMov: "https://e-commercepr.s3.amazonaws.com/Produccion/theming/lavender-gallery-3-min.jpg",                   
                },
            ]
        },
        { 
            name: "Exotic", preffix: "Peacock",
            title: "",
            title2: "",
            type: "1",
            slide: [
                {
                    imageDesk: "https://e-commercepr.s3.amazonaws.com/Produccion/theming/exotic-gallery-2-min.jpg",
                    imageMov: "https://e-commercepr.s3.amazonaws.com/Produccion/theming/exotic-gallery-2-min.jpg",
                },
                {
                    imageDesk: "https://e-commercepr.s3.amazonaws.com/Produccion/theming/exotic-gallery-1-min.jpg",
                    imageMov: "https://e-commercepr.s3.amazonaws.com/Produccion/theming/exotic-gallery-1-min.jpg"
                },
                {
                    imageDesk: "https://e-commercepr.s3.amazonaws.com/Produccion/theming/exotic-gallery-3-min.jpg",
                    imageMov: "https://e-commercepr.s3.amazonaws.com/Produccion/theming/exotic-gallery-3-min.jpg",                    
                },
            ]
        },
        { 
            name: "I’m", preffix: "Not Sure",
            title: "",
            title2: "",
            type: "1",
            not: true,
            slide: [{}] 
        }
    ]
};

export default data;
const resorts = require("../resort/dataEs.js")
const data = {
    subTitle: "(Elige todos los que quieras)",
    titleOne: "Estos resorts <span>son ideales para ti</span>",
    buttonSelect: "seleccionar",
    buttonSelected: "seleccionado",
    nodta: "No hay opciones disponibles para su selección en",
    maxpeople: "There are no options for the number of guests",
    btnAccept: "Continuar",//"KEEP GOINg",
    heading: {
        title: "Nuestra recomendación para tu gran día"
    },
    notsure: "No se",// "I’m Not Sure",
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
            title: "INFO"
        }
    },
    resorts: [
        {
            name: "cancun",
            city: "Cancún",
            content: [
                {
                    //"Beach Palace",
                    match: "beachpalace",
                    capacity: 100,
                    title: resorts.default.beachpalace.title,
                    subtitle: resorts.default.beachpalace.subtitle,
                    description: resorts.default.beachpalace.description,
                    fullname: resorts.default.beachpalace.fullname,
                    urlBtnBack: resorts.default.beachpalace.urlBtnBack,
                    venues: resorts.default.beachpalace.venues
                },
                {
                    //"Sun Palace",
                    match: "sunpalace",
                    capacity: 30,
                    title: resorts.default.sunpalace.title,
                    subtitle: resorts.default.sunpalace.subtitle,
                    description: resorts.default.sunpalace.description,
                    fullname: resorts.default.sunpalace.fullname,
                    urlBtnBack: resorts.default.sunpalace.urlBtnBack,
                    venues: resorts.default.sunpalace.venues
                },
                {
                    //"Moon Palace Cancún",
                    match: "moonpalacecancun",
                    capacity: 100,
                    title: resorts.default.moonpalacecancun.title,
                    subtitle: resorts.default.moonpalacecancun.subtitle,
                    description: resorts.default.moonpalacecancun.description,
                    fullname: resorts.default.moonpalacecancun.fullname,
                    urlBtnBack: resorts.default.moonpalacecancun.urlBtnBack,
                    venues: resorts.default.moonpalacecancun.venues
                },
                {
                    //"Le Blanc Spa Resort Cancún",
                    match: "leblanccancun",
                    capacity: 100,
                    title: resorts.default.leblanccancun.title,
                    subtitle: resorts.default.leblanccancun.subtitle,
                    description: resorts.default.leblanccancun.description,
                    fullname: resorts.default.leblanccancun.fullname,
                    urlBtnBack: resorts.default.leblanccancun.urlBtnBack,
                    venues: resorts.default.leblanccancun.venues
                },
                {
                    //"Moon Palace The Grand - Cancun",
                    match: "thegrandatmoonpalacecancun",
                    capacity: 100,
                    title: resorts.default.thegrandatmoonpalacecancun.title,
                    subtitle: resorts.default.thegrandatmoonpalacecancun.subtitle,
                    description: resorts.default.thegrandatmoonpalacecancun.description,
                    fullname: resorts.default.thegrandatmoonpalacecancun.fullname,
                    urlBtnBack: resorts.default.thegrandatmoonpalacecancun.urlBtnBack,
                    venues: resorts.default.thegrandatmoonpalacecancun.venues
                },
                /*
                {
                    //"Isla Mujeres Palace",
                    match: "islamujerespalace",
                    capacity: 80,
                    title: resorts.default.islamujerespalace.title,
                    subtitle: resorts.default.islamujerespalace.subtitle,
                    description: resorts.default.islamujerespalace.description,
                    fullname: resorts.default.islamujerespalace.fullname,
                    urlBtnBack: resorts.default.islamujerespalace.urlBtnBack,
                    venues: resorts.default.islamujerespalace.venues
                },
                 */
            ]
        },
        {
            name: "rivera",
            city: "Rivera Maya",
            content: [
                {
                    match: "playacarpalace",
                    capacity: 100,
                    //"Playacar Palace",
                    title: resorts.default.playacarpalace.title,
                    subtitle: resorts.default.playacarpalace.subtitle,
                    description: resorts.default.playacarpalace.description,
                    fullname: resorts.default.playacarpalace.fullname,
                    urlBtnBack: resorts.default.playacarpalace.urlBtnBack,
                    venues: resorts.default.playacarpalace.venues
                },
            ]
        },
        {
            name: "cabos",
            city: "Los cabos",
            content: [
                {
                    //"Le Blanc Spa Resort Los Cabos",
                    match: "leblancloscabos",
                    capacity: 100,
                    title: resorts.default.leblancloscabos.title,
                    subtitle: resorts.default.leblancloscabos.subtitle,
                    description: resorts.default.leblancloscabos.description,
                    fullname: resorts.default.leblancloscabos.fullname,
                    urlBtnBack: resorts.default.leblancloscabos.urlBtnBack,
                    venues: resorts.default.leblancloscabos.venues
                }
            ]
        },
        {
            name: "cozumel",
            city: "Cozumel",
            content: [
                {
                    //"Cozumel Palace",
                    match: "cozumelpalace",
                    capacity: 80,
                    title: resorts.default.cozumelpalace.title,
                    subtitle: resorts.default.cozumelpalace.subtitle,
                    description: resorts.default.cozumelpalace.description,
                    fullname: resorts.default.cozumelpalace.fullname,
                    urlBtnBack: resorts.default.cozumelpalace.urlBtnBack,
                    venues: resorts.default.cozumelpalace.venues
                }
            ]
        },
        {
            name: "jamaica",
            city: "Jamaica",
            content: [
                {
                    //"Moon Palace Jamaica",
                    match: "moonpalacejamaica",
                    capacity: 100,
                    title: resorts.default.moonpalacejamaica.title,
                    subtitle: resorts.default.moonpalacejamaica.subtitle,
                    description: resorts.default.moonpalacejamaica.description,
                    fullname: resorts.default.moonpalacejamaica.fullname,
                    urlBtnBack: resorts.default.moonpalacejamaica.urlBtnBack,
                    venues: resorts.default.moonpalacejamaica.venues
                }
            ]
        },
    ]
};

export default data;
/*
isla mujeres <= 80 personas
/*
cozumel <= 80 personas
sun palace <= 30 personas

rivera maya-isla mujeres palaya car
*/

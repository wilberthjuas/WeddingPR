/**
* @name: error404.js
* @description: Página 404
* @author: Diego
* @version: 1.1.0*/

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Layout from '../../components/layout';
import { Sliderprincipal, Grid, Sweptaway, Nowdream } from '../../components';
import { Titlesection, Iconwedd } from '../../components/wirefragment';
import Sweptawayslider from '../../components/sweptawayslider';


class ResourceCenter extends Component {



    constructor(props) {
        super(props);
        this.filtarPdf = this.filtarPdf.bind(this)
        this.state = {
            msg1: "Call Center Service Tool",
            msg2: "On the following menu, you will find key marketing and sales materials to facilitate customer support:",
            t1: "1) Choose the topic from the menu ",
            t2: "2) Open the document for review ",
            t3: "3) Share the url with your customer ",
            slider404: [{
                imageDesk: "https://e-commercepr.s3.amazonaws.com/assets/images/contactus/Desktop/contact-us-desktop.jpg",
                imageMov: "https://e-commercepr.s3.amazonaws.com/assets/images/contactus/Movil/contact-us.jpg",
            },],
            nowthedreamFilter: null,
            nowthedream:
            {
                slide: [

                    {
                        "ImageDesk": "https://e-commercepr.s3.amazonaws.com/assets/images/resourcecenter/desktop/34-Le-blanc-brochure-weddings-desktop1.jpg",
                        "ImageMov": "https://e-commercepr.s3.amazonaws.com/assets/images/resourcecenter/mobile/34-Le-Blanc-Brochure-Weddings-mobile1.jpg",
                        "ImageMovThumb": "https://e-commercepr.s3.amazonaws.com/assets/images/home/Desktop/expert-wedding-planning-thumb.jpg",
                        "title": "Le Blanc Spa Resorts Brochure",
                        "description": "Copy URL to Download PDF",
                        "buttonTxt": "DOWNLOAD PDF",
                        "urlBtn": "https://e-commercepr.s3.amazonaws.com/assets/documentos/resourcecenter/100_LeBlanc-Weddings-brochure+SINGLE+PAGES_2020.pdf",
                        "resource": "1",
                        "textAlt": "",
                        "categoria": "inspirations"
                    },
                    {
                        "ImageDesk": "https://e-commercepr.s3.amazonaws.com/assets/images/resourcecenter/desktop/30-le-blanc-los-cabos-wedding-inspirations.jpg",
                        "ImageMov": "https://e-commercepr.s3.amazonaws.com/assets/images/resourcecenter/mobile/30-le-blanc-los-cabos-wedding-inspirations.jpg",
                        "ImageMovThumb": "https://e-commercepr.s3.amazonaws.com/assets/images/home/Desktop/expert-wedding-planning-thumb.jpg",
                        "title": "Le Blanc Spa Resort Los Cabos Wedding Inspirations",
                        "description": "Copy URL to Download PDF",
                        "buttonTxt": "DOWNLOAD PDF",
                        "urlBtn": "https://e-commercepr.s3.amazonaws.com/assets/documentos/resourcecenter/510+-+Inspirations+LBLC+-33.pdf",
                        "resource": "1",
                        "textAlt": "",
                        "categoria": "inspirations"
                    },
                    {
                        "ImageDesk": "https://e-commercepr.s3.amazonaws.com/assets/images/resourcecenter/desktop/01-pr-wedding-inspirations.jpg",
                        "ImageMov": "https://e-commercepr.s3.amazonaws.com/assets/images/resourcecenter/mobile/01-pr-wedding-inspirations.jpg",
                        "ImageMovThumb": "https://e-commercepr.s3.amazonaws.com/assets/images/home/Desktop/expert-wedding-planning-thumb.jpg",
                        "title": "Palace Resorts Wedding Inspirations",//"Inspirations",
                        "description": "Copy URL to Download PDF",
                        "buttonTxt": "DOWNLOAD PDF",
                        "urlBtn": "https://e-commercepr.s3.amazonaws.com/assets/documentos/resourcecenter/506+-+Palace+Resorts+Wedding+Inspirations.pdf",//"https://e-commercepr.s3.amazonaws.com/assets/documentos/resourcecenter/Palace+Resorts+Wedding+Inspirations%2C+v7.24.19.pdf",
                        "textAlt": "",
                        "resource": "1",
                        "categoria": "inspirations"
                    },
                    {
                        "ImageDesk": "https://e-commercepr.s3.amazonaws.com/assets/images/resourcecenter/desktop/02-preview-paradise-pr.jpg",
                        "ImageMov": "https://e-commercepr.s3.amazonaws.com/assets/images/resourcecenter/mobile/02-preview-paradise-pr.jpg",
                        "ImageMovThumb": "https://e-commercepr.s3.amazonaws.com/assets/images/home/Desktop/expert-wedding-planning-thumb.jpg",
                        "title": "Preview Paradise",
                        "description": "Copy URL to Download PDF",
                        "buttonTxt": "DOWNLOAD PDF",
                        "urlBtn": "https://e-commercepr.s3.amazonaws.com/assets/documentos/resourcecenter/Preview+Paradise+flyer-Oct+2021.pdf",
                        "textAlt": "",
                        "resource": "1",
                        "categoria": "preview_paradise"
                    },
                    {
                        "ImageDesk": "https://e-commercepr.s3.amazonaws.com/assets/images/resourcecenter/desktop/03-lbc-wedding-location-guide.jpg",
                        "ImageMov": "https://e-commercepr.s3.amazonaws.com/assets/images/resourcecenter/mobile/03-lbc-wedding-location-guide.jpg",
                        "ImageMovThumb": "https://e-commercepr.s3.amazonaws.com/assets/images/home/Desktop/expert-wedding-planning-thumb.jpg",
                        "title": "Le Blanc Cancun",
                        "description": "Copy URL to Download PDF",
                        "buttonTxt": "DOWNLOAD PDF",
                        "urlBtn": "https://e-commercepr.s3.amazonaws.com/assets/documentos/resourcecenter/Le_Blanc_Spa+Resort_Cancun_Wedding_Locations+Guide_May19_0_.pdf",
                        "resource": "1",
                        "textAlt": "",
                        "categoria": "locations"
                    },

                    {
                        "ImageDesk": "https://e-commercepr.s3.amazonaws.com/assets/images/resourcecenter/desktop/04-mpc-wedding-location-guide.jpg",
                        "ImageMov": "https://e-commercepr.s3.amazonaws.com/assets/images/resourcecenter/mobile/04-mpc-wedding-location-guide.jpg",
                        "ImageMovThumb": "https://e-commercepr.s3.amazonaws.com/assets/images/home/Desktop/expert-wedding-planning-thumb.jpg",
                        "title": "Moon Palace Cancun",
                        "description": "Copy URL to Download PDF",
                        "buttonTxt": "DOWNLOAD PDF",
                        "urlBtn": "https://e-commercepr.s3.amazonaws.com/assets/documentos/resourcecenter/Moon+Palace+Cancun+Wedding+Location+Guide_May19.pdf",
                        "resource": "1",
                        "textAlt": "",
                        "categoria": "locations"
                    },
                    {
                        "ImageDesk": "https://e-commercepr.s3.amazonaws.com/assets/images/resourcecenter/desktop/05-sp-wedding-location-guide.jpg",
                        "ImageMov": "https://e-commercepr.s3.amazonaws.com/assets/images/resourcecenter/mobile/05-sp-wedding-location-guide.jpg",
                        "ImageMovThumb": "https://e-commercepr.s3.amazonaws.com/assets/images/home/Desktop/expert-wedding-planning-thumb.jpg",
                        "title": "Sun Palace",
                        "description": "Copy URL to Download PDF",
                        "buttonTxt": "DOWNLOAD PDF",
                        "urlBtn": "https://e-commercepr.s3.amazonaws.com/assets/documentos/resourcecenter/sun-palace-wedding-locations-guide-weddings-palace-resorts-6feb2019.pdf",
                        "resource": "1",
                        "textAlt": "",
                        "categoria": "locations"
                    },
                    /*{
                        "ImageDesk": "https://e-commercepr.s3.amazonaws.com/assets/images/resourcecenter/desktop/06-group-benefits.jpg",
                        "ImageMov": "https://e-commercepr.s3.amazonaws.com/assets/images/resourcecenter/mobile/06-group-benefits.jpg",
                        "ImageMovThumb": "https://e-commercepr.s3.amazonaws.com/assets/images/home/Desktop/expert-wedding-planning-thumb.jpg",
                        "title": "Group Benefits",
                        "description": "Copy URL to Download PDF",
                        "buttonTxt": "DOWNLOAD PDF",
                        "urlBtn": "https://e-commercepr.s3.amazonaws.com/assets/documentos/resourcecenter/699-+Weddings-+Group+Benefits++EDGE-+Consolidate+Flyers.pdf",
                        "resource": "1",
                        "textAlt": "",
                        "categoria": "group_benefits"
                    },*/
                    {
                        "ImageDesk": "https://e-commercepr.s3.amazonaws.com/assets/images/resourcecenter/desktop/07-cp-wedding-locations-guide.jpg",
                        "ImageMov": "https://e-commercepr.s3.amazonaws.com/assets/images/resourcecenter/mobile/07-cp-wedding-locations-guide.jpg",
                        "ImageMovThumb": "https://e-commercepr.s3.amazonaws.com/assets/images/home/Desktop/expert-wedding-planning-thumb.jpg",
                        "title": "Cozumel Palace",
                        "description": "Copy URL to Download PDF",
                        "buttonTxt": "DOWNLOAD PDF",
                        "urlBtn": "https://e-commercepr.s3.amazonaws.com/assets/documentos/resourcecenter/cozumel-palace-wedding-locations-guide-weddings-palace-resorts-8feb2019.pdf",
                        "resource": "1",
                        "textAlt": "",
                        "categoria": "locations"
                    },
                  /*
                    {
                        "ImageDesk": "https://e-commercepr.s3.amazonaws.com/assets/images/resourcecenter/desktop/08-imp-wedding-locations-guide.jpg",
                        "ImageMov": "https://e-commercepr.s3.amazonaws.com/assets/images/resourcecenter/mobile/08-imp-wedding-locations-guide.jpg",
                        "ImageMovThumb": "https://e-commercepr.s3.amazonaws.com/assets/images/home/Desktop/expert-wedding-planning-thumb.jpg",
                        "title": "Isla Mujeres Palace",
                        "description": "Copy URL to Download PDF",
                        "buttonTxt": "DOWNLOAD PDF",
                        "urlBtn": "https://e-commercepr.s3.amazonaws.com/assets/documentos/resourcecenter/isla-mujeres-palace-wedding-locations-guide-weddings-palace-resorts-6feb2019.pdf",
                        "resource": "1",
                        "textAlt": "",
                        "categoria": "locations"
                    },
                   */
                    {
                        "ImageDesk": "https://e-commercepr.s3.amazonaws.com/assets/images/resourcecenter/desktop/09-bp-wedding-locations-guide.jpg",
                        "ImageMov": "https://e-commercepr.s3.amazonaws.com/assets/images/resourcecenter/mobile/09-bp-wedding-locations-guide.jpg",
                        "ImageMovThumb": "https://e-commercepr.s3.amazonaws.com/assets/images/home/Desktop/expert-wedding-planning-thumb.jpg",
                        "title": "Beach Palace",
                        "description": "Copy URL to Download PDF",
                        "buttonTxt": "DOWNLOAD PDF",
                        "urlBtn": "https://e-commercepr.s3.amazonaws.com/assets/documentos/resourcecenter/beach-palace-wedding-locations-guide-weddings-palace-resorts-6feb2019_0.pdf",
                        "resource": "1",
                        "textAlt": "",
                        "categoria": "locations"
                    },
                    {
                        "ImageDesk": "https://e-commercepr.s3.amazonaws.com/assets/images/resourcecenter/desktop/10-playacar-wedding-locations-guide.jpg",
                        "ImageMov": "https://e-commercepr.s3.amazonaws.com/assets/images/resourcecenter/mobile/10-playacar-wedding-locations-guide.jpg",
                        "ImageMovThumb": "https://e-commercepr.s3.amazonaws.com/assets/images/home/Desktop/expert-wedding-planning-thumb.jpg",
                        "title": "Playacar Palace",
                        "description": "Copy URL to Download PDF",
                        "buttonTxt": "DOWNLOAD PDF",
                        "urlBtn": "https://e-commercepr.s3.amazonaws.com/assets/documentos/resourcecenter/playacar-palace-wedding-locations-guide-weddings-palace-resorts-6feb2019_0.pdf",
                        "resource": "1",
                        "textAlt": "",
                        "categoria": "locations"
                    },
                    /*{
                        "ImageDesk": "https://e-commercepr.s3.amazonaws.com/assets/images/resourcecenter/desktop/11-pr-resort-credit.jpg",
                        "ImageMov": "https://e-commercepr.s3.amazonaws.com/assets/images/resourcecenter/mobile/11-pr-resort-credit.jpg",
                        "ImageMovThumb": "https://e-commercepr.s3.amazonaws.com/assets/images/home/Desktop/expert-wedding-planning-thumb.jpg",
                        "title": "Palace Resorts Resort Credit",
                        "description": "Copy URL to Download PDF",
                        "buttonTxt": "DOWNLOAD PDF",
                        "urlBtn": "https://e-commercepr.s3.amazonaws.com/assets/documentos/resourcecenter/Guia_RC_PR_Ing_0.pdf",
                        "resource": "1",
                        "textAlt": "",
                        "categoria": "resort_credit"
                    },*/
                    {
                        "ImageDesk": "https://e-commercepr.s3.amazonaws.com/assets/images/resourcecenter/desktop/12-mpj-wedding-location-guide.jpg",
                        "ImageMov": "https://e-commercepr.s3.amazonaws.com/assets/images/resourcecenter/mobile/12-mpj-wedding-location-guide.jpg",
                        "ImageMovThumb": "https://e-commercepr.s3.amazonaws.com/assets/images/home/Desktop/expert-wedding-planning-thumb.jpg",
                        "title": "Moon Palace Jamaica",
                        "description": "Copy URL to Download PDF",
                        "buttonTxt": "DOWNLOAD PDF",
                        "urlBtn": "https://e-commercepr.s3.amazonaws.com/assets/documentos/resourcecenter/Moon+Palace+Jamaica+Wedding+Location+Guide_May19.pdf",
                        "resource": "1",
                        "textAlt": "",
                        "categoria": "locations"
                    },
                    {
                        "ImageDesk": "https://e-commercepr.s3.amazonaws.com/assets/images/resourcecenter/desktop/13-south-asian-weddings.jpg",
                        "ImageMov": "https://e-commercepr.s3.amazonaws.com/assets/images/resourcecenter/mobile/13-south-asian-weddings.jpg",
                        "ImageMovThumb": "https://e-commercepr.s3.amazonaws.com/assets/images/home/Desktop/expert-wedding-planning-thumb.jpg",
                        "title": "South Asian Weddings",
                        "description": "Copy URL to Download PDF",
                        "buttonTxt": "DOWNLOAD PDF",
                        "urlBtn": "https://e-commercepr.s3.amazonaws.com/assets/documentos/resourcecenter/South+Asian+Weddings+Flyer.pdf",
                        "resource": "1",
                        "textAlt": "",
                        "categoria": "inspirations"
                    },
                    /*{
                        "ImageDesk": "https://e-commercepr.s3.amazonaws.com/assets/images/resourcecenter/desktop/14-resort-credit-lbc.jpg",
                        "ImageMov": "https://e-commercepr.s3.amazonaws.com/assets/images/resourcecenter/mobile/14-resort-credit-lbc.jpg",
                        "ImageMovThumb": "https://e-commercepr.s3.amazonaws.com/assets/images/home/Desktop/expert-wedding-planning-thumb.jpg",
                        "title": "Le Blanc Cancun Blanc Benefits",
                        "description": "Copy URL to Download PDF",
                        "buttonTxt": "DOWNLOAD PDF",
                        "urlBtn": "https://e-commercepr.s3.amazonaws.com/assets/documentos/resourcecenter/resort-credit-le-blanc-cancun-weddings-palace-resorts-6feb2019.pdf",
                        "resource": "1",
                        "textAlt": "",
                        "categoria": "resort_credit"
                    },*/
                    {
                        "ImageDesk": "https://e-commercepr.s3.amazonaws.com/assets/images/resourcecenter/desktop/15-pr-honeymoon-packages.jpg",
                        "ImageMov": "https://e-commercepr.s3.amazonaws.com/assets/images/resourcecenter/mobile/15-pr-honeymoon-packages.jpg",
                        "ImageMovThumb": "https://e-commercepr.s3.amazonaws.com/assets/images/home/Desktop/expert-wedding-planning-thumb.jpg",
                        "title": "Palace Resorts Honeymoons",
                        "description": "Copy URL to Download PDF",
                        "buttonTxt": "DOWNLOAD PDF",
                        "urlBtn": "https://e-commercepr.s3.amazonaws.com/assets/documentos/resourcecenter/HoneymoonPackages_PR-2-+8320.pdf",
                        "resource": "1",
                        "textAlt": "",
                        "categoria": "honeymoons_packages"
                    },
                    {
                        "ImageDesk": "https://e-commercepr.s3.amazonaws.com/assets/images/resourcecenter/desktop/16-lb-honeymoon-packages.jpg",
                        "ImageMov": "https://e-commercepr.s3.amazonaws.com/assets/images/resourcecenter/mobile/16-lb-honeymoon-packages.jpg",
                        "ImageMovThumb": "https://e-commercepr.s3.amazonaws.com/assets/images/home/Desktop/expert-wedding-planning-thumb.jpg",
                        "title": "Le Blanc Honeymoons",
                        "description": "Copy URL to Download PDF",
                        "buttonTxt": "DOWNLOAD PDF",
                        "urlBtn": "https://e-commercepr.s3.amazonaws.com/assets/documentos/resourcecenter/658-Honeymoon+Packages+LB-3.pdf",
                        "resource": "1",
                        "textAlt": "",
                        "categoria": "honeymoons_packages"
                    },
                    {
                        "ImageDesk": "https://e-commercepr.s3.amazonaws.com/assets/images/resourcecenter/desktop/17-lblc-wedding-locations-guide.jpg",
                        "ImageMov": "https://e-commercepr.s3.amazonaws.com/assets/images/resourcecenter/mobile/17-lblc-wedding-locations-guide.jpg",
                        "ImageMovThumb": "https://e-commercepr.s3.amazonaws.com/assets/images/home/Desktop/expert-wedding-planning-thumb.jpg",
                        "title": "Le Blanc Los Cabos",
                        "description": "Copy URL to Download PDF",
                        "buttonTxt": "DOWNLOAD PDF",
                        "urlBtn": "https://e-commercepr.s3.amazonaws.com/assets/documentos/resourcecenter/Le+Blanc+Spa+Resort+Los+Cabos+Wedding+Location+Guide_May19.pdf",
                        "resource": "1",
                        "textAlt": "",
                        "categoria": "locations"
                    },
                    {
                        "ImageDesk": "https://e-commercepr.s3.amazonaws.com/assets/images/resourcecenter/desktop/18-tg-wedding-locations-guide.jpg",
                        "ImageMov": "https://e-commercepr.s3.amazonaws.com/assets/images/resourcecenter/mobile/18-tg-wedding-locations-guide.jpg",
                        "ImageMovThumb": "https://e-commercepr.s3.amazonaws.com/assets/images/home/Desktop/expert-wedding-planning-thumb.jpg",
                        "title": "Moon Palace The Grand - Cancun",
                        "description": "Copy URL to Download PDF",
                        "buttonTxt": "DOWNLOAD PDF",
                        "urlBtn": "https://e-commercepr.s3.amazonaws.com/assets/documentos/resourcecenter/the-grand-moon-palace-wedding-location-guide-sep18.pdf",
                        "resource": "1",
                        "textAlt": "",
                        "categoria": "locations"
                    },
                    {
                        "ImageDesk": "https://e-commercepr.s3.amazonaws.com/assets/images/resourcecenter/desktop/19-pr-destination-wedding.jpg",
                        "ImageMov": "https://e-commercepr.s3.amazonaws.com/assets/images/resourcecenter/mobile/19-pr-destination-wedding.jpg",
                        "ImageMovThumb": "https://e-commercepr.s3.amazonaws.com/assets/images/home/Desktop/expert-wedding-planning-thumb.jpg",
                        "title": "Destination Weddings",
                        "description": "Copy URL to Download PDF",
                        "buttonTxt": "DOWNLOAD PDF",
                        "urlBtn": "https://e-commercepr.s3.amazonaws.com/assets/documentos/resourcecenter/destinations-weddings-palace-resorts-sep2018.pdf",
                        "resource": "1",
                        "textAlt": "",
                        "categoria": "locations"
                    },
                    /*{
                        "ImageDesk": "https://e-commercepr.s3.amazonaws.com/assets/images/resourcecenter/desktop/20-resort-credit-lblc.jpg",
                        "ImageMov": "https://e-commercepr.s3.amazonaws.com/assets/images/resourcecenter/mobile/20-resort-credit-lblc.jpg",
                        "ImageMovThumb": "https://e-commercepr.s3.amazonaws.com/assets/images/home/Desktop/expert-wedding-planning-thumb.jpg",
                        "title": "Le Blanc Los Cabos Blanc Benefits",
                        "description": "Copy URL to Download PDF",
                        "buttonTxt": "DOWNLOAD PDF",
                        "urlBtn": "https://e-commercepr.s3.amazonaws.com/assets/documentos/resourcecenter/resort-credit-le-blanc-los-cabos-weddings-palace-resorts-6feb2019.pdf",
                        "resource": "1",
                        "textAlt": "",
                        "categoria": "resort_credit"
                    },*/
                    {
                        "ImageDesk": "https://e-commercepr.s3.amazonaws.com/assets/images/resourcecenter/desktop/21-pr-anniversary-packages.jpg",
                        "ImageMov": "https://e-commercepr.s3.amazonaws.com/assets/images/resourcecenter/mobile/21-pr-anniversary-packages.jpg",
                        "ImageMovThumb": "https://e-commercepr.s3.amazonaws.com/assets/images/home/Desktop/expert-wedding-planning-thumb.jpg",
                        "title": "Palace Resorts Complimentary Anniversary Package",
                        "description": "Copy URL to Download PDF",
                        "buttonTxt": "DOWNLOAD PDF",
                        "urlBtn": "https://e-commercepr.s3.amazonaws.com/assets/documentos/resourcecenter/Palace+Resorts+-+Comp.+Anniversary+Packages%2C+v.04.10.19.pdf",
                        "resource": "1",
                        "textAlt": "",
                        "categoria": "aniversary_packages"
                    },
                    {
                        "ImageDesk": "https://e-commercepr.s3.amazonaws.com/assets/images/resourcecenter/desktop/22-lb-anniversary-packages.jpg",
                        "ImageMov": "https://e-commercepr.s3.amazonaws.com/assets/images/resourcecenter/mobile/22-lb-anniversary-packages.jpg",
                        "ImageMovThumb": "https://e-commercepr.s3.amazonaws.com/assets/images/home/Desktop/expert-wedding-planning-thumb.jpg",
                        "title": "Le Blanc Complimentary Anniversary Package",
                        "description": "Copy URL to Download PDF",
                        "buttonTxt": "DOWNLOAD PDF",
                        "urlBtn": "https://e-commercepr.s3.amazonaws.com/assets/documentos/resourcecenter/Le+Blanc+-+Comp.+Anniversary+Packages%2C+v.04.10.19.pdf",
                        "resource": "1",
                        "textAlt": "",
                        "categoria": "aniversary_packages"
                    },
                    {
                        "ImageDesk": "https://e-commercepr.s3.amazonaws.com/assets/images/resourcecenter/desktop/23-wedding-benefits-for-ta.jpg",
                        "ImageMov": "https://e-commercepr.s3.amazonaws.com/assets/images/resourcecenter/mobile/23-wedding-benefits-for-ta.jpg",
                        "ImageMovThumb": "https://e-commercepr.s3.amazonaws.com/assets/images/home/Desktop/expert-wedding-planning-thumb.jpg",
                        "title": "Wedding Benefits For Travel Agents",
                        "description": "Copy URL to Download PDF",
                        "buttonTxt": "DOWNLOAD PDF",
                        "urlBtn": "https://e-commercepr.s3.amazonaws.com/assets/documentos/resourcecenter/Wedding+Benefits+for+TA-Flyer.pdf",
                        "resource": "1",
                        "textAlt": "",
                        "categoria": "travel-agents"
                    },
                    {
                        "ImageDesk": "https://e-commercepr.s3.amazonaws.com/assets/images/resourcecenter/desktop/24-free-wedding-essentials.jpg",
                        "ImageMov": "https://e-commercepr.s3.amazonaws.com/assets/images/resourcecenter/mobile/24-free-wedding-essentials.jpg",
                        "ImageMovThumb": "https://e-commercepr.s3.amazonaws.com/assets/images/home/Desktop/expert-wedding-planning-thumb.jpg",
                        "title": "Free Weddings Essentials",
                        "description": "Copy URL to Download PDF",
                        "buttonTxt": "DOWNLOAD PDF",
                        "urlBtn": "https://e-commercepr.s3.amazonaws.com/assets/documentos/resourcecenter/566+-+Free+Wedding+Essentials-4.pdf",
                        "resource": "1",
                        "textAlt": "",
                        "categoria": "offers"
                    },
                    {
                        "ImageDesk": "https://e-commercepr.s3.amazonaws.com/assets/images/resourcecenter/desktop/25-wedding-checklist.jpg",
                        "ImageMov": "https://e-commercepr.s3.amazonaws.com/assets/images/resourcecenter/mobile/25-wedding-checklist.jpg",
                        "ImageMovThumb": "https://e-commercepr.s3.amazonaws.com/assets/images/home/Desktop/expert-wedding-planning-thumb.jpg",
                        "title": "Weddings Checklist",
                        "description": "Copy URL to Download PDF",
                        "buttonTxt": "DOWNLOAD PDF",
                        "urlBtn": "https://e-commercepr.s3.amazonaws.com/assets/documentos/resourcecenter/118-Important+Wedding+Dates+Checklist.pdf",
                        "resource": "1",
                        "textAlt": "",
                        "categoria": "inspirations"
                    },
                    /*{
                        "ImageDesk": "https://e-commercepr.s3.amazonaws.com/assets/images/resourcecenter/desktop/26-elegant-beginnings.jpg",
                        "ImageMov": "https://e-commercepr.s3.amazonaws.com/assets/images/resourcecenter/mobile/26-elegant-beginnings.jpg",
                        "ImageMovThumb": "https://e-commercepr.s3.amazonaws.com/assets/images/home/Desktop/expert-wedding-planning-thumb.jpg",
                        "title": "Preview Paradise",//era elgant beginniungs
                        "description": "Copy URL to Download PDF",
                        "buttonTxt": "DOWNLOAD PDF",
                        "urlBtn": "https://e-commercepr.s3.amazonaws.com/assets/documentos/resourcecenter/388-Elegant+Beginnings+in+Le+Blanc+Spa+Resorts+Flyer.pdf",
                        "resource": "1",
                        "textAlt": "",
                        "categoria": "offers"
                    },*/
                    {
                        "ImageDesk": "https://e-commercepr.s3.amazonaws.com/assets/images/resourcecenter/desktop/27-marriage-requirements-jamaica.jpg",
                        "ImageMov": "https://e-commercepr.s3.amazonaws.com/assets/images/resourcecenter/mobile/27-marriage-requirements-jamaica.jpg",
                        "ImageMovThumb": "https://e-commercepr.s3.amazonaws.com/assets/images/home/Desktop/expert-wedding-planning-thumb.jpg",
                        "title": "Marriage Requirements Ceremonies Jamaica",
                        "description": "Copy URL to Download PDF",
                        "buttonTxt": "DOWNLOAD PDF",
                        "urlBtn": "https://e-commercepr.s3.amazonaws.com/assets/documentos/resourcecenter/302-Marriage+Requirements_Jamaica.pdf",
                        "resource": "1",
                        "textAlt": "",
                        "categoria": "documents_required"
                    },
                    {
                        "ImageDesk": "https://e-commercepr.s3.amazonaws.com/assets/images/resourcecenter/desktop/28-marriage-requirements-mexico.jpg",
                        "ImageMov": "https://e-commercepr.s3.amazonaws.com/assets/images/resourcecenter/mobile/28-marriage-requirements-mexico.jpg",
                        "ImageMovThumb": "https://e-commercepr.s3.amazonaws.com/assets/images/home/Desktop/expert-wedding-planning-thumb.jpg",
                        "title": "Marriage Requirements Ceremonies Mexico",
                        "description": "Copy URL to Download PDF",
                        "buttonTxt": "DOWNLOAD PDF",
                        "urlBtn": "https://e-commercepr.s3.amazonaws.com/assets/documentos/resourcecenter/302-Marriage+Requirements_Mexico.pdf",
                        "resource": "1",
                        "textAlt": "",
                        "categoria": "documents_required"
                    },
                    {
                        "ImageDesk": "https://e-commercepr.s3.amazonaws.com/assets/images/resourcecenter/desktop/29-le-blanc-cancun-wedding-inspirations.jpg",
                        "ImageMov": "https://e-commercepr.s3.amazonaws.com/assets/images/resourcecenter/mobile/29-le-blanc-cancun-wedding-inspirations.jpg",
                        "ImageMovThumb": "https://e-commercepr.s3.amazonaws.com/assets/images/home/Desktop/expert-wedding-planning-thumb.jpg",
                        "title": "Le Blanc Spa Resort Cancun Wedding Inspirations",
                        "description": "Copy URL to Download PDF",
                        "buttonTxt": "DOWNLOAD PDF",
                        "urlBtn": "https://e-commercepr.s3.amazonaws.com/assets/documentos/resourcecenter/510+-+Le+Blanc+Spa+Resort+Cancun+Wedding+Inspirations.pdf",
                        "resource": "1",
                        "textAlt": "",
                        "categoria": "inspirations"
                    },
                    {
                        "ImageDesk": "https://e-commercepr.s3.amazonaws.com/assets/images/resourcecenter/desktop/31-pr-wedding-brochure.jpg",
                        "ImageMov": "https://e-commercepr.s3.amazonaws.com/assets/images/resourcecenter/mobile/31-pr-wedding-brochure.jpg",
                        "ImageMovThumb": "https://e-commercepr.s3.amazonaws.com/assets/images/home/Desktop/expert-wedding-planning-thumb.jpg",
                        "title": "Palace Resorts Weddings Brochure",
                        "description": "Copy URL to Download PDF",
                        "buttonTxt": "DOWNLOAD PDF",
                        "urlBtn": "https://e-commercepr.s3.amazonaws.com/assets/documentos/resourcecenter/102_Palace+Weddings+TRIFOLD_2021_Pages.pdf",
                        "resource": "1",
                        "textAlt": "",
                        "categoria": "inspirations"
                    },
                    {
                        "ImageDesk": "https://e-commercepr.s3.amazonaws.com/assets/images/resourcecenter/desktop/32-south-asian-wedding-brochure.jpg",
                        "ImageMov": "https://e-commercepr.s3.amazonaws.com/assets/images/resourcecenter/mobile/32-south-asian-wedding-brochure.jpg",
                        "ImageMovThumb": "https://e-commercepr.s3.amazonaws.com/assets/images/home/Desktop/expert-wedding-planning-thumb.jpg",
                        "title": "South Asian Weddings Brochure",
                        "description": "Copy URL to Download PDF",
                        "buttonTxt": "DOWNLOAD PDF",
                        "urlBtn": "https://e-commercepr.s3.amazonaws.com/assets/documentos/resourcecenter/101-South-Asian-Weddings-mech-Pages.pdf",
                        "resource": "1",
                        "textAlt": "",
                        "categoria": "inspirations"
                    },
                    // {
                    //     "ImageDesk": "https://e-commercepr.s3.amazonaws.com/assets/images/resourcecenter/desktop/34-small-group-benefits.jpg",
                    //     "ImageMov": "https://e-commercepr.s3.amazonaws.com/assets/images/resourcecenter/desktop/34-small-group-benefits.jpg",
                    //     "ImageMovThumb": "https://e-commercepr.s3.amazonaws.com/assets/images/home/Desktop/expert-wedding-planning-thumb.jpg",
                    //     "title": "Small Group Benefits",
                    //     "description": "Copy URL to Download PDF",
                    //     "buttonTxt": "DOWNLOAD PDF",
                    //     "urlBtn": "https://e-commercepr.s3.amazonaws.com/assets/documentos/resourcecenter/110-Small+Group+Benefits.pdf",
                    //     "resource": "1",
                    //     "textAlt": "",
                    //     "categoria": "group_benefits"
                    // },
                   /* {
                        "ImageDesk": "https://e-commercepr.s3.amazonaws.com/assets/images/resourcecenter/desktop/33-weddings-edge-benefits.jpg",
                        "ImageMov": "https://e-commercepr.s3.amazonaws.com/assets/images/resourcecenter/mobile/33-weddings-edge-benefits.jpg",
                        "ImageMovThumb": "https://e-commercepr.s3.amazonaws.com/assets/images/home/Desktop/expert-wedding-planning-thumb.jpg",
                        "title": "Weddings Edge Benefits",
                        "description": "Copy URL to Download PDF",
                        "buttonTxt": "DOWNLOAD PDF",
                        "urlBtn": "https://e-commercepr.s3.amazonaws.com/assets/documentos/resourcecenter/365-Weddings+Edge+Benefits-+no+RC.pdf",
                        "resource": "1",
                        "textAlt": "",
                        "categoria": "group_benefits"
                    },*/
                ]
            },


        };
    }
    componentDidMount() {
       this.filtarPdf();
    }

    handleClick = (e) => {
       if (e.target.parentElement.children[1].style.height=="0px") {
        let s =   e.target.parentElement.children[1].children[0].clientHeight + "px";
        e.target.parentElement.children[1].style.height=s;
        e.target.parentElement.children[1].style.overflow=""
       } else {
        e.target.parentElement.children[1].style.height="0px";
        e.target.parentElement.children[1].style.overflow="hidden"
       }
    }

    filtarPdf() {
        let filtro = this.state.nowthedream.slide;
        let inspirationsArray = [];
        let preview_paradiseArray = [];
        let locationsArray = [];
        let group_benefitsArray = [];
        let honeymoons_packagesArray = [];
        let aniversary_packagesArray = [];
        let travel_agentsArray = [];
        let offersArray = [];
        let documents_requiredArray = [];
        filtro.forEach((element) => {
            switch (element.categoria) {
                case "inspirations":
                        inspirationsArray.push(element);
                        this.setState({
                            inspirations : inspirationsArray
                        })
                break;
                case "preview_paradise":
                        preview_paradiseArray.push(element);
                        this.setState({
                            preview_paradise : preview_paradiseArray
                        })
                break;
                case "locations":
                        locationsArray.push(element);
                        this.setState({
                            locations : locationsArray
                        })
                break;
                case "group_benefits":
                        group_benefitsArray.push(element);
                        this.setState({
                            group_benefits : group_benefitsArray
                        })
                break;
                case "honeymoons_packages":
                        honeymoons_packagesArray.push(element);
                        this.setState({
                            honeymoons_packages : honeymoons_packagesArray
                        })
                break;
                case "aniversary_packages":
                        aniversary_packagesArray.push(element);
                        this.setState({
                            aniversary_packages : aniversary_packagesArray
                        })
                break;
                case "travel-agents":
                        travel_agentsArray.push(element);
                        this.setState({
                            travel_agents : travel_agentsArray
                        })
                break;
                case "offers":
                        offersArray.push(element);
                        this.setState({
                            offers : offersArray
                        })
                break;
                case "documents_required":
                        documents_requiredArray.push(element);
                        this.setState({
                            documents_required : documents_requiredArray
                        })
                break;

                default:
                    break;
            }
        })

    }

    render() {

        return (
            <Layout title={"Resource Center - Weddings Palace Resorts "}>
                <div page="resourcecenter">
                    <Sliderprincipal slides={this.state.slider404} />
                    <Titlesection title={this.state.msg1} color="pink" />
                    <Titlesection description={this.state.msg2} color="pink" />
                    <br />
                    <div component="grid-x">
                        <div component="cell" className="container">
                        <div className="contInspirations">
                            <h2 className="subtitle" onClick={(e)=>{this.handleClick(e)}}>
                                <Iconwedd icon="chevron-down" color="pink"></Iconwedd>
                                &nbsp;Inspirations ({this.state.inspirations?this.state.inspirations.length:null} documents)
                            </h2>
                            <div className="contDocs" style={{height:"0px","overflow":"hidden"}}>
                            {this.state.inspirations?
                                <Sweptawayslider slide={this.state.inspirations} lazy={true} resource={"1"} list={true}/>
                                :
                                null
                            }
                            </div>
                        </div>

                        <div className="contInspirations">
                            <h2 className="subtitle" onClick={(e)=>{this.handleClick(e)}}>
                                <Iconwedd icon="chevron-down" color="pink"></Iconwedd>
                                &nbsp;Preview Paradise ({this.state.preview_paradise?this.state.preview_paradise.length:null} {this.state.preview_paradise?this.state.preview_paradise.length>1?"documents":"document":null})
                            </h2>
                            <div className="contDocs" style={{height:"0px","overflow":"hidden"}}>
                            {this.state.preview_paradise?
                                <Sweptawayslider slide={this.state.preview_paradise} lazy={true} resource={"1"} list={true}/>
                                :
                                null
                            }
                            </div>
                        </div>
                        <div className="contInspirations">
                            <h2 className="subtitle" onClick={(e)=>{this.handleClick(e)}}>
                                <Iconwedd icon="chevron-down" color="pink"></Iconwedd>
                                &nbsp;Locations ({this.state.locations?this.state.locations.length:null} documents)
                            </h2>
                            <div className="contDocs" style={{height:"0px","overflow":"hidden"}}>
                            {this.state.locations?
                                <Sweptawayslider slide={this.state.locations} lazy={true} resource={"1"} list={true}/>
                                :
                                null
                            }
                            </div>
                        </div>
                            {/*
                        <div className="contInspirations">
                            <h2 className="subtitle" onClick={(e)=>{this.handleClick(e)}}>
                                <Iconwedd icon="chevron-down" color="pink"></Iconwedd>
                                &nbsp;Group Benefits ({this.state.group_benefits?this.state.group_benefits.length:null} documents)
                            </h2>
                            <div className="contDocs" style={{height:"0px","overflow":"hidden"}}>
                            {this.state.group_benefits?
                                <Sweptawayslider slide={this.state.group_benefits} lazy={true} resource={"1"} list={true}/>
                                :
                                null
                            }
                            </div>
                        </div>
                        */}
                        <div className="contInspirations">
                            <h2 className="subtitle" onClick={(e)=>{this.handleClick(e)}}>
                                <Iconwedd icon="chevron-down" color="pink"></Iconwedd>
                                &nbsp;Honeymoon Packages ({this.state.honeymoons_packages?this.state.honeymoons_packages.length:null} documents)
                            </h2>
                            <div className="contDocs" style={{height:"0px","overflow":"hidden"}}>
                            {this.state.honeymoons_packages?
                                <Sweptawayslider slide={this.state.honeymoons_packages} lazy={true} resource={"1"} list={true}/>
                                :
                                null
                            }
                            </div>
                        </div>
                        <div className="contInspirations">
                            <h2 className="subtitle" onClick={(e)=>{this.handleClick(e)}}>
                                <Iconwedd icon="chevron-down" color="pink"></Iconwedd>
                                &nbsp;Anniversary Packages ({this.state.aniversary_packages?this.state.aniversary_packages.length:null} documents)
                            </h2>
                            <div className="contDocs" style={{height:"0px","overflow":"hidden"}}>
                            {this.state.aniversary_packages?
                                <Sweptawayslider slide={this.state.aniversary_packages} lazy={true} resource={"1"} list={true}/>
                                :
                                null
                            }
                            </div>
                        </div>
                        <div className="contInspirations">
                            <h2 className="subtitle" onClick={(e)=>{this.handleClick(e)}}>
                                <Iconwedd icon="chevron-down" color="pink"></Iconwedd>
                                &nbsp;Travel Agents ({this.state.travel_agents?this.state.travel_agents.length:null} {this.state.travel_agents?this.state.travel_agents.length>1?"documents":"document":null})
                            </h2>
                            <div className="contDocs" style={{height:"0px","overflow":"hidden"}}>
                            {this.state.travel_agents?
                                <Sweptawayslider slide={this.state.travel_agents} lazy={true} resource={"1"} list={true}/>
                                :
                                null
                            }
                            </div>
                        </div>
                        <div className="contInspirations">
                            <h2 className="subtitle" onClick={(e)=>{this.handleClick(e)}}>
                                <Iconwedd icon="chevron-down" color="pink"></Iconwedd>
                                &nbsp;Offers ({this.state.offers?this.state.offers.length:null} {this.state.offers?this.state.offers.length>1?"documents":"document":null})
                            </h2>
                            <div className="contDocs" style={{height:"0px","overflow":"hidden"}}>
                            {this.state.offers?
                                <Sweptawayslider slide={this.state.offers} lazy={true} resource={"1"} list={true}/>
                                :
                                null
                            }
                            </div>
                        </div>
                        <div className="contInspirations">
                            <h2 className="subtitle" onClick={(e)=>{this.handleClick(e)}}>
                                <Iconwedd icon="chevron-down" color="pink"></Iconwedd>
                                &nbsp;Documents Required ({this.state.documents_required?this.state.documents_required.length:null} documents)
                            </h2>
                            <div className="contDocs" style={{height:"0px","overflow":"hidden"}}>
                            {this.state.documents_required?
                                <Sweptawayslider slide={this.state.documents_required} lazy={true} resource={"1"} list={true}/>
                                :
                                null
                            }
                            </div>
                        </div>

                        </div>
                        <br /><br /><br /><br />
                    </div>


                    {/*<div component="grid-x" className="container">
                        <div component="cell">
                            <div component="grid-x">
                                <div component="cell center" style={{textAlign:"center"}}small="6" medium="3" large="3">
                                    <a className="linkalt" onClick={() => { this.filtarPdf(this, "inspirations") }}>
                                    Inspirations
                                </a>
                                </div>
                                <div component="cell center" style={{textAlign:"center"}}small="6" medium="3" large="3">
                                    <a className="linkalt" onClick={() => { this.filtarPdf(this, "preview_paradise") }}>
                                        Preview Paradise
                                    </a>
                                </div>

                                <div component="cell center" style={{textAlign:"center"}}small="6" medium="3" large="3">
                                    <a className="linkalt" onClick={() => { this.filtarPdf(this, "locations") }}>
                                    Locations
                                    </a>
                                </div>
                                <div component="cell center" style={{textAlign:"center"}}small="6" medium="3" large="3">
                                    <a className="linkalt" onClick={() => { this.filtarPdf(this, "group_benefits") }}>
                                        Group Benefits
                                    </a>
                                </div>

                                <div component="cell center" style={{textAlign:"center"}}small="6" medium="3" large="3">
                                    <a className="linkalt" onClick={() => { this.filtarPdf(this, "honeymoons_packages") }}>
                                        Honeymoon Packages
                                    </a>
                                </div>
                                <div component="cell center" style={{textAlign:"center"}}small="6" medium="3" large="3">
                                    <a className="linkalt" onClick={() => { this.filtarPdf(this, "aniversary_packages") }}>
                                    Anniversary Packages
                                    </a>
                                </div>
                                <div component="cell center" style={{textAlign:"center"}}small="6" medium="3" large="3">
                                    <a className="linkalt" onClick={() => { this.filtarPdf(this, "travel-agents") }}>
                                    Travel Agents
                                    </a>
                                </div>
                                <div component="cell center" style={{textAlign:"center"}}small="6" medium="3" large="3">
                                    <a className="linkalt" onClick={() => { this.filtarPdf(this, "offers") }}>
                                    Offers
                                    </a>
                                </div>
                                <div component="cell center" style={{textAlign:"center"}}small="6" medium="3" large="3">
                                    <a className="linkalt" onClick={() => { this.filtarPdf(this, "documents_required") }}>
                                        Documents Required
                                    </a>
                                </div>
                            </div>
                        </div>
    </div>*/}



                </div>
            </Layout>
        );

    }
}

export default withRouter(ResourceCenter);

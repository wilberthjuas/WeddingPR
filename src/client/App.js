import React, { Component, Fragment } from "react";
import { Redirect, Route, Router, Switch } from "react-router-dom";
import "./docs/sass/app.scss";
//import ReactGA from "react-ga";
import { createBrowserHistory } from "history";
import { hotjar } from "react-hotjar";
import { ServiceProvider } from "./app/Context";
import { ScrollToTop } from "./components";
import api from './app';

import {
   Home,
   CompBenefits,
   CompDestination,
   Componentwhydestinationwed,
   Componentpalaceresortzquiz,
   Comppersonaliyourday,
   CompHelpfulinspiringinfo,
   Planning,
   StepByStep,
   CheckList,
   GiftRegistry,
   HelpfulPlanning,
   ViewLandingPage,
   ViewReligious,
   ViewGallery,
   Offers,
   NextStep,
   OffersInsterna,
   DownloadBrochure,
   FAQ,
   ContactUs,
   CatalogView,
   CakeDetails,
   Destination,
   ViewVideos,
   ViewPhoto,
   ViewPhotoCouple,
   ViewTestimonials,
   BlogDetail,
   Blog,
   Sample,
   Resort,
   Tour,
   AmazingCollection,
   QuizResorts,
   QuizResortsDecor,
   QuizResortsExtras,
   QuizResortsFinish,
   Sitemap,
   Contactusland,
   Error404,
   ResourceCenter,
   Landingmainscreen,
   landingVowrenewalsV,
   Thankyou,
   WishList,
   LandingSouthAsian
} from "./views";

const history = createBrowserHistory();
history.listen(location => {
   /*ReactGA.initialize("UA-127556003-4");
   ReactGA.set({ page: location.pathname });
   ReactGA.pageview(location.pathname);*/
});

class App extends Component {

   async loadHotJar() {
      setTimeout(() => {
         hotjar.initialize(630323, 6);
      }, 10000);
   }


   constructor(props) {

      super(props);
      let urlActual = window.location.pathname.split("/");
      console.log(urlActual[1]);
      // if(urlActual[1] !== "es" && urlActual !== "en"){
      //    return <Route path="*" component={Error404} />
      // }

      this.state = {
         variable: "",
         versionlang: "",
         currentPage: {
            lang: urlActual,
            data: {
               currentStep: 0
            },
            setData: (key, value) => {
               let currentPage = this.state.currentPage;
               let pagedata = currentPage.data || {};
               pagedata[key] = value;
               currentPage.data = pagedata;
               this.setState({ currentPage: currentPage })
            },
            getData: (key) => this.state.currentPage.data != null ? this.state.currentPage.data[key] : {},
            removeData: (key) => this.state.currentPage.data != null ? delete this.state.currentPage.data[key] : {},
         },
      };
   }


   async getIP() {
      try {
         let ip2 = ""
         let response = await fetch('https://api.ipify.org');
         ip2 = await response.text();
         let country_list = ["CO", "AR", "BO", "CL", "CR", "CU", "EC", "SV", "GT", "HT", "HN", "NI", "PA", "PY", "PE", "DO", "UY", "VE", "MX"]
         let iso_get = "";

         setTimeout(() => {
            if (ip2 != "" && /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip2)) {
               api.getCountrybyIP(ip2)
                  .then(res => {
                     iso_get = res.data.country_code_iso_2
                     if (country_list.includes(iso_get)) {
                        this.setState({
                           versionlang: "/es"
                        })
                     } else {
                        this.setState({
                           versionlang: "/en"
                        })
                     }
                  }).catch(e => console.error(e));
            }
         }, 1000);

      } catch (e){
         console.log(e);
         this.setState({
            versionlang: "/en"
         })
      }
   }

   componentDidMount() {
      let urlActual = window.location.pathname.split("/");
      localStorage.langWeddings = urlActual[1]
      //if (sessionStorage.logged_in) {

      //}
      localStorage.langInt = urlActual[1] == "es" ? 2 : 1
      sessionStorage.langWeddings = urlActual[1] == "es" ? 2 : 1
      this.loadHotJar()
      //this.getIP()
   }

   render() {
      return (
         <Fragment>
            <ServiceProvider value={this.state}>
               <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
                  <ScrollToTop>
                     <main className="App">
                           <Switch>
                              <Redirect path="/" exact to={"/en"} />

                              <Route path="/:lang" exact component={Home} />

                              <Route path="/:lang/destination/:iddestination" exact component={Destination} />
                              {/* ES */}|

                              <Route path="/:lang/destino/:iddestination" exact component={Destination} />
                              <Route path="/:lang/our-resorts/:resortsid" excat component={Resort} />
                              <Route path="/:lang/our-resorts/:resortsid/:menu" excat component={Resort} />

                              {/* ES */}
                              <Route path="/:lang/nuestros-resorts/:resortsid" excat component={Resort} />
                              <Route path="/:lang/nuestros-resorts/:resortsid/:menu" excat component={Resort} />
                              <Route path="/:lang/destinationweddings" exact component={CompDestination} />
                              {/* ES */}
                              <Route path="/:lang/destinos-de-boda" exact component={CompDestination} />
                              <Route path="/:lang/destinationweddings/whydestinationweddings" exact component={Componentwhydestinationwed} />
                              {/* ES */}
                              <Route path="/:lang/destinos-de-boda/porque-una-boda-en-el-destino" exact component={Componentwhydestinationwed} />
                              <Route path="/:lang/destinationweddings/palaceresortzquiz" exact component={Componentpalaceresortzquiz} />
                              {/* ES */}
                              <Route path="/:lang/destinos-de-boda/resort-quiz" exact component={Componentpalaceresortzquiz} />

                              <Route path="/:lang/destinationweddings/personalize-your-day" exact component={Comppersonaliyourday} />
                              <Route path="/:lang/destinationweddings/personalize-your-day/:id" exact component={Comppersonaliyourday} />
                              {/* ES */}
                              <Route path="/:lang/destinos-de-boda/personaliza-tu-dia" exact component={Comppersonaliyourday} />
                              <Route path="/:lang/destinos-de-boda/personaliza-tu-dia/:id" exact component={Comppersonaliyourday} />


                              <Route path="/:lang/destinationweddings/personalize-your-day/:idcollection" exact component={AmazingCollection} />
                              <Route path="/:lang/collections/:idcollection" exact component={AmazingCollection} />
                              <Route path="/:lang/colecciones/:idcollection" exact component={AmazingCollection} />
                              {/* ES */}
                              <Route path="/:lang/destinos-de-boda/personaliza-tu-dia/:idcollection" exact component={AmazingCollection} />

                              {/*<Route path="/:lang/destinationweddings/helpfulinspiringinfo" exact component={CompHelpfulinspiringinfo} />*/}
                              {/* ES */}
                              <Route path="/:lang/destinos-de-boda/informacion-util" exact component={CompHelpfulinspiringinfo} />
                              <Route path="/:lang/complimentary-benefits" exact component={CompBenefits} />
                              <Route path="/:lang/group-benefits" exact component={CompBenefits} />
                              {/* ES */}
                              <Route path="/:lang/beneficios-complementarios" exact component={CompBenefits} />
                              <Route path="/:lang/offers" exact component={Offers} />
                              {/* ES */}
                              <Route path="/:lang/ofertas" exact component={Offers} />
                              <Route path="/:lang/offers/:offersId" exact component={OffersInsterna} />
                              {/* ES */}
                              <Route path="/:lang/ofertas/:offersId" exact component={OffersInsterna} />
                              <Route path="/:lang/planning" exact component={Planning} />
                              {/* ES */}
                              <Route path="/:lang/planeacion" exact component={Planning} />
                              <Route path="/:lang/planning/step-by-step" exact component={StepByStep} />
                              {/* ES */}
                              <Route path="/:lang/planeacion/paso-a-paso" exact component={StepByStep} />
                              <Route path="/:lang/planning/i-do-to-do" exact component={CheckList} />
                              {/* ES */}
                              <Route path="/:lang/planeacion/lista-de-pendientes-para-la-boda" exact component={CheckList} />
                              <Route path="/:lang/planning/get-in-the-know" exact component={HelpfulPlanning} />
                              {/* ES */}
                              <Route path="/:lang/planeacion/recursos" exact component={HelpfulPlanning} />
                              <Route path="/:lang/planning/read-all-about-it" exact component={DownloadBrochure} />
                              {/* ES */}
                              <Route path="/:lang/planeacion/brochure" exact component={DownloadBrochure} />
                              <Route path="/:lang/planning/giftregistry" exact component={GiftRegistry} />
                              {/* ES */}
                              <Route path="/:lang/planeacion/registro-de-regalos" exact component={GiftRegistry} />
                              <Route path="/:lang/religious-and-cultural-offerings" exact component={ViewReligious} />
                              <Route path="/:lang/religious-and-cultural-offerings/:typeWed" exact component={ViewReligious} />
                              {/* ES */}
                              <Route path="/:lang/ceremonias-religiosas-y-culturales" exact component={ViewReligious} />
                              <Route path="/:lang/ceremonias-religiosas-y-culturales/:typeWed" exact component={ViewReligious} />
                              <Route path="/:lang/gallery" exact component={ViewGallery} />
                              {/* ES */}
                              <Route path="/:lang/galeria" exact component={ViewGallery} />
                              <Route path="/:lang/real-weddings-gallery/:resort" exact component={ViewPhoto} />
                              {/* ES */}
                              <Route path="/:lang/galeria-de-bodas/:resort" exact component={ViewPhoto} />
                              <Route path="/:lang/real-weddings-gallery/:resort/:couple" exact component={ViewPhotoCouple} />
                              {/* ES */}
                              <Route path="/:lang/galeria-de-bodas/:resort/:couple" exact component={ViewPhotoCouple} />
                              <Route path="/:lang/real-weddings/testimonials" exact component={ViewTestimonials} />
                              {/* ES */}
                              <Route path="/:lang/testimonios" exact component={ViewTestimonials} />
                              <Route path="/:lang/real-weddings/videos" exact component={ViewVideos} />
                              {/* ES */}
                              <Route path="/:lang/videos" exact component={ViewVideos} />
                              <Route path="/:lang/blog" exact component={Blog} />
                              <Route path="/:lang/blog/:blogid" exact component={BlogDetail} />
                              <Route path="/:lang/faqs" exact component={FAQ} />

                              <Route path="/:lang/contact-us/:id" component={ContactUs} />
                              <Route path="/:lang/contact-us/" component={ContactUs} />
                              <Route path="/:lang/contact-preview" exact component={Contactusland} />
                              {/* ES */}
                              <Route path="/:lang/contacto-preview" exact component={Contactusland} />
                              <Route path="/:lang/contacto/:id" component={ContactUs} />
                              <Route path="/:lang/contacto" component={ContactUs} />

                              <Route path="/:lang/tours/:iddestination" exact component={Tour} />
                              <Redirect path="/:lang/catalog" exact to="/:lang/catalog/12" />
                              {/* ES */}
                              <Redirect path="/:lang/catalogo" exact to="/:lang/catalogo/12" />
                              <Route path="/:lang/catalog/:service" exact component={CatalogView} />
                              {/* ES */}

                              <Route path="/:lang/palaceresortsweddingswedinar" exact component={Landingmainscreen} />
                              <Route path="/:lang/vowrenewals" exact component={landingVowrenewalsV} />

                              {/* ES */}


                              <Route path="/:lang/catalogo/:service" exact component={CatalogView} />
                              <Route path="/:lang/sitemap" exact component={Sitemap} />
                              <Route path="/:lang/landingpage/:landingId" exact component={ViewLandingPage} />
                              <Route path="/:lang/take-next-step" exact component={NextStep} />
                              <Route path="/:lang/offers/preview-paradise/take-next-step" exact component={NextStep} />
                              <Route path="/:lang/da-el-siguiente-paso" exact component={NextStep} />
                              <Route path="/:lang/ofertas/conoce-el-paraiso/da-el-siguiente-paso" exact component={NextStep} />
                              <Route path="/:lang/cake/detail" exact component={CakeDetails} />
                              <Route path="/:lang/sample" exact component={Sample} />
                              <Route path="/:lang/quiz-resorts" exact component={QuizResorts} />
                              <Route path="/:lang/quiz-resorts/decor" exact component={QuizResortsDecor} />
                              <Route path="/:lang/quiz-resorts/extras" exact component={QuizResortsExtras} />
                              <Route path="/:lang/quiz-resorts/finish" exact component={QuizResortsFinish} />
                              <Route path="/:lang/404notfound" exact component={Error404} />
                              <Route path="/:lang/thank-you" exact component={Thankyou} />
                              <Route path="/:lang/downloadpdf" exact component={ResourceCenter} />
                              <Route path="/:lang/south-asian-weddings" exact component={LandingSouthAsian} />
                              <Route path="/:lang/WishList" exact component={WishList} />
                              <Route path="*" component={Error404} />

                        </Switch>
                     </main>
                  </ScrollToTop>
               </Router>
            </ServiceProvider>
         </Fragment>
      );
   }
}

export default App;

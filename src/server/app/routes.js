/**
 * @author Luis Enrique Huh Puc <lhuh@palaceresorts.com
 * @description ROUTER FILE
 */

/* * * * * * * * * * *
* Import Statements *
* * * * * * * * * * */
const express = require('express');
const multer = require('multer');
const CacheMiddleware = require('../middlewares/cache');
const HashMiddleware = require('../middlewares/auth');
const { makeRequest, PDFRequest } = require('./methods');
const { AuthServices, AuthPayment, AuthResetPassword } = require('../controllers/auth');
const UploadFile = require('../controllers/upload');
const Comments = require('../controllers/comments');
const Payment = require('../controllers/payment');
const Login = require('../controllers/login');
const Content = require('../controllers/content');
const Menu = require('../controllers/menu');
const GatewayEmail = require('../controllers/gatewayEmail');
const CrmClever = require('../controllers/crmClever')
const Country = require('../controllers/country')
const Shopping = require('../controllers/shopping');
const api = require('./endpoints');

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
     cb(null, '/tmp')
   },
   filename: function (req, file, cb) {
     cb(null, file.fieldname + '-' + Date.now())
   }
});
 
const upload = multer({ storage: storage });

/* * * * **
* Routes *
* * * * **/
const router = express();
router.use(express.json());
// Home
router.get('/', (req, res) => {
   res.send({
      error: false,
      data: null,
      message: 'Welcome to services'
   })
});

// Login
router.post('/login/', (req, res) => AuthServices(req, res, api.requestLogin()))
// Hash Data
router.post('/login/hash', HashMiddleware, (req, res) => new Login(req, res).getDataHash());
// Reset Password
router.put('/reset-password/', (req, res) => AuthResetPassword(req, res, api.requestResetPassword())),
// Cancel reset password
router.put('/skip-password/', (req, res) => AuthResetPassword(req, res, api.requestResetPassword(), true)),
// Translations
router.get('/langs/:code', (req, res) => makeRequest(req, res, api.getLangPage(req.params.code)));
// Do payment
router.post('/payment/', CacheMiddleware, (req, res) => new Payment(req, res).save());
// Hash Data
router.post('/payment/hash', HashMiddleware, (req, res) => new Payment(req, res).getDataHash());
// Exchange
router.get('/exchange', CacheMiddleware, (req, res) => new Payment(req, res).getExchangeRate());
// Upload File
router.post('/upload/', CacheMiddleware, upload.single('cover'), (req, res) => UploadFile(req, res, api.uploadCover()));
// Business Unit
router.get('/categories/:code', CacheMiddleware, (req, res) => makeRequest(req, res, api.getBusinessUnit(req.params.code)));
// Services per Business Unit
router.get('/categories/services/:code/:propiedad', CacheMiddleware, (req, res) => makeRequest(req, res, api.getServicesFromBusinessUnit(req.params.code, req.params.propiedad)));
// Tags
router.get('/categories/tags/:code', CacheMiddleware, (req, res) => makeRequest(req, res, api.getTagsFromServiceType(req.params.code)));
// Services by ID Tag
router.get('/categories/tags/services/:tagcode/:categorycode', CacheMiddleware, (req, res) => makeRequest(req, res, api.getServicesFromTag(req.params.tagcode, req.params.categorycode)));
// Events summary balance
router.get('/events/sums/:code', CacheMiddleware, (req, res) => makeRequest(req, res, api.getEventsSummary(req.params.code)));
// Events dates formatted
router.get('/events/dates/:code', CacheMiddleware, (req, res) => makeRequest(req, res, api.getEventsDate(req.params.code)));
// Events dates formatted
router.get('/events/:code', CacheMiddleware, (req, res) => makeRequest(req, res, api.getEvents(req.params.code)));
// Rooming List
router.get('/events/rooming/:hotelcode/:blockcode', CacheMiddleware, (req, res) => makeRequest(req, res, api.getEventsRoomingList(req.params.hotelcode, req.params.blockcode)));
// Event Locations
router.get('/events/locations/:code', CacheMiddleware, (req, res) => makeRequest(req, res, api.getLocationsEvent(req.params.code)));
// Services per Locations
router.get('/events/services/:eventcode/:locationcode', CacheMiddleware, (req, res) => makeRequest(req, res, api.getServicesEvent(req.params.eventcode, req.params.locationcode)));
// Service
router.get('/services/:code', CacheMiddleware, (req, res) => makeRequest(req, res, api.getService(req.params.code)));
// Service get comments
router.get('/history/comments/:code', CacheMiddleware, (req, res) => new Comments(req, res).getHistory());
// Service post comments
router.post('/comments', CacheMiddleware, (req, res) => new Comments(req, res).saveComment());
// Service get comments by id
router.get('/comments/:code', CacheMiddleware, (req, res) => makeRequest(req, res, api.getCommentService(req.params.code)));
// Service update comments
router.put('/comments/:code', CacheMiddleware, (req, res) => makeRequest(req, res, api.updateCommentService(req.params.code)));
// Customs Services
router.get('/customs', CacheMiddleware, (req, res) => makeRequest(req, res, api.getCustomServices()));
// Custom Service per category
router.get('/customs/categories/:code', CacheMiddleware, (req, res) => makeRequest(req, res, api.getCustomServicesFromBusinessUnit(req.params.code)));
// Custom details Service per category
router.get('/customs/details/:code', CacheMiddleware, (req, res) => makeRequest(req, res, api.getCustomDetailsServicesFromBusinessUnit(req.params.code)));
// New Custom Service per category
router.post('/customs', CacheMiddleware, (req, res) => makeRequest(req, res, api.newCustomsService()));
// Ids from services
router.get('/events/tags/:code', CacheMiddleware, (req, res) => makeRequest(req, res, api.getTagsIdServices(req.params.code)));
// Get terms
router.get('/terms/:langcode/:codes', CacheMiddleware, (req, res) => makeRequest(req, res, api.getServicesTerms(req.params.langcode, req.params.codes)));
// Get promotions
router.get('/promotions/:code', CacheMiddleware, (req, res) => makeRequest(req, res, api.getPromotions(req.params.code)));
// Get purchase
router.get('/purchase/:code', CacheMiddleware, (req, res) => makeRequest(req, res, api.getPurchase(req.params.code)));
// Get List of Business Unit
router.get('/getBusinessUnits', CacheMiddleware, (req, res) => makeRequest(req, res, api.getBusinessUnits()));
router.get('/getBusinessUnit/:id', CacheMiddleware, (req, res) => makeRequest(req, res, api.getBusinessUnit(req.params.id)));
// PDF Detail Sheet
router.get('/detailsheetpdf/:languageid/:groupid', CacheMiddleware, (req, res) => PDFRequest(req, res, api.getDetailSheetPDF(req.params.languageid, req.params.groupid)));
// Personalized Services With Images
router.get('/getPersonalizedServices/:limit', CacheMiddleware, (req, res) => makeRequest(req, res, api.getPersonalizedServices(req.params.limit)));
// Personalized Services Search Word By Category
router.get('/searchServicesByCategory/:limit/:search/:idcategory', CacheMiddleware, (req, res) => makeRequest(req, res, api.searchServicesByCategory(req.params.limit, req.params.search, req.params.idcategory))),
router.post('/getMenu', (req, res) => new Menu(req,res).getMenu());

router.post('/sendEmail', (req, res) => new GatewayEmail(req,res).sendEmail());

router.post('/loginEmail', (req, res) => new GatewayEmail(req,res).loginEmail());

router.post('/getSingleContent', (req, res) => new Content(req,res).getSingleContent());

router.post('/sendCrm',CacheMiddleware, (req, res) => new CrmClever(req,res).sendCrm());

router.post('/sendNextStep',CacheMiddleware, (req, res) => new CrmClever(req,res).sendNextStep());

router.post('/getCountries',CacheMiddleware, (req, res) => new Country(req,res).getCountries());

router.post('/getStatesByCountry',CacheMiddleware, (req, res) => new Country(req,res).getStatesByCountry());

router.get('/getServiceByProperty/:property/:service', CacheMiddleware, (req, res) => makeRequest(req, res, api.getServiceByProperty(req.params.property, req.params.service)));

router.get('/getProperties', CacheMiddleware, (req, res) => makeRequest(req, res, api.getProperties()));
router.get('/getCountrybyLang/:lang', CacheMiddleware, (req, res) => makeRequest(req, res, api.getCountrybyLang(req.params.lang)));
router.get('/getStatesbyLang/:iso/:lang', CacheMiddleware, (req, res) => makeRequest(req, res, api.getStatesbyLang(req.params.iso,req.params.lang)));
router.get('/getCountrybyIP/:ip', (req, res) => makeRequest(req, res, api.getCountrybyIP(req.params.ip)));
router.post('/sendDataCRM', CacheMiddleware, (req, res) => makeRequest(req, res, api.sendDataCRM()));

//Shopping Cart
router.post('/sendShoppingCart', CacheMiddleware, (req, res) => new Shopping(req, res).sendShopping(req));
router.get('/getShoppingCart/:idevent/:hotel', CacheMiddleware, (req, res) => makeRequest(req, res, api.getShoppingCart(req.params.idevent,req.params.hotel)));
router.post('/postComment', CacheMiddleware, (req, res) => new Shopping(req, res).postComment(req));

   /* * * * * * * * * * * **
   * Export Module Router *
   * * * * * * * * * * * **/
   module.exports = router;
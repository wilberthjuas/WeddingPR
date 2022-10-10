/**
 * @author Luis Enrique Huh Puc <lhuh@palaceresorts.com>
 * @description HOSTS FILE
 */

 // Concatena los parametros pasados
const formatt = (...url) => typeof url.join === 'function' ? url.join("/") : url;

 /* * * * * * * * *
 * Hosts Address *
* * * * * * * * */
const $HOSTS = {
    dev: {
        env: 'development',
        apiAuth: (...d) => formatt('http://auth-api-qa.clever.palace-resorts.local', ...d),
        apiContracts: (...d) => formatt('http://contracts-api-qa.clever.palace-resorts.local', ...d),
        apiCore: (...d) => formatt('http://core-api-qa.clever.palace-resorts.local', ...d),
        apiEvents: (...d) => formatt('http://dev.clever-api-events.local', ...d),
        apiFinances: (...d) => formatt('http://fin-api-qa.clever.palace-resorts.local', ...d),
        apiFramework: (...d) => formatt('http://frm-api-qa.clever.palace-resorts.local', ...d),
        apiProductions: (...d) => formatt('http://10.8.18.172', ...d),
        apiProducts: (...d) => formatt('http://dev.clever-api-products.local', ...d),
        apiLeads: (...d) => formatt('http://10.8.20.76', ...d),
        apiEmailGateway: (...d) => formatt('http://emailgateway-api.palace-resorts.local',...d),
        apiCRM: (...d) => formatt('http://crm-qa.clever.palace-resorts.local',...d),
        apiBE: (...d) => formatt('http://bengine-api-qa.clever.palace-resorts.local',...d)
    },
    qas: {
        env: 'qas',
        apiAuth: (...d) => formatt('http://auth-api-qa.clever.palace-resorts.local', ...d),
        apiContracts: (...d) => formatt('http://contracts-api-qa.clever.palace-resorts.local', ...d),
        apiCore: (...d) => formatt('http://core-api-qa.clever.palace-resorts.local', ...d),
        apiEvents: (...d) => formatt('http://events-api-qa.clever.palace-resorts.local', ...d),
        apiFinances: (...d) => formatt('http://fin-api-qa.clever.palace-resorts.local', ...d),
        apiFramework: (...d) => formatt('http://frm-api-qa.clever.palace-resorts.local', ...d),
        apiProductions: (...d) => formatt('http://10.8.18.172', ...d),
        apiProducts: (...d) => formatt('http://products-api-qa.clever.palace-resorts.local', ...d),
        apiLeads: (...d) => formatt('http://10.8.20.76', ...d),
        apiEmailGateway: (...d) => formatt('http://emailgateway-api.palace-resorts.local',...d),
        apiCRM: (...d) => formatt('http://crm-qa.clever.palace-resorts.local',...d),
        apiBE: (...d) => formatt('http://bengine-api-qa.clever.palace-resorts.local',...d)
    },
    pro: {
        env: 'production',
        apiAuth: (...d) => formatt('http://auth-api.clever.palace-resorts.local', ...d),
        apiContracts: (...d) => formatt('http://contracts-api.clever.palace-resorts.local', ...d),
        apiCore: (...d) => formatt('http://core-api.clever.palace-resorts.local', ...d),
        apiEvents: (...d) => formatt('http://events-api.clever.palace-resorts.local', ...d),
        apiFinances: (...d) => formatt('http://finance-api.clever.palace-resorts.local', ...d),
        apiFramework: (...d) => formatt('http://frm-api.clever.palace-resorts.local', ...d),
        apiProductions: (...d) => formatt('http://10.8.20.52', ...d),
        apiProducts: (...d) => formatt('http://products-api.clever.palace-resorts.local', ...d),
        apiLeads: (...d) => formatt('http://10.8.20.76', ...d),
        apiEmailGateway: (...d) => formatt('http://emailgateway-api.palace-resorts.local',...d),
        apiCRM: (...d) => formatt('https://clever-crm.palaceresorts.com',...d),
        apiBE: (...d) => formatt('http://bengine-api.clever.palace-resorts.local',...d)
    }
}

 /* * * * * * * * *
 * Hosts Context *
* * * * * * * * */
const _HOSTS = (context = 'dev') => {

    return $HOSTS[context];
};

 /* * * * * * * * * * * *
 * Export Module HOSTS *
* * * * * * * * * * * */
module.exports = _HOSTS;
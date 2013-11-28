/**
 * ADLanguageController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {


  /**
   * Action blueprints:
   *    `/adlanguage/labelConfigFile`
   *    route: /site/label/:context (applicationkey)
   */
   labelConfigFile: function (req, res) {

console.log(sails);
console.log(sails.controllers);

       var context = req.param('context');

//// TODO: pull user's default language from their session and save to template:
       var currLangCode = 'en';  // req.session.languageCode || req.session.preferences.defaultLanguage;

//// TODO: pull the query logic out into a service that we can test easily.
////       the controller is just for calling the service with it's parameters and then
////       sending back the results to the client

       SiteMultilingualLabel.find({label_context:context, language_code:currLangCode})
       .then(function(data){

           // prepare proper content type headers
           res.setHeader('content-type', 'application/javascript');


           // render this view with data
           return res.view({
               langCode:currLangCode,
               labels: data,
               layout:false
           });
       })
       .fail(function(err){
           console.log(err);
           res.error(err);
       })

  },




  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to ADLanguageController)
   */
  _config: {}


};

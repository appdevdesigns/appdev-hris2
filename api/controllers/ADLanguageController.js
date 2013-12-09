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

       var context = req.param('context');

//// TODO: pull user's default language from their session and save to template:
       var currLangCode = 'en';  // req.session.languageCode || req.session.preferences.defaultLanguage;

       ADCore.labelsForContext(context, currLangCode, function(data) {

           // successful operation:

           // prepare proper content type headers
           res.setHeader('content-type', 'application/javascript');

           // render this view with data
           return res.view({
               langCode:currLangCode,
               labels: data,
               layout:false
           });

       }, function(err) {

           // error handler
           console.log(err);
           res.error(err);
       });


  },




  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to ADLanguageController)
   */
  _config: {}


};

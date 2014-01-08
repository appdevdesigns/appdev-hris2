/**
 * OpsPortalConfigController
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
   * Overrides for the settings in `config/controllers.js`
   * (specific to OpsPortalConfigController)
   */

  _config: {}

  // Fixture Data:
  // Use this for initial design and testing
  , config:function(req, res) {
      var data = {
           areas:[
                  { icon:'fa-user', key:'profile', label:'Profile'},
                  { icon:'fa-wrench', key:'hradmin', label:'HR Admin'},
                  { icon:'fa-question', key:'help', label:'Help'}

           ],
           tools:[
                  { area:'hradmin', controller:'HRAdminObject', label:'Configure Objects'},
           ]
        };
      ADCore.comm.success(res, data);
  }




  , requirements:function(req, res) {
      res.json({ status:'Hey!' })
  }




};

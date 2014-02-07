/**
 * GMAReportsController
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
   * (specific to GMAReportsController)
   */

  _config: {}

  // Fixture Data:
  // Use this for initial design and testing
  // url:get  /gmamatrix/reports
  , reports:function(req, res) {

      var data = [

        {
           id: 1,
           name : "name[1]",
           createdAt:"2013/12/01"
        },

        {
           id: 2,
           name : "name[2]",
           createdAt:"2013/12/01"
        },

        {
           id: 3,
           name : "name[3]",
           createdAt:"2013/12/01"
        },

      ];

      ADCore.comm.success(res, data);
  }

  , create:function(req, res) {
      ADCore.comm.success(res,{ status:'created' });
  }

  , update:function(req, res) {
      ADCore.comm.success(res,{status:'updated'});
  }

  , destroy:function(req, res) {
      ADCore.comm.success(res,{status:'destroyed'});
  }


};

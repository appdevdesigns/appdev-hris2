/**
 * APIObjectController
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
   * (specific to APIObjectController)
   */
  _config: {}

  , find:function(req, res) {
      res.json([
        {
           id: 1,
           object_name : 'Person',
           object_key  : 'person',
           object_table    : 'hris_person',
           object_description  : 'The person object tracks individual people.',
           object_icon : 'fa-user',
           createdAt:'2013/12/01'
        },
        {
            id: 2,
            object_name : 'Family',
            object_key  : 'family',
            object_table    : 'hris_family',
            object_description  : 'A family represents a group of people.',
            object_icon : 'fa-map-marker',
            createdAt:'2013/12/02'
         },
         {
             id: 3,
             object_name : 'Passports',
             object_key  : 'passport',
             object_table    : 'hris_passport',
             object_description  : 'Passport object contains information about a person\'s travel documents.',
             object_icon : 'fa-road',
             createdAt:'2013/12/03'
          }
      ])
  }

  , create:function(req, res) {
      res.json({ status:'created' })
  }

  , update:function(req, res) {
      res.json({status:'updated'})
  }

  , destroy:function(req, res) {
      res.json({status:'destroyed'})
  }


};

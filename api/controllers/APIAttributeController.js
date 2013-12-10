/**
 * APIAttributeController
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
   * (specific to APIAttributeController)
   */

  _config: {}

  // Fixture Data:
  // Use this for initial design and testing
  , find:function(req, res) {
      res.json([

        {
           id: 1,
           attributeset_id : 1,
           attribute_label : "Given Name",
           attribute_question : "Enter the given name",
           attribute_column : "person_givenname",
           attribute_datatype : "text",
           meta : "",
           attribute_permission : "",
           attribute_uniqueKey : 0,
           createdAt:"2013/12/01"
        },

        {
           id: 2,
           attributeset_id : 1,
           attribute_label : "Family Name",
           attribute_question : "Enter the family name",
           attribute_column : "person_surname",
           attribute_datatype : "text",
           meta : "",
           attribute_permission : "",
           attribute_uniqueKey : 0,
           createdAt:"2013/12/01"
        },

        {
           id: 3,
           attributeset_id : 1,
           attribute_label : "Preferred Name",
           attribute_question : "Enter their preferred name",
           attribute_column : "person_preferredname",
           attribute_datatype : "text",
           meta : "",
           attribute_permission : "",
           attribute_uniqueKey : 0,
           createdAt:"2013/12/01"
        },

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

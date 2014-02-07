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
  // url:get  /gmamatrix/assignments
  , assignments:function(req, res) {

      var data = [

          {
              nodeId    : 1,
              nodeName  : "Assignment 1"
          },
          {
              nodeId    : 2,
              nodeName  : "Assignment 2"
          },
          {
               nodeId    : 3,
               nodeName  : "Assignment 3"
          }

      ];

      ADCore.comm.success(res, data);
  }



  // Fixture Data:
  // Use this for initial design and testing
  // url:get  /gmamatrix/reports?nodeId=x
  , reports:function(req, res) {

      var data = [

        {
           reportId  : 1,
           nodeId    : 1,
           nodeName  : "Assignment 1",
           startDate : "2013/12/01",
           endDate   : "2013/12/31"
        },

        {
            reportId  : 2,
            nodeId    : 1,
            nodeName  : "Assignment 1",
            startDate : "2014/1/01",
            endDate   : "2014/1/31"
         },

         {
             reportId  : 3,
             nodeId    : 1,
             nodeName  : "Assignment 1",
             startDate : "2014/2/01",
             endDate   : "2014/2/31"
          }

      ];

      ADCore.comm.success(res, data);
  }



  // url:get  /gmamatrix/measurements?reportId=x
  , measurements:function(req, res) {

      var data = {
              'slm': [
                  {
                      reportId:1,
                      measurementId:1,
                      measurementName:'measurement name slm 1',
                      measurementDescription:'description slm 1',
                      measurementValue:1
                  },
                  {
                      reportId:1,
                      measurementId:2,
                      measurementName:'measurement name slm 2',
                      measurementDescription:'description slm 2',
                      measurementValue:2
                  },
                  {
                      reportId:1,
                      measurementId:3,
                      measurementName:'measurement name slm 3',
                      measurementDescription:'description slm 3',
                      measurementValue:3
                  }
              ],
              'llm': [
                      {
                          reportId:1,
                          measurementId:4,
                          measurementName:'measurement name llm 4',
                          measurementDescription:'description llm 4',
                          measurementValue:4
                      },
                      {
                          reportId:1,
                          measurementId:5,
                          measurementName:'measurement name llm 5',
                          measurementDescription:'description llm 5',
                          measurementValue:5
                      },
                      {
                          reportId:1,
                          measurementId:6,
                          measurementName:'measurement name llm 6',
                          measurementDescription:'description llm 6',
                          measurementValue:6
                      }
                  ]
      };

      ADCore.comm.success(res, data);
  }


};

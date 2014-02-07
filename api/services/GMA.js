
// if on server
if (typeof process != 'undefined') {
    var AD, async, $;
}



var setup = function() {
    if (sails) {
        AD = ADCore;
        async = require('async');
        console.log('GMA server setup...');
    } else {
        // nope, still not ready, so wait some more.
        setImmediate(setup);
    }
};





/************************************************************************/
/**
 * @class GMA
 * Joshua Chan <joshua@appdevdesigns.net>
 *
 *  Dependencies:
 *    - jQuery
 *    - async
 *
 */

var GMA = function (opts) {
    var defaults = {
        gmaBase: 'http://gma.example.com/',
        casURL: 'https://signin.example.com/cas',
        showBusyAnim: function() {},
        hideBusyAnim: function() {}
    };
    this.opts = $.extend(defaults, opts);

    this.isLoggedIn = false;
    this.renId = null;
    this.GUID = null;
    this.isLoading = 0;
}


/**
 * Wrapper for jQuery.ajax(), used internally
 */
GMA.prototype.request = function (opts) {
    this.opts.showBusyAnim();
    this.isLoading += 1;

    var self = this;
    var dfd = $.ajax({
        url: self.opts.gmaBase + opts.path,
        method: opts.method,
        data: (typeof opts.data != 'undefined') ?
                JSON.stringify(opts.data) : opts.data,
        dataType: 'json',
        contentType: 'application/json'
    })
    .done(function(){
        self.isLoading -= 1;
        if (self.isLoading <= 0) {
            self.opts.hideBusyAnim();
        }
    });
    return dfd;
};

// if on server
if (typeof process != 'undefined') {
    module.exports = GMA;
    setImmediate(setup);
}

/**
 * @function login
 *
 * Uses the CAS RESTful interface to log in to the GMA site.
 * Further requests to GMA will be authenticated because of the browser
 * cookie used by jQuery.ajax().
 *
 * @param string username
 * @param string password
 * @return jQuery Deferred
 */
GMA.prototype.login = function (username, password) {
    var tgt;
    var st;
    var dfd = $.Deferred();
    var self = this;
    var gmaHome = self.opts.gmaBase + '?q=node&destination=node';

    async.series([

        // Step 0: Make sure we are not already logged in
        function(next){
            if (self.isLoggedIn) {
                self.logout()
                .then(function(){ next() });
            } else {
                next();
            }
        },
        // Step 1: Get the TGT
        function(next){
            $.ajax({
                url: self.opts.casURL + "/v1/tickets",
                method: "POST",
                cache: false,
                data: { username: username, password: password }
            })
            .then(function(data, textStatus, res){
                tgt = res.getResponseHeader('Location');
                next();
            })
            .fail(function(res, textStatus, err){
                if (err) {
                    next(err);
                } else {
                    next(new Error(textStatus + ': ' + res.status));
                }
            });
        },
        // Step 2: Get the ST
        function(next){
            $.ajax({
                url: tgt,
                method: "POST",
                data: { service: gmaHome }
            })
            .then(function(data, textStatus, res){
                st = data;
                next();
            })
            .fail(function(res, textStatus, err){
                next(err);
            });
        },
        // Step 3: Log in to GMA
        function(next){
            var finalURL = gmaHome + "&ticket=" + st;
            $.ajax({
                url: finalURL,
                method: "GET"
            })
            .then(function(data, textStatus, res){
                next();
            })
            .fail(function(res, textStatus, err){
                next(err);
            });
        },
        // Step 4: Get user info
        function(next){
            self.getUser()
            .then(function(){ next() })
            .fail(function(err){ next(err) });
        }

    ], function(err){
        if (err) {
            // All failures from above are caught here
            dfd.reject(err);
        } else {
            dfd.resolve();
        }
    });

    return dfd;
}


/**
 * @function getUser
 *
 * @return jQuery Deferred
 *      resolves with parameter `ren` {
 *          renId: int,
 *          renPreferredName: string,
 *          GUID: string
 *      }
 */
GMA.prototype.getUser = function () {
    var dfd = $.Deferred();
    var self = this;

    self.request({
        path: '?q=gmaservices/gma_user&type=current',
        method: 'GET'
    })
    .then(function(data, textStatus, res){
        if (data.success) {
            var ren = data.data[0];
            self.preferredName = ren.preferredName;
            self.renId = ren.renId;
            self.GUID = ren.GUID;
            dfd.resolve(ren);
        }
        else {
            dfd.reject(new Error(data.error.errorMessage));
        }
    })
    .fail(function(res, textStatus, err){
        dfd.reject(err);
    });

    return dfd;
}


/**
 * @function getAssignments
 *
 * Delivers the GMA nodes that the user is assigned to.
 *
 * @return jQuery Deferred
 *      resolves with two parameters
 *      - assignmentsByID { 101: "Assign1", 120: "Assign2", ... }
 *      - assignmentsByName { "Assign1": 101, "Assign2": 120, ... }
 */
GMA.prototype.getAssignments = function () {
    var dfd = $.Deferred();
    var self = this;

    self.request({
        path: '?q=gmaservices/gma_user/'
                + self.renId
                + '/assignments/director',
        method: 'GET'
    })
    .then(function(data, textStatus, res){
        if (data.success) {
            // Create two basic lookup objects indexed by nodeId and by name
            var assignmentsByID = {};
            var assignmentsByName = {};
            if (data.data.director) {
                for (var i=0; i<data.data.director.length; i++) {
                    var nodeId = data.data.director[i].nodeId;
                    var shortName = data.data.director[i].shortName;
                    assignmentsByID[nodeId] = shortName;
                    assignmentsByName[shortName] = nodeId;
                }
            }
            dfd.resolve(assignmentsByID, assignmentsByName);
        } else {
            dfd.reject(new Error(data.error.errorMessage));
            console.log(data);
        }
    })
    .fail(function(res, textStatus, err){
        dfd.reject(err);
    });

    return dfd;
}



/**
 * @function getReportsForNode
 *
 * Delivers an array of up to ten Report objects for unsubmitted reports within
 * the specified node.
 *
 * @param int nodeId
 * @return jQuery Deferred
 */
GMA.prototype.getReportsForNode = function (nodeId) {
    var dfd = $.Deferred();
    var self = this;

    self.request({
        path: '?q=gmaservices/gma_directorReport/searchOwn',
        method: 'POST',
        data: {
            nodeId: [nodeId],
            maxResult: 10,
            submitted: false
        }
    })
    .then(function(data, textStatus, res){
        if (data.success) {

            var reports = [];
            for (var i=0; i<data.data.directorReports.length; i++) {
                var reportId = data.data.directorReports[i].directorReportId;
                var nodeName = data.data.directorReports[i].node.shortName;
                reports.push(new Report({
                    gma: self,
                    reportId: data.data.directorReports[i].directorReportId,
                    nodeId: nodeId,
                    nodeName: data.data.directorReports[i].node.nodeName,
                    startDate: data.data.directorReports[i].startDate,
                    endDate: data.data.directorReports[i].endDate
                }));
            }
            dfd.resolve(reports);

        } else {
            dfd.reject(new Error(data.error.errorMessage));
            console.log(data);
        }
    })
    .fail(function(res, textStatus, err){
        dfd.reject(err);
    });

    return dfd;
}



/**
 * @function logout
 *
 * Logs out of the Drupal website that GMA is on.
 *
 * @return jQuery Deferred
 */
GMA.prototype.logout = function () {
    var dfd = $.Deferred();
    var self = this;

    self.request({
        path: '?q=logout',
        method: 'GET'
    })
    .then(function(){
        self.isLoggedIn = false;
        self.renId = null;
        self.GUID = null;
        dfd.resolve();
    })
    .fail(function(res, status, err){
        dfd.reject(err);
    });

    return dfd;
}



/************************************************************************/
/**
 * @class Report
 */

var Report = function(data) {

    this.gma = data.gma;

    this.reportId = data.reportId;
    this.nodeId = data.nodeId;
    this.nodeName = data.nodeName;
    this.startDate = data.startDate;
    this.endDate = data.endDate;

}


/**
 * @function measurements
 *
 * Delivers a bunch of Measurement objects in this format:
 * {
 *     "Strategy Name 1": [
 *          Measurement1.1,
 *          Measurement1.2,
 *          ...
 *      ],
 *      "Strategy Name 2": [
 *          Measurement2.1,
 *          Measurement2.2,
 *          ...
 *      ],
 *      ...
 * }
 *
 * @return jQuery Deferred
 */
Report.prototype.measurements = function () {
    var dfd = $.Deferred();
    var self = this;

    self.gma.request({
        path: '?q=gmaservices/gma_directorReport/'
                + self.reportId + '/numeric',
        method: 'GET'
    })
    .then(function(data, textStatus, res) {
        if (data.success) {

            // Parse through the layers of JSON structure
            // and make our own structure that suits us better.
            var results = {};

            var numerics = data.data.numericMeasurements;
            // 1st layer is an array of objects
            for (var i=0; i<numerics.length; i++) {
                var strategy = numerics[i];
                // 2nd layer is an object with a single property
                for (var strategyName in strategy) {
                    var measurements = strategy[strategyName];
                    results[strategyName] = [];
                    // 3rd layer is an array of objects
                    for (var j=0; j<measurements.length; j++) {
                        var info = measurements[j];
                        results[strategyName].push(
                            new Measurement({
                                gma: self.gma,
                                reportId: self.reportId,
                                measurementId: info.measurementId,
                                measurementName: info.measurementName,
                                measurementDescription: info.measurementDescription,
                                measurementValue: info.measurementValue
                            })
                        );
                    }
                }
            }

            dfd.resolve(results);

        } else {
            dfd.reject(new Error(data.error.errorMessage));
        }
    })
    .fail(function(res, textStatus, err) {
        dfd.reject(err);
    });

    return dfd;
}


Report.prototype.period = function () {
    var dfd = $.Deferred();
    dfd.resolve(this.startDate);
    return dfd;
}



/************************************************************************/
/**
 * @class Measurement
 */

var Measurement = function (data) {
    self.gma = data.gma;
    delete data.gma;

    var defaults = {
        reportId: 0,
        measurementId: 0,
        measurementName: "Measurement",
        measurementDescription: "This is a GMA measurement",
        measurementValue: 0
    };
    this.data = $.extend(defaults, data);
}

Measurement.prototype.label = function () {
    return this.data.measurementName;
}

Measurement.prototype.id = function () {
    return this.data.measurementId;
}

Measurement.prototype.value = function (val) {
    if (typeof val != 'undefined') {
        return this.data.measurementValue = val;
    }
    return this.data.measurementValue;
}

Measurement.prototype.save = function () {
    var dfd = $.Deferred();
    var self = this;

    self.gma.request({
        path: '?q=gmaservices/gma_directorReport/'
                + self.data.reportId,
        method: 'PUT',
        data: [
            {
                measurementId: self.data.measurementId,
                type: 'numeric',
                value: self.data.measurementValue
            }
        ]
    })
    .then(function(data, status, res) {
        if (data.success) {
            dfd.resolve();
        } else {
            dfd.reject(new Error(data.error.errorMessage));
        }
    })
    .fail(function(res, status, err) {
        dfd.reject(err);
    });

    return dfd;
}


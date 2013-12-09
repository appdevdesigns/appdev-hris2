/**
 * isAuthenticated
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = {

        labelsForContext: function(context, code, success, error) {

            SiteMultilingualLabel.find({label_context:context, language_code:code})
            .then(function(data){

                success(data);
            })
            .fail(function(err){

                error(err);
            })
        }
};

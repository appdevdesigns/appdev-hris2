/**
 * APIAttribute
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  adapter:"mysql",



  attributes: {
  	
  	/* e.g.
  	nickname: 'string'
  	*/
    
    attributeset_id	: 'INTEGER',


    attribute_label	: 'STRING',


    attribute_question	: 'STRING',


    attribute_column	: 'STRING',


    attribute_datatype	: 'STRING',


    meta	: 'STRING',


    attribute_permission	: 'STRING',


    attribute_uniqueKey	: 'INTEGER'
  }

};

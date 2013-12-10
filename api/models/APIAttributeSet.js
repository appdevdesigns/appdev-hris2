/**
 * APIAttributeSet
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

    type_id	: 'INTEGER',

    object_id : 'INTEGER',


    attributeset_key	: 'STRING',


    attributeset_pkey	: 'STRING',


    attributeset_table	: 'STRING',


    attributeset_relation	: 'STRING',


    attributeset_uniqueKey	: 'INTEGER',


    attributeset_icon	: 'STRING'
  }

};

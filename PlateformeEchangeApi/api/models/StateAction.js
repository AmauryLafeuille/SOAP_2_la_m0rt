/**
* StateAction.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
      stateAction: {
            type: 'int',
            required: true,
            unique:true,
        },
        action: {
            model: 'Action',
        },
  }
};


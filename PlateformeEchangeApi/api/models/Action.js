/**
* Action.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
        vehicle: {
            model: 'Vehicle',
        },
        driver: {
            model: 'User',
        },
        repairman: {
            model: 'User',
        },
        stateAction :{
        	model: 'StateAction',
        }
  }
};


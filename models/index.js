var _ = require('lodash');
var cartography = require('cartography');
var auth = require('auth');



module.exports = _.extend(
  cartography.models,
  auth.models,
  {
    User: require('./user'),
    Relationship: require('./relationship'),
    Situation: require('./situation')
  }
);


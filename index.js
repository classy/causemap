var config = require('./config');


try {
  config.set(require('./local'));
} catch(e) {}


module.exports = {
  fetch: require('./fetch'),
  create: require('./create'),
  modify: require('./modify'),
  list: require('./list'),
  config: config,
  _ops: require('./ops')
}

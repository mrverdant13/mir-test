const { v4: uuid } = require('uuid');

function reqIdSetter(req, _, next) {
  req.id = uuid();
  next();
}

module.exports = reqIdSetter;

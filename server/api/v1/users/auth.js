const { sign } = require('jsonwebtoken');

const {
  jwt: { expiration: defaultExpiration, secret },
} = require('../../../../config');

exports.buildToken = (payload = {}, expiration = defaultExpiration) => {
  const jwt = sign(payload, secret, { expiresIn: expiration });
  return jwt;
};

require('dotenv').config();
const CognitoExpress = require('cognito-express');
const constants = require('../constants');

const cognitoExpress = new CognitoExpress({
  region: process.env.AWS_COGNITO_REGION,
  cognitoUserPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
  tokenUse: 'access',
  tokenExpiration: process.env.AWS_COGNITO_TOKEN_EXPIRATION,
});

module.exports = function authenticate(req, res, next) {
  let accessTokenFromClient = req.headers['authorization'];
  if (!accessTokenFromClient)
    return res
      .status(401)
      .json({ error: { message: 'Access Token missing from header' } });
  cognitoExpress.validate(accessTokenFromClient.split(' ')[1], function (
    err,
    response
  ) {
    if (err) {
      return res.status(401).json({ error: err });
    } else {
      req.user_id = !!response.username
        ? response.username
        : constants.SYSTEM_USERNAME;
      next();
    }
  });
};

require('dotenv').config();

import util = require('util');

export default {
  API_NAME: process.env.API_NAME,
  NODE_ENV: process.env.NODE_ENV,
  DYNAMODB_TABLE: process.env.DYNAMODB_TABLE,
  S3_BUCKET: process.env.S3_BUCKET,
  STS_REGION: process.env.STS_REGION,
  STS_SETTINGS: {
    issuer: util.format(process.env.STS_ISSUER, process.env.STS_REGION, process.env.STS_ID)
  },
  AUTH_PATH: util.format(process.env.AUTH_ENDPOINT, process.env.CLIENT_ID,
    `${process.env.REDIRECT_URL}/oauth2-redirect.html`),
}
const { Dropbox } = require('dropbox');
require('isomorphic-fetch');

const dbx = new Dropbox({
  accessToken: process.env.DROPBOX_ACCESS_TOKEN,
});

module.exports = dbx;

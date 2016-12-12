module.exports = {
  // for this site is meant for one user (me!) so I'm just going to store
  // the salted hash of my password here
  'onepass' : 'the hash of your password',

  // put your entire HapiJS connection object items here
  'connection' : {
    'address': '127.0.0.1', 
    'port': 8080 
  },

  // put your yar session configuration here
  'session' : {
    'name' : '',
    'storeBlank': false,
    'cookieOptions': {
      'password': 'must-be-at-least-32-characters-long........',
      'isSecure': false
    }
  },

  // any firebase related configuration goes within here
  'FIREBASE' : {
    'BASEURL' : 'https://YOUR-FIREBASE-URL'
  }
};
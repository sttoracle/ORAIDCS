module.exports = {

  cryptos: {
    algorithm: 'aes256',
    key: process.env.CRYPTO_KEY || 'Your crypto key goes here'
  },

  sessionSecret: process.env.SESSION_SECRET || 'Your session secret goes here',
    
  idcshost: "host",
    
  idcsport: "443",

  idcs: {
    discoveryURL: 'https://host/.well-known/idcs-configuration',
    clientID: '',
    clientSecret: '',
    callbackURL: 'http://127.0.0.1:9090/api/login/callback',
   	profileURL: 'https://host/admin/v1/Me',
    passReqToCallback: true
  },
    
  idcsanon: {
    tokenURL: 'https://host/oauth2/v1/token',
    clientID: '',
    clientSecret: '',
    scope: 'urn:opc:idm:__myscopes__',
    grant_type: 'client_credentials'
  }
};

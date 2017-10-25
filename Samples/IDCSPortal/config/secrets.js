module.exports = {

  cryptos: {
    algorithm: 'aes256',
    key: process.env.CRYPTO_KEY || 'Your crypto key goes here'
  },

  sessionSecret: process.env.SESSION_SECRET || 'Your session secret goes here',
    
  idcshost: "mydemotenant1.idcs.internal.oracle.com",
    
  idcsport: "8943",

  idcs: {
    discoveryURL: 'https://mydemotenant1.idcs.internal.oracle.com:8943/.well-known/idcs-configuration',
    clientID: '4bbff9ed482e4afabb66ffc6a4190c6e',
    clientSecret: 'ad8d77a7-2654-4851-b8b5-847e768740e2',
    callbackURL: 'http://127.0.0.1:9090/api/login/callback',
   	profileURL: 'https://mydemotenant1.idcs.internal.oracle.com:8943/admin/v1/Me',
    passReqToCallback: true
  },
    
  idcsanon: {
    tokenURL: 'https://mydemotenant1.idcs.internal.oracle.com:8943/oauth2/v1/token',
    clientID: '4bbff9ed482e4afabb66ffc6a4190c6e',
    clientSecret: 'ad8d77a7-2654-4851-b8b5-847e768740e2',
    scope: 'urn:opc:idm:__myscopes__',
    grant_type: 'client_credentials'
  }
};

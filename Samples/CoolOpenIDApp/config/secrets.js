module.exports = {

  cryptos: {
    algorithm: 'aes256',
    key: process.env.CRYPTO_KEY || 'Your crypto key goes here'
  },

  sessionSecret: process.env.SESSION_SECRET || 'Your session secret goes here',
    
  idcshost: "secureoracle.idcs.internal.oracle.com",
    
  idcsport: "8943",

  idcs: {
    discoveryURL: 'https://secureoracle.idcs.internal.oracle.com:8943/.well-known/idcs-configuration',
    clientID: '7ec533f373004e79ad4f0d8a51352ff8',
    clientSecret: '6a68ce9d-50df-49ad-943b-4c46284101f6',
    callbackURL: 'http://secureoracle.idcs.internal.oracle.com:9090/auth/provider/callback',
   	profileURL: 'https://secureoracle.idcs.internal.oracle.com:8943/admin/v1/Me',
    passReqToCallback: true
  }
};

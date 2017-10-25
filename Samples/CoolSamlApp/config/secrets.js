module.exports = {

  cryptos: {
    algorithm: 'aes256',
    key: process.env.CRYPTO_KEY || 'Your crypto key goes here'
  },

  sessionSecret: process.env.SESSION_SECRET || 'Your session secret goes here',

  idcs: {
  	entryPoint: "https://secureoracle.idcs.internal.oracle.com:8943/fed/v1/idp/initiatesso?"
      + "&providerid=CoolSamlApp",

      path: '/auth/provider/callback',

      logoutUrl: "https://secureoracle.idcs.internal.oracle.com:8943/sso/v1/user/logout?"
      + "binding=urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST"
      + "&RelayState=http:///secureoracle.idcs.internal.oracle.com:9092/auth/logout/callback",

      acceptedClockSkewMs: -1
  }
};

module.exports = {

  cryptos: {
    algorithm: 'aes256',
    key: process.env.CRYPTO_KEY || 'Your crypto key goes here'
  },

  sessionSecret: process.env.SESSION_SECRET || 'Your session secret goes here',

  idcs: {
  	entryPoint: "https://host/fed/v1/idp/initiatesso?"
      + "&providerid=CoolSamlApp",

      path: '/auth/provider/callback',

      logoutUrl: "https://host/sso/v1/user/logout?"
      + "binding=urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST"
      + "&RelayState=http:///127.0.0.1:9092/auth/logout/callback",

      acceptedClockSkewMs: -1
  }
};

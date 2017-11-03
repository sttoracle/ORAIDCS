# IDCS Portal

This is a web-based tool to showcase different use case scenarios including User Registration, Reporting and so on.

This tool runs on Node JS platform independently of the IDCS instance it connects to. It is built using AngularJS/Bootstrap frameworks for front-end, and NodeJS as the middleware brokering IDCS REST API calls.  

### Setup:  

#### OAuth Client Setup:

* Go the [IDCS admin console]
(https://host/ui/v1/adminconsole)
* Login using admin credentials – 
* Go to the Applications tab and create  **AdminApp**.
* Note the **Client ID** and **Client Secret** of **AdminApp**. These will be used later on the tool.
* Change the **Redirect URL** value under `Configuration -> Client Configuration` section to `http://host:9088/api/login/callback`
 
#### Tool Setup:
* Download [IDCSPortal]() in `zip` format
* Unzip under `~/demo` folder inside the image
* Change the `secrets.js` present under `~/demo/IDCSPortal/config` 
	* Provide the **Client ID** and **Client Secret** values as obtained in `OAuth Client Setup` section.
	* Change the value **callbackURL** to `http://mydemotenant1.idcs.internal.oracle.com:9088/api/login/callback`
		
		```js
		
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
		    callbackURL: 'http://host:9088/api/login/callback',
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
		
		```

* Ensure that IDCS is running

* Start the App using the following command from terminal –

	```js
	cd ~/demo/IDCSPortal
	cd public
	bower install
	cd ..
	npm install
	nohup node server.js &`
	
	```
* Access the App from browser – <http://host:9088>
* If prompted, login using admin credentials


#### Usage

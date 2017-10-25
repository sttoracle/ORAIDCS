# IDCS Portal

This is a web-based tool to showcase different use case scenarios including User Registration, Reporting and so on.

This tool runs on Node JS platform independently of the IDCS instance it connects to. It is built using AngularJS/Bootstrap frameworks for front-end, and NodeJS as the middleware brokering IDCS REST API calls.  

### Setup:  

#### Pre-requisites:  

The tool refers to the instance running inside VirtualBox IDCS Demo image. It can be easily accommodated to use against any IDCS instance by modifying configuration values present inside a single property file (secrets.js). This description assumes that the tool is getting used inside the IDCS Demo image.

#### OAuth Client Setup:

* Go the [IDCS admin console]
(https://mydemotenant1.idcs.internal.oracle.com:8943/ui/v1/adminconsole)
* Login using admin credentials – `admin@oracle.com`/`Oracle123`
* Go to the Applications tab and open  **AdminApp**.
* Note the **Client ID** and **Client Secret** of **AdminApp**. These will be used later on the tool.
* Change the **Redirect URL** value under `Configuration -> Client Configuration` section to `http://mydemotenant1.idcs.internal.oracle.com:9088/api/login/callback`
 
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
		    
		  idcshost: "mydemotenant1.idcs.internal.oracle.com",
		    
		  idcsport: "8943",
		
		  idcs: {
		    discoveryURL: 'https://mydemotenant1.idcs.internal.oracle.com:8943/.well-known/idcs-configuration',
		    clientID: '4bbff9ed482e4afabb66ffc6a4190c6e',
		    clientSecret: 'ad8d77a7-2654-4851-b8b5-847e768740e2',
		    callbackURL: 'http://127.0.0.1:9088/api/login/callback',
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
* Access the App from browser – <http://mydemotenant1.idcs.internal.oracle.com:9088>
* If prompted, login using admin credentials – `admin@oracle.com`/`Oracle123`


#### Usage

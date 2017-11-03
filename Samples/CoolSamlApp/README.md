# Sample SAML Application

This is a sample application that leverages IDCS as SAML provider for authentication.

This app is built NodeJS leveraging Passport JS for SAML Authentication.  

### Setup:  

#### Pre-requisites:  

The tool refers to the instance running inside VirtualBox IDCS Demo image. It can be easily accommodated to use against any IDCS instance by modifying configuration values present inside a single property file (secrets.js). This description assumes that the tool is getting used inside the IDCS Demo image.

 
#### App Setup:
* Download [CoolSamlApp]() in `zip` format
* Unzip under `~/demo` folder inside the image
* Start the App using the following command from terminal –

	```js
	cd ~/demo/CoolSamlApp
	npm install
	nohup node server.js &`
	
	```
* Access the App from browser – <http://host:9092>


#### Usage

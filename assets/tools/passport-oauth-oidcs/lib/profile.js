/**
 * Parse profile.
 *
 * @param {object|string} json
 * @return {object}
 * @access public
 */
exports.parse = function(json) {
  if ('string' == typeof json) {
    json = JSON.parse(json);
  }
  var userData = json;
  var profile = {};
  profile["Display Name"] = userData.displayName;
  profile["Given Name"] = userData.name.givenName;
  profile["Family Name"] = userData.name.familyName;
  profile["Middle Name"] = userData.name.middleName;
  profile["Prefix"] = userData.name.honorificPrefix;
  profile["Suffix"] = userData.name.honorificSuffix;
  profile["Title"] = userData.title;
  profile["User Name"] = userData.userName;
  profile["Id"] = userData.id;
  profile["Active"] = userData.active;
  profile["Timezone"] = userData.timezone;
  profile["Created on"] = userData.meta.created;
  profile["Last modified on"] = userData.meta.lastModified;
  profile["User Information URL"] = userData.meta.location;
  
  
  profile["Instant Messaging Address"] = userData.ims?userData.ims[0].value : null;
  profile["Is Locked?"] = userData["urn:ietf:params:scim:schemas:oracle:idcs:extension:userState:User"]?            
            userData["urn:ietf:params:scim:schemas:oracle:idcs:extension:userState:User"].locked.on:null;
  profile["Status"] = userData["urn:ietf:params:scim:schemas:oracle:idcs:extension:user:User"]?     
            userData["urn:ietf:params:scim:schemas:oracle:idcs:extension:user:User"].status:null;
  profile["Is Federated?"] = userData["urn:ietf:params:scim:schemas:oracle:idcs:extension:user:User"]?
            userData["urn:ietf:params:scim:schemas:oracle:idcs:extension:user:User"].isFederatedUser:null;
  
  if(userData.emails)
  {
  	userData.emails.forEach(function(emailNode){
  		if(emailNode.type == 'work') 
  			profile["Email"] = emailNode.value;
  	});
  }
  
  if(userData.addresses)
  {
  	userData.addresses.forEach(function(addressNode){
  		if(addressNode.locality) 
  			profile["City"] = addressNode.locality;
  		else if (addressNode.postalCode)
  			profile["Postal Code"] = addressNode.postalCode;
  		else if (addressNode.streetAddress)
  			profile["Street Address"] = addressNode.streetAddress;
  		else if (addressNode.country)
  			profile["Country"] = addressNode.country;
  		else if (addressNode.region)
  			profile["State"] = addressNode.region;
  	});
  }
  
  if(userData.phoneNumbers)
  {
  	userData.phoneNumbers.forEach(function(phoneNode){
  		if(phoneNode.type == 'home') 
  			profile["Home Phone Number"] = phoneNode.value;
  		else if(phoneNode.type == 'work') 
  			profile["Work Phone Number"] = phoneNode.value;
  		else if(phoneNode.type == 'mobile') 
  			profile["Mobile Phone Number"] = phoneNode.value;
  	});
  }
 
  return profile;
};

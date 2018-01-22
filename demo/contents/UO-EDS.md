# User On-boarding - Enterprise Directory Synchronization


Active Directory's Users and Groups can be synchronized to IDCS using the **Microsoft Active Directory Bridge**.

You can select which AD containers of Users and Groups will be synchronized.
A User's password is **NOT** synchronized. So users will need to either -

* "Activate" (have email sent to them with link) which will let them set a password, or 
* Federate into IDCS - using your companies' SAML Identity Provider (IDP) - for example - **Active Directory Federation Service (ADFS)**

## Persona

Administrators

## Demo Logistics

Windows Server 2012 equipped with .NET framework 4.6+. The script has been tested with Windows 2012 64-bit Server.

## Active Directory Setup

#### Installing Active Directory
* Log into Active Directory Machine as Administrator

* Copy install script file [createDomain.ps1](resources/createDomain.ps1) onto your Active Directory machine.
	[populateAD.ps1 ](resources/populateAD.ps1) 
	
* Right click on **createDomain.ps1** and choose run with PowerShell.

	
![](images/UO-EDS-1.jpg)
![](images/UO-EDS-2.jpg)

* This will run a script and then reboot. It will show a list of errors which can be disregarded. The process should take between 5-10 minutes.

![](images/UO-EDS-3.jpg)
![](images/UO-EDS-4.jpg)
![](images/UO-EDS-5.jpg)

#### Populating Active Directory with required users and Orgs

* Log into Active Directory Machine as `administrator@oracledemo.com`. 

* Download and copy [populateAD.ps1 ](resources/populateAD.ps1) to this machine if you have not done so already.

* Right click on **populateAD.ps1** and choose run with PowerShell.

![](images/UO-EDS-6.jpg)
![](images/UO-EDS-7.jpg)

* The powershell script will say *complete* when completed. You can then close the powershell window. 

![](images/UO-EDS-8.jpg)
![](images/UO-EDS-9.jpg)

* The Users, OUs and groups should now exist.

![](images/UO-EDS-10.jpg)
![](images/UO-EDS-11.jpg)

#### Adding the IDCS certificate to local certificate store
1. Open Internet Explorer
2. Go to: `https://mydemotenant1.idcs.internal.oracle.com:8943`. This will first show a security alert. Click OK
![](images/IDBridgePrereqs/cert1.jpg)
![](images/IDBridgePrereqs/cert2.jpg)
![](images/IDBridgePrereqs/cert3.jpg)
![](images/IDBridgePrereqs/cert4.jpg)
3. Click continue to site ![](images/IDBridgePrereqs/cert5.jpg)

4. Click on the security report in URL bar ![](images/IDBridgePrereqs/cert6.jpg)
5. Click view Certificate ![](images/IDBridgePrereqs/cert7.jpg)
6. Click Certification Path ![](images/IDBridgePrereqs/cert8.jpg) and then make sure to highlight IDCS Development Root CA. ![](images/IDBridgePrereqs/cert9.jpg) Then Click View Certificate. ![](images/IDBridgePrereqs/cert10.jpg)
7. Click Install Certificate ![](images/IDBridgePrereqs/cert11.jpg)
8. Xelect Local Machine Store Location, then Next ![](images/IDBridgePrereqs/cert12.jpg)
9. Select Place all certificates in the following store, then click Browse. ![](images/IDBridgePrereqs/cert13.jpg)
10. Slect Trusted Root Certification Authority, then click OK. ![](images/IDBridgePrereqs/cert14.jpg)
11. Click Next to install the certificate. ![](images/IDBridgePrereqs/cert15.jpg)
12. Click Finish to install cert.![](images/IDBridgePrereqs/cert16.jpg)
12. Click OK when cert is installed. ![](images/IDBridgePrereqs/cert17.jpg)

####Firefox Certificate Validation
1. open firefox and navigate to `https://mydemotenant1.idcs.internal.oracle.com:8943/ui/v1/adminconsole`. This will genrate a Security Error ![](images/IDBridgePrereqs/firefoxcert1.jpg)
2. Click Advanced ![](images/IDBridgePrereqs/firefoxcert2.jpg)
3. Click Add Exception. ![](images/IDBridgePrereqs/firefoxcert2.5.jpg)
4. Click Confirm Security Exception ![](images/IDBridgePrereqs/firefoxcert3.jpg) 

## Configure Identity Bridge

* Log into IDCS Admin Console 

![](images/UC1_1/login.jpg)

* Click Download and Config ID Bridge from bottom of screen.

![](images/UC1_1/adminscr1.jpg) 
![](images/UC1_1/adminscr2.jpg)

* Enter your AD Domain name in the Domain Name box `oracledemo.com` 

![](images/UC1_1/IDBridgeDL1.jpg)

* Click Download. This will download the IDBridge installer to your local machine. 

![](images/UC1_1/IDBridgeDL2.jpg) 
![](images/UC1_1/IDBridgeDL3.jpg)

* Close this dialog box by clicking OK 

![](images/UC1_1/IDBridgeDL4.jpg)

* Copy the ClientID and Shared secret information

![](images/UC1_1/file1.jpg)

* Create a text file to save this information for later use. 

![](images/UC1_1/file2.jpg)

* Paste information from clipboard into text file 

![](images/UC1_1/file3.jpg)

* Back in the IDCS Admin Console click configure button in the ID Bridge configuration screen. 

![](images/UC1_1/adminscr3.jpg)

7. Change the syncronization time to something shorter than 1 Hour. (1-5 minutes are good options) ![](images/UC1_1/adminscr4.jpg)
8. Uncheck the "Users can login to cloud applications using AD password". Uncheckig this setting will ensure the generated password is sent to the user. In not, IDCS will assume that the users are federated. ![](images/UC1_1/adminscr5.jpg) ![](images/UC1_1/adminscr6.jpg)
9. Open the IDBridge MSI installer that was downloaded earlier. ![](images/UC1_1/installer1.jpg) ![](images/UC1_1/installer2.jpg)
10. Click next, then choose an install directory. The default is fine. ![](images/UC1_1/installer3.jpg) ![](images/UC1_1/installer4.jpg) ![](images/UC1_1/installer5.jpg)
11. Click Install and then Finish. This will then open the Config UI ![](images/UC1_1/installer6.jpg)
12. Enter the Cloud Service URL in the appropriate box.  `https://mydemotenant1.idcs.internal.oracle.com:8943` ![](images/UC1_1/IDBridgeConf1.jpg)
13. Enter the Client ID and Shared Secret from the text file and click next. (you can click test if you would like to test connection to IDCS) ![](images/UC1_1/file3.jpg) ![](images/UC1_1/IDBridgeConf2.jpg) ![](images/UC1_1/IDBridgeConf3.jpg) ![](images/UC1_1/IDBridgeConf4.jpg) ![](images/UC1_1/IDBridgeConf5.jpg) ![](images/UC1_1/IDBridgeConf6.jpg)

14. Enter The connection information for the agent to connect to Active Directory. This includes:
	* Domain Name - The domain name of your Active Directory 
		 `oracledemo.com`
	* Host - Host of the Active Dirctory 
		  `localhost`
	* SSL Enabled - Connect to AD with SSL 
		 `un-checked`
	* Port - Active Directory Port 
	`389`
	* Bind User - User used to connect to Active Directory
	`administrator@oracledemo.com`
	* Bind Password - Password associated with above user 
	`Oracle123` ![](images/UC1_1/IDBridgeConf7.jpg)
15. click next (you can click test if you would like to test connection to Active Directory) ![](images/UC1_1/IDBridgeConf8.jpg) ![](images/UC1_1/IDBridgeConf9.jpg)
16. Choose OU's that will be synced (`Select All`)  ![](images/UC1_1/IDBridgeConf11.jpg) ![](images/UC1_1/IDBridgeConf12.jpg)
17. Choose Groups that will be synced (`Select All`) ![](images/UC1_1/IDBridgeConf13.jpg) ![](images/UC1_1/IDBridgeConf14.jpg)
18. Click Finish. This will save all settings and kick off an initial sync ![](images/UC1_1/running1.jpg) ![](images/UC1_1/running2.jpg) 
 
#### UC1.1.2 Activate and verify new user via UI
1. Open Thunderbird and check for new mail.
2. Click on existing email ![](images/UC1_1/email1.jpg)
3. Click on activate account ![](images/UC1_1/email2.jpg)
4. Enter a new password and click confirm ![](images/UC1_1/password1.jpg) ![](images/UC1_1/passwordcommit.jpg) ![](images/UC1_1/done.jpg)
#### UC1.1.3 User modification and sync
1. Log into IDCS Admin Console and show DCRANE user ![](images/UC1_1/uc1_1_3_1.jpg) ![](images/UC1_1/uc1_1_3_2.jpg) ![](images/UC1_1/uc1_1_3_3.jpg) ![](images/UC1_1/uc1_1_3_4.jpg) ![](images/UC1_1/uc1_1_3_5.jpg)
2. Open Active Directory Users and Administrators ![](images/UC1_1/uc1_1_3_6.jpg) ![](images/UC1_1/uc1_1_3_7.jpg) 
3. Make change to Danny Crane. You can remove him from Employees group and change his first name. ![](images/UC1_1/uc1_1_3_8.jpg) ![](images/UC1_1/uc1_1_3_9.jpg) ![](images/UC1_1/uc1_1_3_10.jpg) ![](images/UC1_1/uc1_1_3_11.jpg) ![](images/UC1_1/uc1_1_3_12.jpg) ![](images/UC1_1/uc1_1_3_13.jpg) ![](images/UC1_1/uc1_1_3_14.jpg)
3. Wait 2 minutes for Sync process to run. Once completed, show changes in IDCS. ![](images/UC1_1/uc1_1_3_14.jpg) ![](images/UC1_1/uc1_1_3_15.jpg) ![](images/UC1_1/uc1_1_3_16.jpg) ![](images/UC1_1/uc1_1_3_17.jpg)
#### UC1.1.4 User revoke/de-provisioning
1. Open Active Directory Users and Administrators ![](images/UC1_1/uc1_1_3_6.jpg)
2. Delete DCRANE user. ![](images/UC1_1/uc1_1_3_18.jpg) ![](images/UC1_1/uc1_1_3_19.jpg) ![](images/UC1_1/uc1_1_3_20.jpg)
3. Wait for sync . ( you can show information on sync process at this point) ![](images/UC1_1/uc1_1_3_21.jpg) ![](images/UC1_1/uc1_1_3_22.jpg) ![](images/UC1_1/uc1_1_3_23.jpg) ![](images/UC1_1/uc1_1_3_24.jpg) ![](images/UC1_1/uc1_1_3_25.jpg) ![](images/UC1_1/uc1_1_3_26.jpg) 
4. Show in IDCS DCRANE no longer exists. ![](images/UC1_1/uc1_1_3_27.jpg) ![](images/UC1_1/uc1_1_3_28.jpg) 



## Addtional Resources

* [Understanding the Bridge](https://docs.oracle.com/en/cloud/paas/identity-cloud/uaids/understanding-bridge.html)

* Tutorial: [Oracle By Example (OBE): Oracle Identity Cloud Service: Integrating with Microsoft Active Directory Using Directory Integrations](http://www.oracle.com/webfolder/technetwork/tutorials/obe/cloud/idcs/idcs_idbridge_obe/idbridge.html) 

* An Approach to AD Bridge HA using Docker and Windows Containers - [OTN Link](http://www.oracle.com/technetwork/articles/idm/gutierrez-idcs-idbridge-3960710.html)



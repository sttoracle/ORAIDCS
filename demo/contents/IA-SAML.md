# Integrate Apps - SAML


- Download IDCS Metadata to a local XML file 

	![](images/IA-SAML-1.png)

- Login to salesforce.com tenant with Administrator credentials

- Go to Single Sign-On settings under  Security Controls menu

- Enable Federated Single Sign-On 

	![](images/IA-SAML-2.png)

- Import IDCS Metadata - Use New from Metadata File option
 
- Save the configuration 

	![](images/IA-SAML-3.png)

    ![](images/IA-SAML-4.png)

    ![](images/IA-SAML-5.png)

    ![](images/IA-SAML-6.png)

    ![](images/IA-SAML-7.png) Change

    ![](images/IA-SAML-8.png) Change

- Note the Organization ID value 

	![](images/IA-SAML-9.png)  Change

- Note the Tenant Domain Name value 

	![](images/IA-SAML-10.png) Change

- Go to IDCS Admin console -> Applications tab

- Click on Add button and select App Catalog 

	![](images/IA-SAML-11.png)

- Search for Salesforce App and Add 

	![](images/IA-SAML-12.png)
	
	![](images/IA-SAML-13.png)


- On the first page of Configuration screen provide the previously noted Organization ID and Domain Name values

- Click on Next 

	![](images/IA-SAML-14.png)

- Click on Finish button  

	![](images/IA-SAML-15.png)

- Activate the application 

	![](images/IA-SAML-16.png)

## Assign Apps to Group - (Persona: Administrator)

- Go to IDCS Admin Console -> Groups tab 

	![](images/IA-SAML-17.png)

- Add group `Employee`. Check the box `User can request access`. 

	![](images/IA-SAML-18.png)

- Click on `Finish` 

	![](images/IA-SAML-19.png)

- Go to the `Access` tab. Click on `Assign`. 

- Select `Salesforce` and confirm 

	![](images/IA-SAML-20.png)
	
	![](images/IA-SAML-21.png)
	
	
## Request Group - (Persona: End-User)

- From MyApps page click on `Add` access request button.

	![](images/IA-SAML-22.png)

- From the **Groups** tab, select `Employee` group

	![](images/IA-SAML-23.png)
	
- Click on `+` sign to request access to the group. Provide justification on the resulting popup page. Click on `OK`

	![](images/IA-SAML-24.png)
	
	![](images/IA-SAML-25.png)
	
- Go to `My Profile` section from menu located top-right

	![](images/IA-SAML-26.png)
	
- Ensure that `Employee` group is visible under **My Access** sub-tab
	
	![](images/IA-SAML-27.png)
	
- Go to `My Apps` section from menu located top-right

	![](images/IA-SAML-28.png)
	
- Ensure that Salesforce applications are visible now on the **MyApps** page
	
	![](images/IA-SAML-29.png)


## Verify Apps SSO - (Persona: End-User)

- Click on the `Salesforce Chatter` app. 
- Ensure that user is automatically logged-in to Salesforce Chatter (**SSO**)

	![](images/IA-SAML-30.png)
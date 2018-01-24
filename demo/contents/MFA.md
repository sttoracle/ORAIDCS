# Multi Factor Authentication

With **Multi Factor Authentication (MFA)** enabled in Oracle Identity Cloud Service, when a user signs in to an application, they are prompted for their user name and password, which is the first factor – something that they know. The user is then required to provide a second type of verification. This is called **2-Step Verification**. 

The two factors work together to add an additional layer of security by using either additional information or a second device to verify the user’s identity and complete the login process.

## Persona

Administrators, End-Users


## Configure MFA - (Persona: Administrator)

- Go to IDCS Admin Console -> Security tab. Select `MFA` from the Sidebar to the left.

- Select `All Users` for the label **Select the users that you want to enable MFA for:**

- Select all the options for **Select the factors that you want to enable:**

	![](images/MFA-1.png)

- Keep all other parameters to their Default values. Click on `Save` 

	![](images/MFA-2.png)
	
	
## Enroll in MFA - (Persona: End-User)

After MFA is enabled, when an end-user logs in to IDCS, she is provided with MFA enrollment option. 

Since the default settings has enrollment as  **Optional**, user can **Skip** the enrollment. In that case, she will not be prompted for enrollment next time she logs in IDCS. However, she can do so from the **My Profile** page after login.

- On the **Enable 2-Step Verification** page after login to IDCS, click on `Enable`

	![](images/MFA-3.png)

- Select the method `Mobile Number`

	![](images/MFA-4.png)

- Provide your mobile number and click on `Send`

	![](images/MFA-5.png)
	
- Access the text message on your mobile and note the 6-digit One-time code on the message.
	
	![](images/MFA-6.png)

- Provide the 6-git code on the enrollment page and click on `Verify`

	![](images/MFA-7.png)
	
- Ensure that the success enrollment message is displayed. Click on `Done`
	
	![](images/MFA-8.png)
   ![](images/MFA-9.png)
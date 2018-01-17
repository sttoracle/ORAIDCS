# User On-boarding - Enterprise Directory Synchronization


[Understanding the Bridge](https://docs.oracle.com/en/cloud/paas/identity-cloud/uaids/understanding-bridge.html)
 
Active Directory's Users and Groups can be synchronized to IDCS using the Active Directory Bridge.
You can select which AD containers of Users and Groups will be synchronized.
A User's password is **NOT** synchronized so users will need to either 
* "Activate" (have email sent to them with link) which will let them set a password or 
* Federate into IDCS - using your companies' SAML Identity Provider (IDP) 

In order for Users to synchronize to IDCS, they must have their the following attributes in Active Directory
* LastName (sn)
* E-mail (mail)

## Requirements
* A Windows machine (Win7+, Server 2008 R2+) to run the service
    * That is a member of the Active Directory domain for auto-discovery
    * Has .NET Framework version 4.6+ installed
* An Active Directory Service Account that is a member of Administrators group or minimally with privileges to 
    * Replicating Directory Changes
    * List children and Read Properties on cn=deleted objects in AD

* How to install AD Bridge [Oracle By Example (OBE): Oracle Identity Cloud Service: Integrating with Microsoft Active Directory Using Directory Integrations](http://www.oracle.com/webfolder/technetwork/tutorials/obe/cloud/idcs/idcs_idbridge_obe/idbridge.html) 
* An Approach to AD Bridge HA using Docker and Windows Containers - [OTN Link](http://www.oracle.com/technetwork/articles/idm/gutierrez-idcs-idbridge-3960710.html)



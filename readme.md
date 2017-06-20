# RTE Node Wrapper.

### This is the official wrapper library for the Riby RTE APIs

 #### Available Features:
 * Validate Bank Account Number
 * Generate List of Nigerian Banks
 * Validate BVN (Nigeria Only)
 
### Pending Features
* Debit Bank Accounts
* Debit ATM Cards
* Reporting
* Pay With QR Codes
* Pay with Riby

## How to Install 
    npm install rte-node

## Usage

You will need to Intialize a new class of RTE like so:

	base_urls : Staging: http://riby-rte.mybluemix.net, Live: https://rte.riby.ng
    const RTE = require('rte-node');
    var rte = new RTE(tenant_id, key, token, base_url)
    
    Then you can use the rte object class like so:
    
## Get List of Nigerian Banks
    
    - ES6
    rte.Bank.getAllBanks((error, body) => {
	    console.log(body);
    })
    
     - ES5
    rte.Bank.getAllBanks(function(error, body){
    	console.log(body);
    });

Sample Response: 

    { responseCode: 1,
        responseText: 'Successfully Gotten Banks',
        payload:
           [ { bank_id: '2', bank_code: '000001', bank_name: 'Sterling Bank' },
             { bank_id: '3', bank_code: '000002', bank_name: 'Keystone Bank' },
             { bank_id: '4',
               bank_code: '000003',
               bank_name: 'First City Monument Bank' },
             { bank_id: '5',
               bank_code: '000004',
               bank_name: 'United Bank for Africa' }.....

## Verify Bank Accounts:
    
    var acct = {
    	bank_code: '000013',
    	account_number : '0122*****278'
    };
    
    ES6
    rte.Bank.resolveBankAccount(acct, (error, body) => {
	    console.log(body);
     });
    
    ES5
    rte.Bank.resolveBankAccount(acct, function(error, body){
	    console.log(body);
     });
     
Sample Auccessful Response

    { responseCode: 1,
      responseText: 'Successfully Verified Bank Account',
      payload:
       { result: '30',
         accountIdentificationName: 'EMAKA SAMPLE',
         errorCode: '00' },
      RTERequestSuccessful: true }

Sample Error Response:

    { responseCode: 0,
      responseText: 'Invalid Account Number or Bank',
      payload: {},
      RTERequestSuccessful: false }

## Validate BVN
    
    In Transit. Please check back

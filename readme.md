# RTE Node Wrapper.

### This is the official wrapper library for the Riby RTE APIs

## Available Features:
 * Validate Bank Account Number
 * Generate List of Nigerian Banks
 * Debit Bank Accounts
 * Debit ATM Cards
 * Create User
 * Get Transactions
 * Get Transaction by User
 * Get All User on RTE
 * Add User Cards
 * Delete User Cards
 * Add User Bank Accounts
 * Delete User Bank Accounts


### Pending Features
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

# Bank
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
      responseText: 'Successfully Resolved Banks',
      payload:
       [ { name: 'Access Bank',
           slug: 'access-bank',
           code: '044',
           longcode: '044150149',
           gateway: 'emandate',
           pay_with_bank: true,
           active: true,
           is_deleted: null,
           id: 1,
           createdAt: '2016-07-14T10:04:29.000Z',
           updatedAt: '2016-07-14T10:04:29.000Z' },
         { name: 'Citibank Nigeria',
           slug: 'citibank-nigeria',
           code: '023',
           longcode: '023150005',
           gateway: '',
           pay_with_bank: false,
           active: true,
           is_deleted: null,
           id: 2,
           createdAt: '2016-07-14T10:04:29.000Z',
           updatedAt: '2016-07-14T10:04:29.000Z' },

## Verify Bank Accounts:
    
    var acct = {
      bank_code: '013',
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
     
Sample Response

    { responseCode: 1,
      responseText: 'Successfully Verified Bank Account',
      payload:
       { account_number: '00********20',
         account_name: 'TEST  ACCOUNT' },
      RTERequestSuccessful: true }

# Accounts

### Add New User
    This method takes in two parameters, an object and a callback
    
    var options = {
      skip : 0,
      limit : 20, // limit Cannot be greater than 50
    };
    
     rte.User.find(options, function(error, body){
      console.log(body);
     });

Sample Reponse: 
    ```{ 
        responseCode: 1,
          responseText: 'Users Fetched Successfully',
          payload: { users: [ [Object], [Object] ] },
          RTERequestSuccessful: true }```

### Create new user
    
    var user = {
      user_id: '8383748',
      username : "",  <optional>
      email: 'james@mail.com',
      first_name: 'James',
      last_name: "Nikon",
      phone_number: '234814677368',
      bvn: '22133388729',
    }
    rte.User.create(user, function(error, body){
      console.log(body);
    });

Sample Reponse: 
    ```{ 
        responseCode: 1,
          responseText: 'New card added for user',
          payload: {},
          RTERequestSuccessful: true }```


Sample Response:
    
    ```{ responseCode: 1,
      responseText: 'User Added Successfully',
      payload:
       { user:
          { __v: 0,
            user_id: '8383748',
            tenant_id: 'T5950',
            _id: '594bfb564f821b92906f8195',
            bank_accounts: [],
            applications: [Object],
            fines: [],
            money_locked: [],
            wallet: [Object],
            user: [Object] } },
      RTERequestSuccessful: true }```

### Add New User Card
    var options = {
        "user_id": "8383748",
        "card_type": "mastercard",
        "number": "1111666677778888",
        "issuer": "ZENITH",
        "cvv2": "123",
        "expiry_month": "07",
        "expiry_year": "17"
    };

    rte.User.updateUserCard(options, function(error, body){
        console.log(body);
    });

Sample Reponse: 
    ```{ 
        responseCode: 1,
          responseText: 'New card added for user',
          payload: {},
          RTERequestSuccessful: true }```

### Add User Bank Account
    var options = {
        "user_id" : "8383748",
        "name": "James Nikon",
        "number": "0123456789",
        "bank_name": "GTB",
        "bank_code": "013"
    };
    
    rte.User.addUserBankAccount(options, function(error, body){
        console.log(body);
    });

Sample Reponse: 
    ```{ 
        responseCode: 1,
          responseText: 'Added bank account',
          payload: {},
          RTERequestSuccessful: true }```

### Delete User Card
    var options = {
        "user_id" : "8383748",
        "card_number": "1111222233334444",
    };
    
    rte.User.deleteUserCard(options, function(error, body){
        console.log(body);
    });

Sample Reponse: 
    ```{ 
        responseCode: 1,
          responseText: 'User card deleted',
          payload: {},
          RTERequestSuccessful: true }```

### Delete User bank Account
    var options = {
        "user_id" : "8383748",
        "account_number": "0123456789",
    };
    
    rte.User.deleteUserBankAccount(options, function(error, body){
        console.log(body);
    });

Sample Reponse: 
    ```{ 
        responseCode: 1,
          responseText: 'Bank Account deleted',
          payload: {},
          RTERequestSuccessful: true }```

# Transactions
    
## Initiate new Transaction
    Allows transactions to be initiated. 
Sample
    
    var vars = {
      amount: '10.58', // Amount to debit
      type : 'debit', // Transaction Type
      user_id : '0098290', // User ID
      email : 'xxxxxxx@gmail.com' // Email of user, 
    };
    
    rte.Transaction.initiateDebitSecureCardTransaction(vars, function(error, body){
      console.log(body);
    });
    
    
    
    
    
Sample Response 
    
    { responseCode: 1,
      responseText: 'Payment Initiated Successfully',
      payload: { responseurl: 'http://localhost:3000/thirdparty/secure_pay?node={"transactionReference":"RTE_REF24466","amount":1058,"email":"xxxx@gmail.com"}' },
      RTERequestSuccessful: true }
    
The responsehtml can be loaded into an Iframe or browser for user to complete transaction.

## Make recurring debit.

    This allows to make recurring debit on user card.
    PS: This method is only available for card only.
    var vars = {
      amount: '10.58', // Amount to debit
      type : 'debit', // Transaction Type
      user_id : '0098290', // User ID
      email : 'xxxxxx@gmail.com' // Email of user, Must me the same as             previous 
    };
    
    rte.Transaction.makeRecurentCardDebitTransaction(vars, function(error, body){
      console.log(body);
    });
    
Sample Response

    { responseCode: 1,
      responseText: 'Payment Completed Successfully',
      payload: { status: true },
      RTERequestSuccessful: true 
    }
    
## Get Transastions
    
    How to use 
    var options = {
      skip : 0,
      limit : 20,
    };
    
    rte.Transaction.find(options, function(error, body){
      console.log(body);
    });
    
    Sample Response
    
    { responseCode: 1,             
      responseText: 'Transactions f
      payload:                     
       { transactions:             
          [ { _id: '594a9932a4b8b7977c4c5a70',                       
          transaction_id: 'RTE115959',                           
          transactionReference: 'RTE_REF266002',                 
          amount: 100,                                           
          channel_used: 'card',                                  
          processed_with: 'paystack',                            
          transaction_remark: 'Card Debit By REF RTE_REF266002', 
          type: 'debit',                                         
          user_id: '0019288',                                    
          tenant_id: 'T5950',                                    
          transaction_status: 'success',                         
          __v: 0,                                                
          resuable: true,                                        
          is_initial_charge: false,                              
          origin: null,                                          
          autorization_id: 'AUTH_wlt801rs97',                    
          card_type: 'visa DEBIT',                               
          expiry_year: '2020',                                   
          expiry_month: '01',                                    
          card_number: '408408',                                 
          created_at: '2017-06-21T16:05:00.154Z',                
          signed_transaction: false }                            
                    
        { _id: '594a9932a4b8b7977c4c5a70',                       
          transaction_id: 'RTE115959',                           
          transactionReference: 'RTE_REF266002',                 
          amount: 100,                                           
          channel_used: 'card',                                  
          processed_with: 'paystack',                            
          transaction_remark: 'Card Debit By REF RTE_REF266002', 
          type: 'debit',                                         
          user_id: '0019288',                                    
          tenant_id: 'T5950',                                    
          transaction_status: 'success',                         
          __v: 0,                                                
          resuable: true,                                        
          is_initial_charge: false,                              
          origin: null,                                          
          autorization_id: 'AUTH_wlt801rs97',                    
          card_type: 'visa DEBIT',                               
          expiry_year: '2020',                                   
          expiry_month: '01',                                    
          card_number: '408408',                                 
          created_at: '2017-06-21T16:05:00.154Z',                
          signed_transaction: false }                            
                            ] },          
          RTERequestSuccessful: true } 


Find Transaction by User ID

Sample 
    var options = {
      skip : 0,
      limit : 20,
      user_id : "902998"
    };
    
    rte.Transaction.findById(options, function(error, body){
      console.log(body);
    });
    
Sample  Reponse:

    { responseCode: 1,             
      responseText: 'Transactions f
      payload:                     
       { transactions:
            { _id: '594a954ef1119e272066c885',                       
          transaction_id: 'RTE994557',                           
          transactionReference: 'RTE_REF654571',                 
          amount: 100,                                           
          channel_used: 'card',                                  
          processed_with: 'paystack',                            
          transaction_remark: 'Card Debit By REF RTE_REF654571', 
          type: 'debit',                                         
          user_id: '0019288',                                    
          tenant_id: 'T5950',                                    
          transaction_status: 'success',                         
          __v: 0,                                                
          resuable: true,                                        
          is_initial_charge: false,                              
          origin: null,                                          
          autorization_id: 'AUTH_wlt801rs97',                    
          card_type: 'visa DEBIT',                               
          expiry_year: '2020',                                   
          expiry_month: '01',                                    
          card_number: '408408',                                 
          created_at: '2017-06-21T15:48:16.704Z',                
          signed_transaction: false }                            
        { _id: '594a9932a4b8b7977c4c5a70',                       
          transaction_id: 'RTE115959',                           
          transactionReference: 'RTE_REF266002',                 
          amount: 100,                                           
          channel_used: 'card',                                  
          processed_with: 'paystack',                            
          transaction_remark: 'Card Debit By REF RTE_REF266002', 
          type: 'debit',                                         
          user_id: '0019288',                                    
          tenant_id: 'T5950',                                    
          transaction_status: 'success',                         
          __v: 0,                                                
          resuable: true,                                        
          is_initial_charge: false,                              
          origin: null,                                          
          autorization_id: 'AUTH_wlt801rs97',                    
          card_type: 'visa DEBIT',                               
          expiry_year: '2020',                                   
          expiry_month: '01',                                    
          card_number: '408408',                                 
          created_at: '2017-06-21T16:05:00.154Z',                
          signed_transaction: false }                            





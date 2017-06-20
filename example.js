var RTE = require('./index.js');

var rte = new RTE('T5950','a5ca36b2a932ad8759f1b1930f495eed','$2a$10$.Mr2xpTDz5FrPp8sQxVsPud3KTJJvMCEm3tWmnVbWfSPEUnIrkwRe', 'http://localhost:3000');


// rte.Bank.getAllBanks(function(error, body){
// 	console.log(body);
// });

// rte.Bank.getAllBanks((error, body) => {
// 	console.log(body);
// })

var o = {
	amount: '100',
	type : 'debit',
	user_id : '0019288'
};

rte.Transaction.initiateDebitSecureCardTransaction(o, function(error, body){
	console.log(body);
});

// rte.Bank.resolveBankAccount(o, (error, body) => {
// 	console.log(body);
// });
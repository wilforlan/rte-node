var RTE = require('./index.js');

var rte = new RTE('T5950','a5ca36b25eed','$UnIrkwRe', 'https://riby-rte.mybluemix.net');


rte.Bank.getAllBanks(function(error, body){
	console.log(body);
});

rte.Bank.getAllBanks((error, body) => {
	console.log(body);
})

var o = {
	bank_code: '000013',
	account_number : '0116269218'
};

rte.Bank.resolveBankAccount(o, function(error, body){
	console.log(body);
});

rte.Bank.resolveBankAccount(o, (error, body) => {
	console.log(body);
});
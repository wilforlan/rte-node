
/**
* RTE IP class
*
* @class RTEIP
* @constructor
*/ 

var RTETRANSACTION = function (RTEBase) {

	/**
	* Retrieves a list of Banks
	*
	* @method check 
	* @param {Function} callback
	*/ 
	this.initiateDebitSecureCardTransaction = function (postBody, callback) { 

		var requestParams      = {};
		requestParams.data     = { amount: postBody.amount, channel_used: 'card', type: postBody.type, user_id: postBody.user_id };
		requestParams.method   = 'POST'; 
		return RTEBase.makeRequest('tenant/start_transaction',  requestParams, callback);

	}

 

}


module.exports = RTETRANSACTION
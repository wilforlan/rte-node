
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
		requestParams.data     = { amount: postBody.amount, channel_used: 'card', type: postBody.type, user_id: postBody.user_id,email: postBody.email  };
		requestParams.method   = 'POST'; 
		return RTEBase.makeRequest('tenant/start_transaction',  requestParams, callback);

	},

	this.makeRecurentCardDebitTransaction = function (postBody, callback) { 

		var requestParams      = {};

		requestParams.data     = { 
			amount: postBody.amount, 
			channel_used: 'card', 
			type: postBody.type, 
			user_id: postBody.user_id, 
			email: postBody.email 
		};

		requestParams.method   = 'POST'; 
		return RTEBase.makeRequest('tenant/make_recurring_debit',  requestParams, callback);

	}

	this.find = function (body, callback) { 

		var requestParams      = {};
		requestParams.data     = {skip: body.skip, limit: body.limit};
		requestParams.method   = 'POST';
		return RTEBase.makeRequest('tenant/get_transaction',  requestParams, callback);

	},

	this.findById = function (body, callback) { 

		var requestParams      = {};
		requestParams.data     = RTEBase.validateParams(body, RTEBase.endpointParamSpec('tenant/get_transaction_by_user'));
		requestParams.method   = 'POST';
		return RTEBase.makeRequest('tenant/get_transaction_by_user',  requestParams, callback);

	}


 

}


module.exports = RTETRANSACTION
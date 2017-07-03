
/**
* RTE IP class
*
* @class RTEUSER
* @constructor
*/ 

var RTEUSER = function (RTEBase) {

	/**
	* Create new User on RTE Server
	*
	* @method check 
	* @param {Function} callback
	*/ 
	this.create = function (body, callback) { 

		var requestParams      = {};
		requestParams.data     = RTEBase.validateParams(body, RTEBase.endpointParamSpec('tenant/create_new_user'));
		requestParams.method   = 'POST';
		return RTEBase.makeRequest('tenant/create_new_user',  requestParams, callback);

	},
	this.find = function (body, callback) { 

		var requestParams      = {};
		requestParams.data     = {skip: body.skip, limit: body.limit};
		requestParams.method   = 'POST';
		return RTEBase.makeRequest('tenant/get_users',  requestParams, callback);

	},
    
    this.updateUserCard = function (body, callback) { 
		var requestParams      = {};
		requestParams.data     = RTEBase.validateParams(body, RTEBase.endpointParamSpec('tenant/add_new_user_card'));
		requestParams.method   = 'POST';
		return RTEBase.makeRequest('tenant/add_new_user_card',  requestParams, callback);

	}
	
	this.addUserBankAccount = function (body, callback) { 
		var requestParams      = {};
		requestParams.data     = RTEBase.validateParams(body, RTEBase.endpointParamSpec('tenant/add_new_bank_account'));
		requestParams.method   = 'POST';
		return RTEBase.makeRequest('tenant/add_new_bank_account',  requestParams, callback);

	}
	
	this.deleteUserCard = function (body, callback) { 
		var requestParams      = {};
		requestParams.data     = RTEBase.validateParams(body, RTEBase.endpointParamSpec('tenant/delete_user_card'));
		requestParams.method   = 'POST';
		return RTEBase.makeRequest('tenant/delete_user_card',  requestParams, callback);

	}
	this.deleteUserBankAccount = function (body, callback) { 
		var requestParams      = {};
		requestParams.data     = RTEBase.validateParams(body, RTEBase.endpointParamSpec('tenant/delete_user_bank_account'));
		requestParams.method   = 'POST';
		return RTEBase.makeRequest('tenant/delete_user_bank_account',  requestParams, callback);

	}

}


module.exports = RTEUSER
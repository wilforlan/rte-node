
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

	}

}


module.exports = RTEUSER
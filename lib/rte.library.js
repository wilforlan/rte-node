var RTEUtils  = require('./rte.utils'); 
var Request           = require('request');
var encryptAES = require('./rte.encryptAES');
/**
* RTE base class
*
* @class RTE
* @constructor
*/
var RTEBase = function (tenant_id, tenant_key, tenant_token, base_url_or_production_flag) {

	RTEUtils.emptyCheck(tenant_id, 'Tenant ID is required');
	RTEUtils.emptyCheck(tenant_key,     'Tenant Key is required');
	RTEUtils.emptyCheck(tenant_token,     'Tenant Token is required');

	var tenant_id = tenant_id;
	var tenant_key     = tenant_key;
	var tenant_token     = tenant_token;

	var base_url      = 'http://riby-rte.mybluemix.net/tenant';
	var prod_url      = 'https://rte.riby.ng/tenant';

	if(base_url_or_production_flag === true){
		base_url = prod_url;
	}
	else if(typeof base_url_or_production_flag != 'undefined' && base_url_or_production_flag != ''){
		base_url = base_url_or_production_flag;
	}

	this.getTenantID = function () {
		return tenant_id;
	} 

	this.getTenantToken = function () {
		return tenant_token;
	} 

	this.getTenantKey = function () {
		return tenant_key;
	}

	this.getBaseUrl = function () {
		return base_url;
	}

	this.setBaseUrl = function (new_base_url) {
		if(new_base_url){
			base_url = new_base_url;
		}	
	}

	this.makeRequest = function (path, payload, callback){
		var requestOptions = {};
		var requestMethod  = RTEUtils.initDefaultValue(payload.method, 'GET');
		var datakey        = requestMethod == 'POST' ? 'body' : 'qs';
		var requestJSON    = datakey == 'body' ? true : false;

		requestOptions.uri      = path;
		requestOptions.baseUrl  = this.getBaseUrl();
		requestOptions.method   = requestMethod;
		requestOptions[datakey] = RTEUtils.initDefaultValue(payload.data, {});
		requestOptions.json     = requestJSON;
		requestOptions.headers  = {'Content-Type':'application/json', 'rte-tenant-id': this.getTenantID()};

		if(callback) {
			this._makeRequest(requestOptions, callback);
			return requestOptions;
		} else {
			return this._makePromiseRequest(requestOptions);
		} 
	}

}

/**
 * Send network request. Invokes callback when request is done.
 *
 * @param requestOptions
 * @param callback
 * @private
 */
RTEBase.prototype._makeRequest = function(requestOptions, callback) {
	var value_to_hash = this.getTenantKey() +this.getTenantToken()
	encryptAES(value_to_hash, function(encrypted_hash){
		requestOptions.headers["rte-tenant-hash"] = encrypted_hash;
		Request(requestOptions,
			function (err, res, body) {
				if(typeof res == "undefined"){
					res = {};
				}

				if(typeof body == 'undefined'){
					body = {};
				}
				
				res.RTERequestSuccessful = false;
				if (typeof body !== 'object') {
					body = JSON.parse(body);
				}
				var responsecode = body.responseCode;
				if (responsecode) {
					body.RTERequestSuccessful = true;
				} else if (!responsecode) {
					body.RTERequestSuccessful = false;
				}
				callback(err, body);
			}
	);
	})
	
}

/**
 * Send network request and returns a promise that is resolved when the request is done.
 *
 * @param requestOptions
 * @returns {Promise}
 * @private
 */
RTEBase.prototype._makePromiseRequest = function (requestOptions) {
	var self = this;
	return new Promise(function (resolve, reject) {
		self._makeRequest(requestOptions, function (err, res, body) {
			if (err) {
				reject(err);
			} else {
				resolve(res, body);
			}
		});
	});
};

RTEBase.prototype.paramCheck = function (param, fail_message) {
	RTEUtils.emptyCheck(param, fail_message);
}

RTEBase.prototype.validateParams = function (params, paramDictionary) {

	var returnParams = {}; //This is so we only take what we need no matter the amount of params passed
	for( p in paramDictionary )
	{
		if(paramDictionary.hasOwnProperty(p))
		{  
			if( params[p] )
			{
				returnParams[p] = params[p];
			}
			var expectedParam = paramDictionary[p];
			if ( expectedParam.required == 'true' ) {
				this.paramCheck(params[p], p + ' is required');
			}

			if( expectedParam.encrypt == 'true' && returnParams[p] ) { 
				returnParams[p]= params[p];
			}else {
				
			}
		}
	}
	return returnParams;
};

RTEBase.prototype.endpointParamSpec = function (path)
	{
		var specs = {};
		specs['tenant/create_new_user']   = this.objectBuilder({})
						     .build('user_id', 'required:true, encrypt:false') 
						     .build('username', 'required:false, encrypt:false')
						     .build('email', 'required:true, encrypt:false')
						     .build('first_name', 'required:true, encrypt:false')
						     .build('last_name', 'required:true, encrypt:false')
						     .build('phone_number', 'required:true, encrypt:false')
						     .build('bvn', 'required:true, encrypt:false')
						     .end();
						     
     	specs['tenant/get_transaction_by_user']   = this.objectBuilder({})
						     .build('user_id', 'required:true, encrypt:false') 						     
						     .end();
							 
		specs['tenant/add_new_user_card']   = this.objectBuilder({})
						     .build('user_id', 'required:true, encrypt:false') 
							 .build('card_type', 'required:true, encrypt:false') 
						     .build('number', 'required:true, encrypt:false')
						     .build('issuer', 'required:false, encrypt:false')
						     .build('cvv2', 'required:true, encrypt:false')
						     .build('expiry_month', 'required:true, encrypt:false')
						     .build('expiry_month', 'required:true, encrypt:false')
						     .end();
		return specs[path];
	} 

RTEBase.prototype.objectBuilder = function (eval_dict) {
	var objectbuilder = require('./rte.objectbuilder');
	return new objectbuilder(eval_dict);
}


RTEBase.prototype.getCountryCodes = function () {
	var codes = this.objectBuilder({}).build('NIGREIA:NG')
				.build('GHANA:GH')
				.build('UNITED STATES:US')
				.build('KENYA:KE')
				.build('UNITED KINGDOM:UK')
				.end();
	return codes;
}

RTEBase.prototype.getCountryCode = function (country_name) {

	if(country_name && typeof country_name == 'string')
	{
		country_name = country_name.toUpperCase().trim();
		var codes = this.getCountryCodes();
		if(codes[country_name])
		{
			return codes[country_name];
		}
	}

	return null;

}

RTEBase.prototype.getCurrencyCode = function (code_name) {
	var currencies = this.objectBuilder({}).build('NAIRA:NGN')
					 .build('DOLLARS:USD')
					 .build('POUNDS:GBP')
					 .build('EURO:EURO')
					 .build('GHANACEDIS:GHS')
					 .build('KENYASHILLING:KES')
					 .end();
	if( code_name && typeof code_name == 'string')
	{
		code_name = code_name.toUpperCase().trim();
		if(currencies[code_name]){
			return currencies[code_name];
		}
	}

	return null;
}


module.exports = RTEBase;
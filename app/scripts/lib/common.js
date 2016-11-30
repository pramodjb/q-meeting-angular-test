'use strict';

(function() {
	this.APP = this.APP || {};

	this.APP.regex = {
		email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,5}$/,
		password: /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/
	};
}).call(this);
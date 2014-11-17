(function (App) {
	'use strict';

	var self;
	var Q = require('q');

	var Generic = Backbone.Model.extend({
		defaults: {
			type: 'generic',
		},
		initialize: function () {
			this.template = App.View.Providers.Generic;
		},

		setup: function(model) {
			var defer = Q.defer();
			defer.resolve();
			return defer.promise;
		}

	});

	App.Parsers.Generic = Generic;
})(window.App);
(function (App) {
	'use strict';

	var self;
	var Q = require('q');

	var Generic = Backbone.Model.extend({
		defaults: {
			type: 'generic',
		},
		initialize: function () {
			this.template = GenericView;
		},

		setup: function(model) {
			var defer = Q.defer();
			defer.resolve();
			return defer.promise;
		}

	});

	var GenericView = Backbone.Marionette.ItemView.extend({
		template: '#view-generic-tpl',
		className: 'submission-generic'
	});

	App.Parsers.Generic = Generic;
})(window.App);
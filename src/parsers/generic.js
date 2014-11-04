(function (App) {
	'use strict';

	var self;

	var Generic = Backbone.Model.extend({
		defaults: {
			type: 'generic',
		},
		initialize: function () {
			this.template = GenericView;
		}

	});

	var GenericView = Backbone.Marionette.ItemView.extend({
		template: '#view-generic-tpl'
	});

	App.Parsers.Generic = Generic;
})(window.App);
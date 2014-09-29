(function (App) {
	'use strict';
	var moment = require('moment');

	var Listing = Backbone.Marionette.ItemView.extend({
		template: '#listing-tpl',

		tagName: 'article',
		className: 'listing',

		events : {
			'click .info' : 'loadSubmission'
		},

		loadSubmission: function(e) {
			App.vent.trigger('main:getsubmission', this.model.get('id'), {});
		}
		
	});
	App.View.Listing = Listing;
})(window.App);
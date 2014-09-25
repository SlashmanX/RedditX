(function (App) {
	'use strict';

	var Listing = Backbone.Marionette.ItemView.extend({
		template: '#listing-tpl',

		tagName: 'div',
		className: 'listing row-fluid col-xs-12'
		
	});
	App.View.Listing = Listing;
})(window.App);
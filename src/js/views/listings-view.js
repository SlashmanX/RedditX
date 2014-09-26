(function (App) {
	'use strict';
	var ListingsView = Backbone.Marionette.CollectionView.extend({
		tagName: 'section',
		className: 'listings',
		itemView: App.View.Listing
	});
	App.View.ListingsView = ListingsView;
})(window.App);
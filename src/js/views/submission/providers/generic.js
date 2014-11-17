(function (App) {
	'use strict';
	var GenericView = Backbone.Marionette.ItemView.extend({
		template: '#view-generic-tpl',
		className: 'submission-generic'
	});
	App.View.Providers = {
		Generic: GenericView
	};
})(window.App);
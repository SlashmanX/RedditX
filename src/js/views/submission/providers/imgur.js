(function (App) {
	'use strict';
	var ImgurView = Backbone.Marionette.ItemView.extend({
		template: '#view-imgur-tpl',
		className: 'submission-imgur',

		initialize: function() {

		},
	});

	App.View.Providers.Imgur = ImgurView;
})(window.App);
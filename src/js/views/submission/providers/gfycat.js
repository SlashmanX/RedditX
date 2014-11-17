(function (App) {
	'use strict';
	var URI = require('URIjs');	
	var GfycatView = Backbone.Marionette.ItemView.extend({
		template: '#view-gfycat-tpl',
		className: 'submission-gfycat',

		initialize: function() {
			this.model.set('gfy_id', new URI(this.model.get('url')).filename());
		},

		onShow: function() {
			gfyCollection.init();
		}
	});
	App.View.Providers.Gfycat = GfycatView;
})(window.App);
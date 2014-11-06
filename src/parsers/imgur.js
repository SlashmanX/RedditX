(function (App) {
	'use strict';
	var URI = require('URIjs');
	var inherits = require('util').inherits;
	var imgurJS = require('imgur-js');
	var imgur = new imgurJS('47af492bc2c7828');

	var Imgur = App.Parsers.Generic.extend({
		defaults: {
			type: 'imgur'
		},

		initialize: function () {
			this.template = ImgurView;
		},

		setup: function(model) {
			var defer = Q.defer();

			var type = 'image';
			var u = new URI(model.get('url'));
			var id = u.segment().pop().replace('.'+ u.suffix(), '');

			if(u.segment().indexOf('a') !== -1) {
				type = 'album';
				imgur.album(id).then(function(res){
					model.set('info', JSON.parse(res).data);
					defer.resolve();
				});
			}
			else {
				imgur.image(id).then(function(res){
					model.set('info', JSON.parse(res).data);
					defer.resolve();
				}).catch(function(err) {
					console.log(err);
				});

				if(u.suffix() === 'gifv') {
					type = 'gifv';
				}
			}
			model.set('type', type);

			return defer.promise;
		}
	});

	var ImgurView = Backbone.Marionette.ItemView.extend({
		template: '#view-imgur-tpl',
		className: 'submission-imgur',

		initialize: function() {

		},


	});

	App.Parsers.Imgur = Imgur;
})(window.App);
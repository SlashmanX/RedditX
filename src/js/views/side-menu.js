var Reddit = require('node-reddit');
var reddit;
var Q = require('q');
(function (App) {
	'use strict';

	var SideMenu = Backbone.Marionette.ItemView.extend({
		template: '#side-menu-tpl',

		initialize: function() {
			this.model.on('change', this.render, this);
		},

		events : {
			'click .authenticate' : 'launchOAuth',
			'click .refresh-subreddits' : 'refreshSubreddits',
			'click .subreddit' : 'loadSubreddit'
		},

		launchOAuth : function(e) {
			e.preventDefault();
			var gui = require('nw.gui');
			gui.App.addOriginAccessWhitelistEntry('https://ssl.reddit.com/', "app", "redditx", true); 
			var win = gui.Window.open($(e.target).attr('href'), {
				toolbar: false,
				frame: false,
				focus: true,
				position: 'center'
			});
		},

		refreshSubreddits : function(e) {
			$('.refresh-subreddits').addClass('fa-spin');
			App.vent.trigger('user:getsubreddits', function() {
				$('.refresh-subreddits').removeClass('fa-spin');
			});
		},

		loadSubreddit : function(e) {
			e.preventDefault();
			var r = $(e.target).attr('href').replace('/r/', '');
			App.vent.trigger('main:getsubreddit', r, {});
		}
		
	});

App.View.SideMenu = SideMenu;
})(window.App);
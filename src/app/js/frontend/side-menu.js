(function (App) {
	'use strict';

	var SideMenu = Backbone.Marionette.ItemView.extend({
		template: '#side-menu-tpl'
		
	});

App.View.SideMenu = SideMenu;
})(window.App);
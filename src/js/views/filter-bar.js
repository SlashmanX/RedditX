(function (App) {
	'use strict';

	App.View.FilterBar = Backbone.Marionette.ItemView.extend({
		className: 'filter-bar',
		ui: {
			sorter: '.sort',
			time: '.time'
		},
		events: {
			'change .sort': 'sortBy',
			'change .time': 'changeTime',
		},

		sortBy: function (e) {
			var sort = e.target.options[e.target.selectedIndex].value;
			this.model.set({
				sort: sort
			});

			this.render();
		},

		changeTime: function (e) {
			var time = e.target.options[e.target.selectedIndex].value;
			this.model.set({
				t: time
			});

			this.render();
		},
	});

	App.View.FilterBar = App.View.FilterBar.extend({
		template: '#filter-bar-tpl'
	});

})(window.App);

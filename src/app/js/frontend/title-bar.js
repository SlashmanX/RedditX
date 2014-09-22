(function (App) {
	'use strict';

	var ButtonOrder = {
		'win32': ['min', 'max', 'close'],
		'darwin': ['close', 'min', 'max'],
		'linux': ['min', 'max', 'close']
	};

	var TitleBar = Backbone.Marionette.ItemView.extend({
		template: '#title-bar-tpl',

		events: {
            'click .btn-os.os-max': 'maximize',
            'click .btn-os.os-min': 'minimize',
            'click .btn-os.os-close': 'closeWindow',
            'click .btn-os.fullscreen': 'toggleFullscreen'
        },

		initialize: function() {
			this.nativeWindow = require('nw.gui').Window.get();
		},

		templateHelpers: {
            getButtons: function(){
                return ButtonOrder[process.platform];
            }
        },

		maximize: function () {
			if(win.isFullscreen) {
				win.toggleFullscreen();
			} else {
				if (screen.availHeight <= win.height) {
					win.unmaximize();
				}
				else {
					win.maximize();
				}
			}
		},

		minimize : function () {
			win.minimize();
		},

		closeWindow : function () {
			win.close();
		},

		toggleFullscreen : function () {
			win.toggleFullscreen();
			$('.btn-os.fullscreen').toggleClass('active');
		}


	});

App.View.TitleBar = TitleBar;
})(window.App);
(function(App) {
    'use strict';

    var _this;

    var MainWindow = Backbone.Marionette.Layout.extend({
        template: '#main-window-tpl',

        id: 'main-window',

        regions: {
            TitleBar: '#title-bar',
            SideMenu: '#side-menu',
            Content: '#content'
        },

        initialize: function() {
            _this = this;

            this.nativeWindow = require('nw.gui').Window.get();
        },

        onShow: function() {
            this.TitleBar.show(new App.View.TitleBar());
            this.SideMenu.show(new App.View.SideMenu());

            // Show loading modal on startup
            var that = this;

            // Cancel all new windows (Middle clicks / New Tab)
            this.nativeWindow.on('new-win-policy', function(frame, url, policy) {
                policy.ignore();
            });

        },
    });

    App.View.MainWindow = MainWindow = MainWindow;
})(window.App);
(function () {
    const ipc = require('electron').ipcRenderer;
    angular.module('Pass')
        .controller('PageController', function ($http) {
            this.goToHome = function () {
                document.location = '#/';
            }

            this.logout = function () {
                ipc.send('logout');
            }
        });
})();

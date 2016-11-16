(function () {
    const ipc = require('electron').ipcRenderer;
    angular.module('Pass')
        .controller('TilesController', function ($http, $routeParams) {
            var panel = this;

            panel.newTile = {};
            panel.goToAddress = function () {
                if (panel.currentTile.address.indexOf('http') == -1) {
                    window.open('http://' + panel.currentTile.address);
                } else {
                    window.open(panel.currentTile.address);
                }
            }

            panel.saveChanges = function () {
                $http.post('ajax/saveChanges', $.param({
                        tile: JSON.stringify(panel.currentTile),
                        index: $routeParams.index
                    }))
                    .success(function () {
                        var $button = $('#save-changes');
                        $button.text('Изменения сохранены');
                        $button.addClass('changed');

                        setTimeout(function () {
                            $button.removeClass('changed');
                            $button.text('Сохранить изменения');
                        }, 3000);
                    })
                    .error(function (err) {
                        console.error(err);
                    });
            };


            panel.addNewTile = function () {
                ipc.send('addNewTile', panel.newTile);
            };

            panel.removeTile = function () {
                $http.post('ajax/removeTile', $.param({
                    index: $routeParams.index
                })).success(function () {
                    document.location = '#/';
                })
            };

            var index = $routeParams.index;

            $http.get('ajax/getTiles').success(function (data) {
                panel.tiles = data;

                if (index) {
                    panel.currentTile = panel.tiles[index];
                }
            });
        });
})();

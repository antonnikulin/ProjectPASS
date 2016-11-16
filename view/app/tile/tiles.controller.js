(function () {
    const ipc = require('electron').ipcRenderer;
    const open = require('open');

    angular.module('Pass')
        .controller('TilesController', function ($routeParams) {
            var panel = this;
            var index = $routeParams.index;

            panel.tiles = ipc.sendSync('getTiles');

            panel.newTile = {};

            panel.goToAddress = function () {
                if (panel.currentTile.address.indexOf('http') == -1) {
                    open('http://' + panel.currentTile.address);
                } else {
                    window.open(panel.currentTile.address);
                }
            }

            panel.saveChanges = function () {
                var success = ipc.sendSync('saveChanges', {
                    tile: panel.currentTile,
                    index: index
                });

                if (success) {
                    var $button = $('#save-changes');
                    $button.text('Изменения сохранены');
                    $button.addClass('changed');

                    setTimeout(function () {
                        $button.removeClass('changed');
                        $button.text('Сохранить изменения');
                    }, 3000);
                }
            };

            panel.addNewTile = function () {
                ipc.send('addNewTile', panel.newTile);
                document.location = '#/';
            };

            panel.removeTile = function () {
                ipc.send('removeTile', index);
                document.location = '#/';
            };

            panel.currentTile = panel.tiles[index];
        });
})();

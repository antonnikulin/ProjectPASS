(function () {
    const ipc = require('electron').ipcRenderer;

    angular.module('Pass')
        .controller('TilesController', function ($routeParams) {
            var panel = this;
            var index = $routeParams.index;

            panel.tiles = ipc.sendSync('getTiles');

            panel.newTile = {};

            panel.goToAddress = function () {
                var address = panel.currentTile.address;
                if (address.indexOf('http') == -1) address = 'http://' + address;

                ipc.send('open', address);
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

(function () {
    angular.module('Pass').config(function ($routeProvider) {
        $routeProvider
            .when('/new', {
                templateUrl: 'app/tile/new-tile.template.html',
                controller: 'TilesController',
                controllerAs: 'tileCtrl'
            })
            .when('/tile/:index', {
                templateUrl: 'app/tile/tile.template.html',
                controller: 'TilesController',
                controllerAs: 'tileCtrl'
            })
            .otherwise({
                templateUrl: 'app/tile/tiles.template.html',
                controller: 'TilesController',
                controllerAs: 'tileCtrl'
            });
    });
})();

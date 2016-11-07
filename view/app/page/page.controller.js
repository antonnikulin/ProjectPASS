(function () {
    angular.module('Pass')
        .controller('PageController', function ($http) {
            this.goToHome = function () {
                document.location = '#/';
            }

            this.logout = function () {
                $http.get('ajax/logout').success(function () {
                    document.location = '/';
                })
            }
        });
})();

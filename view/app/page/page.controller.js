(function () {
    angular.module('Pass')
        .controller('PageController', function ($http) {
            this.goToHome = function () {
                document.location = '#/';
            }

            this.logout = function () {
                $http.get('logout').success(function () {
                    document.location = '/';
                })
            }
        });
})();

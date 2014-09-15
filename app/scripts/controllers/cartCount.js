'use strict';


angular.module('myYoApp')
    .controller('addCartCountCtrl', function ($scope) {

        $scope.cartCount = Util.localStorage.getStorageItem('cartCount');

        $scope.addCartCount = function(){

            if(!$scope.cartCount){

                $scope.cartCount = 0;
            }

            Util.localStorage.setStorageItem('cartCount', ++$scope.cartCount);
        };

    });

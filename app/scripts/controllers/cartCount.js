'use strict';


angular.module('letusgoApp')
    .controller('addCartCountCtrl', function ($scope, ItemsService) {

        $scope.cartCount = ItemsService.get('cartCount');

        $scope.addCartCount = function(){

            if(!$scope.cartCount){

                $scope.cartCount = 0;
            }

            ItemsService.set('cartCount', ++$scope.cartCount);
        };

    });

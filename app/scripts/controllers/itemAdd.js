'use strict';


angular.module('letusgoApp')
    .controller('ItemAddCtrl', function ($scope, ItemsService, ItemManagementService) {

        $scope.items = ItemsService.get('items');

        $scope.categorys = ItemsService.get('categorys');

        $scope.showItemSignal = false;

        $scope.addButton = function () {

          $scope.showItemSignal = true;
        };

        $scope.cancelButton = function () {

          $scope.showItemSignal = false;
        };

        $scope.deleteCurrentItem = function (item) {

          $scope.items = ItemManagementService.deleteItem($scope.items, item);
        };

        $scope.addNewItem = function (item, categoryName) {

         item.category = categoryName;

         $scope.items.push(item);

         ItemsService.set('items', $scope.items);

         $scope.showItemSignal = false;
       };
    });

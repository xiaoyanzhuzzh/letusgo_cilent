'use strict';


angular.module('letusgoApp')
    .controller('ItemAddCtrl', function ($scope,ItemManagementService) {

        $scope.items = Util.localStorage.getStorageItem('items');

        $scope.categorys = Util.localStorage.getStorageItem('categorys');

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

         Util.localStorage.setStorageItem('items', $scope.items);

         $scope.showItemSignal = false;
        }
    });

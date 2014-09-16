'use strict';


angular.module('letusgoApp')
  .controller('ItemModifyCtrl', function ($scope, CategoryService, ItemManagementService) {

    $scope.items = Util.localStorage.getStorageItem('items');

    //$scope.categorys = CategoryService.getCategorysAndId($scope.items);
    $scope.categorys = Util.localStorage.getStorageItem('categorys');

    $scope.showItemSignal = false;

    $scope.modifyButton = function (changingItem) {

      $scope.showItemSignal = true;
      Util.localStorage.setStorageItem('changingItem', changingItem);
    };

    $scope.cancelButton = function () {

      $scope.showItemSignal = false;
    };

    $scope.deleteCurrentItem = function (item) {

      $scope.items = ItemManagementService.deleteItem($scope.items, item);
    };

    $scope.modifyCurrentItem = function (newItem) {

      $scope.items = ItemManagementService.modifyItem(newItem, $scope.items);
    };

  });

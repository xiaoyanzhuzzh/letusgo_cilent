'use strict';


angular.module('letusgoApp')
  .controller('ItemModifyCtrl', function ($scope, CategoryService, ItemsService, ItemManagementService) {

    $scope.items = ItemsService.get('items');

    $scope.categorys = ItemsService.get('categorys');

    $scope.showItemSignal = false;

    $scope.modifyButton = function (changingItem) {

      $scope.showItemSignal = true;
      ItemsService.set('changingItem', changingItem);
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

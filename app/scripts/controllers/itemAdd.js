'use strict';


angular.module('letusgoApp')
  .controller('ItemAddCtrl', function ($scope, ItemsService, CategoryService) {

    $scope.$emit('to-parent-itemManagementActive');

    $scope.items = [];
    ItemsService.getItems(function(data) {
      $scope.items = data;
    });

    $scope.categories = [];
    CategoryService.getCategories(function(data) {
      $scope.categories = data;
    });

    $scope.showItemSignal = false;

    $scope.addButton = function () {

      $scope.showItemSignal = true;
    };

    $scope.cancelButton = function () {

      $scope.showItemSignal = false;
    };

    $scope.deleteCurrentItem = function (item) {

      ItemsService.deleteItem(item.id);
      ItemsService.getItems(function(data) {
        $scope.items = data;
      });
    };

    $scope.addNewItem = function (item) {

      ItemsService.setMaxItemId();
      ItemsService.getMaxItemId(function(data) {

        item.id = parseInt(data) + 1;

        ItemsService.addItem(item);
        ItemsService.getItems(function(data) {
          $scope.items = data;
        });
      });
      $scope.showItemSignal = false;
   };
});

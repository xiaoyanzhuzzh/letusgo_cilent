'use strict';


angular.module('letusgoApp')
  .controller('ItemModifyCtrl', function ($scope, CategoryService, ItemsService) {

    $scope.items = [];
    ItemsService.getItems(function(data) {
      $scope.items = data;
    });

    $scope.categories = [];
    CategoryService.getCategories(function(data) {
      $scope.categories = data;
    });

    $scope.showItemSignal = false;

    $scope.modifyButton = function (item) {

      $scope.showItemSignal = true;
      $scope.itemInfo = {
        id: item.id,
        name: item.name,
        unit: item.unit,
        price: item.price,
      };
    };

    $scope.cancelButton = function () {

      $scope.showItemSignal = false;
    };

    $scope.deleteCurrentItem = function (item) {

      ItemsService.deleteItem(item, function(data) {

        $scope.items = data;
      });
    };

    $scope.modifyCurrentItem = function (newItem, categoryName) {

      newItem.category = categoryName;
      console.log(newItem);
      // ItemsService.modifyItem(newItem, function(data){
      //
      //   $scope.items = data;
      // });
      // $scope.items = ItemManagementService.modifyItem(newItem, $scope.items);
    };

  });

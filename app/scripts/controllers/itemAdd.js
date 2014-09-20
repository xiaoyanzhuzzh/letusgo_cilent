'use strict';


angular.module('letusgoApp')
    .controller('ItemAddCtrl', function ($scope, ItemsService, ItemManagementService, CategoryService) {

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

          $scope.items = ItemManagementService.deleteItem($scope.items, item);
        };

        $scope.addNewItem = function (item, categoryName) {

         item.category = categoryName;

         $scope.items.push(item);

         ItemsService.set('items', $scope.items);

         $scope.showItemSignal = false;
       };
    });

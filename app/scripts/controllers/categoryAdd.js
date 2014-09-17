'use strict';


angular.module('letusgoApp')
    .controller('CategoryAddCtrl', function ($scope, ItemsService, CategoryService) {

        $scope.items = ItemsService.get('items');

        $scope.categorys = ItemsService.get('categorys');

        $scope.showSignal = false;

        $scope.addButton = function () {

            $scope.showSignal = true;

        };
        $scope.cancelButton = function () {

          $scope.showSignal = false;
        };

        $scope.deleteCurrentCategory = function (category) {

            $scope.categorys = CategoryService.deleteCategory($scope.categorys, category);
            $scope.items = CategoryService.deleteItem($scope.items, category);
        };

        $scope.addNewCategory = function (newCategory) {

            var category = {id: 0, name: newCategory};
            category.id = $scope.categorys[$scope.categorys.length - 1].id + 1;

            $scope.categorys.push(category);
            ItemsService.set('categorys', $scope.categorys);

            $scope.showSignal = false;
        };
    });

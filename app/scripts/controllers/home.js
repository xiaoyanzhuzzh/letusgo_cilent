'use strict';


angular.module('letusgoApp')
  .controller('HomeCtrl', function ($scope, ItemsService, CategoryService) {

    $scope.$emit('to-parent-homeActive');

    $scope.items = ItemsService.getItems();
    $scope.categorys = CategoryService.getCategorysAndId($scope.items);
  });

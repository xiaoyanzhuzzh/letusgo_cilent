'use strict';


angular.module('myYoApp')
  .controller('HomeCtrl', function ($scope, itemsService, categoryService) {

    $scope.items = itemsService.getItems();
    $scope.categorys = categoryService.getCategorysAndId($scope.items);
  });

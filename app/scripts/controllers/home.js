'use strict';


angular.module('letusgoApp')
  .controller('HomeCtrl', function ($scope, itemsService, categoryService) {

    $scope.items = itemsService.getItems();
    $scope.categorys = categoryService.getCategorysAndId($scope.items);
  });

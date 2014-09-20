'use strict';


angular.module('letusgoApp')
  .controller('HomeCtrl', function ($scope) {

    $scope.$emit('to-parent-homeActive');
  });

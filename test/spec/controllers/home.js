'use strict';
describe('HomeCtrl', function () {

  var $scope, ItemsService, CategoryService, createController;

  beforeEach(function () {
       module('letusgoApp');

       inject(function ($injector) {

           $scope = $injector.get('$rootScope').$new();
           ItemsService = $injector.get('ItemsService');
           CategoryService = $injector.get('CategoryService');

           var $controller = $injector.get('$controller');

           createController = function () {

             return $controller ('HomeCtrl', {
                  $scope: $scope,
                  ItemsService: ItemsService,
                  CategoryService: CategoryService
             });
           };
       });
  });

  it('should emit to parent controller', function () {

    spyOn($scope, '$emit');
    createController();
    expect($scope.$emit).toHaveBeenCalledWith('to-parent-homeActive');
  });
});

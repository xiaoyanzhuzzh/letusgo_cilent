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

  it ('should load items', function () {

    spyOn(ItemsService, 'getItems').and.returnValue([]);
    createController();

    expect($scope.items.length).toEqual(0);
    expect(ItemsService.getItems).toHaveBeenCalled();
  });

  it ('should load categorys', function () {

    spyOn(CategoryService, 'getCategorysAndId').and.returnValue([]);
    createController();

    expect($scope.categorys.length).toEqual(0);
    expect(CategoryService.getCategorysAndId).toHaveBeenCalled();
  });
});

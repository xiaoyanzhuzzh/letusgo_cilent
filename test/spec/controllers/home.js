'use strict';
describe('HomeCtrl', function () {

  var $scope, itemsService, categoryService, createController;

  beforeEach(function () {
       module('letusgoApp');

       inject(function ($injector) {

           $scope = $injector.get('$rootScope').$new();
           itemsService = $injector.get('itemsService');
           categoryService = $injector.get('categoryService');

           var $controller = $injector.get('$controller');

           createController = function () {

             return $controller ('HomeCtrl', {
                  $scope: $scope,
                  itemsService: itemsService,
                  categoryService: categoryService
             });
           };
       });
  });

  it ('should load items', function () {

    spyOn(itemsService, 'getItems').and.returnValue([]);
    createController();

    expect($scope.items.length).toEqual(0);
    expect(itemsService.getItems.calls.length).toBe(1);
  });

  it ('should load categorys', function () {

    spyOn(categoryService, 'getCategorysAndId').and.returnValue([]);
    createController();

    expect($scope.categorys.length).toEqual(0);
    expect(categoryService.getCategorysAndId.calls.length).toBe(1);
  });
});

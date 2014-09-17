'use strict';
describe('addCartCountCtrl', function () {

  var $scope, createController, ItemsService;

  beforeEach(function () {
       module('letusgoApp');

       inject(function ($injector) {

           $scope = $injector.get('$rootScope').$new();
           ItemsService = $injector.get('ItemsService');

           var $controller = $injector.get('$controller');

           createController = function () {

             return $controller ('addCartCountCtrl', {
                  $scope: $scope,
                  ItemsService: ItemsService
             });
           };
       });
  });

  it ('should load cartCount from localStorage', function () {

    spyOn(ItemsService, 'get').and.returnValue(31);
    createController();

    expect($scope.cartCount).toEqual(31);
    expect(ItemsService.get).toHaveBeenCalled();
  });

  describe('addCartCount',function () {

    beforeEach(function () {

      spyOn(ItemsService, 'set');
    });

    it ('should make cartCount add by 1', function () {
      spyOn(ItemsService, 'get').and.returnValue(31);
      createController();
      $scope.addCartCount();

      expect($scope.cartCount).toEqual(32);

      expect(ItemsService.get).toHaveBeenCalled();
      expect(ItemsService.set).toHaveBeenCalled();
    });

    it ('should make cartItems be 0', function () {

      spyOn(ItemsService, 'get').and.returnValue(undefined);
      createController();
      $scope.addCartCount();

      expect($scope.cartCount).toEqual(1);
      expect(ItemsService.get).toHaveBeenCalled();
      expect(ItemsService.set).toHaveBeenCalled();
    });
  });
});

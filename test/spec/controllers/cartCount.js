'use strict';
describe('addCartCountCtrl', function () {

  var $scope, createController;

  beforeEach(function () {
       module('letusgoApp');

       inject(function ($injector) {

           $scope = $injector.get('$rootScope').$new();

           var $controller = $injector.get('$controller');

           createController = function () {

             return $controller ('addCartCountCtrl', {
                  $scope: $scope
             });
           };
       });
  });

  it ('should load cartCount from localStorage', function () {

    spyOn(Util.localStorage, 'getStorageItem').and.returnValue(31);
    createController();

    expect($scope.cartCount).toEqual(31);
    expect(Util.localStorage.getStorageItem).toHaveBeenCalled();
  });

  describe('addCartCount',function () {

    beforeEach(function () {

      spyOn(Util.localStorage, 'setStorageItem');
    });

    it ('should make cartCount add by 1', function () {
      spyOn(Util.localStorage, 'getStorageItem').and.returnValue(31);
      createController();
      $scope.addCartCount();

      expect($scope.cartCount).toEqual(32);
      expect(Util.localStorage.getStorageItem.calls.length).toBe(1);
      expect(Util.localStorage.setStorageItem.calls.length).toBe(1);
    });

    it ('should make cartItems be 0', function () {

      spyOn(Util.localStorage, 'getStorageItem').and.returnValue(undefined);
      createController();
      $scope.addCartCount();

      expect($scope.cartCount).toEqual(1);
      expect(Util.localStorage.getStorageItem).calls.length).toBe(1);
      expect(Util.localStorage.setStorageItem.calls.length).toBe(1);
    });
  });
});

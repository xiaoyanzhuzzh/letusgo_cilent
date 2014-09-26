'use strict';
describe('CartPayListCtrl', function () {
   var $scope, CartItemsService, createController, ItemsService, cartPayList;
  beforeEach(function () {
    module('letusgoApp');

    inject(function ($injector) {

      $scope = $injector.get('$rootScope').$new();
      CartItemsService = $injector.get('CartItemsService');
      ItemsService = $injector.get('ItemsService');

      var $controller = $injector.get('$controller');

      createController = function () {

        return $controller ('CartPayListCtrl', {
          $scope: $scope,
          CartItemsService: CartItemsService,
          ItemsService: ItemsService
        });
      };
    });

    cartPayList = [{item: {id: 5,barcode:'ITEM000005', name:'方便面', unit:'袋',price: 4.50, category:'零食'}, number: 1}];
    spyOn(CartItemsService,'getCartItems').and.callFake(function(callback){

      callback(cartPayList);
    });
  });

  it('should emit to parent controller', function () {

    spyOn($scope, '$emit');
    createController();
    expect($scope.$emit).toHaveBeenCalledWith('to-parent-cartPayListActive');
  });

  describe('cartPayList', function () {

    beforeEach(function() {

      spyOn(CartItemsService, 'getTotalMoney');
      spyOn(CartItemsService, 'getTotalNumber');
    });

    it('should load cartPayList', function () {

      createController();

      expect($scope.cartPayList.length).toBe(1);

      expect(CartItemsService.getTotalMoney.calls.count()).toBe(1);
      expect(CartItemsService.getTotalNumber.calls.count()).toBe(1);
    });
  });

  describe('showPaySignal', function () {
    it('should load showPaySignal', function () {

      createController();

      expect($scope.showPaySignal).toBe(true);
    });
  });

  describe('showFinishPaySignal', function () {
    it('should load showFinishPaySignal', function () {

      createController();

      expect($scope.showFinishPaySignal).toBe(false);
    });
  });

  describe('payButton function', function () {
    it('should have payButton function', function () {

//      spyOn('CartItemsService', 'emptyCartItems');
      createController();
      $scope.payButton();

      expect($scope.showFinishPaySignal).toBe(true);
      expect($scope.showFinishPaySignal).toBe(true);
//      expect(CartItemsService.emptyCartItems).toHaveBeenCalled();
    });
  });
});

'use strict';
describe('CartPayListCtrl', function () {
   var $scope, CartItemsService, createController, ItemsService;
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
  });

  describe('cartPayList', function () {
    it('should load cartPayList', function () {

      createController();

      expect($scope.cartPayList.length).toBe(0);
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

      //spyOn('CartItemsService', 'emptyCartItems');
      createController();
      $scope.payButton();

      expect($scope.showFinishPaySignal).toBe(true);
      expect($scope.showFinishPaySignal).toBe(true);
      //expect(CartItemsService.emptyCartItems).toHaveBeenCalled();
    });
  });



//    describe('totalMoney', function () {
//
//      beforeEach(function () {
//
//        spyOn(ItemsService, 'get');
//        spyOn(CartItemsService,'getTotalMoney').and.returnValue(1);
//        createController();
//      });
//
//      it ('should get totalMoney', function () {
//
//        expect($scope.total).toEqual(1);
//        expect(CartItemsService.getTotalMoney).toHaveBeenCalled();
//      });
//    });
//
//    describe('totalNumber', function () {
//
//      beforeEach(function () {
//
//        spyOn(ItemsService, 'get');
//        spyOn(CartItemsService,'getTotalNumber').and.returnValue(1);
//        createController();
//      });
//
//      it ('should get totalNumber', function () {
//
//        expect($scope.totalNumber).toEqual(1);
//        expect(CartItemsService.getTotalNumber).toHaveBeenCalled();
//        expect(ItemsService.get).toHaveBeenCalled();
//      });
//    });


});

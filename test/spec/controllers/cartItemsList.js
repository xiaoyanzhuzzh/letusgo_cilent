'use strict';
describe('CartItemsListCtrl', function () {
  var $scope, createController, cartItemOperateService;
   beforeEach(function () {

     module('letusgoApp');

     inject(function ($injector) {

       $scope = $injector.get('$rootScope').$new();
       cartItemOperateService = $injector.get('cartItemOperateService');

       var $controller = $injector.get('$controller');

       createController = function () {

         return $controller ('CartItemsListCtrl', {
           $scope: $scope,
           cartItemOperateService: cartItemOperateService
         });
       };
     });
   });

  describe('cartItems', function () {

    it('should load cartItems', function () {
      spyOn(Util.localStorage, 'getStorageItem').and.returnValue(
        [{item: {barcode:'ITEM000001', name: '雪碧', unit:'瓶', price:3.00, category:'饮品'},number: 1}]
      );
      createController();

      expect($scope.cartItems.length).toBe(1);
      expect($scope.cartItems[0].number).toEqual(1);
      expect($scope.cartItems[0].item.barcode).toEqual('ITEM000001');
      expect(Util.localStorage.getStorageItem).toHaveBeenCalled();
    });
  });

  describe('total', function () {

    it('should load total', function () {

      spyOn(Util.localStorage, 'getStorageItem');
      spyOn(cartItemOperateService,'getTotalMoney').and.returnValue(3);
      createController();

      expect($scope.total).toBe(3);
      expect(Util.localStorage.getStorageItem).toHaveBeenCalled();
    });
  });

  describe('totalNumber', function () {

    it('should load totalNumber', function () {

      spyOn(Util.localStorage, 'getStorageItem');
      spyOn(cartItemOperateService,'getTotalNumber').and.returnValue(1);
      createController();

      expect($scope.totalNumber).toBe(1);
      expect(Util.localStorage.getStorageItem).toHaveBeenCalled();
    });
  });

  describe('changeCartItemNumber', function () {
    var cartItem;

    beforeEach(function () {

      cartItem = {item: {barcode:'ITEM000000', name: '可口可乐', unit: '瓶', price:3.00, category:'饮品'}, number: 2};
      spyOn(cartItemOperateService, 'getTotalMoney');
      spyOn(cartItemOperateService, 'getTotalNumber');
      spyOn(cartItemOperateService, 'changeCurrentCartItemNumber');
      createController();
    });

    it('can change the cartItem number', function () {

      $scope.changeCartItemNumber(cartItem);

      expect(cartItemOperateService.getTotalMoney).toHaveBeenCalled();
      expect(cartItemOperateService.getTotalNumber).toHaveBeenCalled();
      expect(cartItemOperateService.changeCurrentCartItemNumber).toHaveBeenCalled();
    });
  });

  describe('addCartItemNumber', function () {
    var cartItem;

    beforeEach(function () {

      cartItem = {item: {barcode:'ITEM000000', name: '可口可乐', unit: '瓶', price:3.00, category:'饮品'}, number: 2};
      spyOn(cartItemOperateService, 'getTotalMoney');
      spyOn(cartItemOperateService, 'getTotalNumber');
      spyOn(cartItemOperateService, 'addCartItemNumber');
      createController();
    });

    it('can change the cartItem number', function () {

      $scope.addCartItemNumber(cartItem);

      expect(cartItemOperateService.getTotalMoney).toHaveBeenCalled();
      expect(cartItemOperateService.getTotalNumber).toHaveBeenCalled();
      expect(cartItemOperateService.addCartItemNumber).toHaveBeenCalled();

    });

  });

  describe('reduceCartItemNumber', function () {
    var cartItem;

    beforeEach(function () {

      cartItem = {item: {barcode:'ITEM000000', name: '可口可乐', unit: '瓶', price:3.00, category:'饮品'}, number: 2};
      spyOn(cartItemOperateService, 'getTotalMoney');
      spyOn(cartItemOperateService, 'getTotalNumber');
      spyOn(cartItemOperateService, 'reduceCartItemNumber');
      createController();
    });

    it('can change the cartItem number', function () {

      $scope.reduceCartItemNumber(cartItem);

      expect(cartItemOperateService.getTotalMoney).toHaveBeenCalled();
      expect(cartItemOperateService.getTotalNumber).toHaveBeenCalled();
      expect(cartItemOperateService.reduceCartItemNumber).toHaveBeenCalled();

    });

  });

  describe('deleteCartItem', function () {
    var cartItem;

    beforeEach(function () {

      cartItem = {item: {barcode:'ITEM000000', name: '可口可乐', unit: '瓶', price:3.00, category:'饮品'}, number: 2};
      spyOn(cartItemOperateService, 'getTotalMoney');
      spyOn(cartItemOperateService, 'getTotalNumber');
      spyOn(cartItemOperateService, 'deleteCartItem');
      createController();
    });

    it('can change the cartItem number', function () {

      $scope.deleteCartItem(cartItem);

      expect(cartItemOperateService.getTotalMoney).toHaveBeenCalled();
      expect(cartItemOperateService.getTotalNumber).toHaveBeenCalled();
      expect(cartItemOperateService.deleteCartItem).toHaveBeenCalled();
    });
  });
});

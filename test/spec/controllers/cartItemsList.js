'use strict';
describe('CartItemsListCtrl', function () {
  var $scope, createController, CartItemOperateService, ItemsService;
   beforeEach(function () {

     module('letusgoApp');

     inject(function ($injector) {

       $scope = $injector.get('$rootScope').$new();
       CartItemOperateService = $injector.get('CartItemOperateService');
       ItemsService = $injector.get('ItemsService');

       var $controller = $injector.get('$controller');

       createController = function () {

         return $controller ('CartItemsListCtrl', {
           $scope: $scope,
           CartItemOperateService: CartItemOperateService,
           ItemsService: ItemsService
         });
       };
     });
   });

  describe('cartItems', function () {

    it('should load cartItems', function () {
      spyOn(ItemsService, 'get').and.returnValue(
        [{item: {barcode:'ITEM000001', name: '雪碧', unit:'瓶', price:3.00, category:'饮品'},number: 1}]
      );
      createController();

      expect($scope.cartItems.length).toBe(1);
      expect($scope.cartItems[0].number).toEqual(1);
      expect($scope.cartItems[0].item.barcode).toEqual('ITEM000001');
      expect(ItemsService.get).toHaveBeenCalled();
    });
  });

  describe('total', function () {

    it('should load total', function () {

      spyOn(ItemsService, 'get');
      spyOn(CartItemOperateService,'getTotalMoney').and.returnValue(3);
      createController();

      expect($scope.total).toBe(3);
      expect(ItemsService.get).toHaveBeenCalled();
    });
  });

  describe('totalNumber', function () {

    it('should load totalNumber', function () {

      spyOn(ItemsService, 'get');
      spyOn(CartItemOperateService,'getTotalNumber').and.returnValue(1);
      createController();

      expect($scope.totalNumber).toBe(1);
      expect(ItemsService.get).toHaveBeenCalled();
    });
  });

  describe('changeCartItemNumber', function () {
    var cartItem;

    beforeEach(function () {

      cartItem = {item: {barcode:'ITEM000000', name: '可口可乐', unit: '瓶', price:3.00, category:'饮品'}, number: 2};
      spyOn(CartItemOperateService, 'getTotalMoney');
      spyOn(CartItemOperateService, 'getTotalNumber');
      spyOn(CartItemOperateService, 'changeCurrentCartItemNumber');
      createController();
    });

    it('can change the cartItem number', function () {

      $scope.changeCartItemNumber(cartItem);

      expect(CartItemOperateService.getTotalMoney).toHaveBeenCalled();
      expect(CartItemOperateService.getTotalNumber).toHaveBeenCalled();
      expect(CartItemOperateService.changeCurrentCartItemNumber).toHaveBeenCalled();
    });
  });

  describe('addCartItemNumber', function () {
    var cartItem;

    beforeEach(function () {

      cartItem = {item: {barcode:'ITEM000000', name: '可口可乐', unit: '瓶', price:3.00, category:'饮品'}, number: 2};
      spyOn(CartItemOperateService, 'getTotalMoney');
      spyOn(CartItemOperateService, 'getTotalNumber');
      spyOn(CartItemOperateService, 'addCartItemNumber');
      createController();
    });

    it('can change the cartItem number', function () {

      $scope.addCartItemNumber(cartItem);

      expect(CartItemOperateService.getTotalMoney).toHaveBeenCalled();
      expect(CartItemOperateService.getTotalNumber).toHaveBeenCalled();
      expect(CartItemOperateService.addCartItemNumber).toHaveBeenCalled();

    });

  });

  describe('reduceCartItemNumber', function () {
    var cartItem;

    beforeEach(function () {

      cartItem = {item: {barcode:'ITEM000000', name: '可口可乐', unit: '瓶', price:3.00, category:'饮品'}, number: 2};
      spyOn(CartItemOperateService, 'getTotalMoney');
      spyOn(CartItemOperateService, 'getTotalNumber');
      spyOn(CartItemOperateService, 'reduceCartItemNumber');
      createController();
    });

    it('can change the cartItem number', function () {

      $scope.reduceCartItemNumber(cartItem);

      expect(CartItemOperateService.getTotalMoney).toHaveBeenCalled();
      expect(CartItemOperateService.getTotalNumber).toHaveBeenCalled();
      expect(CartItemOperateService.reduceCartItemNumber).toHaveBeenCalled();

    });

  });

  describe('deleteCartItem', function () {
    var cartItem;

    beforeEach(function () {

      cartItem = {item: {barcode:'ITEM000000', name: '可口可乐', unit: '瓶', price:3.00, category:'饮品'}, number: 2};
      spyOn(CartItemOperateService, 'getTotalMoney');
      spyOn(CartItemOperateService, 'getTotalNumber');
      spyOn(CartItemOperateService, 'deleteCartItem');
      createController();
    });

    it('can change the cartItem number', function () {

      $scope.deleteCartItem(cartItem);

      expect(CartItemOperateService.getTotalMoney).toHaveBeenCalled();
      expect(CartItemOperateService.getTotalNumber).toHaveBeenCalled();
      expect(CartItemOperateService.deleteCartItem).toHaveBeenCalled();
    });
  });
});

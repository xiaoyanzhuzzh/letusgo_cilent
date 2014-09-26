'use strict';
describe('CartItemsListCtrl', function () {
  var $scope, createController, CartItemsService, ItemsService, cartItems;
   beforeEach(function () {

     module('letusgoApp');

     inject(function ($injector) {

       $scope = $injector.get('$rootScope').$new();
       CartItemsService = $injector.get('CartItemsService');
       ItemsService = $injector.get('ItemsService');

       var $controller = $injector.get('$controller');

       createController = function () {

         return $controller ('CartItemsListCtrl', {
           $scope: $scope,
           CartItemsService: CartItemsService,
           ItemsService: ItemsService
         });
       };
     });
   });

  it('should emit to parent controller', function () {

    spyOn($scope, '$emit');
    createController();
    expect($scope.$emit).toHaveBeenCalledWith('to-parent-cartItemsListActive');
  });

  describe('cartItems', function () {

    it('should load cartItems', function () {

      createController();

      expect($scope.cartItems.length).toBe(0);
    });
  });

//  describe('total', function () {
//
//    it('should load total', function () {
//
//      spyOn(CartItemsService,'getTotalMoney').and.returnValue(3);
//      spyOn(CartItemsService,'getCartItems');
//
//      createController();
//
//      expect($scope.total).toBe(3);
//    });
//  });
//
//  describe('totalNumber', function () {
//
//    it('should load totalNumber', function () {
//
//      spyOn(CartItemsService,'getTotalNumber').and.returnValue(1);
//      createController();
//
//      expect($scope.totalNumber).toBe(1);
//    });
//  });

  describe('changeCartItemNumber', function () {
    var cartItem;

    beforeEach(function () {

      cartItem = {item: {barcode:'ITEM000000', name: '可口可乐', unit: '瓶', price:3.00, category:'饮品'}, number: 2};
      spyOn(CartItemsService, 'getTotalMoney');
      spyOn(CartItemsService, 'getTotalNumber');
      spyOn(CartItemsService, 'changeCartItemNumber');
      createController();
    });

    it('can change the cartItem number', function () {

      $scope.changeCartItemNumber(cartItem);

//      expect(CartItemsService.getTotalMoney).toHaveBeenCalled();
//      expect(CartItemsService.getTotalNumber).toHaveBeenCalled();
      expect(CartItemsService.changeCartItemNumber).toHaveBeenCalled();
    });
  });

  describe('addCartItemNumber', function () {
    var cartItem;

    beforeEach(function () {

      cartItem = {item: {id: 0, barcode:'ITEM000000', name: '可口可乐', unit: '瓶', price:3.00, category:'饮品'}, number: 2};
      spyOn(CartItemsService, 'getTotalMoney');
      spyOn(CartItemsService, 'getTotalNumber');
      spyOn(CartItemsService, 'addCartItemNumber');
      createController();
    });

    it('can change the cartItem number', function () {

      $scope.addCartItemNumber(cartItem);

//      expect(CartItemsService.getTotalMoney).toHaveBeenCalled();
//      expect(CartItemsService.getTotalNumber).toHaveBeenCalled();
      expect(CartItemsService.addCartItemNumber).toHaveBeenCalled();

    });

  });

  describe('reduceCartItemNumber', function () {
    var cartItem;

    beforeEach(function () {

      cartItem = {item: {id: 7, barcode:'ITEM000000', name: '可口可乐', unit: '瓶', price:3.00, category:'饮品'}, number: 2};
      spyOn(CartItemsService, 'getTotalMoney');
      spyOn(CartItemsService, 'getTotalNumber');
      spyOn(CartItemsService, 'reduceCartItemNumber');
      createController();
    });

    it('can change the cartItem number', function () {

      $scope.reduceCartItemNumber(cartItem);

      //expect(CartItemsService.getTotalMoney).toHaveBeenCalled();
      //expect(CartItemsService.getTotalNumber).toHaveBeenCalled();
      expect(CartItemsService.reduceCartItemNumber).toHaveBeenCalled();

    });

  });

  describe('deleteCartItem', function () {
    var cartItem;

    beforeEach(function () {

      cartItem = {item: {id:9, barcode:'ITEM000000', name: '可口可乐', unit: '瓶', price:3.00, category:'饮品'}, number: 2};
      spyOn(CartItemsService, 'getTotalMoney');
      spyOn(CartItemsService, 'getTotalNumber');
      spyOn(CartItemsService, 'deleteCartItem');
      createController();
    });

    it('can change the cartItem number', function () {

      $scope.deleteCartItem(cartItem);

//      expect(CartItemsService.getTotalMoney).toHaveBeenCalled();
//      expect(CartItemsService.getTotalNumber).toHaveBeenCalled();
      expect(CartItemsService.deleteCartItem).toHaveBeenCalled();
    });
  });
});

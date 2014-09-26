'use strict';
describe('Controller: ItemsListCtrl', function () {

  var $scope, ItemsService, createController, CartItemsService, items, cartItems;

  beforeEach(function () {
    module('letusgoApp');

    inject(function ($injector) {

      $scope = $injector.get('$rootScope').$new();
      ItemsService = $injector.get('ItemsService');
      CartItemsService = $injector.get('CartItemsService');

      var $controller = $injector.get('$controller');

      createController = function () {
        return $controller ('ItemsListCtrl', {
          $scope: $scope,
          ItemsService: ItemsService,
          CartItemsService: CartItemsService
        });
      };
    });

    items = [{id: 5,barcode:'ITEM000005', name:'方便面', unit:'袋',price: 4.50, category:'零食'}];
    spyOn(ItemsService, 'getItems').and.callFake(function(callback){

      callback(items);
    });

    cartItems = [{item: {id: 5,barcode:'ITEM000005', name:'方便面', unit:'袋',price: 4.50, category:'零食'}, number: 1}];
    spyOn(CartItemsService,'getCartItems').and.callFake(function(callback){

      callback(cartItems);
    });
  });

  it('should load items from server', function() {

    createController();
    expect($scope.items.length).toBe(1);
    expect($scope.items[0].id).toBe(5);
  });

  it('should load cartItems from server', function() {

    createController();
    expect($scope.cartItems.length).toBe(1);
    expect($scope.cartItems[0].item.name).toEqual('方便面');
  });

  it('should emit to parent controller', function () {

    spyOn($scope, '$emit');
    createController();
    expect($scope.$emit).toHaveBeenCalledWith('to-parent-itemsListActive');
  });

  describe ('addToCartButton can add item to cartItem', function () {

    it ('function should have been called and can add different to cart', function () {

      var itemA = {id: 0, barcode:'ITEM000001', name: '雪碧', unit:'瓶', price:3.00, category:'饮品'};

      spyOn(CartItemsService, 'setCartItems');
      spyOn($scope, '$emit');
      createController();
      $scope.addToCartButton(itemA);

      expect(CartItemsService.setCartItems.calls.count()).toBe(1);
      expect($scope.$emit).toHaveBeenCalledWith('to-parent-cartCount');
    });
  });
});

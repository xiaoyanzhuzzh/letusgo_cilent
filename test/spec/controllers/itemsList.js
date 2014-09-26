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
  });

  it('should emit to parent controller', function () {

    spyOn($scope, '$emit');
    createController();
    expect($scope.$emit).toHaveBeenCalledWith('to-parent-itemsListActive');
  });

  it ('should load items from redis', function () {

    createController();

    expect($scope.items.length).toBe(0);
  });

  it ('should load cartItems from redis', function () {

    createController();

    expect($scope.cartItems.length).toBe(0);
  });

  describe ('addToCartButton can add item to cartItem', function () {

    it ('function should have been called and can add different to cart', function () {

      var itemA = {id: 0, barcode:'ITEM000001', name: '雪碧', unit:'瓶', price:3.00, category:'饮品'};

      spyOn(CartItemsService, 'setCartItems');
      createController();
      $scope.addToCartButton(itemA);

      expect(CartItemsService.setCartItems.calls.count()).toBe(1);
    });
  });
});

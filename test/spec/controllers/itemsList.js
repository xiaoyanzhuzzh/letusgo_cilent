'use strict';
describe('Controller: ItemsListCtrl', function () {

  var $scope, itemsService, createController, addToCartService;

  beforeEach(function () {
    module('letusgoApp');

    inject(function ($injector) {

        $scope = $injector.get('$rootScope').$new();
        itemsService = $injector.get('itemsService');
        addToCartService = $injector.get('addToCartService');

        var $controller = $injector.get('$controller');

        createController = function () {
          return $controller ('ItemsListCtrl', {
               $scope: $scope,
               itemsService: itemsService,
               addToCartService: addToCartService
          });
        };
    });
  });

  describe ('allItems', function () {
      beforeEach(function () {
          var items = [
                 {barcode:'ITEM000000', name: '可口可乐', unit: '瓶', price:3.00, category:'饮品'},
                 {barcode:'ITEM000001', name: '雪碧', unit:'瓶', price:3.00, category:'饮品'}
              ];

          spyOn(Util.localStorage, 'getStorageItem').and.returnValue(items);
          createController();

    });

    it ('The length should be 2', function () {
        expect($scope.items.length).toBe(2);
    });

    it ('should has items barcode', function () {
        expect($scope.items[0].barcode).toEqual('ITEM000000');
    });

    it ('should has items name', function () {
         expect($scope.items[1].name).toEqual('雪碧');
    });

    it ('should has items unit', function () {
        expect($scope.items[0].unit).toEqual('瓶');
    });

    it ('should has items price', function () {
        expect($scope.items[0].price).toEqual(3.00);
    });

    it ('should has items category', function () {
         expect($scope.items[1].category).toEqual('饮品');
    });

  });

  describe ('cartItems',function () {

    it ('should load cartItems from localStorage', function () {

      spyOn(Util.localStorage, 'getStorageItem');

      createController();

      expect(Util.localStorage.getStorageItem).toHaveBeenCalled();
    });
  });

  describe ('addToCart can make existed cartItem number add by 1', function () {

    var item;

    beforeEach(function () {

      item = [{barcode:'ITEM000000', name: '可口可乐', unit: '瓶', price:3.00, category:'饮品'}];

      spyOn(Util.localStorage, 'getStorageItem').and.returnValue(undefined);
      spyOn(addToCartService, 'isExistInCart').and.returnValue(undefined);

      createController();
    });

    it ('function should have been called', function () {

      $scope.addToCart(item[0]);

      expect(Util.localStorage.getStorageItem).toHaveBeenCalled();
      expect(addToCartService.isExistInCart).toHaveBeenCalled();
    });
  });

  describe ('addToCart can add item to cartItem', function () {

    var itemA, itemB;

    beforeEach(function () {

      itemA = {barcode:'ITEM000000', name: '可口可乐', unit: '瓶', price:3.00, category:'饮品'};
      itemB = {barcode:'ITEM000001', name: '雪碧', unit:'瓶', price:3.00, category:'饮品'};

      spyOn(Util.localStorage, 'getStorageItem').and.returnValue(

          [{item: {barcode:'ITEM000001', name: '雪碧', unit:'瓶', price:3.00, category:'饮品'},number: 1}]
      );

      spyOn(Util.localStorage, 'setStorageItem');
    });

    it ('function should have been called and can add different to cart', function () {

      spyOn(addToCartService, 'isExistInCart');
      createController();
      $scope.addToCart(itemA);

      expect($scope.cartItems.length).toBe(2);
      expect(addToCartService.isExistInCart).toHaveBeenCalled();
      expect(Util.localStorage.getStorageItem).toHaveBeenCalled();
      expect(Util.localStorage.setStorageItem).toHaveBeenCalled();

      expect($scope.cartItems[0].number).toBe(1);
      expect($scope.cartItems[0].item.barcode).toBe('ITEM000001');

      expect($scope.cartItems[1].number).toBe(1);
      expect($scope.cartItems[1].item.barcode).toBe('ITEM000000');
    });

    it ('function should have been called and can make the same cartItem number add by 1', function () {

      spyOn(addToCartService, 'isExistInCart').and.returnValue(

        {item: {barcode:'ITEM000001', name: '雪碧', unit:'瓶', price:3.00, category:'饮品'},number: 1}
      );
      createController();
      $scope.addToCart(itemB);

      expect($scope.cartItems.length).toBe(1);
      expect(addToCartService.isExistInCart).toHaveBeenCalled();
      expect(Util.localStorage.getStorageItem).toHaveBeenCalled();
      expect(Util.localStorage.setStorageItem).toHaveBeenCalled();

      expect($scope.cartItems[0].number).toBe(1);
      expect($scope.cartItems[0].item.barcode).toBe('ITEM000001');
    });
  });
});

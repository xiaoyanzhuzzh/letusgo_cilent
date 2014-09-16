'use strict';
describe('AddToCartService', function () {

    var AddToCartService;

    beforeEach(function () {

        module('letusgoApp');

        inject(function ($injector) {

            AddToCartService = $injector.get('AddToCartService');
        });
    });

    it ('should have isExistInCart function and return undefined because category.length is 0', function(){

      var barcode = 'ITEM000000';
      var cartItems = [];
      var result = AddToCartService.isExistInCart(barcode, cartItems);

      expect(result).toBe(undefined);
    });

    it ('should have isExistInCart function and return undefined because the barcodes id not equal', function(){

      var barcode = 'ITEM000000';
      var item = {barcode:'ITEM000001', name: '雪碧', unit:'瓶', price:3.00, category:'饮品'};
      var cartItems = [{item: item, number: 1}];
      var result = AddToCartService.isExistInCart(barcode, cartItems);

      expect(result).toBe(undefined);
    });

    it ('should have isExistInCart function and return cartItem', function(){

      var barcode = 'ITEM000001';
      var item = {barcode:'ITEM000001', name: '雪碧', unit:'瓶', price:3.00, category:'饮品'};
      var cartItems = [{item: item, number: 1}];
      var result = AddToCartService.isExistInCart(barcode, cartItems);

      expect(result).toEqual(cartItems[0]);
    });
});

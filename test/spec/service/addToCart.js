describe('addToCartService', function () {

    var addToCartService;

    beforeEach(function () {

        module('myYoApp');

        inject(function ($injector) {

            addToCartService = $injector.get('addToCartService');
        });
    });

    it ('should have isExistInCart function and return undefined', function(){

      var barcode = 'ITEM000000';
      var cartItems = [];
      var result = addToCartService.isExistInCart(barcode, cartItems);

      expect(result).toBe(undefined);
    });

    it ('should have isExistInCart function and return cartItem', function(){

      var barcode = 'ITEM000001';
      var item = {barcode:'ITEM000001', name: '雪碧', unit:'瓶', price:3.00, category:'饮品'};
      var cartItems = [{item: item, number: 1}];
      var result = addToCartService.isExistInCart(barcode, cartItems);

      expect(result).toEqual(cartItems[0]);
    });
});

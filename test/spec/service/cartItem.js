'use strict';
describe('CartItemsService', function () {

  var CartItemsService, $httpBackend, cartItems, items;

  beforeEach(function () {

    module('letusgoApp');

    inject(function ($injector) {

      CartItemsService = $injector.get('CartItemsService');
      $httpBackend = $injector.get('$httpBackend');
    });

    items = [ {id: 5,barcode:'ITEM000005', name:'方便面', unit:'袋',price: 4.50, category:'零食'}];
  });

  describe('should have getCartItems function', function() {

    beforeEach(function() {

      cartItems = [{item: {id: 5,barcode:'ITEM000005', name:'方便面', unit:'袋',price: 4.50, category:'零食'}, number: 1}];
      $httpBackend.when('GET', '/api/cartItems').respond(cartItems);
    });

    it('that call getCartItemsData function', function() {

      var callback = jasmine.createSpy('callback');

      callback({

        cartItems: cartItems
      });

      $httpBackend.expectGET('/api/cartItems');
      CartItemsService.getCartItems(callback, function() {

        $httpBackend.flush();
      });

      expect(callback).toHaveBeenCalledWith(jasmine.objectContaining({

        cartItems: cartItems
      }));
    });
  });

  describe('should have setCartItems function', function() {

    beforeEach(function() {

      $httpBackend.when('POST', '/api/cartItems' + items[0].id, items[0]).respond(201, 'success');
    });

    it('that call setCartItemsData function and item exists in cart', function() {
      var callback = jasmine.createSpy('callback');

      callback({

        cartItems: cartItems
      });

      CartItemsService.setCartItems(items[0].id);

      $httpBackend.expectPOST('/api/cartItems' + items[0].id).respond(201, 'success');
      CartItemsService.setCartItems(function() {

us      });

    });

    it('that call setCartItemsData function but item does not exist in cart', function(){
      var newCartItems = [{item: {id: 2,barcode:'ITEM000002', name:'羽毛球', unit:'个',price: 1.50, category:'运动器材'}, number: 5}];

      var callback = jasmine.createSpy('callback');
      callback({
        cartItems: newCartItems
      });
      CartItemsService.setCartItems(items[0].id);

      $httpBackend.expectPOST('/api/cartItems' + items[0].id).respond(201, 'success');
      CartItemsService.setCartItems(function() {

        $httpBackend.flush();
      });
    });
  });

  describe('should have addCartItemNumber function', function() {

    beforeEach(function() {

      spyOn(CartItemsService, 'getCartItems');
      $httpBackend.when('PUT', '/api/cartItems' + cartItems[0].id, cartItems[0]).respond(201, 'success');
    });

    it('that call addCartItemNumberData function', function() {

      var callback = jasmine.createSpy('callback');

      callback({

        cartItems: cartItems
      });

      $httpBackend.expectPUT('/api/cartItems' + cartItems[0].id).respond(201, 'success');
      CartItemsService.addCartItemNumber(cartItems[0].id, callback, function() {

        $httpBackend.flush();
      });

      expect(callback).toHaveBeenCalledWith(jasmine.objectContaining({

        cartItems: cartItems
      }));

      expect(CartItemsService.getCartItems).toHaveBeenCalled();
    });
  });

  describe('should have reduceCartItemNumber function', function() {

    beforeEach(function() {

      spyOn(CartItemsService, 'getCartItems');
      $httpBackend.when('PUT', '/api/cartItems' + cartItems[0].id, cartItems[0]).respond(201, 'success');
    });

    it('that call reduceCartItemNumberData function', function() {

      var callback = jasmine.createSpy('callback');

      callback({

        cartItems: cartItems
      });

      $httpBackend.expectPUT('/api/cartItems' + cartItems[0].id).respond(201, 'success');
      CartItemsService.reduceCartItemNumber(cartItems[0].id, callback, function() {

        $httpBackend.flush();
      });

      expect(callback).toHaveBeenCalledWith(jasmine.objectContaining({

        cartItems: cartItems
      }));

      expect(CartItemsService.getCartItems).toHaveBeenCalled();
    });
  });

  describe('should have deleteCartItem function', function() {

    beforeEach(function() {

      $httpBackend.when('DELETE', '/api/cartItems' + cartItems[0].id).respond(201, 'success');
    });

    it('that call deleteCartItemData function', function() {

      CartItemsService.deleteCartItem(cartItems[0].id);

      $httpBackend.expectDELETE('/api/cartItems' + cartItems[0].id).respond(201, 'success');
      CartItemsService.deleteCartItem(function() {

        $httpBackend.flush();
      });
    });
  });

  describe('should have changeCartItemNumber function', function() {

    beforeEach(function() {

      spyOn(CartItemsService, 'getCartItems');
      $httpBackend.when('PUT', '/api/cartItems' + cartItems[0].id, cartItems[0]).respond(201, 'success');
    });

    it('that call changeCartItemNumberData function', function() {
      var callback = jasmine.createSpy('callback');

      callback({

        cartItems: cartItems
      });

      $httpBackend.expectPUT('/api/cartItems' + cartItems[0].id).respond(201, 'success');
      CartItemsService.changeCartItemNumber(cartItems[0], callback, function() {

        $httpBackend.flush();
      });

      expect(callback).toHaveBeenCalledWith(jasmine.objectContaining({

        cartItems: cartItems
      }));

      expect(CartItemsService.getCartItems).toHaveBeenCalled();
    });
  });

  describe('should have emptyCartItems function', function() {

    beforeEach(function() {

      $httpBackend.when('POST', '/api/payment').respond(201, 'success');
    });

    it('that call emptyCartItemsData function', function() {

      CartItemsService.emptyCartItems();

      $httpBackend.expectPOST('/api/payment').respond(201, 'success');
      CartItemsService.emptyCartItems(function() {

        $httpBackend.flush();
      });
    });
  });

  describe('getTotalNumber', function () {

    it ('should have getTotalNumber function and return totalNumber that is 0', function(){

      var array;
      var totalNumber = CartItemsService.getTotalNumber(array);

      expect(totalNumber).toBe(0);
    });

    it ('should have getTotalNumber function and return totalNumber that is not 0', function(){

      var item = {barcode:'ITEM000001', name: '雪碧', unit:'瓶', price:3.00, category:'饮品'};
      var array = [{item: item, number: 1}];
      var totalNumber = CartItemsService.getTotalNumber(array);

      expect(totalNumber).toEqual(1);
    });
  });

  describe('getTotalMoney', function () {

    it ('should have getTotalMoney function and return totalMoney that is 0', function(){

      var array;
      expect(CartItemsService.getTotalMoney(array)).toBe(0);
    });

    it ('should have getTotalMoney function and return totalMoney that is not 0', function(){

      var array = [{item: {barcode:'ITEM000001', name: '雪碧', unit:'瓶', price:3.00, category:'饮品'}, number: 1}];

      expect(CartItemsService.getTotalMoney(array)).toEqual(3*1);
    });
  });
});

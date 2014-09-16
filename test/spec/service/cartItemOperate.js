'use strict';
describe('cartItemOperateService', function () {

    var cartItemOperateService;

    beforeEach(function () {

        module('letusgoApp');

        inject(function ($injector) {

            cartItemOperateService = $injector.get('cartItemOperateService');
        });
    });

    describe('getTotalNumber', function () {

      it ('should have getTotalNumber function and return totalNumber that is 0', function(){

        var array;
        var totalNumber = cartItemOperateService.getTotalNumber(array);

        expect(totalNumber).toBe(0);
      });

      it ('should have getTotalNumber function and return totalNumber that is not 0', function(){

        var item = {barcode:'ITEM000001', name: '雪碧', unit:'瓶', price:3.00, category:'饮品'};
        var array = [{item: item, number: 1}];
        var totalNumber = cartItemOperateService.getTotalNumber(array);

        expect(totalNumber).toEqual(1);
      });
    });

    describe('getTotalMoney', function () {

      it ('should have getTotalMoney function and return totalMoney that is 0', function(){

        var array;
        var totalMoney = cartItemOperateService.getTotalMoney(array);

        expect(totalMoney).toBe(0);
      });

      it ('should have getTotalMoney function and return totalMoney that is not 0', function(){

        var array = [{item: {barcode:'ITEM000001', name: '雪碧', unit:'瓶', price:3.00, category:'饮品'}, number: 1}];
        var totalMoney = cartItemOperateService.getTotalMoney(array);

        expect(totalMoney).toEqual(3*1);
      });
    });

    describe('addCartItemNumber', function () {

      it ('should have addCartItemNumber function and can add the same cartItem number', function(){

        var cartItem = {item: {barcode:'ITEM000001', name: '雪碧', unit:'瓶', price:3.00, category:'饮品'}, number: 1};
        var cartArray = [{item: {barcode:'ITEM000001', name: '雪碧', unit:'瓶', price:3.00, category:'饮品'}, number: 1}];
        spyOn(Util.localStorage,'setStorageItem');
        spyOn(cartItemOperateService,'getTotalNumber');

        cartItemOperateService.addCartItemNumber(cartItem, cartArray);

        expect(Util.localStorage.setStorageItem).toHaveBeenCalled();
        expect(cartItemOperateService.getTotalNumber).toHaveBeenCalled();
      });

      it ('should have addCartItemNumber function and cannot add the different cartItem number', function(){

        var cartItem = {item: {barcode:'ITEM000000', name: '可口可乐', unit: '瓶', price:3.00, category:'饮品'}, number: 1};
        var cartArray = [{item: {barcode:'ITEM000001', name: '雪碧', unit:'瓶', price:3.00, category:'饮品'}, number: 1}];
        spyOn(Util.localStorage,'setStorageItem');
        spyOn(cartItemOperateService,'getTotalNumber');

        cartItemOperateService.addCartItemNumber(cartItem, cartArray);

        expect(Util.localStorage.setStorageItem.calls.count()).toBe(0);
        expect(cartItemOperateService.getTotalNumber.calls.count()).toBe(0);
      });
    });

    describe('reduceCartItemNumber',function () {

      it ('should have reduceCartItemNumber function and can reduce the same cateItem number', function(){

        var cartItem = {item: {barcode:'ITEM000001', name: '雪碧', unit:'瓶', price:3.00, category:'饮品'}, number: 2};
        var cartArray = [{item: {barcode:'ITEM000001', name: '雪碧', unit:'瓶', price:3.00, category:'饮品'}, number: 2}];
        spyOn(Util.localStorage,'setStorageItem');
        spyOn(cartItemOperateService,'getTotalNumber');

        cartItemOperateService.reduceCartItemNumber(cartItem, cartArray);

        expect(Util.localStorage.setStorageItem).toHaveBeenCalled();
        expect(cartItemOperateService.getTotalNumber).toHaveBeenCalled();
      });

      it ('should have reduceCartItemNumber function and can reduce the different cateItem number', function(){

        var cartItem = {item: {barcode:'ITEM000000', name: '可口可乐', unit: '瓶', price:3.00, category:'饮品'}, number: 1};
        var cartArray = [{item: {barcode:'ITEM000001', name: '雪碧', unit:'瓶', price:3.00, category:'饮品'}, number: 2}];
        spyOn(Util.localStorage,'setStorageItem');
        spyOn(cartItemOperateService,'getTotalNumber');

        cartItemOperateService.reduceCartItemNumber(cartItem, cartArray);

        expect(Util.localStorage.setStorageItem.calls.count()).toBe(0);
        expect(cartItemOperateService.getTotalNumber.calls.count()).toBe(0);
      });

      it ('should have reduceCartItemNumber function and cannot reduce to 0', function(){

        var cartItem = {item: {barcode:'ITEM000001', name: '雪碧', unit:'瓶', price:3.00, category:'饮品'}, number: 1};
        var cartArray = [{item: {barcode:'ITEM000001', name: '雪碧', unit:'瓶', price:3.00, category:'饮品'}, number: 1}];
        spyOn(Util.localStorage,'setStorageItem');
        spyOn(cartItemOperateService,'getTotalNumber');

        cartItemOperateService.reduceCartItemNumber(cartItem, cartArray);

        expect(Util.localStorage.setStorageItem.calls.count()).toBe(0);
      });
    });

    describe('deleteCartItem', function () {

      it ('should have deleteCartItem function and can delete the same cartItem number', function(){

        var cartItem = {item: {barcode:'ITEM000001', name: '雪碧', unit:'瓶', price:3.00, category:'饮品'}, number: 1};
        var cartArray = [{item: {barcode:'ITEM000001', name: '雪碧', unit:'瓶', price:3.00, category:'饮品'}, number: 1}];
        spyOn(Util.localStorage,'setStorageItem');
        spyOn(cartItemOperateService,'getTotalNumber');

        cartItemOperateService.deleteCartItem(cartItem, cartArray);

        expect(Util.localStorage.setStorageItem).toHaveBeenCalled();
        expect(cartItemOperateService.getTotalNumber).toHaveBeenCalled();
      });

      it ('should have deleteCartItem function and cannot delete the different cartItem number', function(){

        var cartItem = {item: {barcode:'ITEM000000', name: '可口可乐', unit: '瓶', price:3.00, category:'饮品'}, number: 1};
        var cartArray = [{item: {barcode:'ITEM000001', name: '雪碧', unit:'瓶', price:3.00, category:'饮品'}, number: 1}];
        spyOn(Util.localStorage,'setStorageItem');
        spyOn(cartItemOperateService,'getTotalNumber');

        cartItemOperateService.deleteCartItem(cartItem, cartArray);

        expect(Util.localStorage.setStorageItem.calls.count()).toBe(0);
        expect(cartItemOperateService.getTotalNumber.calls.count()).toBe(0);
      });
    });

    describe('changeCurrentCartItemNumber', function () {

      it ('should have changeCurrentCartItemNumber function and can change the same cartItem number', function(){

        var cartItem = {item: {barcode:'ITEM000001', name: '雪碧', unit:'瓶', price:3.00, category:'饮品'}, number: 1};
        var cartArray = [{item: {barcode:'ITEM000001', name: '雪碧', unit:'瓶', price:3.00, category:'饮品'}, number: 1}];
        spyOn(Util.localStorage,'setStorageItem');
        spyOn(cartItemOperateService,'getTotalNumber');

        cartItemOperateService.changeCurrentCartItemNumber(cartItem, cartArray);

        expect(Util.localStorage.setStorageItem).toHaveBeenCalled();
        expect(cartItemOperateService.getTotalNumber).toHaveBeenCalled();
      });

      it ('should have changeCurrentCartItemNumber function and cannot change the different cartItem number', function(){

        var cartItem = {item: {barcode:'ITEM000000', name: '可口可乐', unit: '瓶', price:3.00, category:'饮品'}, number: 1};
        var cartArray = [{item: {barcode:'ITEM000001', name: '雪碧', unit:'瓶', price:3.00, category:'饮品'}, number: 1}];
        spyOn(Util.localStorage,'setStorageItem');
        spyOn(cartItemOperateService,'getTotalNumber');

        cartItemOperateService.changeCurrentCartItemNumber(cartItem, cartArray);

        expect(Util.localStorage.setStorageItem.calls.count()).toBe(0);
        expect(cartItemOperateService.getTotalNumber.calls.count()).toBe(0);
      });
    });
});

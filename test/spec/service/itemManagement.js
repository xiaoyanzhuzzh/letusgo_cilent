'use strict';
describe('itemManagementService', function () {

    var itemManagementService, items;

    beforeEach(function () {

        module('letusgoApp');

        inject(function ($injector) {

            itemManagementService = $injector.get('itemManagementService');
        });

        items = [{barcode:'ITEM000001', name: '雪碧', unit:'瓶', price:3.00, category:'饮品'}];
    });

    describe('deleteItem function', function () {

      it ('should have deleteItem function and return a empty array', function(){

        var item = {barcode:'ITEM000001', name: '雪碧', unit:'瓶', price:3.00, category:'饮品'};
        spyOn(Util.localStorage,'setStorageItem');

        var result = itemManagementService.deleteItem(items, item);

        expect(result.length).toBe(0);
        expect(Util.localStorage.setStorageItem.calls.length).toBe(1);
      });

      it ('should have deleteItem function and return items array', function(){

        var item = {barcode:'ITEM000000', name: '可口可乐', unit:'瓶', price:3.00, category:'饮品'};
        spyOn(Util.localStorage,'setStorageItem');

        var result = itemManagementService.deleteItem(items, item);

        expect(result.length).toBe(1);
        expect(result[0].name).toEqual('雪碧');
        expect(result[0].category).toEqual('饮品');

        expect(Util.localStorage.setStorageItem.calls.length).toBe(0);
      });
    });

    describe('modifyItem function', function () {

      var newItem;

      beforeEach(function () {

        newItem = {barcode:'ITEM000000', name: '雪碧', unit:'瓶', price:3.00, category:'饮品'};
      });

      it ('should have deleteItem function and return a new array', function(){

        var items = [{barcode:'ITEM000000', name: '可口可乐', unit:'瓶', price:3.00, category:'饮品'}];

        spyOn(Util.localStorage,'getStorageItem').and.returnValue(
          {barcode:'ITEM000000', name: '可口可乐', unit:'瓶', price:3.00, category:'饮品'}
        );
        spyOn(Util.localStorage,'setStorageItem');

        var result = itemManagementService.modifyItem(newItem, items);

        expect(result.length).toBe(1);
        expect(result[0].name).toEqual('雪碧');
        expect(result[0].category).toEqual('饮品');
        expect(Util.localStorage.setStorageItem.calls.length).toBe(1);
      });

      it ('should have modifyItem function and return the same array', function(){

        var items = [{barcode:'ITEM000000', name: '雪碧', unit:'瓶', price:3.00, category:'饮品'}];

        spyOn(Util.localStorage,'getStorageItem').and.returnValue(
          {barcode:'ITEM000000', name: '可口可乐', unit:'瓶', price:3.00, category:'饮品'}
        );
        spyOn(Util.localStorage,'setStorageItem');

        var result = itemManagementService.modifyItem(newItem, items);

        expect(result.length).toBe(1);
        expect(result[0].name).toEqual('雪碧');
        expect(result[0].category).toEqual('饮品');
        expect(Util.localStorage.setStorageItem.calls.length).toBe(1);
      });
    });
});

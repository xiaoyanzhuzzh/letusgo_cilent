'use strict';
describe('ItemsService', function () {

    var ItemsService, localStorageService;

    beforeEach(function () {

        module('letusgoApp');

        inject(function ($injector) {

            ItemsService = $injector.get('ItemsService');
            localStorageService = $injector.get('localStorageService');

        });
    });

    it ('should load all the same items', function(){

      var items = ItemsService.getItems();

      expect(items.length).toBe(6);
      expect(items[0].barcode).toEqual('ITEM000000');
      expect(items[1].name).toEqual('雪碧');
      expect(items[2].category).toEqual('水果');
    });

      it ('should have get function', function(){


      spyOn(localStorageService, 'get');
      ItemsService.get('items');

      expect(localStorageService.get.calls.count()).toBe(1);
    });

    it ('should load all the same items', function(){

      var cartCount = 9;
      spyOn(localStorageService, 'set');
      ItemsService.set('cartCount', cartCount);

      expect(localStorageService.set.calls.count()).toBe(1);
    });
});

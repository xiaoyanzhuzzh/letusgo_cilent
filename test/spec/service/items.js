'use strict';
describe('ItemsService', function () {

    var ItemsService;

    beforeEach(function () {

        module('letusgoApp');

        inject(function ($injector) {

            ItemsService = $injector.get('ItemsService');
        });
    });

    it ('should load all the same items', function(){

      var items = ItemsService.getItems();

      expect(items.length).toBe(6);
      expect(items[0].barcode).toEqual('ITEM000000');
      expect(items[1].name).toEqual('雪碧');
      expect(items[2].category).toEqual('水果');
    });

});

'use strict';
describe('itemsService', function () {

    var itemsService;

    beforeEach(function () {

        module('myYoApp');

        inject(function ($injector) {

            itemsService = $injector.get('itemsService');
        });
    });

    it ('should load all the same items', function(){

      var items = itemsService.getItems();

      expect(items.length).toBe(6);
      expect(items[0].barcode).toEqual('ITEM000000');
      expect(items[1].name).toEqual('雪碧');
      expect(items[2].category).toEqual('水果');
    });

});

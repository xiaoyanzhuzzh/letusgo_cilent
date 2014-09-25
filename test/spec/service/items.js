'use strict';
describe('ItemsService', function() {

  var ItemsService, localStorageService, $httpBackend, items;

  beforeEach(function() {

    module('letusgoApp');

    inject(function($injector) {

      ItemsService = $injector.get('ItemsService');
      localStorageService = $injector.get('localStorageService');
      $httpBackend = $injector.get('$httpBackend');

    });
  });

  describe('should have getItems function', function() {

    beforeEach(function() {

      items = [ {id: 5,barcode:'ITEM000005', name:'方便面', unit:'袋',price: 4.50, category:'零食'}];
      $httpBackend.when('GET', '/api/items').respond(items);
    });

    it('that call getItemsData function', function() {

      var callback = jasmine.createSpy('callback');

      callback({

        items:items
      });
      $httpBackend.expectGET('/api/items');
      ItemsService.getItems(callback, function() {

        $httpBackend.flush();
      });

      expect(callback).toHaveBeenCalledWith(jasmine.objectContaining({

        items: items
      }));
    });
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

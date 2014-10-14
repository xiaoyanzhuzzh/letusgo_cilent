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

  describe('should have putItem function', function() {

    beforeEach(function() {

      items = [ {id: 5,barcode:'ITEM000005', name:'方便面', unit:'袋',price: 4.50, category:'零食'}];
      $httpBackend.when('PUT', '/api/items' + items[0].id, items[0]).respond(201, 'success');
    });

    it('that call putItemData function', function() {

      ItemsService.putItem(items[0]);

      $httpBackend.expectPUT('/api/items' + items[0].id).respond(201, 'success');
      ItemsService.putItem(function() {

        $httpBackend.flush();
      });
    });
  });

  describe('should have addItem function', function() {

    beforeEach(function() {

      items = [ {id: 5,barcode:'ITEM000005', name:'方便面', unit:'袋',price: 4.50, category:'零食'}];
      $httpBackend.when('POST', '/api/items' + items[0].id, items[0]).respond(201, 'success');
    });

    it('that call addItemData function', function() {

      ItemsService.addItem(items[0]);

      $httpBackend.expectPOST('/api/items' + items[0].id).respond(201, 'success');
      ItemsService.addItem(function() {

        $httpBackend.flush();
      });
    });
  });

  describe('should have deleteItem function', function() {

    beforeEach(function() {

      items = [ {id: 5,barcode:'ITEM000005', name:'方便面', unit:'袋',price: 4.50, category:'零食'}];
      $httpBackend.when('DELETE', '/api/items' + items[0].id).respond(201, 'success');
    });

    it('that call deleteItemData function', function() {

      ItemsService.deleteItem(items[0].id);

      $httpBackend.expectDELETE('/api/items' + items[0].id).respond(201, 'success');
      ItemsService.deleteItem(function() {

        $httpBackend.flush();
      });
    });
  });

  it ('should have get function', function(){

    spyOn(localStorageService, 'get');
    ItemsService.get('items');

    expect(localStorageService.get.calls.count()).toBe(1);
  });

  it ('should set function', function(){

    var cartCount = 9;
    spyOn(localStorageService, 'set');
    ItemsService.set('cartCount', cartCount);

    expect(localStorageService.set.calls.count()).toBe(1);
  });
});

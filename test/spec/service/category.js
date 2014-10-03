'use strict';
describe('CategoryService', function () {

  var CategoryService, $httpBackend, categories;

  beforeEach(function () {

    module('letusgoApp');

    inject(function ($injector) {

      CategoryService = $injector.get('CategoryService');
      $httpBackend = $injector.get('$httpBackend');
    });
    categories = [ {id: 5,name:'零食'}];
  });

  describe('should have getCategories function', function() {

    beforeEach(function() {

      $httpBackend.when('GET', '/api/categories').respond(categories);
    });

    it('that call getCategoriesData function', function() {

      var callback = jasmine.createSpy('callback');

      callback({

        categories: categories
      });
      $httpBackend.expectGET('/api/categories');
      CategoryService.getCategories(callback, function() {

        $httpBackend.flush();
      });

      expect(callback).toHaveBeenCalledWith(jasmine.objectContaining({

        categories: categories
      }));
    });
  });

  describe('should have getMaxCategoryId function', function() {

    beforeEach(function() {

      $httpBackend.when('GET', '/api/maxCategoryId').respond(9);
    });

    it('that call getMaxCategoryIdData function', function() {

      var callback = jasmine.createSpy('callback');

      callback({

        id: 9
      });
      $httpBackend.expectGET('/api/maxCategoryId');
      CategoryService.getMaxCategoryId(callback, function() {

        $httpBackend.flush();
      });

      expect(callback).toHaveBeenCalledWith(jasmine.objectContaining({

        id: 9
      }));
    });
  });

  describe('should have setMaxCategoryId function', function() {

    beforeEach(function() {

      $httpBackend.when('POST', '/api/maxCategoryId').respond(201, 'success');
    });

    it('that call setMaxCategoryIdData function', function() {

      CategoryService.setMaxCategoryId();

      $httpBackend.expectPOST('/api/maxCategoryId').respond(201, 'success');
      CategoryService.setMaxCategoryId(function() {

        $httpBackend.flush();
      });
    });
  });

  describe('should have deleteCategory function', function() {

    beforeEach(function() {

      $httpBackend.when('DELETE', '/api/categories' + categories[0].id).respond(201, 'success');
    });

    it('that call deleteCategoryData function', function() {

      CategoryService.deleteCategory(categories[0].id);

      $httpBackend.expectDELETE('/api/categories' + categories[0].id).respond(201, 'success');
      CategoryService.deleteCategory(function() {

        $httpBackend.flush();
      });
    });
  });
  describe('should have putCategory function', function() {

    beforeEach(function() {

      $httpBackend.when('PUT', '/api/categories' + categories[0].id, categories[0]).respond(201, 'success');
    });

    it('that call putCategoryData function', function() {

      CategoryService.putCategory(categories[0].id);

      $httpBackend.expectPUT('/api/categories' + categories[0].id).respond(201, 'success');
      CategoryService.putCategory(function() {

        $httpBackend.flush();
      });
    });
  });

  describe('should have addCategory function', function() {

    beforeEach(function() {

      $httpBackend.when('POST', '/api/categories' + categories[0].id, categories[0]).respond(201, 'success');
    });

    it('that call addCategoryData function', function() {

      CategoryService.addCategory(categories[0].id);

      $httpBackend.expectPOST('/api/categories' + categories[0].id).respond(201, 'success');
      CategoryService.addCategory(function() {

        $httpBackend.flush();
      });
    });
  });
//    describe('changeCategory function', function () {
//
//      var categorys, category;
//
//      beforeEach (function () {
//
//        categorys = [{id: 0, name: '饮品'}];
//        spyOn(localStorageService,'set');
//      });
//
//      it('should have changeCategory function and return changed categorys', function(){
//
//        category = {id: 0, name: '饮品'};
//
//        var result = CategoryService.changeCategory(category, categorys);
//
//        expect(result.length).toBe(1);
//        expect(result[0].name).toEqual('饮品');
//        expect(result[0].id).toBe(0);
//
//        expect(localStorageService.set).toHaveBeenCalled();
//      });
//
//      it('should have changeCategory function and return the same categorys', function(){
//
//        category = {id: 1, name: '水果'};
//
//        var result = CategoryService.changeCategory(category, categorys);
//
//        expect(result.length).toBe(1);
//        expect(result[0].name).toEqual('饮品');
//        expect(result[0].id).toBe(0);
//
//        expect(localStorageService.set.calls.count()).toBe(0);
//      });
//    });
//
//
//    describe('changeItem function', function () {
//
//      var category, items;
//
//      beforeEach(function () {
//
//        items = [{barcode:'ITEM000001', name: '雪碧', unit:'瓶', price:3.00, category:'饮品'}];
//        spyOn(localStorageService,'set');
//
//      });
//
//      it('should have changeItem function and return changed items', function(){
//
//        spyOn(localStorageService,'get').and.returnValue({id: 0, name:'饮品'});
//        category = {id: 0, name: '饮品t'};
//
//        var result = CategoryService.changeItem(category, items);
//
//        expect(result.length).toBe(1);
//        expect(result[0].category).toEqual('饮品t');
//
//        expect(localStorageService.set.calls.count()).toBe(2);
//        expect(localStorageService.get.calls.count()).toBe(1);
//      });
//
//      it('should have changeItem function and return the same items', function(){
//
//        spyOn(localStorageService,'get').and.returnValue({id: 0, name:'水果'});
//        category = {id: 0, name: '水果f'};
//
//        var result = CategoryService.changeItem(category, items);
//
//        expect(result.length).toBe(1);
//        expect(result[0].category).toEqual('饮品');
//        expect(result[0].name).toEqual('雪碧');
//
//        expect(localStorageService.set.calls.count()).toBe(1);
//        expect(localStorageService.get.calls.count()).toBe(1);
//      });
//   });
});

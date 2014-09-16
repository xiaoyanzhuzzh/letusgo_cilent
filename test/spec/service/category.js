'use strict';
describe('categoryService', function () {

    var categoryService;

    beforeEach(function () {

        module('letusgoApp');

        inject(function ($injector) {

            categoryService = $injector.get('categoryService');
        });
    });

    it('should have getCategorys function and return categoryNames', function(){

      var items = [{barcode:'ITEM000001', name: '雪碧', unit:'瓶', price:3.00, category:'饮品'}];
      var categoryNames = categoryService.getCategorys(items);

      expect(categoryNames[0]).toEqual('饮品');
    });

    it('should have getCategorysAndId function and return categorys', function(){

      var items = [{barcode:'ITEM000001', name: '雪碧', unit:'瓶', price:3.00, category:'饮品'}];

      spyOn(categoryService, 'getCategorys').and.returnValue(['饮品']);
      spyOn(Util.localStorage,'setStorageItem');

      var categorys = categoryService.getCategorysAndId(items);

      expect(categorys.length).toBe(1);
      expect(categorys[0].id).toEqual(0);
      expect(categorys[0].name).toEqual('饮品');

      expect(Util.localStorage.setStorageItem).toHaveBeenCalled();
      expect(categoryService.getCategorys).toHaveBeenCalled();
    });

    describe('deleteCategory function', function () {

      var categorys, category;

      beforeEach (function () {

        categorys = [{id: 0, name: '饮品'}];
        spyOn(Util.localStorage,'setStorageItem');
      });

      it('should have deleteCategory function and return categorys is a empty array', function(){

        category = {id: 0, name: '饮品'};

        var result = categoryService.deleteCategory(category, categorys);

        expect(result.length).toBe(0);

        expect(Util.localStorage.setStorageItem).toHaveBeenCalled();
      });

      it('should have deleteCategory function and return categorys is the same array', function(){

        category = {id: 1, name: '水果'};

        var result = categoryService.deleteCategory(category, categorys);

        expect(result.length).toBe(1);
        expect(result[0].name).toEqual('饮品');
        expect(result[0].id).toEqual(0);

        expect(Util.localStorage.setStorageItem.calls.count()).toBe(0);
      });
    });

    describe('deleteItem function', function () {

      var category, items;

      beforeEach (function () {

        items = [{barcode:'ITEM000001', name: '雪碧', unit:'瓶', price:3.00, category:'饮品'}];
        spyOn(Util.localStorage,'setStorageItem');
      });

      it('should have deleteItem function and return items is a empty array', function(){

        category = {id: 1, name: '饮品'};

        var result = categoryService.deleteItem(category, items);

        expect(result.length).toBe(0);

        expect(Util.localStorage.setStorageItem).toHaveBeenCalled();
      });

      it('should have deleteItem function and return categorys is the same array', function(){

        category = {id: 0, name: '水果'};

        var result = categoryService.deleteItem(category, items);

        expect(result.length).toBe(1);
        expect(result[0].category).toEqual('饮品');
        expect(result[0].name).toEqual('雪碧');

        expect(Util.localStorage.setStorageItem).toHaveBeenCalled();
      });
    });

    describe('changeCategory function', function () {

      var categorys, category;

      beforeEach (function () {

        categorys = [{id: 0, name: '饮品'}];
        spyOn(Util.localStorage,'setStorageItem');
      });

      it('should have changeCategory function and return changed categorys', function(){

        category = {id: 0, name: '饮品'};

        var result = categoryService.changeCategory(category, categorys);

        expect(result.length).toBe(1);
        expect(result[0].name).toEqual('饮品');
        expect(result[0].id).toBe(0);

        expect(Util.localStorage.setStorageItem).toHaveBeenCalled();
      });

      it('should have changeCategory function and return the same categorys', function(){

        category = {id: 1, name: '水果'};

        var result = categoryService.changeCategory(category, categorys);

        expect(result.length).toBe(1);
        expect(result[0].name).toEqual('饮品');
        expect(result[0].id).toBe(0);

        expect(Util.localStorage.setStorageItem.calls.count()).toBe(0);
      });
    });


    describe('changeItem function', function () {

      var category, items;

      beforeEach(function () {

        items = [{barcode:'ITEM000001', name: '雪碧', unit:'瓶', price:3.00, category:'饮品'}];
        spyOn(Util.localStorage,'setStorageItem');

      });

      // it('should have changeItem function and return changed items', function(){
      //
      //   spyOn(Util.localStorage,'getStorageItem').and.returnValue([{id: 0, name:'饮品'}]);
      //   category = {id: 0, name: '饮品t'};
      //
      //   var result = categoryService.changeItem(category, items);
      //
      //   expect(result.length).toBe(1);
      //   expect(result[0].category).toEqual('饮品t');
      //   expect(result[0].name).toEqual('雪碧');
      //
      //   expect(Util.localStorage.setStorageItem).toHaveBeenCalled();
      //   expect(Util.localStorage.getStorageItem).toHaveBeenCalled();
      // });

      it('should have changeItem function and return the same items', function(){

        spyOn(Util.localStorage,'getStorageItem').and.returnValue([{id: 0, name:'水果'}]);
        category = {id: 0, name: '水果f'};

        var result = categoryService.changeItem(category, items);

        expect(result.length).toBe(1);
        expect(result[0].category).toEqual('饮品');
        expect(result[0].name).toEqual('雪碧');

        expect(Util.localStorage.setStorageItem).toHaveBeenCalled();
        expect(Util.localStorage.getStorageItem).toHaveBeenCalled();
      });
   });
});

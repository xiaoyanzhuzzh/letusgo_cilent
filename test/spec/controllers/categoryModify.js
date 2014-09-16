'use strict';
describe('CategoryModifyCtrl', function () {

  var $scope, createController, categoryService;

  beforeEach(function () {
    module('letusgoApp');

    inject(function ($injector) {

      $scope = $injector.get('$rootScope').$new();
      categoryService = $injector.get('categoryService');

      var $controller = $injector.get('$controller');

      createController = function () {

        return $controller ('CategoryModifyCtrl', {
          $scope: $scope,
          categoryService: categoryService
        });
      };
    });
  });

  it ('should load items from localStorage', function () {

    spyOn(Util.localStorage, 'getStorageItem');
    createController();

    expect(Util.localStorage.getStorageItem.calls.length).toBe(2);
  });

  it ('should load categorys from localStorage', function () {

    spyOn(Util.localStorage, 'getStorageItem');
    createController();

    expect(Util.localStorage.getStorageItem.calls.length).toBe(2);
  });

  it ('should have modifySignal', function () {

    createController();

    expect($scope.modifySignal).toEqual(false);
  });

  describe('modifyCurrentCategory', function () {

    it('should make modifySignal true', function () {

      createController();
      $scope.modifyCurrentCategory();

      expect($scope.modifySignal).toBe(true);
    });
  });

  describe('cancelModify', function () {

    it('should make modifySignal false', function () {

      createController();
      $scope.cancelModify();

      expect($scope.modifySignal).toBe(false);
    });
  });

  describe('deleteCurrentCategory function', function () {

    it('should delete current categorys and items', function () {

      var category = {id: 0, name: '雪碧'};

      spyOn(Util.localStorage, 'getStorageItem');
      spyOn(categoryService, 'deleteCategory').and.returnValue([]);
      spyOn(categoryService, 'deleteItem').and.returnValue([]);

      createController();
      $scope.deleteCurrentCategory(category);

      expect($scope.items.length).toBe(0);
      expect($scope.categorys.length).toEqual(0);

      expect(Util.localStorage.getStorageItem.calls.length).toBe(2);
      expect(categoryService.deleteItem.calls.length).toEqual(1);
      expect(categoryService.deleteCategory.calls.length).toBe(1);
    });
  });

  describe('changeCurrentCategory function', function () {

    it('should add change category to categorys', function () {

      var category = {id: 0, name: '饮品'};

      spyOn(Util.localStorage, 'getStorageItem');
      spyOn(categoryService, 'changeCategory').and.returnValue([{id: 0, name: '雪碧'}]);
      spyOn(categoryService, 'changeItem').and.returnValue(

        [{barcode:'ITEM000001', name: '雪碧', unit:'瓶', price:3.00, category:'饮品'}]
      );

      createController();
      $scope.changeCurrentCategory(category);

      expect($scope.categorys.length).toEqual(1);
      expect($scope.items.length).toEqual(1);

      expect(Util.localStorage.getStorageItem.calls.length).toBe(2);
      expect(categoryService.changeCategory.calls.length).toBe(1);
      expect(categoryService.changeItem.calls.length).toBe(1);
    });
  });
});

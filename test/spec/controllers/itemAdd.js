'use strict';
describe('ItemAddCtrl', function () {

  var $scope, createController, categoryService, itemManagementService;

  beforeEach(function () {
    module('letusgoApp');

    inject(function ($injector) {

      $scope = $injector.get('$rootScope').$new();
      categoryService = $injector.get('categoryService');
      itemManagementService = $injector.get('itemManagementService');

      var $controller = $injector.get('$controller');

      createController = function () {

        return $controller ('ItemAddCtrl', {
          $scope: $scope,
          categoryService: categoryService,
          itemManagementService: itemManagementService
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

  describe('addButton', function () {

    it('should make showItemSignal true', function () {

      createController();
      $scope.addButton();

      expect($scope.showItemSignal).toBe(true);
    });
  });

  describe('cancelButton', function () {

    it('should make showItemSignal false', function () {

      createController();
      $scope.cancelButton();

      expect($scope.showItemSignal).toBe(false);
    });
  });

  describe('deleteCurrentItem function', function () {

    it('should delete current item', function () {

      var item = {barcode:'ITEM000001', name: '雪碧', unit:'瓶', price:3.00, category:'饮品'};
      spyOn(itemManagementService, 'deleteItem').andReturn([]);
      spyOn(Util.localStorage, 'getStorageItem');

      createController();
      $scope.deleteCurrentItem(item);

      expect($scope.items.length).toBe(0);

      expect(itemManagementService.deleteItem.calls.length).toEqual(1);
      expect(Util.localStorage.getStorageItem.calls.length).toBe(2);
    });
  });

  describe('addNewItem function', function () {

    it('should add change category to categorys', function () {

      var categoryName = '饮品';
      var item = {barcode:'ITEM000001', name: '雪碧', unit:'瓶', price:3.00};

      spyOn(Util.localStorage, 'setStorageItem');
      spyOn(Util.localStorage, 'getStorageItem').andReturn([]);

      createController();
      $scope.addNewItem(item, categoryName);

      expect(Util.localStorage.setStorageItem.calls.length).toBe(1);
      expect(Util.localStorage.getStorageItem.calls.length).toBe(2);
    });
  });
});

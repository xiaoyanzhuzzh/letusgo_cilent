'use strict';
describe('ItemModifyCtrl', function () {

  var $scope, createController, categoryService, itemManagementService;

  beforeEach(function () {
    module('myYoApp');

    inject(function ($injector) {

      $scope = $injector.get('$rootScope').$new();
      categoryService = $injector.get('categoryService');
      itemManagementService = $injector.get('itemManagementService');

      var $controller = $injector.get('$controller');

      createController = function () {

        return $controller ('ItemModifyCtrl', {
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

  it ('should have showItemSignal', function () {

    createController();

    expect($scope.showItemSignal).toEqual(false);
  });

  describe('modifyButton', function () {

    it('should make showItemSignal true', function () {

      var changeItem = {barcode:'ITEM000001', name: '雪碧', unit:'瓶', price:3.00, category:'饮品'};
      spyOn(Util.localStorage, 'setStorageItem');

      createController();
      $scope.modifyButton(changeItem);

      expect($scope.showItemSignal).toBe(true);
      expect(Util.localStorage.setStorageItem.calls.length).toBe(1);
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

      expect(itemManagementService.deleteItem.calls.length).toEqual(1);
      expect(Util.localStorage.getStorageItem.calls.length).toBe(2);
    });
  });

  describe('modifyCurrentItem function', function () {

    it('should add change category to categorys', function () {

      var newItem = {name: '雪碧', unit:'瓶', price:3.00};

      spyOn(Util.localStorage, 'getStorageItem');
      spyOn(Util.localStorage, 'setStorageItem');

      spyOn(itemManagementService, 'modifyItem').andReturn(

        [{barcode:'ITEM000001', name: '雪碧', unit:'瓶', price:3.00, category:'饮品'}]
      );

      createController();
      $scope.modifyCurrentItem(newItem);

      expect(itemManagementService.modifyItem.calls.length).toBe(1);
      expect(Util.localStorage.setStorageItem.calls.length).toBe(0);
    });
  });
});

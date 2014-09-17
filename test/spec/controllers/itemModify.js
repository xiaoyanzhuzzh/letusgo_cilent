'use strict';
describe('ItemModifyCtrl', function () {

  var $scope, createController, CategoryService, ItemManagementService, ItemsService;

  beforeEach(function () {
    module('letusgoApp');

    inject(function ($injector) {

      $scope = $injector.get('$rootScope').$new();
      CategoryService = $injector.get('CategoryService');
      ItemManagementService = $injector.get('ItemManagementService');
      ItemsService = $injector.get('ItemsService');

      var $controller = $injector.get('$controller');

      createController = function () {

        return $controller ('ItemModifyCtrl', {
          $scope: $scope,
          CategoryService: CategoryService,
          ItemManagementService: ItemManagementService
        });
      };
    });
  });

  it ('should load items from localStorage', function () {

    spyOn(ItemsService, 'get');
    createController();

    expect(ItemsService.get).toHaveBeenCalled();
  });

  it ('should load categorys from localStorage', function () {

    spyOn(ItemsService, 'get');
    createController();

    expect(ItemsService.get).toHaveBeenCalled();
  });

  it ('should have showItemSignal', function () {

    createController();

    expect($scope.showItemSignal).toEqual(false);
  });

  describe('modifyButton', function () {

    it('should make showItemSignal true', function () {

      var changeItem = {barcode:'ITEM000001', name: '雪碧', unit:'瓶', price:3.00, category:'饮品'};
      spyOn(ItemsService, 'set');

      createController();
      $scope.modifyButton(changeItem);

      expect($scope.showItemSignal).toBe(true);
      expect(ItemsService.set).toHaveBeenCalled();
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

      spyOn(ItemManagementService, 'deleteItem').and.returnValue([]);
      spyOn(ItemsService, 'get');

      createController();
      $scope.deleteCurrentItem(item);

      expect(ItemManagementService.deleteItem).toHaveBeenCalled();
      expect(ItemsService.get).toHaveBeenCalled();
    });
  });

  describe('modifyCurrentItem function', function () {

    it('should add change category to categorys', function () {

      var newItem = {name: '雪碧', unit:'瓶', price:3.00};

      spyOn(ItemsService, 'get');
      spyOn(ItemsService, 'set');

      spyOn(ItemManagementService, 'modifyItem').and.returnValue(

        [{barcode:'ITEM000001', name: '雪碧', unit:'瓶', price:3.00, category:'饮品'}]
      );

      createController();
      $scope.modifyCurrentItem(newItem);

      expect(ItemManagementService.modifyItem).toHaveBeenCalled();
    });
  });
});

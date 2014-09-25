'use strict';
describe('ItemAddCtrl', function () {

  var $scope, createController, CategoryService, ItemsService;

  beforeEach(function () {
    module('letusgoApp');

    inject(function ($injector) {

      $scope = $injector.get('$rootScope').$new();
      CategoryService = $injector.get('CategoryService');
      ItemsService = $injector.get('ItemsService');

      var $controller = $injector.get('$controller');

      createController = function () {

        return $controller ('ItemAddCtrl', {
          $scope: $scope,
          CategoryService: CategoryService,
          ItemsService: ItemsService
        });
      };
    });
  });

  it('should emit to parent controller', function () {

    spyOn($scope, '$emit');
    createController();
    expect($scope.$emit).toHaveBeenCalledWith('to-parent-itemManagementActive');
  });

  it ('should load items from redis', function () {

    createController();

    expect($scope.items.length).toBe(0);
  });

  it ('should load categories from redis', function () {

    createController();

    expect($scope.categories.length).toBe(0);
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
      spyOn(ItemsService, 'deleteItem');
      spyOn(ItemsService, 'getItems');

      createController();
      $scope.deleteCurrentItem(item);

      expect(ItemsService.deleteItem).toHaveBeenCalled();
      expect(ItemsService.getItems).toHaveBeenCalled();
    });
  });

//  describe('addNewItem function', function () {
//
//    it('should add change category to categorys', function () {
//      var item = {id: 0, barcode:'ITEM000001', name: '雪碧', unit:'瓶', price:3.00};
//
//      spyOn(ItemsService, 'addItem');
//      spyOn(ItemsService, 'getItems').and.returnValue([]);
//
//      createController();
//      $scope.addNewItem(item);
//
//      expect(ItemsService.set).toHaveBeenCalled();
//      expect(ItemsService.get).toHaveBeenCalled();
//      expect($scope.showItemSignal).toEqual(false);
//    });
//  });
});

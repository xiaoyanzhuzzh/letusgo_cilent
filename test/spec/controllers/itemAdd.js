'use strict';
describe('ItemAddCtrl', function () {

  var $scope, createController, CategoryService, ItemsService, items, categories;

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

    items = [{id: 5,barcode:'ITEM000005', name:'方便面', unit:'袋',price: 4.50, category:'零食'}];
    spyOn(ItemsService, 'getItems').and.callFake(function(callback){

      callback(items);
    });

    categories = [{id: 5, name: '零食'}];
    spyOn(CategoryService,'getCategories').and.callFake(function(callback){

      callback(categories);
    });
  });

  it('should load items from server', function() {

    createController();
    expect($scope.items.length).toBe(1);
    expect($scope.items[0].id).toBe(5);
  });

  it('should load categories from server', function() {

    createController();
    expect($scope.categories.length).toBe(1);
    expect($scope.categories[0].name).toEqual('零食');
  });

  it('should emit to parent controller', function () {

    spyOn($scope, '$emit');
    createController();
    expect($scope.$emit).toHaveBeenCalledWith('to-parent-itemManagementActive');
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

      var item = {id: 0, barcode:'ITEM000001', name: '雪碧', unit:'瓶', price:3.00, category:'饮品'};
      spyOn(ItemsService, 'deleteItem');

      createController();
      $scope.deleteCurrentItem(item);

      expect(ItemsService.deleteItem).toHaveBeenCalled();
      expect(ItemsService.getItems).toHaveBeenCalled();
    });
  });

  describe('addNewItem function', function () {

    it('should add change category to categorys', function () {

      var item = {barcode:'ITEM000001', name: '雪碧', unit:'瓶', price:3.00};
      spyOn(ItemsService,'getMaxItemId').and.callFake(function(callback){

        callback(9);
      });

      spyOn(ItemsService, 'setMaxItemId');
      spyOn(ItemsService, 'addItem');

      createController();
      $scope.addNewItem(item);

      expect($scope.showItemSignal).toEqual(false);
      expect(ItemsService.setMaxItemId).toHaveBeenCalled();
      expect(ItemsService.getItems).toHaveBeenCalled();
      expect(ItemsService.addItem).toHaveBeenCalled();
    });
  });
});

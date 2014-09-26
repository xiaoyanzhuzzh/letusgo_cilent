'use strict';
describe('CategoryModifyCtrl', function () {

  var $scope, createController, CategoryService, ItemsService, items, categories;

  beforeEach(function () {
    module('letusgoApp');

    inject(function ($injector) {

      $scope = $injector.get('$rootScope').$new();
      CategoryService = $injector.get('CategoryService');
      ItemsService = $injector.get('ItemsService');

      var $controller = $injector.get('$controller');

      createController = function () {

        return $controller ('CategoryModifyCtrl', {
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
    expect($scope.$emit).toHaveBeenCalledWith('to-parent-categoryManagementActive');
  });

  it ('should have modifySignal', function () {

    createController();
    expect($scope.modifySignal).toEqual(false);
  });

  describe('modifyCurrentCategory', function () {

    it('should make modifySignal true', function () {

      var newCategory = {id: 0, name: '水果'};
      createController();
      $scope.modifyButton(newCategory);

      expect($scope.modifySignal).toBe(true);
      expect($scope.categoryInfo.id).toEqual(0);
      expect($scope.categoryInfo.name).toEqual('水果');
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

      spyOn(CategoryService, 'deleteCategory');

      createController();
      $scope.deleteCurrentCategory(category);

      expect(CategoryService.deleteCategory).toHaveBeenCalled();
      expect(CategoryService.getCategories).toHaveBeenCalled();

    });
  });

  describe('modifyCurrentCategory function', function () {

    it('should add change category to categorys', function () {

      var category = {id: 0, name: '饮品'};

      spyOn(CategoryService, 'putCategory');

      createController();
      $scope.modifyCurrentCategory(category);

      expect(CategoryService.putCategory).toHaveBeenCalled();
      expect(CategoryService.getCategories).toHaveBeenCalled();
    });
  });
});

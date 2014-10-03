'use strict';
describe('CategoryAddCtrl', function () {

  var $scope, createController, CategoryService, ItemsService, items, categories, id;

  beforeEach(function () {
    module('letusgoApp');

    inject(function ($injector) {

      $scope = $injector.get('$rootScope').$new();
      CategoryService = $injector.get('CategoryService');
      ItemsService = $injector.get('ItemsService');

      var $controller = $injector.get('$controller');

      createController = function () {

        return $controller ('CategoryAddCtrl', {
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

    id = 9;
    spyOn(CategoryService,'getMaxCategoryId').and.callFake(function(callback){

      callback(id);
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

  it ('should have showSignal', function () {

    createController();

    expect($scope.showSignal).toEqual(false);
  });

  describe('addButton', function () {

    it('should make showSignal true', function () {

      createController();
      $scope.addButton();

      expect($scope.showSignal).toBe(true);
    });
  });

  describe('cancelButton', function () {

    it('should make showSignal false', function () {

      createController();
      $scope.cancelButton();

      expect($scope.showSignal).toBe(false);
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

  describe('addNewCategory function', function () {

    it('should add new category to categorys', function () {

      var newCategory = {name: '饮品'};
      spyOn(CategoryService, 'setMaxCategoryId');
      spyOn(CategoryService, 'addCategory');

      createController();
      $scope.addNewCategory(newCategory);

      expect(CategoryService.setMaxCategoryId).toHaveBeenCalled();
      expect(CategoryService.addCategory).toHaveBeenCalled();
    });
  });
});

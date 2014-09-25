'use strict';
describe('CategoryModifyCtrl', function () {

  var $scope, createController, CategoryService, ItemsService;

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
  });

  it('should emit to parent controller', function () {

    spyOn($scope, '$emit');
    createController();
    expect($scope.$emit).toHaveBeenCalledWith('to-parent-categoryManagementActive');
  });

  it ('should load items from redis', function () {

    createController();
    expect($scope.items.length).toBe(0);
  });

  it ('should load categorys from redis', function () {

    createController();
    expect($scope.categories.length).toBe(0);
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
      spyOn(CategoryService, 'getCategories');

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
      spyOn(CategoryService, 'getCategories');

      createController();
      $scope.modifyCurrentCategory(category);

      expect(CategoryService.putCategory).toHaveBeenCalled();
      expect(CategoryService.getCategories).toHaveBeenCalled();
    });
  });
});

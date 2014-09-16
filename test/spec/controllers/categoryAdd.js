'use strict';
describe('CategoryAddCtrl', function () {

  var $scope, createController, categoryService;

  beforeEach(function () {
       module('letusgoApp');

       inject(function ($injector) {

           $scope = $injector.get('$rootScope').$new();
           categoryService = $injector.get('categoryService');

           var $controller = $injector.get('$controller');

           createController = function () {

             return $controller ('CategoryAddCtrl', {
                  $scope: $scope,
                  categoryService: categoryService
             });
           };
       });
  });

  it ('should load items from localStorage', function () {

    spyOn(Util.localStorage, 'getStorageItem');
    createController();

    expect(Util.localStorage.getStorageItem).toHaveBeenCalled();
  });

  it ('should load categorys from localStorage', function () {

    spyOn(Util.localStorage, 'getStorageItem');
    createController();

    expect(Util.localStorage.getStorageItem).toHaveBeenCalled();
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
      spyOn(categoryService, 'deleteCategory').and.returnValue([]);
      spyOn(categoryService, 'deleteItem').and.returnValue([]);

      createController();
      $scope.deleteCurrentCategory(category);

      expect($scope.items.length).toBe(0);
      expect($scope.categorys.length).toEqual(0);

      expect(categoryService.deleteItem).toHaveBeenCalled();
      expect(categoryService.deleteCategory).toHaveBeenCalled();
    });
  });

  describe('addNewCategory function', function () {

    it('should add new category to categorys', function () {

      var newCategory = '饮品';

      spyOn(Util.localStorage, 'setStorageItem');
      spyOn(Util.localStorage, 'getStorageItem').and.returnValue([{id: 0, name: '雪碧'}]);

      createController();
      $scope.addNewCategory(newCategory);

      expect(Util.localStorage.setStorageItem).toHaveBeenCalled();
    });
  });
});

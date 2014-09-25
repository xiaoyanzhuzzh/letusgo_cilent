'use strict';
describe('indexCtrl', function () {

  var $scope, $rootScope, createController, ItemsService;

  beforeEach(function () {
       module('letusgoApp');

       inject(function ($injector) {

           $scope = $injector.get('$rootScope').$new();
           $rootScope = $injector.get('$rootScope');
           ItemsService = $injector.get('ItemsService');

           var $controller = $injector.get('$controller');

           createController = function () {

             return $controller ('indexCtrl', {
                  $scope: $scope,
                  ItemsService: ItemsService
             });
           };
       });
  });

  it ('should load cartCount from localStorage', function () {

    spyOn(ItemsService, 'get').and.returnValue(31);
    createController();

    expect($scope.cartCount).toEqual(31);
    expect(ItemsService.get).toHaveBeenCalled();
  });

  it('should to-parent-cartCount can do',function(){

    spyOn(ItemsService, 'get').and.returnValue(undefined);
    spyOn(ItemsService, 'set');
    createController();

    $scope.$digest();
    $rootScope.$broadcast('to-parent-cartCount');
    $scope.$digest();

    expect($scope.cartCount).toBe(1);
    expect(ItemsService.get.calls.count()).toBe(1);
    expect(ItemsService.set.calls.count()).toBe(1);
  });

  it('should to-parent-updateCartCount can do',function(){

    spyOn(ItemsService, 'get').and.returnValue(22);
    createController();

    $scope.$digest();
    $rootScope.$broadcast('to-parent-updateCartCount');
    $scope.$digest();

    expect($scope.cartCount).toBe(22);
    expect(ItemsService.get.calls.count()).toBe(2);
  });


  it('should to-parent-cartCount can do',function(){

    spyOn(ItemsService, 'get').and.returnValue(4);
    spyOn(ItemsService, 'set');
    createController();

    $scope.$digest();
    $rootScope.$broadcast('to-parent-cartCount');
    $scope.$digest();

    expect($scope.cartCount).toBe(5);
    expect(ItemsService.get.calls.count()).toBe(1);
    expect(ItemsService.set.calls.count()).toBe(1);
  });

  it('should to-parent-homeActive can do',function(){

    createController();

    $scope.$digest();
    $rootScope.$broadcast('to-parent-homeActive');
    $scope.$digest();

    expect($scope.homeActive).toBe(true);
    expect($scope.itemsListActive).toBe(false);
    expect($scope.cartItemsListActive).toBe(false);
    expect($scope.cartPayListActive).toBe(false);
    expect($scope.categoryManagementActive).toBe(false);
    expect($scope.itemManagementActive).toBe(false)
  });

  it('should to-parent-itemsListActive can do',function(){

    createController();

    $scope.$digest();
    $rootScope.$broadcast('to-parent-itemsListActive');
    $scope.$digest();

    expect($scope.homeActive).toBe(false);
    expect($scope.itemsListActive).toBe(true);
    expect($scope.cartItemsListActive).toBe(false);
    expect($scope.cartPayListActive).toBe(false);
    expect($scope.categoryManagementActive).toBe(false);
    expect($scope.itemManagementActive).toBe(false)
  });

  it('should to-parent-cartItemsListActive can do',function(){

    createController();

    $scope.$digest();
    $rootScope.$broadcast('to-parent-cartItemsListActive');
    $scope.$digest();

    expect($scope.homeActive).toBe(false);
    expect($scope.itemsListActive).toBe(false);
    expect($scope.cartItemsListActive).toBe(true);
    expect($scope.cartPayListActive).toBe(false);
    expect($scope.categoryManagementActive).toBe(false);
    expect($scope.itemManagementActive).toBe(false)
  });


  it('should to-parent-cartPayListActive can do',function(){

    createController();

    $scope.$digest();
    $rootScope.$broadcast('to-parent-cartPayListActive');
    $scope.$digest();

    expect($scope.homeActive).toBe(false);
    expect($scope.itemsListActive).toBe(false);
    expect($scope.cartItemsListActive).toBe(false);
    expect($scope.cartPayListActive).toBe(true);
    expect($scope.categoryManagementActive).toBe(false);
    expect($scope.itemManagementActive).toBe(false)
  });

  it('should to-parent-cartPayListActive can do',function(){

    createController();

    $scope.$digest();
    $rootScope.$broadcast('to-parent-categoryManagementActive');
    $scope.$digest();

    expect($scope.homeActive).toBe(false);
    expect($scope.itemsListActive).toBe(false);
    expect($scope.cartItemsListActive).toBe(false);
    expect($scope.cartPayListActive).toBe(false);
    expect($scope.categoryManagementActive).toBe(true);
    expect($scope.itemManagementActive).toBe(false)
  });

  it('should to-parent-cartPayListActive can do',function(){

    createController();

    $scope.$digest();
    $rootScope.$broadcast('to-parent-itemManagementActive');
    $scope.$digest();

    expect($scope.homeActive).toBe(false);
    expect($scope.itemsListActive).toBe(false);
    expect($scope.cartItemsListActive).toBe(false);
    expect($scope.cartPayListActive).toBe(false);
    expect($scope.categoryManagementActive).toBe(false);
    expect($scope.itemManagementActive).toBe(true)
  });
});

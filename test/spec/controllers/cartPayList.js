'use strict';
describe('CartPayListCtrl', function () {
   var $scope, CartItemsService, createController, ItemsService;
  beforeEach(function () {
    module('letusgoApp');

    inject(function ($injector) {

      $scope = $injector.get('$rootScope').$new();
      CartItemsService = $injector.get('CartItemsService');
      ItemsService = $injector.get('ItemsService');

      var $controller = $injector.get('$controller');

      createController = function () {

        return $controller ('CartPayListCtrl', {
          $scope: $scope,
          CartItemsService: CartItemsService,
          ItemsService: ItemsService
        });
      };
    });
  });

  describe('cartPayList', function () {
    it('should load cartPayList', function () {
      spyOn(ItemsService, 'get').and.returnValue(

        [{item: {barcode:'ITEM000001', name: '雪碧', unit:'瓶', price:3.00, category:'饮品'},number: 1}]
      );
      createController();

      expect($scope.cartPayList.length).toBe(1);
      expect($scope.cartPayList[0].number).toEqual(1);
      expect($scope.cartPayList[0].item.barcode).toEqual('ITEM000001');
      expect(ItemsService.get).toHaveBeenCalled();
    });

    describe('totalMoney', function () {

      beforeEach(function () {

        spyOn(ItemsService, 'get');
        spyOn(CartItemOperateService,'getTotalMoney').and.returnValue(1);
        createController();
      });

      it ('should get totalMoney', function () {

        expect($scope.total).toEqual(1);
        expect(CartItemOperateService.getTotalMoney).toHaveBeenCalled();
      });
    });

    describe('totalNumber', function () {

      beforeEach(function () {

        spyOn(ItemsService, 'get');
        spyOn(CartItemOperateService,'getTotalNumber').and.returnValue(1);
        createController();
      });

      it ('should get totalNumber', function () {

        expect($scope.totalNumber).toEqual(1);
        expect(CartItemOperateService.getTotalNumber).toHaveBeenCalled();
        expect(ItemsService.get).toHaveBeenCalled();
      });
    });
  });
});

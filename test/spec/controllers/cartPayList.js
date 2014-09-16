'use strict';
describe('CartPayListCtrl', function () {
   var $scope, cartItemOperateService, createController;
  beforeEach(function () {
    module('letusgoApp');

    inject(function ($injector) {

      $scope = $injector.get('$rootScope').$new();
      cartItemOperateService = $injector.get('cartItemOperateService');

      var $controller = $injector.get('$controller');

      createController = function () {

        return $controller ('CartPayListCtrl', {
          $scope: $scope,
          cartItemOperateService: cartItemOperateService
        });
      };
    });
  });

  describe('cartPayList', function () {
    it('should load cartPayList', function () {
      spyOn(Util.localStorage, 'getStorageItem').and.returnValue(

        [{item: {barcode:'ITEM000001', name: '雪碧', unit:'瓶', price:3.00, category:'饮品'},number: 1}]
      );
      createController();

      expect($scope.cartPayList.length).toBe(1);
      expect($scope.cartPayList[0].number).toEqual(1);
      expect($scope.cartPayList[0].item.barcode).toEqual('ITEM000001');
      expect(Util.localStorage.getStorageItem).toHaveBeenCalled();
    });

    describe('totalMoney', function () {

      beforeEach(function () {

        spyOn(Util.localStorage, 'getStorageItem');
        spyOn(cartItemOperateService,'getTotalMoney').and.returnValue(1);
        createController();
      });

      it ('should get totalMoney', function () {

        expect($scope.total).toEqual(1);
        expect(cartItemOperateService.getTotalMoney).toHaveBeenCalled();
      });
    });

    describe('totalNumber', function () {

      beforeEach(function () {

        spyOn(Util.localStorage, 'getStorageItem');
        spyOn(cartItemOperateService,'getTotalNumber').and.returnValue(1);
        createController();
      });

      it ('should get totalNumber', function () {

        expect($scope.totalNumber).toEqual(1);
        expect(cartItemOperateService.getTotalNumber).toHaveBeenCalled();
        expect(Util.localStorage.getStorageItem).toHaveBeenCalled();
      });
    });
  });
});

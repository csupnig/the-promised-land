import {Spec, Inject, Test} from 'TJAngular/index';
import {AppController} from './AppController';
import {Item, AppService} from './AppService';

@Spec('TASK 2: Wait for two async calls')
class Task2Spec {

    @Inject('$q', 'ng')
    public $q : angular.IQService;

    @Inject('$rootScope', 'ng')
    public $rootScope : angular.IRootScopeService;

    @Inject('AppController', 'app')
    public controller : AppController;

    @Inject('AppService', 'app')
    public service : AppService;

    @Test()
    public init() : void {
        expect(this.controller).toBeDefined();
    }

    @Test()
    public initService() : void {
        expect(this.service).toBeDefined();
    }

    @Test('Waited for both async calls -> One is faster')
    public testFunctionality1() : void {
        let deferred1 : angular.IDeferred<boolean> = this.$q.defer<boolean>();
        let deferred2 : angular.IDeferred<boolean> = this.$q.defer<boolean>();

        spyOn((<any> this.controller).$deps.AppService, 'asyncOne').and.returnValue(deferred1.promise);
        spyOn((<any> this.controller).$deps.AppService, 'asyncTwo').and.returnValue(deferred2.promise);

        this.controller.waitForData();
        this.$rootScope.$apply();

        deferred1.resolve(true);
        this.$rootScope.$apply();
        expect(this.controller.success).toBeUndefined();

        deferred2.resolve(true);
        this.$rootScope.$apply();
        expect(this.controller.success).toBeTruthy();

        expect((<any> this.controller).$deps.AppService.asyncOne).toHaveBeenCalled();
        expect((<any> this.controller).$deps.AppService.asyncTwo).toHaveBeenCalled();
    }

    @Test('Waited for both async calls -> Second is faster')
    public testFunctionality2() : void {
        let deferred1 : angular.IDeferred<boolean> = this.$q.defer<boolean>();
        let deferred2 : angular.IDeferred<boolean> = this.$q.defer<boolean>();

        spyOn((<any> this.controller).$deps.AppService, 'asyncOne').and.returnValue(deferred1.promise);
        spyOn((<any> this.controller).$deps.AppService, 'asyncTwo').and.returnValue(deferred2.promise);

        this.controller.waitForData();
        this.$rootScope.$apply();

        deferred2.resolve(true);
        this.$rootScope.$apply();
        expect(this.controller.success).toBeUndefined();

        deferred1.resolve(true);
        this.$rootScope.$apply();
        expect(this.controller.success).toBeTruthy();

        expect((<any> this.controller).$deps.AppService.asyncOne).toHaveBeenCalled();
        expect((<any> this.controller).$deps.AppService.asyncTwo).toHaveBeenCalled();
    }

    @Test('Errors are handled')
    public testErrors() : void {
        let deferred1 : angular.IDeferred<boolean> = this.$q.defer<boolean>();
        let deferred2 : angular.IDeferred<boolean> = this.$q.defer<boolean>();

        spyOn((<any> this.controller).$deps.AppService, 'asyncOne').and.returnValue(deferred1.promise);
        spyOn((<any> this.controller).$deps.AppService, 'asyncTwo').and.returnValue(deferred2.promise);

        this.controller.waitForData();
        this.$rootScope.$apply();

        deferred2.resolve(true);
        this.$rootScope.$apply();
        expect(this.controller.success).toBeUndefined();

        deferred1.reject();
        this.$rootScope.$apply();
        expect(this.controller.success).toBeUndefined();
        expect(this.controller.hasError).toBeTruthy();

        expect((<any> this.controller).$deps.AppService.asyncOne).toHaveBeenCalled();
        expect((<any> this.controller).$deps.AppService.asyncTwo).toHaveBeenCalled();
    }

}

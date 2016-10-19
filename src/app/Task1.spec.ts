import {Spec, Inject, Test} from 'TJAngular/index';
import {AppController} from './AppController';
import {Item, AppService} from './AppService';

@Spec('TASK 1: Convert function to use promises')
class Task1Spec {

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

    @Test('Proper item in controller member after save')
    public testFunctionality() : void {
        let item : Item = new Item("Franz");
        let saved : Item = new Item("Saved");

        spyOn((<any> this.controller).$deps.AppService, 'getAsyncPromisedItem').and.returnValue(this.$q.when(item));
        spyOn((<any> this.controller).$deps.AppService, 'saveItemPromised').and.returnValue(this.$q.when(saved));

        spyOn((<any> this.controller).$deps.AppService, 'getAsyncItem').and.callFake((cb : (item : Item) => void) => {
            cb(item);
        });
        spyOn((<any> this.controller).$deps.AppService, 'saveAsyncItem').and.callFake((tosave : Item, cb : (item : Item) => void) => {
            cb(saved);
        });

        this.controller.processData();
        this.$rootScope.$apply();
        expect(this.controller.item).toBe(saved);
        expect(this.controller.hasError).toBeFalsy();
    }

    @Test('Promise functions are being used')
    public testPromiseFunctionsUsed() : void {
        let item : Item = new Item("Franz");
        let saved : Item = new Item("Saved");

        spyOn((<any> this.controller).$deps.AppService, 'getAsyncPromisedItem').and.returnValue(this.$q.when(item));
        spyOn((<any> this.controller).$deps.AppService, 'saveItemPromised').and.returnValue(this.$q.when(saved));

        spyOn((<any> this.controller).$deps.AppService, 'getAsyncItem').and.callFake((cb : (item : Item) => void) => {
            cb(item);
        });
        spyOn((<any> this.controller).$deps.AppService, 'saveAsyncItem').and.callFake((tosave : Item, cb : (item : Item) => void) => {
            cb(saved);
        });

        this.controller.processData();
        this.$rootScope.$apply();

        expect((<any> this.controller).$deps.AppService.getAsyncPromisedItem).toHaveBeenCalled();
        expect((<any> this.controller).$deps.AppService.saveItemPromised).toHaveBeenCalled();
        expect((<any> this.controller).$deps.AppService.getAsyncItem).not.toHaveBeenCalled();
        expect((<any> this.controller).$deps.AppService.saveAsyncItem).not.toHaveBeenCalled();
    }

    @Test('Errors are handled')
    public testErrorHandling() : void {
        let item : Item = new Item("Franz");
        let saved : Item = new Item("Saved");

        spyOn((<any> this.controller).$deps.AppService, 'getAsyncPromisedItem').and.returnValue(this.$q.resolve(item));
        spyOn((<any> this.controller).$deps.AppService, 'saveItemPromised').and.returnValue(this.$q.reject(saved));

        spyOn((<any> this.controller).$deps.AppService, 'getAsyncItem');
        spyOn((<any> this.controller).$deps.AppService, 'saveAsyncItem');

        this.controller.processData();
        this.$rootScope.$apply();

        expect(this.controller.hasError).toBeTruthy();

        expect((<any> this.controller).$deps.AppService.getAsyncPromisedItem).toHaveBeenCalled();
        expect((<any> this.controller).$deps.AppService.saveItemPromised).toHaveBeenCalled();
        expect((<any> this.controller).$deps.AppService.getAsyncItem).not.toHaveBeenCalled();
        expect((<any> this.controller).$deps.AppService.saveAsyncItem).not.toHaveBeenCalled();
    }

}

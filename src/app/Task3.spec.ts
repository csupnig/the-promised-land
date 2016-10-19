import {Spec, Inject, Test} from 'TJAngular/index';
import {AppController} from './AppController';
import {Item, AppService} from './AppService';

@Spec('TASK 3: Do it no matter what')
class Task3Spec {

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

    @Test('The item was set after a successful experiment.')
    public testFunctionality1() : void {
        let deferred1 : angular.IDeferred<Item> = this.$q.defer<Item>();
        let item : Item = new Item("Horst");

        spyOn((<any> this.controller).$deps.AppService, 'dangerousExperiment').and.returnValue(deferred1.promise);

        this.controller.doItNoMatterWhat();
        this.$rootScope.$apply();
        expect(this.controller.success).toBeUndefined();

        deferred1.resolve(item);
        this.$rootScope.$apply();
        expect(this.controller.item).toBe(item);
        expect(this.controller.success).toBeTruthy();

        expect((<any> this.controller).$deps.AppService.dangerousExperiment).toHaveBeenCalled();
    }

    @Test('Errors were handled on a failed experiment.')
    public testFunctionality2() : void {
        let deferred1 : angular.IDeferred<Item> = this.$q.defer<Item>();

        spyOn((<any> this.controller).$deps.AppService, 'dangerousExperiment').and.returnValue(deferred1.promise);

        this.controller.doItNoMatterWhat();
        this.$rootScope.$apply();
        expect(this.controller.success).toBeUndefined();

        deferred1.reject();
        this.$rootScope.$apply();
        expect(this.controller.hasError).toBeTruthy();
        expect(this.controller.success).toBeTruthy();

        expect((<any> this.controller).$deps.AppService.dangerousExperiment).toHaveBeenCalled();
    }
}

import {Spec, Inject, Test, Template} from 'TJAngular/index';
import {YourService} from './YourService';

@Spec('TASK 5: Implement a function returning a promise')
class Task5Spec {

    @Inject('$q', 'ng')
    public $q : angular.IQService;

    @Inject('$rootScope', 'ng')
    public $rootScope : angular.IRootScopeService;

    @Inject('YourService', 'app')
    public service : YourService;

    @Test()
    public init() : void {
        expect(this.service).toBeDefined();
    }

    @Test('Promise is returned')
    public testPromsie() : void {
        let result : angular.IPromise<string> = this.service.returnsPromise();
        let resolved : boolean = false;
        result.then(() => {
            resolved = true;
        });
        this.$rootScope.$apply();

        expect(resolved).toBeTruthy();
    }
}

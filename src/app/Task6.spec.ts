import {Spec, Inject, Test, Template} from 'TJAngular/index';
import {YourService} from './YourService';

@Spec('TASK 6: Implement a function that returns a promise that is rejected')
class Task6Spec {

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

    @Test('Promise is returned and rejected')
    public testPromise() : void {
        let result : angular.IPromise<string> = this.service.returnsFailedPromise();
        let rejected : boolean = false;
        result.catch(() => {
            rejected = true;
        });
        this.$rootScope.$apply();

        expect(rejected).toBeTruthy();
    }
}

import {Spec, Inject, Test, Template} from 'TJAngular/index';

@Spec('TASK 4: Display data in a component')
class Task4Spec {

    @Inject('$q', 'ng')
    public $q : angular.IQService;

    @Inject('$rootScope', 'ng')
    public $rootScope : angular.IRootScopeService;

    @Template(`<div>
                    <appcomponent></appcomponent>
                </div>`)
    @Inject('appcomponent', 'app')
    public component : angular.IAugmentedJQuery;

    @Test()
    public init() : void {
        expect(this.component.html()).toContain('app-component');
    }

    @Test('Data is properly displayed')
    public displayData() : void {
        expect(this.component.html()).toContain('Franz');
    }
}

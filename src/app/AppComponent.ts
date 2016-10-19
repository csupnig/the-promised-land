import {AppService} from './AppService';
import {Inject, Component} from '../utils';


@Component('appcomponent', {
    controllerAs: 'vm',
    templateUrl: 'app/app.component.tpl.html'
})
export class AppComponent {

    /*
    TASK 4: Display data in a component
    The method longLoadingName() on the appService returns a promise on a string. It is the name of a high ranking
    official in our country. He wants his name to show up in our application. Use a component to display his name.
     */
    public name : string;

    constructor(@Inject('AppService') private appService : AppService) {
        this.appService.longLoadingName().then((name : string) => {
            this.name = name;
        });
    }

    public $onInit() : void {

    }

    public $onChanges(changesObj : any) : void {
    }

    public $postLink() : void {
    }
}

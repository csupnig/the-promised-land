import {Controller, Inject} from '../utils';
import {AppService, Item} from './AppService';


@Controller('AppController')
export class AppController {

    public hasError : boolean = false;
    public item : Item;

    public success : boolean;

    constructor(@Inject('AppService') private appService : AppService,
                @Inject('$q') private $q : angular.IQService) {

    }

    /*
    TASK 1: Convert function to use promises.
    There are respective methods for getAsyncItem and saveAsyncItem on the AppService, which return promises.
    Use them!
    Handle all errors and set this.hasError to true if an error occurs.
     */
    public processData() : void {
        this.appService.getAsyncItem((item : Item) => {
            this.appService.saveAsyncItem(item, (savedItem : Item) => {
                this.item = savedItem;
            }, (err : any) => {
                this.hasError = true;
            });
        }, (err : any) => {
            this.hasError = true;
        });
    }

    /*
    TASK 2: Wait for two async calls.
    Use the methods asyncOne and asyncTwo on the AppService and wait for their results.
    If all results are true, set this.success to true, otherwise set it to false.
    If an error occurs, set hasError to true.
     */
    public waitForData() : void {
    }

    /*
    TASK 3: Do it no matter what.
    Use the method dangerousExperiment of the AppService. Unfortunately this experiment is not
    very safe and often fails. If the experiment succeeds, it returns an item. Set it to this.item.
    if it fails set this.hasError to true.
    In any case set this.success to true, because we like to pretend that everything is fine.
     */
    public doItNoMatterWhat() : void {
    }
}

import 'angular';
import {Inject, Service} from '../utils';

export class Item {
    constructor(public name : string) {}
}

@Service('AppService')
export class AppService {
    constructor(@Inject('$q') private $q : angular.IQService,
                @Inject('$timeout') private $timeout : angular.ITimeoutService) {}

    public getAsyncPromisedItem() : angular.IPromise<Item> {
        let deferred : angular.IDeferred<Item> = this.$q.defer();
        this.$timeout(() => {
            deferred.resolve(new Item("Steve"));
        }, 5);
        return deferred.promise;
    }

    public saveItemPromised(item : Item) : angular.IPromise<Item> {
        let deferred : angular.IDeferred<Item> = this.$q.defer();
        this.$timeout(() => {
            deferred.resolve(item);
        }, 5);
        return deferred.promise;
    }

    public getAsyncItem(cb : (item : Item) => void, error : (reason : any) => void) {
        this.$timeout(() => {
            cb(new Item("Steve"));
        }, 5);
    }

    public saveAsyncItem(item : Item, cb : (item : Item) => void, error : (reason : any) => void) {
        this.$timeout(() => {
            cb(item);
        }, 5);
    }

    public asyncOne() : angular.IPromise<boolean> {
        return this.$q.when(true);
    }

    public asyncTwo() : angular.IPromise<boolean> {
        return this.$q.when(true);
    }

    public dangerousExperiment() : angular.IPromise<Item> {
        return this.$q.when(new Item("Franz"));
    }

    public longLoadingName() : angular.IPromise<string> {
        return this.$q.when("Franz");
    }
}

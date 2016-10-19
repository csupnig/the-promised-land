import 'angular';
import {Inject, Service} from '../utils';

@Service('YourService')
export class YourService {
    constructor(@Inject('$q') private $q : angular.IQService,
                @Inject('$timeout') private $timeout : angular.ITimeoutService) {}

    /**
     * TASK 5 (YourService): Implement a function returning a promise
     *   Implement the function returnsPromise() in YourService that returns a promise that resolves to a string.
     * @returns {IPromise<string>}
     */
    public returnsPromise() : angular.IPromise<string> {
        return this.$q.when("Franz");
    }

    /**
     * TASK 6 (YourService): Implement a function that returns a promise that is rejected
     * Implement the function returnsFailedPromise() in YourService that returns a promise that is being rejected.
     * @returns {IPromise<any>}
     */
    public returnsFailedPromise() : angular.IPromise<string> {
        return this.$q.reject("Some error");
    }
}

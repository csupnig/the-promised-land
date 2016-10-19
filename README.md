# The Promised Land

Find out how to use Promises in Angular properly.

### Install

```sh
npm i webpack typescript -g
git clone git@github.com/csupnig/the-promised-land.git
cd the-promised-land
npm install
npm test
```

Read the concepts in this document and then test your knowledge
You will find a series of Tasks described below and you can check your implementation by executing the tests.

To run tests

```sh
npm test
```


### Concepts

    A promise represents the eventual result of an asynchronous operation.
    
#### Why Promises?
Using callback functions to achieve asynchrony in code becomes just way too complicated when you have to compose multiple asynchronous calls and make decisions depending upon the outcome of this composition. While handling the normal case is still somewhat feasible it starts to become very ugly when you have to provide rock solid exception handling.

#### Callback vs. Promise

    // callback
    fs.readFile('somefile.txt', function(err , contents) {
        if (err) {
            return handleError(err);
        }
        handleFile(contents);
    }
    
    // promises
    fs.readFileAsync('somefile.txt')
        .then(handleFile)
        .catch(handleError);
        
The difference becomes even more aware if you have to handle multiple async calls that depend on each other.
        
    doSomething(function(err) {
        if (err) {
            return handleError(err);
        }
        doSomethingElse(function(err) {
            if (err) {
                return handleError(err);
            }
            doOneMoreThing(function(err) {
                if (err) {
                    return handleError(err);
                }
                // handle success
             });
        });
    });
        
    function handleError(err) {
        // handle error
    }
    
This is jokingly called the pyramid of doom. Because you will soon end up on the right end of your screen
and the code will not be readable anymore. 

The same thing with chained promises:
    
    doSomething().then(function () {
        return doSomethingElse();
    }).then(function () {
        return doOneMoreThing();
    }).catch(function () {
        // handle error
    });

### Mistakes using Promises

1. Promise pyramid of doom
    It can be very tempting to fall back into the same scheme of layering promise calls as we used to do it with common callback
    functions. Just don't do it!
2. Forgetting to catch
    Forgetting to catch will swallow errors. This can result in a long hunt for bugs, once strange behaviour in your app occurs.
3. Forgetting to return
    Forgetting to return can result in two unwanted behaviours. An outer promise can finish early and errors of the not returned function
    call can be swallowed.
    
### Awesome facts about Promises
1. Returning a value inside a promise callback will result in another Promise
    
        doSomething().then(function() {
            return "myvalue";
        }).then(function (data) {
            if (data === "myvalue") { // true
                // yeeey!
            }
        });
        
2. Throwing an error inside a promise callback will result in the promise being rejected      
        
        doSomething().then(function() {
               
              throw "My custom error";
          }).then(function (data) {
              // will not be called
          }).catch(function () {
                // Yeeey!
          });

### Tasks

####TASK 1 (AppController): Convert function to use promises.
    There are respective methods for getAsyncItem and saveAsyncItem on the AppService, which return promises.
    Use them!
    Handle all errors and set this.hasError to true if an error occurs.
    
####TASK 2 (AppController): Wait for two async calls.
    Use the methods asyncOne and asyncTwo on the AppService and wait for their results.
    If all results are true, set this.success to true, otherwise set it to false.
    If an error occurs, set hasError to true.

####TASK 3 (AppController): Do it no matter what.
    Use the method dangerousExperiment of the AppService. Unfortunately this experiment is not
    very safe and often fails. If the experiment succeeds, it returns an item. Set it to this.item.
    if it fails set this.hasError to true.
    In any case set this.success to true, because we like to pretend that everything is fine.

####TASK 4 (AppComponent): Display data in a component
    The method longLoadingName() on the appService returns a promise on a string. It is the name of a high ranking
    official in our country. He wants his name to show up in our application. Use a component to display his name.
    
####TASK 5 (YourService): Implement a function returning a promise
    Implement the function returnsPromise() in YourService that returns a promise that resolves to a string.
    
####TASK 6 (YourService): Implement a function that returns a promise that is rejected
    Implement the function returnsFailedPromise() in YourService that returns a promise that is being rejected.

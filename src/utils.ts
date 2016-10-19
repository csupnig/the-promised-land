'use strict';

import app from './app/app';

function findOrCreateModule() : angular.IModule {
    'use strict';
    return app;
}

export function Inject(injectable) {
    'use strict';
    return (prototype, method, argumentPosition) => {
        prototype.$inject = prototype.$inject || [];
        prototype.$inject[argumentPosition] = injectable;
    };
}

export function Component( selector : string, options : angular.IComponentOptions) {
    'use strict';
    return (controller : Function) => {
        let module = findOrCreateModule();
        module.component(selector, angular.extend(options, {controller: controller}));
    };
}

export function Directive( directiveName) {
    'use strict';
    return function(target: any) {
        let directiveFactory: angular.IDirectiveFactory = (...args) => {
            let directive: angular.IDirective = new target(...args);
            if (angular.isDefined(directive.link) && angular.isFunction(directive.link)) {
                // The following snippet should fix the link function, so we can access the directive with "this"
                let originalLink : angular.IDirectiveLinkFn = <angular.IDirectiveLinkFn> directive.link;
                directive.link = (...origArgs) => {
                    originalLink.apply(directive, origArgs);
                };
            }
            return directive;
        };
        let constructorArray: Array<any> = target.$inject ? target.$inject : [];
        let module = findOrCreateModule();
        module.directive(directiveName, constructorArray.concat(directiveFactory));
        return target;
    };
}

export function Controller(ctrlName : string) {
    'use strict';
    return (target : any) => {
        let module = findOrCreateModule();
        module.controller(ctrlName, target);
    };
}

export function Service(serviceName : string) {
    'use strict';
    return (target : any) => {
        let mod = findOrCreateModule();
        mod.service(serviceName, target);
    };
}

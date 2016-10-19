import './app/app';

import './app/AppController';
import './app/AppService';
import './app/YourService';
import './app/AppComponent';
import './app/app.component.tpl.html';

angular.bootstrap(document, ["app"], {
    strictDi: true
});

import * as components from './index.components';
import * as config from './index.config';
import * as run from './index.run';

const App = angular.module(
  'myATApp', [
    // plugins
    require('angular-ui-router'),
    "ngAnimate", 
		"LocalStorageModule", 
		"ngSanitize", 
		"ngMessages", 
		"ngAria", 
		"ngMaterial", 
		"satellizer", 
		"pascalprecht.translate", 
		"oc.lazyLoad",

    // core
    require('./core/core.module').name,

    // components
    require('./index.components').name,

    // routes
    require('./index.routes').name,

    // pages
    require('./pages/page/page.module').name,
    // Add new pages above
  ]
);

App
  .config(config)
  .run(run);

export default App;

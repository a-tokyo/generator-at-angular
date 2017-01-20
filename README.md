# generator-at-angular

[![npm version](https://badge.fury.io/js/generator-at-angular.svg)](https://badge.fury.io/js/generator-at-angular)

> Yeoman generator for AngularJS + Webpack with ES6 and SASS.

> * Babel 6 with ES2017 features.
> * Latest Webpack with Tree Shaking feature enabled.
> * SASS as CSS preprocessor.
> * Angular UI router as default router.
> * Karma and Jasmine for testing.
> * All necessary webpack loaders already included (Sass, Images, Fonts, ngAnnotate, ngTemplateCache, etc.)
> * Proxy configured to make cross origin requests with a simple prefix.


### Directory Layout

```shell

├── /config/                                         #Build config
│   └── /webpack/                                    #Webpack config files
│       ├── /environments/                           #Webpack env dependent configs
│       └── global.js                                #Global webpack settings for all envs
├── /dist/                                           #The built application directory to be deployed
├── /node_modules/                                   #3rd-party libraries and utilities
├── /src/                                            #Source folder
│   ├── /app/                                        #Application code
│   │   ├── /components/                             #Shared UI components
│   │   │   └── /component/                          #Shared component. Place component's styles, components, directives, templates here
│   │   │   │   ├── /components/                     #Nested components. Place nested components here.
│   │   │   │   ├── /directives/                     #Component related directives.
│   │   │   │   ├── /services/                       #Component services.
│   │   │   │   ├── /component.component-spec.js     #Component unit tests JS                 
│   │   │   │   ├── /component.component.js          #Component definition JS                 
│   │   │   │   ├── /component.component.html        #Component template          
│   │   │   │   ├── /component.module.js             #Component module                 
│   │   │   │   └── /component.component.scss        #Component styles             
│   │   ├── /core/                                   #Shared angular services/directives
│   │   │   ├── /directives/                         #Shared directives
│   │   │       └── /directive/                      #Shared directive. Place directive's templates and controller here.
│   │   │   │   │   ├── /directive.directive-spec.js #Directive unit tests
│   │   │   │   │   ├── /directive.directive.js      #Directive definition, link and controller
│   │   │   │   │   ├── /directive.html              #Directive template
│   │   │   │   │   └── /directive.scss              #Directive styles
│   │   │   ├── /services/                           #Shared services
│   │   │       └── /service/                        #Shared directive. Place directive's templates and controller here.
│   │   │   │   │   ├── /service.factory-spec.js     #Service unit tests
│   │   │   │   │   └── /service.factory.js          #Service definition
│   │   │   └── /core.module.js                      #Import of all core components should be here
│   │   ├── /pages/                                  #All pages-dependent content should place here
│   │   │   ├── /page/                               #page
│   │   │   │   ├── /page.controller-spec.js         #page Controller unit tests
│   │   │   │   ├── /page.controller.js              #page Controller
│   │   │   │   ├── /page.html                       #page template
│   │   │   │   ├── /page.module.js                  #page module
│   │   │   │   ├── /page.route.js                   #page routes
│   │   │   │   └── /page.scss                       #page styles
│   │   │   └── /.../                                #Other pages...
│   │   ├── /index.bootstrap.js                      #Entry point. Import internal and external modules and bootstrap (RUN) angular application
│   │   ├── /index.components.js                     #Custom components definition
│   │   ├── /index.config.js                         #Function that will be triggered in Angular's "config" phase
│   │   ├── /index.module.js                         #Main application's module
│   │   ├── /index.routes.js                         #Describe only "otherwise" and async routes here
│   │   ├── /index.run.js                            #Function that will be triggered in Angular's "run" phase
│   │   ├── /index.vendor.js                         #Import all vendors and 3rd party plugins here
│   ├── /assets/                                     #Static content
│   │   ├── /data/                                   #Data (e.g: JSON files)
│   │   ├── /fonts/                                  #Fonts
│   │   ├── /images/                                 #Images
│   │   ├── /js/                                     #Extra libs folder
│   │   └── /styles/                                 #Styles folder
│   │       ├── /css/                                #CSS, place external css files here
│   │       └── /sass/                               #SASS
│   │           │   /fonts.scss                      #Fonts SASS file, define your fonts here.
│   │           │   /index.scss                      #Index SASS entry file, bundles all SASS files.
│   │           └── /main.scss                       #Main SASS file, define your global styling here.
│   ├── favicon.ico                                  #Application icon to be displayed in bookmarks
│   └── tpl-index.ejs                                #Template for html-webpack-plugin that will be transpiled into index.html in /dist
│── .babelrc                                         #Babel config with presets and plugins
│── .eslintrc.json                                   #eslint config with parse options, rules, etc.
│── .gitignore                                       #List of files to ignore by git
│── .yo-rc.json                                      #Defines the root of the project, allows your user to run commands in subdirectories.
│── karma.conf.js                                    #Karma configuration file for testing
│── package.json                                     #The list of project dependencies and NPM scripts
│── README.md                                        #README file
│── test-context.js                                  #Test context, '*-spec.js' files
└── webpack.config.js                                #Bundling and optimization settings for Webpack
```


Getting Started
-------------

Prerequisites: Node, Yeoman and Webpack.
  > * To install Node, visit [nodeJS](https://nodejs.org/en/)

  > * To install Yeoman and Webpack:
        `npm install -g yo webpack`

Next, install this generator:

    npm i -g generator-at-angular


Creating a project:

    mkdir MyAwesomeApp && cd $_
    yo at-angular


Running a generator:

    yo at-angular:page my-page                                   # Generates a page (partial)
    yo at-angular:service my-service                             # Generates a service
    yo at-angular:service my-component/my-service                # Generates a service in a component
    yo at-angular:directive my-directive                         # Generates a shared directive
    yo at-angular:directive my-component/my-directive            # Generates a directive in a component
    yo at-angular:component my-component                         # Generates a component
    yo at-angular:component my-component/my-nested-component     # Generates a nested component
    yo at-angular:component my-component/my-nested-component/... # Generates a multiple nested component

Running the project:

##### `npm start` or `npm run dev` - to start development server on [localhost:8080](http://localhost:8080).
##### `npm run build` - To make production-ready build run  after few moments you will see build id `dist` folder.
##### `npm test` - To run all tests once, should be used for the CI.
##### `npm run tests` - To run tests in `watch` mode.

### Out of the box optional supports:

  > * **Angular Material:**
       UI Component framework provides a set of reusable UI components based on Google’s Material Design. https://material.angularjs.org/latest/getting-started
  > * **Boostrap Sass:**
       bootstrap-sass is a Sass-powered version of Bootstrap       


### Known bugs:
  > * **Problem:** Webpack2 unable to import function with only export default value.

  >   **Workaround**: Use ```import * as variable from 'package' ``` instead of ```import variable from 'package' ```

  <hr/>

  > * **Problem:** Webpack2 lastest build of today DEC 5 2016 throws an error while starting the server.

  >   **Workaround**: Fixed Webpack version to: 2.1.0-beta.25 and Webpack-dev-server to "2.1.0-beta.7" until the build is stable.

### Contribution:

#### To Contribute:
  > * Fork repository and clone it.
  > * Install npm packages and create new branch.
  > * Link local project to be able use generator with `yo` by running: `npm link`
  > * Contribute to the project and push your changes.
  > * Make a Pull Request.

#### Style Guide:
  This project uses single-quotes, two space indentation, multiple var statements and multiple comments per function. Use a single space after keywords. Ex: var x = function() { ... }

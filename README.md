# generator-at-angular

> Yeoman generator for AngularJS + Webpack with ES6 and SASS.

> * Babel 6 with ES2017 features.
> * Latest Webpack with Tree Shaking feature enabled.
> * SASS as CSS preprocessor.
> * Angular UI router as default router.
> * All necessary webpack loaders already included (Sass, Images, Fonts, ngAnnotate, ngTemplateCache, etc.)
> * Proxy configured to make cross origin requests with a simple prefix.


### Directory Layout

```shell

├── /config/                                   #Build config
│   └── /webpack/                              #Webpack config files
│       ├── /environments/                     #Webpack env dependent configs
│       └── global.js                          #Global webpack settings for all envs
├── /dist/                                     #The built application directory to be deployed
├── /node_modules/                             #3rd-party libraries and utilities
├── /src/                                      #Source folder
│   ├── /app/                                  #Application code
│   │   ├── /components/                       #Shared UI components
│   │   │   └── /component/                    #Shared component. Place component's styles, components, directives, templates here
│   │   │   │   ├── /components/               #Nested components. Place nested components here.
│   │   │   │   ├── /directives/               #Component related directives.
│   │   │   │   ├── /component.component.js    #Component definition JS                 
│   │   │   │   ├── /component.component.html  #Component template          
│   │   │   │   ├── /component.module.js       #Component module                 
│   │   │   │   └── /component.component.scss  #Component styles             
│   │   ├── /core/                             #Shared angular services/directives
│   │   │   ├── /directives/                   #Shared directives
│   │   │   ├── /services/                     #Shared services
│   │   │   └── /core.module.js                #Import of all core components should be here
│   │   ├── /pages/                            #All pages-dependent content should place here
│   │   │   ├── /page/                         #page
│   │   │   │   ├── /page.controller.js        #page Controller
│   │   │   │   ├── /page.html                 #page template
│   │   │   │   ├── /page.module.js            #page module
│   │   │   │   ├── /page.route.js             #page routes
│   │   │   │   └── /page.scss                 #page styles
│   │   │   └── /.../                          #Other pages...
│   │   ├── /index.bootstrap.js                #Entry point. Import internal and external modules and bootstrap (RUN) angular application
│   │   ├── /index.components.js               #Custom components definition
│   │   ├── /index.config.js                   #Function that will be triggered in Angular's "config" phase
│   │   ├── /index.module.js                   #Main application's module
│   │   ├── /index.routes.js                   #Describe only "otherwise" and async routes here
│   │   ├── /index.run.js                      #Function that will be triggered in Angular's "run" phase
│   │   ├── /index.vendor.js                   #Import all vendors and 3rd party plugins here
│   ├── /assets/                               #Static content
│   │   ├── /fonts/                            #Fonts
│   │   ├── /images/                           #Images
│   │   ├── /js/                               #Extra libs folder
│   │   └── /styles/                           #Styles folder
│   │       ├── /css/                          #CSS, place external css files here
│   │       └── /sass/                         #SASS
│   │           └── /index.scss                #Main SASS file, define your global styling here.
│   ├── favicon.ico                            #Application icon to be displayed in bookmarks
│   └── tpl-index.html                         #Template for html-webpack-plugin that will be transpiled into index.html in /dist
│── .babelrc                                   #Babel config with presets and plugins
│── .gitignore                                 #List of files to ignore by git
│── .yo-rc.json                                #Defines the root of the project, allows your user to run commands in subdirectories.
│── package.json                               #The list of project dependencies and NPM scripts
└── webpack.config.js                          #Bundling and optimization settings for Webpack
```


Getting Started
-------------

Prerequisites: Node, Yeoman and Webpack. To install run:

    npm install -g yo webpack

Next, install this generator:

    Clone this repo and cd into it, then run:
      npm link


Creating a project:

    mkdir MyAwesomeApp && cd $_
    yo at-angular


Running a generator:

    yo at-angular:page my-page                                                    # Generates a page
    yo at-angular:service my-service                                              # Generates a service
    yo at-angular:directive my-directive                                          # Generates a shared directive
    yo at-angular:directive my-component/my-directive                             # Generates a directive in a component
    yo at-angular:component my-component                                          # Generates a component
    yo at-angular:component my-component/my-nested-component                      # Generates a nested component
    yo at-angular:component my-component/my-nested-component/my-nested2-component # Generates a double nested component


##### `npm start` or `npm run dev` - to start development server on http://localhost:8080.
##### `npm run build` - To make production-ready build run  after few moments you will see build id `dist` folder.

### Known bugs:
  > * **Problem**: Webpack2 unable to import function with only export default value.

  >   **Workaround**: Use ```import * as variable from "package" ``` instead of ```import variable from "package" ```



###### Inspired by Angular generator-cg-angular and generator-angular-webpack-es6

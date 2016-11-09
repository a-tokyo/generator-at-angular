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

├── /config/                              # Build config
│   └── /webpack/                         # Webpack config files
│       ├── /environments/                # Webpack env dependent configs
│       └── global.js                     # Global webpack settings for all envs
├── /dist/                                # The folder for compiled output
├── /node_modules/                        # 3rd-party libraries and utilities
├── /src/                                 # Source folder
│   ├── /app/                             # Application code
│   │   ├── /components/                  # Shared UI components
│   │   │   └── /footer/                  # Footer shared component. Place footer's styles, directives, templates here
│   │   ├── /core/                        # Shared angular services/directives
│   │   │   ├── /directives/              # Shared directives
│   │   │   ├── /services/                # Shared services
│   │   │   └── /core.module.js           # Import of all core components should be here
│   │   ├── /pages/                       # All pages-dependent content should place here
│   │   │   ├── /main/                    # Main page
│   │   │   │   ├── /main.controller.js   # Main page Controller
│   │   │   │   ├── /main.html            # Main page template
│   │   │   │   ├── /main.module.js       # Main page module
│   │   │   │   └── /main.route.js        # Main page routes
│   │   │   └── /.../                     # Other pages...
│   │   ├── /index.bootstrap.js           # Entry point. Import internal and external modules and bootstrap (RUN) angular application
│   │   ├── /index.components.js          # Define all your custom components here
│   │   ├── /index.config.js              # Function that will be triggered in Angular's "config" phase
│   │   ├── /index.module.js              # Main application's module
│   │   ├── /index.routes.js              # Describe only "otherwise" and async routes here
│   │   ├── /index.run.js                 # Function that will be triggered in Angular's "run" phase
│   │   ├── /index.vendor.js              # Import all vendors and 3rd party plugins here
│   ├── /assets/                          # Static content
│   │   ├── /images/                      # Images
│   │   ├── /js/                          # Extra libs folder
│   │   └── /styles/                      # Styles folder
│   │       ├── /css/                     # CSS
│   │       └── /sass/                    # SASS
│   ├── favicon.ico                       # Application icon to be displayed in bookmarks
│   └── tpl-index.html                    # Template for html-webpack-plugin that will be transpiled into index.html in /dist
│── .babelrc                              # Babel config with presets and plugins
│── .gitignore                            # List of files to ignore by git
│── package.json                          # The list of project dependencies and NPM scripts
└── webpack.config.js                     # Bundling and optimization settings for Webpack
```


Getting Started
-------------

Prerequisites: Node, Yeoman and Webpack. To install run:

    npm install -g yo webpack

Next, install this generator:

    <!-- npm install -g generator-at-angular -->
    Clone this repo and cd into it, then run:
      npm link


To create a project:

    mkdir MyAwesomeApp && cd $_
    yo at-angular


Running a generator:

    yo at-angular:component my-component
    yo at-angular:directive my-directive
    yo at-angular:page my-page
    yo at-angular:service my-service


##### `npm start` or `npm run dev` - to start development server on http://localhost:8080.
##### `npm run build` - To make production-ready build run  after few moments you will see build id `dist` folder.

### Known bugs:
  > * **Problem**: Webpack2 unable to import function with only export default value.

  >   **Workaround**: Use ```import * as variable from "package" ``` instead of ```import variable from "package" ```


###### Inspired by Angular generator-cg-angular and generator-angular-webpack-es6

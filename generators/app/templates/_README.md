# <%- props.appName %>


## Getting Started

##### `npm start` or `npm run dev` - To start development server on [localhost:8080](http://localhost:8080).

##### `npm run build` - To make production-ready build run  after few moments you will see build id `dist` folder.

##### `npm test` - To run all tests once, should be used for the CI.

##### `npm run tests` - To run tests in `watch` mode.

##### `npm run docs` - To open the auto-generated docs in your default browser.


## Contribution guide

This application uses [generator-at-angular](https://a-tokyo.github.io/generator-at-angular) to manage the project structure.

First install the generator:

    npm install -g generator-at-angular

Run a sub-generator:

    yo at-angular:page my-page                                   # Generates a page (partial)
    yo at-angular:service my-service                             # Generates a service
    yo at-angular:service my-component/my-service                # Generates a service in a component
    yo at-angular:directive my-directive                         # Generates a shared directive
    yo at-angular:directive my-component/my-directive            # Generates a directive in a component
    yo at-angular:component my-component                         # Generates a component
    yo at-angular:component my-component/my-nested-component     # Generates a nested component
    yo at-angular:component my-component/my-nested-component/... # Generates a multiple nested component


### Tips:
  - To keep the SASS/SCSS clean and modular use [BEM Syntax](http://css-tricks.com/bem-101/)
  - To keep the git repository's branch model modular and scalable use [git flow](http://jeffkreeftmeijer.com/2010/why-arent-you-using-git-flow/)
<% if (options.dreidev) { %>

#### Organization: [DREIDEV](http://dreidev.com)
<% } %>

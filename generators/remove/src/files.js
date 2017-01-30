'use strict';
const _ = require('lodash');
const utils = require('../../utils.js');
const jsonfile = require('jsonfile');
const jsonQuery = require('json-query');

module.exports = function(AngularATGenerator) {

    AngularATGenerator.prototype.copyCopmFiles = function copyFiles() {
      const pathAsArray = this.props.itemName.split('/');
      switch (this.props.type) {
        case 'component':
          if (pathAsArray.length === 1){
            let componentName = pathAsArray[pathAsArray.length - 1];
            try {
              const indexModulesRemoveLine = "require('./components/" + componentName + "/" + componentName + ".module').name,";
              utils.removeFromFile('index.components.js', indexModulesRemoveLine, this.destinationRoot() + '/src/app')
              utils.deleteDirRecursive(this.destinationRoot() + '/src/app/components/' + componentName);
            } catch (err) {
              console.log(err);
            }
          }else{
            // component is nested
          }
          break;
        case 'directive':

          break;
        case 'page':

          break;
        case 'service':

          break;
      }
    };
};

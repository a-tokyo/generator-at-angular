const _ = require("lodash");

module.exports = function (AngularATGenerator) {

    // Install optional dependencies
    AngularATGenerator.prototype.installDependencies = function installDependencies() {

        var deps = [
            "angular",
            "angular-ui-router"
        ];

        if (this.props.bootstrapSass) {
            deps.push("bootstrap-sass");
        }

        if (this.props.lodash) {
            deps.push("lodash");
        }

        if (this.props.moment) {
            deps.push("moment");
        }

        if (this.props.styles.material) {
            deps.push("material-icons");
        }

        deps = _.concat(deps, this.importList);

        this.npmInstall(deps, {'save': true});
    };

    // Install dependencies from package.json
    AngularATGenerator.prototype.install = function install() {
        this.npmInstall();
    };

};

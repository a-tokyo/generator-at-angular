'use strict';

export default function (app) {
    app
        .factory('<%= serviceNameCamel %>', <%= serviceNameCamel %>Factory);

        function <%= serviceNameCamel %>Factory () {
            return {

            };
        }
}

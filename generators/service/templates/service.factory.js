'use strict';

export default function (app) {
    app
        .factory('<%= serviceNameCamel %>', <%= serviceNameCamel %>Factory);

        function s<%= serviceNameCamel %>Factory () {
            return {

            };
        }
}

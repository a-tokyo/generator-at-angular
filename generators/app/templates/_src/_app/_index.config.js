function config($logProvider<%if (options.dreidev) {%>, $authProvider<%}%>) {
	'ngInject';

<%if (options.dreidev) {%>
  // authentication configuretion
  $authProvider.signupUrl = '/api/rest-auth/registration/';
  $authProvider.loginUrl = '/api/auth/login';
<%}%>

  // Enable log
  $logProvider.debugEnabled(true);

}

export default config;

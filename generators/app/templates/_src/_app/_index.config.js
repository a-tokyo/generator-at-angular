function config($logProvider<%if (options.dreidev) {%>, $authProvider, localStorageServiceProvider, $translateProvider, $mdThemingProvider<%}%>) {
	'ngInject';

  // Enable log
  $logProvider.debugEnabled(true);
}

export default config;

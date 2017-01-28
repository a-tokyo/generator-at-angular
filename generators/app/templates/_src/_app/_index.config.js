<%if (options.dreidev) {%>import * as translation from '../assets/js/translate.js';
<%}%>function config($logProvider<%if (options.dreidev) {%>, $authProvider, localStorageServiceProvider, $translateProvider, $mdThemingProvider<%}%>) {
	'ngInject';

<%if (options.dreidev) {%>
  // local storage configuration
  // localStorageServiceProvider.setPrefix('');
  // fallback in case localStorage was not supported
  // localStorageServiceProvider.setStorageCookie(300, '/', true);

  // translation configuration
  $translateProvider.translations('en', translation.en);
  $translateProvider.preferredLanguage('en');
  $translateProvider.useSanitizeValueStrategy('sanitizeParameters');

  // authentication configuretion
  $authProvider.signupUrl = '/api/rest-auth/registration/';
  $authProvider.loginUrl = '/api/auth/login';

  // anglar material theme

  // Extend a palette with primary colors.
  const primaryPalette = $mdThemingProvider.extendPalette('indigo', {
    // '400': '',
    // '500': '',
    // '600': '',
    // '700': '',
    // '800': '',
    // '900': ''
  });
  // Extend a palette with accent colors.
  const accentPalette = $mdThemingProvider.extendPalette('pink', {
    // 'A100': '',
    // 'A200': '',
    // 'A300': '',
    // 'A400': ''
  });

  // Register the new color palette map
  $mdThemingProvider.definePalette('<%= props.appName %>Primary', primaryPalette);
  $mdThemingProvider.definePalette('<%= props.appName %>Accent', accentPalette);

  // Use that taskArabia themes for the primary and accent intentions
  $mdThemingProvider.theme('default')
                    .primaryPalette('<%= props.appName %>Primary')
                    .accentPalette('<%= props.appName %>Accent')
                    .warnPalette('red');
<%}%>

  // Enable log
  $logProvider.debugEnabled(true);

}

export default config;

$(document).ready((function ($) {
    'use strict';

    var currentRoute = window.router.getCurrentLocation(),
      packages = {
          'dashboard/membership/silver': {
              'template': '/dashboard/membership/silver/silver.html',
          },
          'dashboard/membership/platinum': {
              'template': '/dashboard/membership/platinum/platinum.html',
          },
          'dashboard/membership/gold': {
              'template': '/dashboard/membership/gold/gold.html',
          },
      };

    $('#package').load(
      packages[currentRoute.route.path].template,
      function () {
          $('#preloader').fadeOut(window.config.preloaderDuration);
      }
    );

})(jQuery));
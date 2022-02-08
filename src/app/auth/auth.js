$(document).ready((function ($) {
    'use strict';

    $('.signup-button').click(function () {
        var $form = $('.auth-form'),
          data = window.getFormData($form);
        $.ajax({
            type: 'POST',
            url: window.config.api + 'api/signup/',
            data: JSON.stringify(data),
            beforeSend: window.removeFieldErrors,
            success: function () {
                $('.alert-success').fadeIn(function () {
                    $(this).fadeOut(14000);
                });
                $form.find('input').each(function () {
                    $(this).val('');
                    $(this).prop('checked', false);
                });
            },
            error: window.showFieldErrors,
        });
        return false;
    });

    $('.signin-button').click(function () {
        var $form = $('.auth-form'),
          data = window.getFormData($form);
        $.ajax({
            type: 'POST',
            url: window.config.api + 'api/signin/',
            data: JSON.stringify(data),
            xhrFields: {withCredentials: true},
            beforeSend: window.removeFieldErrors,
            success: function () {
                window.router.navigate('dashboard');
            },
            error: window.showFieldErrors,
        });
        return false;
    });
    
    $('#preloader').fadeOut(window.config.preloaderDuration);

})(jQuery));
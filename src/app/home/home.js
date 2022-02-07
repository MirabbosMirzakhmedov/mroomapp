$(document).ready((function ($) {
    'use strict';

    $('.appointment-button').click(function () {
        var $form = $('.appointment-form'),
          data = window.getFormData($form);
        $.ajax({
            type: 'POST',
            url: window.config.api + 'api/appointment/',
            data: data,
            beforeSend: window.removeFieldErrors,
            success: function () {
                $('.alert-success').fadeIn(function () {
                    $(this).fadeOut(14000);
                });
                $form.find('input').each(function () {
                    $(this).val('');
                    $('textarea').val('');
                    $('select').val('');
                });
            },
            error: window.showFieldErrors,
        });
        return false;
    });

    if (window.router.current[0].hashString === 'appointment') {
        $('html, body').animate({
           scrollTop: $('#appointment').offset().top
        }, 500);
    }

    $.ajax({
        type: 'GET',
        url: window.config.api + 'api/barber/',
        success: function (res) {
            $.each(res, function (index, barber) {
                $('#barber_form').append(
                  '<option value="' + barber.uid + '">' + barber.name + '</option>'
                );
            });
        },
    });

    $('#preloader').fadeOut(window.config.preloaderDuration);

})(jQuery));
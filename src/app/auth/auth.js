$(document).ready((function ($) {
    'use strict';

    function getFormData($form) {
        var data = {};
        $.each($form.serializeArray(), function (i, field) {
            if (field.name !== 'terms') {
                data[field.name] = field.value;
            } else {
                data[field.name] = true;
            }
        });
        $form.find(
          'input[type="checkbox"]:not(:checked)'
        ).each(function () {
            if ($.inArray(this.name, data) === -1) {
                data[this.name] = $(this).prop('checked');
            }
        });
        return data;
    }

    function removeFieldErrors() {
        $('.auth-form, .appointment-form')
          .find('input, select').each(function () {
            $(this).removeClass('is-invalid');
        });
    }

    function showFieldErrors(res) {
        $.each(res.responseJSON, function (fieldID, errorMessage) {
            var $input = $('#' + fieldID),
              $feedback = $input.parent().find('.invalid-feedback');
            $feedback.text(errorMessage);
            $input.addClass('is-invalid');
            if (fieldID === 'detail') {
                $('.auth-form, .appointment-form').find('input').each(function () {
                    $(this).val('');
                });

                var $alert = $('#header .alert-danger'),
                  $alertText = $alert.find('.text');

                $alertText.text(errorMessage);
                $alert.fadeIn(function () {
                    $(this).fadeOut(14000);
                });
            }
        });
    }

    $('.signup-button').click(function () {
        var $form = $('.auth-form'),
          data = getFormData($form);
        $.ajax({
            type: 'POST',
            url: window.config.api + 'api/signup/',
            data: JSON.stringify(data),
            beforeSend: removeFieldErrors,
            success: function () {
                $('.alert-success').fadeIn(function () {
                    $(this).fadeOut(14000);
                });
                $form.find('input').each(function () {
                    $(this).val('');
                    $(this).prop('checked', false);
                });
            },
            error: showFieldErrors,
        });
        return false;
    });

    $('.signin-button').click(function () {
        var $form = $('.auth-form'),
          data = getFormData($form);
        $.ajax({
            type: 'POST',
            url: window.config.api + 'api/signin/',
            data: JSON.stringify(data),
            xhrFields: {withCredentials: true},
            beforeSend: removeFieldErrors,
            success: function () {
                window.router.navigate('dashboard');
            },
            error: showFieldErrors,
        });
        return false;
    });

    $('.alert .close').click(function () {
        var $alert = $(this).parent();
        $alert.fadeOut();
        $alert.dequeue();
    });

    $(window).scroll(function () {
        var scrolled = $(this).scrollTop() > 100;

        $('#header').toggleClass('header-scrolled', scrolled);
        $('#topbar').toggleClass('topbar-scrolled', scrolled);
    });

    $('#preloader').fadeOut(window.config.preloaderDuration);

})(jQuery));
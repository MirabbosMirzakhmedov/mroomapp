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

    $('.appointment-button').click(function () {
        var $form = $('.appointment-form'),
          data = getFormData($form);
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
    $('#preloader').fadeOut(window.config.preloaderDuration);

})(jQuery));
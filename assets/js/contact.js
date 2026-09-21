// Callbacks: Defined at top level, not inside ready. Turnstile's script is
// deferred & renders before ready fires, so these must already exist by then.

window.verifyTurnstileCallback = function (response) {
    $('input[data-turnstile]').val(response).trigger('change');
}

window.expiredTurnstileCallback = function () {
    $('input[data-turnstile]').val("").trigger('change');
}

$(function () {

    $('#contact-form').validator();

    $('#contact-form').on('submit', function (e) {
        if (!e.isDefaultPrevented()) {
            // Relative: Resolves to same place live, and works when served locally
            var url = "assets/php/contact.php";

            // showAlert: Drop the result into the form's live region, announced either way
            function showAlert(type, messageText) {
                var alertBox = '<div class="alert alert-' + type + '">' +
                    '<button type="button" class="close" aria-label="Dismiss message">' +
                    '<span aria-hidden="true">&times;</span></button>' +
                    '<span class="alert-text">' + messageText + '</span></div>';

                var $messages = $('#contact-form').find('.messages').html(alertBox);

                $messages.find('.close').on('click', function () {
                    $messages.empty();
                });
            }

            $.ajax({
                type: "POST",
                url: url,
                data: $(this).serialize(),
                success: function (data) {
                    if (data.type && data.message) {
                        showAlert(data.type, data.message);
                        $('#contact-form')[0].reset();
                        // Guarded: Turnstile's script may be blocked, form still resets
                        if (window.turnstile) {
                            window.turnstile.reset();
                        }
                    } else {
                        showAlert('danger', '&#9760; Something went wrong sending your message. <br> Please email mfine@fineonline.com instead.');
                    }
                },
                error: function () {
                    showAlert('danger', '&#9760; Your message could not be sent. <br> Please email mfine@fineonline.com or call +1 (800) 910-3463.');
                }
            });
            return false;
        }
    })
});

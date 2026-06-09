(function () {
    'use strict';

    var form = document.getElementById('heroForm');
    var successEl = document.getElementById('heroFormOk');

    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        clearErrors();

        if (validate()) {
            disableForm();
            successEl.classList.add('is-visible');
        }
    });

    function validate() {
        var ok = true;

        form.querySelectorAll('input[required]:not([type="checkbox"])').forEach(function (input) {
            if (!input.value.trim()) {
                input.classList.add('is-error');
                ok = false;
            } else if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())) {
                input.classList.add('is-error');
                ok = false;
            }
        });

        form.querySelectorAll('input[type="checkbox"][required]').forEach(function (cb) {
            if (!cb.checked) {
                cb.classList.add('is-error');
                ok = false;
            }
        });

        return ok;
    }

    function clearErrors() {
        form.querySelectorAll('.is-error').forEach(function (el) {
            el.classList.remove('is-error');
        });
    }

    function disableForm() {
        form.querySelectorAll('input, button').forEach(function (el) {
            el.disabled = true;
        });
    }

    form.addEventListener('input', function (e) {
        if (e.target.classList.contains('is-error')) {
            e.target.classList.remove('is-error');
        }
    });

    form.addEventListener('change', function (e) {
        if (e.target.type === 'checkbox' && e.target.classList.contains('is-error')) {
            e.target.classList.remove('is-error');
        }
    });
})();

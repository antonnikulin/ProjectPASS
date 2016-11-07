(function () {
    var $username = $('input[name=username]');
    var $password = $('input[name=password]');
    var $repeat = $('input[name=password-repeat]');
    var $submit = $('button[type=submit]');

    var isRegistration = $repeat.length > 0;
    var message$ = $('#message');

    $submit.click(function () {
        if (isRegistration) {
            if (isEmptyInputs($username, $password, $repeat)) return false;
            if (!isPassEqual()) return false;
            registration($username, $password, $repeat);
        } else {
            if (isEmptyInputs($username, $password)) return false;
            authorization($username, $password);
        }

        console.log('Должны вернуть false');
        return false;
    });

    function isEmptyInputs() {
        var isEmpty = false;

        for (var i = 0; i < arguments.length; i++) {
            if (arguments[i].val() == '') {
                markInput(arguments[i], 'empty');
                isEmpty = true;
            }
        }

        return isEmpty;
    }

    function markInput($input, status) {
        $input.addClass(status);
        var value = $input.val();
        var placeholder = $input.attr('placeholder');

        if (status == 'empty') {
            $input.attr('placeholder', 'Введите данные');
        } else if (status == 'eq') {
            $input.attr('placeholder', 'Пароли не совпадают');
        } else {
            $input.attr('placeholder', 'Некорректные данные');
        }

        $input.val('');

        setTimeout(function () {
            $input.removeClass(status);
            $input.attr('placeholder', placeholder);
            $input.val(value);
        }, 3000);
    }

    function isPassEqual() {
        if ($password.val() != $repeat.val()) {
            markInput($password, 'eq');
            markInput($repeat, 'eq');
            return false;
        }

        return true;
    }

    function registration($username, $password) {
        $.ajax({
            url: 'ajax/registration',
            type: 'POST',
            data: {
                username: $username.val(),
                password: $password.val()
            },
            success: function () {
                document.location.href = "/";
            }
        });
    }

    function authorization($username, $password) {
        $.ajax({
            url: 'ajax/authorization',
            type: 'POST',
            data: {
                username: $username.val(),
                password: $password.val()
            },
            success: function () {
                document.location.href = "/";
            },
            error: function () {
                markInput($username, 'denied');
                markInput($password, 'denied');
            }
        });
    }
})();

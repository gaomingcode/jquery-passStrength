(function ($, window, document, undefined) {

    var pluginName = "passStrength",
            defaults = {
                passwordToggle: true
            };

    function Plugin(element, options) {
        this.element = element;
        this.$elem = $(this.element);
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        _this = this;
        this.init();
    }

    Plugin.prototype = {
        init: function () {
            var _this = this;

            $(this.element).bind("keyup keydown", function () {
                value = $(this).val();
                _this.check(value);
            });

            if (this.options.passwordToggle) {
                _this.togglePassword();
            }
        },

        check: function (value) {
            var _this = this;
            var secureTotal = 0, securePercentage = 0,
                    chars = 0,
                    capitals = 0,
                    numbers = 0,
                    special = 0,
                    whitespace = new RegExp("\\s"),
                    upperCase = new RegExp("[A-Z]"),
                    numbers = new RegExp("[0-9]"),
                    specialchars = new RegExp("([!,%,&,@,#,$,^,*,?,_,~])");
            if (value.match(whitespace)) {
                securePercentage = -1;
            } else {
                if (value.length > 0) {
                    chars = 1;
                } else {
                    chars = 0;
                }
                if (value.match(upperCase)) {
                    capitals = 1;
                } else {
                    capitals = 0;
                }
                if (value.match(numbers)) {
                    numbers = 1;
                } else {
                    numbers = 0;
                }
                if (value.match(specialchars)) {
                    special = 1;
                } else {
                    special = 0;
                }

                secureTotal = chars + capitals + numbers + special;
                securePercentage = (secureTotal / 4) * 100;
            }

            _this.addStatus(securePercentage);

        },

        addStatus: function (percentage) {
            var _this = this;
            var status = "", statusClass = "", text = "", bar = "", message = "";
            bar = $(_this.element).parent(".input-group").siblings(".password-strength-bar").children('.progress-bar');
            message = $(_this.element).parent(".input-group").siblings(".password-strength-message");
            bar.removeClass('bg-success bg-info bg-warning bg-danger');
            message.show();
            if (percentage < 0 || percentage >= 25) {
                status = "weak";
                if (percentage < 0) {
                    _this.barMessageClear();
                    $(_this.element).parent(".input-group").siblings(".password-strength-bar").children('#text-nowhitespace').removeClass('hide').addClass('show text-dark');
                } else if (percentage >= 25) {
                    _this.barMessageClear();
                    $(_this.element).parent(".input-group").siblings(".password-strength-bar").children('#text-weak').removeClass('hide').addClass('show text-dark');
                }
                statusClass = "bg-danger";
            }
            if (percentage >= 50) {
                status = "medium";
                _this.barMessageClear();
                $(_this.element).parent(".input-group").siblings(".password-strength-bar").children('#text-medium').removeClass('hide').addClass('show text-dark');
                statusClass = "bg-warning";
            }
            if (percentage >= 75) {
                status = "strong";
                _this.barMessageClear();
                $(_this.element).parent(".input-group").siblings(".password-strength-bar").children('#text-strong').removeClass('hide').addClass('show');
                statusClass = "bg-info";
            }
            if (percentage >= 100) {
                status = "very-strong";
                _this.barMessageClear();
                $(_this.element).parent(".input-group").siblings(".password-strength-bar").children('#text-very-strong').removeClass('hide').addClass('show');
                statusClass = "bg-success";
                message.hide();
            }
            if (percentage < 0) {
                message.find('#error').removeClass('hide').addClass('show');
            } else {
                message.find('#error').removeClass('show').addClass('hide');
            }
            bar.attr('aria-valuenow', percentage);
            bar.css('width', percentage + '%');
            bar.addClass(statusClass);
            bar.addClass(status);
            bar.text(text);

        },

        barMessageClear: function () {
            var _this = this;
            $(_this.element).parent(".input-group").siblings(".password-strength-bar").children('#text-nowhitespace').removeClass('show text-dark').addClass('hide');
            $(_this.element).parent(".input-group").siblings(".password-strength-bar").children('#text-weak').removeClass('show text-dark').addClass('hide');
            $(_this.element).parent(".input-group").siblings(".password-strength-bar").children('#text-medium').removeClass('show text-dark').addClass('hide');
            $(_this.element).parent(".input-group").siblings(".password-strength-bar").children('#text-strong').removeClass('show').addClass('hide');
            $(_this.element).parent(".input-group").siblings(".password-strength-bar").children('#text-very-strong').removeClass('show').addClass('hide');
        },

        togglePassword: function () {
            var _this = this;
            var buttonShow = $(_this.element).siblings(".password-strength-icon");

            $(this.element).bind("keyup keydown", function () {
                value = $(this).val();
                _this.check(value);
            });

            buttonShow.on("click", function () {
                $(this).toggleClass("active");
                if ($(this).hasClass("active")) {
                    buttonShow.children('#hidden').removeClass('show').addClass('hide');
                    buttonShow.children('#visible').removeClass('hide').addClass('show');
                    $(_this.element).attr('type', 'text');
                } else {
                    buttonShow.children('#hidden').removeClass('hide').addClass('show');
                    buttonShow.children('#visible').removeClass('show').addClass('hide');
                    $(_this.element).attr('type', 'password');
                }
            });
        }
    };

    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options));
            }
        });
    };

})(jQuery, window, document);
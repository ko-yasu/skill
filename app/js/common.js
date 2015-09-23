
(function (window, $) {
    var dnss = {};
    dnss.conf = {};

    /**
     * 使用したスキルポイントを取得する
     * n次を引数で渡す
     */
    dnss.getSkillPointUse = function (aSkill) {
        var rs = 0;
        if (aSkill) {
            aSkill.find(dnss.conf.flatSlider).each(function () {
                rs += $(this).slider( "option", "value");
            });
        }
        return rs;
    }

    /**
     * 使用したスキルポイントと残りスキルポイントの設置
     * 設置するn次と合計を引数で渡す
     */
    dnss.setSkillPonint = function (aSkillPoint, aTotal = 0) {
        // 使用スキルポイントの合計
        if (!aSkillPoint) {
            $('.sp_use').text(aTotal);
            return;
        }

        // 使用できるスキルポイントの上限
        var limit = parseInt(aSkillPoint.children('.sp_limit').text(), 10);
        // 残りスキルポイント
        var remnant = limit - aTotal;

        aSkillPoint.children('.sp_remnant').text(remnant);
        aSkillPoint.children('.sp_use').text(aTotal);

        if (remnant < 0) {
            // 上限を越えている　文字を赤く太くする
            aSkillPoint.children('.sp_use').addClass('alert-color bolld');
            aSkillPoint.children('.sp_remnant').addClass('alert-color bolld');
        } else {
            // 解除
            aSkillPoint.children('.sp_use').removeClass('alert-color bolld');
            aSkillPoint.children('.sp_remnant').removeClass('alert-color bolld');
        }
    }


    /**
     * フラットスライダーのオプション
     */
    dnss.flatSlider = function () {
        $(dnss.conf.flatSlider).slider({
            create: function(event, ui) {
                $(this).slider('option', 'max', $(this).data('max'));
            },
            min: 0,
            value: 0,
            range: "min",
            change: function( event, ui ) {
                console.log(ui.value);
                console.log(event);
                var parents =$(this).parents();
                // 1次スキルポイントの計算
                var first_skill_total = dnss.getSkillPointUse(dnss.conf.firstSkill);
                // 2次スキルポイントの計算
                var secibd_skill_total = dnss.getSkillPointUse(dnss.conf.secondSkill);
                // 3次スキルポイントの計算
                var third_skill_total = dnss.getSkillPointUse(dnss.conf.thirdSkill);

                // スキルレベルが上がったn次のスキルポイント情報の更新
                if ( parents.hasClass("first_skill") ) {
                    dnss.setSkillPonint(dnss.conf.firstSkillPoint, first_skill_total);
                } else
                if ( parents.hasClass("second_skill") ) {
                    dnss.setSkillPonint(dnss.conf.secondSkillPoint, secibd_skill_total);
                } else
                if ( parents.hasClass("third_skill") ) {
                    dnss.setSkillPonint(dnss.conf.thirdSkillPoint, third_skill_total);
                }

                // 合計の更新
                var sum = first_skill_total + secibd_skill_total + third_skill_total;
                dnss.setSkillPonint(dnss.conf.totalSkillPoint, sum);
            }
        }).slider("pips", {
            first: "pip",
            last: "pip"
        }).slider("float");
    }

    /**
     * ＋ボタンでフラットスライダーの値をふやす
     */
    dnss.getSliderValuePlus = function (aEvent) {
        var flat_sliderl = $(this.parentElement.previousElementSibling.firstElementChild);
        var slider_current_value = flat_sliderl.slider( "option", "value" );
        flat_sliderl.slider( "value", slider_current_value + 1 );
    }

    /**
     * －ボタンでフラットスライダーの値をへらす
     */
    dnss.getSliderValueMinus = function (aEvent) {
        var flat_sliderl = $(this.parentElement.previousElementSibling.firstElementChild);
        var slider_current_value = flat_sliderl.slider( "option", "value" );
        flat_sliderl.slider( "value", slider_current_value - 1 );
    }

    /**
     * Мボタンでフラットスライダーの値をMAXにする
     */
    dnss.getSliderValueMax = function (aEvent) {
        var flat_sliderl = $(this.parentElement.previousElementSibling.firstElementChild);
        var slider_current_value = flat_sliderl.slider( "option", "max" );
        flat_sliderl.slider( "value", slider_current_value + 1 );
    }

    dnss.initialize = function () {
        // self = $.extend(this);
        // 固定になるもの
        /* フラットスライダーのボタン類 */
        dnss.conf.plusBtn                 = $('.sp-plus');
        dnss.conf.MinusBtn                = $('.sp-minus');
        dnss.conf.MaxBtn                  = $('.sp-max');
        /* job-block　ｎ次職 */
        dnss.conf.firstSkill              = $('.first_skill');
        dnss.conf.secondSkill             = $('.second_skill');
        dnss.conf.thirdSkill              = $('.third_skill');
        /* skill_point_info ヘッダー部のスキル情報 */
        dnss.conf.firstSkillPoint         = $('.first_skill_point');
        dnss.conf.secondSkillPoint        = $('.second_skill_point');
        dnss.conf.thirdSkillPoint         = $('.third_skill_point');
        dnss.conf.totalSkillPoint         = $('.total_skill_point');
        // 可変するもの
        dnss.conf.flatSlider   = '.flat-slider';


        dnss.flatSlider();
        // dnss.setSkillPonint();
        var bind = function () {
            dnss.conf.plusBtn.click(dnss.getSliderValuePlus);
            dnss.conf.MinusBtn.click(dnss.getSliderValueMinus);
            dnss.conf.MaxBtn.click(dnss.getSliderValueMax);

            // test動作
            $('.job-nav').find('a').click( function () {
                $('body').attr('id', this.parentNode.className)
            });
        }
        bind();
    }

    window.aDnss = dnss;

    })(window, jQuery);

    $(function() {
    new aDnss.initialize();
    });
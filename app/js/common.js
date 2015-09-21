$(function() {

    $(".flat-slider").slider({
            create: function(event, ui) {
                $(this).slider('option', 'max', $(this).data('max'));
            },
            min: 0,
            value: 0,
            range: "min",
        })
        .slider("pips", {
            first: "pip",
            last: "pip"
        }) .slider("float");
});
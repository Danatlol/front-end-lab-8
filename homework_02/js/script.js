


$(window).load(function () {
    $('.flexslider').flexslider({
        animation: "fade"
    });

    var categoryUnit = $(".category-unit");
    var maxHeight = categoryUnit.eq(0).height();

    categoryUnit.each((ind, el) => { (maxHeight < el) ? (maxHeight = el) : 0; });
    categoryUnit.each((ind, el) => { $(el).css("height", maxHeight); });

    $(document).on('submit', '.form', function () {
        if ($('.form #name').val().length < 6) {
            alert('Name must contain at least 6 characters');
            return false;
        }
    });
});


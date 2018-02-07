$(document).ready(function () {

    // Mobile menu function
    $('#dl-menu').dlmenu({
        animationClasses: { classin: 'dl-animate-in-2', classout: 'dl-animate-out-2' }
    });

    // Show/hide help text function
    $('.help').popover('hide');

    // Recurring "saved" text
    function saved() {
        $('.recurring').fadeOut(2000).delay(11000).fadeIn(2000);
    }
    setInterval(saved, 15000);

    // http://stackoverflow.com/questions/11703093/how-to-dismiss-a-twitter-bootstrap-popover-by-clicking-outside
    $('body').on('click', function (e) {
        $('[data-toggle="popover"]').each(function () {
            //the 'is' for buttons that trigger popups
            //the 'has' for icons within a button that triggers a popup
            if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                $(this).popover('hide');
            }
        });
    });

    // Inline felt-validerings
    $('.validate-inline').focusout(function() {
        $('.validate-inline').addClass('has-error');
        $('.help-block').removeClass('hidden');
    });


    // Tabs navigation - mobile friendly select field
    $('.nav-tabs-select').on('change', function(e) {
      var id = $(this).val();
      // console.log('triggered SELECT: '+ id);
      $(this).siblings('.nav-tabs').find('a[href="'+id+'"]').tab('show');
    });
    $('.nav-tabs a').on('click', function(e) { // Stupid double binding because jquery...
      var id = $(this).attr('href');
      // console.log('triggered UL: '+ id);
      $(this).parentsUntil('.nav-tabs').parent().siblings('.nav-tabs-select').val(id);
    });




});

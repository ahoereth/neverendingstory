// Header controller

/****************************************************************************/
/* Header RENDERED */
/****************************************************************************/
Template.header.rendered = function() {
  var $document = $(document);
  var $header   = this.$('.header');
  var initialHeight, fontSize;

  /**
   * Initialize and (re-) calculate the height and font size values
   */
  var getValues = function() {
    $header.removeAttr('style').removeClass('fixed');
    initialHeight = $header.height();
    fontSize      = parseInt($header.css('font-size'), 10);
    doScroll();
  };

  /**
   * Calculate the header height/line-height or add the fixed class - what-
   * ever is appropriate right now.
   */
  var doScroll = function() {
    var newHeight = initialHeight - $document.scrollTop();
    if (newHeight > fontSize*1) {
      $header
        .removeClass('fixed')
        .css({
          height    : newHeight + 'px',
          lineHeight: newHeight + 'px'
        });
    } else {
      $header.removeAttr('style').addClass('fixed');
    }
  };

  getValues();
  $(window).on('resize', _.debounce(getValues, 50, false));
  $document.on('scroll', doScroll);
};

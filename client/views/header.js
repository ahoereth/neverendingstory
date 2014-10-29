// Header controller

/****************************************************************************/
/* Header RENDERED */
/****************************************************************************/
Template.header.rendered = function() {
  var $header       = this.$('.header');
  var initialHeight = $header[0].clientHeight;
  var $document     = $(document);

  $document.on('scroll', function(/*e*/) {
    var newHeight = initialHeight - $document.scrollTop();
    if (newHeight > 50) {
      $header
        .removeClass('fixed')
        .css({
          height    : newHeight + 'px',
          lineHeight: newHeight + 'px'
        });
    } else {
      $header.addClass('fixed');
    }
  });
};

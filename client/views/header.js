// Menu controller.

// Is the menu active currently?
var menuActive      = false;

// y-direction scroll offset.
var yOffset         = 0;

// The yOffset at which the menu was interactively activated.
var menuActivatedAt = 0;

// Are we currently smooth-scrolling up?
var scrolling       = false;

// Are we currently on top of the app / seeing the menu-bar?
var onTop           = true;


/**
 * Toggles the menu and scrolls to top or back to previous position if
 * the interactive parameter is true.
 *
 * @params {boolean} interactive
 */
var toggleMenu = function(interactive) {
  if (interactive) {
    if (! menuActive) {
      menuActivatedAt = yOffset;
      scrolling = true;
      $("html, body").animate({ scrollTop: 0 }, "slow", null, function() {
        scrolling = false;
      });
    } else {
      $("html, body").animate({ scrollTop: menuActivatedAt }, "slow");
    }
  }

  $('.app').toggleClass('menu-active');
  menuActive = ! menuActive;
};




/****************************************************************************/
/* Header RENDERED */
/****************************************************************************/
Template.header.events({
  'click .menu-trigger': function(e, tmpl) {
    toggleMenu(true);
  }
});




/****************************************************************************/
/* Header RENDERED */
/****************************************************************************/
Template.header.rendered = function() {
  var tmpl = this;

  /**
   * Hide menu when scrolling down and set the 'top' body class.
   *
   * TODO: Show the menu when "forcefuly" scrolling up.
   */
  $(document).on('scroll', function(e) {
    yOffset = $(window).scrollTop();

    // using "onTop" as cache to not go into the DOM on every scroll update
    if (! onTop && yOffset < 50) {
      onTop = true;
      $('.app').addClass('top');
    } else if (onTop && yOffset >= 50) {
      onTop = false;
      $('.app').removeClass('top');
    }

    if (menuActive && ! scrolling && yOffset > 50) {
      toggleMenu();
    }
  });
};

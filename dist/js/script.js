$(document).ready(function(){

  /*
  // Stick nav to top when it is passed it original position
  */
  var $navBar = $('.head-bottom-area');
  var $navOriginalTop = $navBar.offset().top;
  var $placeholder = $('#navPlaceholder');
  $placeholder.css('height', $navBar.css('height'));

  // detect whether the browser supports passive events to remove scroll jank
  var supportsPassive = false;
  try {
    var opts = Object.defineProperty({}, 'passive', {
      get: function() {
        supportsPassive = true;
      }
    });
    window.addEventListener("test", null, opts);
  } catch (e) {}

  var scrollHandler = function(ev) {
    var scrollPosition = ev.target.body.scrollTop;

    if(scrollPosition > $navOriginalTop){
      $navBar.addClass('sticky');
      $placeholder.css('display', 'block');
    } else if(scrollPosition < $navOriginalTop ) {
      $navBar.removeClass('sticky');
      $placeholder.css('display', 'none');
    }
  }

  // Use our detect's results. passive applied if supported, capture will be false either way.
  document.addEventListener('scroll', scrollHandler, supportsPassive ? { passive: true } : false);

});

const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true
});

scroll.on('scroll', func => {
  console.log(scroll.scroll.instance.scroll.y);

  var scroll_pos = 0;
  scroll_pos = scroll.scroll.instance.scroll.y;

  body_el = document.body;

  if(scroll_pos > 890) {
    body_el.classList.add( "scroll-down" );
  } else {
    body_el.classList.remove( "scroll-down" );
  }

});


$( document ).ready(function() {
  console.log('Ready!');

  $( ".header__icon" ).on('click', function() {
    $(".header__menu").toggleClass("header__menu--open");
    $(".icon-hamburger").toggleClass("icon-hamburger--open");
  });

  $(window).load(function(){
    $( ".preloader" ).fadeOut('slow');
  });

  /* Scroll Class */

  // var scroll_pos = 0;
  //
  // $(document).scroll(function() {
  //
  // 	scroll_pos = $(this).scrollTop();
  //
  // 	if(scroll_pos > 600) {
  // 		$("body").addClass( "scroll-down" );
  // 	} else {
  // 		$("body").removeClass( "scroll-down" );
  //   }
  //
  // });

});

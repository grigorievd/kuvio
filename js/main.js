$(function() {

	// scroll animations
	var $animation_elements = $('.animation-element');
	var $window = $(window);

	function check_if_in_view() {
	  var window_height = $window.height();
	  var window_top_position = $window.scrollTop();
	  var window_bottom_position = (window_top_position + window_height);
	 
	  $.each($animation_elements, function() {
	    var $element = $(this);
	    var element_height = $element.outerHeight();
	    var element_top_position = $element.offset().top;
	    var element_bottom_position = (element_top_position + element_height);
	 
	    //check to see if this current container is within viewport
	    if ((element_bottom_position >= window_top_position) &&
	        (element_top_position <= window_bottom_position)) {
	      		$element.addClass('in-view');
	      		setTimeout(function(){
	      			$element.addClass('ready');
	      		},1500)
				/*if ( !($element.hasClass('featured-post') || $element.hasClass('no-greensock')) ) {
					TweenMax.to($element, 0.6, {x: 0, y: 0, opacity: 1, ease: BezierCurve.easeOut, autoRound:false });
				}*/
	    } else {
	      // $element.removeClass('in-view');
	    }
	  });

	}

	check_if_in_view();

	$window.on('scroll resize', check_if_in_view);
	$window.trigger('scroll');

	if ( $(window).width() < 1024 ){
		$('.animation-element').addClass('in-view');
	}

	$(window).on('resize', function(event) {
		if ( $(window).width() < 1024 ){
			$('.animation-element').addClass('in-view');
		}
	});

	//portfolio slider
	$('.works_nav-list li').click(function(event) {
		$('.works-list li').removeClass('active');
		$('.works-list li').eq($(this).index()).addClass('active');
		$('.works-list').css({'transform': 'translateX(' + -($(this).index()*25) + '%)'});
		$('.active-line').css({'left': $(this).index()*25 + '%'});
	});	

	//scroll down to about section
	$('.to-anchor').click(function(event) {
		event.preventDefault();
		$('body,html').animate({scrollTop: $($(this).attr('href')).offset().top}, 1000);
	});

	//testimonials
	function updateTestimonials() {
		$('.testimonials-section .testimonials-list').css({'margin-left' : -($('.testimonials-list li').outerWidth(true)*$('.testimonials-list li.active').index()-(($(window).width() - $('.testimonials-list li').outerWidth(true)) / 2)) + 'px'});
	}
	$('.testimonials-list li').on('click resize', function(event) {
		$('.testimonials-list li').removeClass('active');
		$(this).addClass('active');
		updateTestimonials()
	});
	updateTestimonials()
});
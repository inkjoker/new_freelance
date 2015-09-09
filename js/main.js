$(document).ready(function(){

	var index = 0,
		keyUp = 38,
		keyDown = 40,
		animateComplite = true;

	var sliderFirst = $('.slider1').bxSlider({
		minSlides: 1,
		maxSlides: 1,
		slideMargin: 10,
		pager : false,
		controls : false
	});

	$('#tottalSlide').text(sliderFirst.getSlideCount());

	$('#slider-prev').click(function(){
		sliderFirst.goToPrevSlide();
		$('#currentSlide').text(sliderFirst.getCurrentSlide() + 1);
		return false;
	});

	$('#slider-next').click(function(){
		sliderFirst.goToNextSlide();
		$('#currentSlide').text(sliderFirst.getCurrentSlide() + 1);
		return false;
	});

	$('#slider-m-prev').click(function(){
		sliderFirst.goToPrevSlide();
		$('#currentSlide').text(sliderFirst.getCurrentSlide() + 1);
		return false;
	});

	$('#slider-m-next').click(function(){
		sliderFirst.goToNextSlide();
		$('#currentSlide').text(sliderFirst.getCurrentSlide() + 1);
		return false;
	});

	$('#menuTop').click(function(e){

		index = 0;
		$('#nextScreen').show().attr('href', '#h.opt0');

		scrollToAnchor(this, e);
	});

	$('.b-navigation_link').click(function(e){

		var href = $(this).attr('href');
		index = parseInt(href.match(/\d+$/)[0], 10);

		$('#nextScreen').show().attr('href', index);

		if (index == 4) {

			$('#nextScreen').hide();
		};

		scrollToAnchor(this, e);
	});

	$('#nextScreen').click(function(e){

		++index;
		$(this).attr('href', '#h.opt' + (index - 1));

		if ((index - 1) == 4) {

			$(this).hide();
		};

		scrollToAnchor(this, e);
	});

	$('#sendEmail').click(function(e){
		e.preventDefault();

		var user = {
				name : $('#user_name').val(),
				email : $('#user_email').val(),
				phone : $('#user_phone').val()
			},
			sendTo = $('#emailCompany').val().split(' ').join(''),
			subject = $('#subject').val(),
			text = $('#user_text').val();

		sendMail(sendTo, subject, text, user);
	});

	function scrollToAnchor(scope, e) {

		var name = $(scope).attr('href').replace(/\#/g, "");

		if (animateComplite) {

			animateComplite = false;


	        $('html, body').stop().animate({

	            scrollTop: $("a[name='" + name + "']").offset().top

	        }, 1000, function() {

				animateComplite = true;

			});
		}

        e.preventDefault();
	}

	function sendMail(sendTo, subject, text, user) {
		var link = 'mailto:' + sendTo 
		         + "&subject=" + encodeURIComponent(subject)
		         + "&body=" + encodeURIComponent('Комментарий от пользователя: ' + user.name + ', e-mail: ' + user.email + ', тел: ' + user.phone + '. ' + text)
		;
		window.open(link);
	}
});
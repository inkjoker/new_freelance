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
		controls : false,
		onSlideAfter: function($slideElement, oldIndex, newIndex){
			$('#currentSlide').text(sliderFirst.getCurrentSlide() + 1);
		}
	});

	function createMenu(el, overlay) {
		this.el = el;
		this.overlay = overlay;

		this.openWindow = function() {
			this.overlay.addClass('visible');
		};

		this.closeWindow = function() {
			this.overlay.removeClass('visible');

			if (this.el.hasClass("active")) {
				this.el.toggleClass("active")
			}
		};

		this.init = function() {
			var scope = this;

			scope.el.on('click', function(e) {
				e.preventDefault();
				e.stopPropagation();

				$(this).toggleClass('active');

				if ($(this).hasClass("active")) {

					scope.openWindow();

				} else {

					scope.closeWindow();

				};
			});

			scope.overlay.on('click', function(e) {

				if (!$(this).hasClass('disabled')) {


					scope.closeWindow();

				};
			});
		};
	};

	var menu = new createMenu($('#menuTop'), $('#navOverlay'));

	menu.init();

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

	$('#discriptionCtrl').click(function(){

		$('#discription').slideToggle();

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

	if (!!$('.b-page__main').length) {


		$('.b-navigation_link:not(.active)').click(function(e){

			var href = $(this).attr('href');


			index = parseInt(href.match(/\d+$/)[0], 10);

			$('#nextScreen').show().attr('href', index);

			if (index == 4) {

				$('#nextScreen').hide();
			};

			scrollToAnchor(this, e);

		});
	};

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

	$(document).on('scroll', function(event){

		checkScroll();

	});

    function checkScroll() {

        pos = $(document).scrollTop();


        if (pos == 0) {

        	$('#menuTop').removeClass('active');

        	$("#navOverlay").removeClass('visible');

        } else if (pos > 150) {

        	$('#menuWrapper').fadeIn();

        } else {

        	$('#menuWrapper').fadeOut();

        }
   	};

	function scrollToAnchor(scope, e) {

		var name = $(scope).attr('href').replace(/\#/g, "");

		if (animateComplite) {

			animateComplite = false;


	        $('html, body').stop().animate({

	            scrollTop: $("a[name='" + name + "']").offset().top

	        }, 1000, function() {

				animateComplite = true;
				menu.closeWindow();

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
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

	var browser = function() {
	    // Return cached result if avalible, else get result then cache it.
	    if (browser.prototype._cachedResult)
	        return browser.prototype._cachedResult;

	    var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
	    // Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
	    var isFirefox = typeof InstallTrigger !== 'undefined';// Firefox 1.0+
	    var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
	    // At least Safari 3+: "[object HTMLElementConstructor]"
	    var isChrome = !!window.chrome && !isOpera;// Chrome 1+
	    var isIE = /*@cc_on!@*/false || !!document.documentMode; // At least IE6

	    return (browser.prototype._cachedResult =
	        isOpera ? 'opera' :
	        isFirefox ? 'firefox' :
	        isSafari ? 'safari' :
	        isChrome ? 'chrome' :
	        isIE ? 'ie' :
	       	'');
	};


	$('body').addClass(browser())


	var menu = new createMenu($('#menuTop'), $('#navOverlay'));
	menu.init();

	if (!!$('.slider1').length) {

		$('#tottalSlide').text(sliderFirst.getSlideCount());

	};

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

		$(document).on('scroll', function(event){

			checkScroll();

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


	$('#formaSend').validate({

		rules: {
			// simple rule, converted to {required:true}
			name: "required",
			// compound rule
			email: {
				required: true,
				email: true
			},
			number: {
				required: true,
				number: true
			},
			comment: "required"
		},
		messages: {
			name: "Поле обязательное для заполнения.",
			email: "Поле не может быть пустым и должно быть в формате example@example.com",
			number: "Введите номер телефона",
			comment: "Введите текст сообщения"
		},

		submitHandler: function(form, e) {

			forma.submit();
			
		}
	});

	
	function createMenu(el, overlay) {
		this.el = el;
		this.overlay = overlay;

		this.openWindow = function() {
			this.overlay.fadeIn(200).addClass('visible');
		};

		this.closeWindow = function() {
			this.overlay.hide().removeClass('visible');

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
				e.stopPropagation();

				scope.closeWindow();
			});
		};
	};

    function checkScroll() {

        pos = $(document).scrollTop();

        if (pos == 0) {

        	$('#menuTop').removeClass('active');

        	$("#navOverlay").hide().removeClass('visible');

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
});
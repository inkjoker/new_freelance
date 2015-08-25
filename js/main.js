$(document).ready(function(){

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
});
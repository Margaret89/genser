$(document).ready(function () {

	// Маска для телефона
	$.mask.definitions['~'] = "[+-]";
	$(".js-phone").mask("+7 (999) 999-9999");

	// Вывод сообщения об успешной отправке в попапе
	$('.js-valid-form').each(function(){
		$(this).on('submit',function(e){
			$.fancybox.close();
			$.fancybox.open({
				src  : '#msg-success',
				type : 'inline',
				opts : {
					
				}
			});
			$(this)[0].reset();
			e.preventDefault();
		});
	});

	// Верхний слайдер
	if ($('.js-top-slider').length) {
		var $counterSlider = $('.js-top-slider-counter');
		var $topSlider = $('.js-top-slider');

		$topSlider.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
			var curSlide = (currentSlide ? currentSlide : 0) + 1;
			var slideCount = slick.slideCount;

			if (slideCount < 10) {
				slideCount = '0' + slideCount;
			}

			if (curSlide < 10) {
				curSlide = '0' + curSlide;
			}


			$counterSlider.html(curSlide + '<span>/' + slideCount) + '</span>';
		});

		$topSlider.slick({
			dots: false,
			infinite: true,
			slidesToShow: 1,
			appendArrows: $('.js-top-slider-arrow'),
		});
	}

	// Анимация цифр
	if ($('.js-about-num').length) {
		var topAbout = $('.js-about').offset().top;
		var topAboutScroll = topAbout - $('.js-about').outerHeight();
		var animAbout = false;

		if(($(this).scrollTop()>=topAboutScroll) && (animAbout == false)){
			animateAbout();
		}

		$(window).scroll(function(){
			if(($(this).scrollTop()>=topAboutScroll) && (animAbout == false)){
				animateAbout();
			}
		});

		function animateAbout() {
			var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(' ');

			$(".js-about-num").each(function() {
				var tcount = $(this).data("count");
				$(this).animateNumber({ number: tcount,
					easing: 'easeInQuad',
					numberStep: comma_separator_number_step},
					1000);
			});

			animAbout = true;
		}
	}

	

	// Вызов функции подгрузки изображений
	// loadBigImg();
	// loadBigBacground();

});

// Загрузка больших изображений
// function loadBigImg() {
// 	var $imgDefer = $('[data-src]');

// 	$imgDefer.each(function(indx, element){
// 		var urlImgBig = $(this).attr("data-src");
// 		$(this).attr("src", urlImgBig);
// 	});
// }

// function loadBigBacground() {
// 	var $imgDefer = $('[data-background]');

// 	$imgDefer.each(function(indx, element){
// 		var urlBackgroundBig = $(this).attr("data-background");
// 		$(this).css("background-image", "url("+ urlBackgroundBig +")");
// 	});
// }
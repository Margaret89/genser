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

	// Слайдер партнеров
	if ($('.js-partner').length) {
		$('.js-partner').slick({
			dots: false,
			infinite: true,
			slidesToShow: 7,
			slidesToScroll: 1,
		});
	}

	// Yandex карта
	if ($('#map').length) {
		// Иницилизация карты
		ymaps.ready(init);

		function init(){
			var myMap;

			myMap = new ymaps.Map("map", {
				center: [55.81, 37.60],
				zoom: 15,
				controls: []
			});

			var myPlacemark = new ymaps.Placemark([55.806013, 37.597379] , {},
				{ iconLayout: 'default#image',
				iconImageHref: 'img/mark-map.png',
				iconImageSize: [58, 82],
				iconImageOffset: [-29, -82] });

				myMap.geoObjects.add(myPlacemark);

			var myPlacemark2 = new ymaps.Placemark([55.690977, 37.478225] , {},
				{ iconLayout: 'default#image',
				iconImageHref: 'img/mark-map.png',
				iconImageSize: [58, 82],
				iconImageOffset: [-29, -82] });

				myMap.geoObjects.add(myPlacemark2);

			var myPlacemark3 = new ymaps.Placemark([55.613169, 37.514170] , {},
				{ iconLayout: 'default#image',
				iconImageHref: 'img/mark-map.png',
				iconImageSize: [58, 82],
				iconImageOffset: [-29, -82] });

				myMap.geoObjects.add(myPlacemark3);

			// Изменение центра карты при клике по табам
			$('.js-tabs-item').click(function(){
				var curCenterMapX = $(this).data('coordx');
				var curCenterMapY = $(this).data('coordy');
				var curTab = $(this).data('tab');

				$('.js-tabs-item').removeClass('active');
				$(this).addClass('active');

				$('.js-map-info-list').removeClass('active');
				$('.js-map-info-list[data-tab='+ curTab +']').addClass('active');

				myMap.panTo([curCenterMapX, curCenterMapY]);
			});
		}
	}

	// Стилизация скроллбара
	$(".js-scroll-content").each(function(indx){
		var widthContent = $(this).data('width');
		var heightContent = $(this).data('height');

		$(this).slimScroll({
			width: widthContent,
			height: heightContent,
			size: '1px',
			color: '#eb6441',
			alwaysVisible: true,
			railVisible: true,
			railColor: '#e4e4e4',
			railOpacity: 1,
			wheelStep: 5,
		});
	});


	// Слайдер о компании
	if ($('.js-about-slider').length) {
		$('.js-about-slider').slick({
			dots: true,
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			vertical: true,
		});
	}


// ул. Добролюбова, 2Б
// 55.806692, 37.596171
// ул. Лобачевского, 114, Москва
// 55.690977, 37.478225

// Новоясеневский пр-т, 6
// 55.613169, 37.514170
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
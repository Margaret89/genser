$(document).ready(function () {

	// Маска для телефона
	$.mask.definitions['~'] = "[+-]";
	$(".js-phone").mask("+7 (999) 999-9999");

	// Вывод сообщения об успешной отправке в попапе
	$('.js-valid-form').each(function(){
		if (!$(this).hasClass('js-step')) {
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
		}

		if ($('.js-select').length) {
			var $btnSubmit = $(this).find('input[type=submit]');

			$btnSubmit.click(function(){;
				var $curForm = $(this).parents('.js-valid-form');

				$curForm.find('.js-select').each(function(){
					var attr = $(this).attr('required');
					var selectVal = $(this).val();
					var $chosenField = $(this).next('.chosen-container').find('.chosen-single');

					if (typeof attr !== typeof undefined && attr !== false && selectVal=='') {
						$chosenField.addClass('errorfield');
					}else{
						$chosenField.removeClass('errorfield');
					}
				});
			});
		}
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
			arrows: true,
			infinite: true,
			slidesToShow: 1,
			appendArrows: $('.js-top-slider-arrow'),
			responsive: [
				{
					breakpoint: 768,
					settings: {
						arrows: false,
						dots: true,
					}
				},
			]
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
			responsive: [
				{
					breakpoint: 992,
					settings: {
						slidesToShow: 5,
					}
				},
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3,
						dots: true,
						arrows: false,
					}
				},
			]
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

	// ул. Добролюбова, 2Б
	// 55.806692, 37.596171
	// ул. Лобачевского, 114, Москва
	// 55.690977, 37.478225

	// Новоясеневский пр-т, 6
	// 55.613169, 37.514170

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
			responsive: [
				{
					breakpoint: 768,
					settings: {
						arrows: false,
						vertical: false,
					}
				},
			]
		});
	}

	// Раскрывающийся блок
	$(".js-unwrap-block").on('click','.js-unwrap-head',function(event){
		event.preventDefault();
		$(this).parent().toggleClass("opened");
		if($(this).parent().hasClass("opened")){
			$(this).parent().children(".js-unwrap-content").slideDown(400);
		}
		else{
			$(this).parent().children(".js-unwrap-content").slideUp(400);
		}
	});

	// Стилизация выпадающего списка
	$('.js-select').chosen({
		disable_search: true,
	});


	// Переход между шагами на странице "Запись"
	$(".js-step").submit(function (e) {
		e.preventDefault();
		$('.js-record-step').removeClass('active');
		var numStep = $(this).data('step') + 1;
		$('.js-record-step[data-step='+numStep+']').addClass('active');
	});

	// Добавление пункта "Еще" в меню
	var windowWidth = $(window).width();
	var arrWidthMenu = [];
	var moreMenu = false;

	$('.js-top-menu-item').each(function(index){
		var itemWidth = $(this).outerWidth();
		arrWidthMenu.push($(this).outerWidth());
	});

	addItemMenu();

	$('.js-top-menu').addClass('is-visible');

	$(window).resize(function(){
		windowWidth = $(window).width();
		addItemMenu();
	});

	function addItemMenu() {
		if (windowWidth >767) {
			var moreItemMenu = 100;
			var menuWidth = $('.js-top-menu').width() - moreItemMenu;
			var sumItemMenu = 0;

			for (var i = 0; i < arrWidthMenu.length; i++) {
				var $curItem = $('.js-top-menu-item[data-item='+ i +']');
				sumItemMenu = sumItemMenu + arrWidthMenu[i];

				// Добавляем пункт Еще и его подпункты
				if(sumItemMenu > menuWidth){
					$curItem.addClass('no-active');

					if (moreMenu == false) {
						$('.js-top-menu').append('<li class="top-menu__item js-menu-more">Еще<ul class="top-menu__more js-menu-more-sub"></ul></li>');
						moreMenu = true;
					}

					if (!$('.top-menu__more-item[data-item='+i+']').length) {
						$('.top-menu__more-item').attr('data-item')
						var $clone = $curItem.clone().appendTo(".js-menu-more-sub");
						$clone.removeClass('top-menu__item js-top-menu-item no-active');
						$clone.addClass('top-menu__more-item js-menu-more-item');
					}
				}else{
					$curItem.removeClass('no-active');
					$('.top-menu__more-item[data-item='+i+']').remove();
				}
			}

			// Удаляем пункт Еще, если все пункты вмещаются
			if ($('.js-menu-more-item').length == 0) {
				$('.js-menu-more').remove();
				moreMenu = false;
			}
		}else{
			if ($('.js-menu-more').length) {
				$('.js-top-menu-item').removeClass('no-active');
				$('.js-menu-more').remove();
				moreMenu = false;
			}
		}
	}
	
	// Создание мобильного меню
	var arrMobileMenu = [];
	$('.js-add-mm').each(function(){
		var indexItem = $(this).attr('data-order');
		arrMobileMenu[indexItem] = $(this);
	});

	for (var i = 0; i < arrMobileMenu.length; i++) {
		$(arrMobileMenu[i]).clone().appendTo('.js-mobile-menu-content');
	}
	
	// Открыть/Закрыть мобильное меню
	$('.js-open-menu').click(function(){
		$('.js-shadow').addClass('is-visible');
		$('.js-mobile-menu').addClass('open');
		$('.js-body').addClass('no-scroll');
	});

	$('.js-close-menu').click(function(){
		 closeCatMenu();
	});

	$('.js-shadow').click(function(){
		closeCatMenu();
	});

	function closeCatMenu() {
		$('.js-shadow').removeClass('is-visible');
		$('.js-mobile-menu').removeClass('open');
		$('.js-body').removeClass('no-scroll');
	}

	// Перемещение мобильного меню
	var indentMenu = 0;
	var levelMenu = 0;
	var titleMobileMenu = $('.js-menu-back').text();

	$('.js-top-menu-arr').on("click", function(event){
		event.preventDefault();
		var $curItem = $(this).parent('.js-top-menu-link');
		var curItemText = $(this).siblings('.js-top-menu-text').text();
		var $subMenu = $curItem.siblings('.js-top-menu-sub');
		indentMenu = indentMenu - 100;
		levelMenu++;

		$subMenu.addClass('active');
		$('.js-menu-back').addClass('active');
		$('.js-menu-back').text(curItemText);

		$('.js-mobile-menu-content').css('transform','translateX('+indentMenu+'%)');
	});

	$('.js-menu-back').on("click", function(event){
		if ($(this).hasClass('active')) {
			indentMenu = indentMenu + 100;
			levelMenu--;

			if (levelMenu == 0) {
				$('.js-menu-back').text(titleMobileMenu);
				$('.js-menu-back').removeClass('active');
			}

			$('.js-top-menu-sub').removeClass('active');

			$('.js-mobile-menu-content').css('transform','translateX('+indentMenu+'%)');
		}
	});
});
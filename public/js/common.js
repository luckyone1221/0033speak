"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var JSCCommon = {
	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".menu-mobile--js"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),
	modalCall: function modalCall() {
		$(".link-modal").fancybox({
			arrows: false,
			infobar: false,
			touch: false,
			type: 'inline',
			autoFocus: false,
			i18n: {
				en: {
					CLOSE: "Закрыть",
					NEXT: "Вперед",
					PREV: "Назад" // PLAY_START: "Start slideshow",
					// PLAY_STOP: "Pause slideshow",
					// FULL_SCREEN: "Full screen",
					// THUMBS: "Thumbnails",
					// DOWNLOAD: "Download",
					// SHARE: "Share",
					// ZOOM: "Zoom"

				}
			},
			beforeLoad: function beforeLoad() {
				document.querySelector("html").classList.add("fixed");
			},
			afterClose: function afterClose() {
				document.querySelector("html").classList.remove("fixed");
			}
		});
		$(".modal-close-js").click(function () {
			$.fancybox.close();
		});
		$.fancybox.defaults.backFocus = false;
		var linkModal = document.querySelectorAll('.link-modal');

		function addData() {
			linkModal.forEach(function (element) {
				element.addEventListener('click', function () {
					var modal = document.querySelector(element.getAttribute("href"));
					var data = element.dataset;

					function setValue(val, elem) {
						if (elem && val) {
							var el = modal.querySelector(elem);
							el.tagName == "INPUT" ? el.value = val : el.innerHTML = val; // console.log(modal.querySelector(elem).tagName)
						}
					}

					setValue(data.title, '.ttu');
					setValue(data.text, '.after-headline');
					setValue(data.btn, '.btn');
					setValue(data.order, '.order');
				});
			});
		}

		if (linkModal) addData();
	},
	// /modalCall
	toggleMenu: function toggleMenu() {
		var _this = this;

		if (this.btnToggleMenuMobile) {
			this.btnToggleMenuMobile.forEach(function (element) {
				element.addEventListener('click', function () {
					_this.btnToggleMenuMobile.forEach(function (element) {
						return element.classList.toggle("on");
					});

					_this.menuMobile.classList.toggle("active");

					document.body.classList.toggle("fixed");
					document.querySelector('html').classList.toggle("fixed");
					return false;
				});
			});
		}
	},
	closeMenu: function closeMenu() {
		if (this.menuMobile) {
			this.btnToggleMenuMobile.forEach(function (element) {
				element.classList.remove("on");
			});
			this.menuMobile.classList.remove("active");
			document.body.classList.remove("fixed");
			document.querySelector('html').classList.remove("fixed");
		}
	},
	mobileMenu: function mobileMenu() {
		var _this2 = this;

		if (this.menuMobileLink) {
			this.toggleMenu();
			document.addEventListener('mouseup', function (event) {
				var container = event.target.closest(".menu-mobile--js.active"); // (1)

				if (!container) {
					_this2.closeMenu();
				}
			}, {
				passive: true
			});
			window.addEventListener('resize', function () {
				if (window.matchMedia("(min-width: 992px)").matches) {
					JSCCommon.closeMenu();
				}
			}, {
				passive: true
			});
		}
	},
	// /mobileMenu
	// tabs  .
	tabscostume: function tabscostume(tab) {
		var tabs = {
			Btn: [].slice.call(document.querySelectorAll(".".concat(tab, "__btn"))),
			BtnParent: [].slice.call(document.querySelectorAll(".".concat(tab, "__caption"))),
			Content: [].slice.call(document.querySelectorAll(".".concat(tab, "__content")))
		};
		tabs.Btn.forEach(function (element, index) {
			element.addEventListener('click', function () {
				if (!element.classList.contains('active')) {
					var siblings = element.parentNode.querySelector(".".concat(tab, "__btn.active"));
					var siblingsContent = tabs.Content[index].parentNode.querySelector(".".concat(tab, "__content.active"));
					siblings.classList.remove('active');
					siblingsContent.classList.remove('active');
					element.classList.add('active');
					tabs.Content[index].classList.add('active');
				}
			});
		}); // $('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
		// 	$(this)
		// 		.addClass('active').siblings().removeClass('active')
		// 		.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
		// 		.eq($(this).index()).fadeIn().addClass('active');
		// });
	},
	// /tabs
	inputMask: function inputMask() {
		// mask for input
		var InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(function (element) {
			element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}");
		});
		Inputmask("+9(999)999-99-99").mask(InputTel);
	},
	// /inputMask
	ifie: function ifie() {
		var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

		if (isIE11) {
			$("body").after('<div class="browsehappy">	<p class=" container">К сожалению, вы используете устаревший браузер. Пожалуйста, <a href="http://browsehappy.com/" target="_blank">обновите ваш браузер</a>, чтобы улучшить производительность, качество отображаемого материала и повысить безопасность.</p></div>');
		}
	},
	sendForm: function sendForm() {
		var gets = function () {
			var a = window.location.search;
			var b = new Object();
			var c;
			a = a.substring(1).split("&");

			for (var i = 0; i < a.length; i++) {
				c = a[i].split("=");
				b[c[0]] = c[1];
			}

			return b;
		}(); // form


		$("form").submit(function (e) {
			e.preventDefault();
			var th = $(this);
			var data = th.serialize();
			th.find('.utm_source').val(decodeURIComponent(gets['utm_source'] || ''));
			th.find('.utm_term').val(decodeURIComponent(gets['utm_term'] || ''));
			th.find('.utm_medium').val(decodeURIComponent(gets['utm_medium'] || ''));
			th.find('.utm_campaign').val(decodeURIComponent(gets['utm_campaign'] || ''));
			$.ajax({
				url: 'action.php',
				type: 'POST',
				data: data
			}).done(function (data) {
				$.fancybox.close();
				$.fancybox.open({
					src: '#modal-thanks',
					type: 'inline'
				}); // window.location.replace("/thanks.html");

				setTimeout(function () {
					// Done Functions
					th.trigger("reset"); // $.magnificPopup.close();
					// ym(53383120, 'reachGoal', 'zakaz');
					// yaCounter55828534.reachGoal('zakaz');
				}, 4000);
			}).fail(function () {});
		});
	},
	heightwindow: function heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		var vh = window.innerHeight * 0.01; // Then we set the value in the --vh custom property to the root of the document

		document.documentElement.style.setProperty('--vh', "".concat(vh, "px")); // We listen to the resize event

		window.addEventListener('resize', function () {
			// We execute the same script as before
			var vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
		}, {
			passive: true
		});
	},
	animateScroll: function animateScroll() {
		// листалка по стр
		$(" .top-nav li a, .scroll-link").click(function () {
			var elementClick = $(this).attr("href");
			var destination = $(elementClick).offset().top;
			$('html, body').animate({
				scrollTop: destination
			}, 1100);
			return false;
		});
	},
	getCurrentYear: function getCurrentYear(el) {
		var now = new Date();
		var currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear();
	}
};
var $ = jQuery;

function eventHandler() {
	var _defaultSl;

	JSCCommon.ifie();
	JSCCommon.modalCall();
	JSCCommon.tabscostume('tabs');
	JSCCommon.mobileMenu();
	JSCCommon.inputMask();
	JSCCommon.sendForm();
	JSCCommon.heightwindow();
	JSCCommon.animateScroll(); // JSCCommon.CustomInputFile(); 

	var x = window.location.host;
	var screenName;
	screenName = '01.png';

	if (screenName && x === "localhost:3000") {
		$(".footer").after("<div class=\"pixel-perfect\" style=\"background-image: url(screen/".concat(screenName, ");\"></div>"));
	}

	function whenResize() {
		var topH = $("header ").innerHeight();

		if ($(window).scrollTop() > topH) {
			$('.top-nav  ').addClass('fixed');
		} else {
			$('.top-nav  ').removeClass('fixed');
		}
	}

	window.addEventListener('resize', function () {
		whenResize();
	}, {
		passive: true
	});
	whenResize();
	var defaultSl = (_defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true
		},
		watchOverflow: true
	}, _defineProperty(_defaultSl, "spaceBetween", 0), _defineProperty(_defaultSl, "loop", true), _defineProperty(_defaultSl, "navigation", {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev'
	}), _defineProperty(_defaultSl, "pagination", {
		el: ' .swiper-pagination',
		type: 'bullets',
		clickable: true // renderBullet: function (index, className) {
		// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
		// }

	}), _defaultSl);
	var swiper4 = new Swiper('.sBanners__slider--js', _objectSpread(_objectSpread({}, defaultSl), {}, {
		slidesPerView: 'auto',
		freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		freeModeMomentum: true
	})); // modal window

	window.onload = function () {
		document.body.classList.add('loaded_hiding');
		window.setTimeout(function () {
			document.body.classList.add('loaded');
			document.body.classList.remove('loaded_hiding');
		}, 500);
	}; //luckyoneJs


	var feedBackSlider = new Swiper('.feedback-slider-js', {
		slidesPerView: 'auto',
		spaceBetween: 20,
		loop: true,
		//lazy
		lazy: {
			loadPrevNext: true
		},
		//pagination
		pagination: {
			el: '.feedback-fract--js',
			type: 'fraction'
		},
		//nav
		navigation: {
			nextEl: '.feedback-next--js',
			prevEl: '.feedback-prev--js'
		}
	}); //partners

	$('.sPartners__slider--js').each(function () {
		var partnersSlider = new Swiper($(this).find('.partner-slider-js'), {
			slidesPerView: 'auto',
			spaceBetween: 20,
			//loop: true,
			//lazy
			lazy: {
				loadPrevNext: true,
				loadPrevNextAmount: 5
			},
			//pagination
			pagination: {
				el: $(this).find('.partner-pugin--js'),
				type: 'bullets',
				clickable: true
			}
		});
	}); //currYear

	$('.curr-year-js').each(function () {
		this.innerHTML = new Date().getFullYear();
	}); //scrolltop js

	$('.scroll-top-js').click(function () {
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	}); //footer

	var footerSlider = new Swiper('.footer-slider-js', {
		slidesPerView: 'auto',
		spaceBetween: 27
	}); // window.setTimeout(function (){
	// 	$.fancybox.open({
	// 		src: '#modal-thanks',
	// 		type: 'inline'
	// 	});
	// }, 1000)
	//yandex map js

	ymaps.ready(function () {
		var myMap = new ymaps.Map('map', {
			center: [59.938600861371185, 30.213698854492115],
			zoom: 16
		}, {
			searchControlProvider: 'yandex#search'
		}),
				// Создаём макет содержимого.
		MyIconContentLayout = ymaps.templateLayoutFactory.createClass('<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'),
				myPlacemark = new ymaps.Placemark([59.939338387243374, 30.214020719573902], {
			hintContent: 'Мeсто конференции',
			balloonContent: '«Прибалтийская Park Inn»'
		}, {
			// Опции.
			// Необходимо указать данный тип макета.
			iconLayout: 'default#image',
			// Своё изображение иконки метки.
			iconImageHref: 'img/@1x/mark-img.png',
			// Размеры метки.
			iconImageSize: [37, 45],
			// Смещение левого верхнего угла иконки относительно
			// её "ножки" (точки привязки).
			//iconImageOffset: [-5, -38]
			iconImageOffset: [-3, -10]
		}),
				myPlacemarkWithContent = new ymaps.Placemark([55.661574, 37.573856], {
			hintContent: 'Собственный значок метки с контентом',
			balloonContent: 'А эта — новогодняя',
			iconContent: '12'
		}, {
			// Опции.
			// Необходимо указать данный тип макета.
			iconLayout: 'default#imageWithContent',
			// Своё изображение иконки метки.
			iconImageHref: 'images/ball.png',
			// Размеры метки.
			iconImageSize: [48, 48],
			// Смещение левого верхнего угла иконки относительно
			// её "ножки" (точки привязки).
			iconImageOffset: [-24, -24],
			// Смещение слоя с содержимым относительно слоя с картинкой.
			iconContentOffset: [15, 15],
			// Макет содержимого.
			iconContentLayout: MyIconContentLayout
		});
		myMap.geoObjects.add(myPlacemark).add(myPlacemarkWithContent);
	}); //end luckyoneJs
}

;

if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}
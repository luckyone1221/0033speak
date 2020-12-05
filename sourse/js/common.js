const JSCCommon = {
	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".menu-mobile--js"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),

	modalCall() {

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
					PREV: "Назад",
					// PLAY_START: "Start slideshow",
					// PLAY_STOP: "Pause slideshow",
					// FULL_SCREEN: "Full screen",
					// THUMBS: "Thumbnails",
					// DOWNLOAD: "Download",
					// SHARE: "Share",
					// ZOOM: "Zoom"
				},
			},
			beforeLoad: function () {
				document.querySelector("html").classList.add("fixed")
			},
			afterClose: function () {
				document.querySelector("html").classList.remove("fixed")
			},
		});
		$(".modal-close-js").click(function () {
			$.fancybox.close();
		})
		$.fancybox.defaults.backFocus = false;
		const linkModal = document.querySelectorAll('.link-modal');
		function addData() {
			linkModal.forEach(element => {
				element.addEventListener('click', () => {
					let modal = document.querySelector(element.getAttribute("href"));
					const data = element.dataset;

					function setValue(val, elem) {
						if (elem && val) {
							const el = modal.querySelector(elem)
							el.tagName === "INPUT"
								? el.value = val
								: el.innerHTML = val;
							// console.log(modal.querySelector(elem).tagName)
						}
					}
					setValue(data.title, '.ttu');
					setValue(data.text, '.after-headline');
					setValue(data.btn, '.btn');
					setValue(data.order, '.order');
				})
			})
		}
		if (linkModal) addData();
	},
	// /modalCall
	toggleMenu() {
		if (this.btnToggleMenuMobile) {
			this.btnToggleMenuMobile.forEach(element => {
				element.addEventListener('click', () => {
					this.btnToggleMenuMobile.forEach(element => element.classList.toggle("on"));
					this.menuMobile.classList.toggle("active");
					document.body.classList.toggle("fixed");
					document.querySelector('html').classList.toggle("fixed");
					return false;
				});
			});
		}
	},

	closeMenu() {
		if (this.menuMobile) {
			this.btnToggleMenuMobile.forEach(element => {
				element.classList.remove("on");
			});
			this.menuMobile.classList.remove("active");
			document.body.classList.remove("fixed");
			document.querySelector('html').classList.remove("fixed");
		}

	},
	mobileMenu() {
		if (this.menuMobileLink) {
			this.toggleMenu();
			document.addEventListener('mouseup', (event) => {
				let container = event.target.closest(".menu-mobile--js.active"); // (1)
				if (!container) {
					this.closeMenu();
				}
			}, { passive: true });

			window.addEventListener('resize', () => {
				if (window.matchMedia("(min-width: 992px)").matches) {
					JSCCommon.closeMenu();
				}
			}, { passive: true });
		}
	},
	// /mobileMenu
	ifie() {
		var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
		if (isIE11) {
			$("body").after('<div class="browsehappy">	<p class=" container">К сожалению, вы используете устаревший браузер. Пожалуйста, <a href="http://browsehappy.com/" target="_blank">обновите ваш браузер</a>, чтобы улучшить производительность, качество отображаемого материала и повысить безопасность.</p></div>')

		}
	},
	sendForm() {
		var gets = (function () {
			var a = window.location.search;
			var b = new Object();
			var c;
			a = a.substring(1).split("&");
			for (var i = 0; i < a.length; i++) {
				c = a[i].split("=");
				b[c[0]] = c[1];
			}
			return b;
		})();
		// form
		$("form").submit(function (e) {
			e.preventDefault();
			const th = $(this);
			var data = th.serialize();
			th.find('.utm_source').val(decodeURIComponent(gets['utm_source'] || ''));
			th.find('.utm_term').val(decodeURIComponent(gets['utm_term'] || ''));
			th.find('.utm_medium').val(decodeURIComponent(gets['utm_medium'] || ''));
			th.find('.utm_campaign').val(decodeURIComponent(gets['utm_campaign'] || ''));
			$.ajax({
				url: 'action.php',
				type: 'POST',
				data: data,
			}).done(function (data) {

				$.fancybox.close();
				$.fancybox.open({
					src: '#modal-thanks',
					type: 'inline'
				});
				// window.location.replace("/thanks.html");
				setTimeout(function () {
					// Done Functions
					th.trigger("reset");
					// $.magnificPopup.close();
					// ym(53383120, 'reachGoal', 'zakaz');
					// yaCounter55828534.reachGoal('zakaz');
				}, 4000);
			}).fail(function () { });

		});
	},
	heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01;
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		// We listen to the resize event
		window.addEventListener('resize', () => {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}, { passive: true });
	},

	getCurrentYear(el) {
		let now = new Date();
		let currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear();
	}
};
const $ = jQuery;

function eventHandler() {
	JSCCommon.ifie();
	JSCCommon.modalCall();
	JSCCommon.mobileMenu();
	JSCCommon.sendForm();
	JSCCommon.heightwindow();

	// JSCCommon.CustomInputFile(); 
	// var x = window.location.host;
	// let screenName;
	// screenName = '01.png';
	// if (screenName && x === "localhost:3000") {
	// 	$(".footer").after(`<div class="pixel-perfect" style="background-image: url(screen/${screenName});"></div>`);
	// }

	function whenResize() {
		const topH = $("header ").innerHeight();
		if ($(window).scrollTop() > topH) {
			$('.top-nav  ').addClass('fixed');
		} else {
			$('.top-nav  ').removeClass('fixed');
		}

	}

	window.addEventListener('resize', () => {
		whenResize();

	}, { passive: true });

	whenResize();


	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		spaceBetween: 0,
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true,
			// renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }
		},
	}

	const swiper4 = new Swiper('.sBanners__slider--js', {
		// slidesPerView: 5,
		...defaultSl,
		slidesPerView: 'auto',
		freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		freeModeMomentum: true,

	});
	// modal window

	window.onload = function () {
		document.body.classList.add('loaded_hiding');
		window.setTimeout(function () {
			document.body.classList.add('loaded');
			document.body.classList.remove('loaded_hiding');
		}, 500);
	}


	//luckyoneJs
	let feedBackSlider = new Swiper('.feedback-slider-js', {
		slidesPerView: 'auto',
		spaceBetween: 20,
		loop: true,

		//lazy
		lazy: {
			loadPrevNext: true,
		},

		//pagination
		pagination: {
			el: '.feedback-fract--js',
			type: 'fraction',
		},

		//nav
		navigation: {
			nextEl: '.feedback-next--js',
			prevEl: '.feedback-prev--js',
		},

	});
	//partners
	$('.sPartners__slider--js').each(function (){
		let partnersSlider = new Swiper ($(this).find('.partner-slider-js'), {
			slidesPerView: 'auto',
			spaceBetween: 20,
			//loop: true,

			//lazy
			lazy: {
				loadPrevNext: true,
				loadPrevNextAmount: 5,
			},

			//pagination
			pagination: {
				el: $(this).find('.partner-pugin--js'),
				type: 'bullets',
				clickable: true,
			},

		});
	});

	//currYear
	$('.curr-year-js').each(function (){
		this.innerHTML = new Date().getFullYear();
	})

	//scrolltop js
	$('.scroll-top-js').click(function (){
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	})

	//footer
	let footerSlider = new Swiper('.footer-slider-js', {
		slidesPerView: 'auto',
		spaceBetween: 27,
	});

	//fix menu
	$('.menu-mobile .navMenu__link').click(function (){
		JSCCommon.closeMenu();
	});

	//vanilla scrollLik
	function smoothScroll(qSelector){
		let elements = document.querySelectorAll(qSelector);
		if (elements.length === 0) return

		for (let elem of elements){
			console.log(document.body.classList.contains('tarif-page'));
			elem.addEventListener('click', function () {

				let destinyID = this.getAttribute('href'); //this.attributes.href.nodeValue
				event.preventDefault();

				let destinyElem = document.querySelector(destinyID);
				if (!destinyElem) return

				let destinyTop = getCoords(destinyElem).top;

				window.scrollTo({
					top: destinyTop,
					behavior: "smooth"
				});

			});
		}
	}
	function getCoords(elem) { // crossbrowser version
		var box = elem.getBoundingClientRect();

		var body = document.body;
		var docEl = document.documentElement;

		var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
		var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

		var clientTop = docEl.clientTop || body.clientTop || 0;
		var clientLeft = docEl.clientLeft || body.clientLeft || 0;

		var top  = box.top +  scrollTop - clientTop;
		var left = box.left + scrollLeft - clientLeft;

		return { top: Math.round(top), left: Math.round(left) };
	}

	smoothScroll('.ancor-js, .top-nav li a, .scroll-link');


	//yandex map js
	ymaps.ready(function () {
		var myMap = new ymaps.Map('map', {
				center: [59.938600861371185,30.213698854492115],
				zoom: 16
			}, {
				searchControlProvider: 'yandex#search'
			}),

			// Создаём макет содержимого.
			MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
				'<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
			),

			myPlacemark = new ymaps.Placemark([59.939338387243374,30.214020719573902], {
				hintContent: 'Мeсто конференции',
				balloonContent: '«Прибалтийская Park Inn»'
			}, {
				// Опции.
				// Необходимо указать данный тип макета.
				iconLayout: 'default#image',
				// Своё изображение иконки метки.
				iconImageHref: 'img/@1x/mark-img.png',
				// Размеры метки.
				iconImageSize: [74, 90],
				// Смещение левого верхнего угла иконки относительно
				// её "ножки" (точки привязки).
				//iconImageOffset: [-5, -38]
				iconImageOffset: [-3, -50]
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

		myMap.geoObjects
			.add(myPlacemark)
			.add(myPlacemarkWithContent);
	});
	//end luckyoneJs
};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}

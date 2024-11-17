// import '~/app/libs/mmenu/dist/mmenu.js'

import Swiper, { Navigation, Pagination } from 'swiper'
import intlTelInput from 'intl-tel-input'
import '~/node_modules/intl-tel-input/build/js/utils.js'

document.addEventListener('DOMContentLoaded', () => {
	const offerListSwiper = new Swiper('.offers-list', {
		modules: [Navigation, Pagination],
		breakpoints: {
			0: {
				spaceBetween: 20,
				slidesPerView: 1,
				slideClass: 'offers-list__item',
				wrapperClass: 'offers-list__wrapper',
				navigation: {
					nextEl: '.offers-list__next',
					prevEl: '.offers-list__prev'
				},
				loop: false,
				pagination: {
					el: '.offers-list__pagination',
					bulletClass: 'offers-list__bullet',
					bulletActiveClass: 'offers-list__bullet--current',
					clickable: true,
					renderBullet: function (index, className) {
						return '<span class="' + className + '"></span>'
					}
				}
			},
			768: {
				enabled: false
			},
			992: {
				enabled: false
			}
		}
	})

	const stepsGridSwiper = new Swiper('.steps-grid', {
		modules: [Navigation, Pagination],
		breakpoints: {
			0: {
				spaceBetween: 40,
				slidesPerView: 1,
				slideClass: 'steps-grid__item',
				wrapperClass: 'steps-grid__wrapper',
				loop: false,
				navigation: {
					nextEl: '.steps-grid__next',
					prevEl: '.steps-grid__prev'
				},
				pagination: {
					el: '.steps-grid__pagination',
					bulletClass: 'steps-grid__bullet',
					bulletActiveClass: 'steps-grid__bullet--current',
					clickable: true,
					renderBullet: function (index, className) {
						return '<span class="' + className + '"></span>'
					}
				}
			},
			768: {
				slidesPerGroup: 3,
				spaceBetween: 20,
				slidesPerView: 3,
				slideClass: 'steps-grid__item',
				wrapperClass: 'steps-grid__wrapper',
				loop: false,
				navigation: {
					nextEl: '.steps-grid__next',
					prevEl: '.steps-grid__prev'
				},
				pagination: {
					el: '.steps-grid__pagination',
					bulletClass: 'steps-grid__bullet',
					bulletActiveClass: 'steps-grid__bullet--current',
					clickable: true,
					renderBullet: function (index, className) {
						return '<span class="' + className + '"></span>'
					}
				}
			},
			992: {
				enabled: false
			}
		}
	})

	const input = document?.querySelector('.contact__input--phone')
	const inputWrapper = document?.querySelector('.contact__input-wrapper')
	window.intlTelInput = intlTelInput
	const instance = window?.intlTelInput(input, {
		initialCountry: 'lv',
		separateDialCode: true,
		utilsScript: '~/node_modules/intl-tel-input/build/js/utils.js'
	})

	const reset = function () {
		inputWrapper?.classList.remove('contact__input-wrapper--error')
	}

	input?.addEventListener('blur', function () {
		reset()

		if (input?.value.trim()) {
			if (!(instance?.isValidNumber())) {
				inputWrapper?.classList.add('contact__input-wrapper--error')
			}
		}
	})
	input?.addEventListener('change', reset)
	input?.addEventListener('keyup', reset)

	const center = [38.92184598447995, -77.02846086723414]

	const map = document?.querySelector('.contact__map')
	const options = {
		center: center,
		zoom: 17
	}

	map?.addEventListener('click', init, options)
	map?.addEventListener('mouseover', init, options)
	map?.addEventListener('touchstart', init, options)
	map?.addEventListener('touchmove', init, options)

	let loaded = false
	function init () {
		if (!loaded) {
			// eslint-disable-next-line no-undef
			const map = new ymaps.Map('contact__map', {
				center: center,
				zoom: 17
			})

			// eslint-disable-next-line no-undef
			const placemark = new ymaps.Placemark(center, {}, {})

			map?.controls.remove('geolocationControl') // remove geo
			map?.controls.remove('searchControl') // remove search 
			map?.controls.remove('trafficControl') // remove traffic control
			map?.controls.remove('typeSelector') // remove type
			map?.controls.remove('fullscreenControl') // remove full screen mode
			map?.controls.remove('zoomControl') // remove zoom
			map?.controls.remove('rulerControl') // remove ruler
			map?.behaviors.disable(['scrollZoom']) // remove map scroll
			map?.geoObjects.add(placemark)
			loaded = true
		}
	}

	const rows = document?.querySelector('.pricing')?.querySelectorAll('.pricing__row')
	const wrappers = document?.querySelector('.pricing')?.querySelectorAll('.pricing__wrapper--resize')
	const heads = document?.querySelector('.pricing')?.querySelectorAll('.pricing__head')

	const headsArray = []
	const headsHeightArray = []
	const wrappersArray = []
	const wrappersHeightArray = []

	for (let i = 0; i < heads?.length / rows?.length; i++) {
		for (let j = 0; j < rows?.length; j++) {
			const item = rows[j]?.querySelectorAll('.pricing__head')[i]
			headsHeightArray?.push(item.offsetHeight)
			headsArray?.push(item)
		}
	}

	for (let i = 0; i < heads?.length; i += rows?.length) {
		const chunkHeadsHeight = headsHeightArray.slice(i, i + rows.length)
		const chunkHeads = headsArray.slice(i, i + rows.length)
		for (let i = 0; i < chunkHeadsHeight.length; i++) {
			const headsHeight = []
			headsHeight.push(chunkHeadsHeight)
			const heightMax = Math.max(...headsHeight[0])
			chunkHeads[i].style.height = ''.concat(heightMax, 'px')
		}
	}

	for (let i = 0; i < wrappers?.length / rows?.length; i++) {
		for (let j = 0; j < rows?.length; j++) {
			const item = rows[j]?.querySelectorAll('.pricing__wrapper--resize')[i]
			wrappersHeightArray.push(item.offsetHeight)
			wrappersArray.push(item)
		}
	}

	for (let i = 0; i < wrappers?.length; i += rows?.length) {
		const chunkWrappersHeight = wrappersHeightArray.slice(i, i + rows.length)
		const chunkWrappers = wrappersArray.slice(i, i + rows.length)
		for (let i = 0; i < chunkWrappersHeight.length; i++) {
			const wrappersHeight = []
			wrappersHeight.push(chunkWrappersHeight)
			const heightMax = Math.max(...wrappersHeight[0])
			chunkWrappers[i].style.height = ''.concat(heightMax, 'px')
		}
	}

	const body = document?.querySelector('body')
	const header = document?.querySelector('.header')
	const headerContainer = document?.querySelector('.header__container')
	const nav = document?.querySelector('.header__nav')
	const navList = document?.querySelector('.nav__list')
	const headerBtns = document?.querySelector('.header-btns')

	const btn = document?.querySelector('.burger')
	btn?.addEventListener('click', () => {
		body?.classList.toggle('body--mobile')
		btn?.classList.toggle('burger--active')
		header?.classList.toggle('header--mobile')
		headerContainer?.classList.toggle('header__container--mobile')
		nav?.classList.toggle('header__nav--mobile')
		navList?.classList.toggle('nav__list--mobile')
		headerBtns?.classList.toggle('header-btns--mobile')
	})

	const expandBtns = document?.querySelectorAll('.google-ad-list__btn')

	expandBtns?.forEach((item, index) => {
		item.addEventListener('click', event => {
			const textBlocks = document?.querySelectorAll('.google-ad-list__text')[index].querySelectorAll('.google-ad-list__desc')
			textBlocks.forEach(item => {
				item.classList.toggle('google-ad-list__desc--shown')
			})
			const expandBtn = expandBtns[index]
			if (expandBtn.textContent === 'Expand') {
				expandBtn.textContent = 'Collapse'
			} else {
				expandBtn.textContent = 'Expand'
			}
		})
	})
})

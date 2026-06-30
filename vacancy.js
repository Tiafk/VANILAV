const vacancySlider = new Swiper(".mySwiper_desc", {
  slidesPerView: "auto",
  spaceBetween: 30,
  loop: true,
  lazy: false,
  speed: 3000, // Скорость анимации (чем меньше, тем быстрее)
  autoplay: {
    delay: 0, // Без задержки
    disableOnInteraction: false, // Не отключать автоплей при взаимодействии
    pauseOnMouseEnter: true, // Пауза при наведении мыши
  },
  freeMode: {
    enabled: true,
    momentum: true, // Включаем инерцию для плавного перетаскивания
    momentumRatio: 0.5, // Коэффициент инерции
    momentumVelocityRatio: 0.5,
  },
  loopedSlides: 10, // Количество слайдов в цикле
  watchSlidesProgress: true,
  watchSlidesVisibility: true,
  // Отключаем пагинацию и навигацию, если они не нужны
  pagination: false,
  navigation: false,
});

const offerSlider = new Swiper(".myOfferSlider", {
  slidesPerView: "auto",
  spaceBetween: 30,
  loop: false,
  lazy: false,
  freeMode: true,
  pagination: false,
  navigation: false,
});

const vacancySliderSec = new Swiper(".mySwiper_education-mobile", {
  slidesPerView: "auto",
  spaceBetween: 15,
  loop: true,
  lazy: false,
  speed: 3000, // Скорость анимации (чем меньше, тем быстрее)
  autoplay: {
    delay: 0, // Без задержки
    reverseDirection: true,
    disableOnInteraction: false, // Не отключать автоплей при взаимодействии
    pauseOnMouseEnter: true, // Пауза при наведении мыши
  },
  freeMode: {
    enabled: true,
    momentum: true, // Включаем инерцию для плавного перетаскивания
    momentumRatio: 0.5, // Коэффициент инерции
    momentumVelocityRatio: 0.5,
  },
  loopedSlides: 10, // Количество слайдов в цикле
  watchSlidesProgress: true,
  watchSlidesVisibility: true,
  // Отключаем пагинацию и навигацию, если они не нужны
  pagination: false,
  navigation: false,
});

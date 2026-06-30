const offerSlider = new Swiper(".myOfferSlider", {
  slidesPerView: "auto",
  spaceBetween: 30,
  loop: false,
  lazy: false,
  freeMode: true,
  pagination: false,
  navigation: false,
});

// const vacancySlider = new Swiper(".mySwiper_desc", {
//   slidesPerView: "auto",
//   spaceBetween: 30,
//   loop: true,
//   lazy: false,
//   speed: 3000, // Скорость анимации (чем меньше, тем быстрее)
//   autoplay: {
//     delay: 0, // Без задержки
//     disableOnInteraction: false, // Не отключать автоплей при взаимодействии
//     pauseOnMouseEnter: true, // Пауза при наведении мыши
//   },
//   freeMode: {
//     enabled: true,
//     momentum: true, // Включаем инерцию для плавного перетаскивания
//     momentumRatio: 0.5, // Коэффициент инерции
//     momentumVelocityRatio: 0.5,
//   },
//   loopedSlides: 10, // Количество слайдов в цикле
//   watchSlidesProgress: true,
//   watchSlidesVisibility: true,
//   // Отключаем пагинацию и навигацию, если они не нужны
//   pagination: false,
//   navigation: false,
// });

// const vacancySliderSec = new Swiper(".mySwiper_education-mobile", {
//   slidesPerView: "auto",
//   spaceBetween: 15,
//   loop: true,
//   lazy: false,
//   speed: 3000, // Скорость анимации (чем меньше, тем быстрее)
//   autoplay: {
//     delay: 0, // Без задержки
//     reverseDirection: true,
//     disableOnInteraction: false, // Не отключать автоплей при взаимодействии
//     pauseOnMouseEnter: true, // Пауза при наведении мыши
//   },
//   freeMode: {
//     enabled: true,
//     momentum: true, // Включаем инерцию для плавного перетаскивания
//     momentumRatio: 0.5, // Коэффициент инерции
//     momentumVelocityRatio: 0.5,
//   },
//   loopedSlides: 10, // Количество слайдов в цикле
//   watchSlidesProgress: true,
//   watchSlidesVisibility: true,
//   // Отключаем пагинацию и навигацию, если они не нужны
//   pagination: false,
//   navigation: false,
// });

// Массив с изображениями для слайдера
const sliderImages = [
  "./img/vakancy/B_slider/slide_1.webp",
  "./img/vakancy/B_slider/slide_2.webp",
  "./img/vakancy/B_slider/slide_3.webp",
  "./img/vakancy/B_slider/slide_4.webp",
  "./img/vakancy/B_slider/slide_5.webp",
  "./img/vakancy/B_slider/slide_6.webp",
  "./img/vakancy/B_slider/slide_7.webp",
  "./img/vakancy/B_slider/slide_8.webp",
  "./img/vakancy/B_slider/slide_9.webp",
  "./img/vakancy/B_slider/slide_10.webp",
];

function createMarqueeSlider(
  container,
  images,
  direction = "left",
  isMobile = false,
) {
  // Очищаем контейнер
  container.innerHTML = "";

  // Создаем контейнер для трека
  const track = document.createElement("div");
  track.className = "swiper-track";
  container.appendChild(track);

  // Функция для получения адаптивных размеров
  function getAdaptiveSizes() {
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight || 430;

    // Размеры для мобильных устройств
    if (isMobile || containerWidth <= 960) {
      const slideWidth = Math.max(150, Math.min(265, containerWidth * 0.4));
      const slideHeight = Math.max(180, Math.min(353, slideWidth * 1.33));
      const gap = 15;

      return {
        slideWidth: Math.floor(slideWidth),
        slideHeight: Math.floor(slideHeight),
        gap: gap,
      };
    } else {
      // Десктопные размеры
      return {
        slideWidth: 360,
        slideHeight: 430,
        gap: 30,
      };
    }
  }

  let sizes = getAdaptiveSizes();
  let animationId = null;
  let isScrolling = true;
  let isDragging = false;
  let position = 0;
  let dragStartX = 0;
  let dragStartPosition = 0;
  let totalWidth = 0;
  let isInitialized = false;

  // Функция для обновления размеров
  function updateSizes() {
    sizes = getAdaptiveSizes();

    // Обновляем стили трека
    track.style.gap = sizes.gap + "px";
    track.style.height = sizes.slideHeight + "px";

    // Обновляем стили всех слайдов
    const slides = track.querySelectorAll(".swiper-slide");
    slides.forEach((slide) => {
      slide.style.width = sizes.slideWidth + "px";
      slide.style.height = sizes.slideHeight + "px";
      slide.style.minWidth = sizes.slideWidth + "px";
      slide.style.minHeight = sizes.slideHeight + "px";
    });

    // Пересчитываем общую ширину
    totalWidth = images.length * (sizes.slideWidth + sizes.gap);
  }

  // Создаем слайды
  function createSlides() {
    track.innerHTML = "";

    // Создаем основной набор слайдов
    images.forEach((src, index) => {
      const slide = document.createElement("div");
      slide.className = "swiper-slide";
      slide.style.width = sizes.slideWidth + "px";
      slide.style.height = sizes.slideHeight + "px";
      slide.style.minWidth = sizes.slideWidth + "px";
      slide.style.minHeight = sizes.slideHeight + "px";
      slide.style.borderRadius = "33px";
      slide.style.overflow = "hidden";
      slide.style.flexShrink = "0";
      slide.innerHTML = `<img src="${src}" alt="Slide ${index + 1}" loading="lazy" style="width:100%;height:100%;object-fit:cover;">`;
      track.appendChild(slide);
    });

    // Дублируем слайды для бесшовности
    images.forEach((src, index) => {
      const slide = document.createElement("div");
      slide.className = "swiper-slide";
      slide.style.width = sizes.slideWidth + "px";
      slide.style.height = sizes.slideHeight + "px";
      slide.style.minWidth = sizes.slideWidth + "px";
      slide.style.minHeight = sizes.slideHeight + "px";
      slide.style.borderRadius = "33px";
      slide.style.overflow = "hidden";
      slide.style.flexShrink = "0";
      slide.innerHTML = `<img src="${src}" alt="Slide ${index + 1}" loading="lazy" style="width:100%;height:100%;object-fit:cover;">`;
      track.appendChild(slide);
    });

    // Устанавливаем gap и высоту для трека
    track.style.gap = sizes.gap + "px";
    track.style.height = sizes.slideHeight + "px";
    track.style.display = "flex";
    track.style.width = "max-content";
  }

  createSlides();
  updateSizes();

  // === НАСТРОЙКА СКОРОСТИ ===
  const baseSpeed = isMobile ? 0.6 : 1;
  const speed = direction === "right" ? baseSpeed : -baseSpeed;

  function animate() {
    if (!isScrolling || isDragging) {
      animationId = requestAnimationFrame(animate);
      return;
    }

    position += speed;

    // Бесшовная логика
    if (direction === "right") {
      // Движение вправо
      if (position >= 0) {
        position -= totalWidth;
      }
    } else {
      // Движение влево
      if (position <= -totalWidth) {
        position += totalWidth;
      }
    }

    track.style.transform = `translateX(${position}px)`;
    track.style.transition = "none";
    animationId = requestAnimationFrame(animate);
  }

  // === ПЕРЕТАСКИВАНИЕ ===
  function startDrag(e) {
    isDragging = true;
    isScrolling = false;
    dragStartX = e.clientX || (e.touches && e.touches[0].clientX);
    dragStartPosition = position;
    container.style.cursor = "grabbing";
    e.preventDefault();
  }

  function doDrag(e) {
    if (!isDragging) return;

    const currentX = e.clientX || (e.touches && e.touches[0].clientX);
    const delta = currentX - dragStartX;
    position = dragStartPosition + delta;

    track.style.transform = `translateX(${position}px)`;
    track.style.transition = "none";
  }

  function endDrag() {
    if (!isDragging) return;

    isDragging = false;
    isScrolling = true;
    container.style.cursor = "pointer";

    // Корректируем позицию для бесшовности после перетаскивания
    if (direction === "right") {
      if (position > 0) position -= totalWidth;
      else if (position <= -totalWidth) position += totalWidth;
    } else {
      if (position < -totalWidth) position += totalWidth;
      else if (position >= 0) position -= totalWidth;
    }

    if (animationId) {
      cancelAnimationFrame(animationId);
    }
    animate();
  }

  // === ПАУЗА ПРИ НАВЕДЕНИИ ===
  function setupHoverPause() {
    const slides = track.querySelectorAll(".swiper-slide");

    slides.forEach((slide) => {
      slide.addEventListener("mouseenter", () => {
        isScrolling = false;
      });

      slide.addEventListener("mouseleave", () => {
        isScrolling = true;
      });
    });

    container.addEventListener("mouseenter", () => {
      isScrolling = false;
    });

    container.addEventListener("mouseleave", () => {
      isScrolling = true;
    });
  }

  // === ИНИЦИАЛИЗАЦИЯ СОБЫТИЙ ===
  function setupEvents() {
    container.addEventListener("mousedown", startDrag);
    document.addEventListener("mousemove", doDrag);
    document.addEventListener("mouseup", endDrag);

    container.addEventListener("touchstart", startDrag, { passive: false });
    document.addEventListener("touchmove", doDrag, { passive: false });
    document.addEventListener("touchend", endDrag);

    setupHoverPause();
  }

  setupEvents();

  // Обработчик изменения размера окна
  let resizeTimeout;
  function handleResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const newSizes = getAdaptiveSizes();

      // Проверяем, изменились ли размеры
      if (
        newSizes.slideWidth !== sizes.slideWidth ||
        newSizes.slideHeight !== sizes.slideHeight
      ) {
        updateSizes();

        // Корректируем позицию после изменения размеров
        if (direction === "right") {
          if (position > 0) position -= totalWidth;
          else if (position <= -totalWidth) position += totalWidth;
        } else {
          if (position < -totalWidth) position += totalWidth;
          else if (position >= 0) position -= totalWidth;
        }

        track.style.transform = `translateX(${position}px)`;
      }
    }, 200);
  }

  window.addEventListener("resize", handleResize);

  // Запуск анимации
  animate();

  // Помечаем как инициализированный
  isInitialized = true;

  // Функция для обновления слайдов
  return {
    updateImages: (newImages) => {
      images = newImages;
      createSlides();
      updateSizes();
      setupHoverPause();
    },
    updateSizes: updateSizes, // Добавляем метод для внешнего обновления
    refresh: () => {
      // Принудительное обновление всех размеров
      setTimeout(() => {
        updateSizes();
        // Корректируем позицию
        if (direction === "right") {
          if (position > 0) position -= totalWidth;
          else if (position <= -totalWidth) position += totalWidth;
        } else {
          if (position < -totalWidth) position += totalWidth;
          else if (position >= 0) position -= totalWidth;
        }
        track.style.transform = `translateX(${position}px)`;
      }, 50);
    },
    destroy: () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousedown", startDrag);
      document.removeEventListener("mousemove", doDrag);
      document.removeEventListener("mouseup", endDrag);
      container.removeEventListener("touchstart", startDrag);
      document.removeEventListener("touchmove", doDrag);
      document.removeEventListener("touchend", endDrag);
    },
  };
}

// Функция для инициализации всех слайдеров
function initAllSliders() {
  // Десктопный слайдер
  const desktopSlider = document.querySelector(".mySwiper_desc");
  // Мобильный слайдер
  const mobileSlider = document.querySelector(".mySwiper_education-mobile");

  if (desktopSlider && !window.desktopSliderInstance) {
    const desktopInstance = createMarqueeSlider(
      desktopSlider,
      sliderImages,
      "left",
      false,
    );
    window.desktopSliderInstance = desktopInstance;
    console.log("Десктопный слайдер запущен!");

    // Принудительно обновляем размеры после инициализации
    desktopInstance.refresh();
  } else if (desktopSlider) {
    console.log("Десктопный слайдер уже инициализирован");
  } else {
    console.error("Не найден десктопный слайдер .mySwiper_desc");
  }

  if (mobileSlider && !window.mobileSliderInstance) {
    const mobileInstance = createMarqueeSlider(
      mobileSlider,
      sliderImages,
      "right",
      true,
    );
    window.mobileSliderInstance = mobileInstance;
    console.log("Мобильный слайдер запущен!");

    // Принудительно обновляем размеры после инициализации
    mobileInstance.refresh();
  } else if (mobileSlider) {
    console.log("Мобильный слайдер уже инициализирован");
  } else {
    console.error("Не найден мобильный слайдер .mySwiper_education-mobile");
  }
}

// Инициализация после загрузки DOM
document.addEventListener("DOMContentLoaded", function () {
  // Добавляем стили для слайдеров
  const style = document.createElement("style");
  style.textContent = `
    .mySwiper_desc, .mySwiper_education-mobile {
      overflow: visible !important;
      width: 100%;
      position: relative;
      margin-bottom:24px;
    }
    .mySwiper_education-mobile { 
      overflow: hidden !important;
    }
    
    .swiper-track {
      display: flex !important;
      width: max-content !important;
      will-change: transform;
      cursor: pointer;
      align-items: center;
    }
    
    .swiper-slide {
      flex-shrink: 0 !important;
      border-radius: 33px;
      overflow: hidden;
      position: relative;
    }
    
    .swiper-slide img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      pointer-events: none;
    }
    
    .mySwiper_desc .swiper-slide {
      border-radius: 33px !important;
    }
    
    @media (max-width: 960px) {
      .mySwiper_desc .swiper-slide {
        max-width: clamp(150px, 40vw, 265px) !important;
        max-height: clamp(180px, 47vw, 353px) !important;
      }
      
      .mySwiper_education-mobile .swiper-slide {
        max-width: clamp(150px, 40vw, 265px) !important;
        max-height: clamp(180px, 47vw, 353px) !important;
      }
    }
  `;
  document.head.appendChild(style);

  // Инициализируем слайдеры
  initAllSliders();
});

// Дополнительная инициализация после полной загрузки страницы
window.addEventListener("load", function () {
  // Обновляем слайдеры после полной загрузки всех ресурсов
  setTimeout(function () {
    if (window.desktopSliderInstance) {
      window.desktopSliderInstance.refresh();
    }
    if (window.mobileSliderInstance) {
      window.mobileSliderInstance.refresh();
    }
    console.log("Слайдеры обновлены после полной загрузки страницы");
  }, 300);
});

// Обработка ошибок загрузки изображений
document.addEventListener(
  "error",
  function (e) {
    if (e.target.tagName === "IMG") {
      console.error("Ошибка загрузки изображения:", e.target.src);
      e.target.style.backgroundColor = "#f0f0f0";
      e.target.alt = "Изображение не загружено";
    }
  },
  true,
);

// Обработчик изменения ориентации экрана на мобильных устройствах
if (window.screen && window.screen.orientation) {
  window.screen.orientation.addEventListener("change", function () {
    setTimeout(function () {
      if (window.desktopSliderInstance) {
        window.desktopSliderInstance.refresh();
      }
      if (window.mobileSliderInstance) {
        window.mobileSliderInstance.refresh();
      }
    }, 300);
  });
}

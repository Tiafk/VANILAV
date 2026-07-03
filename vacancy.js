const offerSlider = new Swiper(".myOfferSlider", {
  slidesPerView: "auto",
  spaceBetween: 30,
  loop: false,
  lazy: false,
  freeMode: true,
  pagination: false,
  navigation: false,
  breakpoints: {
    0: {
      spaceBetween: 15,
      slidesPerView: "auto",
      freeMode: true,
    },
    641: {
      spaceBetween: 30,
      slidesPerView: "auto",
      freeMode: true,
    },
  },
});

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
  const SLIDER_SPEED = {
    desktop: 0.8,
    mobile: 0.4,
  };

  // Убираем зависимость от направления
  const baseSpeed = isMobile ? SLIDER_SPEED.mobile : SLIDER_SPEED.desktop;
  const speed = baseSpeed; // Всегда положительное значение

  // В анимации используем знак в зависимости от направления
  function animate() {
    if (!isScrolling || isDragging) {
      animationId = requestAnimationFrame(animate);
      return;
    }

    // Применяем направление
    const directionMultiplier = direction === "right" ? 1 : -1;
    position += speed * directionMultiplier;

    // Бесшовная логика
    if (direction === "right") {
      if (position >= 0) {
        position -= totalWidth;
      }
    } else {
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

document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  const heart = document.getElementById("parallaxHeart");

  if (!heart) {
    console.error("❌ Элемент #parallaxHeart не найден!");
    return;
  }

  console.log("✅ Параллакс инициализирован");

  // --- Настройки ---
  const MAX_OFFSET = 40; // Максимальное смещение в пикселях
  const SMOOTHING = 0.08; // Плавность (0-1), чем меньше, тем плавнее

  // Текущая позиция
  let currentX = 0;
  let currentY = 0;
  let targetX = 0;
  let targetY = 0;

  // Флаг для гироскопа
  let isGyroAvailable = false;

  // --- Функция обновления позиции ---
  function updateHeartPosition() {
    // Плавное приближение к целевой позиции
    currentX += (targetX - currentX) * SMOOTHING;
    currentY += (targetY - currentY) * SMOOTHING;

    heart.style.transform = `translate(${currentX}px, ${currentY}px)`;

    requestAnimationFrame(updateHeartPosition);
  }

  // --- ДЕСКТОП: движение от курсора ---
  function handleMouseMove(e) {
    if (isGyroAvailable) return; // Если есть гироскоп, используем его

    const rect = heart.getBoundingClientRect();
    const heartCenterX = rect.left + rect.width / 2;
    const heartCenterY = rect.top + rect.height / 2;

    // Расстояние от центра сердечка до курсора
    const deltaX = (e.clientX - heartCenterX) / window.innerWidth;
    const deltaY = (e.clientY - heartCenterY) / window.innerHeight;

    // Ограничиваем и применяем
    targetX = Math.max(
      -MAX_OFFSET,
      Math.min(MAX_OFFSET, deltaX * MAX_OFFSET * 2),
    );
    targetY = Math.max(
      -MAX_OFFSET,
      Math.min(MAX_OFFSET, deltaY * MAX_OFFSET * 2),
    );
  }

  // --- МОБИЛЬНЫЕ: гироскоп ---
  function handleOrientation(e) {
    if (!isGyroAvailable) return;

    // beta: наклон вперёд/назад (-180 до 180)
    // gamma: наклон влево/вправо (-90 до 90)
    const beta = e.beta || 0; // -180 до 180
    const gamma = e.gamma || 0; // -90 до 90

    // Нормализуем значения
    const normalizedBeta = Math.max(-1, Math.min(1, beta / 45));
    const normalizedGamma = Math.max(-1, Math.min(1, gamma / 45));

    targetX = normalizedGamma * MAX_OFFSET;
    targetY = normalizedBeta * MAX_OFFSET;
  }

  // --- Проверка доступности гироскопа ---
  function checkGyroAvailability() {
    if (typeof DeviceOrientationEvent !== "undefined") {
      // Для iOS 13+ нужно запросить разрешение
      if (typeof DeviceOrientationEvent.requestPermission === "function") {
        DeviceOrientationEvent.requestPermission()
          .then((state) => {
            if (state === "granted") {
              isGyroAvailable = true;
              window.addEventListener("deviceorientation", handleOrientation);
              console.log("✅ Гироскоп активирован (iOS)");
            } else {
              console.log("ℹ️ Доступ к гироскопу запрещён");
            }
          })
          .catch((err) => {
            console.log("ℹ️ Гироскоп недоступен:", err);
          });
      } else {
        // Android и другие
        window.addEventListener("deviceorientation", handleOrientation);
        isGyroAvailable = true;
        console.log("✅ Гироскоп активирован (Android)");
      }
    } else {
      console.log("ℹ️ Гироскоп не поддерживается");
    }
  }

  // --- Сброс при ресайзе ---
  function resetParallax() {
    targetX = 0;
    targetY = 0;
  }

  // --- Определяем, мобильное ли устройство ---
  function isMobile() {
    return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    );
  }

  // --- Инициализация ---
  function init() {
    // Если мобильное устройство — пробуем включить гироскоп
    if (isMobile()) {
      checkGyroAvailability();
    }

    // Всегда добавляем обработчик мыши (для десктопа и как fallback)
    window.addEventListener("mousemove", handleMouseMove);

    // Сброс при ресайзе
    window.addEventListener("resize", resetParallax);

    // Запускаем анимацию
    updateHeartPosition();

    console.log("📱 Мобильное устройство:", isMobile());
    console.log("🔄 Гироскоп доступен:", isGyroAvailable);
  }

  init();
});

document.addEventListener("DOMContentLoaded", () => {
      const imagesLeft = [
        './img/main/5.webp', './img/main/3.webp', './img/main/E.webp',
        './img/main/B.webp', './img/main/F.webp'
      ];
      const imagesRight = [
        './img/main/2.webp', './img/main/7.webp', './img/main/D.webp',
        './img/main/A.webp', './img/main/C.webp'
      ];

      function initMarquee(containerSelector, images, directionBase) {
        const container = document.querySelector(containerSelector);
        const track = container.querySelector('.track');
        let position = 0;
        let direction = directionBase;
        const speed = 0.5;

        function render() {
          const isVertical = window.innerWidth > 1250;
          direction = isVertical ? directionBase : (directionBase === 'up' ? 'left' : 'right');
          track.innerHTML = '';

          const fragment = document.createDocumentFragment();
          for (let i = 0; i < 2; i++) {
            images.forEach(src => {
              const div = document.createElement('div');
              div.classList.add('icon');
              const img = document.createElement('img');
              img.src = src;
              img.draggable = false;
              div.appendChild(img);
              fragment.appendChild(div);
            });
          }
          track.appendChild(fragment);

          // Set proper direction styles
          track.style.flexDirection = isVertical ? 'column' : 'row';
          container.style.flexDirection = isVertical ? 'column' : 'row';
        }

        function animate() {
          const isVertical = window.innerWidth > 1250;
          const sign = (direction === 'up' || direction === 'left') ? -1 : 1;
          position += sign * speed;

          const size = isVertical ? track.scrollHeight / 2 : track.scrollWidth / 2;
          if (Math.abs(position) >= size) position = 0;

          track.style.transform = isVertical
            ? `translateY(${position}px)`
            : `translateX(${position}px)`;

          requestAnimationFrame(animate);
        }

        render();
        animate();

        window.addEventListener('resize', () => {
          position = 0;
          render();
        });
      }

      initMarquee('.scroll-down', imagesLeft, 'up');
      initMarquee('.scroll-up', imagesRight, 'down');
    });




//scroll

window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    const shadowTop = document.querySelector(".shadow-top");

    if (window.scrollY > 10) {
      header.classList.add("scrolled");
      if (shadowTop) shadowTop.style.display = "none";
    } else {
      header.classList.remove("scrolled");
      if (shadowTop) shadowTop.style.display = "block";
    }
  });


// паралакс
window.addEventListener('load', () => {
  const container2 = document.querySelector('.block2');
  const icons2 = container2?.querySelectorAll('.parallax-img .img-icon') || [];

  if (!container2 || icons2.length === 0) return;

  // Глубины: меньшая глубина → больше движение (ближе к переднему плану)
  const depths2 = {
    icon1: 8,   // передний план
    icon2: 10,
    icon3: 12,
    icon4: 16,
    icon5: 20,
    icon6: 25,
    icon7: 30,
    icon8: 35,
    icon9: 40  // задний план
  };

  function initParallax(container, icons, depths) {
    const iconStates = {};
    icons.forEach(icon => {
      const className = [...icon.classList].find(cls => cls.startsWith('icon') && cls !== 'icon');
      if (className) {
        iconStates[className] = {
          element: icon,
          baseTransform: window.getComputedStyle(icon).transform !== 'none'
            ? window.getComputedStyle(icon).transform
            : '',
        };
      }
    });

    let mouseX = 0, mouseY = 0;
    let posX = 0, posY = 0;
    const speed = 0.05;

    function animate() {
      const dx = mouseX - posX;
      const dy = mouseY - posY;
      posX += dx * speed;
      posY += dy * speed;

      for (const className in iconStates) {
        const { element, baseTransform } = iconStates[className];
        const depth = depths[className] || 20;
        const tx = posX / depth;
        const ty = posY / depth;
        element.style.transform = `translate(${tx}px, ${ty}px) ${baseTransform}`;
      }

      requestAnimationFrame(animate);
    }

    const enableMouseParallax = () => {
      container.addEventListener('mousemove', e => {
        const rect = container.getBoundingClientRect();
        mouseX = e.clientX - rect.left - rect.width / 2;
        mouseY = e.clientY - rect.top - rect.height / 2;
      });
    };

    const enableGyroParallax = () => {
      const handleOrientation = event => {
        const tiltX = event.gamma || 0;
        const tiltY = event.beta || 0;
        mouseX = tiltX * 10;
        mouseY = tiltY * 10;
      };

      if (typeof DeviceOrientationEvent?.requestPermission === 'function') {
        // iOS: запрашиваем разрешение
        DeviceOrientationEvent.requestPermission()
          .then(state => {
            if (state === 'granted') {
              window.addEventListener('deviceorientation', handleOrientation);
            }
          })
          .catch(console.error);
      } else {
        // Android и старые iOS
        window.addEventListener('deviceorientation', handleOrientation);
      }
    };

    if (window.matchMedia('(pointer: fine)').matches) {
      enableMouseParallax(); // Десктоп
    } else {
      enableGyroParallax(); // Мобильные
    }

    animate();
  }

  initParallax(container2, icons2, depths2);
});


// отступы % 1900px - 1440px
function updateIconPosition() {
  const icon2 = document.querySelector('.block2 .wrapper-img .icon2');
  const icon3 = document.querySelector('.block2 .wrapper-img .icon3');
  const icon5 = document.querySelector('.block2 .wrapper-img .icon5');
  const icon6 = document.querySelector('.block2 .wrapper-img .icon6');
  const heart1 = document.querySelector('.block2 .wrapper-img .icon8');
  const heart2 = document.querySelector('.block2 .wrapper-img .icon9');

  if (!icon2 || !icon3 || !icon5 || !icon6 || !heart1 || !heart2) return;
  const width = window.innerWidth;

  if (width >= 1440) {
    // 1440px - 1900px
    const minWidth = 1440;
    const maxWidth = 1900;
    const ratio = (maxWidth - Math.min(width, maxWidth)) / (maxWidth - minWidth);

    icon2.style.left = `${16 + (19 - 16) * ratio}%`;
    icon2.style.top = `${4 + (8.8 - 4) * ratio}%`;

    icon3.style.left = `${16 + (19.2 - 16) * ratio}%`;
    icon3.style.bottom = `${9.5 + (14.5 - 9.5) * ratio}%`;

    icon5.style.right = `${9.5 + (19.5 - 9.5) * ratio}%`;
    icon5.style.bottom = `${1 + (8 - 1) * ratio}%`;

    icon6.style.right = `${16 + (19.2 - 16) * ratio}%`;
    icon6.style.top = `${9.5 + (14.5 - 9.5) * ratio}%`;

    heart1.style.left = `${6.5 + (10.5 - 6.5) * ratio}%`;
    heart1.style.top = `${9 + (14 - 9) * ratio}%`;

    heart2.style.right = `${14.7 + (18 - 14.7) * ratio}%`;
    heart2.style.bottom = `${31 + (35 - 31) * ratio}%`;
  } else {
    // 375px - 1440px
    const minWidth = 375;
    const maxWidth = 1440;
    const ratio = (maxWidth - Math.max(width, minWidth)) / (maxWidth - minWidth);

    icon2.style.left = `${19 + (0 - 19) * ratio}%`;
    icon2.style.top = `${8.8 + (0 - 8.8) * ratio}%`;

    icon3.style.left = `${19.2 + (0 - 19.2) * ratio}%`;
    icon3.style.bottom = `${14.5 + (41 - 14.5) * ratio}%`;

    icon5.style.right = `${19.5 + (0 - 19.5) * ratio}%`;
    icon5.style.bottom = `${8 + (30.7 - 8) * ratio}%`;

    icon6.style.right = `${19.2 + (0 - 19.2) * ratio}%`;
    icon6.style.top = `${14.5 + (0 - 14.5) * ratio}%`;

    heart1.style.left = `${10.5 + (41 - 10.5) * ratio}%`;
    heart1.style.top = `${14 + (10.5 - 14) * ratio}%`;

    heart2.style.right = `${18 + (39 - 18) * ratio}%`;
    heart2.style.bottom = `${31 + (35 - 31) * ratio}%`;
  }
}

window.addEventListener('resize', updateIconPosition);
window.addEventListener('DOMContentLoaded', updateIconPosition);


// Бегущая строка
const phrases = [
    "все будет фиолетово",
    "сделано в ванлав",
    "все будет фиолетово",
    "сделано в ванлав",
    "все будет фиолетово",
    "сделано в ванлав",
    "все будет фиолетово",
    "ванлав"
  ];

  const marquee = document.querySelector(".marquee");

  function createPhraseWithDot(text, isLast = false, nextText = "") {
  const wrapper = document.createElement("span");
  wrapper.classList.add("marquee-item");
  // Если это последний элемент ИЛИ следующая фраза совпадает — точки не ставим
  const shouldAddDot = !isLast && text !== nextText;
  wrapper.innerHTML = shouldAddDot ? `${text} <span class="dot"></span>` : text;
  return wrapper;
}

function fillMarquee() {
  const marquee = document.querySelector(".marquee");
  if (!marquee || !marquee.parentElement) return;
  marquee.innerHTML = "";

  // Создаём элементы с учетом следующей фразы
  const originalItems = phrases.map((phrase, index) =>
    createPhraseWithDot(phrase, index === phrases.length - 1, phrases[index + 1] || "")
  );

  originalItems.forEach(span => marquee.appendChild(span));

  let totalWidth = marquee.scrollWidth;
  const parentWidth = marquee.parentElement.offsetWidth;

  while (totalWidth < parentWidth * 2) {
    originalItems.forEach(span => {
      const clone = span.cloneNode(true);
      marquee.appendChild(clone);
    });
    totalWidth = marquee.scrollWidth;
  }

  const speed = 200; // px/sec
  const duration = totalWidth / speed;
  marquee.style.animationDuration = `${duration}s`;
}

  window.addEventListener("load", fillMarquee);
  window.addEventListener("resize", fillMarquee);


// блок 7 адресса
const imageSets = [
  ["./img/block7/1/1.webp", "./img/block7/1/2.webp", "./img/block7/1/3.webp", "./img/block7/1/4.webp"],
  ["./img/block7/2/1.webp", "./img/block7/2/2.webp", "./img/block7/2/3.webp"],
  ["./img/block7/3/1.webp", "./img/block7/3/2.webp", "./img/block7/3/3.webp"],
  ["./img/block7/4/1.webp", "./img/block7/4/2.webp", "./img/block7/4/3.webp", "./img/block7/4/4.webp"],
  ["./img/block7/5/1.webp", "./img/block7/5/2.webp", "./img/block7/5/3.webp"],
  ["./img/block7/6/1.webp", "./img/block7/6/2.webp", "./img/block7/6/3.webp", "./img/block7/6/4.webp", "./img/block7/6/5.webp", "./img/block7/6/6.webp", "./img/block7/6/7.webp", "./img/block7/6/8.webp", "./img/block7/6/9.webp"]
];

const isSlider = [true, false, false, true, false, true];
let desktopSwiper = null;
let mobileSwiper = null;

function showContent(index) {
  const gallery = document.getElementById("galleryContainer");
  const swiperContainer = document.getElementById("swiperContainer");
  const swiperWrapper = document.getElementById("swiperWrapper");

  gallery.innerHTML = "";
  swiperWrapper.innerHTML = "";

  const addresses = document.querySelectorAll('.address');
  addresses.forEach((el, i) => {
    el.classList.toggle('active', i === index);
  });

  if (isSlider[index]) {
    gallery.style.display = "none";
    swiperContainer.style.display = "block";

    imageSets[index].forEach(src => {
      const slide = document.createElement("div");
      slide.classList.add("swiper-slide");
      slide.innerHTML = `<img src="${src}" alt="">`;
      swiperWrapper.appendChild(slide);
    });

    if (desktopSwiper) desktopSwiper.destroy(true, true);
    desktopSwiper = new Swiper(".swiper", {
      loop: true,
      spaceBetween: 24,
      slidesPerView: 2,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      pagination: {
        el: ".swiper-pagination"
      }
    });
  } else {
    swiperContainer.style.display = "none";
    gallery.style.display = "grid";

    imageSets[index].forEach(src => {
      const img = document.createElement("img");
      img.src = src;
      img.loading = "lazy";
      gallery.appendChild(img);
    });

    if (desktopSwiper) {
      desktopSwiper.destroy(true, true);
      desktopSwiper = null;
    }
  }
}

function initMobileSlider(index, container) {
  container.innerHTML = "";
  imageSets[index].forEach(src => {
    const slide = document.createElement("div");
    slide.classList.add("swiper-slide");
    slide.innerHTML = `<img src="${src}" alt="" style="width:100%; height:auto; border-radius:16px;">`;
    container.appendChild(slide);
  });

  if (mobileSwiper) mobileSwiper.destroy(true, true);

  mobileSwiper = new Swiper(container.parentElement, {
    loop: true,
    spaceBetween: 10,
    slidesPerView: 1.4
  });

  container.parentElement.style.display = "block";
}

function destroyMobileSlider() {
  if (mobileSwiper) {
    mobileSwiper.destroy(true, true);
    mobileSwiper = null;
  }
  document.querySelectorAll(".mobile-slider-container").forEach(container => {
    container.remove();
  });
}

function resetMobileActive() {
  document.querySelectorAll(".address-mobile").forEach(el => {
    el.classList.remove("active");
  });
}

function setupMobileListeners() {
  document.querySelectorAll(".address-mobile").forEach(el => {
    el.onclick = () => {
      const idx = parseInt(el.getAttribute("data-index"));
      const activeIndex = document.querySelector(".address-mobile.active")?.getAttribute("data-index");

      if (activeIndex === idx.toString()) {
        destroyMobileSlider();
        resetMobileActive();
      } else {
        destroyMobileSlider();
        resetMobileActive();

        el.classList.add("active");

        let sliderContainer = el.nextElementSibling;
        if (!sliderContainer || !sliderContainer.classList.contains("mobile-slider-container")) {
          sliderContainer = document.createElement("div");
          sliderContainer.classList.add("mobile-slider-container");
          sliderContainer.innerHTML = `
            <div class="swiper mobile-swiper">
              <div class="swiper-wrapper mobile-slider-wrapper"></div>
            </div>
          `;
          el.parentNode.insertBefore(sliderContainer, el.nextSibling);
        }

        const wrapper = sliderContainer.querySelector(".swiper-wrapper");
        initMobileSlider(idx, wrapper);
      }
    };
  });
}

function handleResize() {
  const isMobile = window.innerWidth <= 1310;

  if (isMobile) {
    document.querySelector(".right-panel")?.style.setProperty("display", "none");
    document.getElementById("addressListMobile")?.style.setProperty("display", "block");

    destroyMobileSlider();
    resetMobileActive();
    setupMobileListeners();

    // Активируем первый адрес по умолчанию
    const firstMobileAddress = document.querySelector(".address-mobile[data-index='0']");
    if (firstMobileAddress) {
      firstMobileAddress.click();
    }
  } else {
    document.querySelector(".right-panel")?.style.setProperty("display", "block");
    document.getElementById("addressListMobile")?.style.setProperty("display", "none");

    destroyMobileSlider();
    resetMobileActive();

    showContent(0); // для десктопа тоже по умолчанию первый
  }
}

window.addEventListener("resize", handleResize);
window.addEventListener("load", () => {
  handleResize();
  if (window.innerWidth > 1310) {
    showContent(0);
  }
});



//блок8
document.addEventListener('DOMContentLoaded', () => {
  let swiper2 = null;

  function initSwiper() {
    if (!swiper2) {
      swiper2 = new Swiper('.container-card', {
        slidesPerView: 4,
        spaceBetween: 16,
        loop: true,
        breakpoints: {
      0: {
        slidesPerView: 1.6,
        spaceBetween: 16
      },
      551: {
        slidesPerView: 2.5,
      },
      820: {
        slidesPerView: 'auto',
      }
    }
      });
    }
  }

  function destroySwiper() {
    if (swiper2) {
      swiper2.destroy(true, true);
      swiper2 = null;
    }
  }

  function handleResize() {
    const width = window.innerWidth;

    if (width >= 1420) {
      destroySwiper();
      document.querySelector('.container-card').classList.remove('swiper-initialized');
    } else {
      initSwiper();
    }
  }

  window.addEventListener('resize', handleResize);
  handleResize();
});

//Burger
const content = document.querySelector('.main');
const body = document.querySelector('body');
const overlay = document.querySelector('.overlay');

if (document.querySelector('.header__burger-menu_button')) {
  let burgerBtn = document.querySelector('.header__burger-menu_button');
  let burgerMenu = document.querySelector('.navigation');
  
  burgerBtn.addEventListener('click', function () {
    burgerBtn.classList.toggle('active');
    burgerMenu.classList.toggle('active');
    overlay.classList.toggle('active');
  
    if (burgerMenu.classList.contains('active')) {
      body.classList.add('lock');
      content.classList.add('lock');
    } else {
      body.classList.remove('lock');
      content.classList.remove('lock');
    }
  });
  
  document.addEventListener('click', function (event) {
    let isClickInsideNavBar = burgerMenu.contains(event.target);
    let isClickOnBurger = burgerBtn.contains(event.target);
  
    if (
      burgerMenu.classList.contains('active') &&
      !isClickInsideNavBar && 
      !isClickOnBurger
      ) {
        burgerMenu.classList.remove('active');
        burgerBtn.classList.remove('active');
        overlay.classList.remove('active');
        body.classList.remove('lock');
        content.classList.remove('lock');
      }
  });
}


//popup

document.addEventListener('DOMContentLoaded', function () {
  const phoneInputs = document.querySelectorAll('.phone-input');

  phoneInputs.forEach(input => {
    window.intlTelInput(input, {
      initialCountry: 'ru',
      preferredCountries: ['ru', 'kz', 'by'],
      formatOnDisplay: true,
      nationalMode: false,
      autoPlaceholder: 'polite',
      utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/utils.js',
    });
  });
});

const popupMap = {
  'btn-russia': document.querySelector('.popup.russia'),
  'btn-moscow': document.querySelector('.popup.moscow'),
  'btn-other': document.querySelector('.popup.other'),
  'btn-room': document.querySelector('.popup.room'),
  'btn-investor': document.querySelector('.popup.investor'),
};

const openPopup = (popup) => {
  popup.classList.add('show');
  overlay.classList.add('active');
  body.classList.add('lock');
  if (content) content.classList.add('lock');
};

const closePopup = () => {
  document.querySelectorAll('.popup').forEach(p => p.classList.remove('show'));
  overlay.classList.remove('active');
  body.classList.remove('lock');
  if (content) content.classList.remove('lock');
};

// Назначить обработчики для каждой кнопки
Object.entries(popupMap).forEach(([btnClass, popup]) => {
  if (!popup) return;
  const btn = document.querySelector(`.${btnClass}`);
  const closeBtn = popup.querySelector('.close-btn');

  if (btn && popup && closeBtn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      openPopup(popup);
    });

    closeBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      closePopup();
    });

    popup.addEventListener('click', function (e) {
      e.stopPropagation();
    });
  }
});

// Закрытие по оверлею
overlay.addEventListener('click', closePopup);

// состояние lock корректно ?
setInterval(() => {
  const visiblePopup = document.querySelector('.popup.show');
  if (visiblePopup) {
    overlay.classList.add('active');
    body.classList.add('lock');
    if (content) content.classList.add('lock');
  }
}, 10);

//checked
document.addEventListener('DOMContentLoaded', function () {
  const popups = document.querySelectorAll('.popup');

  popups.forEach(popup => {
    const agreeCheckbox = popup.querySelector('.agree-checkbox');
    const submitBtn = popup.querySelector('.submit-btn');

    if (!agreeCheckbox || !submitBtn) {
      console.warn('Чекбокс или кнопка не найдены в одном из попапов');
      return;
    }

    function toggleSubmitState() {
      if (agreeCheckbox.checked) {
        submitBtn.classList.add('active');
        submitBtn.disabled = false;
      } else {
        submitBtn.classList.remove('active');
        submitBtn.disabled = true;
      }
    }

    toggleSubmitState();
    agreeCheckbox.addEventListener('change', toggleSubmitState);
  });
});

document.querySelectorAll('.popup .submit-btn').forEach(button => {
  button.addEventListener('click', function () {
    const popup = this.closest('.popup');
    const agreeCheckbox = popup.querySelector('.agree-checkbox');

    if (agreeCheckbox && !agreeCheckbox.checked) {
      return;
    }

    // Скрыть попап
    popup.classList.remove('show');

    // Показать "отправлено"
    const sentContainer = document.querySelector('.sent-container');
    if (sentContainer) {
      sentContainer.classList.add('show');
    }
  });
});

// Закрытие sent-контейнера по крестику
const sentCloseBtn = document.querySelector('.sent-container .close-btn');
if (sentCloseBtn) {
  sentCloseBtn.addEventListener('click', () => {
    document.querySelectorAll('.popup').forEach(p => p.classList.remove('show'));
    document.querySelector('.sent-container')?.classList.remove('show');
    overlay.classList.remove('active');
    body.classList.remove('lock');
    if (content) content.classList.remove('lock');
  });
}

// Закрытие sent-контейнера по overlay
overlay.addEventListener('click', () => {
  document.querySelectorAll('.popup').forEach(p => p.classList.remove('show'));
  document.querySelector('.sent-container')?.classList.remove('show');
  overlay.classList.remove('active');
  body.classList.remove('lock');
  if (content) content.classList.remove('lock');
});

  
//анимации блоков
document.addEventListener("DOMContentLoaded", function () {
  const blocks = document.querySelectorAll(".block2, .block3, .block4, .block5, .block6, .block7, .block8");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.10, // 10% блока должно быть видно
    }
  );

  blocks.forEach((block) => {
    observer.observe(block);
  });
});


//кондитерская

document.getElementById('goBackBtn').addEventListener('click', function () {
  if (document.referrer === "") {
    window.location.href = "index.html";
  } else {
    window.history.back();
  }
});
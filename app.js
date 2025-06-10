// паралакс
window.addEventListener('load', () => {
  const container1 = document.querySelector('.main-p');
  const container2 = document.querySelector('.block2');

  const icons1 = container1?.querySelectorAll('.parallax-img .icon') || [];
  const icons2 = container2?.querySelectorAll('.parallax-img .img-icon') || [];

  if (!container1 || !container2 || icons1.length === 0 && icons2.length === 0) return;

  // Индивидуальные глубины для каждого блока
  const depths1 = {
    icon1: 50,
    icon2: 40,
    icon3: 50,
    icon4: 20,
    icon5: 30,
    icon6: 50,
  };

  const depths2 = {
    icon1: 60,
    icon2: 45,
    icon3: 70,
    icon4: 25,
    icon5: 35,
    icon6: 40,
    icon7: 50,
    icon8: 30,
    icon9: 30,
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
        const depth = depths[className] || 30;
        const tx = posX / depth;
        const ty = posY / depth;
        element.style.transform = `translate(${tx}px, ${ty}px) ${baseTransform}`;
      }

      requestAnimationFrame(animate);
    }

    container.addEventListener('mousemove', e => {
      const rect = container.getBoundingClientRect();
      mouseX = e.clientX - rect.left - rect.width / 2;
      mouseY = e.clientY - rect.top - rect.height / 2;
    });

    animate();
  }

  initParallax(container1, icons1, depths1);
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
    icon6.style.top = `${14.5 + ( - 14.5) * ratio}%`;

    heart1.style.left = `${10.5 + (41 - 10.5) * ratio}%`;
    heart1.style.top = `${14 + (10.5 - 14) * ratio}%`;

    heart2.style.right = `${18 + (39 - 18) * ratio}%`;
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


// блок 7 адресса
const imageSets = [
  ["./img/block7/1/1.png", "./img/block7/1/2.png", "./img/block7/1/3.png", "./img/block7/1/4.png"],
  ["./img/block7/2/1.png", "./img/block7/2/2.png", "./img/block7/2/3.png"],
  ["./img/block7/3/1.png", "./img/block7/3/2.png", "./img/block7/3/3.png"],
  ["./img/block7/4/1.png", "./img/block7/4/2.png", "./img/block7/4/3.png", "./img/block7/4/4.png"],
  ["./img/block7/5/1.png", "./img/block7/5/2.png", "./img/block7/5/3.png"],
  ["./img/block7/6/1.png", "./img/block7/6/2.png", "./img/block7/6/3.png", "./img/block7/6/4.png", "./img/block7/6/5.png", "./img/block7/6/6.png", "./img/block7/6/7.png", "./img/block7/6/8.png", "./img/block7/6/9.png"]
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
  if (window.innerWidth <= 1310) {
    document.querySelector(".right-panel")?.style.setProperty("display", "none");
    document.getElementById("addressListMobile")?.style.setProperty("display", "block");

    destroyMobileSlider();
    resetMobileActive();
    setupMobileListeners();
  } else {
    document.querySelector(".right-panel")?.style.setProperty("display", "block");
    document.getElementById("addressListMobile")?.style.setProperty("display", "none");

    destroyMobileSlider();
    resetMobileActive();

    showContent(0);
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

let burgerBtn = document.querySelector('.header__burger-menu_button');
let burgerMenu = document.querySelector('.navigation');
let content = document.querySelector('.main');
let body = document.querySelector('body');
let overlay = document.querySelector('.overlay'); // ➕

burgerBtn.addEventListener('click', function () {
  burgerBtn.classList.toggle('active');
  burgerMenu.classList.toggle('active');
  overlay.classList.toggle('active'); // ➕

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

  if (!isClickInsideNavBar && !isClickOnBurger) {
    burgerMenu.classList.remove('active');
    burgerBtn.classList.remove('active');
    overlay.classList.remove('active'); // ➕
    body.classList.remove('lock');
    content.classList.remove('lock');
  }
});

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




// отступы %
function updateIconPosition() {
  const icon2 = document.querySelector('.block2 .wrapper-img .icon2');
  const icon3 = document.querySelector('.block2 .wrapper-img .icon3');
  const icon5 = document.querySelector('.block2 .wrapper-img .icon5');
  const icon6 = document.querySelector('.block2 .wrapper-img .icon6');
  const heart1 = document.querySelector('.block2 .wrapper-img .icon8');
  const heart2 = document.querySelector('.block2 .wrapper-img .icon9');
  const minWidth = 1440;
  const maxWidth = 1900;

  const minLeft2 = 19;
  const maxLeft2 = 16;

  const minTop2 = 8.8;
  const maxTop2 = 4;

  const maxRight6 = 16;
  const minRight6 = 19.2;

  const maxTop6 = 9.5;
  const minTop6 = 14.5;

  const maxLeft3 = 16;
  const minLeft3 = 19.2;

  const maxBottom3 = 9.5;
  const minBottom3 = 14.5;

  const maxBottom5 = 1;
  const minBottom5 = 8;

  const maxRight5 = 9.5;
  const minRight5 = 19.5;

  const maxTop8 = 9;
  const minTop8 = 14;

  const maxLeft8 = 6.5;
  const minLeft8 = 10.5;

  const maxBottom9 = 31;
  const minBottom9 = 35;

  const maxRight9 = 14.7;
  const minRight9 = 18;


  const width = window.innerWidth;

  // ограничим диапазон
  const clampedWidth = Math.max(minWidth, Math.min(maxWidth, width));
  const ratio = (maxWidth - clampedWidth) / (maxWidth - minWidth); // от 0 до 1
  
  const left2 = maxLeft2 + (minLeft2 - maxLeft2) * ratio;
  const top2 = maxTop2 + (minTop2 - maxTop2) * ratio;

  const left3 = maxLeft3 + (minLeft3 - maxLeft3) * ratio;
  const bottom3 = maxBottom3 + (minBottom3 - maxBottom3) * ratio;

  
  const right5 = maxRight5 + (minRight5 - maxRight5) * ratio;
  const bottom5 = maxBottom5 + (minBottom5 - maxBottom5) * ratio;

  const right6 = maxRight6 + (minRight6 - maxRight6) * ratio;
  const top6 = maxTop6 + (minTop6 - maxTop6) * ratio;

  const left8 = maxLeft8 + (minLeft8 - maxLeft8) * ratio;
  const top8 = maxTop8 + (minTop8 - maxTop8) * ratio;

  const right9 = maxRight9 + (minRight9 - maxRight9) * ratio;
  const bottom9 = maxBottom9 + (minBottom9 - maxBottom9) * ratio;
  
  icon2.style.left = `${left2}%`;
  icon2.style.top = `${top2}%`;

  icon3.style.left = `${left3}%`;
  icon3.style.bottom = `${bottom3}%`;

  icon5.style.right = `${right5}%`;
  icon5.style.bottom = `${bottom5}%`;

  icon6.style.right = `${right6}%`;
  icon6.style.top = `${top6}%`;

  heart1.style.left = `${left8}%`;
  heart1.style.top = `${top8}%`;

  heart2.style.right = `${right9}%`;
  heart2.style.bottom = `${bottom9}%`;
}

window.addEventListener('resize', updateIconPosition);
window.addEventListener('DOMContentLoaded', updateIconPosition);

// Бегущая строка
// const phrases = [
//     "все будет фиолетово",
//     "сделано в ванлав",
//     "все будет фиолетово",
//     "сделано в ванлав",
//     "все будет фиолетово",
//     "сделано в ванлав",
//     "все будет фиолетово",
//     "ванлав"
//   ];

//   function generateContent(container) {
//     phrases.forEach((text, index) => {
//       const span = document.createElement("span");
//       span.className = "text-block" + (index !== 0 ? " dot" : "");
//       span.textContent = text;
//       container.appendChild(span);
//     });
//   }
//   const content1 = document.getElementById("content1");
//   const content2 = document.getElementById("content2");

//   generateContent(content1);
//   generateContent(content2);

// const phrases = [
//   "все будет фиолетово",
//   "сделано в ванлав",
//   "все будет фиолетово",
//   "сделано в ванлав",
//   "все будет фиолетово",
//   "ванлав"
// ];

// const content = document.getElementById("content");
// const marquee = document.getElementById("marquee");
// const wrapper = document.querySelector(".marquee-wrapper");

// function createPhraseSpan(text, isDot) {
//   const span = document.createElement("span");
//   span.className = "text-block" + (isDot ? " dot" : "");
//   span.textContent = text;
//   return span;
// }

// function generateContent() {
//   const fragment = document.createDocumentFragment();
//   phrases.forEach((text, index) => {
//     fragment.appendChild(createPhraseSpan(text, index !== 0));
//   });
//   return fragment;
// }

// function fillMarquee() {
//   content.innerHTML = ""; // очищаем

//   // Добавляем минимум один набор
//   content.appendChild(generateContent());

//   // Теперь дублируем наборы, пока ширина .marquee не станет >= 2 * ширины контейнера
//   let marqueeWidth = marquee.scrollWidth;
//   const wrapperWidth = wrapper.clientWidth;

//   // дублируем контент пока ширина < 2 * wrapperWidth
//   while (marqueeWidth < wrapperWidth * 2) {
//     content.appendChild(generateContent());
//     marqueeWidth = marquee.scrollWidth;
//   }

//   // После заполнения контентом запускаем анимацию
//   startAnimation(marqueeWidth);
// }

// function startAnimation(marqueeWidth) {
//   // Скорость анимации, например 100px в секунду
//   const speed = 100;

//   // Длительность анимации в секундах = половина ширины контента (сколько мы прокручиваем) / скорость
//   const duration = (marqueeWidth / 2) / speed;

//   marquee.style.animation = `marquee ${duration}s linear infinite`;
// }

// fillMarquee();
// window.addEventListener('resize', () => {
//   marquee.style.animation = "none"; // сброс
//   fillMarquee();
// });




// блок 7 адресса
  const imageSets = [
    [
      "./img/block7/1/1.png",
      "./img/block7/1/2.png",
      "./img/block7/1/3.png",
      "./img/block7/1/4.png",
    ],
    [
      "./img/block7/2/1.png",
      "./img/block7/2/2.png",
      "./img/block7/2/3.png",
    ],
    [
      "./img/block7/3/1.png",
      "./img/block7/3/2.png",
      "./img/block7/3/3.png",
    ],
    [
      "./img/block7/4/1.png",
      "./img/block7/4/2.png",
      "./img/block7/4/3.png",
      "./img/block7/4/4.png",
    ],
    [
      "./img/block7/5/1.png",
      "./img/block7/5/2.png",
      "./img/block7/5/3.png",
    ],
    [
      "./img/block7/6/1.png",
      "./img/block7/6/2.png",
      "./img/block7/6/3.png",
      "./img/block7/6/4.png",
      "./img/block7/6/5.png",
      "./img/block7/6/6.png",
      "./img/block7/6/7.png",
      "./img/block7/6/8.png",
      "./img/block7/6/9.png",
    ]
  ];

  const isSlider = [true, false, false, true, false, true];
  let swiper = null;

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

      if (swiper) swiper.destroy(true, true);
      swiper = new Swiper(".swiper", {
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
    }
  }

  // ✅ Показать первый адрес по умолчанию
  window.onload = () => {
    showContent(0);
  };
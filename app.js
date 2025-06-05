
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

  function generateContent(container) {
    phrases.forEach((text, index) => {
      const span = document.createElement("span");
      span.className = "text-block" + (index !== 0 ? " dot" : "");
      span.textContent = text;
      container.appendChild(span);
    });
  }
  const content1 = document.getElementById("content1");
  const content2 = document.getElementById("content2");

  generateContent(content1);
  generateContent(content2);

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
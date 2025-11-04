// Массивы с изображениями
const topSliderImages = [
    './img/about/block-slider/slider1/1.png',
    './img/about/block-slider/slider1/2.png',
    './img/about/block-slider/slider1/3.png',
    './img/about/block-slider/slider1/4.png',
    './img/about/block-slider/slider1/5.png'
];

const bottomSliderImages = [
    './img/about/block-slider/slider2/1.png',
    './img/about/block-slider/slider2/2.png',
    './img/about/block-slider/slider2/3.png',
    './img/about/block-slider/slider2/4.png'
];

function createMarqueeSlider(container, images, direction) {
    // Очищаем контейнер
    container.innerHTML = '';

    // Создаем контейнер для трека
    const track = document.createElement('div');
    track.className = 'swiper-track';
    container.appendChild(track);

    // Функция для получения адаптивных размеров
    function getAdaptiveSizes() {
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;

        if (containerWidth <= 1400) {
            // Адаптивные размеры для мобильных устройств
            const slideWidth = Math.max(235, Math.min(471, containerWidth * 0.5 - 30));
            const slideHeight = containerHeight; // Высота равна высоте контейнера
            const gap = Math.max(16, Math.min(30, containerWidth * 0.04));

            return {
                slideWidth: Math.floor(slideWidth),
                slideHeight: Math.floor(slideHeight),
                gap: Math.floor(gap)
            };
        } else {
            // Десктопные размеры
            return {
                slideWidth: 471,
                slideHeight: containerHeight, // Высота равна высоте контейнера
                gap: 30
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

    // Функция для обновления размеров
    function updateSizes() {
        sizes = getAdaptiveSizes();

        // Обновляем стили трека
        track.style.gap = sizes.gap + 'px';
        track.style.height = sizes.slideHeight + 'px';

        // Обновляем стили всех слайдов
        const slides = track.querySelectorAll('.swiper-slide');
        slides.forEach(slide => {
            slide.style.width = sizes.slideWidth + 'px';
            slide.style.height = sizes.slideHeight + 'px';
            slide.style.minWidth = sizes.slideWidth + 'px';
            slide.style.minHeight = sizes.slideHeight + 'px';
        });

        // Пересчитываем общую ширину
        totalWidth = images.length * (sizes.slideWidth + sizes.gap);
    }

    // Создаем слайды
    function createSlides() {
        track.innerHTML = '';

        // Создаем основной набор слайдов
        images.forEach((src, index) => {
            const slide = document.createElement('div');
            slide.className = 'swiper-slide';
            slide.style.width = sizes.slideWidth + 'px';
            slide.style.height = sizes.slideHeight + 'px';
            slide.style.minWidth = sizes.slideWidth + 'px';
            slide.style.minHeight = sizes.slideHeight + 'px';
            slide.innerHTML = `<img src="${src}" alt="Slide ${index + 1}" loading="lazy" style="width:100%;height:100%;object-fit:cover;">`;
            track.appendChild(slide);
        });

        // Дублируем слайды для бесшовности
        images.forEach((src, index) => {
            const slide = document.createElement('div');
            slide.className = 'swiper-slide';
            slide.style.width = sizes.slideWidth + 'px';
            slide.style.height = sizes.slideHeight + 'px';
            slide.style.minWidth = sizes.slideWidth + 'px';
            slide.style.minHeight = sizes.slideHeight + 'px';
            slide.innerHTML = `<img src="${src}" alt="Slide ${index + 1}" loading="lazy" style="width:100%;height:100%;object-fit:cover;">`;
            track.appendChild(slide);
        });

        // Устанавливаем gap и высоту для трека
        track.style.gap = sizes.gap + 'px';
        track.style.height = sizes.slideHeight + 'px';
    }

    createSlides();

    let totalWidth = images.length * (sizes.slideWidth + sizes.gap);

    // === НАСТРОЙКА СКОРОСТИ ===
    const baseSpeed = 1;
    const speed = direction === 'right' ? -baseSpeed : baseSpeed;

    function animate() {
        if (!isScrolling || isDragging) {
            animationId = requestAnimationFrame(animate);
            return;
        }

        position += speed;

        // Бесшовная логика
        if (direction === 'right') {
            // Движение вправо
            if (position <= -totalWidth) {
                position += totalWidth;
            }
        } else {
            // Движение влево
            if (position >= 0) {
                position -= totalWidth;
            }
        }

        track.style.transform = `translateX(${position}px)`;
        track.style.transition = 'none';
        animationId = requestAnimationFrame(animate);
    }

    // === ПЕРЕТАСКИВАНИЕ ===
    function startDrag(e) {
        isDragging = true;
        isScrolling = false;
        dragStartX = e.clientX || (e.touches && e.touches[0].clientX);
        dragStartPosition = position;
        container.style.cursor = 'grabbing';
        e.preventDefault();
    }

    function doDrag(e) {
        if (!isDragging) return;

        const currentX = e.clientX || (e.touches && e.touches[0].clientX);
        const delta = currentX - dragStartX;
        position = dragStartPosition + delta;

        track.style.transform = `translateX(${position}px)`;
        track.style.transition = 'none';
    }

    function endDrag() {
        if (!isDragging) return;

        isDragging = false;
        isScrolling = true;
        container.style.cursor = 'pointer';

        // Корректируем позицию для бесшовности после перетаскивания
        if (direction === 'right') {
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
        const slides = track.querySelectorAll('.swiper-slide');

        slides.forEach(slide => {
            slide.addEventListener('mouseenter', () => {
                isScrolling = false;
            });

            slide.addEventListener('mouseleave', () => {
                isScrolling = true;
            });
        });

        container.addEventListener('mouseenter', () => {
            isScrolling = false;
        });

        container.addEventListener('mouseleave', () => {
            isScrolling = true;
        });
    }

    // === ИНИЦИАЛИЗАЦИЯ СОБЫТИЙ ===
    function setupEvents() {
        container.addEventListener('mousedown', startDrag);
        document.addEventListener('mousemove', doDrag);
        document.addEventListener('mouseup', endDrag);

        container.addEventListener('touchstart', startDrag, { passive: false });
        document.addEventListener('touchmove', doDrag, { passive: false });
        document.addEventListener('touchend', endDrag);

        setupHoverPause();
    }

    setupEvents();

    // Обработчик изменения размера окна
    function handleResize() {
        updateSizes();

        // Корректируем позицию после изменения размеров
        if (direction === 'right') {
            if (position > 0) position -= totalWidth;
            else if (position <= -totalWidth) position += totalWidth;
        } else {
            if (position < -totalWidth) position += totalWidth;
            else if (position >= 0) position -= totalWidth;
        }

        track.style.transform = `translateX(${position}px)`;
    }

    window.addEventListener('resize', handleResize);

    // Запуск анимации
    animate();

    // Функция для обновления слайдов
    return {
        updateImages: (newImages) => {
            images = newImages;
            createSlides();
            updateSizes();
            setupHoverPause();
        },
        destroy: () => {
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
            window.removeEventListener('resize', handleResize);
            container.removeEventListener('mousedown', startDrag);
            document.removeEventListener('mousemove', doDrag);
            document.removeEventListener('mouseup', endDrag);
            container.removeEventListener('touchstart', startDrag);
            document.removeEventListener('touchmove', doDrag);
            document.removeEventListener('touchend', endDrag);
        }
    };
}

// Инициализация после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    const topSlider = document.querySelector('.swiper-right');
    const bottomSlider = document.querySelector('.swiper-left');

    if (topSlider && bottomSlider) {
        const topSliderInstance = createMarqueeSlider(topSlider, topSliderImages, 'right');
        const bottomSliderInstance = createMarqueeSlider(bottomSlider, bottomSliderImages, 'left');

        console.log('Бесшовные слайдеры запущены!');

        window.sliderInstances = {
            top: topSliderInstance,
            bottom: bottomSliderInstance
        };
    } else {
        console.error('Не найдены контейнеры для слайдеров');
    }
});

// Обработка ошибок загрузки изображений
document.addEventListener('error', function (e) {
    if (e.target.tagName === 'IMG') {
        console.error('Ошибка загрузки изображения:', e.target.src);
        e.target.style.backgroundColor = '#000';
        e.target.style.display = 'flex';
        e.target.style.alignItems = 'center';
        e.target.style.justifyContent = 'center';
        e.target.innerHTML = '<span style="color: #999;">Изображение не загружено</span>';
    }
}, true);
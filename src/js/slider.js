const btnLeft = document.querySelector('[data-slider="arrow-left"]');
const btnRight = document.querySelector('[data-slider="arrow-right"]');
const content = document.querySelector('.slider__content');
const viewport = document.querySelector('.slider__viewport');
const sliderControls = document.querySelectorAll('.slider__control');

const sliderHandler = () => {
    const slides = [...content.querySelectorAll('.slider__item')];

    const firstSlideClone = slides[0].cloneNode(true);
    const lastSlideClone = slides.at(-1).cloneNode(true);
    content.prepend(lastSlideClone);
    content.append(firstSlideClone);
    
    let currentIndex = 1;
    let isMoving = false;

    const setSlideWidths = () => {
        const width = viewport.clientWidth;
        content.querySelectorAll('.slider__item').forEach((slide) => {
            slide.style.width = `${width}px`;
        });
    };

    const moveSlider = (animate = true) => { 
        const sliderWidth = viewport.offsetWidth;

        [...sliderControls].forEach((control, index) => {
            control.classList.remove('active');
            if (index === currentIndex - 1) {
                control.classList.add('active');
            }
        });

        content.style.transition = animate ? 'transform 0.3s ease' : 'none';
        content.style.transform = `translateX(-${currentIndex * sliderWidth}px)`;
    };

    setSlideWidths();
    moveSlider(false);

    btnRight.addEventListener('click', () => {
        if (isMoving) return;
        isMoving = true;
        currentIndex += 1;

        moveSlider();
    });

    btnLeft.addEventListener('click', () => {
        if (isMoving) return;
        isMoving = true;
        currentIndex -= 1;

        moveSlider();
    });
    content.addEventListener('transitionend', () => {
        const allSlides = content.querySelectorAll('.slider__item');

        if (currentIndex === allSlides.length - 1) {
            currentIndex = 1;
            moveSlider(false);
        }

        if (currentIndex === 0) {
            currentIndex = allSlides.length - 2;
            moveSlider(false);
        }

        isMoving = false;
    });

    window.addEventListener('resize', () => {
        setSlideWidths();
        moveSlider(false);
    });    
};

export default sliderHandler;

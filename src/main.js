import './style.css';
import renderCards from './js/render.js';
import menuHandler from './js/mobileMenu.js';
import sliderHandler from './js/slider.js';
import createModal from './js/modal.js';

const themeButtons = document.querySelectorAll('.theme-switcher__button');

const setTheme = (theme) => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
};

themeButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const theme = button.classList.contains('theme-switcher--dark')
            ? 'dark'
            : 'light';

        setTheme(theme);
    });
});

const savedTheme = localStorage.getItem('theme') || 'light';

setTheme(savedTheme);

const categoryButtons = document.querySelectorAll('[data-category]');
categoryButtons.forEach((button) => {
    if (!button) return;
    button.addEventListener('click', ({ currentTarget }) => {
        console.log('target', currentTarget, currentTarget.dataset.category)
        const category = currentTarget.dataset.category
        categoryButtons.forEach((el) => el.classList.remove('active'));
        currentTarget.classList.add('active');
        renderCards(category);
    });
});

menuHandler();

const scroll = (btn) => {
    if (document.documentElement.scrollTop > 300) {
        btn.classList.add('active');
    } else {
        btn.classList.remove('active');
    }
};

const btnUp = document.querySelector('.scroll-top');
btnUp.addEventListener('click', () => {
    window.scrollTo(0, 0);
    btnUp.classList.remove('active');
});
window.onscroll = () => scroll(btnUp);

const regex = /(?<=\/)([^/]+)(?=\.html)/g;
const pageName = window.location.pathname.includes('.html') ? window.location.pathname.match(regex)[0] : 'index';

const router = {
    index: () => { sliderHandler() },
    menu: () => {  renderCards(); }
};

window.onload = () => router[pageName]();
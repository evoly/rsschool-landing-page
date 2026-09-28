import './style.css';
import renderCards from './js/render.js';
import menuHandler from './js/mobileMenu.js';

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

menuHandler();
renderCards();

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
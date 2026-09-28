import './style.css';

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

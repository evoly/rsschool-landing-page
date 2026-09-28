const button = document.querySelector('.burger__menu');
const nav = document.querySelector('nav');
const navLinks = nav.querySelectorAll('.nav-list__item');
const logo = document.querySelector('.logo');
const body = document.querySelector('body');
const desktopWidth = window.matchMedia('(min-width: 769px)');

const classToggle = () => {
    button.classList.toggle('open');
    nav.classList.toggle('active');
    body.classList.toggle('overflow-hidden');
};

const closeMenu = () => {
    button.classList.remove('open');
    nav.classList.remove('active');
    body.classList.remove('overflow-hidden');
};

export default () => {
    button.addEventListener('click', classToggle);

    [...navLinks, logo].forEach((link) => link.addEventListener('click', (event) => {
        if (event.currentTarget.classList.contains('active')) {
            event.preventDefault();
            return;
        }

        if (nav.classList.contains('active')) {
            const href = event.currentTarget.href;
            event.preventDefault();
            closeMenu();

            setTimeout(() => {
                window.location.href = href;
            }, 300);

        }
    }));
};

desktopWidth.addEventListener('change', (event) => {
    if (event.matches) {
        closeMenu();
    }
});
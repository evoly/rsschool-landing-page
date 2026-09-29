import cards from './menu.json';
import renderModal from './modal.js'

const createEl = (el, props = {}) => Object.assign(document.createElement(el), props);
const container = document.querySelector('.menu__list');
const showMoreButton = document.querySelector('.menu__show-more');
const mobileWidth = window.matchMedia('(max-width: 768px)');
let isExpanded = false;
let currentCategory = 'coffee';


export const createCard = (data, modal = false) => {
    const card = createEl('div', { className: 'card' });
    const img = createEl('img', { src: data.image, alt: 'card image', className: 'card__img' });
    const header = createEl('h3', { className: 'card__header' });
    const content = createEl('div', { className: 'card__content' });
    const info = createEl('div', { className: 'card__info' });
    const price = createEl('div', { className: 'card__price'});
    
    header.textContent = data.name;
    info.textContent = data.description
    price.textContent = `$${data.price}`

    content.append(header, info, price);
    card.append(img, content);

    card.addEventListener('click', ({ target }) => {
        const item = target.closest('.card');
        const cardName = item.querySelector('.card__header').textContent;
        renderModal(cardName);
    });

    return card;
};

const render = () => {
    const categoryCards = cards.filter((item) => item.category === currentCategory);
    const isMobile = mobileWidth.matches;
    const visibleCards = isMobile && !isExpanded ? categoryCards.slice(0, 4) : categoryCards;
    console.log(visibleCards);

    container.replaceChildren(...visibleCards.map(createCard));

    const shouldShowButton =
        isMobile &&
        !isExpanded &&
        categoryCards.length > 4;

    showMoreButton.classList.toggle(
        'show',
        shouldShowButton
    );
};

if (showMoreButton) {
    showMoreButton.addEventListener('click', () => {
        isExpanded = true;
        render();
    });

    mobileWidth.addEventListener('change', () => {
        render();
    });
}

export default (category = 'coffee') => {
    isExpanded = false;
    currentCategory = category;
    render();
};


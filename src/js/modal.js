import cards from './menu.json';

const createEl = (el, props = {}) => Object.assign(document.createElement(el), props);

const createOptionButton = (choice, active = false) => {
  const button = createEl('button', { className: `modal__option link-button${active ? ' active' : ''}`,type: 'button',});

  const [key, value] = choice;
  console.log(isNaN(choice[0]), typeof choice[0], choice[0]);
  const name = isNaN(key) ? key : Number(key) + 1;

  const optionMark = createEl('span', { className: 'modal__option-mark', textContent: name,});
  const optionText = createEl('span', { className: 'modal__option-text', textContent: Object.values(value)[0]});

  button.dataset.price = value['add-price'];
  button.append(optionMark, optionText);

  return button;
}

const createOptionGroup = (labelText, options, activeIndex = 0, plural=false) => {
  console.log('options', options)
  const group = createEl('div', {className: 'modal__group', });
  const label = createEl('p', {className: 'modal__label', textContent: labelText, });
  const choices = createEl('div', {className: 'modal__choices',});
  choices.append(...options.map((choice, index) => createOptionButton(choice, index === activeIndex)));

  choices.addEventListener('click', ({ target }) => {
    const currentButton = target.closest('.modal__option');
    if(!plural) {
      choices.querySelector('.modal__option.active')?.classList.remove('active');
      currentButton.classList.add('active');
    } else {
      currentButton.classList.toggle('active');
    }

    calculateTotal();
    
  });

  group.append(label, choices);

  return group;
};

const calculateTotal = () => {
  const modal = document.querySelector('.modal');

  const extra = [...modal.querySelectorAll('.modal__option.active')]
    .reduce((sum, button) => {
      return sum + Number(button.dataset.price);
    }, 0);
  
  const updated =  extra + Number(modal.dataset.basePrice);
  modal.querySelector('.modal__price').textContent = `$${updated.toFixed(2)}`;
}


const rendereModal = (cardName) => {
  
  const data = cards.filter((item) => item.name === cardName)[0];
  console.log(Object.values(data.sizes))

  const modal = createEl('div', { className: 'modal overlay' });
  modal.dataset.basePrice = data.price;
  const modalInner = createEl('div', { className: 'modal__inner' });
  const img = createEl('img', { src: data.image, alt: 'card image', className: 'modal__img', width: '310', height: '310' });
  const content = createEl('div', { className: 'modal__content' });
  const contentText = createEl('div', { className: 'modal__top-line' });
  const header = createEl('h3', { className: 'modal__header', textContent: data.name});  
  const description = createEl('div', { className: 'modal__description', textContent: data.description});
  const sizeGroup = createOptionGroup('Size', Object.entries(data.sizes));
  const addsGroup = createOptionGroup('additives', Object.entries(data.additives), ...[,], true);

  const total = createEl('div', { className: 'modal__total' });
  const price = createEl('span', { className: 'modal__price', textContent: `$${data.price}` });
  const totalText = createEl('span', { className: '', textContent: `Total` });
  total.append(totalText, price);

  const closeButton = createEl('button', { className: 'modal__close link-button', type: 'button', textContent: 'Close'} );


  const info = createEl('div', { className: 'modal__info' });
  const infoText = createEl('p', { className: 'modal__info-text caption' });
  infoText.textContent = `The cost is not final. Download our mobile app to see the final price and place your order. Earn loyalty points and enjoy your favorite coffee with up to 20% discount.`;
  const infoIcon = createEl('span', { className: 'modal__info-icon', textContent: 'i' });
  info.append(infoIcon, infoText);

  contentText.append(header, description)
  content.append(contentText, sizeGroup, addsGroup, total, info, closeButton);
  modalInner.append(img, content);
  modal.append(modalInner);

  const body = document.querySelector('body');
  body.classList.add('overflow-hidden');
  body.append(modal);

  closeButton.addEventListener('click', () => {
    modal.remove();
    body.classList.remove('overflow-hidden');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove();
      body.classList.remove('overflow-hidden');
    }
  });

  window.addEventListener('keyup', (event) => {
    if (event.key === 'Escape') {
      modal.remove();
      body.classList.remove('overflow-hidden');
    }
  });

  return modal;
};

export default rendereModal;

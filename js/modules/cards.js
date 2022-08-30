import {getResource} from '../services/services';

function cards() {
  // Используем классы для карточек ============================================================================================>>

  // Создаем класс и переменные, которые нам понадобятся 
  class MenuCard {
  constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes; // Добавили rest оператор
      this.parent = document.querySelector(parentSelector);
      this.transfer = 27;
      this.changeToUAH();
  }

  // Метод для конвертации валюты
  changeToUAH() {
      this.price = this.price * this.transfer;
  }

  // Создаем динамическую верстку. 
  render() {
      const element = document.createElement('div');
      //Условие для присвоения класса. Если вдруг мы ничего не передали, то сработает параметр по умолчанию
      if (this.classes.length === 0) {
        this.element = 'menu__item';
        element.classList.add(this.element);
      } else {
        this.classes.forEach(className => element.classList.add(className)); // Присваиваем новому диву методом перебора класс
      }
      
      element.innerHTML = `
        <img src=${this.src} alt=${this.alt}>
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
        </div>
      `;
      this.parent.append(element);
    }
  }

  getResource('http://localhost:3000/menu')
    .then(data => {
      data.forEach(({img, altimg, title, descr, price}) => {
        new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
      });
    });
}

export default cards;
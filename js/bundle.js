/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
   // Calc =============================================================================================>>

  const result = document.querySelector('.calculating__result span');
  let sex, height, weight, age, ratio;

  if (localStorage.getItem('sex')) {
     sex = localStorage.getItem('sex');
  } else {
     sex = 'female';
     localStorage.setItem('sex', 'female');
  }

  if (localStorage.getItem('ratio')) {
     ratio = localStorage.getItem('ratio');
  } else {
     ratio = 1.375;
     localStorage.setItem('ratio', 1.375);
  }

  function initLocalSettings(selector, activeClass) {
     const elements = document.querySelectorAll(selector);

     elements.forEach(elem => {
        elem.classList.remove(activeClass);
        if (elem.getAttribute('id') === localStorage.getItem('sex')) {
           elem.classList.add(activeClass);
        }
        if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
           elem.classList.add(activeClass);
        }
     });
  }

  initLocalSettings('#gender div', 'calculating__choose-item_active');
  initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

  function calcTotal() {
     if (!sex || !height || !weight || !age || !ratio) {
        result.textContent = '____';
        return;
     }

     if (sex === 'female') {
        result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
     } else {
        result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
     }
  }

  calcTotal();

  function getStaticInformation(selector, activeClass) {
     const elements = document.querySelectorAll(selector);

     elements.forEach(elem => {
        elem.addEventListener('click', (e) => {
           if (e.target.getAttribute('data-ratio')) {
              ratio = +e.target.getAttribute('data-ratio');
              localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
           } else {
              sex = e.target.getAttribute('id');
              localStorage.setItem('sex', e.target.getAttribute('id'));
           }
  
           elements.forEach(elem => {
              elem.classList.remove(activeClass);
           });
  
           e.target.classList.add(activeClass);
  
           calcTotal();
        });
     });
  }

  getStaticInformation('#gender div', 'calculating__choose-item_active');
  getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

  function getDynamicInformation(selector) {
     const input = document.querySelector(selector);

     input.addEventListener('input', () => {

        if (input.value.match(/\D/g)) {
           input.style.border = '1px solid red';
        } else {
           input.style.border = 'none';
        }

        switch(input.getAttribute('id')) {
           case 'height':
              height = +input.value;
              break;
           case 'weight':
              weight = +input.value;
              break;
           case 'age':
              age = +input.value;
              break;
        }

        calcTotal();
     });
  }

  getDynamicInformation('#height');
  getDynamicInformation('#weight');
  getDynamicInformation('#age');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

  async function getResource(url) {
    let res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function forms() {
  // Forms =================================================================================================>>

  // Получаем все формы, которые у нас есть.
  const forms = document.querySelectorAll('form');

  // Временно создаем список фраз для оповщения пользователя. 
  const message = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо! Скоро мы с Вами свяжемся',
    failure: 'Что то пошло не так...'
  };

  // Берем все наши формы и под каждую из них подвязываем нашу postDate.
  forms.forEach(item => {
    bindPostData(item);
  });


  // Логика: ф-ия настраивает запрос, посылает запрос на сервер, получает какой то ответ и трансформирует ответ в json.  
  const postData = async (url, data) => {
    const res = await fetch(url, {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: data
    });

    return await res.json();
  };

  // Создаем функцию, которая будет отвечать за постинг данных. Передаем форму, потому что удобно взять и навесить обработчик событий. Submit - срабатывает каждый раз, когда мы пытаемся отправить какую то форму. Element - нужен для того, чтобы отменить стандартное поведение браузера (перезагрузку страницы).
  function bindPostData(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Динамически создаем новый блок для вывода сообщения для пользователя.
        const statusMessage = document.createElement('img');
        statusMessage.src = message.loading;
        statusMessage.style.cssText = `
          display: block;
          margin: 0 auto;
        `;
        form.insertAdjacentElement('afterend', statusMessage);

        const formData = new FormData(form); // Специальный объект, который позволяет с определенной формы сформировать данные, которые заполнил пользователь. Формат: ключ - значение.

        // Логика: берем наши данные, сначала превращаем в массив массивов, затем после превращаем в классический объект (fromEntries), а после этот объект превращаем в json. 
        const json = JSON.stringify(Object.fromEntries(formData.entries()));

        postData('http://localhost:3000/requests', json)
        .then(data => {
          console.log(data);
          showThanksModal(message.success);
          statusMessage.remove();
        }).catch(() => {
          showThanksModal(message.failure);
        }).finally(() => {
          form.reset(); // Очистка формы
        });
    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');

    prevModalDialog.classList.add('hide');
    openModal();

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
        <div class="modal__content">
              <div class="modal__close" data-close>×</div>
              <div class="modal__title">${message}</div>
        </div>
    `;

    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
        thanksModal.remove();
        prevModalDialog.classList.add('show');
        prevModalDialog.classList.remove('hide');
        closeModal();
    }, 4000);
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function modal() {
  // Modal ============================================================================================>>

  // Сначала объявляем переменные.
  const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');

  // Алгоритм такой. Понадобится всего 2 функции. Одна отвечает за открытие модалки, вторая за закрытие. Ну и нужно подвязать на несколько триггеров, чтобы функция срабатывала и на всех кнопках. Так как мы не можем на пвсевдомассив навесить обработчик событий, то нам просто нужно перебрать все кнопки через forEach.

  // Мы при клике добавляем класс "показать" и убираем класс "скрыть". Через оверфлоу убрал скролл страницы при открытом модальном окне. Можно через toggle. Для того, чтобы модалка не открывалась сама если пользователь сам кликнул и вызвал модалку мы используем clearInterval.
  function openModal () {
    modal.classList.add('show');
    modal.classList.remove('hide');
    // modal.classList.toggle('show');
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimerId);
  }

  modalTrigger.forEach(btn => {
    btn.addEventListener('click', openModal);
  });

  // Так как у нас переиспользуется функция открытия и закрытия модального окна, то мы выносим ее в отдельную функцию, чтобы оптимизировать код.

  function closeModal () {
    modal.classList.add('hide');
    modal.classList.remove('show');
    // modal.classList.toggle('show');
    document.body.style.overflow = '';
  }

  // Для того чтобы модалку можно было закрыть кликнув на область страницы используем обрабочтик событий и следим куда кликнул пользователь.
  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
        closeModal();
    }
  });

  // Чтобы закрыть модалку на нажатие кнопки ESC на клавиатуре. Для этого используем событие "keydown". Для этого мы проверяем код клавиши, на которую нажали. Для того чтобы Escape срабатывал только тогда, когда открыто модальное окно мы это прописываем в условии.
  document.addEventListener('keydown', (e) => {
    if (e.code === "Escape" && modal.classList.contains('show')) {
        closeModal();
    }
  });

  //Чтобы модалка появлялась через опредленный промежуток времени сама. Используем setTimeout.
  const modalTimerId = setTimeout(openModal, 50000);

  //Чтобы модалка открывалась, когда пользователь долистал страницу до конца. Мы можем использовать событие scroll и вешается глобально на window.  Логика: когда мы берем контент, который уже проскролили и видимый контент и при сложении они совпадают с полной прокруткой сайта, то значит пользователь долистал до конца. Тк был обнаружен баг, что модалка не видна, то в конце использовался минус 1 пиксель. Тк каждый раз модалка появляется при скролле до конца, то используем удаление обработчика события. Чтобы удалить обработчик события, то мы должны делать ссылку на функцию, которая исполнялась.
  function showModalByScroll () {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
        openModal();
        window.removeEventListener('scroll', showModalByScroll);
    }
  }

  window.addEventListener('scroll', showModalByScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider() {
  // Slider ============================================================================================>>

  let slideIndex = 1; // Индекс, который определяет текущее положение в слайдере
  let offset = 0;

  const slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slidesWrapper).width;

  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent =  `0${slideIndex}`;
  } else {
    total.textContent = slides.length;
    current.textContent =  slideIndex;
  }

  slidesField.style.width = 100 * slides.length + '%';
  slidesField.style.display = 'flex';
  slidesField.style.transition = '0.5s all';

  slidesWrapper.style.overflow = 'hidden';

  slides.forEach(slide => {
    slide.style.width = width;
  });

  slider.style.position = 'relative';

  const indicators = document.createElement('ol'),
        dots = [];
  indicators.classList.add('carousel-indicators');
  indicators.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
  `;
  slider.append(indicators);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.style.cssText = `
        box-sizing: content-box;
        flex: 0 1 auto;
        width: 30px;
        height: 6px;
        margin-right: 3px;
        margin-left: 3px;
        cursor: pointer;
        background-color: #fff;
        background-clip: padding-box;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        opacity: .5;
        transition: opacity .6s ease;
    `;
    if (i == 0) {
        dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot); // После отработки цикла, получится массив и его можно использовать
  }

  function deleteNotDigits(str) {
    return +str.replace(/\D/g, '');
  }

  next.addEventListener('click', () => {
    if (offset == deleteNotDigits(width) * (slides.length - 1)) {
        offset = 0;
    } else {
        offset += deleteNotDigits(width);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == slides.length) {
          slideIndex = 1;
      } else {
          slideIndex++;
      }

      if (slides.length < 10) {
          current.textContent =  `0${slideIndex}`;
      } else {
          current.textContent =  slideIndex;
      }

      dots.forEach(dot => dot.style.opacity = '.5');
      dots[slideIndex - 1].style.opacity = 1;
  });

  prev.addEventListener('click', () => {
    if(offset == 0){
        offset = deleteNotDigits(width) * (slides.length - 1);
    } else {
        offset -= deleteNotDigits(width);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == 1) {
        slideIndex = slides.length;
    } else {
        slideIndex--;
    }

    if (slides.length < 10) {
        current.textContent =  `0${slideIndex}`;
    } else {
        current.textContent =  slideIndex;
    }

    dots.forEach(dot => dot.style.opacity = '.5');
    dots[slideIndex - 1].style.opacity = '1';
  });

  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
        const slideTo = e.target.getAttribute('data-slide-to');
        
        slideIndex = slideTo;
        offset = deleteNotDigits(width) * (slideTo - 1);

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slides.length < 10) {
          current.textContent =  `0${slideIndex}`;
      } else {
          current.textContent =  slideIndex;
      }

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = '1';
    });
  });

  // showSlides(slideIndex);

  // if(slides.length < 10) {
  //    total.textContent = `0${slides.length}`;
  // } else {
  //    total.textContent = slides.length;
  // }

  // function showSlides(n) {
  //    if(n > slides.length) {
  //       slideIndex = 1;
  //    }

  //    if(n < 1) {
  //       slideIndex = slides.length;
  //    }

  //    slides.forEach((item) => item.style.display = 'none');

  //    slides[slideIndex - 1].style.display = 'block';

  //    if(slides.length < 10) {
  //       current.textContent = `0${slideIndex}`;
  //    } else {
  //       current.textContent = slideIndex;
  //    }
  // }

  // function plusSlides(n) {
  //    showSlides(slideIndex += n);
  // }

  // prev.addEventListener('click', () => {
  //    plusSlides(-1);
  // });

  // next.addEventListener('click', () => {
  //    plusSlides(1);
  // });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs() {
  // Tabs ============================================================================================>>

  // Получаем переменные, с которыми мы будем взаимодействовать. Будем использовать делигирование событий. 
  const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

  // Скрываем все ненужные нам Табы. Перебираем псевдомассив. Добавляем класс hide и удаляем классы show and fade. Это делается для анимации табов.
  function hideTabContent() {
    tabsContent.forEach(item => {
        item.classList.add('hide');
        item.classList.remove('show', 'fade');
    });

    // У каждого из элементов Таба удаляем класс активности.
    tabs.forEach(item => {
        item.classList.remove('tabheader__item_active');
    });   
  }

  // Эта функция показывает нам нужные табы. И добавлем класс активности. i = 0 - это позволяет нам показывать первый таб. Используется для этого параметр по умолчанию. Такая фозможность появилась в стандарте ES6. Добавляем класс show and fade и удаляем классы hide. Это делается для анимации табов.
  function showTabContent(i = 0) {
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add('tabheader__item_active');
  }

  hideTabContent();
  showTabContent();

  // Используем делигирование события. Используем обработчик события. 
  tabsParent.addEventListener('click', (event) => {
    const target = event.target; // Это если нам нужно все время использовать event.target. 

    // Определяем точно ли мы кликнули в таб. Перебираем все эелементы в псевдомассиве, чтобы понять в какой мы клацнули и какой нужно показать. Два аргумента: таб и номер элемента по порядку. Если эелемент, в который мы кликнули, будет совпадать с элементом, который мы перебираем, то мы вызываем две наши функции.
    if (target && target.classList.contains('tabheader__item')) {
        tabs.forEach((item, i) => {
          if (target == item) {
              hideTabContent();
              showTabContent(i);
          }
        });
    }
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer() {
  // Timer ============================================================================================>>

  // Переменная, которая определяет дэдлайн. Наша отправная точка.
  const deadline = '2022-09-10';

  // Функция, которая определяет разницу между дэдлайном и текущим временем.
  function getTimeRemaining(endtime) {
    let days, hours, minutes, seconds;
    const t = Date.parse(endtime) - Date.parse(new Date()); // Метод, который используется для превращения строки во что то числовое. Получаем кол-во мс. 

    if (t <= 0) {
        days = 0;
        hours = 0;
        minutes = 0;
        seconds = 0;
    } else {
        days = Math.floor(t / (1000 * 60 * 60 * 24)), // Округляем до ближайшего целого. Берем общее кол-во мс и делим на(Получаем кол-во мс в минуте, потом  в одном часе и потом в сутках)
        hours = Math.floor((t / (1000 * 60 *60) % 24)), // Округляем. Берем общее кол-во мс. Делим на кол-во мс в одном часе. % - оператор возвращает остаток от деления. Получаем таким образом хвостик.
        minutes = Math.floor((t / 1000 / 60) % 60), // Округляем. Берем общее кол-во мс. Делим на кол-во мс в одной минуте. Получаем таким образом хвостик.
        seconds = Math.floor((t / 1000) % 60); //Округляем. Берем общее кол-во мс. Делим на кол-во мс в одной секунде. Получаем таким образом хвостик.
    }
    
    // Возвращаем объект. 
    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
  }

  // Функция, которая подставляет ноль к числу в таймере для эстетики. 
  function getZero(num) {
    if (num >= 0 && num < 10) {
        return `0${num}`;
    } else {
        return num;
    }
  }


  // Функция, которая устанавливает наши часы прямо на страницу. Получаем все элементы со страницы. 
  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
          days = timer.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds'),
          timeInterval = setInterval(updateClock, 1000); // Запускаем таймер, который запускает функцию каждую секунду. Таймер же обновляется.

    updateClock(); // Функция запускается здесь для того, чтобы убрать мигание при перезагрузке страницы.

    // Обновление наших часов. 
    function updateClock() {
        const t = getTimeRemaining(endtime); // Рассчитываем то время, которое у нас осталось. Тот дэдлайн, который мы передаем выше.

        // Помещаем рассчитанное время прямо на страницу.  
        days.innerHTML = getZero(t.days); //Кол-во дней, которые нужно отобразить
        hours.innerHTML = getZero(t.hours); //Кол-во часов, которые нужно отобразить
        minutes.innerHTML = getZero(t.minutes); //Кол-во минут, которые нужно отобразить
        seconds.innerHTML = getZero(t.seconds); //Кол-во секунд, которые нужно отобразить

        // Если время вышло, то таймер не обновляем, а просто его останавливаем. 
        if (t.total <= 0) {
          clearInterval(timeInterval);
        }
    }
  }

  setClock('.timer', deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");






  

window.addEventListener('DOMContentLoaded', () => {

   (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])();
   (0,_modules_calc__WEBPACK_IMPORTED_MODULE_1__["default"])(); 
   (0,_modules_cards__WEBPACK_IMPORTED_MODULE_2__["default"])();
   (0,_modules_forms__WEBPACK_IMPORTED_MODULE_3__["default"])();
   (0,_modules_modal__WEBPACK_IMPORTED_MODULE_4__["default"])();
   (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])();
   (0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])();
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map
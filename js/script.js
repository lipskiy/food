window.addEventListener('DOMContentLoaded', () => {
   // Tabs

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

   // Timer

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

   // Два аргумента. Селектор и дэдлайн. 
   setClock('.timer', deadline);

   // Modal 

   // Сначала объявляем переменные.
   const modalTrigger = document.querySelectorAll('[data-modal]'),
         modal = document.querySelector('.modal'),
         modalCloseBtn = document.querySelector('[data-close]');

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

   modalCloseBtn.addEventListener('click', closeModal);

   // Для того чтобы модалку можно было закрыть кликнув на область страницы используем обрабочтик событий и следим куда кликнул пользователь.
   modal.addEventListener('click', (e) => {
      if (e.target === modal) {
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
   // const modalTimerId = setTimeout(openModal, 15000);

   //Чтобы модалка открывалась, когда пользователь долистал страницу до конца. Мы можем использовать событие scroll и вешается глобально на window.  Логика: когда мы берем контент, который уже проскролили и видимый контент и при сложении они совпадают с полной прокруткой сайта, то значит пользователь долистал до конца. Тк был обнаружен баг, что модалка не видна, то в конце использовался минус 1 пиксель. Тк каждый раз модалка появляется при скролле до конца, то используем удаление обработчика события. Чтобы удалить обработчик события, то мы должны делать ссылку на функцию, которая исполнялась.
   function showModalByScroll () {
      if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
         openModal();
         window.removeEventListener('scroll', showModalByScroll);
      }
   }

   window.addEventListener('scroll', showModalByScroll);

   // Используем классы для карточек 

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

   new MenuCard(
      "img/tabs/vegy.jpg",
      "vegy",
      'Меню "Фитнес"',
      'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
      9,
      ".menu .container"
   ).render();

   new MenuCard(
      "img/tabs/elite.jpg",
      "elite",
      'Меню “Премиум”',
      'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
      14,
      ".menu .container"
   ).render();

   new MenuCard(
      "img/tabs/post.jpg",
      "post",
      'Меню "Постное"',
      'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
      21,
      ".menu .container"
   ).render();

   // Forms

   // Получаем все формы, которые у нас есть.
   const forms = document.querySelectorAll('form');

   // Временно создаем список фраз для оповщения пользователя. 
   const message = {
      loading: 'Загрузка...',
      success: 'Спасибо! Скоро мы с Вами свяжемся',
      failure: 'Что то пошло не так...'
   };

   // Берем все наши формы и под каждую из них подвязываем нашу postDate.
   forms.forEach(item => {
      postData(item);
   });

   // Создаем функцию, которая будет отвечать за постинг данных. Передаем форму, потому что удобно взять и навесить обработчик событий. Submit - срабатывает каждый раз, когда мы пытаемся отправить какую то форму. Element - нужен для того, чтобы отменить стандартное поведение браузера (перезагрузку страницы).
   function postData(form) {
      form.addEventListener('submit', (e) => {
         e.preventDefault();

         // Динамически создаем новый блок для вывода сообщения для пользователя.
         const statusMessage = document.createElement('div');
         statusMessage.classList.add('status');
         statusMessage.textContent = message.loading;
         form.appendChild(statusMessage);

         const request = new XMLHttpRequest();
         request.open('POST', 'server.php'); // Для настройки запроса.

         // request.setRequestHeader('Content-type', 'multipart/form-data'); // Настройка заголовков. Когда используем связку XMLHttpRequest и form-data нам заголовок устанавливать не нужно. Он устанавливется автоматически. Из за такой ошибки сервер может не получить от нас данные.ЭТО ВАЖНО!
         // request.setRequestHeader('Content-type', 'application/json'); // Если вдруг нам нужен формат JSON.
         const formData = new FormData(form); // Специальный объект, который позволяет с определенной формы сформировать данные, которые заполнил пользователь. Формат: ключ - значение.

         request.send(formData); // Отправка данных с помощью метода send.

         request.addEventListener('load', () => {
            if (request.status === 200) {
               console.log(request.response);
               statusMessage.textContent = message.success;
               form.reset(); // Очистка формы
               setTimeout(() => {
                  statusMessage.remove();
               }, 2000); // Удаляет блок с сообщением со страницы.
            } else {
               statusMessage.textContent = message.failure;
            }
         }); // Отслеживаем конечную загрузку нашего запроса.
      });
   }

});
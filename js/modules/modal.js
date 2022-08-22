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

module.exports = modal;
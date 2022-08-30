import {closeModal, openModal} from './modal';
import {postData} from '../services/services';

function forms(formSelector, modalTimerId) {
  // Forms =================================================================================================>>

  // Получаем все формы, которые у нас есть.
  const forms = document.querySelectorAll(formSelector);

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
    openModal('.modal', modalTimerId);

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
        closeModal('.modal');
    }, 4000);
  }
}

export default forms;
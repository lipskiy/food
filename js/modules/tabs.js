function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
  // Tabs ============================================================================================>>

  // Получаем переменные, с которыми мы будем взаимодействовать. Будем использовать делигирование событий. 
  const tabs = document.querySelectorAll(tabsSelector),
        tabsContent = document.querySelectorAll(tabsContentSelector),
        tabsParent = document.querySelector(tabsParentSelector);

  // Скрываем все ненужные нам Табы. Перебираем псевдомассив. Добавляем класс hide и удаляем классы show and fade. Это делается для анимации табов.
  function hideTabContent() {
    tabsContent.forEach(item => {
        item.classList.add('hide');
        item.classList.remove('show', 'fade');
    });

    // У каждого из элементов Таба удаляем класс активности.
    tabs.forEach(item => {
        item.classList.remove(activeClass);
    });   
  }

  // Эта функция показывает нам нужные табы. И добавлем класс активности. i = 0 - это позволяет нам показывать первый таб. Используется для этого параметр по умолчанию. Такая фозможность появилась в стандарте ES6. Добавляем класс show and fade и удаляем классы hide. Это делается для анимации табов.
  function showTabContent(i = 0) {
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add(activeClass);
  }

  hideTabContent();
  showTabContent();

  // Используем делигирование события. Используем обработчик события. 
  tabsParent.addEventListener('click', (event) => {
    const target = event.target; // Это если нам нужно все время использовать event.target. 

    // Определяем точно ли мы кликнули в таб. Перебираем все эелементы в псевдомассиве, чтобы понять в какой мы клацнули и какой нужно показать. Два аргумента: таб и номер элемента по порядку. Если эелемент, в который мы кликнули, будет совпадать с элементом, который мы перебираем, то мы вызываем две наши функции. Метод slice() - сформирует новую строку без 1 символа в данном случае. 
    if (target && target.classList.contains(tabsSelector.slice(1))) {
        tabs.forEach((item, i) => {
          if (target == item) {
              hideTabContent();
              showTabContent(i);
          }
        });
    }
  });
}

export default tabs;
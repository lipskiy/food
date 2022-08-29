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

export default timer;
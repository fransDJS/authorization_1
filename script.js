// Получаем ссылку на форму и элемент для вывода сообщений
const form = document.getElementById('login-form');
const message = document.getElementById('message');

// Добавляем обработчик события отправки формы
form.addEventListener('submit', async (e) => {
  e.preventDefault(); // Отменяем стандартное поведение (перезагрузку страницы)

  // Получаем значения полей email и password из формы
  const email = form.email.value;
  const password = form.password.value;

  console.log('Форма отправлена');
  console.log('Введен email:', email);
  // Пароль не выводим в явном виде для безопасности
  console.log('Введен пароль:', password ? '***' : '(пустой');

  // Показываем пользователю, что данные отправляются 
  message.style.color = 'white';
  message.textContent = 'Отправляем данные...';

  try {
    // Логируем начало отправки запроса
    console.log('Отправляем POST-запрос на https://reqres.in/api/login');

    // Отправляем POST-запрос на сервер с email и паролем в теле запроса
    const response = await fetch('https://reqres.in/api/login',{
      method: 'POST', // Метод запроса
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'reqres-free-v1'
       }, // Тип данных в теле запроса
      body: JSON.stringify({ email, password }) // Преобразуем объект в JSON-строку
    });

    // Логируем статус ответа сервера
    console.log('Ответ получен, статус:', response.status);

    //Проверяем, успешен ли ответ (статус 200-299)
    if (!response.ok) {
      console.log('Ошибка! Статус не OK');
      // Если ошибка, получаем сообщение из тела ответа
      const errorData = await response.json();
      console.error('Ошибка от сервера:', errorData.error);
      // Выбрасываем ошибку, чтобы перейти в блок catch
      throw new Error(errorData.error || 'Ошибка авторизации');
    }

    // Если ответ успешный, парсим JSON с данными
    const data = await response.json();
    console.log('Данные из ответа', data);

    // Сохраняем полученный токен в localStorage для дальнейшего использования
    localStorage.setItem('authToken', data.token);
    console.log('Токен сохранён в localStorage:', data.token);

     // Показываем пользователю сообщение об успешном входе
     message.style.color = 'lightgreen';
     message.textContent = 'Успешный вход! Токен сохранен.';

     // Здесь можно добавить логику перехода на другую страницу или обновления интерфейса
    console.log('Авторизация прошла успешно');

  } catch (error) {
    // Логируем ошибку, если что-то пошло не так
      console.error('Ошибка в блоке catch', error);
      // Показываем пользователю сообщение об ошибке
      message.style.color = 'tomato';
      message.textContent = error.message;
  }
})
const button = document.querySelector('.button'); // Выбираем кнопку с классом 'button'
const counter = document.querySelector('.counter'); // Выбираем элемент с классом 'counter'
const adminButton = document.querySelector('.admin-button'); // Выбираем кнопку с классом 'admin-button'
const mainButton = document.querySelector('#mainButton'); // Выбираем главную кнопку по ID

// Получаем количество кликов из LocalStorage
let count = localStorage.getItem('clickCount'); 
if (count === null) {
    count = 0; // Если значение не найдено, устанавливаем счетчик в 0
} else {
    count = parseInt(count); // Преобразуем строку из localStorage в число
}

// Получаем информацию о покупках из localStorage
let purchasedItems = localStorage.getItem('purchasedItems');
if (purchasedItems === null) {
    purchasedItems = {}; // Если нет информации, создаем пустой объект
} else {
    purchasedItems = JSON.parse(purchasedItems); // Преобразуем строку в объект
}

counter.textContent = count; // Устанавливаем текст счетчика на начальное значение

button.addEventListener('click', () => {
    count++; // Увеличиваем счетчик при нажатии на кнопку
    counter.textContent = count; // Обновляем текст счетчика
    localStorage.setItem('clickCount', count); // Сохраняем счетчик в localStorage
});

// Добавленный код для меню-кнопки и наложения
const menuButton = document.querySelector('.menu-button'); // Выбираем кнопку меню
const overlay = document.querySelector('.overlay'); // Выбираем наложение
const closeButton = document.querySelector('.close-button'); // Выбираем кнопку закрытия меню

let generatedCode = null; // Переменная для хранения сгенерированного кода

menuButton.addEventListener('click', async () => {
    overlay.style.display = 'block'; // Показываем наложение
    closeButton.style.display = 'block'; // Показываем кнопку закрытия
    adminButton.style.display = 'block'; // Показываем кнопку админа

    // Получение IP и генерация кода при открытии меню
    try {
        const ipAddress = await getIPAddress(); // Получаем IP-адрес
        generatedCode = localStorage.getItem(`code-${ipAddress}`); // Получаем код из localStorage по ключу, составленному из IP
        if (!generatedCode) {
            generatedCode = generateCode(); // Если код не найден, генерируем новый
            localStorage.setItem(`code-${ipAddress}`, generatedCode); // Сохраняем сгенерированный код в localStorage
        }
        const codeElement = createCodeElement(generatedCode); // Создаем элемент для отображения кода
        adminButton.parentNode.appendChild(codeElement); // Добавляем элемент с кодом под кнопкой админа
    } catch (error) {
        console.error('Ошибка:', error); // Выводим ошибку в консоль
        alert('Не удалось получить IP-адрес!'); // Выводим сообщение об ошибке
    }
});

closeButton.addEventListener('click', () => {
    overlay.style.display = 'none'; // Скрываем наложение
    closeButton.style.display = 'none'; // Скрываем кнопку закрытия
    adminButton.style.display = 'none'; // Скрываем кнопку админа

    // Удаление элемента с кодом при закрытии меню
    const codeElement = document.querySelector('.code-element');
    if (codeElement) {
        codeElement.remove(); // Удаляем элемент с кодом, если он существует
    }
});

adminButton.addEventListener('click', () => {
    const password = prompt("Введите пароль:"); // Запрашиваем пароль у пользователя
    if (password === "61826") { // Проверяем, совпадает ли пароль
        // Пароль верный, показываем кнопки 1 и 2
        const adminPanel = document.createElement('div'); // Создаем новый div для панели админа
        adminPanel.classList.add('admin-panel'); // Добавляем класс 'admin-panel'

        const button1 = document.createElement('button'); // Создаем кнопку 1
        button1.textContent = '1'; // Устанавливаем текст кнопки 1
        button1.addEventListener('click', () => {
            // Проверяем, не превышает ли баланс лимит
            if (count + 9999999999999 <= 99999999999999) {
                count += 9999999999999; // Увеличиваем счетчик на 9999999999999
                counter.textContent = count; // Обновляем текст счетчика
                localStorage.setItem('clickCount', count); // Обновляем счетчик в localStorage
            } else {
                alert("Максимальный баланс достигнут!"); // Выводим сообщение, если баланс достигнут
            }
        });

        const button2 = document.createElement('button'); // Создаем кнопку 2
        button2.textContent = '2'; // Устанавливаем текст кнопки 2
        button2.addEventListener('click', () => {
            // TODO: логика для добавления 100 монет всем
            // например, можно использовать AJAX-запрос на сервер
        });


export const utils = {
    storeToStorage,
    loadFromStorage,
    getRandomInt,
    makeId,
    loadFromSessionStorage,
    storeToSessionStorage,
    removeFromStorage,
    removeFromSessionStorage,
    dateToString,
    getWeatherIconLink
}

function removeFromStorage() {
    localStorage.claer();
}
function storeToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value || null));
}

function loadFromStorage(key) {
    let data = localStorage.getItem(key);
    return (data) ? JSON.parse(data) : undefined;
}

function loadFromSessionStorage(key) {
    let data = sessionStorage.getItem(key);
    return (data) ? JSON.parse(data) : undefined;
}

function storeToSessionStorage(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value || null));
}

function removeFromSessionStorage(key) {
    sessionStorage.removeItem(key);
}

function getRandomInt(num1, num2) {
    var max = (num1 >= num2) ? num1 : num2;
    var min = (num1 <= num2) ? num1 : num2;
    return (Math.floor(Math.random() * (max - min)) + min);
}

function makeId(length = 10) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var id = '';
    for (let i = 0; i < length; i++) {
        id += chars[getRandomInt(0, chars.length)];
    }
    return id;
}

function dateToString(date) {
    return date.toLocaleDateString('en', { year: 'numeric', month: 'short', day: 'numeric' })
}

function getWeatherIconLink(iconNumber: number) {
    let str = iconNumber > 9 ? iconNumber : `0${iconNumber}`;
    return `https://developer.accuweather.com/sites/default/files/${str}-s.png`
}
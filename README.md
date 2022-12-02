# Puppeteer Express React App

## Starting Instructions

In the project directory, you can run:

### `npm install`

Install all dependencies for server

### `npm start`

Runs the backend server

### `cd client`

Move to client app directory

### `npm install`

Install all dependencies for React app

### `npm run dev`

Run Client App on http://localhost:5173/

**Puppeteer scripts run through beckend-server**

### Проблеми

 - Через те що Amazon для переходу на checkout вимогає бути залогіненим, останній пункт з обов'язкових (перехід на checkout Амазону) має ще додатковий крок - 
 спочатку перехід на сторінку логіну. На жаль, врахував цей момент надто пізно і вже не було можливості якось все переробляти/доробляти
 - При переході на сторінку вибору формату для вибраної книги, більшість (якщо не всі) не доступні для доставки в регіон України від так закритий перехід на
 checkout. Пробував реалізувавти вибір регіону в ручну, але забракло часу докінця його зробити, тому за замовчуванню стоть Канада
 - Не вистачило часу добавити адаптивну верстку (надіюсь це не був один з головних критеріїв успішності завдання)

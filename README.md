# ProjectPASS

Привет! Project PASS - это простой менеджер паролей.

Я использовал следующие технологии:
- AngularJS
- Node.js
- Electron
- jQuery
- LESS

Чтобы собрать приложение в полноценный билд, необходимо, для начала иметь установленный Node.js, это очень просто.
Далее, необходимо будет глобально установить electron-prebuilt и electron-packager:

<code>npm i -g electron-prebuilt</code><br>
<code>npm i -g electron-packager</code>

Потом нужно перейти в директорию, например, D:\Username\Project PASS, для Windows:

<code>cd D:\Username\Project PASS</code><br>

и запустить установку:

<code>npm run build</code>

Далее приложение соберется и будет доступно в папке Dist. Пока только для Windows.

P.S. Если при запуске будет ругаться на отсутствие модуля 'open', то скопируйте папку node_modules из папки с исходным кодом
и поместите ее в директорию ProjectPASS-win32-x64\resources\app.

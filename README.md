 # Домашнее задание: автотесты
  ## Запуск проекта
```
git clone https://github.com/Coudnet/shri-testing-homework.git
cd shri-testing-homework.git
npm i
npm i --save-dev mocha
npm i --save-dev chai
npm start
```
    
  ## Запуск интеграционных тестов Windows
```
npm run selenium
npm run hermione
```

  ## Интеграционный тест
  
   - Главная страница
     - На главной отображается 20 элементов .commit
     - На главной правильный breadcrumb, равный 'HISTORY'
     
   - Страница /files
     - На старнице коммита 1bd9b4848866f8d83cbb45b45193c695ffebb282 отображается элемент .files-list
     - Breadcrumbs - HISTORY / ROOT
     - На странице 1bd9b4848866f8d83cbb45b45193c695ffebb282/public отображается элемент .files-list
     - Breadcrumbs - HISTORY / ROOT / public
   
   - Страница файла .gitignore коммита 1bd9b4848866f8d83cbb45b45193c695ffebb282/ 
     - На странице отображается элемент .file-conten
     - Breadcrumb HISTORY / ROOT / .gitignore
     
   - Переходы с каждой страницы определяются как верный url после клика по нужной ссылке
     - С главной на страницу с файловым деревом
     - Со страницы файлового дерева на файл
     - Со страницы файлового дерева на папку
    
  
  ## Описание логических блоков
   - ``gitHistory`` - git.js
     - Получить коммиты в пустом репозитории
     - Получить все коммиты на первой странице
     - Остальные сценарии, как мне кажется, тестировать бессмысленно, потому что там
     меняется только page и size, и они имеют влияние только внутри реали
     зации executeGit. А executeGit - stub
   - ``gitFileTree`` - git.js
     - Получение списка файлов в корне
     - Получение списка файлов во вложенном каталоге
   - ``gitFileContent`` - git.js
     - Получение текстового содержимого файла
   
   - ``buildBreadcrumbs`` - navigation.js - формирует хлебные крошки
     - На главной странице отображается только HISTORY
     - На странице файлового дерева отображается HISTORY / ROOT / [path]
     - На странице файла отображается HISTORY / ROOT / path / filename
   
   - ``indexController`` - 
   - ``filesController`` - 
   - ``contentController`` -
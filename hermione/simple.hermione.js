const assert = require('assert');

describe('Интеграционные тесты сайта отображающиего коммиты', () => {
    describe('Тест отображения главной страницы', () => {
        it('На главной странице должны отображаться 20 коммитов', function () {
            return this.browser
                .url('/')
                .elements('.commit')
                .then((commits) => {
                    assert.equal(commits.value.length, 20, 'На главной странице не отобразилось 20 коммитов');
                });
        });

        it('На главной странице хлебные крошки должны быть HISTORY', function () {
            return this.browser
                .url('/')
                .getText('.breadcrumbs')
                .then((text) => {
                    assert.equal(text, 'HISTORY', 'Хлебные крошки на главной не равны HISTORY');
                });
        })
    });

    describe('Тест отображения страницы файловой системы', () => {
        it('Должна открыться страница для файловой системы корня коммита', function () {
            return this.browser
                .url('/files/1bd9b4848866f8d83cbb45b45193c695ffebb282/')
                .isExisting('.files-list')
                .then((exists) => {
                    assert.ok(exists, 'Страница для файловой системы корня коммита не открылась. Отсутствует элемент .files-list');
                });
        });

        it('На странице файловой системы корня коммита breadcrumb = HISTORY / ROOT', function () {
            return this.browser
                .url('/files/1bd9b4848866f8d83cbb45b45193c695ffebb282/')
                .getText('.breadcrumbs')
                .then((text) => {
                    assert.equal(text, 'HISTORY / ROOT', 'Хлебные крошки на странице файловой системы от корня коммита не равны HISTORY / ROOT');
                });
        });

        it('Должна открыться страница для файловой системы с путем /public от корня коммита', function () {
            return this.browser
                .url('/files/1bd9b4848866f8d83cbb45b45193c695ffebb282/public')
                .isExisting('.files-list')
                .then((exists) => {
                    assert.ok(exists, 'Страница для файловой системы с путем /public от корня коммита не открылась. Отсутствует элемент .files-list');
                });
        });

        it('На странице файловой системы с путем /public от корня коммита breadcrumb = HISTORY / ROOT / public', function () {
            return this.browser
                .url('/files/1bd9b4848866f8d83cbb45b45193c695ffebb282/public')
                .getText('.breadcrumbs')
                .then((text) => {
                    assert.equal(text, 'HISTORY / ROOT / public', 'Хлебные крошки на странице файловой системы с путем /public от корня коммита не равны HISTORY / ROOT');
                });
        })
    });

    describe('Тест отображения страницы с файлом', () => {
        it('Должна открыться страница с файлом .gitignore', function () {
            return this.browser
                .url('/content/1bd9b4848866f8d83cbb45b45193c695ffebb282/.gitignore')
                .isExisting('.file-content')
                .then((exists) => {
                    assert.ok(exists, 'Страница для файла .gitignore не открылась');
                });
        });

        it('На странице файла .gitignore хлебные крошки breadcrumb = HISTORY / ROOT / .gitignore', function () {
            return this.browser
                .url('/content/1bd9b4848866f8d83cbb45b45193c695ffebb282/.gitignore')
                .getText('.breadcrumbs')
                .then((text) => {
                    assert.equal(text, 'HISTORY / ROOT / .gitignore', 'Хлебные крошки на странице файла .gitignore не равны HISTORY / ROOT / .gitignore');
                });
        })
    });

    describe('Тест перехода по ссылке коммита с главной страницы на страницу файлового дерева', () => {
        it('По клику на первом коммите должна загрузить страница дерева', function () {
            let hash = null;
            return this.browser
                .url('/')
                .getText('.commit__link a')
                .then((text) => {
                    hash = text[0];
                })
                .click('.commit__link a')
                .getUrl()
                .then((url) => {
                    let path = url.split('/').filter(Boolean).slice(2);
                    let res = (path[0] === 'files') && (path[1] === hash);
                    assert(res, `Переход по ссылке с главной на сраницу не прошел. Страница не имеет ожидаемого url`);
                });
        });
    });

    describe('Тест переходов на странице дерева', () => {
        it('По клику на .gitignore должна открыться страница с файлом', function () {
            return this.browser
                .url('/files/1bd9b4848866f8d83cbb45b45193c695ffebb282/')
                .click('li:first-child a')
                .getUrl()
                .then((url) => {
                    let path = url.split('/').filter(Boolean).slice(2);
                    let res = (path[0] === 'content') && (path[1] === '1bd9b4848866f8d83cbb45b45193c695ffebb282') && (path[2] === '.gitignore');
                    assert(res, `Переход по ссылке на .gitignore не прошел. Страница не имеет ожидаемого url или не открылась`);
                });
        });

        it('По клику на .views должна открыться страница с файловым деревом по пути {hash}/views', function () {
            return this.browser
                .url('/files/1bd9b4848866f8d83cbb45b45193c695ffebb282/')
                .click('li:last-child a')
                .getUrl()
                .then((url) => {
                    let path = url.split('/').filter(Boolean).slice(2);
                    let res = (path[0] === 'files') && (path[1] === '1bd9b4848866f8d83cbb45b45193c695ffebb282') && (path[2] === 'views');
                    assert(res, `Переход по ссылке на views не прошел. Страница не имеет ожидаемого url или не открылась`);
                });
        });
    });
});
const assert = require('assert');

describe('Конвертер валют', () => {
    it('Должен появиться на странице', function() {
        return this.browser
            .url('http://yandex.ru')
            .keys(['курс доллара к рублю', '\uE007'])
            .isExisting('.converter-form')
            .then((exists) => {
                assert.ok(exists, 'Конвертер валют появился')
            });
    })
});
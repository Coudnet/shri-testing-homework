let chai = require('chai');
let contentController = require('../controllers/contentController');

describe('contentController', () => {
    describe('contentController(req, res, next)', () => {
        it('Должен вернуть объект ответа', (done) => {
            let res = {
                render(title, body) {
                    this.foo = 'foo'
                }
            }
            contentController(res, fun).should.equal("foo")
        });
    });
});
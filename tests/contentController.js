const {expect} = require('chai');
const sinon = require('sinon');
const contentController = require('../controllers/contentController');

it('Обработка входящего запроса на странице файла .gitignore', async function () {
    const render = sinon.spy();
    const req = {
        params: {
            '0': '.gitignore',
            hash: '1bd9b4848866f8d83cbb45b45193c695ffebb282'
        }
    };
    await contentController(req, {render: render});
    expect(render.called).to.be.true;
    expect(render.args[0][1].content).to.eql('node_modules');
})
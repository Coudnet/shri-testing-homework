const {expect} = require('chai');
const sinon = require('sinon');
const filesController = require('../controllers/filesController');

it('Обработка входящего запроса на странице папки public', async function () {
    const render = sinon.spy();
    const req = {
        params: {
            '0': 'public',
            hash: '1bd9b4848866f8d83cbb45b45193c695ffebb282'
        }
    };
    await filesController(req, {render: render});
    expect(render.called).to.be.true;
    expect(render.args[0][1].files.length).to.eql(1);
})
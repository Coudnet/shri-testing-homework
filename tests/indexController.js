const {expect} = require('chai');
const sinon = require('sinon');
const indexController = require('../controllers/indexController');

it('Обработка входящего запроса на главной странице', async function () {
    const render = sinon.spy();
    await indexController({}, {render: render});
    expect(render.called).to.be.true;
    expect(render.args[0][1].list.length).to.eql(20);
})
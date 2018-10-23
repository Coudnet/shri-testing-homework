const {expect} = require('chai');
const {buildBreadcrumbs} = require('../utils/navigation');

describe('Формирование Breadcrumbs', function () {
   it('На главной странице отображается только HISTORY', function () {
        let breadcrumbs = buildBreadcrumbs();

        expect(breadcrumbs).to.have.lengthOf(1);
        expect(breadcrumbs[0].text).to.eql('HISTORY');
   });

    it('На странице файлового дерева отображается HISTORY / ROOT / [path]', function () {
        const hash = 'hash';
        const firstFolder = 'firstFolder';
        const secondFolder = 'secondFolder';
        const path = [firstFolder, secondFolder].join('/');

        let breadcrumbs = buildBreadcrumbs(hash, path);

        expect(breadcrumbs).to.have.lengthOf(4);
        expect(breadcrumbs[0].text).to.eql('HISTORY');
        expect(breadcrumbs[1].text).to.eql('ROOT');
        expect(breadcrumbs[2].text).to.eql(firstFolder);
        expect(breadcrumbs[3].text).to.eql(secondFolder);
    });

    it('На странице файла отображается HISTORY / ROOT / path / filename', function () {
        const hash = 'hash';
        const firstFolder = 'firstFolder';
        const secondFolder = 'secondFolder';
        const file = '.gitignore';
        const path = [firstFolder, secondFolder, file].join('/');

        let breadcrumbs = buildBreadcrumbs(hash, path);

        expect(breadcrumbs).to.have.lengthOf(5);
        expect(breadcrumbs[0].text).to.eql('HISTORY');
        expect(breadcrumbs[1].text).to.eql('ROOT');
        expect(breadcrumbs[2].text).to.eql(firstFolder);
        expect(breadcrumbs[3].text).to.eql(secondFolder);
        expect(breadcrumbs[4].text).to.eql(file);
    })
});
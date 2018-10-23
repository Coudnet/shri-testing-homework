const {expect} = require('chai');
const sinon = require('sinon');
const {gitHistory, gitFileTree, gitFileContent} = require('../utils/git');

describe('Взаимодействие с git', () => {
    describe('Получение истории коммитов с помощью функции gitHistory', () => {
        it('Получить коммиты в пустом репозитории', async () => {
            const executeGit = function () {
                return Promise.resolve('');
            };
            const parseHistoryItem = sinon.spy();

            await gitHistory(1, 10, executeGit, parseHistoryItem);

            expect(parseHistoryItem.callCount).to.equal(0);
        });

        it('Получить все коммиты на первой странице', async () => {
            const page = 1;
            const size = 10;
            const commitsNumber = 10;

            const executeGit = function () {
                let data = new Array(commitsNumber).fill('');
                data = data.map(function(elem, index) {
                    return index + '\tname\ttime\tmessage'
                });
                return Promise.resolve(data.join('\n'));
            };
            const parseHistoryItem = sinon.spy();

            await gitHistory(page, size, executeGit, parseHistoryItem);

            expect(parseHistoryItem.callCount).to.equal(commitsNumber);
            expect(parseHistoryItem.args[0][0]).to.equal('0\tname\ttime\tmessage');
        });
    });

    describe('Получение файлового дерева для коммита', () => {
        it('Получение списка файлов в корне', async () => {
            const filesNumber = 2;
            const hash = 'hash';
            const path = null;

            const executeGit = function () {
                let data = new Array(filesNumber).fill('');
                data = data.map(function(elem, index) {
                    return index + '\ttype\thash\tname'
                });
                return Promise.resolve(data.join('\n'));
            };

            const parseFileTreeItem = sinon.spy();

            await gitFileTree(hash, path, executeGit, parseFileTreeItem);

            expect(parseFileTreeItem.callCount).to.equal(2);
            expect(parseFileTreeItem.args[0][0]).to.equal('0\ttype\thash\tname');
        });

        it('Получение списка файлов во вложенном каталоге', async () => {
            const path = 'path';
            const hash = 'hash';

            const executeGit = sinon.spy(function () {
                return Promise.resolve('')
            });
            const parseFileTreeItem = sinon.spy();

            await gitFileTree(hash, path, executeGit, parseFileTreeItem);

            expect(executeGit.called).to.be.true;
            expect(executeGit.args[0][1][2]).to.equal(path)
        });
    });

    it('Получение текстового содержимого файла', async () => {
        const hash = 'hash';
        const executeGit = sinon.spy(function () {
            return Promise.resolve('')
        });

        await gitFileContent(hash, executeGit);

        expect(executeGit.calledOnce).to.be.true;
    });
});
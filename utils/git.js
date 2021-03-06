const { resolve } = require('path');
const REPO = resolve('.');

const { execFile } = require('child_process');

function executeGit(cmd, args) {
  return new Promise((resolve, reject) => {
    execFile(cmd, args, { cwd: REPO }, (err, stdout) => {
      if (err) {
        reject(err);
      }

      resolve(stdout.toString());
    });
  });
}

function parseHistoryItem(line) {
  const [hash, author, timestamp, msg] = line.split('\t');

  return {
    hash,
    author,
    timestamp,
    msg
  };
}

/**
 * Логический модуль получения истории коммитов
 * Сценарии:
 * Получить коммиты в пустом репозитории
 * Получить коммиты на первой странице
 * Получить коммиты на второй странице
 */
function gitHistory(page = 1, size = 10, executeGitStub, parseHistoryItemStub) {
  const offset = (page - 1) * size;

  return (executeGitStub || executeGit)('git', [
    'log',
    '--pretty=format:%H%x09%an%x09%ad%x09%s',
    '--date=iso',
    '--skip',
    offset,
    '-n',
    size
  ]).then(data => {
    return data
      .split('\n')
      .filter(Boolean)
      .map(parseHistoryItemStub || parseHistoryItem);
  });
}

function parseFileTreeItem(line) {
  const [info, path] = line.split('\t');
  const [, type, hash] = info.split(' ');

  return { type, hash, path };
}

/**
 * Логический модуль получения файлового дерева
 * Сценарии:
 * Получить дерево файлов для коммита hash
 * Получить дерево файлов по пути path для коммита hash
 *
 */
function gitFileTree(hash, path, executeGitStub, parseFileTreeItemStub) {
  const params = ['ls-tree', hash];
  path && params.push(path);


  return (executeGitStub || executeGit)('git', params).then(data => {
    return data
      .split('\n')
      .filter(Boolean)
      .map(parseFileTreeItemStub || parseFileTreeItem);
  });
}

/**
 * Логический модуль получения содержимого текстового файла
 * Сценарии:
 * Получить содержимое файла по hash
 *
 */
function gitFileContent(hash, executeGitStub) {
  return (executeGitStub || executeGit)('git', ['show', hash]);
}

module.exports = {
  gitHistory,
  gitFileTree,
  gitFileContent
};

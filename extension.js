// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode = require('vscode');
var _ = require('lodash');

var list = [];
var buffer = ""; // to store current file;
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

  // Use the console to output diagnostic information (console.log) and errors (console.error)

  //add current active tab to list, check if there is an active tab
  if (!!vscode.window.activeTextEditor && !!vscode.window.activeTextEditor._documentData) {
    buffer = vscode.window.activeTextEditor._documentData._uri.path;
  }

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  var disposable = vscode.commands.registerCommand('extension.openRecentFiles', function () {
    // The code you place here will be executed every time your command is executed
    vscode.window.showQuickPick(mapUriToDisplayName()).then((item) => {
      handleUserInput(item);
    });
  });

  context.subscriptions.push(disposable);
  context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(handleChangeActiveWindow));

  // This line of code will only be executed once when your extension is activated
  console.log('"recent-files" is now active!');
}
exports.activate = activate;


// this method is called when your extension is deactivated
function deactivate() {
  list = [];
  buffer = ''
}

exports.deactivate = deactivate;

function handleUserInput(item) {
  if (!item || item.trim === '') return;
  let targetUri = _.findLast(list, (uri) => {
    return uri.indexOf(item) !== -1;
  })
  if (!targetUri) {
    vscode.window.showWarningMessage("Can't find the file you selected.")
    return;
  }
  let targetDocument = vscode.workspace.openTextDocument(targetUri);
  targetDocument.then(function (document) {
    vscode.window.showTextDocument(document);
  });
}

function mapUriToDisplayName() {
  return _.chain(list.slice()).uniq().reverse().map((item) => {
    return item.substring(vscode.workspace.rootPath.length + 1)
  }).value();
}

function isFileNameExist(fileName) {
  return _.some(list, (item) => {
    return item === fileName;
  })
}

function handleChangeActiveWindow(e) {
  if (!e) return;
  //ignore invalid item
  if (!e._documentData || !e._documentData._uri) return;
  let uri = e._documentData._uri.path
  if (!uri || uri.trim() === '') return
  //only allow to show 20 files.
  if (list.length === 20) list = _.tail(list);
  if (isFileNameExist(uri)) _.remove(list, (item) => { return item === uri });

  if (!!buffer) list.push(buffer);
  buffer = uri; //update buffer

  list = _.uniq(list);
}
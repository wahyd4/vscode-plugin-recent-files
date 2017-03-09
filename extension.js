// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode = require('vscode');
var LinkedMap = require('linked-map');

var map = new LinkedMap();

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "recent-files" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  var disposable = vscode.commands.registerCommand('extension.openRecentlyFiles', function () {
    // The code you place here will be executed every time your command is executed

    // Display a message box to the user
    // vscode.window.showInformationMessage('Hello World!');
    vscode.window.showQuickPick(map.keys()).then((item) => {
      if(!item || item.trim === "") {
        return
      }
      let uri = map.get(item);
      if(uri === null) {
        vscode.window.showWarningMessage("Can't find the file you choosed.")
        return;
      }
      let targetDocument = vscode.workspace.openTextDocument(map.get(item));
      targetDocument.then(function (document) {
        vscode.window.showTextDocument(document);
      });
    });
  });

  context.subscriptions.push(disposable);

  vscode.workspace.onDidOpenTextDocument((document) => {
    var name = document.fileName
    name = name.substr(name.lastIndexOf('/') + 1);
    map.push(name, document.uri);
    console.log(map.values())
    // console.log('Document opened: ', document);
  });
}
exports.activate = activate;


// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;
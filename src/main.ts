import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  const command = 'vscode-dbml.helloWorld';

  const commandHandler = () => {
    vscode.window.showInformationMessage('Hello World!');
  };

  context.subscriptions.push(vscode.commands.registerCommand(command, commandHandler));
}

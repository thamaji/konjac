'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "konjac" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.konjac', () => {
        // The code you place here will be executed every time your command is executed

        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }

        if (editor.selection.isEmpty) {
            return;
        }

        let text = editor.document.getText(editor.selection).trim();

        text = text.split('\n').map(line => {
            return line.trim().replace(/^\/\/ */, '');
        }).join('\n');

        // TODO: vscode 内で新しいタブで開けるんじゃないかな？
        // const panel = vscode.window.createWebviewPanel(
        //     'catCoding', // Identifies the type of the webview. Used internally
        //     "Cat Coding", // Title of the panel displayed to the user
        //     vscode.ViewColumn.One, // Editor column to show the new webview panel in.
        //     { } // Webview options. More on these later.
        // );
        // panel.webview.html = '<iframe src="https://translate.google.co.jp/?hl=ja#en/ja/' + encodeURI(text) + '"/>';

        // vscode.window.showInformationMessage(encodeURI(text));

        const opn = require('opn');
        opn('https://translate.google.co.jp/?hl=ja#auto/ja/' + encodeURI(text));
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}
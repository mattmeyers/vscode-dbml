import * as vscode from "vscode";
import Exporter from "./export";
import Importer from "./import";

export enum Dialect {
  postgres = "PostgreSQL",
  mysql = "MySQL",
  mssql = "SQL Server"
}

export function activate(context: vscode.ExtensionContext) {
  const exporter = new Exporter();
  const importer = new Importer();

  const exportCmd = vscode.commands.registerCommand("vscode-dbml.export", () => exporter.export());
  const importCmd = vscode.commands.registerCommand("vscode-dbml.import", () => importer.import());

  context.subscriptions.push(exportCmd, importCmd);
}

export function deactivate() {}

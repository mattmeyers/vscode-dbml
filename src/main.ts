import * as vscode from "vscode";
import Exporter from "./export";

export enum Dialect {
  postgres = "PostgreSQL",
  mysql = "MySQL",
  mssql = "SQL Server"
}

export function activate(context: vscode.ExtensionContext) {
  const exporter = new Exporter();

  const exportCmd = vscode.commands.registerCommand(
    "vscode-dbml.export",
    () => exporter.export()
  );

  context.subscriptions.push(exportCmd);
}

export function deactivate() {}

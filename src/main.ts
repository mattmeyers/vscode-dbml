import * as vscode from "vscode";
//@ts-ignore
import {exporter} from "@dbml/core";
import * as fs from 'fs';
import * as path from 'path';


enum Dialects {
  postgresql = "PostgreSQL",
  mysql = "MySQL",
  sqlserver = "SQL Server"
}

export function activate(context: vscode.ExtensionContext) {
  const exportCmd = vscode.commands.registerCommand(
    "vscode-dbml.export",
    async () => {
      if (!vscode.window.activeTextEditor) {
        return;
      }

      const infile: string = vscode.window.activeTextEditor.document.fileName;

      const dialect: string | undefined = await vscode.window.showQuickPick(
        Object.values(Dialects), {placeHolder: "Select an output dialect"}
      );
      if (dialect === undefined) {
        return;
      }

      let outfile: string | undefined = await vscode.window.showInputBox({prompt: "Enter an output file", value: "out.sql"});
      if (outfile === undefined) {
        return;
      }

      if (!path.isAbsolute(outfile)) {
        const p = path.dirname(infile);
        outfile = `${p}/${outfile}`;
      }

      switch (dialect) {
        case Dialects.postgresql:
          const dbml = fs.readFileSync(infile, 'utf-8');
          const postgres = exporter.export(dbml, 'postgres');
          fs.writeFileSync(outfile, postgres);
          break;
        case Dialects.mysql:
          vscode.window.showInformationMessage(dialect);
          break;
        case Dialects.sqlserver:
          vscode.window.showInformationMessage(dialect);
          break;
      }
    }
  );

  context.subscriptions.push(exportCmd);
}

export function deactivate() {}

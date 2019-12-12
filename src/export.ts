import * as vscode from "vscode";
//@ts-ignore
import { exporter } from "@dbml/core";
import * as fs from "fs";
import * as path from "path";
import { Dialect } from "./main";

export default class Exporter {
  public async export(): Promise<void> {
    if (!vscode.window.activeTextEditor) {
      return;
    }

    const infile: string = vscode.window.activeTextEditor.document.fileName;

    const dialect: string | undefined = await vscode.window.showQuickPick(
      Object.values(Dialect),
      {
        placeHolder: "Select an output dialect"
      }
    );
    if (dialect === undefined) {
      return;
    }

    let outfile: string | undefined = await vscode.window.showInputBox({
      prompt: "Enter an output file",
      value: this.getDefaultOutput(infile)
    });
    if (outfile === undefined) {
      return;
    }

    // If a relative path is provided, place the output relative to the input file
    if (!path.isAbsolute(outfile)) {
      const p = path.dirname(infile);
      outfile = `${p}/${outfile}`;
    }

    const dbml = fs.readFileSync(infile, "utf-8");
    let sql: string | undefined = undefined;

    switch (dialect) {
      case Dialect.postgres:
        sql = exporter.export(dbml, "postgres");
        break;
      case Dialect.mysql:
        sql = exporter.export(dbml, "mysql");
        break;
      case Dialect.mssql:
        sql = exporter.export(dbml, "mssql");
        break;
    }

    if (sql !== undefined && sql !== '') {
      fs.writeFileSync(outfile, sql);
      vscode.window.showInformationMessage(`Successfully generated ${outfile}`);
    } else {
      vscode.window.showErrorMessage(`Failed to generated SQL file`);
    }

  }

  private getDefaultOutput(infile: string): string {
    return path
      .basename(infile)
      .replace(/\.dbml$/gi, "")
      .concat(".sql");
  }
}

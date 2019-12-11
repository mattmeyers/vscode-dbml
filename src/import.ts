import * as vscode from "vscode";
//@ts-ignore
import { importer } from "@dbml/core";
import * as fs from "fs";
import * as path from "path";
import { Dialect } from "./main";

export default class Importer {
  public async import(): Promise<void> {
    if (!vscode.window.activeTextEditor) {
      return;
    }

    const infile: string = vscode.window.activeTextEditor.document.fileName;

    const dialect: string | undefined = await vscode.window.showQuickPick(
      Object.values(Dialect),
      {
        placeHolder: "Select an input dialect"
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

    const sql = fs.readFileSync(infile, "utf-8");
    let dbml: string | undefined = undefined;

    switch (dialect) {
      case Dialect.postgres:
        dbml = importer.import(sql, "postgres");
        break;
      case Dialect.mysql:
        dbml = importer.import(sql, "mysql");
        break;
      case Dialect.mssql:
        dbml = importer.import(sql, "mssql");
        break;
    }

    if (sql !== undefined) {
      fs.writeFileSync(outfile, dbml);
    }
  }

  private getDefaultOutput(infile: string): string {
    return path
      .basename(infile)
      .replace(/\.sql$/gi, "")
      .concat(".dbml");
  }
}

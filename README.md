# DBML Language Support

[![Version 0.3.3 Badge][version-badge]][changelog] [![MIT License Badge][license-badge]][license]

This Visual Studio Code extension provides language support for the Database Markup Language ([DBML](https://dbml.org)).

## Syntax Highlighting

Syntax highlighting is enabled for files with the `.dbml` extension.

![Syntax Example](https://raw.githubusercontent.com/mattmeyers/vscode-dbml/master/images/dbml_syntax_example.png)

## Commands

### To SQL

When focusing a `.dbml` file, the `DBML: To SQL` command becomes available in the command palette. This command leverages the `@dbml/core` ([source](https://github.com/holistics/dbml/tree/master/packages/dbml-core)) package to generate an SQL script based on the provided schema.

Selecting this commands presents all available dialects. At this time the three available dialects are PostgreSQL, MySQL, and SQL Server. After choosing a dialect, enter an output filename. If a relative path is provided, the generated file will be placed relative to the focused `.dbml` file. Otherwise is will be placed at the provided absolute path.

### From SQL

When focusing a `.sql` file, the `DBML: From SQL` command appears in the command palette. This command acts as the opposite of the `DBML: To SQL` command and generates a `.dbml` from from the provided `.sql` file. The dialect of the SQL must be provided. At this time, this command only works for PostgreSQL and MySQL.

## Snippets

Snippets are provided for quickly creating tables, enums, and references. To use a snippet, begin typing any of the following keys.

- `table`: Create a new table with an auto-incrementing int id as the primary key
- `enum`: Create a new enum
- `oto`: Create a one-to-one reference
- `otm`: Create a one-to-many reference
- `mto`: Create a many-to-one reference
- `mtm`: Create a many-to-many join table

## Issues

If you find an error or bug, please [create an issue](https://github.com/mattmeyers/vscode-dbml/issues/new).

## Contributing

If you want to add to this project, feel free to fork the repository and submit a pull request.

[changelog]: ./CHANGELOG.md
[license]: ./LICENSE
[version-badge]: https://img.shields.io/badge/version-0.3.3-blue.svg
[license-badge]: https://img.shields.io/badge/license-MIT-blue.svg

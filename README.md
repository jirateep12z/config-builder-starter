# Config Builder

Visual config generator for Prettier, ESLint, and ignore files, with framework presets and JSON, YAML, or JS export.

Config Builder helps developers set up formatting and linting for a new project without writing each config file by hand. Pick a framework preset, adjust the Prettier options and ignore patterns, then copy or download the generated files. The app runs in the browser and is built with React, TypeScript, Vite, Tailwind CSS, and shadcn/ui.

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Features](#features)
- [Development](#development)
- [Limitations](#limitations)
- [Show your support](#show-your-support)
- [Author](#author)
- [License](#license)

## Install

Prerequisites:

- [Node.js](https://nodejs.org/) with `npm`

Clone the repository and install its dependencies:

```bash
git clone https://github.com/jirateep12z/config-builder-starter.git
cd config-builder-starter
npm install
```

## Usage

Start the Vite development server:

```bash
npm run dev
```

Open the local address that Vite prints in the terminal, then:

1. Select a framework preset.
2. Adjust the Prettier options and ignore patterns.
3. Open a tab under **Generated Files** and copy or download the file you need.

## Features

### Framework Presets

- **Preset Defaults**: Start from per-framework Prettier options, Prettier plugins, ignore patterns, ESLint config, `format` script, and install packages for Vanilla, Vite, Laravel, React, Next, Vue, Nuxt, Svelte, Astro, Angular, and Nest.
- **Reset to Defaults**: Restore the selected framework's preset after making changes. Selecting another framework also replaces the current settings with that framework's preset.

### Prettier Configuration

- **Toggle Options**: Switch `semi`, `singleQuote`, `useTabs`, `bracketSpacing`, and `bracketSameLine` on or off.
- **Formatting Options**: Choose tab width (2, 4, or 8), print width (80, 100, 120, or 140), trailing comma, arrow parens, end of line, HTML whitespace sensitivity, and prose wrap.
- **Plugin Overview**: See the Prettier plugins included by the selected preset.
- **Multiple Output Formats**: Export the Prettier config as JSON (`.prettierrc`), YAML (`.prettierrc.yaml`), or JS (`.prettierrc.cjs`).

### Ignore Patterns

- **Quick Add Categories**: Add common patterns in one click for Dependencies, Build Output, Cache, Coverage, Lock Files, Minified, Environment, IDE, and Logs.
- **Custom Patterns**: Add your own patterns with the **Add** button or the `Enter` key, and remove them from the custom pattern list. Duplicate patterns are rejected with a warning.
- **Pattern Toggles**: Turn individual active patterns on or off, grouped by category, custom, and framework-specific patterns.

### ESLint Configuration

- **Flat Config**: Generate `eslint.config.js` with `typescript-eslint`, `@stylistic/eslint-plugin`, `eslint-plugin-perfectionist`, and the framework's own plugins where the preset defines them.
- **Legacy Config**: Generate `.eslintrc.json` for presets that support it. Legacy output is unavailable for Nuxt, and no ESLint config is generated for Laravel.

### Output and Export

- **Generated Files Tabs**: Preview the install command, ESLint config, `.prettierrc`, `.prettierignore`, `.gitignore`, and `format` script with syntax highlighting and optional line wrapping.
- **Install Command Generator**: Get a ready-to-run dev-dependency install command for `npm`, `yarn`, `pnpm`, or `bun`.
- **Copy and Download**: Copy each file's content or filename to the clipboard, or download it as a file. The generated `.gitignore` uses the same active pattern list as `.prettierignore`, so both files contain the same patterns.

### Interface

- **Dark and Light Theme**: Toggle the theme from the header. The choice is saved in `localStorage`, and the system color scheme is used until you pick one.

## Development

| Command            | Description                                                    |
| ------------------ | -------------------------------------------------------------- |
| `npm run dev`      | Start the Vite development server.                             |
| `npm run build`    | Type-check with `tsc -b`, then build for production with Vite. |
| `npm run lint`     | Lint files under `src/` with ESLint.                           |
| `npm run lint:fix` | Lint files under `src/` and apply automatic fixes.             |
| `npm run format`   | Format files under `src/` with Prettier.                       |

## Limitations

- The builder state is not saved. Reloading the page returns to the Vanilla preset.
- Some interface text, such as framework descriptions, Prettier option descriptions, and helper messages, is written in Thai.

## Show your support

Give a ⭐️ if this project helped you!

## Author

**Made with ❤️ by @jirateep12z**

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

Copyright (c) 2026 Jirateep Lumvasana

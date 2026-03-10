# Config Builder

A browser-based config generator for Prettier, ESLint, and ignore files. Pick a framework preset, adjust the Prettier options and ignore patterns, then copy or download the generated files. Built with React, TypeScript, Vite, Tailwind CSS, and shadcn/ui.

## Features

### Framework Presets

- **Preset Defaults**: Start from per-framework Prettier options, Prettier plugins, ignore patterns, ESLint config, and install packages for:
  - Vanilla
  - Vite
  - React
  - Next
  - Vue
  - Nuxt
  - Svelte
  - Astro
  - Angular
  - Laravel
  - Nest
- **Reset to Defaults**: Restore the selected framework's preset after making changes.

### Prettier Configuration

- **Toggle Options**: Switch `semi`, `singleQuote`, `useTabs`, `bracketSpacing`, and `bracketSameLine` on or off.
- **Formatting Options**: Choose tab width (2, 4, or 8), print width (80, 100, 120, or 140), trailing comma, arrow parens, end of line, HTML whitespace sensitivity, and prose wrap.
- **Plugin Overview**: See the Prettier plugins included by the selected preset.
- **Multiple Output Formats**: Export the Prettier config as JSON (`.prettierrc`), YAML (`.prettierrc.yaml`), or JS (`.prettierrc.cjs`).

### Ignore Patterns

- **Quick Add Categories**: Add common patterns in one click for Dependencies, Build Output, Cache, Coverage, Lock Files, Minified, Environment, IDE, and Logs.
- **Custom Patterns**: Add your own patterns with the input field or the `Enter` key. Duplicate patterns are rejected with a warning.
- **Pattern Toggles**: Turn individual active patterns on or off, grouped by category, custom, and framework-specific patterns.

### ESLint Configuration

- **Flat Config**: Generate `eslint.config.js` with `typescript-eslint`, `@stylistic/eslint-plugin`, `eslint-plugin-perfectionist`, and the framework's own plugins where the preset defines them.
- **Legacy Config**: Generate `.eslintrc.json` for presets that support it. Legacy output is unavailable for Nuxt, and no ESLint config is generated for Laravel.

### Output and Export

- **Generated Files Tabs**: Preview the install command, ESLint config, `.prettierrc`, `.prettierignore`, `.gitignore`, and a `format` script.
- **Install Command Generator**: Get a ready-to-run dev-dependency install command for `npm`, `yarn`, `pnpm`, or `bun`.
- **Copy and Download**: Copy each file's content or filename to the clipboard, or download it as a file.

### Interface

- **Dark and Light Theme**: Toggle the theme from the header. The choice is saved in `localStorage`, and the system color scheme is used until you pick one.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) with `npm`

### Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

### Code Quality

```bash
# Lint
npm run lint

# Lint and auto-fix
npm run lint:fix

# Format code
npm run format
```

## Limitations

- The generated `.gitignore` uses the same active pattern list as `.prettierignore`, so both files contain the same patterns.
- The builder state is not saved. Reloading the page returns to the Vanilla preset.

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions, issues and feature requests are welcome!

## Show your support

Give a ⭐️ if this project helped you!

## Author

**Made with ❤️ by @jirateep12z**

import type { FrameworkConfig } from '@/types/frameworks';
import type { PackageManager } from '@/types/package-manager';

function BuildInstallCommand(
  pm: PackageManager,
  packages: string[],
  is_dev: boolean
): string {
  const dev_flag = is_dev ? ' -D' : '';
  switch (pm) {
    case 'npm':
      return `npm install${dev_flag} ${packages.join(' ')}`;
    case 'yarn':
      return `yarn add${dev_flag} ${packages.join(' ')}`;
    case 'pnpm':
      return `pnpm add${dev_flag} ${packages.join(' ')}`;
    case 'bun':
      return `bun add${dev_flag} ${packages.join(' ')}`;
    default: {
      const _exhaustive: never = pm;
      throw new Error(
        `[BuildInstallCommand] Unsupported package manager: ${_exhaustive}`
      );
    }
  }
}

export function GenerateInstallCommand(
  selected_framework: FrameworkConfig | null,
  package_manager: PackageManager
): string {
  if (!selected_framework) {
    return BuildInstallCommand(package_manager, ['prettier'], true);
  }
  const { dependencies: dep_packages, dev_dependencies: dev_packages } =
    selected_framework.install;
  const parts: string[] = [];
  if (dep_packages.length > 0) {
    parts.push(BuildInstallCommand(package_manager, dep_packages, false));
  }
  if (dev_packages.length > 0) {
    parts.push(BuildInstallCommand(package_manager, dev_packages, true));
  }
  if (parts.length === 0) return '# No packages to install';
  return parts.join(' && ');
}

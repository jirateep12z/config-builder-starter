import { dump } from 'js-yaml';

export function ConvertToYaml(obj: Record<string, unknown>): string {
  return dump(obj, { indent: 2, lineWidth: -1 });
}

function FormatYamlKey(key: string): string {
  if (/[:[]{},#&*?|<>=!%@`"']/.test(key) || key.includes(' ')) {
    return `"${key.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
  }
  return key;
}

export function ConvertToYaml(
  obj: Record<string, unknown>,
  indent = 0
): string {
  const spaces = '  '.repeat(indent);
  let result = '';
  for (const [key, value] of Object.entries(obj)) {
    const yaml_key = FormatYamlKey(key);
    if (Array.isArray(value)) {
      result += `${spaces}${yaml_key}:\n`;
      for (const item of value) {
        if (typeof item === 'object' && item !== null) {
          const item_entries = Object.entries(item as Record<string, unknown>);
          let first = true;
          for (const [k, v] of item_entries) {
            const line_prefix = first ? `${spaces}  - ` : `${spaces}    `;
            first = false;
            if (typeof v === 'object' && v !== null && !Array.isArray(v)) {
              const sub_keys = Object.keys(v as object);
              if (sub_keys.length === 0) {
                result += `${line_prefix}${FormatYamlKey(k)}: {}\n`;
              } else {
                result += `${line_prefix}${FormatYamlKey(k)}:\n`;
                result += ConvertToYaml(
                  v as Record<string, unknown>,
                  indent + 3
                );
              }
            } else if (Array.isArray(v)) {
              result += `${line_prefix}${FormatYamlKey(k)}:\n`;
              const sub_item_prefix = `${'  '.repeat(indent + 3)}- `;
              for (const sub of v as unknown[]) {
                if (typeof sub === 'string') {
                  const esc = sub.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
                  result += `${sub_item_prefix}"${esc}"\n`;
                } else {
                  result += `${sub_item_prefix}${sub}\n`;
                }
              }
            } else if (typeof v === 'string') {
              const escaped = v.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
              result += `${line_prefix}${FormatYamlKey(k)}: "${escaped}"\n`;
            } else {
              result += `${line_prefix}${FormatYamlKey(k)}: ${v}\n`;
            }
          }
        } else if (typeof item === 'string') {
          const escaped = item.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
          result += `${spaces}  - "${escaped}"\n`;
        } else {
          result += `${spaces}  - ${item}\n`;
        }
      }
    } else if (typeof value === 'object' && value !== null) {
      result += `${spaces}${yaml_key}:\n`;
      result += ConvertToYaml(value as Record<string, unknown>, indent + 1);
    } else if (typeof value === 'string') {
      const escaped = value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
      result += `${spaces}${yaml_key}: "${escaped}"\n`;
    } else {
      result += `${spaces}${yaml_key}: ${value}\n`;
    }
  }
  return result;
}

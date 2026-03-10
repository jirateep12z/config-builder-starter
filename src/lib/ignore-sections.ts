export function BuildIgnoreSections(
  all_patterns: string[],
  common_categories: [string, string[]][],
  framework_category_map: Record<string, string[]>,
  custom_patterns?: string[]
): string {
  const all_patterns_set = new Set(all_patterns);
  const used_patterns = new Set<string>();
  const sections: string[] = [];

  for (const [category, category_def_patterns] of common_categories) {
    const matching = category_def_patterns.filter(p => all_patterns_set.has(p));
    if (matching.length === 0) continue;
    for (const p of matching) used_patterns.add(p);
    sections.push(`# ${category}`, ...matching, '');
  }

  for (const [category, patterns] of Object.entries(framework_category_map)) {
    const matching = patterns.filter(
      p => all_patterns_set.has(p) && !used_patterns.has(p)
    );
    if (matching.length === 0) continue;
    for (const p of matching) used_patterns.add(p);
    sections.push(`# ${category}`, ...matching, '');
  }

  if (custom_patterns && custom_patterns.length > 0) {
    const uncategorized = custom_patterns.filter(
      p => !used_patterns.has(p) && all_patterns_set.has(p)
    );
    if (uncategorized.length > 0) {
      for (const p of uncategorized) used_patterns.add(p);
      sections.push('# custom', ...uncategorized, '');
    }
  }

  const remaining = all_patterns
    .filter(p => !used_patterns.has(p) && !p.startsWith('#'))
    .sort((a, b) => a.localeCompare(b));
  if (remaining.length > 0) {
    sections.push('# other', ...remaining, '');
  }

  return sections.join('\n').trim();
}

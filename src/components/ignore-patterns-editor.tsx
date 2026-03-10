import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { COMMON_IGNORE_PATTERNS } from '@/constants/ignore-maps';
import {
  COMMON_IGNORE_CATEGORY_KEYS,
  IGNORE_PATTERNS_CATEGORY_LABELS,
  IGNORE_PATTERNS_CATEGORY_ORDER
} from '@/constants/ignore-patterns';
import { IGNORE_PATTERNS_CATEGORY_ICONS } from '@/constants/ignore-patterns-icons';
import type { IgnorePatternsEditorProps } from '@/types/components';
import { FileText, FolderSearch, Plus, X } from 'lucide-react';
import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties
} from 'react';

const ALL_COMMON_PATTERNS = new Set(
  IGNORE_PATTERNS_CATEGORY_ORDER.flatMap(cat => COMMON_IGNORE_PATTERNS[cat])
);

const CATEGORY_ROW_ESTIMATED_HEIGHT = '80px';

const CATEGORY_ITEM_STYLE: CSSProperties = {
  contentVisibility: 'auto',
  containIntrinsicSize: `0 ${CATEGORY_ROW_ESTIMATED_HEIGHT}`
};

export const IgnorePatternsEditor = memo(function IgnorePatternsEditor({
  patterns,
  custom_patterns,
  OnToggle,
  OnAddCustom,
  OnRemoveCustom,
  OnAddCommonPatterns
}: IgnorePatternsEditorProps) {
  const [new_pattern, set_new_pattern] = useState('');
  const [duplicate_warning, set_duplicate_warning] = useState(false);
  const duplicate_timeout_ref = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  useEffect(() => {
    return () => {
      if (duplicate_timeout_ref.current !== null) {
        clearTimeout(duplicate_timeout_ref.current);
      }
    };
  }, []);

  const selected_patterns = useMemo(() => new Set(patterns), [patterns]);
  const custom_pattern_set = useMemo(
    () => new Set(custom_patterns),
    [custom_patterns]
  );

  const patterns_by_category = useMemo(
    () =>
      IGNORE_PATTERNS_CATEGORY_ORDER.map(category => {
        const category_patterns = COMMON_IGNORE_PATTERNS[category].filter(
          pattern => selected_patterns.has(pattern)
        );
        return { category, category_patterns };
      }).filter(item => item.category_patterns.length > 0),
    [selected_patterns]
  );

  const framework_specific_patterns = useMemo(
    () =>
      patterns
        .filter(
          pattern =>
            !custom_pattern_set.has(pattern) &&
            !ALL_COMMON_PATTERNS.has(pattern)
        )
        .sort((a, b) => a.localeCompare(b)),
    [patterns, custom_pattern_set]
  );

  const HandleAddPattern = useCallback(() => {
    const trimmed = new_pattern.trim();
    if (!trimmed) return;
    if (selected_patterns.has(trimmed) || custom_pattern_set.has(trimmed)) {
      if (duplicate_timeout_ref.current !== null) {
        clearTimeout(duplicate_timeout_ref.current);
      }
      set_duplicate_warning(true);
      duplicate_timeout_ref.current = setTimeout(
        () => set_duplicate_warning(false),
        2000
      );
      return;
    }
    set_duplicate_warning(false);
    OnAddCustom(trimmed);
    set_new_pattern('');
  }, [new_pattern, OnAddCustom, selected_patterns, custom_pattern_set]);

  const HandleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        HandleAddPattern();
      }
    },
    [HandleAddPattern]
  );

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <FolderSearch className="h-5 w-5" />
          Ignore Patterns
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label>Quick Add Categories</Label>
          <div className="flex flex-wrap gap-2">
            {COMMON_IGNORE_CATEGORY_KEYS.map(category => (
              <Button
                key={category}
                variant="outline"
                size="sm"
                className="gap-1.5 border-neutral-400/50 text-neutral-700 hover:border-neutral-500 hover:bg-neutral-100 hover:text-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-800/50"
                onClick={() => OnAddCommonPatterns(category)}
              >
                {IGNORE_PATTERNS_CATEGORY_ICONS[category]()}
                {IGNORE_PATTERNS_CATEGORY_LABELS[category]}
              </Button>
            ))}
          </div>
        </div>
        <Separator />
        <div className="space-y-3">
          <Label>Add Custom Pattern</Label>
          <div className="flex gap-2">
            <Input
              value={new_pattern}
              onChange={e => set_new_pattern(e.target.value)}
              onKeyDown={HandleKeyDown}
              placeholder="e.g., *.log, temp/, .DS_Store"
              maxLength={200}
            />
            <Button
              onClick={HandleAddPattern}
              className="gap-1.5 border-green-700 bg-green-700 text-white hover:bg-green-800"
            >
              <Plus className="h-4 w-4" />
              Add
            </Button>
          </div>
          {duplicate_warning && (
            <p className="text-xs text-amber-600 dark:text-amber-400">
              Pattern นี้มีอยู่แล้ว
            </p>
          )}
        </div>
        {custom_patterns.length > 0 && (
          <div className="space-y-2">
            <Label>Custom Patterns</Label>
            <div className="flex flex-wrap gap-2">
              {custom_patterns.map(pattern => (
                <Badge key={pattern} variant="secondary" className="gap-1 pr-1">
                  {pattern}
                  <button
                    type="button"
                    onClick={() => OnRemoveCustom(pattern)}
                    aria-label={`Remove ${pattern}`}
                    className="ml-1 rounded-full p-0.5 hover:bg-red-500/20"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}
        <Separator />
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Active Patterns ({patterns.length})</Label>
          </div>
          <div className="max-h-60 space-y-5 overflow-auto rounded-lg border p-4">
            {patterns.length === 0 && (
              <p className="text-muted-foreground text-center text-sm">
                No patterns selected. Choose a framework or add custom patterns.
              </p>
            )}
            {patterns_by_category.map(item => (
              <div
                key={item.category}
                className="space-y-2"
                style={CATEGORY_ITEM_STYLE}
              >
                <div className="flex items-center gap-2">
                  {IGNORE_PATTERNS_CATEGORY_ICONS[item.category]()}
                  <span className="text-muted-foreground text-xs font-medium">
                    {IGNORE_PATTERNS_CATEGORY_LABELS[item.category]}
                  </span>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {item.category_patterns.map(pattern => (
                    <div key={pattern} className="flex items-center gap-2">
                      <Checkbox
                        id={pattern}
                        checked={selected_patterns.has(pattern)}
                        onCheckedChange={() => OnToggle(pattern)}
                        className="data-checked:border-green-600 data-checked:bg-green-600 dark:data-checked:border-green-600 dark:data-checked:bg-green-600"
                      />
                      <Label
                        htmlFor={pattern}
                        className="cursor-pointer truncate font-mono text-sm"
                      >
                        {pattern}
                      </Label>
                    </div>
                  ))}
                </div>
                <Separator className="mt-2" />
              </div>
            ))}
            {custom_patterns.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span className="text-muted-foreground text-xs font-medium">
                    Custom
                  </span>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {custom_patterns.map(pattern => (
                    <div key={pattern} className="flex items-center gap-2">
                      <Checkbox
                        id={`custom-${pattern}`}
                        checked={selected_patterns.has(pattern)}
                        onCheckedChange={() => OnToggle(pattern)}
                        className="data-checked:border-green-600 data-checked:bg-green-600 dark:data-checked:border-green-600 dark:data-checked:bg-green-600"
                      />
                      <Label
                        htmlFor={`custom-${pattern}`}
                        className="cursor-pointer truncate font-mono text-sm"
                      >
                        {pattern}
                      </Label>
                    </div>
                  ))}
                </div>
                <Separator className="mt-2" />
              </div>
            )}
            {framework_specific_patterns.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span className="text-muted-foreground text-xs font-medium">
                    Framework Specific
                  </span>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {framework_specific_patterns.map(pattern => (
                    <div key={pattern} className="flex items-center gap-2">
                      <Checkbox
                        id={`framework-${pattern}`}
                        checked={selected_patterns.has(pattern)}
                        onCheckedChange={() => OnToggle(pattern)}
                        className="data-checked:border-green-600 data-checked:bg-green-600 dark:data-checked:border-green-600 dark:data-checked:bg-green-600"
                      />
                      <Label
                        htmlFor={`framework-${pattern}`}
                        className="cursor-pointer truncate font-mono text-sm"
                      >
                        {pattern}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

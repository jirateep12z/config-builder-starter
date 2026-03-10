import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
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
import { FEEDBACK_RESET_DELAY_MS } from '../constants/builder';
import { COMMON_IGNORE_PATTERNS } from '../constants/ignore-maps';
import {
  COMMON_IGNORE_CATEGORY_KEYS,
  IGNORE_PATTERNS_CATEGORY_LABELS,
  IGNORE_PATTERNS_CATEGORY_ORDER
} from '../constants/ignore-patterns';
import { IGNORE_PATTERNS_CATEGORY_ICONS } from '../constants/ignore-patterns-icons';
import type { IgnorePatternsEditorProps } from '../types/components';
import { SectionHeader } from './section-header';

const ALL_COMMON_PATTERNS = new Set(
  IGNORE_PATTERNS_CATEGORY_ORDER.flatMap(cat => COMMON_IGNORE_PATTERNS[cat])
);

const CATEGORY_ROW_ESTIMATED_HEIGHT = '80px';

const CATEGORY_ITEM_STYLE: CSSProperties = {
  contentVisibility: 'auto',
  containIntrinsicSize: `0 ${CATEGORY_ROW_ESTIMATED_HEIGHT}`
};

const CUSTOM_PATTERN_INPUT_ID = 'custom-pattern-input';
const DUPLICATE_PATTERN_MESSAGE_ID = 'duplicate-pattern-message';
const CUSTOM_PATTERN_CHECKBOX_ID_PREFIX = 'custom-pattern-checkbox';

function BuildCustomPatternCheckboxId(pattern_index: number): string {
  return `${CUSTOM_PATTERN_CHECKBOX_ID_PREFIX}-${pattern_index}`;
}

export const IgnorePatternsEditor = memo(function IgnorePatternsEditor({
  patterns,
  custom_patterns,
  OnAddCommonPatterns,
  OnAddCustom,
  OnRemoveCustom,
  OnToggle
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
        FEEDBACK_RESET_DELAY_MS
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
      <SectionHeader
        icon={FolderSearch}
        title="Ignore Patterns"
        description="Files and folders excluded from formatting and version control"
      />
      <CardContent className="gap-6">
        <div className="space-y-3">
          <Label>Quick Add Categories</Label>
          <div className="flex flex-wrap gap-2">
            {COMMON_IGNORE_CATEGORY_KEYS.map(category => (
              <Button
                key={category}
                variant="outline"
                size="sm"
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
          <Label htmlFor={CUSTOM_PATTERN_INPUT_ID}>Add Custom Pattern</Label>
          <div className="flex gap-2">
            <Input
              id={CUSTOM_PATTERN_INPUT_ID}
              value={new_pattern}
              placeholder="e.g., *.log, temp/, .DS_Store"
              maxLength={200}
              aria-invalid={duplicate_warning}
              aria-describedby={
                duplicate_warning ? DUPLICATE_PATTERN_MESSAGE_ID : undefined
              }
              onChange={e => set_new_pattern(e.target.value)}
              onKeyDown={HandleKeyDown}
            />
            <Button className="gap-1.5" onClick={HandleAddPattern}>
              <Plus className="h-4 w-4" />
              Add
            </Button>
          </div>
          {duplicate_warning && (
            <p
              id={DUPLICATE_PATTERN_MESSAGE_ID}
              role="status"
              aria-live="polite"
              className="text-destructive text-xs"
            >
              Pattern นี้มีอยู่แล้ว
            </p>
          )}
        </div>
        {custom_patterns.length > 0 && (
          <div className="space-y-2">
            <Label>Custom Patterns</Label>
            <div className="flex flex-wrap gap-2">
              {custom_patterns.map(pattern => (
                <Badge
                  key={pattern}
                  variant="secondary"
                  className="pr-1 font-mono"
                >
                  {pattern}
                  <button
                    type="button"
                    aria-label={`Remove ${pattern}`}
                    className="hover:bg-foreground/10 rounded-full p-0.5"
                    onClick={() => OnRemoveCustom(pattern)}
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
          <div className="bg-muted/30 max-h-60 space-y-5 overflow-auto rounded-lg p-4">
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
                  {custom_patterns.map((pattern, pattern_index) => {
                    const checkbox_id =
                      BuildCustomPatternCheckboxId(pattern_index);

                    return (
                      <div key={pattern} className="flex items-center gap-2">
                        <Checkbox
                          id={checkbox_id}
                          checked={selected_patterns.has(pattern)}
                          onCheckedChange={() => OnToggle(pattern)}
                        />
                        <Label
                          htmlFor={checkbox_id}
                          className="cursor-pointer truncate font-mono text-sm"
                        >
                          {pattern}
                        </Label>
                      </div>
                    );
                  })}
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

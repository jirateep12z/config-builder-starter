import { FrameworkIcon } from '@/components/framework-icons';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  CATEGORY_COLOR_MAP,
  CATEGORY_LABEL_MAP
} from '@/constants/framework-display';
import { FRAMEWORKS, FRAMEWORKS_MAP } from '@/constants/frameworks';
import { Cn } from '@/lib/utils';
import type {
  FrameworkCardProps,
  FrameworkSelectorProps
} from '@/types/components';
import { memo, useCallback } from 'react';

const FrameworkCard = memo(function FrameworkCard({
  framework,
  is_selected,
  OnSelect
}: FrameworkCardProps) {
  const HandleClick = useCallback(
    () => OnSelect(framework.id),
    [OnSelect, framework.id]
  );

  const HandleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        OnSelect(framework.id);
      }
    },
    [OnSelect, framework.id]
  );

  return (
    <Card
      role="button"
      tabIndex={0}
      aria-pressed={is_selected}
      className={Cn(
        'cursor-pointer transition-[opacity] hover:border-green-500/50',
        is_selected &&
          'border-green-600 bg-green-500/5 ring-2 ring-green-500/20'
      )}
      onClick={HandleClick}
      onKeyDown={HandleKeyDown}
    >
      <CardContent className="flex flex-col items-center gap-2 p-4 text-center">
        <FrameworkIcon
          icon_id={framework.icon_id}
          class_name="text-foreground h-8 w-8"
        />
        <div className="space-y-1">
          <h3 className="font-medium">{framework.name}</h3>
          <Badge
            variant="outline"
            className={Cn('text-xs', CATEGORY_COLOR_MAP[framework.category])}
          >
            {CATEGORY_LABEL_MAP[framework.category]}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
});

export function FrameworkSelector({
  selected_framework,
  OnSelect
}: FrameworkSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">เลือก Framework</h2>
        <p className="text-muted-foreground text-sm">
          {FRAMEWORKS_MAP.get(selected_framework)?.name ?? selected_framework}{' '}
          selected
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {FRAMEWORKS.map(framework => (
          <FrameworkCard
            key={framework.id}
            framework={framework}
            is_selected={selected_framework === framework.id}
            OnSelect={OnSelect}
          />
        ))}
      </div>
    </div>
  );
}

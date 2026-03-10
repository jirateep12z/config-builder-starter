import { Card, CardContent } from '@/components/ui/card';
import { Cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { memo, useCallback } from 'react';
import { FRAMEWORKS, FRAMEWORKS_MAP } from '../constants/frameworks';
import type {
  FrameworkCardProps,
  FrameworkSelectorProps
} from '../types/components';
import { FrameworkIcon } from './framework-icons';

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
        'hover:bg-muted/50 cursor-pointer py-2',
        is_selected && 'bg-muted/50 ring-foreground/60 ring-2'
      )}
      onClick={HandleClick}
      onKeyDown={HandleKeyDown}
    >
      <CardContent className="flex flex-row items-center gap-3 p-2.5">
        <FrameworkIcon
          icon_id={framework.icon_id}
          class_name="text-foreground h-6 w-6 shrink-0"
        />
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-medium">{framework.name}</h3>
        </div>
        {is_selected ? (
          <span
            className="bg-primary text-primary-foreground flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
            aria-hidden="true"
          >
            <Check className="h-3.5 w-3.5" />
          </span>
        ) : null}
      </CardContent>
    </Card>
  );
});

export function FrameworkSelector({
  selected_framework,
  OnSelect
}: FrameworkSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <h2 className="text-sm font-semibold">เลือก Framework</h2>
        <p className="text-muted-foreground text-xs">
          {FRAMEWORKS_MAP.get(selected_framework)?.name ?? selected_framework}{' '}
          selected
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-1">
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

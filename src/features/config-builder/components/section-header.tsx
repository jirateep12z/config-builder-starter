import { CardHeader, CardTitle } from '@/components/ui/card';
import type { SectionHeaderProps } from '../types/components';

export function SectionHeader({
  icon: Icon,
  title,
  description,
  action
}: SectionHeaderProps) {
  return (
    <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-center gap-3">
        <span
          aria-hidden="true"
          className="bg-muted text-muted-foreground flex size-8 shrink-0 items-center justify-center rounded-md"
        >
          <Icon className="size-4" />
        </span>
        <div className="min-w-0 space-y-0.5">
          <CardTitle className="text-sm font-semibold">{title}</CardTitle>
          {description ? (
            <p className="text-muted-foreground text-xs">{description}</p>
          ) : null}
        </div>
      </div>
      {action}
    </CardHeader>
  );
}

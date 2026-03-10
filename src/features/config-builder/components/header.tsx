import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { UseTheme } from '@/features/theme';
import { Braces, Moon, Sun } from 'lucide-react';

export function Header() {
  const { is_dark, ToggleTheme } = UseTheme();
  const theme_label = is_dark ? 'Switch to light mode' : 'Switch to dark mode';

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-screen-2xl items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-lg"
          >
            <Braces className="size-[25.6px]" strokeWidth={2.4} />
          </span>
          <h1 className="text-base font-semibold tracking-tight">
            Config Builder
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label={theme_label}
                onClick={ToggleTheme}
              >
                {is_dark ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>{theme_label}</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </header>
  );
}

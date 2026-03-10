import { Button } from '@/components/ui/button';
import { UseTheme } from '@/hooks/use-theme';
import { Moon, Sun } from 'lucide-react';

export function Header() {
  const { is_dark, ToggleTheme } = UseTheme();

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <img className="h-8 w-8" src="/icons/config-builder.png" alt="logo" />
          <div>
            <h1 className="text-xl font-bold">Config Builder</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={ToggleTheme}
            aria-label={
              is_dark ? 'Switch to light mode' : 'Switch to dark mode'
            }
          >
            {is_dark ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}

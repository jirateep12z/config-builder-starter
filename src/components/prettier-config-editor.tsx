import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { PRETTIER_OPTIONS_INFO } from '@/constants/prettier-options';
import type { PrettierConfigEditorProps } from '@/types/components';
import { memo } from 'react';

type BooleanOptionProps = {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  OnChange: (checked: boolean) => void;
};

function BooleanOption({
  id,
  label,
  description,
  checked,
  OnChange
}: BooleanOptionProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border p-3">
      <div className="space-y-0.5">
        <Label htmlFor={id}>{label}</Label>
        <p className="text-muted-foreground text-xs">{description}</p>
      </div>
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={OnChange}
        className="data-checked:bg-green-600 [&_[data-slot=switch-thumb]]:!bg-white"
      />
    </div>
  );
}

export const PrettierConfigEditor = memo(function PrettierConfigEditor({
  config,
  OnUpdate
}: PrettierConfigEditorProps) {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <span>⚙️</span>
          Prettier Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <BooleanOption
            id="semi"
            label={PRETTIER_OPTIONS_INFO.semi.label}
            description={PRETTIER_OPTIONS_INFO.semi.description}
            checked={config.semi}
            OnChange={checked => OnUpdate('semi', checked)}
          />
          <BooleanOption
            id="single_quote"
            label={PRETTIER_OPTIONS_INFO.single_quote.label}
            description={PRETTIER_OPTIONS_INFO.single_quote.description}
            checked={config.single_quote}
            OnChange={checked => OnUpdate('single_quote', checked)}
          />
          <BooleanOption
            id="use_tabs"
            label={PRETTIER_OPTIONS_INFO.use_tabs.label}
            description={PRETTIER_OPTIONS_INFO.use_tabs.description}
            checked={config.use_tabs}
            OnChange={checked => OnUpdate('use_tabs', checked)}
          />
          <BooleanOption
            id="bracket_spacing"
            label={PRETTIER_OPTIONS_INFO.bracket_spacing.label}
            description={PRETTIER_OPTIONS_INFO.bracket_spacing.description}
            checked={config.bracket_spacing}
            OnChange={checked => OnUpdate('bracket_spacing', checked)}
          />
          <BooleanOption
            id="bracket_same_line"
            label={PRETTIER_OPTIONS_INFO.bracket_same_line.label}
            description={PRETTIER_OPTIONS_INFO.bracket_same_line.description}
            checked={config.bracket_same_line}
            OnChange={checked => OnUpdate('bracket_same_line', checked)}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <Label>{PRETTIER_OPTIONS_INFO.tab_width.label}</Label>
            <Select
              value={config.tab_width.toString()}
              onValueChange={value => {
                const parsed = parseInt(value, 10);
                if (!isNaN(parsed)) OnUpdate('tab_width', parsed);
              }}
            >
              <SelectTrigger className="w-full" aria-label="Tab Width">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2">2 spaces</SelectItem>
                <SelectItem value="4">4 spaces</SelectItem>
                <SelectItem value="8">8 spaces</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>{PRETTIER_OPTIONS_INFO.print_width.label}</Label>
            <Select
              value={config.print_width.toString()}
              onValueChange={value => {
                const parsed = parseInt(value, 10);
                if (!isNaN(parsed)) OnUpdate('print_width', parsed);
              }}
            >
              <SelectTrigger className="w-full" aria-label="Print Width">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="80">80 characters</SelectItem>
                <SelectItem value="100">100 characters</SelectItem>
                <SelectItem value="120">120 characters</SelectItem>
                <SelectItem value="140">140 characters</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>{PRETTIER_OPTIONS_INFO.trailing_comma.label}</Label>
            <Select
              value={config.trailing_comma}
              onValueChange={(value: 'none' | 'es5' | 'all') =>
                OnUpdate('trailing_comma', value)
              }
            >
              <SelectTrigger className="w-full" aria-label="Trailing Comma">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="es5">ES5</SelectItem>
                <SelectItem value="all">All</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>{PRETTIER_OPTIONS_INFO.arrow_parens.label}</Label>
            <Select
              value={config.arrow_parens}
              onValueChange={(value: 'always' | 'avoid') =>
                OnUpdate('arrow_parens', value)
              }
            >
              <SelectTrigger className="w-full" aria-label="Arrow Parens">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="always">Always</SelectItem>
                <SelectItem value="avoid">Avoid</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>{PRETTIER_OPTIONS_INFO.end_of_line.label}</Label>
            <Select
              value={config.end_of_line}
              onValueChange={(value: 'lf' | 'crlf' | 'cr' | 'auto') =>
                OnUpdate('end_of_line', value)
              }
            >
              <SelectTrigger className="w-full" aria-label="End of Line">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lf">LF (Unix)</SelectItem>
                <SelectItem value="crlf">CRLF (Windows)</SelectItem>
                <SelectItem value="cr">CR</SelectItem>
                <SelectItem value="auto">Auto</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>
              {PRETTIER_OPTIONS_INFO.html_whitespace_sensitivity.label}
            </Label>
            <Select
              value={config.html_whitespace_sensitivity}
              onValueChange={(value: 'css' | 'strict' | 'ignore') =>
                OnUpdate('html_whitespace_sensitivity', value)
              }
            >
              <SelectTrigger className="w-full" aria-label="HTML Whitespace">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="css">CSS</SelectItem>
                <SelectItem value="strict">Strict</SelectItem>
                <SelectItem value="ignore">Ignore</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>{PRETTIER_OPTIONS_INFO.prose_wrap.label}</Label>
            <Select
              value={config.prose_wrap}
              onValueChange={(value: 'always' | 'never' | 'preserve') =>
                OnUpdate('prose_wrap', value)
              }
            >
              <SelectTrigger className="w-full" aria-label="Prose Wrap">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="always">Always</SelectItem>
                <SelectItem value="never">Never</SelectItem>
                <SelectItem value="preserve">Preserve</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        {config.plugins.length > 0 && (
          <div className="space-y-2">
            <Label>Plugins</Label>
            <div className="flex flex-wrap gap-2">
              {config.plugins.map(plugin => (
                <Badge key={plugin} variant="secondary">
                  {plugin}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
});

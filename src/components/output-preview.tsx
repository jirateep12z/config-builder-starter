import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ESLINT_FILENAME_MAP,
  PRETTIER_FILENAME_MAP
} from '@/constants/builder';
import type { CopyMode, EslintFormat, OutputFormat } from '@/types/builder';
import type {
  CopyButtonProps,
  EslintrcTabProps,
  FileActionButtonsProps,
  FormatTabProps,
  InstallTabProps,
  OutputPreviewProps,
  SimpleCodeTabProps
} from '@/types/components';
import type { PackageManager } from '@/types/package-manager';
import { Check, Copy, Download, Terminal } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

function CopyButton({ button_key, copied_key, OnCopy }: CopyButtonProps) {
  const is_copied = copied_key === button_key;

  return (
    <Button
      variant="outline"
      size="sm"
      className={
        'gap-1.5 border-neutral-400/50 text-neutral-700 hover:border-neutral-500 hover:bg-neutral-100 hover:text-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-800/50'
      }
      onClick={OnCopy}
    >
      {is_copied ? (
        <Check className="h-4 w-4 text-neutral-500" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
      {is_copied ? 'Copied!' : 'Copy'}
    </Button>
  );
}

function FileActionButtons({
  button_key,
  copied_key,
  OnCopy,
  OnDownload
}: FileActionButtonsProps) {
  return (
    <div className="flex justify-end gap-2">
      {OnDownload ? (
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5 border-neutral-400/50 text-neutral-700 hover:border-neutral-500 hover:bg-neutral-100 hover:text-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-800/50"
          onClick={OnDownload}
        >
          <Download className="h-4 w-4" />
          Download
        </Button>
      ) : null}
      <CopyButton
        button_key={button_key}
        copied_key={copied_key}
        OnCopy={OnCopy}
      />
    </div>
  );
}

function InstallTab({
  package_manager,
  install_command,
  copied_key,
  OnChangePackageManager,
  OnCopy,
  OnDownload
}: InstallTabProps) {
  return (
    <TabsContent value="install" className="mt-4 space-y-3">
      <div className="flex items-center justify-between gap-2">
        <Select value={package_manager} onValueChange={OnChangePackageManager}>
          <SelectTrigger className="w-28" aria-label="Package manager">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="npm">npm</SelectItem>
            <SelectItem value="yarn">yarn</SelectItem>
            <SelectItem value="pnpm">pnpm</SelectItem>
            <SelectItem value="bun">bun</SelectItem>
          </SelectContent>
        </Select>
        <FileActionButtons
          button_key="install"
          copied_key={copied_key}
          OnCopy={OnCopy}
          OnDownload={OnDownload}
        />
      </div>
      <pre className="bg-muted max-w-full overflow-auto rounded-lg p-4 font-mono text-sm">
        <code className="break-all whitespace-pre-wrap">{install_command}</code>
      </pre>
      <p className="text-muted-foreground text-xs">
        รันคำสั่งนี้ใน terminal เพื่อติดตั้ง Prettier และ plugins ที่จำเป็น
      </p>
    </TabsContent>
  );
}

function EslintrcTab({
  eslint_format,
  content,
  copied_key,
  is_legacy_available,
  OnChangeFormat,
  OnCopy,
  OnDownload
}: EslintrcTabProps) {
  return (
    <TabsContent value="eslintrc" className="mt-4 space-y-3">
      <div className="flex items-center justify-between">
        <Select value={eslint_format} onValueChange={OnChangeFormat}>
          <SelectTrigger className="w-32" aria-label="ESLint config format">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="flat">Flat Config</SelectItem>
            <SelectItem value="legacy" disabled={!is_legacy_available}>
              Legacy
            </SelectItem>
          </SelectContent>
        </Select>
        <FileActionButtons
          button_key="eslintrc"
          copied_key={copied_key}
          OnCopy={OnCopy}
          OnDownload={OnDownload}
        />
      </div>
      <pre className="bg-muted max-h-80 overflow-auto rounded-lg p-4 font-mono text-sm">
        <code>{content}</code>
      </pre>
    </TabsContent>
  );
}

function SimpleCodeTab({
  tab_value,
  content,
  placeholder,
  button_key,
  copied_key,
  OnCopy,
  OnDownload
}: SimpleCodeTabProps) {
  return (
    <TabsContent value={tab_value} className="mt-4 space-y-3">
      <FileActionButtons
        button_key={button_key}
        copied_key={copied_key}
        OnCopy={OnCopy}
        OnDownload={OnDownload}
      />
      <pre className="bg-muted max-h-80 overflow-auto rounded-lg p-4 font-mono text-sm">
        <code>{content || placeholder}</code>
      </pre>
    </TabsContent>
  );
}

function FormatTab({
  content,
  copied_key,
  OnCopy,
  OnDownload
}: FormatTabProps) {
  return (
    <TabsContent value="format" className="mt-4 space-y-3">
      <FileActionButtons
        button_key="format_script"
        copied_key={copied_key}
        OnCopy={OnCopy}
        OnDownload={OnDownload}
      />
      <pre className="bg-muted overflow-auto rounded-lg p-4 font-mono text-sm">
        <code>
          {content || '// Select a framework to generate format script'}
        </code>
      </pre>
      <p className="text-muted-foreground text-xs">
        เพิ่ม script นี้ใน package.json เพื่อ format โค้ดด้วย Prettier
      </p>
    </TabsContent>
  );
}

export function OutputPreview({
  output,
  output_format,
  GenerateInstallCommand,
  GenerateEslintConfig,
  GetIsEslintFormatAvailable,
  OnFormatChange,
  OnCopy
}: OutputPreviewProps) {
  const [copied_key, set_copied_key] = useState<string | null>(null);
  const [copy_failed, set_copy_failed] = useState(false);
  const [copy_mode, set_copy_mode] = useState<CopyMode>('content');
  const [package_manager, set_package_manager] =
    useState<PackageManager>('npm');
  const [eslint_format, set_eslint_format] = useState<EslintFormat>('flat');

  const timeout_refs = useRef<Record<string, ReturnType<typeof setTimeout>>>(
    {}
  );

  const is_legacy_eslint_available = GetIsEslintFormatAvailable('legacy');
  const active_eslint_format = GetIsEslintFormatAvailable(eslint_format)
    ? eslint_format
    : 'flat';

  const eslint_config_content = useMemo(() => {
    const result = GenerateEslintConfig(active_eslint_format);

    if (result === null)
      return '// Select a framework to generate ESLint configuration';
    if (result === '') return '// ESLint is not configured for this framework';

    return result;
  }, [GenerateEslintConfig, active_eslint_format]);

  const install_command_content = useMemo(
    () => GenerateInstallCommand(package_manager),
    [GenerateInstallCommand, package_manager]
  );

  useEffect(() => {
    const refs = timeout_refs.current;

    return () => {
      Object.values(refs).forEach(clearTimeout);
    };
  }, []);

  const HandleCopyResult = useCallback(
    (success: boolean, button_key: string) => {
      if (success) {
        clearTimeout(timeout_refs.current[button_key]);
        set_copied_key(button_key);
        set_copy_failed(false);
        timeout_refs.current[button_key] = setTimeout(
          () => set_copied_key(prev => (prev === button_key ? null : prev)),
          2000
        );
      } else {
        clearTimeout(timeout_refs.current['failed']);
        set_copy_failed(true);
        timeout_refs.current['failed'] = setTimeout(
          () => set_copy_failed(false),
          2000
        );
      }
    },
    []
  );

  const prettierrc_filename = PRETTIER_FILENAME_MAP[output_format];
  const eslint_filename = ESLINT_FILENAME_MAP[active_eslint_format];

  const HandleCopy = useCallback(
    async (content: string, filename: string | undefined, key: string) => {
      const text = copy_mode === 'filename' && filename ? filename : content;
      const success = await OnCopy(text);

      HandleCopyResult(success, key);
    },
    [copy_mode, OnCopy, HandleCopyResult]
  );

  const HandleDownload = useCallback((content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const object_url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = object_url;
    link.download = filename;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(object_url), 0);
  }, []);

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <span>📄</span>
            Generated Files
            {copy_failed && (
              <span
                role="status"
                aria-live="polite"
                className="ml-1 text-xs font-normal text-red-500"
              >
                Copy failed — clipboard not available
              </span>
            )}
          </CardTitle>
          <div className="grid grid-cols-2 gap-x-3 gap-y-2 sm:flex sm:flex-wrap sm:items-center sm:gap-2">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground text-sm">Format:</span>
              <Select
                value={output_format}
                onValueChange={(value: OutputFormat) => OnFormatChange(value)}
              >
                <SelectTrigger className="w-24" aria-label="Output format">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="json">JSON</SelectItem>
                  <SelectItem value="yaml">YAML</SelectItem>
                  <SelectItem value="js">JS</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground text-sm">Copy:</span>
              <Select
                value={copy_mode}
                onValueChange={(value: CopyMode) => set_copy_mode(value)}
              >
                <SelectTrigger className="w-28" aria-label="Copy mode">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="content">Content</SelectItem>
                  <SelectItem value="filename">Filename</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="install" className="w-full">
          <TabsList className="mb-3 flex h-auto w-full flex-nowrap justify-start overflow-auto p-1 sm:flex-wrap sm:justify-center">
            <TabsTrigger
              value="install"
              className="flex-none gap-1.5 px-3 py-2 sm:flex-1"
            >
              <Terminal className="h-3.5 w-3.5" />
              <span>Install</span>
            </TabsTrigger>
            <TabsTrigger
              value="eslintrc"
              className="flex-none px-3 py-2 sm:flex-1"
            >
              <span className="font-mono text-xs">eslint</span>
            </TabsTrigger>
            <TabsTrigger
              value="prettierrc"
              className="flex-none px-3 py-2 sm:flex-1"
            >
              <span className="font-mono text-xs">.prettierrc</span>
            </TabsTrigger>
            <TabsTrigger
              value="prettierignore"
              className="flex-none px-3 py-2 sm:flex-1"
            >
              <span className="font-mono text-xs">.prettierignore</span>
            </TabsTrigger>
            <TabsTrigger
              value="gitignore"
              className="flex-none px-3 py-2 sm:flex-1"
            >
              <span className="font-mono text-xs">.gitignore</span>
            </TabsTrigger>
            <TabsTrigger
              value="format"
              className="flex-none px-3 py-2 sm:flex-1"
            >
              <span className="font-mono text-xs">format</span>
            </TabsTrigger>
          </TabsList>
          <InstallTab
            package_manager={package_manager}
            install_command={install_command_content}
            copied_key={copied_key}
            OnChangePackageManager={set_package_manager}
            OnCopy={() =>
              HandleCopy(
                install_command_content,
                'install-command.txt',
                'install'
              )
            }
            OnDownload={() =>
              HandleDownload(install_command_content, 'install-command.txt')
            }
          />
          <EslintrcTab
            eslint_format={active_eslint_format}
            content={eslint_config_content}
            copied_key={copied_key}
            is_legacy_available={is_legacy_eslint_available}
            OnChangeFormat={set_eslint_format}
            OnCopy={() =>
              HandleCopy(eslint_config_content, eslint_filename, 'eslintrc')
            }
            OnDownload={() =>
              HandleDownload(eslint_config_content, eslint_filename)
            }
          />
          <SimpleCodeTab
            tab_value="prettierrc"
            content={output.prettierrc}
            placeholder="// Select a framework to generate configuration"
            button_key="prettierrc"
            copied_key={copied_key}
            OnCopy={() =>
              HandleCopy(output.prettierrc, prettierrc_filename, 'prettierrc')
            }
            OnDownload={() =>
              HandleDownload(output.prettierrc, prettierrc_filename)
            }
          />
          <SimpleCodeTab
            tab_value="prettierignore"
            content={output.prettierignore}
            placeholder="# Select a framework to generate ignore patterns"
            button_key="prettierignore"
            copied_key={copied_key}
            OnCopy={() =>
              HandleCopy(
                output.prettierignore,
                '.prettierignore',
                'prettierignore'
              )
            }
            OnDownload={() =>
              HandleDownload(output.prettierignore, '.prettierignore')
            }
          />
          <SimpleCodeTab
            tab_value="gitignore"
            content={output.gitignore}
            placeholder="# Select a framework to generate gitignore"
            button_key="gitignore"
            copied_key={copied_key}
            OnCopy={() =>
              HandleCopy(output.gitignore, '.gitignore', 'gitignore')
            }
            OnDownload={() => HandleDownload(output.gitignore, '.gitignore')}
          />
          <FormatTab
            content={output.format_script}
            copied_key={copied_key}
            OnCopy={() =>
              HandleCopy(
                output.format_script,
                'format-script.txt',
                'format_script'
              )
            }
            OnDownload={() =>
              HandleDownload(output.format_script, 'format-script.txt')
            }
          />
        </Tabs>
      </CardContent>
    </Card>
  );
}

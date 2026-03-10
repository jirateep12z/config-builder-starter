import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  CodeBlock,
  CodeBlockContent,
  CodeBlockHeader,
  CodeBlockTitle
} from '@/components/ui/code-block';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, Copy, Download, FileCode, Terminal } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ESLINT_FILENAME_MAP,
  PRETTIER_FILENAME_MAP
} from '../constants/builder';
import { DownloadTextFile } from '../services/download-text-file';
import type { CopyMode, EslintFormat, OutputFormat } from '../types/builder';
import type {
  CodeFileProps,
  CopyButtonProps,
  EslintrcTabProps,
  FileActionButtonsProps,
  FormatTabProps,
  InstallTabProps,
  OutputPreviewProps,
  SimpleCodeTabProps
} from '../types/components';
import type { PackageManager } from '../types/package-manager';
import { SectionHeader } from './section-header';

function CopyButton({ button_key, copied_key, OnCopy }: CopyButtonProps) {
  const is_copied = copied_key === button_key;

  return (
    <Button variant="ghost" size="sm" onClick={OnCopy}>
      {is_copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
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
    <div className="ms-auto flex shrink-0 items-center gap-1">
      {OnDownload ? (
        <Button variant="ghost" size="sm" onClick={OnDownload}>
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

function CodeFile({
  filename,
  content,
  button_key,
  copied_key,
  is_wrapped = false,
  content_class_name,
  OnCopy,
  OnDownload
}: CodeFileProps) {
  return (
    <CodeBlock>
      <CodeBlockHeader>
        <CodeBlockTitle className="font-mono">{filename}</CodeBlockTitle>
        <FileActionButtons
          button_key={button_key}
          copied_key={copied_key}
          OnCopy={OnCopy}
          OnDownload={OnDownload}
        />
      </CodeBlockHeader>
      <CodeBlockContent wrap={is_wrapped} className={content_class_name}>
        {content}
      </CodeBlockContent>
    </CodeBlock>
  );
}

function InstallTab({
  package_manager,
  install_command,
  copied_key,
  filename,
  OnChangePackageManager,
  OnCopy,
  OnDownload
}: InstallTabProps) {
  return (
    <TabsContent value="install" className="mt-4 space-y-3">
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
      <CodeFile
        filename={filename}
        content={install_command}
        button_key="install"
        copied_key={copied_key}
        is_wrapped
        OnCopy={OnCopy}
        OnDownload={OnDownload}
      />
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
  filename,
  is_legacy_available,
  OnChangeFormat,
  OnCopy,
  OnDownload
}: EslintrcTabProps) {
  return (
    <TabsContent value="eslintrc" className="mt-4 space-y-3">
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
      <CodeFile
        filename={filename}
        content={content}
        button_key="eslintrc"
        copied_key={copied_key}
        content_class_name="max-h-80"
        OnCopy={OnCopy}
        OnDownload={OnDownload}
      />
    </TabsContent>
  );
}

function SimpleCodeTab({
  tab_value,
  content,
  placeholder,
  button_key,
  copied_key,
  filename,
  OnCopy,
  OnDownload
}: SimpleCodeTabProps) {
  return (
    <TabsContent value={tab_value} className="mt-4">
      <CodeFile
        filename={filename}
        content={content || placeholder}
        button_key={button_key}
        copied_key={copied_key}
        content_class_name="max-h-80"
        OnCopy={OnCopy}
        OnDownload={OnDownload}
      />
    </TabsContent>
  );
}

function FormatTab({
  content,
  copied_key,
  filename,
  OnCopy,
  OnDownload
}: FormatTabProps) {
  return (
    <TabsContent value="format" className="mt-4 space-y-3">
      <CodeFile
        filename={filename}
        content={content || '// Select a framework to generate format script'}
        button_key="format_script"
        copied_key={copied_key}
        OnCopy={OnCopy}
        OnDownload={OnDownload}
      />
      <p className="text-muted-foreground text-xs">
        เพิ่ม script นี้ใน package.json เพื่อ format โค้ดด้วย Prettier
      </p>
    </TabsContent>
  );
}

export function OutputPreview({
  output,
  output_format,
  GenerateEslintConfig,
  GenerateInstallCommand,
  GetIsEslintFormatAvailable,
  OnCopy,
  OnFormatChange
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

  return (
    <Card>
      <SectionHeader
        icon={FileCode}
        title="Generated Files"
        description={
          copy_failed ? (
            <span role="status" aria-live="polite" className="text-destructive">
              Copy failed — clipboard not available
            </span>
          ) : (
            'Copy or download each generated file'
          )
        }
        action={
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
        }
      />
      <CardContent>
        <Tabs defaultValue="install" className="w-full">
          <TabsList className="mb-3 flex h-auto w-full flex-nowrap justify-start overflow-auto p-1">
            <TabsTrigger
              value="install"
              className="min-w-max flex-1 gap-1.5 px-2.5 py-2"
            >
              <Terminal className="h-3.5 w-3.5" />
              <span>Install</span>
            </TabsTrigger>
            <TabsTrigger
              value="eslintrc"
              className="min-w-max flex-1 px-2.5 py-2"
            >
              <span className="font-mono text-xs">eslint</span>
            </TabsTrigger>
            <TabsTrigger
              value="prettierrc"
              className="min-w-max flex-1 px-2.5 py-2"
            >
              <span className="font-mono text-xs">.prettierrc</span>
            </TabsTrigger>
            <TabsTrigger
              value="prettierignore"
              className="min-w-max flex-1 px-2.5 py-2"
            >
              <span className="font-mono text-xs">.prettierignore</span>
            </TabsTrigger>
            <TabsTrigger
              value="gitignore"
              className="min-w-max flex-1 px-2.5 py-2"
            >
              <span className="font-mono text-xs">.gitignore</span>
            </TabsTrigger>
            <TabsTrigger
              value="format"
              className="min-w-max flex-1 px-2.5 py-2"
            >
              <span className="font-mono text-xs">format</span>
            </TabsTrigger>
          </TabsList>
          <InstallTab
            package_manager={package_manager}
            install_command={install_command_content}
            copied_key={copied_key}
            filename="install-command.txt"
            OnChangePackageManager={set_package_manager}
            OnCopy={() =>
              HandleCopy(
                install_command_content,
                'install-command.txt',
                'install'
              )
            }
            OnDownload={() =>
              DownloadTextFile(install_command_content, 'install-command.txt')
            }
          />
          <EslintrcTab
            eslint_format={active_eslint_format}
            content={eslint_config_content}
            copied_key={copied_key}
            filename={eslint_filename}
            is_legacy_available={is_legacy_eslint_available}
            OnChangeFormat={set_eslint_format}
            OnCopy={() =>
              HandleCopy(eslint_config_content, eslint_filename, 'eslintrc')
            }
            OnDownload={() =>
              DownloadTextFile(eslint_config_content, eslint_filename)
            }
          />
          <SimpleCodeTab
            tab_value="prettierrc"
            content={output.prettierrc}
            placeholder="// Select a framework to generate configuration"
            button_key="prettierrc"
            copied_key={copied_key}
            filename={prettierrc_filename}
            OnCopy={() =>
              HandleCopy(output.prettierrc, prettierrc_filename, 'prettierrc')
            }
            OnDownload={() =>
              DownloadTextFile(output.prettierrc, prettierrc_filename)
            }
          />
          <SimpleCodeTab
            tab_value="prettierignore"
            content={output.prettierignore}
            placeholder="# Select a framework to generate ignore patterns"
            button_key="prettierignore"
            copied_key={copied_key}
            filename=".prettierignore"
            OnCopy={() =>
              HandleCopy(
                output.prettierignore,
                '.prettierignore',
                'prettierignore'
              )
            }
            OnDownload={() =>
              DownloadTextFile(output.prettierignore, '.prettierignore')
            }
          />
          <SimpleCodeTab
            tab_value="gitignore"
            content={output.gitignore}
            placeholder="# Select a framework to generate gitignore"
            button_key="gitignore"
            copied_key={copied_key}
            filename=".gitignore"
            OnCopy={() =>
              HandleCopy(output.gitignore, '.gitignore', 'gitignore')
            }
            OnDownload={() => DownloadTextFile(output.gitignore, '.gitignore')}
          />
          <FormatTab
            content={output.format_script}
            copied_key={copied_key}
            filename="format-script.txt"
            OnCopy={() =>
              HandleCopy(
                output.format_script,
                'format-script.txt',
                'format_script'
              )
            }
            OnDownload={() =>
              DownloadTextFile(output.format_script, 'format-script.txt')
            }
          />
        </Tabs>
      </CardContent>
    </Card>
  );
}

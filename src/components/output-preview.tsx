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
import type {
  EslintFormat,
  OutputFormat,
  OutputPreviewProps,
  PackageManager
} from '@/types';
import { Check, Copy, Terminal } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export function OutputPreview({
  output,
  output_format,
  OnFormatChange,
  OnCopy,
  GenerateInstallCommand,
  GenerateEslintConfig
}: OutputPreviewProps) {
  const [copied_prettierrc, set_copied_prettierrc] = useState(false);
  const [copied_prettierignore, set_copied_prettierignore] = useState(false);
  const [copied_gitignore, set_copied_gitignore] = useState(false);
  const [copied_eslintrc, set_copied_eslintrc] = useState(false);
  const [copied_format_script, set_copied_format_script] = useState(false);
  const [copied_install, set_copied_install] = useState(false);
  const [failed_button, set_failed_button] = useState<string | null>(null);
  const [copy_mode, set_copy_mode] = useState<'content' | 'filename'>(
    'content'
  );
  const [package_manager, set_package_manager] =
    useState<PackageManager>('npm');
  const [eslint_format, set_eslint_format] = useState<EslintFormat>('flat');

  const timeout_refs = useRef<Record<string, ReturnType<typeof setTimeout>>>(
    {}
  );

  const eslint_config_content = useMemo(() => {
    const result = GenerateEslintConfig(eslint_format);
    if (result) return result;
    const framework_selected = !!output.format_script;
    return framework_selected
      ? '// ESLint is not configured for this framework'
      : '// Select a framework to generate ESLint configuration';
  }, [GenerateEslintConfig, eslint_format, output.format_script]);

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
    (
      success: boolean,
      set_copied: (v: boolean) => void,
      button_key: string
    ) => {
      if (success) {
        clearTimeout(timeout_refs.current[button_key]);
        set_copied(true);
        set_failed_button(null);
        timeout_refs.current[button_key] = setTimeout(
          () => set_copied(false),
          2000
        );
      } else {
        clearTimeout(timeout_refs.current['failed']);
        set_failed_button(button_key);
        timeout_refs.current['failed'] = setTimeout(
          () => set_failed_button(null),
          2000
        );
      }
    },
    []
  );

  const GetPrettierrcFilename = useCallback((): string => {
    switch (output_format) {
      case 'json':
        return '.prettierrc';
      case 'yaml':
        return '.prettierrc.yaml';
      case 'js':
        return '.prettierrc.js';
    }
  }, [output_format]);

  const GetEslintrcFilename = useCallback((): string => {
    return eslint_format === 'flat' ? 'eslint.config.js' : '.eslintrc.json';
  }, [eslint_format]);

  const HandleCopyPrettierrc = useCallback(async () => {
    const text =
      copy_mode === 'filename' ? GetPrettierrcFilename() : output.prettierrc;
    const success = await OnCopy(text);
    HandleCopyResult(success, set_copied_prettierrc, 'prettierrc');
  }, [
    copy_mode,
    output.prettierrc,
    OnCopy,
    HandleCopyResult,
    GetPrettierrcFilename
  ]);

  const HandleCopyPrettierignore = useCallback(async () => {
    const text =
      copy_mode === 'filename' ? '.prettierignore' : output.prettierignore;
    const success = await OnCopy(text);
    HandleCopyResult(success, set_copied_prettierignore, 'prettierignore');
  }, [copy_mode, output.prettierignore, OnCopy, HandleCopyResult]);

  const HandleCopyInstall = useCallback(async () => {
    const success = await OnCopy(install_command_content);
    HandleCopyResult(success, set_copied_install, 'install');
  }, [install_command_content, OnCopy, HandleCopyResult]);

  const HandleCopyGitignore = useCallback(async () => {
    const text = copy_mode === 'filename' ? '.gitignore' : output.gitignore;
    const success = await OnCopy(text);
    HandleCopyResult(success, set_copied_gitignore, 'gitignore');
  }, [copy_mode, output.gitignore, OnCopy, HandleCopyResult]);

  const HandleCopyEslintrc = useCallback(async () => {
    const text =
      copy_mode === 'filename' ? GetEslintrcFilename() : eslint_config_content;
    const success = await OnCopy(text);
    HandleCopyResult(success, set_copied_eslintrc, 'eslintrc');
  }, [
    copy_mode,
    eslint_config_content,
    OnCopy,
    HandleCopyResult,
    GetEslintrcFilename
  ]);

  const HandleCopyFormatScript = useCallback(async () => {
    const success = await OnCopy(output.format_script);
    HandleCopyResult(success, set_copied_format_script, 'format_script');
  }, [output.format_script, OnCopy, HandleCopyResult]);

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <span>📄</span>
            Generated Files
            {failed_button && (
              <span className="ml-1 text-xs font-normal text-red-500">
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
                <SelectTrigger className="w-24">
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
                onValueChange={(value: 'content' | 'filename') =>
                  set_copy_mode(value)
                }
              >
                <SelectTrigger className="w-28">
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
              <span className="font-mono text-xs">ignore</span>
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
          <TabsContent value="install" className="mt-4 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <Select
                value={package_manager}
                onValueChange={(value: PackageManager) =>
                  set_package_manager(value)
                }
              >
                <SelectTrigger className="w-28">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="npm">npm</SelectItem>
                  <SelectItem value="yarn">yarn</SelectItem>
                  <SelectItem value="pnpm">pnpm</SelectItem>
                  <SelectItem value="bun">bun</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 border-neutral-400/50 text-neutral-700 hover:border-neutral-500 hover:bg-neutral-100 hover:text-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-800/50"
                onClick={HandleCopyInstall}
              >
                {copied_install ? (
                  <Check className="h-4 w-4 text-neutral-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                {copied_install ? 'Copied!' : 'Copy'}
              </Button>
            </div>
            <pre className="bg-muted max-w-full overflow-auto rounded-lg p-4 font-mono text-sm">
              <code className="break-all whitespace-pre-wrap">
                {install_command_content}
              </code>
            </pre>
            <p className="text-muted-foreground text-xs">
              รันคำสั่งนี้ใน terminal เพื่อติดตั้ง Prettier และ plugins
              ที่จำเป็น
            </p>
          </TabsContent>
          <TabsContent value="prettierrc" className="mt-4 space-y-3">
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 border-neutral-400/50 text-neutral-700 hover:border-neutral-500 hover:bg-neutral-100 hover:text-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-800/50"
                onClick={HandleCopyPrettierrc}
              >
                {copied_prettierrc ? (
                  <Check className="h-4 w-4 text-neutral-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                {copied_prettierrc ? 'Copied!' : 'Copy'}
              </Button>
            </div>
            <pre className="bg-muted max-h-80 overflow-auto rounded-lg p-4 font-mono text-sm">
              <code>
                {output.prettierrc ||
                  '// Select a framework to generate configuration'}
              </code>
            </pre>
          </TabsContent>
          <TabsContent value="eslintrc" className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <Select
                value={eslint_format}
                onValueChange={(value: EslintFormat) =>
                  set_eslint_format(value)
                }
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="flat">Flat Config</SelectItem>
                  <SelectItem value="legacy">Legacy</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5 border-neutral-400/50 text-neutral-700 hover:border-neutral-500 hover:bg-neutral-100 hover:text-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-800/50"
                  onClick={HandleCopyEslintrc}
                >
                  {copied_eslintrc ? (
                    <Check className="h-4 w-4 text-neutral-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  {copied_eslintrc ? 'Copied!' : 'Copy'}
                </Button>
              </div>
            </div>
            <pre className="bg-muted max-h-80 overflow-auto rounded-lg p-4 font-mono text-sm">
              <code>{eslint_config_content}</code>
            </pre>
          </TabsContent>
          <TabsContent value="prettierignore" className="mt-4 space-y-3">
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 border-neutral-400/50 text-neutral-700 hover:border-neutral-500 hover:bg-neutral-100 hover:text-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-800/50"
                onClick={HandleCopyPrettierignore}
              >
                {copied_prettierignore ? (
                  <Check className="h-4 w-4 text-neutral-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                {copied_prettierignore ? 'Copied!' : 'Copy'}
              </Button>
            </div>
            <pre className="bg-muted max-h-80 overflow-auto rounded-lg p-4 font-mono text-sm">
              <code>
                {output.prettierignore ||
                  '# Select a framework to generate ignore patterns'}
              </code>
            </pre>
          </TabsContent>
          <TabsContent value="gitignore" className="mt-4 space-y-3">
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 border-neutral-400/50 text-neutral-700 hover:border-neutral-500 hover:bg-neutral-100 hover:text-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-800/50"
                onClick={HandleCopyGitignore}
              >
                {copied_gitignore ? (
                  <Check className="h-4 w-4 text-neutral-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                {copied_gitignore ? 'Copied!' : 'Copy'}
              </Button>
            </div>
            <pre className="bg-muted max-h-80 overflow-auto rounded-lg p-4 font-mono text-sm">
              <code>
                {output.gitignore ||
                  '# Select a framework to generate gitignore'}
              </code>
            </pre>
          </TabsContent>
          <TabsContent value="format" className="mt-4 space-y-3">
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 border-neutral-400/50 text-neutral-700 hover:border-neutral-500 hover:bg-neutral-100 hover:text-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-800/50"
                onClick={HandleCopyFormatScript}
              >
                {copied_format_script ? (
                  <Check className="h-4 w-4 text-neutral-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                {copied_format_script ? 'Copied!' : 'Copy'}
              </Button>
            </div>
            <pre className="bg-muted overflow-auto rounded-lg p-4 font-mono text-sm">
              <code>
                {output.format_script ||
                  '// Select a framework to generate format script'}
              </code>
            </pre>
            <p className="text-muted-foreground text-xs">
              เพิ่ม script นี้ใน package.json เพื่อ format โค้ดด้วย Prettier
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

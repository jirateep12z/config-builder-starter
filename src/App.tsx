import { FrameworkIcon } from '@/components/framework-icons';
import { FrameworkSelector } from '@/components/framework-selector';
import { Header } from '@/components/header';
import { IgnorePatternsEditor } from '@/components/ignore-patterns-editor';
import { OutputPreview } from '@/components/output-preview';
import { PrettierConfigEditor } from '@/components/prettier-config-editor';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { UseBuilder } from '@/hooks/use-builder';
import { CopyToClipboard } from '@/lib/clipboard';
import { RotateCcw } from 'lucide-react';

function Footer() {
  return (
    <footer className="border-t py-6">
      <div className="text-muted-foreground container mx-auto px-4 text-center text-sm">
        <p>Built with ❤️ using React, TailwindCSS, and shadcn/ui</p>
      </div>
    </footer>
  );
}

function App() {
  const {
    state,
    output,
    output_format,
    selected_framework_data,
    SelectOutputFormat,
    SelectFramework,
    UpdatePrettierConfig,
    ToggleIgnorePattern,
    AddCustomPattern,
    RemoveCustomPattern,
    AddCommonPatterns,
    ResetToFrameworkDefaults,
    GenerateEslintConfig,
    GenerateInstallCommand
  } = UseBuilder();

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <FrameworkSelector
            selected_framework={state.selected_framework}
            OnSelect={SelectFramework}
          />
          <Separator />
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold">
                {selected_framework_data?.icon_id ? (
                  <FrameworkIcon
                    icon_id={selected_framework_data.icon_id}
                    class_name="mr-2 inline-block h-5 w-5 align-[-2px]"
                  />
                ) : null}
                {selected_framework_data?.name} Configuration
              </h2>
              <p className="text-muted-foreground text-sm">
                {selected_framework_data?.description}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full gap-1.5 sm:w-auto"
              onClick={ResetToFrameworkDefaults}
            >
              <RotateCcw className="h-4 w-4" />
              Reset to Defaults
            </Button>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="min-w-0 space-y-6">
              <PrettierConfigEditor
                config={state.prettier_config}
                OnUpdate={UpdatePrettierConfig}
              />
              <IgnorePatternsEditor
                patterns={state.ignore_patterns}
                custom_patterns={state.custom_patterns}
                OnToggle={ToggleIgnorePattern}
                OnAddCustom={AddCustomPattern}
                OnRemoveCustom={RemoveCustomPattern}
                OnAddCommonPatterns={AddCommonPatterns}
              />
            </div>
            <div className="min-w-0 lg:sticky lg:top-24 lg:self-start">
              <OutputPreview
                output={output}
                output_format={output_format}
                OnFormatChange={SelectOutputFormat}
                OnCopy={CopyToClipboard}
                GenerateInstallCommand={GenerateInstallCommand}
                GenerateEslintConfig={GenerateEslintConfig}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;

import { Button } from '@/components/ui/button';
import { TooltipProvider } from '@/components/ui/tooltip';
import { RotateCcw } from 'lucide-react';
import { FrameworkIcon } from './components/framework-icons';
import { FrameworkSelector } from './components/framework-selector';
import { Header } from './components/header';
import { IgnorePatternsEditor } from './components/ignore-patterns-editor';
import { OutputPreview } from './components/output-preview';
import { PrettierConfigEditor } from './components/prettier-config-editor';
import { UseBuilder } from './hooks/use-builder';
import { CopyToClipboard } from './services/copy-to-clipboard';

export function ConfigBuilderApp() {
  const {
    state,
    output,
    output_format,
    selected_framework_data,
    GenerateEslintConfig,
    GenerateInstallCommand,
    GetIsEslintFormatAvailable,
    AddCommonPatterns,
    AddCustomPattern,
    RemoveCustomPattern,
    ResetToFrameworkDefaults,
    SelectFramework,
    SelectOutputFormat,
    ToggleIgnorePattern,
    UpdatePrettierConfig
  } = UseBuilder();

  return (
    <TooltipProvider>
      <div className="bg-muted/40 min-h-screen">
        <Header />
        <main className="mx-auto grid w-full max-w-screen-2xl gap-6 px-4 py-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:px-6">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <FrameworkSelector
              selected_framework={state.selected_framework}
              OnSelect={SelectFramework}
            />
          </aside>
          <section className="min-w-0 space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 items-center gap-4">
                {selected_framework_data?.icon_id ? (
                  <span className="bg-card ring-foreground/10 flex size-10 shrink-0 items-center justify-center rounded-lg ring-1">
                    <FrameworkIcon
                      icon_id={selected_framework_data.icon_id}
                      class_name="h-6 w-6"
                    />
                  </span>
                ) : null}
                <div className="min-w-0 space-y-0.5">
                  <h2 className="text-xl font-semibold tracking-tight">
                    {selected_framework_data?.name} Configuration
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    {selected_framework_data?.description}
                  </p>
                </div>
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
            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
              <div className="min-w-0 space-y-6">
                <PrettierConfigEditor
                  config={state.prettier_config}
                  OnUpdate={UpdatePrettierConfig}
                />
                <IgnorePatternsEditor
                  patterns={state.ignore_patterns}
                  custom_patterns={state.custom_patterns}
                  OnAddCommonPatterns={AddCommonPatterns}
                  OnAddCustom={AddCustomPattern}
                  OnRemoveCustom={RemoveCustomPattern}
                  OnToggle={ToggleIgnorePattern}
                />
              </div>
              <div className="min-w-0 xl:sticky xl:top-24 xl:self-start">
                <OutputPreview
                  output={output}
                  output_format={output_format}
                  GenerateEslintConfig={GenerateEslintConfig}
                  GenerateInstallCommand={GenerateInstallCommand}
                  GetIsEslintFormatAvailable={GetIsEslintFormatAvailable}
                  OnCopy={CopyToClipboard}
                  OnFormatChange={SelectOutputFormat}
                />
              </div>
            </div>
          </section>
        </main>
      </div>
    </TooltipProvider>
  );
}

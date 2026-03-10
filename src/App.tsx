import { FrameworkIcon } from '@/components/framework-icons';
import { FrameworkSelector } from '@/components/framework-selector';
import { Header } from '@/components/header';
import { IgnorePatternsEditor } from '@/components/ignore-patterns-editor';
import { OutputPreview } from '@/components/output-preview';
import { PrettierConfigEditor } from '@/components/prettier-config-editor';
import { Button } from '@/components/ui/button';
import { UseBuilder } from '@/hooks/use-builder';
import { CopyToClipboard } from '@/lib/clipboard';
import { RotateCcw } from 'lucide-react';

function App() {
  const {
    state,
    output,
    output_format,
    selected_framework_data,
    GenerateEslintConfig,
    GetIsEslintFormatAvailable,
    GenerateInstallCommand,
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
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <Header />
      <main className="mx-auto grid w-full max-w-[1680px] gap-6 px-4 py-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-6">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <FrameworkSelector
            selected_framework={state.selected_framework}
            OnSelect={SelectFramework}
          />
        </aside>
        <section className="min-w-0 space-y-6">
          <div className="border-b pb-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0 space-y-1">
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
          </div>
          <div className="grid gap-6 xl:grid-cols-[minmax(0,0.95fr)_minmax(380px,1.05fr)]">
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
                GenerateInstallCommand={GenerateInstallCommand}
                GenerateEslintConfig={GenerateEslintConfig}
                GetIsEslintFormatAvailable={GetIsEslintFormatAvailable}
                OnFormatChange={SelectOutputFormat}
                OnCopy={CopyToClipboard}
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;

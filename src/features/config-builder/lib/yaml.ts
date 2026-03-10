import type { YamlSerializer } from '../types/builder';

let yaml_serializer_promise: Promise<YamlSerializer> | undefined;

export function LoadYamlSerializer(): Promise<YamlSerializer> {
  yaml_serializer_promise ??= import('js-yaml')
    .then(
      ({ dump }): YamlSerializer =>
        obj =>
          dump(obj, { indent: 2, lineWidth: -1 })
    )
    .catch((error: unknown) => {
      // Clear the cache so the next call retries instead of reusing a rejection.
      yaml_serializer_promise = undefined;

      throw error;
    });

  return yaml_serializer_promise;
}

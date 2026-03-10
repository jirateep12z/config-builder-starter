export const PERFECTIONIST_ESLINT_PACKAGE =
  'eslint-plugin-perfectionist' as const;
export const PERFECTIONIST_ESLINT_PLUGIN = 'perfectionist' as const;

export const CALLBACK_ORDER_EXCLUDED_FILES = [
  'src/components/ui/**/*.{js,jsx,ts,tsx,vue,svelte,astro}'
] as const;

const CALLBACK_GROUP_NAME = 'callback';
const CALLBACK_NAME_PATTERN = {
  pattern: '^(?:on.*|.*(?:callback|handler))$',
  flags: 'i'
} as const;

const CALLBACK_ORDER_OPTIONS = {
  type: 'unsorted',
  groups: [
    'unknown',
    {
      group: CALLBACK_GROUP_NAME,
      type: 'alphabetical',
      order: 'asc'
    }
  ],
  customGroups: [
    {
      groupName: CALLBACK_GROUP_NAME,
      elementNamePattern: CALLBACK_NAME_PATTERN
    }
  ]
} as const;

export const CALLBACK_ORDER_RULES = Object.freeze({
  'perfectionist/sort-interfaces': ['error', CALLBACK_ORDER_OPTIONS],
  'perfectionist/sort-jsx-props': ['error', CALLBACK_ORDER_OPTIONS],
  'perfectionist/sort-object-types': ['error', CALLBACK_ORDER_OPTIONS],
  'perfectionist/sort-objects': ['error', CALLBACK_ORDER_OPTIONS]
});

export const DISABLED_CALLBACK_ORDER_RULES = Object.freeze(
  Object.fromEntries(
    Object.keys(CALLBACK_ORDER_RULES).map(rule_id => [rule_id, 'off' as const])
  )
);

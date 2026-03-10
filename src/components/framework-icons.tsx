import type { FrameworkIconProps } from '@/types/framework-icons';
import { AngularIcon } from './framework-icons/angular-icon';
import { AstroIcon } from './framework-icons/astro-icon';
import { LaravelIcon } from './framework-icons/laravel-icon';
import { NestjsIcon } from './framework-icons/nestjs-icon';
import { NextjsIcon } from './framework-icons/nextjs-icon';
import { NuxtIcon } from './framework-icons/nuxt-icon';
import { ReactIcon } from './framework-icons/react-icon';
import { SvelteIcon } from './framework-icons/svelte-icon';
import { VanillaIcon } from './framework-icons/vanilla-icon';
import { ViteIcon } from './framework-icons/vite-icon';
import { VueIcon } from './framework-icons/vue-icon';

export function FrameworkIcon({ icon_id, class_name }: FrameworkIconProps) {
  switch (icon_id) {
    case 'vanilla':
      return <VanillaIcon class_name={class_name} />;
    case 'vite':
      return <ViteIcon class_name={class_name} />;
    case 'laravel':
      return <LaravelIcon class_name={class_name} />;
    case 'react':
      return <ReactIcon class_name={class_name} />;
    case 'nextjs':
      return <NextjsIcon class_name={class_name} />;
    case 'vue':
      return <VueIcon class_name={class_name} />;
    case 'nuxt':
      return <NuxtIcon class_name={class_name} />;
    case 'svelte':
      return <SvelteIcon class_name={class_name} />;
    case 'astro':
      return <AstroIcon class_name={class_name} />;
    case 'angular':
      return <AngularIcon class_name={class_name} />;
    case 'nestjs':
      return <NestjsIcon class_name={class_name} />;
  }
}

import { useCallback, useEffect, useState } from 'react';

export function UseTheme() {
  const [is_dark, set_is_dark] = useState(() => {
    try {
      if (typeof window === 'undefined') return false;
      const stored = localStorage.getItem('theme');
      if (stored) return stored === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch (error) {
      console.warn('Failed to read theme preference:', error);
      return false;
    }
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', is_dark);
  }, [is_dark]);

  const ToggleTheme = useCallback(() => {
    set_is_dark(prev => !prev);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('theme', is_dark ? 'dark' : 'light');
    } catch (error) {
      console.warn('Failed to save theme preference:', error);
    }
  }, [is_dark]);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const HandleChange = (e: MediaQueryListEvent) => {
      try {
        if (!localStorage.getItem('theme')) {
          set_is_dark(e.matches);
        }
      } catch {
        set_is_dark(e.matches);
      }
    };
    media.addEventListener('change', HandleChange);
    return () => media.removeEventListener('change', HandleChange);
  }, []);

  return { is_dark, ToggleTheme };
}

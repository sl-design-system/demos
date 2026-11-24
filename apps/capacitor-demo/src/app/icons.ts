import { Icon } from '@sl-design-system/icon';

/**
 * The Sanoma Learning theme has no icons for the "Components" and "Settings"
 * tabs, so the app registers two simple ones of its own.
 */
export function registerAppIcons(): void {
  Icon.register({
    'demo-grid': {
      svg: '<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M64 64h160v160H64zM288 64h160v160H288zM64 288h160v160H64zM288 288h160v160H288z" fill="var(--sl-icon-fill-default)"></path></svg>',
    },
    'demo-sliders': {
      svg: '<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M32 76h448v40H32zM32 236h448v40H32zM32 396h448v40H32zM112 96a48 48 0 1 0 96 0a48 48 0 1 0-96 0zM304 256a48 48 0 1 0 96 0a48 48 0 1 0-96 0zM160 416a48 48 0 1 0 96 0a48 48 0 1 0-96 0z" fill="var(--sl-icon-fill-default)"></path></svg>',
    },
  });
}

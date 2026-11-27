import type { LitElement } from 'lit';
import { AssignmentScreen } from './assignment/assignment-screen.js';
import { CoursesScreen } from './courses/courses-screen.js';
import { ProfileScreen } from './profile/profile-screen.js';

export interface ShowcaseScreen {
  /** URL segment, e.g. `courses` for `/showcase/courses`. */
  slug: string;
  name: string;
  /** Which components the screen combines. */
  description: string;
  /** The screen, registered by `App` as `<showcase-{slug}>`. */
  page: typeof LitElement;
}

/** Complete screens that combine SLDS components the way a real app would. */
export const showcaseScreens: ShowcaseScreen[] = [
  {
    slug: 'courses',
    name: 'My courses',
    description: 'Search, filter chips, cards, tags and avatars',
    page: CoursesScreen,
  },
  {
    slug: 'assignment',
    name: 'New assignment',
    description: 'A validated form with dates, times and selects',
    page: AssignmentScreen,
  },
  {
    slug: 'profile',
    name: 'Profile',
    description: 'Switches, radios, a select and a confirm dialog',
    page: ProfileScreen,
  },
];

export function findShowcaseScreen(slug: string): ShowcaseScreen | undefined {
  return showcaseScreens.find((screen) => screen.slug === slug);
}

/** All screens as scoped elements, keyed by their `showcase-{slug}` tag name. */
export function showcaseElements(): Record<string, typeof LitElement> {
  return Object.fromEntries(
    showcaseScreens.map((screen) => [`showcase-${screen.slug}`, screen.page]),
  );
}

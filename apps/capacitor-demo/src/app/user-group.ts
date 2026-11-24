/**
 * The Sanoma Learning theme scales its typography per user group: younger
 * readers get larger text. The group is selected with `data-user-group` on
 * <body>; without it the theme uses `superuser` (adults).
 */
export type UserGroup = 'early' | 'developing' | 'advanced' | 'superuser';

const STORAGE_KEY = 'slds-demo:user-group';

function isUserGroup(value: string | null): value is UserGroup {
  return (
    value === 'early' ||
    value === 'developing' ||
    value === 'advanced' ||
    value === 'superuser'
  );
}

export function getUserGroup(): UserGroup {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return isUserGroup(stored) ? stored : 'superuser';
}

function apply(): void {
  const group = getUserGroup();
  if (group === 'superuser') {
    delete document.body.dataset['userGroup'];
  } else {
    document.body.dataset['userGroup'] = group;
  }
}

export function setUserGroup(group: UserGroup): void {
  if (group === 'superuser') {
    window.localStorage.removeItem(STORAGE_KEY);
  } else {
    window.localStorage.setItem(STORAGE_KEY, group);
  }

  apply();
}

export function initUserGroup(): void {
  apply();
}

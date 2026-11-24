# SLDS on mobile: findings

Results of running the SL Design System inside this Capacitor app on a phone-sized screen. Each finding is written as an issue draft for the [components repository](https://github.com/sl-design-system/components): what happens, how to see it in this demo, and a suggested fix.

## How this was tested

- **Devices:** iOS 27.2 simulator (iPhone 18 Pro, portrait and landscape) and a 375 × 812 browser viewport. Android was not tested (no Android SDK on the test machine).
- **Packages:** the versions in the root `package.json` at the time of writing (for example `@sl-design-system/button` 2.3.2, `form` 1.7.0, `sanoma-learning` 2.0.0).
- **Automated checks**, run on all 33 screens of the app (catalog, 27 component demos, 3 showcase screens, settings), in light and dark mode:
  - [axe-core](https://github.com/dequelabs/axe-core) 4.14 with the WCAG 2.0, 2.1 and 2.2 A/AA rules.
  - A touch target script that measures every tappable SLDS element.
  - A search of the published component styles for `:hover` rules.
- **Manual checks** on the simulator: keyboard and input behaviour, dialogs, date picker, safe areas, rotation, dark mode.

## Summary

| #   | Finding                                              | Components                           | Severity |
| --- | ---------------------------------------------------- | ------------------------------------ | -------- |
| 1   | Default control sizes are below mobile touch targets | Most interactive components          | High     |
| 2   | Inputs make iOS zoom the page                        | All text-entry components            | High     |
| 3   | Hover styles stick after a tap                       | 22 packages                          | Medium   |
| 4   | Dialog bottom sheet ignores the home indicator       | `dialog`                             | Medium   |
| 5   | Validation announcements throw inside shadow DOM     | `form`                               | Medium   |
| 6   | `sl-form` reports valid before its controls register | `form`                               | Low      |
| 7   | Toggle groups don't wrap                             | `toggle-group`                       | Low      |
| 8   | Select-only date field shows iOS selection handles   | `date-field`                         | Low      |
| 9   | Toggle button icons need `slot="default"`            | `toggle-button`                      | Low (DX) |
| 10  | Form values are strings                              | `form`, `date-field`, `number-field` | Low (DX) |
| 11  | No bottom navigation; theme lacks common app icons   | new component, `sanoma-learning`     | Request  |

What passed is listed at the end.

---

## 1. Default control sizes are below mobile touch targets

**Severity:** high. **Components:** button, toggle button, menu button, text field, number field, select, combobox, date field, time field, infotip, checkbox, radio, switch, tag.

Apple asks for touch targets of at least 44 × 44 pt and Material for 48 × 48 dp. At the default size (`md`) almost every SLDS control is smaller:

| Element                                                                | Measured size (height) |
| ---------------------------------------------------------------------- | ---------------------- |
| `sl-button`, text/number/select/combobox/date/time fields, menu button | 36 px                  |
| `sl-toggle-button`, `sl-infotip` (md)                                  | 36 × 36 px             |
| Field buttons (calendar, clock, number step buttons)                   | 35 × 34 px             |
| `sl-checkbox`, `sl-radio`, `sl-switch` (md)                            | 32 px                  |
| `size="sm"` buttons, toggle buttons, infotips, switches; `sl-tag`      | 24 px                  |
| Tag remove button                                                      | **22 × 22 px**         |

Only `size="lg"` reaches 44 px; tabs (44 px) and accordion summaries (46 px) are fine. The tag remove button is below the WCAG 2.2 AA minimum of 24 × 24 px as well (axe doesn't flag it because of the spacing exception).

**See it:** Components → Button, Checkbox, Tag.

**Suggested fix:** the theme already switches to mobile tokens below 600 px (`device/mobile.css`), but control heights don't change. Raising the default control height to 44 px in the mobile token set (or adding a "touch" density) would fix this everywhere without app changes. Give the tag remove button a larger hit area (padding or a pseudo-element) even if the icon stays small.

## 2. Inputs make iOS zoom the page

**Severity:** high. **Components:** text field, text area, search field, number field, combobox, date field, time field.

For the default user group (`superuser`) inputs use a 14 px font, also at `size="lg"`. iOS zooms the whole page when an input with a font size under 16 px gets focus, and stays zoomed in after editing. In an app this shifts the header, cuts off content and looks broken. The younger user groups (`early`, `developing`, `advanced`) use 16–20 px and are not affected.

**See it:** run the app on iOS without the workaround (remove `preventInputZoomOnIOS()` from `src/index.ts`) and tap a field in Components → Text field.

**Workaround in this app:** `maximum-scale=1` is added to the viewport meta tag, only inside the native iOS app. It also disables pinch-zoom, which axe reports as a WCAG 1.4.4 violation, so the web build doesn't use it.

**Suggested fix:** a 16 px minimum font size for form controls on touch devices, for example `@media (pointer: coarse) { font-size: max(16px, …) }` or a mobile token.

## 3. Hover styles stick after a tap

**Severity:** medium. **Components:** 22 packages (accordion, avatar, breadcrumbs, button, calendar, card, checkbox, combobox, date-field, listbox, menu, number-field, radio-group, search-field, select, switch, tabs, tag, text-area, text-field, time-field, toggle-button).

The published styles contain 69 `:hover` rules; only one (in `tree`) is wrapped in a hover media query. On touch screens the hover state is applied on tap and stays until you tap elsewhere, so buttons look pressed, and an element that ends up under the finger after a navigation shows as hovered.

It also causes a contrast failure: the select placeholder on its hover background has a contrast of **3.07:1** in light mode and **4:1** in dark mode (axe `color-contrast`, needs 4.5:1). On touch devices that state persists after the select is tapped.

**See it:** Components → Dialog, tap "Open dialog", close it: the button stays grey. Or tap an empty text area.

**Suggested fix:** wrap hover styles in `@media (hover: hover)` (or `(any-hover: hover)`), as `tree` already does. Check the placeholder colour against the hover background.

## 4. Dialog bottom sheet ignores the home indicator

**Severity:** medium. **Component:** dialog.

On small screens `sl-dialog` becomes a bottom sheet (a nice touch), but it adds no `env(safe-area-inset-bottom)` padding. On iPhones without a home button the bottom action sits on top of the home indicator. The close button also sits flush against the right edge of the screen.

**See it:** Components → Dialog → "Write a note" on an iPhone simulator.

**Suggested fix:** add `padding-block-end: max(<current padding>, env(safe-area-inset-bottom))` to the sheet, and inline padding (`env(safe-area-inset-right)`) around the header actions.

## 5. Validation announcements throw inside shadow DOM

**Severity:** medium (accessibility). **Component:** form (`sl-form-field`).

When a control becomes invalid, `sl-form-field` announces the error to screen readers after a 250 ms `setTimeout`. Inside that timeout it reads `event.target`. Once dispatch has finished, the browser has retargeted the event to the outermost shadow host (in this app `<demo-app>`), which has no `formControlElement`. Every invalid submit therefore logs:

```text
TypeError: Cannot read properties of undefined (reading 'getAttribute')
    at #getValidationAnnouncement (form-field.js)
```

The screen-reader announcement is lost. Any app that renders forms inside a web component (Lit, Angular with ShadowDom, …) is affected.

**See it:** Showcase → New assignment, tap "Create assignment" with an empty form, and watch the console.

**Suggested fix:** capture the control synchronously (`const control = event.target;`) before the `setTimeout`, or use `event.composedPath()[0]` at dispatch time.

## 6. `sl-form` reports valid before its controls register

**Severity:** low. **Component:** form.

Controls register with `sl-form` in a `requestAnimationFrame` after they connect. Until then `controls` is empty and `reportValidity()` returns `true` (`[].every(...)`). In the demo, controls registered about 300 ms after the screen appeared. A fast tap on submit, or code that submits on load, sees a "valid" empty form.

**Workaround in this app:** the assignment screen checks `form.controls.length` before `reportValidity()`.

**Suggested fix:** have `reportValidity()`/`valid` wait for pending registrations, or expose a promise (for example `form.updateComplete`-style) that resolves once all controls are registered.

## 7. Toggle groups don't wrap

**Severity:** low. **Component:** toggle-group.

Three short text chips in `<sl-toggle-group chips>` overflow a 375 px wide screen by 11 px; the group doesn't wrap.

**See it:** Showcase → My courses (the app works around it).

**Workaround in this app:** `sl-toggle-group { flex-wrap: wrap; }`.

**Suggested fix:** `flex-wrap: wrap` on the host when `chips` is set, or a horizontally scrolling chip row.

## 8. Select-only date field shows iOS selection handles

**Severity:** low. **Component:** date-field.

With `select-only`, tapping the field opens the calendar without a keyboard (good), but iOS selects part of the read-only input and shows text selection handles and a selection highlight.

**See it:** Showcase → New assignment → Due date, on iOS.

**Suggested fix:** `user-select: none` (and `-webkit-user-select`) on the input when `select-only` is set, or don't focus the input at all.

## 9. Toggle button icons need `slot="default"`

**Severity:** low (developer experience). **Component:** toggle-button.

An icon-only toggle button only finds its icon in a slot literally named `default` (`<sl-icon slot="default">`). An icon in the unnamed slot, which is what most people write first, logs "There needs to be an sl-icon in the "default" slot" and shows red error styling. It also requires a different icon in the `pressed` slot.

**Suggested fix:** also accept an icon in the unnamed slot, or make the error message say `slot="default"` explicitly. Document both requirements in the component docs.

## 10. Form values are strings

**Severity:** low (developer experience). **Components:** form, date-field, number-field.

`form.value` returns the date field's value as an ISO string (`"2026-11-27"`) and the number field's value as a string, although the controls' own `value` properties are a `Date` and a number. Code that treats `form.value.dueDate` as a `Date` throws.

**Suggested fix:** keep the controls' value types in `form.value`, or document the serialised types (and type `Form<T>` accordingly).

## 11. No bottom navigation; theme lacks common app icons

**Severity:** feature request. **Components:** new component; sanoma-learning theme.

Mobile apps almost always need a bottom tab bar. SLDS has no component for it, so in the native apps this demo uses a native tab bar ([`@capgo/capacitor-native-navigation`](https://github.com/Cap-go/capacitor-native-navigation), Liquid Glass on iOS 26+), and in a browser a tab bar built from links and tokens (`src/app/tab-bar/`). The Sanoma Learning icon set also has no grid or settings icon, so the web tab bar registers two simple ones.

---

## What passed

- **axe (WCAG 2.2 AA):** apart from finding 3, no violations on any of the 33 screens, in light and dark mode. (The app itself needed two fixes: see below.)
- **Dark mode:** the theme switches correctly with the system setting and through `--color-scheme`; no other contrast failures.
- **Layout:** no horizontal overflow at 375 px except finding 7; popovers flip away from the screen edge; tabs that don't fit collapse into a "…" menu; stacked tags collapse into "+n".
- **Safe areas and rotation:** in landscape the app content stays clear of the Dynamic Island and home indicator (the app handles this, not SLDS).
- **Keyboards:** `type="email"`, `tel` and `url` bring up the matching iOS keyboards.
- **Touch-friendly sizes:** tabs (44 px), accordion summaries (46 px) and all `size="lg"` controls.
- **User groups:** the reading level setting (user groups) scales all typography as intended, from 14 px to 20 px.

## Fixed in the app during this pass

- `maximum-scale=1` is now applied only in the native iOS app (see finding 2), so the web build keeps pinch-zoom (axe `meta-viewport`).
- `<main>` is focusable, so keyboard users can scroll screens without focusable content (axe `scrollable-region-focusable`).

## Not tested

- Android (phone and tablet), including the hardware back button.
- VoiceOver and TalkBack.
- The system text size setting (Dynamic Type on iOS, font scale on Android).
- Physical devices.

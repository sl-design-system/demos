# Issue Priority Report — sl-design-system/components

**Generated:** 2026-03-31

---

## 1. Executive summary

- **Accessibility is the dominant risk area.** There are 30+ open accessibility issues spanning multiple components (Calendar, Date field, Combobox, Select, Accordion, Panel, Tooltip, Menu, Search field, Toggle button, Form field). Many directly violate WCAG requirements.
- **Date field and Calendar have the highest concentration of a11y bugs** — focus management, NVDA mode switching, and keyboard accessibility problems that affect daily usage.
- **Select and Combobox have critical usability bugs** — scrollbar interaction breaks inside modal dialogs (#3150, labeled `bug`), VoiceOver listbox is non-functional on mobile (#2859), and missing visible labels violate WCAG 3.3.2 (#3104).
- **Tooltip positioning is broken** — tooltips appear in random locations on screen (#3152), a high-visibility bug reported by Magister.
- **Grid has an active filtering/selection correctness issue** (#2689) with 6 comments, reported by Magister — users can accidentally perform destructive actions on hidden selected rows.
- **Several "quick win" snack-sized issues** are labeled `🍎🍔🍦Snack` with clear solutions already proposed.
- **Form validation gaps** — `sl-number-field` does not display custom validity messages (#3140), and on-blur validation is missing (#3113), both requested by product teams.
- **Disabled state visibility** — buttons and inputs disappear against raised surfaces (#2961), an accessibility and visual regression issue.

---

## 2. Top issues to address first

| Rank | Issue | Title | Priority | Why it matters | Recommended next step |
|------|------:|-------|----------|----------------|-----------------------|
| 1 | [#3132](https://github.com/sl-design-system/components/issues/3132) | [Search field] "Clear text" button is not keyboard accessible | Critical | Keyboard users cannot clear search input. Direct WCAG 2.1.1 violation. | Add keyboard event handler to the clear button. |
| 2 | [#3150](https://github.com/sl-design-system/components/issues/3150) | sl-select dropdown closes when clicking scrollbar in modal dialog | Critical | Labeled `bug`. Users cannot scroll through select options in modal dialogs. Blocks usage of sl-select in common patterns. | Implement mousedown preventDefault on listbox to prevent focusout. |
| 3 | [#2859](https://github.com/sl-design-system/components/issues/2859) | [Combobox] VoiceOver listbox bugged (mobile) | Critical | Combobox is completely unusable with VoiceOver on iOS. Affects all mobile screen reader users. | Investigate HTML structure and focus trapping for nested elements. |
| 4 | [#3134](https://github.com/sl-design-system/components/issues/3134) | [Date field] Focus indicator stays on date field when focus is inside dialog | High | Sighted keyboard users see two focus indicators simultaneously — confusing and WCAG 2.4.7 risk. | Ensure only one focus indicator is visible at a time. |
| 5 | [#3135](https://github.com/sl-design-system/components/issues/3135) | [Date field] Focus placed on previous month's day | High | Keyboard navigation lands on wrong month's date, confusing users. | Place focus on first day of selected month. |
| 6 | [#3137](https://github.com/sl-design-system/components/issues/3137) | [Date field] Switching views sets focus on invisible element | High | Focus moves to non-visible element when switching from year to month view. | Auto-focus first selectable month on view switch. |
| 7 | [#3074](https://github.com/sl-design-system/components/issues/3074) | [Date field] Focus can escape expanded picker without collapsing | High | Focus trap is broken — users can tab out of open picker, leaving it in inconsistent state. | Implement proper focus trapping in the date picker dialog. |
| 8 | [#3088](https://github.com/sl-design-system/components/issues/3088) | [Calendar] NVDA automatically changes mode to Browse | High | Known NVDA issue with nested interactive elements in grid. Makes calendar unusable for NVDA users. | Investigate focus management inside grid to prevent mode switching. |
| 9 | [#3153](https://github.com/sl-design-system/components/issues/3153) | [Accordion] Disabled items not announced as disabled | High | Screen readers give no indication that accordion items are disabled. WCAG violation. Quick fix: add `aria-disabled`. | Replace `disabled` attr with `aria-disabled` + JS/CSS. |
| 10 | [#3058](https://github.com/sl-design-system/components/issues/3058) | [Time Field] Input does not have programmatically associated label | High | Missing label association violates WCAG 1.3.1 and 4.1.2. | Associate label with input via `aria-labelledby` or `for`/`id`. |
| 11 | [#3152](https://github.com/sl-design-system/components/issues/3152) | [Tooltip] Strange positioning behavior | High | Tooltips appear at random screen locations. High-visibility visual bug reported by Magister. | Debug tooltip positioning logic, likely a stacking context or calculation issue. |
| 12 | [#3053](https://github.com/sl-design-system/components/issues/3053) | [Combobox] Spacebar cannot select/deselect options | High | Standard keyboard interaction pattern is broken. Affects all keyboard users. | Add spacebar event handling for option selection. |
| 13 | [#2689](https://github.com/sl-design-system/components/issues/2689) | [Grid] Filtering + search selection correctness | High | Users accidentally perform destructive actions on hidden selected rows. 6 comments, requested by Magister. | Implement filter-aware selection behavior. |
| 14 | [#3104](https://github.com/sl-design-system/components/issues/3104) | [Select] Missing visible labels on multiple variants | High | WCAG 3.3.2 violation — select components in docs/storybook lack visible labels. | Add visible labels to all select examples. |
| 15 | [#3035](https://github.com/sl-design-system/components/issues/3035) | [Tooltip] aria-labelledby references non-existing element | High | Lazy-loaded tooltip means buttons have no accessible name until hovered. WCAG violation. | Use eagerly-rendered tooltip for name-providing cases. |
| 16 | [#2915](https://github.com/sl-design-system/components/issues/2915) | Rename Error to SlError | High | Labeled `bug`. `Error` component collides with native JS `Error` object, causing build issues. Assigned to anna-lach. | Rename the export (breaking change — plan for next major). |
| 17 | [#3159](https://github.com/sl-design-system/components/issues/3159) | [Dialog] close-button not responsive | High | Close button overlaps primary action on mobile — visual regression. Filed by SLDS core team. | Hide close-button when mobile media query applies. |
| 18 | [#3140](https://github.com/sl-design-system/components/issues/3140) | [Form, NumberField] Custom validity not displayed | High | `setCustomValidity` works on text-field but not number-field — inconsistent API. | Align number-field validation rendering with text-field. |
| 19 | [#3115](https://github.com/sl-design-system/components/issues/3115) | [Grid] Sticky column z-index overlap | Medium | Sort buttons and custom elements overlap sticky column. CSS stacking context issue. Labeled `Snack`. | Fix z-index layering for sticky column cells. |
| 20 | [#2961](https://github.com/sl-design-system/components/issues/2961) | Disabled state invisible on raised surfaces | Medium | Buttons/inputs disappear against `elevation.surface.raised.alternative`. Accessibility + visual issue. | Apply `grey.150` background and `grey.400` border to disabled state. |

---

## 3. Thematic clusters

### Accessibility — Date field & Calendar (Critical cluster)

**Issues:** #3134, #3135, #3137, #3074, #3088, #2919, #2992

**Common pattern:** Focus management is broken across date field and calendar components — focus escapes dialogs, lands on wrong dates, shows multiple indicators, and NVDA switches modes unexpectedly.

**Why it matters:** Date input is a fundamental form interaction. These bugs make the date field and calendar nearly unusable for keyboard and screen reader users.

**Address first:** #3074 (focus escape) and #3134 (double focus indicator) — they affect every keyboard interaction.

---

### Accessibility — Combobox & Select

**Issues:** #3150, #2859, #3053, #3104, #3009, #3010, #3017

**Common pattern:** Combobox and select have broken focus, keyboard, and screen reader behavior. The scrollbar bug (#3150) is labeled `bug` and blocks basic usage in modal dialogs.

**Why it matters:** Select and combobox are among the most used form components. These bugs affect multiple product teams (MyPortal, Bingel INT).

**Address first:** #3150 (scrollbar closes dropdown) and #2859 (VoiceOver completely broken on mobile).

---

### Accessibility — Screen reader announcements (stable components)

**Issues:** #3153, #3155, #3154, #3102, #3046, #3045, #3031, #3016, #3013, #3007, #3006, #3035

**Common pattern:** Components fail to announce state (disabled, expanded/collapsed), have missing ARIA attributes, or use invalid ARIA patterns.

**Why it matters:** These are WCAG failures that affect all assistive technology users. Many have clear, small fixes proposed (labeled `🍎🍔🍦Snack`).

**Address first:** #3153 (disabled not announced — quick fix with `aria-disabled`) and #3035 (tooltip aria-labelledby broken).

---

### Component correctness / bugs

**Issues:** #3150, #2915, #3152, #3140, #3159, #3144, #3158

**Common pattern:** Core component behavior is broken — dropdowns close unexpectedly, tooltips misposition, form validation is inconsistent, dialog styling breaks.

**Why it matters:** These directly break user workflows. #3150 and #2915 are labeled `bug`.

**Address first:** #3150 (select scrollbar) and #3152 (tooltip positioning).

---

### Shared foundations / tokens / styling

**Issues:** #2961, #2882, #3131, #2999, #2919

**Common pattern:** Token values cause visibility/contrast issues. Disabled states disappear, contrast ratios fail on documentation, deprecated tokens remain documented.

**Why it matters:** Token issues cascade across all components and all product teams.

**Address first:** #2961 (disabled state invisible) — it affects every component with a disabled state.

---

### Documentation / developer experience

**Issues:** #2643, #2882, #3146, #3148, #3157, #3158, #2156

**Common pattern:** Documentation is outdated, examples are inaccessible, templates need improvement, UX patterns are missing for common scenarios.

**Why it matters:** Poor documentation leads to incorrect component usage, which multiplies bugs across product teams.

**Address first:** #3146 (inline message UX patterns) — teams keep asking for this.

---

### Release / maintenance risk

**Issues:** #2915, #2689, #3113

**Common pattern:** Namespace collision (`Error` vs `SlError`), missing form validation modes, and grid selection correctness require careful API changes.

**Why it matters:** These may require breaking changes or significant API updates that need release planning.

**Address first:** #2915 (Error rename) — it's assigned and should be coordinated with the next major release.

---

## 4. Immediate actions

1. **Fix date field focus management** (#3074, #3134, #3135, #3137) — why now: 4 related a11y bugs make the date field nearly unusable for keyboard/screen reader users. These are actively being filed by the SLDS a11y team.

2. **Fix sl-select scrollbar bug in modal dialogs** (#3150) — why now: labeled `bug`, has a proposed solution, blocks sl-select usage in a very common UI pattern (modal dialogs). Reported by a product team.

3. **Fix Combobox VoiceOver on mobile** (#2859) — why now: oldest unresolved a11y bug in the combobox, makes the component completely unusable on iOS with VoiceOver. Over 4 months old.

4. **Batch-fix snack-sized a11y issues** (#3153, #3155, #3031, #3016, #3007, #3006, #2992, #3110) — why now: 8+ issues labeled `🍎🍔🍦Snack` with clear, small fixes. High impact-to-effort ratio.

5. **Fix tooltip positioning** (#3152) — why now: reported by Magister, high-visibility visual bug that erodes trust in the component library.

---

## 5. Quick wins

| Issue | Why it is a quick win | Expected benefit |
|------:|----------------------|-----------------|
| [#3153](https://github.com/sl-design-system/components/issues/3153) | Add `aria-disabled` to disabled accordion items — clear solution, labeled Snack | Screen readers properly announce disabled state |
| [#3155](https://github.com/sl-design-system/components/issues/3155) | Add `aria-hidden="true"` to `<br>` element — one-line fix | VoiceOver stops announcing "empty group" |
| [#3031](https://github.com/sl-design-system/components/issues/3031) | Remove improperly added `aria-labelledby` from non-collapsible panels — labeled Snack | Fixes invalid ARIA pattern in Panel component |
| [#3016](https://github.com/sl-design-system/components/issues/3016) | Add labels to Custom Icons switches — labeled Snack | Switches become accessible to screen readers |
| [#3007](https://github.com/sl-design-system/components/issues/3007) | Add missing `role` to first tag in stacked tag lists — labeled Snack | Fixes axe-core violation in Storybook |

---

## 6. Neglected risks

| Issue | Age | Why it is a risk |
|------:|-----|-----------------|
| [#2859](https://github.com/sl-design-system/components/issues/2859) | 4+ months | Combobox is fully broken on VoiceOver mobile. No owner, no resolution path. |
| [#2689](https://github.com/sl-design-system/components/issues/2689) | 6 months | Grid filtering/selection correctness — 6 comments, can cause destructive data operations. Research done but not implemented. |
| [#2500](https://github.com/sl-design-system/components/issues/2500) | 7+ months | Grid accessibility audit — 8 comments, a tracking issue that generates child issues but hasn't been closed out. |
| [#2643](https://github.com/sl-design-system/components/issues/2643) | 6 months | Documentation template improvement — affects how every component is presented. No progress visible. |
| [#2961](https://github.com/sl-design-system/components/issues/2961) | 2 months | Disabled states invisible on raised surfaces — affects all components, no fix applied despite having a clear solution. |

---

## 7. Data gaps and caveats

- **Component maturity status (draft/preview/stable) is not indicated in issue labels or metadata.** Priority assessments are based on component usage signals and team context rather than explicit status labels.
- **No milestone data is attached to most issues**, making it difficult to assess release planning alignment.
- **Some issues lack the `bug` label** despite being clear defects (e.g., #3152 tooltip positioning, #3153 disabled not announced). Triage may need attention.
- **The `triage` label appears on several recent issues** (#3150, #3104, #3156, #3158) — these need classification.
- **This report covers the 100 most recently updated open issues.** Older, less-active issues may be missing.

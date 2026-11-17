# Accessibility Improvements Report — sl-design-system/components (2026)

> **Report Date:** November 17, 2026
> **Data Source:** Closed issues with `accessibility` label in [sl-design-system/components](https://github.com/sl-design-system/components), closed January 1 – November 17, 2026
> **Total Accessibility Issues Closed:** 173

# Accessibility Improvements Report — sl-design-system/components (2026)

## 1. Executive summary

- The 2026 issue search found 173 closed issues carrying the `accessibility` label, alongside additional relevant issues without that label. These records cover audits, test work, and individual product fixes — not 173 completed improvements.
- At least 16 distinct component families have a 2026 accessibility issue linked to a merged implementation pull request verified in this review.
- Improvements span screen-reader announcements, keyboard access, accessible names and states, focus visibility, and selected-state contrast.
- Calendar and date-picker work addressed date-range information, duplicate announcements, month/year identification, and visible-date access for assistive-technology users.
- Toolbar, Grid, Menu, Tag, and Select changes improved keyboard operation and communicated controls and states more clearly.
- Automated accessibility work strengthened auditing and test reliability, including correcting false positives and broadening axe-core rule coverage.
- Closure is not uniform proof of implementation: some closed contrast and Calendar issues have no linked merged pull request in the available issue record.

## 2. Key achievements in 2026

- **More informative date selection:** Calendar fixes clarified month/year choices, removed duplicate date announcements, announced date limits, and improved what screen-reader users encounter in read-only views. Evidence: [#2938](https://github.com/sl-design-system/components/issues/2938), [#2988](https://github.com/sl-design-system/components/issues/2988), [#2989](https://github.com/sl-design-system/components/issues/2989), [#2990](https://github.com/sl-design-system/components/issues/2990), [#2992](https://github.com/sl-design-system/components/issues/2992); merged work: [#2636](https://github.com/sl-design-system/components/pull/2636), [#3021](https://github.com/sl-design-system/components/pull/3021), [#3075](https://github.com/sl-design-system/components/pull/3075), [#3082](https://github.com/sl-design-system/components/pull/3082), [#3718](https://github.com/sl-design-system/components/pull/3718).
- **Clearer interactive controls:** Select’s clear action and removable Tags gained more accessible keyboard and assistive-technology interactions. Evidence: [#2844](https://github.com/sl-design-system/components/issues/2844), [#2845](https://github.com/sl-design-system/components/issues/2845), [#2868](https://github.com/sl-design-system/components/issues/2868), [#3007](https://github.com/sl-design-system/components/issues/3007); merged work: [#3109](https://github.com/sl-design-system/components/pull/3109), [#3214](https://github.com/sl-design-system/components/pull/3214), [#3408](https://github.com/sl-design-system/components/pull/3408).
- **More reliable state and action announcements:** Selectable Menu items, disabled Accordion items, and grouped Grid controls now have clearer state communication. Evidence: [#3006](https://github.com/sl-design-system/components/issues/3006), [#3153](https://github.com/sl-design-system/components/issues/3153), [#2883](https://github.com/sl-design-system/components/issues/2883); merged work: [#3242](https://github.com/sl-design-system/components/pull/3242), [#3227](https://github.com/sl-design-system/components/pull/3227), [#3385](https://github.com/sl-design-system/components/pull/3385).
- **Improved keyboard and focus behavior:** Toolbar navigation and disabled-state behavior were corrected; focus visibility was improved for Card experiences in Firefox and Safari, and a Grid header tooltip was replaced with a keyboard-accessible infotip. Evidence: [#2958](https://github.com/sl-design-system/components/issues/2958), [#2972](https://github.com/sl-design-system/components/issues/2972), [#3169](https://github.com/sl-design-system/components/issues/3169), [#3185](https://github.com/sl-design-system/components/issues/3185), [#3506](https://github.com/sl-design-system/components/issues/3506); merged work: [#2974](https://github.com/sl-design-system/components/pull/2974), [#3022](https://github.com/sl-design-system/components/pull/3022), [#3429](https://github.com/sl-design-system/components/pull/3429), [#3731](https://github.com/sl-design-system/components/pull/3731), [#3859](https://github.com/sl-design-system/components/pull/3859).
- **More consistent accessibility testing:** Work included a Storybook component audit, removal of reported false positives, broader axe-core rules, and corrected tooltip test setup. Evidence: [#3003](https://github.com/sl-design-system/components/issues/3003), [#3036](https://github.com/sl-design-system/components/issues/3036), [#3493](https://github.com/sl-design-system/components/issues/3493), [#3535](https://github.com/sl-design-system/components/issues/3535); merged work: [#3039](https://github.com/sl-design-system/components/pull/3039), [sl-design-system/demos#39](https://github.com/sl-design-system/demos/pull/39), [sl-design-system/demos#43](https://github.com/sl-design-system/demos/pull/43).
- **Better visual clarity:** Paginator current-page contrast and selected Time field contrast in dark mode were improved; documentation-site link focus indicators were also addressed. Evidence: [#2708](https://github.com/sl-design-system/components/issues/2708), [#3071](https://github.com/sl-design-system/components/issues/3071), [#3589](https://github.com/sl-design-system/components/issues/3589); merged work: [#3289](https://github.com/sl-design-system/components/pull/3289), [#3772](https://github.com/sl-design-system/components/pull/3772), [#3808](https://github.com/sl-design-system/components/pull/3808).

## 3. Components with improved accessibility

**At least 16 distinct component families** had a closed accessibility issue linked to a merged implementation pull request verified in this review. Each family is counted once, even where multiple fixes were made:

- Accordion
- Avatar
- Calendar
- Card
- Date field
- Grid
- Inline message
- Menu
- Paginator
- Select
- Switch
- Tag / Tag list
- Time field
- Toggle button
- Toggle group
- Toolbar

The count excludes audits, test-only work, documentation-site changes, and closed issues without a linked merged implementation pull request. It is therefore a conservative verified count, not a claim that no other component improved.

## 4. Specific accessibility enhancements made

- **Screen-reader information and state:** Calendar date limits and visible dates, Menu selection state, disabled Accordion items, and changing Date field months gained clearer announcements. Evidence: [#2990](https://github.com/sl-design-system/components/issues/2990), [#2992](https://github.com/sl-design-system/components/issues/2992), [#3006](https://github.com/sl-design-system/components/issues/3006), [#3153](https://github.com/sl-design-system/components/issues/3153), [#3828](https://github.com/sl-design-system/components/issues/3828); merged work: [#3075](https://github.com/sl-design-system/components/pull/3075), [#3718](https://github.com/sl-design-system/components/pull/3718), [#3242](https://github.com/sl-design-system/components/pull/3242), [#3227](https://github.com/sl-design-system/components/pull/3227), [#3833](https://github.com/sl-design-system/components/pull/3833).
- **Keyboard operation and focus:** Toolbar arrow-key navigation, disabled-toolbar behavior, Tag actions, and Card and Toolbar focus visibility were improved. Evidence: [#2958](https://github.com/sl-design-system/components/issues/2958), [#2972](https://github.com/sl-design-system/components/issues/2972), [#2845](https://github.com/sl-design-system/components/issues/2845), [#3506](https://github.com/sl-design-system/components/issues/3506), [#3169](https://github.com/sl-design-system/components/issues/3169); merged work: [#2974](https://github.com/sl-design-system/components/pull/2974), [#3022](https://github.com/sl-design-system/components/pull/3022), [#3214](https://github.com/sl-design-system/components/pull/3214), [#3859](https://github.com/sl-design-system/components/pull/3859), [#3429](https://github.com/sl-design-system/components/pull/3429).
- **Accessible names, roles, and relationships:** Clearable Select, Tag list, Toggle button, and Avatar work improved how controls and their relationships are identified. Evidence: [#2844](https://github.com/sl-design-system/components/issues/2844), [#2868](https://github.com/sl-design-system/components/issues/2868), [#3005](https://github.com/sl-design-system/components/issues/3005), [#3007](https://github.com/sl-design-system/components/issues/3007), [#3013](https://github.com/sl-design-system/components/issues/3013); merged work: [#3109](https://github.com/sl-design-system/components/pull/3109), [#3214](https://github.com/sl-design-system/components/pull/3214), [#3089](https://github.com/sl-design-system/components/pull/3089), [#3408](https://github.com/sl-design-system/components/pull/3408), [#3220](https://github.com/sl-design-system/components/pull/3220).
- **Semantic structure and grouping:** Toggle group and Grid grouping received more suitable group semantics and expanded/collapsed state communication. Evidence: [#2912](https://github.com/sl-design-system/components/issues/2912), [#2883](https://github.com/sl-design-system/components/issues/2883); merged work: [#3595](https://github.com/sl-design-system/components/pull/3595), [#3385](https://github.com/sl-design-system/components/pull/3385).
- **Contrast and visual focus:** Paginator selected-page contrast, selected Time field contrast in dark mode, and documentation-site focus indicators were addressed. Evidence: [#2708](https://github.com/sl-design-system/components/issues/2708), [#3071](https://github.com/sl-design-system/components/issues/3071), [#3589](https://github.com/sl-design-system/components/issues/3589); merged work: [#3289](https://github.com/sl-design-system/components/pull/3289), [#3772](https://github.com/sl-design-system/components/pull/3772), [#3808](https://github.com/sl-design-system/components/pull/3808).
- **Testing quality:** The Storybook audit and test corrections improved the reliability and breadth of automated accessibility checks. Evidence: [#3003](https://github.com/sl-design-system/components/issues/3003), [#3036](https://github.com/sl-design-system/components/issues/3036), [#3493](https://github.com/sl-design-system/components/issues/3493), [#3535](https://github.com/sl-design-system/components/issues/3535); merged work: [#3039](https://github.com/sl-design-system/components/pull/3039), [sl-design-system/demos#39](https://github.com/sl-design-system/demos/pull/39), [sl-design-system/demos#43](https://github.com/sl-design-system/demos/pull/43).

## 5. Accessibility impact themes

### Keyboard usability

Toolbar and Tag interactions became more predictable for keyboard users, while Card and Toolbar focus indicators became easier to locate. Evidence: [#2958](https://github.com/sl-design-system/components/issues/2958), [#2845](https://github.com/sl-design-system/components/issues/2845), [#3506](https://github.com/sl-design-system/components/issues/3506), [#3169](https://github.com/sl-design-system/components/issues/3169). This reduces uncertainty when navigating and acting without a mouse.

### Screen-reader context

Calendar, Menu, Accordion, and Date field fixes provide clearer date information and control states. Evidence: [#2990](https://github.com/sl-design-system/components/issues/2990), [#2992](https://github.com/sl-design-system/components/issues/2992), [#3006](https://github.com/sl-design-system/components/issues/3006), [#3153](https://github.com/sl-design-system/components/issues/3153), [#3828](https://github.com/sl-design-system/components/issues/3828). This helps users understand available choices and the result of interactions.

### Clearer control meaning

Accessible names, roles, and grouping were improved in Select, Tag list, Toggle button, Toggle group, Avatar, and Grid. Evidence: [#2844](https://github.com/sl-design-system/components/issues/2844), [#3005](https://github.com/sl-design-system/components/issues/3005), [#3007](https://github.com/sl-design-system/components/issues/3007), [#2912](https://github.com/sl-design-system/components/issues/2912), [#2883](https://github.com/sl-design-system/components/issues/2883). Clearer identification helps users understand what a control does before activating it.

### Visual accessibility

Paginator, Time field, and documentation-site focus styling received contrast-related fixes. Evidence: [#2708](https://github.com/sl-design-system/components/issues/2708), [#3071](https://github.com/sl-design-system/components/issues/3071), [#3589](https://github.com/sl-design-system/components/issues/3589). More visible state cues support people with low vision and users who rely on keyboard focus.

### More dependable checks

The audit and axe-core-related work addressed test coverage and false-positive noise. Evidence: [#3003](https://github.com/sl-design-system/components/issues/3003), [#3036](https://github.com/sl-design-system/components/issues/3036), [#3493](https://github.com/sl-design-system/components/issues/3493), [#3535](https://github.com/sl-design-system/components/issues/3535). More reliable checks can help teams detect regressions earlier, though issue records do not quantify their ongoing coverage or impact.

## 6. What remains to improve

- **Close the evidence gap on contrast findings:** Calendar text and indicator contrast issues and Grid border contrast were closed without a linked merged PR in the available records. Confirm the implemented outcome and validate it in both themes. Evidence: [#2986](https://github.com/sl-design-system/components/issues/2986), [#2987](https://github.com/sl-design-system/components/issues/2987), [#3191](https://github.com/sl-design-system/components/issues/3191).
- **Verify Select focus visibility:** The Select keyboard-focus contrast issue was marked complete without a linked merged PR, while a related issue was closed as a duplicate. Confirm that the actual user-facing fix shipped. Evidence: [#2705](https://github.com/sl-design-system/components/issues/2705), [#3129](https://github.com/sl-design-system/components/issues/3129).
- **Confirm Calendar disabled-date behavior:** The issue about keeping disabled dates, months, and years discoverable to keyboard and assistive-technology users has no linked merged PR in its closure record. Evidence: [#2994](https://github.com/sl-design-system/components/issues/2994).
- **Turn audit findings into measurable closure:** Grid and Toolbar audits generated follow-up work; management reporting would benefit from tracking which findings shipped and which remain open, rather than relying on audit closure alone. Evidence: [#2500](https://github.com/sl-design-system/components/issues/2500), [#2748](https://github.com/sl-design-system/components/issues/2748).
- **Measure regression prevention:** Testing issues document meaningful changes, but the reviewed records do not report coverage rates, recurring defect trends, or user-outcome measures. Evidence: [#3003](https://github.com/sl-design-system/components/issues/3003), [#3493](https://github.com/sl-design-system/components/issues/3493), [#3535](https://github.com/sl-design-system/components/issues/3535).

## 7. Suggested next steps

- **Maintain an issue-to-release evidence trail.** Require audit findings to link to a verified fix or explain why no code change is needed; this will make completion and risk easier to assess. Relevant evidence: [#2500](https://github.com/sl-design-system/components/issues/2500), [#2748](https://github.com/sl-design-system/components/issues/2748), [#2986](https://github.com/sl-design-system/components/issues/2986).
- **Prioritize validation of contrast and focus states.** Confirm outcomes across themes and affected browsers, particularly for Calendar, Grid, and Select. Expected outcome: users can consistently identify content and keyboard focus. Relevant evidence: [#2705](https://github.com/sl-design-system/components/issues/2705), [#2987](https://github.com/sl-design-system/components/issues/2987), [#3191](https://github.com/sl-design-system/components/issues/3191), [#3506](https://github.com/sl-design-system/components/issues/3506).
- **Keep strengthening automated checks and manual assistive-technology testing.** Combine reliable axe-core checks with targeted screen-reader and keyboard verification. Expected outcome: fewer regressions and fewer misleading failures. Relevant evidence: [#3003](https://github.com/sl-design-system/components/issues/3003), [#3036](https://github.com/sl-design-system/components/issues/3036), [#3493](https://github.com/sl-design-system/components/issues/3493), [#3535](https://github.com/sl-design-system/components/issues/3535).
- **Adopt a small leadership-facing scorecard.** Track components covered, verified fixes, open high-impact findings, and repeat issues. Expected outcome: progress and residual risk can be compared over time; the 2026 issue volume provides a baseline, not a measure of user impact.

## 8. Data gaps and caveats

- The review period is closed issues dated 2026-01-01 through 2026-11-17. The broad closed-issue search returned 514 issues; the accessibility-label search returned 173 across two pages. Relevant issues without that label were also identified, so the label count is not the total number of accessibility-related issues.
- The 173 figure counts issues, not completed fixes. It includes audits, test work, duplicate or related reports, and issues that do not represent a component-level improvement.
- The 16-component count is conservative: it includes only distinct component families with at least one linked merged implementation pull request verified from the issue closure records reviewed. It excludes unlinked fixes and components mentioned only in audits or test changes.
- Some closed issues have no linked merged pull request, or are marked duplicate. Their closure alone does not establish that the specific concern was implemented or independently validated.
- The issue records do not provide consistent evidence of production adoption, user impact metrics, complete browser and assistive-technology retesting, or a full mapping of every audit finding to its outcome. No such outcomes are assumed in this report.

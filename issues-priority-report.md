# Issue Priority Report — sl-design-system/components

**Generated:** 2026-03-31
**Source:** 576 open issues analyzed across all pages (6 pages × 100 per page)

## 1. Executive summary

- **Accessibility is the dominant risk area.** A large cluster of accessibility issues spans stable and preview components — Accordion, Select, Dialog, Date field, Calendar, Search field, Toggle button, and more. Many are WCAG violations reported by the dedicated a11y auditor (@a11ymiko) with clear suggested fixes.
- **Tooltip "stuck open" bugs are recurring and unresolved.** Issue #3086 acknowledges the need to reevaluate the Tooltip implementation approach. A PR (#3108) is in progress but still open. This affects the **stable** Tooltip component used widely in production.
- **Stable component bugs demand immediate attention.** Dialog (#3159, #3042), Select (#3150, #3104, #2705), Accordion (#3153, #3155), and Tooltip (#3086) all have confirmed bugs against stable, production-used components.
- **Cross-cutting naming misalignment creates breaking-change risk.** Issue #3090 documents that code uses `warning/danger/success` while Figma and Tokens use `caution/negative/positive` — affecting Button, ButtonBar, Inline Message, Menu, Progress Bar, and Checkbox. Resolution requires coordinated Figma, Token Studio, and code changes.
- **Disabled state visibility is broken cross-component.** Issue #2961 reports that disabled buttons and inputs disappear against `elevation.surface.raised.alternative` — a systemic token/design issue.
- **Infrastructure bottleneck: PR deploys hitting Azure limits.** Issue #3094 documents that Azure Static Web Apps has reached its maximum preview environments with no upgrade path. This blocks PR preview workflows.
- **~350+ issues are module tracking containers, not actionable bugs.** Issues titled `[Module] X`, `[X] Bug fixes`, `[X] Maintenance` are organizational meta-issues with 0 comments. These inflate the issue count but require no direct action.
- **Shared accessibility infrastructure needs improvement.** Issue #3101 (`ObserveAttributesMixin`) is a foundational fix that would unblock multiple `aria-disabled` propagation bugs across components.

## 2. Top issues to address first

| Rank | Issue | Title | Priority | Why it matters | Recommended next step |
|------|------:|-------|----------|----------------|-----------------------|
| 1 | #3074 | [Date field] Focus escapes expanded picker | Critical | Focus trap missing in stable date-field picker — keyboard users can Tab out of an open calendar dialog. WCAG 2.4.3 violation. Clear suggested fix provided. | Implement focus trap for the date-field picker dialog following WAI-ARIA dialog modal pattern. |
| 2 | #3153 | [Accordion] Disabled items not announced | Critical | Stable Accordion's disabled state is invisible to screen readers (VoiceOver, NVDA). Suggested fix: switch from `disabled` to `aria-disabled`. | Replace `disabled` with `aria-disabled` on `sl-accordion-item` and add corresponding CSS/JS handling. |
| 3 | #3150 | [Select] Dropdown closes on scrollbar click in modal | Critical | Stable Select component is unusable when scrollbar is clicked inside a modal dialog. Reported by external team (MyPortal/Bingel INT). Clear fix provided. | Add mousedown prevention on listbox scrollbar interaction to prevent focusout. |
| 4 | #3086 | [Tooltip] Reevaluate implementation approach | Critical | Recurring "stuck tooltip" bug across multiple reports. Stable component. PR #3108 is in progress (assigned to @michal-sanoma). | Continue and merge PR #3108; validate against all known stuck-tooltip reports. |
| 5 | #3104 | [Select] Missing visible labels | High | Stable Select examples on docs/Storybook lack visible labels — WCAG 3.3.2 violation. Assigned to @a11ymiko with 3 comments. | Update documentation examples and Storybook stories to include visible labels. |
| 6 | #3088 | [Calendar] NVDA switches to Browse mode | High | NVDA changes from Focus to Browse mode inside Calendar grid, breaking keyboard navigation and `aria-describedby` announcements. Known upstream NVDA issue. Assigned to @a11ymiko. | Investigate focus management approach in calendar grid to prevent NVDA mode switch. |
| 7 | #3090 | Align semantic variants naming | High | Naming mismatch (code: warning/danger/success vs Figma/Tokens: caution/negative/positive) affects 6+ components. Unresolved creates confusion and breaking-change risk. | Align Figma and Tokens with code naming; update documentation. Requires cross-team coordination. |
| 8 | #3159 | [Dialog] close-button not responsive | High | Stable Dialog's close button overlaps primary action on mobile breakpoints. Reproducible on Storybook. Reported by team member @jpzwarte. | Add responsive handling to hide/reposition close-button on mobile media query. |
| 9 | #3042 | [Dialog] Flickers at breakpoint | High | Stable Dialog flickers during viewport resize due to animation triggering at breakpoint. Assigned to @anna-lach. Reported by external team (Clickedu). | Suppress transition/animation when breakpoint-triggered re-render occurs. |
| 10 | #3132 | [Search field] Clear button not keyboard accessible | High | Preview Search field's clear button has `tabindex=-1`, making it unreachable for keyboard users. Simple fix: change to `tabindex=0`. | Change clear button tabindex from -1 to 0 and ensure visible focus indicator with 3:1 contrast. |
| 11 | #2961 | Disabled state disappears on raised surfaces | High | Cross-component issue: disabled buttons and inputs are invisible on `elevation.surface.raised.alternative`. Affects multiple stable components. Assigned to @RoaldBoerema. | Update disabled state tokens (background: grey.150, border: grey.400) or apply `opacity.disabled`. |
| 12 | #3101 | [Shared] Improve ObserveAttributesMixin | High | Foundational fix enabling `aria-disabled` propagation across all components. Unblocks #3153, #3102, and other disabled-state a11y bugs. | Extend mixin to support keeping attributes on both host and internal focusable element. |
| 13 | #3102 | [Toggle button] Disabled not announced | High | Preview Toggle button's disabled state not in accessibility tree. Same root cause pattern as #3153. | Apply `aria-disabled` instead of `disabled` on `sl-toggle-button`. |
| 14 | #2705 | [Select] Low contrast focus indicator | High | Stable Select's keyboard focus indicator has only 1.1:1 contrast (dark mode: 1.6:1). WCAG failure. Milestoned, Figma design done, code implementation pending. | Implement the already-designed Figma update in code. |
| 15 | #3094 | Change PR deploy hosting | High | Azure Static Web Apps hit maximum preview environments. Blocks PR preview workflow. Assigned to @jpzwarte. | Evaluate Netlify or static.app and migrate hosting. |
| 16 | #2919 | [Calendar] Visual & a11y bug fixes | Medium | Calendar layout, contrast, and style alignment with Figma. Draft PR #3084 in progress. Assigned to @michal-sanoma. | Continue and merge draft PR #3084. |
| 17 | #3113 | [Form field] On-blur validation | Medium | Feature request from Magister team. Preview Form field currently only validates on submit. 3 comments of active discussion. | Design and implement on-blur validation for fields where invalid input is independently detectable. |
| 18 | #2500 | [Grid] Accessibility audit | Medium | Grid a11y audit with milestone, 8 comments, assigned to @KatarzynaWM. Prerequisite for Grid reaching stable/preview. | Continue audit and track resulting issues in milestone. |
| 19 | #3100 | [Text area] Character count indicator | Medium | Feature request from NPM team. Stable Text area needs count display. 2 comments. | UI research on counter placement, then implement. |
| 20 | #3069 | Add canary NPM packages | Medium | Enables devs to try fixes without waiting for releases. Already supported by changesets. | Configure changesets snapshot releases on main branch merge. |

## 3. Thematic clusters

### 3.1 Accessibility

**Issues:** #3074, #3153, #3155, #3104, #3088, #3132, #3102, #2705, #2500, #3101, #3076, #2961

**Common pattern:** Systematic a11y audit by @a11ymiko is uncovering WCAG violations across components. Most issues follow a pattern: `disabled` attribute not propagated to accessibility tree, missing focus traps, insufficient contrast ratios, or missing visible labels. The shared `ObserveAttributesMixin` (#3101) is a root-cause infrastructure issue.

**Why it matters:** Accessibility failures affect all users of the design system across all consuming products. Multiple issues are WCAG Level A/AA violations (focus management, name/role/value, visible labels, contrast). Legal and compliance risk.

**Address first:** #3074 (focus trap escape) and #3153 (disabled announcement) — both affect stable components and have clear, implementable fixes. Then #3101 (mixin improvement) to unblock multiple downstream fixes.

---

### 3.2 Component correctness — Stable

**Issues:** #3150, #3159, #3042, #3086/#3108, #2919

**Common pattern:** Bugs in stable, production-used components. Select dropdown closing unexpectedly, Dialog layout/responsiveness issues, Tooltip getting stuck. External teams (Clickedu, MyPortal/Bingel INT) are reporting these — evidence of real production impact.

**Why it matters:** Stable components are in active production use. Bugs here directly affect end users. Multiple reports from different consuming teams confirm widespread impact.

**Address first:** #3150 (Select scrollbar in modal) — clear fix, impacts real users. Then #3086 (Tooltip stuck) — PR already in progress.

---

### 3.3 Component correctness — Preview / Draft

**Issues:** #3132 (Search field, preview), #3102 (Toggle button, preview), #3113 (Form field, preview), #2249 (Toggle group, preview)

**Common pattern:** Preview components have a11y gaps and missing features that block their path to stable status. Draft components (Combobox, Paginator, Panel, Time field) have mostly tracking issues, not urgent bugs.

**Why it matters:** Preview components are actively used and need these fixes before reaching stable. Blocking issues delay component maturity and force consuming teams to implement workarounds.

**Address first:** #3132 (Search field clear button) — simple tabindex change. Then #3102 (Toggle button disabled) — same pattern as #3153, can be batch-fixed.

---

### 3.4 Shared foundations / tokens / styling

**Issues:** #3090, #2961, #3131, #2202

**Common pattern:** Token naming inconsistencies, cross-component styling issues, and disabled-state visibility problems. These are systemic issues affecting multiple components simultaneously.

**Why it matters:** Foundation issues multiply across every component that depends on them. The semantic variant naming mismatch (#3090) affects 6+ components and risks breaking changes if not resolved consistently.

**Address first:** #3090 (align semantic variants) — highest cross-cutting impact and breaking-change risk. Then #2961 (disabled state visibility).

---

### 3.5 Documentation / developer experience

**Issues:** #3148, #3076, #3104, #3106, #3131

**Common pattern:** Documentation gaps (missing analytics, a11y testing for docs website), Storybook examples showing non-accessible patterns, Figma-code misalignment in visual documentation.

**Why it matters:** The documentation website and Storybook are the primary adoption surfaces. Inaccessible examples in documentation propagate bad patterns to consuming teams.

**Address first:** #3104 (Select visible labels in docs) — fixing documentation examples prevents downstream a11y issues in consuming products. Then merge #3076 (doc website a11y testing PR).

---

### 3.6 Release / maintenance / infrastructure

**Issues:** #3094, #3069, #3072

**Common pattern:** CI/CD and release workflow limitations. PR deploy hosting hitting limits, no canary package releases, release management overhead.

**Why it matters:** #3094 is an active blocker — the team cannot deploy more PR previews. Canary packages (#3069) would accelerate bug fix validation by consuming teams.

**Address first:** #3094 (PR deploy hosting) — actively blocking workflow.

## 4. Immediate actions

1. **Fix focus trap in Date field picker (#3074)**
   - Why now: WCAG violation on a stable component. Keyboard users can escape the open picker, losing context. Clear implementation path provided by reporter.
   - Issues covered: #3074

2. **Ship Tooltip implementation overhaul (PR #3108 for #3086)**
   - Why now: Recurring "stuck tooltip" reports across multiple teams. PR is already in progress. Merging resolves a long-standing stable component reliability problem.
   - Issues covered: #3086, #3108

3. **Batch-fix aria-disabled propagation (#3101, #3153, #3102)**
   - Why now: The shared `ObserveAttributesMixin` improvement unblocks disabled-state announcements across Accordion, Toggle button, and potentially other components. One infrastructure fix, multiple downstream wins.
   - Issues covered: #3101, #3153, #3102

4. **Resolve Select bugs (#3150, #3104, #2705)**
   - Why now: Three distinct bugs on the stable Select component — scrollbar in modal, missing labels (WCAG), and low-contrast focus indicator. Select is heavily used across products.
   - Issues covered: #3150, #3104, #2705

5. **Migrate PR deploy hosting (#3094)**
   - Why now: Azure Static Web Apps limit is reached. No upgrade path. This blocks the team's ability to preview PRs, slowing review and QA.
   - Issues covered: #3094

## 5. Quick wins

1. **#3155 — Accordion VoiceOver "empty group" announcement**
   - Why quick: Single `aria-hidden="true"` addition on a `<br>` element in a Storybook story.
   - Expected benefit: Eliminates confusing "empty group" announcement for VoiceOver users in Accordion.

2. **#3132 — Search field clear button keyboard access**
   - Why quick: Change `tabindex="-1"` to `tabindex="0"` on the clear button. One-line code change.
   - Expected benefit: Makes clear button reachable for keyboard and screen reader users. Fixes WCAG 2.1.1.

3. **#3153 — Accordion disabled not announced**
   - Why quick: Replace `disabled` with `aria-disabled` attribute. A targeted, well-scoped change.
   - Expected benefit: Screen readers announce disabled state correctly in a stable component.

4. **#3069 — Canary NPM packages**
   - Why quick: Already supported by changesets via snapshot releases. Mostly CI/CD configuration.
   - Expected benefit: Consuming teams can validate fixes immediately without waiting for official releases.

5. **#3131 — Body text paragraph spacing to 8px**
   - Why quick: Token/CSS value change. Figma design already done.
   - Expected benefit: Aligns code with Figma for body text, fixing visual inconsistency reported by external team (Clickedu).

## 6. Neglected risks

1. **#2705 — Select low contrast focus indicator**
   - Open since 2025-10-01 (6 months). Milestoned ("Paginator: preview stage"), Figma design completed, but code implementation not done. 3 comments. WCAG contrast failure on a stable component.

2. **#1431 — Status light setup component**
   - Open since 2024-08-05 (~20 months). 8 comments from multiple teams (ETSL, Magister, Sesame, Bingel INT, MAX). High cross-team interest but no assignee and no progress indicator.

3. **#2500 — Grid accessibility audit**
   - Open since 2025-08-27 (7 months). Milestoned, assigned, 8 comments. Prerequisite for Grid maturity. The audit itself may generate many new issues, further increasing the backlog.

4. **#2961 — Disabled state visibility on raised surfaces**
   - Open since 2026-01-29 (2 months). Assigned to @RoaldBoerema but affects all interactive components. Cross-cutting issue that may worsen as more components adopt the affected elevation tokens.

5. **#1134 — Split button setup component**
   - Open since 2024-04-08 (24 months). Feature request with no progress. If there is demand, it should be prioritized; if not, it should be closed to reduce backlog noise.

## 7. Data gaps and caveats

- **~350 of 576 issues are tracking/meta containers.** Issues titled `[Module] X`, `[X] Bug fixes`, `[X] Maintenance`, and category groupings (e.g., "Form Components", "Overlay Components") have 0 comments and 0 labels. These are organizational placeholders, not actionable issues. They heavily skew the total issue count.
- **No priority labels on most issues.** The repository does not appear to use priority labels (P0/P1/P2 or critical/high/medium/low). Priority was inferred from component maturity status, labels (bug, accessibility, enhancement), comment count, and reporter context.
- **Limited milestone usage.** Only a few issues have milestones (e.g., #2705 → "Paginator: preview stage", #2500 → "Grid - basics: preview stage"). Most issues lack milestone context.
- **Issue type field is inconsistently used.** Some issues have `issue_type` (Bug, Story, Feature, Chore, Module, Maintenance), but many have none.
- **Grid and Drawer component statuses unknown.** These components' documentation pages return JavaScript-only content and could not be scraped for maturity status. Grid sub-modules have extensive tracking issues but no confirmed maturity level.
- **Calendar and Date field are not in the component status reference table.** These are used in production but their maturity status was not found on the documentation website.
- **Closed issues mixed into some API results.** A few issues fetched via the list API returned as closed (e.g., #3147, #3145, #3037, #3036) — these were excluded from analysis.
- **Confidence is high for the top 20 ranked issues** where full issue details were read. For the remaining ~200 non-tracking issues, ranking is based on title, labels, and metadata only.

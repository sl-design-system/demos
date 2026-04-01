# Issue Priority Report — sl-design-system/components

**Generated:** 2026-04-01  
**Total open issues:** 576  
**Accessibility-related:** 124 (21.5%)  
**Bug-labeled:** 5  
**Issues on stable components:** 168 | **Preview:** 72 | **Draft:** 39 | **No listed component:** 297

---

## 1. Executive summary

- **Accessibility dominates the backlog.** 124 of 576 open issues (21.5%) are accessibility-related. They span Select, Accordion, Tooltip, Tag, Tree, and many issues referencing Grid (which is not in the component status reference table). These are the highest-priority items.
- **Select (stable) has the most critical a11y and bug combination.** Low contrast focus indicators (#2705), missing visible labels (#3104), and a production bug where the dropdown closes when clicking its scrollbar inside a modal dialog (#3150 — bug-labeled, assigned).
- **Grid-related issues are the largest cluster but Grid has no status in the reference table.** The Grid accessibility audit (#2500, 8 comments, milestoned) and numerous child issues (#2880, #2884, #2881, #2883, #2879, #2895, #2896, #2897) represent the biggest concentration of a11y work. Since Grid is not listed in the component status reference table, these all show as `none` for status.
- **Tooltip (stable) has multiple behavioral bugs.** Not dismissing on mouse leave (#2969 — 3 comments, assigned), Esc key conflicts (#3049), ARIA id issues (#3035), and an implementation reevaluation underway (#3086).
- **Semantic variant naming is misaligned** (#3090). Code uses `warning/danger/success` while Figma and Tokens use `caution/negative/positive`. Affects Button, ButtonBar, Inline Message, Menu, Progress Bar, and Checkbox. Breaking change risk.
- **The Form `Error` export collides with JavaScript's native `Error`** (#2915 — bug-labeled, assigned). Causes developer confusion in production.
- **Disabled state visual regression** (#2961 — assigned) causes buttons and inputs to disappear against certain surface backgrounds. Cross-component impact.
- **Calendar issues (#2919, #2992, #3088) involve combined visual and a11y bugs** but Calendar is not in the status reference table, so these show as `none` for component status.

---

## 2. Top issues to address first

| Rank | Issue | Title | Component | Status | Priority | Why it matters | Recommended next step |
|------|------:|-------|-----------|--------|----------|----------------|-----------------------|
| 1 | #2705 | [Select] Low Contrast Indicator in Select Navigation (Keyboard Interaction) | Select | stable | Critical | Focus indicator contrast ratio 1.1:1 (light) / 1.6:1 (dark) — far below WCAG 3:1 minimum. Figma already updated. 3 comments, milestoned. | Implement the updated focus indicator styles in code. |
| 2 | #3150 | sl-select dropdown closes when clicking listbox scrollbar inside a modal dialog | Select | stable | Critical | Production bug, bug-labeled, assigned. External team (MyPortal) blocked. Select in a dialog is a common pattern. Has proposed fix. | Validate and ship the mousedown preventDefault fix. |
| 3 | #3104 | [Select] Some select components do not have visible label | Select | stable | Critical | Missing visible labels. 3 comments, a11y labeled. WCAG violation on a stable component. | Add visible labels to all affected Select variants. |
| 4 | #3154 | [Accordion] NVDA in browse mode announces two buttons as one | Accordion | stable | High | Screen reader merges announcements of adjacent buttons. A11y labeled, development labeled. | Debug NVDA browse mode behavior; separate button announcements. |
| 5 | #3153 | [Accordion] Disabled items not announced as disabled/dimmed | Accordion | stable | High | Screen readers don't communicate disabled state on Firefox/Safari. Snack-labeled (quick win). Suggested solution in issue. | Add `aria-disabled` and adjust keyboard/CSS behavior. |
| 6 | #3155 | [Accordion] VoiceOver announces "empty group" in Toggle Externally story | Accordion | stable | High | VoiceOver reads decorative `<br>` elements. Snack-labeled (quick win). | Add `aria-hidden="true"` to decorative `<br>` elements. |
| 7 | #2969 | [Tooltip] Does not disappear when mouse cursor leaves | Tooltip | stable | High | Tooltip persists and occludes content. 3 comments, assigned. Impacts production dashboards (Max Online). | Fix dismiss logic so tooltip hides when cursor leaves trigger and tooltip area. |
| 8 | #3159 | [Dialog] Close button does not behave responsively | Dialog | stable | High | Close button overlaps primary action on mobile. Reported by SLDS team member. Reproducible in Storybook. | Hide or reposition close button when mobile media query applies. |
| 9 | #2915 | Rename Error to SlError | none | none | High | Form package exports `Error` shadowing JavaScript's native `Error`. Bug-labeled, assigned. Causes runtime confusion. | Deprecate `Error` export, add `SlError` alias; plan breaking change for next major. |
| 10 | #3090 | Align semantic variants (caution, negative, positive) | none | none | High | Naming mismatch between Code, Figma, and Tokens. Affects 6+ components. Breaking change risk if not aligned. | Align Figma + Tokens to code naming; update documentation. |
| 11 | #2961 | Disabled state disappears against elevation.surface.raised.alternative | none | none | High | Disabled buttons/inputs invisible on certain backgrounds. Assigned. Cross-component visual regression. | Apply proposed `grey.150`/`grey.400` fix or `opacity.disabled`. |
| 12 | #2868 | [Tag] Tags with interactions should have button roles | Tag | preview | High | Removable tags lack programmatic role. Mobile screen reader users cannot delete items. Milestoned. 3 comments. | Add `role="button"` and native button interactions to interactive tags. |
| 13 | #2869 | [Tag list] Clarification for interaction for assistive technology users | Tag | preview | High | Tag list interaction unclear for screen reader users. 3 comments, a11y labeled. | Clarify and implement interaction patterns for tag lists. |
| 14 | #3035 | [Tooltip] Directive With Options uses non-existing tooltip ID for aria-describedby | Tooltip | stable | High | ARIA reference points to non-existing element. A11y bug on stable component. | Fix the directive to use correct tooltip ID. |
| 15 | #3049 | [Menu button] Esc key on expanded menu with tooltip closes menu not tooltip | none | none | High | Esc key precedence wrong when menu and tooltip overlay. A11y bug. | Fix Esc key handling to dismiss tooltip first, then menu. |
| 16 | #2500 | [Grid - Basics] Accessibility audit | none | none | High | Umbrella a11y audit for Grid. 8 comments, milestoned, assigned. Many child issues depend on it. | Continue the audit; triage child a11y issues by severity. |
| 17 | #3016 | [Switch] Custom Icons switches do not have any labels | Switch | stable | High | Switches missing labels entirely. A11y + Snack-labeled. | Add accessible labels to custom icon switch variants. |
| 18 | #3017 | [Select] Custom Styling variants do not have accessible names | Select | stable | High | Multiple Select story variants lack accessible names. A11y + Snack-labeled. | Add accessible names to affected variants. |
| 19 | #1989 | [Form] Add reportValidity API to sl-form | Form | stable | Medium | Enhancement requested by team with 60+ forms. 3 comments. Would improve validation DX significantly. | Evaluate adding `reportValidity` property to sl-form. |
| 20 | #1556 | [Grid - Basics] Very long grid cell text doesn't render properly | none | none | Medium | 18 months old, bug-labeled, 3 comments. Long text overflows grid cells. No assignee. | Investigate CSS text overflow handling in grid cells. |

---

## 3. Thematic clusters

### Cluster 1: Accessibility — Select component

**Issues:** #2705, #3104, #3017, #2884, #2896, #2799, #3137  
**Common pattern:** Select has contrast issues, missing labels, broken keyboard behavior, and missing accessible names. These affect both standalone Select and grid selection variants.  
**Why it matters:** Select is stable and in heavy production use. Low-contrast focus indicators and missing labels are direct WCAG failures.  
**Address first:** #2705 (contrast fix — Figma already done, needs code) and #3104 (missing labels).

---

### Cluster 2: Accessibility — Grid (not in status reference table)

**Issues:** #2500, #2880, #2879, #2881, #2883, #2884, #2895, #2896, #2897, #2421, #2505, #2499, #2420  
**Common pattern:** The largest concentration of a11y issues. Problems span ARIA attributes, keyboard navigation, selection state, empty headers, and drag-and-drop inaccessibility. Grid is not listed in the component status reference table.  
**Why it matters:** Grid is widely used across multiple products. The accessibility audit (#2500) is milestoned. Screen readers receive incorrect or missing information.  
**Address first:** #2880 (invalid `aria-rowindex` — quick fix) and #2884 (focus reset on selection).

---

### Cluster 3: Accessibility — Accordion

**Issues:** #3155, #3154, #3153, #2883  
**Common pattern:** Disabled state not announced, VoiceOver reads empty groups, NVDA merges button announcements. All reported recently by the a11y team (a11ymiko).  
**Why it matters:** Accordion is stable. Issues are well-documented with suggested solutions. Two are Snack-labeled (quick wins).  
**Address first:** #3153 (disabled not announced — Snack) and #3155 (empty group — Snack).

---

### Cluster 4: Accessibility — Calendar & Date Field (not in status reference table)

**Issues:** #2919, #2992, #3088, #3137, #3135, #3134, #3074  
**Common pattern:** Combined visual + a11y bugs, NVDA mode switching, focus management issues. Neither Calendar nor Date Field appear in the component status reference table.  
**Why it matters:** Calendar is widely used. Visual and a11y fixes in #2919 are partially complete. NVDA mode-switching (#3088) breaks interaction.  
**Address first:** #2919 (complete code changes), then #3088 (NVDA mode switching).

---

### Cluster 5: Component correctness — Tooltip

**Issues:** #2969, #3086, #3035, #3049, #2965, #2928, #3152, #3067  
**Common pattern:** Tooltip does not dismiss, Esc key conflicts, configuration issues, flickering animations, ARIA ID errors. An implementation reevaluation is underway (#3086).  
**Why it matters:** Tooltip is stable and broadly used. Multiple external teams report problems.  
**Address first:** #2969 (not dismissing — assigned, 3 comments), then coordinate with #3086 (reevaluation).

---

### Cluster 6: Shared foundations / Tokens / Styling

**Issues:** #3090, #2961, #2999, #3131  
**Common pattern:** Naming misalignment across code/Figma/tokens, disabled state visibility, contrast on disabled elements.  
**Why it matters:** Cross-component issues affecting consistency, theming, and developer trust. #3090 has breaking change risk.  
**Address first:** #3090 (align naming before it drifts further), then #2961 (disabled state — assigned).

---

### Cluster 7: Component correctness — Grid (non-a11y)

**Issues:** #3066, #3068, #3115, #2980, #2889, #2888, #2893, #1556  
**Common pattern:** Rendering bugs, duplicate fetch calls, badge rendering, Angular sorting, text overflow. Grid is not in the status reference table.  
**Why it matters:** Grid is the most complex component. Multiple external teams (Magister, Bingel) report production issues.  
**Address first:** #3068 (double fetchPage) and #3066 (last row rendering).

---

### Cluster 8: Accessibility — Tag & Tree (preview)

**Issues:** #2868, #2869, #2845, #2611, #2826, #2608, #2603  
**Common pattern:** Tags lack button roles and interaction, tree badges unreachable, focus behavior issues, keyboard navigation gaps.  
**Why it matters:** Tag and Tree are both preview components. Tag issues block Combobox progress (milestoned). Tree has active a11y work.  
**Address first:** #2868 (tags need button role — milestoned) and #2611 (tree badges unreachable for NVDA).

---

### Cluster 9: Documentation / Developer experience

**Issues:** #3148, #3064, #3157, #2590, #2581, #2499, #2485, #2130  
**Common pattern:** Missing analytics, API docs gaps, bug template improvements, component documentation incomplete.  
**Why it matters:** Documentation drives adoption. Gaps slow down external teams and increase support burden.  
**Address first:** #3157 (improve bug template — Snack, 3 comments) and #3148 (add analytics).

---

### Cluster 10: Release / Maintenance risk

**Issues:** #3094, #3069, #2915, #3158  
**Common pattern:** PR deployment changes, canary packages, Error naming collision, ESLint config issues.  
**Why it matters:** These affect developer workflow and release reliability. #2915 (Error naming) is a production hazard.  
**Address first:** #2915 (Error → SlError — assigned, bug-labeled).

---

## 4. Immediate actions

1. **Fix Select focus indicator contrast (#2705)**
   - Why now: WCAG failure at 1.1:1 contrast on a stable component. Figma design already updated. Code-only change needed.
   - Issues covered: #2705

2. **Ship the Select scrollbar-in-modal fix (#3150)**
   - Why now: Production bug, assigned, proposed solution ready. External team blocked.
   - Issues covered: #3150

3. **Add visible labels to Select variants (#3104)**
   - Why now: WCAG violation, 3 comments, actively discussed. Stable component.
   - Issues covered: #3104, #3017

4. **Fix Accordion a11y quick wins (#3153, #3155)**
   - Why now: Both are Snack-labeled with clear solutions documented. Small effort, stable component.
   - Issues covered: #3153, #3155

5. **Resolve Tooltip dismiss behavior (#2969) and coordinate with reevaluation (#3086)**
   - Why now: Assigned, 3 comments, external team impact. Aligning with reevaluation prevents double work.
   - Issues covered: #2969, #3086, #3049

---

## 5. Quick wins

1. **#3153 — Accordion disabled items not announced (Snack-labeled)**
   - Why: Add `aria-disabled` attribute. Clear solution documented in the issue.
   - Expected benefit: Screen readers correctly announce disabled accordion items.

2. **#3155 — Accordion VoiceOver "empty group" (Snack-labeled)**
   - Why: Add `aria-hidden="true"` to decorative `<br>` elements.
   - Expected benefit: VoiceOver stops announcing non-meaningful content.

3. **#3095 — Avatar picture not hidden from a11y readers (Snack-labeled)**
   - Why: Set decorative avatar images as not readable. Small, scoped change.
   - Expected benefit: Screen readers skip decorative avatar images.

4. **#3157 — Improve bug template (Snack-labeled, 3 comments)**
   - Why: Template changes, no code required. Already has 3 comments with consensus.
   - Expected benefit: Better bug reports, reducing triage time for every future issue.

5. **#3016 — Switch custom icons missing labels (Snack-labeled)**
   - Why: Add labels to custom icon switch variants. Small, well-scoped a11y fix.
   - Expected benefit: Screen readers can identify switch purpose.

---

## 6. Neglected risks

1. **#138 — [Module] Snackbar (created 2023-01-09, 7 comments)**
   - Open for over 3 years. Repeatedly discussed. No assignee. Commonly requested pattern.

2. **#1556 — [Grid - Basics] Very long grid cell text doesn't render properly (created 2024-09-27, 3 comments, bug-labeled)**
   - 18 months old, bug-labeled, no assignee. Grid is not in the status reference table but is widely used.

3. **#1606 — [Documentation website] Rename tabs on detail pages (created 2024-10-22)**
   - 17 months old. Accessibility issue on the documentation website itself. No recent activity.

4. **#261 — [Time field] Setup (created 2023-02-13)**
   - Over 3 years old. Time field is draft. The setup issue remains open with no assignee.

5. **#1942 — [Grid - Basics] Arrows-navigable variant (created 2025-04-07, 3 comments)**
   - 12 months old. Grid keyboard navigation enhancement. No assignee.

6. **#2003 — [ES Lint Plugin] No a11y rule for form controls outside forms (created 2025-04-29)**
   - 11 months old. Would catch a11y violations at build time. No assignee. Form is stable.

---

## 7. Data gaps and caveats

- **Grid, Calendar, and Date Field are not in the component status reference table.** These components appear frequently in the backlog but have no defined maturity status in the reference table. All are marked as `none` for component status in this report. Grid milestones reference "preview stage."
- **Bug label is underused.** Only 5 issues carry the `bug` label, but many more are typed as "Bug" in the issue template. This makes bug filtering via labels unreliable.
- **Component mapping is heuristic.** Components were identified from issue titles using keyword matching. Some issues may match multiple components (e.g., "[Menu button]" matches "button" from the reference table rather than "menu"). Manual review of borderline cases is recommended.
- **No milestone data on most issues.** Only a small subset of issues have milestones. This limits ability to assess scheduling intent.
- **Limited PR linkage visibility.** The issues API does not directly expose linked pull requests. Assignee field is used as a proxy for active work.
- **Assignee does not guarantee active work.** Several assigned issues have had no update in months.
- **Accessibility scoring is weighted heavily.** Because the prompt criteria treat all a11y issues as high priority regardless of component status, the top of the ranking is dominated by a11y items. Some lower-ranked non-a11y issues may have higher production urgency in specific team contexts.
- **No severity / impact labels.** The repository does not use severity labels (P0/P1/P2 etc.), making it difficult to distinguish between critical and minor bugs without reading each issue body.

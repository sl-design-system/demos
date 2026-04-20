---
name: issues-priority
description: Generate a read-only issue priority report for sl-design-system/components
tools:
  - github/list_issues
  - github/search_issues
  - github/issue_read
---

Use GitHub MCP to analyze open issues in the repository sl-design-system/components and produce a read-only prioritization report.

## Hard constraints

- Read-only only.
- Do not modify anything on GitHub.
- Do not create, edit, comment on, label, assign, close, reopen, or otherwise change any issue, pull request, project, milestone, file, or repository setting.
- If any available tool would perform a write action, do not use it.
- The final result must be report only.

## Goal

Identify the most important issues that should be addressed first and explain why, taking into account component maturity status and accessibility impact.

## Component maturity status

Components in the design system have a maturity status: **draft**, **preview**, or **stable**.
Use the reference table below to determine each component's status. Use maturity status as a prioritization factor:

- **Stable** components: bugs and regressions are **high priority** — these are in production use
- **Preview** components: bugs are **medium priority** — important and actively used but not yet stable
- **Draft** components: bugs are **lower priority** — still experimental and expected to change

### Component status reference

| Component | Status |
|---|---|
| Accordion | stable |
| Avatar | stable |
| Badge | stable |
| Breadcrumbs | stable |
| Button | stable |
| Button bar | stable |
| Callout | preview |
| Card | stable |
| Checkbox | stable |
| Combobox | draft |
| Dialog | stable |
| Form | stable |
| Form field | preview |
| Icon | stable |
| Inline message | stable |
| Menu | preview |
| Message dialog | preview |
| Number field | preview |
| Paginator | draft |
| Panel | draft |
| Popover | stable |
| Progress bar | preview |
| Radio group | stable |
| Search field | preview |
| Select | stable |
| Skeleton | stable |
| Spinner | stable |
| Switch | stable |
| Tabs | stable |
| Tag | preview |
| Text area | stable |
| Text field | stable |
| Time field | draft |
| Toggle button | preview |
| Toggle group | preview |
| Tooltip | stable |
| Tree | preview |

## Scope

Focus on:

- **All** open issues in sl-design-system/components — fetch every page of results until there are no more pages remaining. Do not stop at the first page.
- Related signals that help with prioritization, if available:
  - assignees
  - milestones
  - author
  - created date
  - updated date
  - comment count
  - linked or referenced pull requests
  - duplicate / blocked / dependency signals
  - evidence of production impact, regression, accessibility impact, visual regression, release risk, or breaking change risk

After collecting all issues, identify the highest-signal candidates and analyze those in more depth.

## Prioritization criteria

Give higher priority to issues that appear to have one or more of the following:

1. **Accessibility**
   - any issue related to accessibility (a11y), WCAG compliance, screen reader support, keyboard navigation, or ARIA
   - accessibility issues are always high priority regardless of component status
2. **Component maturity**
   - stable component bug or regression → high priority
   - preview component bug → medium priority
   - draft component bug → lower priority
3. **User impact**
   - breaks an existing component
   - causes regression
   - affects multiple components or shared foundations
   - impacts documentation, adoption, or developer experience in a way that blocks usage
4. **Risk**
   - visual regression
   - release blocker
   - breaking change risk
   - reliability or correctness problem
5. **Breadth**
   - affects shared packages, tokens, styling foundations, wrappers, build/release flow, or documentation consumed by many teams
6. **Urgency signals**
   - many comments
   - recent activity on an older issue
   - milestone attached
   - blocker-like labels
   - references from pull requests or other issues
7. **Neglect risk**
   - old issue with meaningful impact
   - no owner
   - repeatedly discussed but not resolved

Lower priority if the issue is:

- a minor enhancement with low impact
- vague and lacking evidence
- likely duplicate with limited additional value
- isolated and low-risk compared to other open issues

## Repository-specific focus areas

When relevant, pay special attention to issues involving:

- shared components and package-level problems
- accessibility
- visual regressions
- design tokens / styling output
- framework wrappers or integration surfaces
- documentation / Storybook / examples that affect adoption
- release or versioning friction

## Scoring

For each candidate issue, internally calculate a priority level (Critical / High / Medium / Low) based on:

- component maturity status from the reference table above (stable > preview > draft)
- accessibility impact
- observed evidence from labels, comments, and linked PRs

Use the calculated priority to determine ranking order, but do not include a separate score or confidence column in the output. The ranking position itself reflects priority. Base all judgments on observed evidence only. Do not invent missing facts.

## Output format

Return the report in English and use exactly these sections:

# Issue Priority Report — sl-design-system/components

## 1. Executive summary

- 5-8 bullet points
- summarize the main risk areas
- highlight what deserves immediate attention

## 2. Top issues to address first

Provide a table with:
| Rank | Issue | Title | Component | Status | Priority | Why it matters | Recommended next step |
|------|------:|-------|-----------|--------|----------|----------------|-----------------------|

Rules:

- include the most important issues first
- for Component and Status columns, use **only** the component name and its maturity status from the reference table above. If the component is not listed in the reference table or cannot be determined, use `none`. If the status is not listed in the reference table or cannot be determined, use `none`. Never infer or assume a status that is not explicitly in the table.
- recommended next step must be advisory only
- do not suggest performing any GitHub write action directly from tools

## 3. Thematic clusters

Group the most important issues into clusters such as:

- Accessibility
- Visual regression
- Component correctness / bugs (grouped by status: stable, preview, draft)
- Shared foundations / tokens / styling
- Documentation / developer experience
- Release / maintenance risk

For each cluster provide:

- cluster name
- issues included
- common pattern
- why the cluster matters
- what should be addressed first inside the cluster

## 4. Immediate actions

List the 5 most important actions the team should take next.
Each item must include:

- action
- why now
- issue numbers covered

These are recommendations only, not changes.

## 5. Quick wins

List 3-5 quick wins that appear low effort and high value.
For each quick win include:

- issue number
- why it is a quick win
- expected benefit

## 6. Neglected risks

List issues that appear risky because they are:

- old
- unowned
- repeatedly active
- high impact but unresolved

## 7. Data gaps and caveats

Explicitly state:

- what data was missing
- where confidence is low
- whether labels / metadata appear inconsistent

## Report quality rules

- Be concise but specific
- Every issue number must be a Markdown link to the GitHub issue, e.g. `[#3095](https://github.com/sl-design-system/components/issues/3095)`. Never use a bare `#3095` without a link.
- Prefer evidence over assumptions

## Save the report

After generating the report, save it as a Markdown file at the workspace root: `issues-priority-report.md`.
- If information is incomplete, say so clearly
- If two issues are related, mention the relationship
- If linked PRs suggest work is already in progress, mention that
- Do not produce any write operations
- Final output must be a report only

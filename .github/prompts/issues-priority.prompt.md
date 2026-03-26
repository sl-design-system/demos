---
name: issues-priority
description: Generate a read-only issue priority report for sl-design-system/components
tools:
  - github/list_issues
  - github/search_issues
---

Use GitHub MCP to analyze open issues in the repository sl-design-system/components and produce a read-only prioritization report.

## Hard constraints

- Read-only only.
- Do not modify anything on GitHub.
- Do not create, edit, comment on, label, assign, close, reopen, or otherwise change any issue, pull request, project, milestone, file, or repository setting.
- If any available tool would perform a write action, do not use it.
- The final result must be report only.

## Goal

Identify the most important issues that should be addressed first and explain why.

## Scope

Focus on:

- Open issues in sl-design-system/components
- Related signals that help with prioritization, if available:
  - labels
  - assignees
  - milestones
  - author
  - created date
  - updated date
  - comment count
  - linked or referenced pull requests
  - duplicate / blocked / dependency signals
  - evidence of production impact, regression, accessibility impact, visual regression, release risk, or breaking change risk

If the issue volume is large, first identify the highest-signal candidates and then analyze those in more depth.

## Prioritization criteria

Give higher priority to issues that appear to have one or more of the following:

1. **User impact**
   - breaks an existing component
   - causes regression
   - affects multiple components or shared foundations
   - impacts documentation, adoption, or developer experience in a way that blocks usage
2. **Risk**
   - accessibility issue
   - visual regression
   - release blocker
   - breaking change risk
   - reliability or correctness problem
3. **Breadth**
   - affects shared packages, tokens, styling foundations, wrappers, build/release flow, or documentation consumed by many teams
4. **Urgency signals**
   - many comments
   - recent activity on an older issue
   - milestone attached
   - blocker-like labels
   - references from pull requests or other issues
5. **Neglect risk**
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

For each candidate issue, assign:

- **Priority**: Critical / High / Medium / Low
- **Score**: 1-10
- **Confidence**: High / Medium / Low

Base the score on observed evidence only. Do not invent missing facts.

## Output format

Return the report in English and use exactly these sections:

# Issue Priority Report — sl-design-system/components

## 1. Executive summary

- 5-8 bullet points
- summarize the main risk areas
- highlight what deserves immediate attention

## 2. Top issues to address first

Provide a table with:
| Rank | Issue | Title | Priority | Score | Confidence | Why it matters | Recommended next step |
|------|------:|-------|----------|------:|------------|----------------|-----------------------|

Rules:

- include the most important issues first
- recommended next step must be advisory only
- do not suggest performing any GitHub write action directly from tools

## 3. Thematic clusters

Group the most important issues into clusters such as:

- Accessibility
- Visual regression
- Component correctness / bugs
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
- Cite issue numbers throughout the report
- Prefer evidence over assumptions
- If information is incomplete, say so clearly
- If two issues are related, mention the relationship
- If linked PRs suggest work is already in progress, mention that
- Do not produce any write operations
- Final output must be a report only

---
name: accessibility-improvements
description: Generate a read-only accessibility report for sl-design-system/components
tools:
  - github/list_issues
  - github/search_issues
  - github/issue_read
---

Use GitHub MCP to analyze closed issues in the repository sl-design-system/components and produce a read-only accessibility report. Focus on identifying past accessibility-related issues, their impact, how they were resolved, and any patterns or gaps that could inform future improvements. Focus only on the period from the beginning of 2026 until now.

## Hard constraints

- Read-only only.
- Do not modify anything on GitHub.
- Do not create, edit, comment on, label, assign, close, reopen, or otherwise change any issue, pull request, project, milestone, file, or repository setting.
- If any available tool would perform a write action, do not use it.
- The final result must be report only.

## Goal

Prepare short report that summarizes improvements made to accessibility in the repository in 2026. This report is intended to inform higher management about the progress and impact of accessibility efforts, highlight key achievements, list numbers of components that have improved accessibility, list specific accessibility enhancements made, and identify any remaining gaps or opportunities for further improvement. This report should avoid technical details and focus on high-level insights and outcomes.

## Scope

Focus on:

- **All** closed issues from 2026 in sl-design-system/components that are accessibility-related — fetch every page of results until there are no more pages remaining. Do not stop at the first page.
- Related context that helps explain impact and progress, when available:
  - issue titles
  - created/closed dates
  - labels and milestones
  - linked issues
  - merged status for pull requests

Accessibility-related includes issues that mention or clearly involve topics such as a11y, accessibility, WCAG, ARIA, keyboard navigation, screen readers, focus management, semantic structure, color contrast, and similar user-impacting accessibility concerns.

## Analysis instructions

- Focus on high-level outcomes and business/user impact, not implementation details.
- Highlight what improved, why it matters, and where risks remain.
- Use evidence from closed issues in 2026.
- If data is incomplete, explicitly state limitations.
- Do not invent missing facts.

## Output format

Return the report in English and use exactly these sections:

# Accessibility Improvements Report — sl-design-system/components (2026)

## 1. Executive summary

- 5-8 bullet points
- summarize the main accessibility progress and impact
- highlight major wins and remaining concerns

## 2. Key achievements in 2026

- 4-8 bullet points
- each bullet should explain the improvement and its impact in plain language
- include Markdown links to supporting issues

## 3. Components with improved accessibility

- List the number of components that received accessibility improvements
- Provide a bulleted list of specific component names
- Include counts of total components improved

## 4. Specific accessibility enhancements made

- List specific accessibility enhancements by category (e.g., keyboard navigation, ARIA attributes, focus management, semantic HTML, color contrast)
- For each enhancement, mention the component(s) affected
- Include links to supporting issues or pull requests

## 5. Accessibility impact themes

Group findings into 3-6 themes (for example: keyboard usability, screen reader support, focus behavior, semantic improvements, documentation quality).

For each theme provide:
- what improved
- evidence (issue/PR links)
- why it matters for users and product quality

## 6. What remains to improve

- 3-6 concise bullets describing remaining gaps, recurring patterns, or unresolved risks
- include links when evidence exists
- keep recommendations high-level and non-technical

## 7. Suggested next steps

- 3-5 management-level actions
- each action should include: action, expected outcome, and relevant issue/PR links (if available)

## 8. Data gaps and caveats

- what data was missing or unclear
- where confidence is limited
- any assumptions made

## Report quality rules

- Keep the report concise, readable for non-technical leadership, and outcomes-focused.
- Avoid implementation-level technical details.
- Every issue number must be a Markdown link to the GitHub issue, e.g. `[#3095](https://github.com/sl-design-system/components/issues/3095)`. Never use a bare `#3095` without a link.
- Every pull request number must be a Markdown link to the GitHub pull request, e.g. `[#3120](https://github.com/sl-design-system/components/pull/3120)`.
- Prefer evidence over assumptions.

## Save the report

After generating the report, save it as a Markdown file at the workspace root: `accessibility-improvements-report.md`.

- If information is incomplete, say so clearly.
- If two issues are related, mention the relationship.
- If linked PRs suggest work is already in progress, mention that.
- Do not produce any GitHub write operations.
- Final output must be report only.

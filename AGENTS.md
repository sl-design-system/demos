# AGENTS

## Repository Rules

1. Do not use `any()` or `unknown()` when adding a new component to this repository.
   - Prefer explicit and strict types.
   - If a temporary fallback is unavoidable, document the reason and create a follow-up task to remove it.

2. Put component styles in the component `.scss` file inside that component folder.
   - Do not rely on inline `style` attributes in component HTML/templates.
   - Keep markup focused on structure and behavior, and keep styling in `.scss`.

3. For new form components, Angular demos must include both variants:
   - Reactive forms
   - Template-driven forms
   - This requirement applies only to Angular.
   - For Lit, Vue, and Svelte, do not add both form variants unless explicitly requested.

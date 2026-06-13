# AGENTS

## Repository Rules

1. Do not use `any()` or `unknown()` when adding a new component to this repository.
   - When modifying an existing component that already uses `any()` or `unknown()`, do not introduce additional usages. Existing usages should be tracked and removed opportunistically, following the same documentation requirement below.
   - Prefer explicit and strict types.
   - If a temporary fallback is unavoidable, add an inline code comment beginning with `// TODO:` that explains the reason, and open a follow-up ticket in the issue tracker referencing that comment.

2. Put component styles in the component `.scss` file inside that component folder.
   - Do not rely on inline `style` attributes in component HTML/templates.
   - Keep markup focused on structure and behavior, and keep styling in `.scss`.

3. For new form components, Angular demos must include both variants:
   - A form component is any component whose primary purpose is user data entry and which integrates with Angular form APIs (for example, implements `ControlValueAccessor` or accepts form-control inputs).
   - Reactive forms
   - Template-driven forms
   - This requirement applies only to Angular.
   - For Lit, Vue, and Svelte, do not add both form variants unless explicitly requested.

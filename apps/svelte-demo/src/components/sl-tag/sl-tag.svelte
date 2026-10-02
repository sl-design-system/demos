<script lang="ts">
  import '@sl-design-system/tag/register.js';
</script>

 <style lang="scss" src="./sl-tag.scss"></style>

<sl-tag-list class="tags" aria-label="Subjects">
  <sl-tag removable>Mathematics</sl-tag>
  <sl-tag removable>Physics</sl-tag>
  <sl-tag disabled=${true} removable>Chemistry</sl-tag>
</sl-tag-list>

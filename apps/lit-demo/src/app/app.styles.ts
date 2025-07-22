import { css, unsafeCSS } from 'lit';
import cssStyles from './app.styles.css';
import '../../../../node_modules/@sl-design-system/sanoma-learning/light.css';

export const appStyles = css`${unsafeCSS(cssStyles)}`;

// TODO: import styling globally for the whole lit demo app

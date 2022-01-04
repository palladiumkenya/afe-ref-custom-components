import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import styles from './afe-content-display.scss';

@customElement('afe-content-display')
export class AfeContentDisplayElement extends LitElement {
  static styles = styles;
  @property({type: Object})
  config:{ tag: '', url?: '', module?: '', detail?: any };
  
  @property({type: Boolean})
  dark = true;
  constructor() {
    super();
  }
  
  render() {
    const classes = { dark: this.dark, light: !this.dark};
    return html`
    <div class="card ${classMap(classes)}">
     ${this.config.detail}
    </div>`;
  }
}
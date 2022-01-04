import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './main.scss';

@customElement('main-app')
export class MainElement extends LitElement {
  static styles = styles;
  question = { "extras": { "type": "obs", "label": "Custom Control Test:", "id": "customCon", "required": "true", "default": "", "questionOptions": { "rendering": "select", "customControl": true, "answers": [{ "concept": "8b715fed-97f6-4e38-8f6a-c167a42f8923", "label": "yes" }, { "concept": "a899e0ac-1350-11df-a1f1-0026b9348838", "label": "No" }] }, "customControlConfig": { "tag": "afe-content-switcher", "url": "http://localhost:4200/lib/web-components.bundled.js?module", "module": "true" } }, "renderingType": "select", "key": "customCon", "label": "Custom Control Test:", "validators": [], "required": "true", "options": [{ "label": "", "value": "" }, { "label": "yes", "value": "8b715fed-97f6-4e38-8f6a-c167a42f8923" }, { "label": "No", "value": "a899e0ac-1350-11df-a1f1-0026b9348838" }], "controlType": 0, "dataSource": "", "conponentConfigs": [] };

  componentConfig = {
    "type": "component",
    "label": "Custom Control Test:",
    "id": "customCon",
    "required": "true",
    "default": "",
    "questionOptions": {
      "rendering": "custom",
      "answers": [
        {
          "concept": "8b715fed-97f6-4e38-8f6a-c167a42f8923",
          "label": "yes"
        },
        {
          "concept": "a899e0ac-1350-11df-a1f1-0026b9348838",
          "label": "No"
        }
      ]
    },
    "customControlConfig": {
      "tag": "afe-content-switcher",
      "url": "http://localhost:4200/lib/web-components.bundled.js?module",
      "module": "true"
    }
  };

  customDisplay = {
    "tag": "afe-content-display",
    "url":"http://localhost:4200/lib/web-components.bundled.js?module",
    "module": "true",
    "detail": "This is custom component within a page it is displayed at the top of the page"
  }
  constructor() {
    super();
  }

  render() {
    return html`
    <div class="bx--grid">
    <div class="bx--row">
    <afe-content-switcher .question=${this.question}></afe-content-switcher>
    </div>
    <div class="bx--row">
    <afe-content-display .config=${this.customDisplay} ></afe-content-display>
    </div>
  </div>`;
  }
}
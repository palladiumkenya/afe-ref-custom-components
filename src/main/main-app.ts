import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import styles from './main.scss';

@customElement('main-app')
export class MainElement extends LitElement {
  static styles = styles;
  question = { "extras": { "type": "obs", "label": "Custom Control Test:", "id": "customCon", "required": "true", "default": "", "questionOptions": { "rendering": "select", "customControl": true, "answers": [{ "concept": "8b715fed-97f6-4e38-8f6a-c167a42f8923", "label": "yes" }, { "concept": "a899e0ac-1350-11df-a1f1-0026b9348838", "label": "No" }] },
   "customControlConfig": { "tag": "afe-content-switcher", "url": "http://localhost:4200/lib/web-components.bundled.js?module", "module": "true" } }, "renderingType": "select", "key": "customCon", "label": "Custom Control Test:", "validators": [], "required": "true", "options": [{ "label": "", "value": "" }, { "label": "yes", "value": "8b715fed-97f6-4e38-8f6a-c167a42f8923" }, { "label": "No", "value": "a899e0ac-1350-11df-a1f1-0026b9348838" }], "controlType": 0, "dataSource": "", "conponentConfigs": [] };

  question1 = {
    "extras": {
      "type": "obs",
      "label": "Custom Control Test Radio:",
      "id": "customConRadio",
      "required": "true",
      "default": "",
      "questionOptions": {
        "rendering": "radio",
        "customControl": true,
        "answers": [{
                  "label": "Severe acute malnutrition",
                  "concept": "163302"
                }, {
                  "label": "Moderate acute malnutrition",
                  "concept": "163303"
                }, {
                  "label": "Normal",
                  "concept": "1115"
                }, {
                  "label": "Overweight/Obese",
                  "concept": "114413"
                }
          ]
      },
      "customControlConfig": {
        "tag": "afe-content-switcher",
        "url": "http://localhost:4200/lib/web-components.bundled.js?module",
        "module": "true"
      }
    },
    "renderingType": "radio",
    "key": "customConRadio",
    "label": "Custom Control Test Radio:",
    "validators": [],
    "required": "true",
    "options": [{
          "label": "Severe acute malnutrition",
          "concept": "163302"
        }, {
          "label": "Moderate acute malnutrition",
          "concept": "163303"
        }, {
          "label": "Normal",
          "concept": "1115"
        }, {
          "label": "Overweight/Obese",
          "concept": "114413"
        }],
    "controlType": 0,
    "dataSource": "",
    "conponentConfigs": []
  };

  question2 = {
    "extras": {
      "type": "obs",
      "label": "Custom Control HTS Test",
      "id": "customConHtsTest",
      "required": "true",
      "default": "",
      "questionOptions": {
        "rendering": "select",
        "customControl": true,
        "answers": [{
          "label": "Positive",
          "concept": "703"
        }, {
          "label": "Negative",
          "concept": "664"
        }, {
          "label": "Invalid",
          "concept": "1067"
        }]
      },
      "customControlConfig": {
        "tag": "afe-content-hts-final",
        "url": "http://localhost:4200/lib/web-components.bundled.js?module",
        "module": "true"
      }
    },
    "renderingType": "select",
    "key": "customConHtsTest",
    "label": "Custom Control HTS Test ",
    "validators": [],
    "required": "true",
    "options": [{
          "label": "Positive",
          "concept": "703"
        }, {
          "label": "Negative",
          "concept": "664"
        }, {
          "label": "Invalid",
          "concept": "1067"
        }],
    "controlType": 0,
    "dataSource": "",
    "conponentConfigs": []
  };

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
    "tag": "afe-content-text",
    "url":"http://localhost:4200/lib/web-components.bundled.js?module",
    "module": "true",
    "detail": "This is custom component within a page it is displayed at the top of the page"
  };

  constructor() {
    super();
  }

  render() {
    return html`
    <div class="bx--grid">
    <div class="bx--row">
    <afe-content-switcher .question=${this.question} .question1=${this.question1}></afe-content-switcher>
    </div>
    <div class="bx--row">
    <afe-content-text .config=${this.customDisplay} ></afe-content-text>
    </div>
    <div class="bx--row">
      <afe-content-radio .question=${this.question1}> </afe-content-radio>
    </div>
    <div class="bx--row">
      <afe-content-hts-final .question=${this.question2}> </afe-content-hts-final>
    </div>
  </div>`;
  }
}
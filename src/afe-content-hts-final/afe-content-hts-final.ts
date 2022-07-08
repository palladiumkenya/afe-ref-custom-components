import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import "carbon-web-components/es/components/select/index.js";
import { styleSheet } from "./afe-content-hts-final-styles";

@customElement("afe-content-hts-final")
export class AfeContentHtsFinalElement extends LitElement {
  static get styles(){
    return styleSheet;
  }

  @property({ type: String })
  value: String;
  @property({ type: Object })
  question: any;
  @property({ type: String })
  initialTestVal: String;
  @property({ type: String })
  confirmedTestVal: String;
  @property({ type: String })
  finalTestVal: String;

  @property({ type: Object })
  config: any;

  disabled = false;
  answers: [];
  constructor() {
    super();
    // Request an update in response to an event
    this.addEventListener("on-change", async (e: CustomEvent) => {
      await this.requestUpdate();
    });
  }

  _updateValueInitial(e: Event) {
    const selectedVal = (e.target as HTMLInputElement).value;
    this.initialTestVal = selectedVal;
  }

  _updateValueConfirmatory(e: Event) {
    const selectedConfirmedVal = (e.target as HTMLInputElement).value;
    this.confirmedTestVal = selectedConfirmedVal;
    if (this.initialTestVal == "703" && selectedConfirmedVal == "703") { //first positive and confirmed positive
      this.finalTestVal = "703";
    } else if ((this.initialTestVal == "664" && selectedConfirmedVal == "703") || (this.initialTestVal == "703" && selectedConfirmedVal == "664") ) { //initial negative and confirmatory negative
      this.finalTestVal = "1067";
    } else if(this.initialTestVal == "664" && selectedConfirmedVal == "664") { // 
      this.finalTestVal = "664";
    } else if ((this.initialTestVal == "664" && selectedConfirmedVal == "1067") || (this.initialTestVal == "703" && selectedConfirmedVal == "1067") ) { //initial negative and confirmatory negative
      this.finalTestVal = "1067";
    }  
  }

  render() {
    // Start here
    let answerOptionsRadio = this.question?.extras?.questionOptions?.answers;

    if (answerOptionsRadio && answerOptionsRadio.length > 0) {
      answerOptionsRadio.map((answer1) => {
        return (answer1["active"] = false);
      });
    }
    if (this.value) {
      answerOptionsRadio = answerOptionsRadio.map((x) =>
        x.concept === this.value ? { ...x, active: true } : x
      );
      let alreadActive1 = this.answers.find(
        ({ concept }) => concept === this.value
      );
      if (alreadActive1 && alreadActive1["active"]) {
        answerOptionsRadio = answerOptionsRadio.map((x) =>
          x.concept === alreadActive1["concept"] ? { ...x, active: false } : x
        );
      }
    }
    this.answers = answerOptionsRadio;

    return html`
    <div>

    <p class="heading">HTS Screening</p>

    <bx-select @bx-select-selected=${this._updateValueInitial} label-text="Select" placeholder="HIV Test 1 Results:">
      ${this.answers?.map(
        (item: any) => html`<bx-select-item 
          label-text=${item.label}
          value=${item.concept}
          .selected=${this.initialTestVal == item.concept}
        >
          ${item.label}
        </bx-select-item>`)} 
    </bx-select> 

    <bx-select @bx-select-selected=${this._updateValueConfirmatory} label-text="Select" placeholder="HIV Confirmatory Test Results:">
      ${this.answers?.map(
        (item: any) => html`<bx-select-item 
          label-text=${item.label}
          value=${item.concept}
          .selected=${this.confirmedTestVal == item.concept}
        >
          ${item.label}
        </bx-select-item>`)} 
    </bx-select>

    <bx-select label-text="Select" placeholder="HIV Final Test Results:">
      ${this.answers?.map(
        (item: any) => html`<bx-select-item 
          label-text=${item.label}
          value=${item.concept}
          .selected=${this.finalTestVal == item.concept}
        >
          ${item.label}
        </bx-select-item>`)} 
    </bx-select> 
        
    </div>`;
  }
}

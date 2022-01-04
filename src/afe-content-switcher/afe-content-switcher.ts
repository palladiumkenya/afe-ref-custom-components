import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './afe-content-switcher.scss';

@customElement('afe-content-switcher')
export class AfeContentSwitcherElement extends LitElement {
  static styles = styles;
  @property({ type: String })
  value: String;
  @property({ type: Object })
  question: any;
  @property({ type: Boolean })
  
  disabled = false;
  answers: [];
  constructor() {
    super();
    // Request an update in response to an event
    this.addEventListener('on-change', async (e: CustomEvent) => {
      await this.requestUpdate()
    });
  }
  _handleClick(item) {
    let concept = item.concept;
    if(item['active']){
      concept = '';
    }
    let changeEvent = new CustomEvent('on-change', {
      detail: { data: concept }
    });
    this.dispatchEvent(changeEvent);
  }

  getClasses (active) {
    var classes = 'bx--content-switcher-btn bx--content-switcher'
    if(active) classes += '--selected';
    return classes;
  }
  
  render() {
    let answerOptions = this.question?.extras?.questionOptions?.answers;
    
    if(answerOptions && answerOptions.length>0){
      answerOptions.map(answer=>{
        return answer['active']=false;
      })
     
    }
    if (this.value) {
      answerOptions = answerOptions.map(x => (x.concept === this.value ? { ...x, active: true } : x));
      let alreadActive = this.answers.find(({ concept }) => concept === this.value);
      if(alreadActive && alreadActive['active']){
        answerOptions = answerOptions.map(x => (x.concept === alreadActive['concept'] ? { ...x, active: false } : x));;
      }
    }
    this.answers = answerOptions;
    return html`
    <div data-content-switcher class="bx--content-switcher">
      ${this.answers.map((item: any) => html`<button ?disabled=${this.disabled}
      class="${this.getClasses(item.active)}" @click=${() => this._handleClick(item)}>${item.label}</button>`)}
    </div>`;
  }
}
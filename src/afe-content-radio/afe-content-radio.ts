import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './afe-content-radio.scss';
import {styleMap} from 'lit/directives/style-map.js';
import 'carbon-web-components/es/components/radio-button/index.js';

@customElement('afe-content-radio')
export class AfeContentRadioElement extends LitElement {
  static styles = styles;
  bmi = true;
  @property({ type: String })
  value: String;
  @property({ type: Object })
  question: any;
  @property({ type: String })
  checkboxVal: String;


  @property({type: Object})
  config: any;
  
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
    // if item concept render component
    let concept = item.concept;
    if(item['active']){
      concept = '';
    }
    let changeEvent = new CustomEvent('on-change', {
      detail: { data: concept }
    });
    this.dispatchEvent(changeEvent);
  }

  _bmiChanged(e: Event) {
    const bmiVal = (e.target as HTMLInputElement).valueAsNumber;
    if (bmiVal < 16 && bmiVal > 1) {
        this.checkboxVal = "163302";
    } else if(bmiVal > 16 && bmiVal < 18.5) {
        this.checkboxVal = "163303";
    } else if(bmiVal > 18.5 && bmiVal < 25) {
        this.checkboxVal = '1115'; 
    } else if(bmiVal > 25) {
        this.checkboxVal = '114413';
    } else if (bmiVal == undefined || bmiVal == null) {
      this.checkboxVal = ''
    }
  }
  
  render() {

    // Start here
    let answerOptionsRadio = this.question?.extras?.questionOptions?.answers;
    
    if(answerOptionsRadio && answerOptionsRadio.length>0){
      answerOptionsRadio.map(answer1=>{
        return answer1['active']=false;
      })
    }
    if (this.value) {
      answerOptionsRadio = answerOptionsRadio.map(x => (x.concept === this.value ? { ...x, active: true } : x));
      let alreadActive1 = this.answers.find(({ concept }) => concept === this.value);
      if(alreadActive1 && alreadActive1['active']){
        answerOptionsRadio = answerOptionsRadio.map(x => (x.concept === alreadActive1['concept'] ? { ...x, active: false } : x));;
      }
    }
    this.answers = answerOptionsRadio;

    const styles = {
      backgroundColor: 'lightgreen',
      opacity: this.hidden ? '0.2' : '1',
      padding: '10px',
      marginBottom: '20px'
    };
    return html`
    <div>
      <div>
        <p>Input BMI </p>
        <input type="number" @change=${this._bmiChanged} style=${styleMap(styles)}></p>

        <bx-radio-button-group label-position="right" orientation="horizontal" name="radio-group">
          ${this.answers?.map((item: any) => html`<bx-radio-button
           label-text=${item.label} value=${item.concept} .checked=${this.checkboxVal == item.concept}>
            ${item.label}
          </bx-radio-button>`)}
        </bx-radio-button-group> 
        
      </div>
    </div>`;
  }
}
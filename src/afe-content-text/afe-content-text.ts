import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import styles from './afe-content-text.scss';


@customElement('afe-content-text')
export class AfeContentTextElement extends LitElement {

  @property({ type: Object })
  question: any;
  value:any;
  @property()
  name?: string;
  constructor() {
    super();
    this.addEventListener('on-change', async (e: CustomEvent) => {
      await this.requestUpdate()
    });
  }
  static styles = css`
  p {
    color: red;
  }
`;

  _handleClick(item) {
if(item.target.value!=""){
    const identifierValue = item.target.value;
    console.log("identifierValue",identifierValue)
    if(identifierValue.length < 10){
      this.name = "Invalid Unique Patient Number(UPN) Format! Should be mfl-clinic number, each 5 digits (accepts 11 digits for existing UPN)"
     }else{
      this.name = ""
    }
    this.value=item.target.value;
    let changeEvent = new CustomEvent('on-change', {
      detail: { data: item.target.value }
    });
    console.log("HERE",changeEvent)
    this.dispatchEvent(changeEvent);
  }
  }
  render() {
    const styles = {
      backgroundColor: 'lightgreen',
      opacity: this.hidden ? '0.2' : '1',
      padding: '10px',
      marginBottom: '20px'
    };

    this.value="";
    return html`
    <div>
    Add identifier: 
    <input type="text" .question=${this.question} value=${this.value} @change=${this._handleClick} />  
    <p>${this.name}</p>
    
    </div>`;
  }
}
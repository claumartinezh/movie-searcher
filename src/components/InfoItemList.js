import { html, css, LitElement } from 'lit-element';
import './InfoItem.js';

export class InfoItemList extends LitElement {
  static get styles() {
    return css `
      :host {
        color: var(--info-item-list-text-color, #000);
      }
      
      ul {
        list-style: none;
        display: grid;
        grid-gap: 1rem;
        grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
        padding-left: 0;
        margin: 0;
      }
    `;
  }

  static get properties() {
    return {
      itemsList: { type: Array }
    };
  }

  constructor() {
    super();
  }

  render() {
    if (this.itemsList) {
      return html `
        <ul>
          ${this.itemsList.map(item => {
            return html`
              <li><info-item .info=${item}></info-item></li>
            `;
          })}
        </ul>
      `;
    } else {
      return html`<p> No hay ningún resultado.</p>`;
    }
  }
}
window.customElements.define('info-item-list', InfoItemList);
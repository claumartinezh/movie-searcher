import { html, css, LitElement } from 'lit-element';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icon/iron-icon.js';

export class InputFinder extends LitElement {
  static get styles() {
    return css `
      :host {
        display: block;
        margin: 1rem;
        color: var(--input-finder-text-color, #000);
      }

      .wrapper {
        display: flex;
        border: 1px solid black;
        border-radius: 1rem;
        padding: 0.5rem;
        background-color: #fff;
      }
      input {
        font-size: 14px;
        border: none;
        flex-grow: 2;
      }
      input:focus {
        outline: none;
      }
      button {
        cursor: pointer;
        border: none;
        background: none;
      }
      button:focus {
        outline: none;
      }
      button[disabled] {
        cursor: auto;
      }
    `;
  }

  static get properties() {
    return {
      placeHolder: { type: String },
      icon: { type: String },
      value: {
        type: String,
        hasChanged(newVal, oldVal) {
          if (newVal !== oldVal) {
            return true;
          }
        }
      }
    };
  }

  constructor() {
    super();
    this.placeHolder = 'Write something';
    this.icon = "search";
    this.value = null;
  }

  /**
   * Dispatches an event and clears input
   */
  _onClickButton() {
    this.dispatchEvent(new CustomEvent('search-clicked', {
      detail: this.value,
      composed: true,
      bubbles: true
    }));
    this.value = '';
  }

  /**
   * Input observer
   * @param {Object} e input value
   */
  inputChange(e) {
    this.value = e.target.value;
    this.dispatchEvent(new CustomEvent('change', {
      detail: this.value
    }));
  }

  render() {
    return html `
      <div class="wrapper">
        <input type="text" autofocus .placeholder=${this.placeHolder} .value=${this.value} @input=${this.inputChange}>
        <button @click=${this._onClickButton} ?disabled=${!this.value}>
          <iron-icon icon="${this.icon}"></iron-icon>
        </button>
      </div>
    `;
  }
}
window.customElements.define('input-finder', InputFinder);
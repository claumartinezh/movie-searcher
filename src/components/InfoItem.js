import { html, css, LitElement } from 'lit-element';

export class InfoItem extends LitElement {
  static get styles() {
    return css `
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 25px;
        color: var(--info-item-text-color, #000);
        max-width: 15rem;
      }
      .image {
        border-radius: 0.5rem;
        height: 15rem;
        width: 10rem;
      }
      img {
        border-radius: 0.5rem;
      }
      .info-wrapper {
        font-size: 14px;
        
      }
      .info-wrapper h2 {
          font-weight: bold;
          font-size: 14px;
          margin-bottom: 0;
      }
    `;
  }

  static get properties() {
    return {
      info: { type: Object }
    };
  }

  constructor() {
    super();
  }

  render() {
    return html `
      <div class="image">
        <img .src=${this.info.image} style='height: 100%; width: 100%; object-fit: cover'>
      </div>
      <div class="info-wrapper">
        <h2>${this.info.title} (${this.info.year})</h2>
        <p>${this.info.score}</p>
      </div>
    `;
  }
}
window.customElements.define('info-item', InfoItem);
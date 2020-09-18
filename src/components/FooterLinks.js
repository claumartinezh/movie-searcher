import { html, css, LitElement } from 'lit-element';
import 'social-icon/dile-social-icon.js';

export class FooterLinks extends LitElement {
  static get styles() {
    return css `
      :host {
        display: block;
        text-align: left;
        padding: 25px;
        color: var(--footer-links-text-color, #fff);
        background-color: #000;
      }
      h1 {
        margin: 0 1rem 2rem 1rem;
        font-size: 20px;
      }
      ul {
        font-size: 12px;
        list-style: none;
        align-items: center;
        display: flex;
        padding: 0;
        flex-wrap: wrap;
      }
      li {
        margin: 1rem;
      }
      .external-links {
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }
      .author {
        flex-grow: 1;
        font-size: 12px;
      }
      .social-media {
        display: flex;
      }
      a {
        --dile-social-icon-size: 1rem;
        --dile-social-icon-color: #000;
        background: #fff;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        width: 2rem;
        height: 2rem;
        margin: 0.5rem;
      }
      .languages {
        margin-left: 2rem;
        font-size: 14px;
      }
    `;
  }

  static get properties() {
    return {
      title: { type: String },
      links: { type: Array },
    };
  }

  constructor() {
    super();
    this.title = '¿Preguntas? Llama al 900000000';
  }

  render() {
    return html `
      <h1>${this.title}</h1>
      <ul>
        ${this.links.map(link => {
          return html`<li>${link}</li>`;
        })}
      </ul>
    
      <div class="external-links">
        <span class="author">Made by Claudia Martínez Herrero 2020</span>
        <div class="social-media">
          ${this.socialApps.map(app => html`<a href=${app.link}><dile-social-icon icon="${app.icon}"></dile-social-icon></a>`)}
        </div>
        <div class="languages">
          <span>Español</span> | <span>English</span>
        </div>
      </div>
    `;
  }
}
window.customElements.define('footer-links', FooterLinks);
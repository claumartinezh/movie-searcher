import { html, css, LitElement } from 'lit-element';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icon/iron-icon.js';

export class MenuHeader extends LitElement {
  static get styles() {
    return css `
      :host {
        display: block;
        background: #000;
        color: #fff;
      }
      .header {
        font-size: 10px;
        padding: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .logo {
        --iron-icon-height: 34px;
        --iron-icon-width: 34px;
      }
      h2 {
        text-align: left;
        flex-grow: 2;
      }
      button {
        cursor: pointer;
        padding: 0.5rem;
        border: none;
      }
      .menu-button {
        background: none;
        color: white;
      }
      .close-button {
        float: right;
        border-radius: 50%;
      }
      .close-button:hover {
        background-color: red;
      }
      section {
        position: absolute;
        height: auto;
        bottom: 0;
        top: 0;
        left: 0;
        right: 0;
        padding: 8rem;
        background: rgba(0,0,0, 0.8);
      }
      ul {
        list-style-type: none;
        font-size: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 5rem;
      }
      li {
        margin-bottom: 2rem;
      }
      li:hover {
        color: red;
        cursor: pointer;
      }
    `;
  }

  static get properties() {
    return {
      title: { type: String },
      items: { type: Array },
      opened: { type: Boolean },
      icon: { type: String }
    };
  }

  constructor() {
    super();
    this.title = 'MovieSearcher';
    this.opened = false;
    this.items = ['Inicio', 'Buscador', 'Series', 'Películas', 'Mi lista', 'Mi perfil'];
    this.icon = 'menu';
  }

  /**
   * Opens/Closes the menu
   */
  _toggleMenu() {
      this.opened = !this.opened;
  }

  /**
   * Dispatches an event to go to a page
   * @param {Object} e section information
   */
  _goToSection(e) {
      this.dispatchEvent(new CustomEvent("go-to-section", {
        detail: { sectionName: e.currentTarget.innerText }
      }));
      this._toggleMenu();
  }

  render() {
    return html `
      <div class="header">
        <iron-icon class="logo" icon="theaters"></iron-icon>
        <h2>${this.title}</h2>
        <button class="menu-button" @click=${this._toggleMenu}><iron-icon icon="${this.icon}"></iron-icon></button>
      </div>

      <section ?hidden="${!this.opened}">
        <button class="close-button" @click=${this._toggleMenu}><iron-icon icon="close"></button>
        <ul>
          ${this.items.map(item => {
            return html`<li @click=${this._goToSection}>${item}</li>`
          })}
        </ul>
      </section>
    `;
  }
}
window.customElements.define('menu-header', MenuHeader);
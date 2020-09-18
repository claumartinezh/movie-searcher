import { LitElement, html, css } from 'lit-element';
import './components/MenuHeader.js';
import './components/InfoItem.js';
import './components/InfoItemList.js';
import './components/InputFinder.js';
import './components/FooterLinks.js';

export class MoviesApp extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      page: { type: String },
      moviesList: { type: Array },
      socialApps: { type: Array },
      footerLinks: { type: Array }
    };
  }

  static get styles() {
    return css `
      :host {
        min-height: 100vh;
        font-size: calc(10px + 2vmin);
        font-family: "Trebuchet MS", Helvetica, sans-serif;
        color: #1a2b42;
        margin: 0 auto;
        text-align: center;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction:column;
      }

      input-finder {
        align-self: flex-end;
        width: 25rem;
      }

      main {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        background-color: #fff;
      }

      .app-footer {
        font-size: calc(12px + 0.5vmin);
        align-items: center;
      }

      .app-footer a {
        margin-left: 5px;
      }
    `;
  }

  constructor() {
    super();
    this.socialApps = [
      { name: 'facebook', icon: 'facebook', link: 'www.facebook.com' },
      { name: 'twitter', icon: 'twitter', link: 'www.twitter.com' },
      { name: 'instagram', icon: 'instagram', link: 'www.instagram.com' },
      { name: 'gmail', icon: 'gmail', link: 'www.gmail.com' }
    ];
    this.footerLinks = ['Preguntas frecuentes', 'Inversores', 'Formas de ver', 'Información corporativa', 'Originales de Netflix', 'Centro de ayuda', 'Empleo', 'Términos de uso', 'Contáctanos',
        'Cuenta', 'Canjear tarjetas regalo', 'Privacidad', 'Prueba de velocidad', 'Zona de prensa', 'Comprar tarjetas regalo', 'Preferencias de cookies', 'Avisos legales'
    ];
  }

  /**
   * Searchs a movies list from omdbapi
   * @param {Object} enteredValue value from input
   */
  _findMovie(enteredValue) {
    const apiKey = '9f036219';
    var movieToSearch = enteredValue.detail;

    fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${movieToSearch}`)
      .then((success => {
        return success.json();
      }))
      .then((movies) => {
        this.moviesList = this._parseMoviesList(movies.Search);
      })
      .catch(error => console.log(error));
  }

  /**
   * Transforms movies list to use it in info-item-list
   * @param {Array} movies list of movies to parse
   */
  _parseMoviesList(movies) {
    return movies.map(el => {
      return {
        title: el.Title,
        year: el.Year,
        image: el.Poster
      }
    })
  }

  render() {
    return html `
      <menu-header></menu-header>
      <main>
        <input-finder placeHolder="Busca tu película" @search-clicked=${this._findMovie}></input-finder>
        <info-item-list id='movies-list' .itemsList=${this.moviesList}></info-item-list>
      </main>
      <footer-links .links=${this.footerLinks} .socialApps=${this.socialApps}></footer-links>
    `;
  }
}
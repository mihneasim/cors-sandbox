import { LitElement, html, css } from 'lit';

class CorsSandboxApp extends LitElement {
  static properties = {
    response: {
      type: Object,
    },
    url: {
      type: String,
    },
    method: {
      type: String,
    },
  };

  static styles = css`
    :host {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      color: #1a2b42;
      max-width: 960px;
      margin: 0 auto;
    }

    #url {
      width: 100%;
    }

    main {
      flex-grow: 1;
    }
  `;

  constructor() {
    super();
    this.method = 'GET';
    this.url = '';
  }

  attemptFetch() {
    // const value = this.shadowRoot.querySelector('#url')?.value;
    this.url &&
      fetch(this.url).then(
        x => {
          this.response = x;
        },
        err => {
          this.response = err;
        }
      );
  }

  updatedMethod(ev) {
    this.method = ev.target.value;
  }

  updatedUrl(ev) {
    this.url = ev.target.value;
  }

  render() {
    return html`
      <main>
        <h1>Test CORS request</h1>
        <select
          name="method"
          id="method"
          .value=${this.method}
          @change=${this.updatedMethod}
        >
          <option>GET</option>
          <option>POST</option>
        </select>
        <input
          type="text"
          name="url"
          id="url"
          placeholder="Input target URL"
          .value=${this.url}
          @input=${this.updatedUrl}
        />
        <button @click="${this.attemptFetch}">Attempt fetch</button>
        ${this.response ? `Results: ${this.response}` : ``}
      </main>
    `;
  }
}

customElements.define('cors-sandbox-app', CorsSandboxApp);

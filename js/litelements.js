import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';
// <!--Nav-->
// <my-nav id="avatar-component"></my-nav>
class MyFooter extends LitElement {

  static styles = css`
    footer {
      font-family: 'Poppins', sans-serif;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      background-color: #242424;
    }
    footer *  {
      color: #F2E41B;
    }
    .logo {
      width: 100px; /* Ajusta el ancho según tus necesidades */
      height: auto;
    }

    #socialMedia {
      text-align: right;
    }

    #socialMedia p {
      margin: 0;
    }
  `;

  // Método para determinar si estamos en la página index.html
  isIndexPage() {
    return window.location.pathname.includes('index.html');
  }

  render() {
    // Determina la ruta de la imagen basada en si estamos en index.html o no
    const imagePath = this.isIndexPage() ? 'src/logo.png' : '../src/logo.png';

    return html`
      <footer>
        <div>
          <img src="${imagePath}" class="logo" alt="Logo">
        </div>
        <div id="socialMedia">
          <p>info@gmail.com</p>
          <p>Compra Fácil, Devolución Imposible Vedruna's outlet</p>
        </div>
      </footer>
    `;
  }
}

customElements.define('my-footer', MyFooter);

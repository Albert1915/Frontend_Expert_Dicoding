import DrawerInitiator from '../utils/drawer-initiator';
import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';

class App {
  constructor({ header, main, footer }) {
    this._header = header;
    this._main = main;
    this._footer = footer;

    this._initialAppShell();
  }

  _initialAppShell() {
    DrawerInitiator.init({
      header: this._header,
      main: this._main,
      footer: this._footer,
    });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];

    try {
      if (!page) {
        throw new Error(`Page "${url}" not found.`);
      }

      this._main.innerHTML = await page.render();
      await page.afterRender();

      this._setupSkipLinkFocus();
    } catch (error) {
      console.error(error);
      // Handle error or show error page
    }
  }

  _setupSkipLinkFocus() {
    const skipLink = document.querySelector('.skip-link');
    const mainContent = document.querySelector('#maincontent');

    if (skipLink && mainContent) {
      skipLink.addEventListener('click', (event) => {
        event.preventDefault();
        mainContent.focus();
      });
    }
  }
}

export default App;

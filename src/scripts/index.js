import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';
import '../styles/detail.css';
import '../templates/footer-vincook';
import main from './main';
import App from './views/app';
import swRegister from './utils/sw-register';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

main();

const app = new App({
  header: document.querySelector('#header'),
  main: document.querySelector('#maincontent'),
  footer: document.querySelector('#footer'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});

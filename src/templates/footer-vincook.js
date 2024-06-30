class FooterVinCook extends HTMLElement {
  connectedCallback() {
    const currentYear = new Date().getFullYear(); // Mendapatkan tahun saat ini secara dinamis
    this.innerHTML = `
      <p>Copyright © ${currentYear} - VinCook</p>
    `;
  }
}

customElements.define('footer-vincook', FooterVinCook);

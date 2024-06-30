class FavoriteRestoSearchPresenter {
  constructor({ favoriteResto }) {
    this._favoriteResto = favoriteResto;
    this._queryElement = document.getElementById('query');
    this._queryElement.addEventListener('input', this._handleSearchInputChange.bind(this));
  }

  async _handleSearchInputChange(event) {
    const latestQuery = event.target.value.trim();
    this._latestQuery = latestQuery;

    try {
      const foundResto = await this._favoriteResto.searchResto(this._latestQuery);
      this._renderRestoList(foundResto);
      this._dispatchRestoSearchedEvent();
    } catch (error) {
      console.error('Error searching for restaurants:', error);
      // Handle error display or logging as necessary
    }
  }

  _renderRestoList(restos) {
    const restoContainer = document.getElementById('resto-list');
    restoContainer.innerHTML = '';

    if (restos.length === 0) {
      restoContainer.innerHTML = '<p>No restaurants found.</p>';
      return;
    }

    const restosHTML = restos.map(resto => `
      <li class="resto">
        <span class="resto__title">${resto.title || '-'}</span>
      </li>
    `).join('');

    restoContainer.innerHTML = `<ul>${restosHTML}</ul>`;
  }

  _dispatchRestoSearchedEvent() {
    const event = new Event('resto:searched:updated');
    document.dispatchEvent(event);
  }

  get latestQuery() {
    return this._latestQuery;
  }
}

export default FavoriteRestoSearchPresenter;

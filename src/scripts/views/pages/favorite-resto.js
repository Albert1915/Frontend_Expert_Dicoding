import FavoriteRestoIdb from '../../data/favorite-resto-idb';

const favResto = {
  async render() {
    return `
        <div class="resto-list"></div>`;
  },

  async afterRender() {
    const restaurantsDB = await FavoriteRestoIdb.getAllResto();
    const imageUrl = 'https://restaurant-api.dicoding.dev/images/medium/';
    const jumbotron = document.querySelector('.jumbotron');
    jumbotron.style.display = 'none';

    console.log('RESTO FAV:', restaurantsDB);

    const renderAllResto = (restaurants) => {
      console.log('Rendering Resto:', restaurants);

      const restoList = document.querySelector('.resto-list');
      restoList.innerHTML = ''; // Clear existing content

      restaurants.forEach((resto) => {
        const restoItem = document.createElement('div');
        restoItem.classList.add('resto-item');
        restoItem.setAttribute('tabindex', 0);

        restoItem.innerHTML = `
          <img crossorigin="anonymous" src="${imageUrl}/${resto.pictureId}" alt="Foto di restoran ${resto.name}">
          <div class="resto-info-1">
            <p class="name">${resto.name}</p>
            <p class="description">${resto.description}</p>
          </div>
          <div class="resto-info-2">
            <span class="city">${resto.city}</span>
            <span class="rating">Rating: ${resto.rating}</span>
          </div>
          <div class="resto-info-3">
            <button class="detail" onclick="window.location.href='/#/detail/${resto.id}'">Detail</button>
          </div>
        `;
        restoList.appendChild(restoItem);
      });
    };

    renderAllResto(restaurantsDB);
  },
};

export default favResto;

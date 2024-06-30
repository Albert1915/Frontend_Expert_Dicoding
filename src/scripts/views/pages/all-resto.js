const allResto = {
  async render() {
    return `
        <div class="resto-list"></div>
      `;
  },

  async afterRender() {
    const baseUrl = 'https://restaurant-api.dicoding.dev/';
    const imageUrl = 'https://restaurant-api.dicoding.dev/images/medium/';
    const jumbotron = document.querySelector('.jumbotron');
    jumbotron.style.removeProperty('display');

    const showResponseMessage = (
      message = 'Check your internet connection',
    ) => {
      alert(message);
    };

    console.log('SHOW RESPONSE MESSAGE:');

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
                        <button onclick="window.location.href='/#/detail/${resto.id}'" class="detail">Detail</button>
                        </div>

                    `;
        restoList.appendChild(restoItem);
      });
    };

    const getResto = () => {
      fetch(`${baseUrl}/list`, {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.error) {
            showResponseMessage(responseJson.message);
          } else {
            renderAllResto(responseJson.restaurants);
          }
        })
        .catch((error) => {
          showResponseMessage(error);
        });
    };

    getResto();
  },
};

export default allResto;

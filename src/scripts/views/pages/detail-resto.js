import LikeButtonInitiator from '../../utils/like-button-initiator';

const detailResto = {
  async render() {
    return `
        <div class="resto-detail"></div>
        <div id="likeButtonContainer"></div>
      `;
  },

  async afterRender() {
    const baseUrl = 'https://restaurant-api.dicoding.dev/';
    const jumbotron = document.querySelector('.jumbotron');
    jumbotron.style.display = 'none';

    const showResponseMessage = (
      message = 'Check your internet connection',
    ) => {
      alert(message);
    };

    function getRestoIdFromUrl() {
      const { hash } = window.location;
      const id = hash.split('/')[2]; // Assuming URL is like /#/detail/{id}
      console.log('ID dari fungsi:', id);
      return id;
    }

    // Function to display restaurant details on the page
    const displayRestaurantDetails = (restaurant) => {
      const detailItem = document.createElement('div');
      const detailContainer = document.querySelector('.resto-detail');
      detailItem.classList.add('detail-item');
      detailItem.setAttribute('tabindex', 0);

      LikeButtonInitiator.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        resto: {
          id: restaurant.id,
          name: restaurant.name,
          description: restaurant.description,
          city: restaurant.city,
          rating: restaurant.rating,
          pictureId: restaurant.pictureId,
          menus: restaurant.menus,
          categories: restaurant.categories,
          customerReviews: restaurant.customerReviews,
        },
      });

      detailItem.innerHTML = `
        <div class="jumbotron">
            <img crossorigin="anonymous" src="https://restaurant-api.dicoding.dev/images/medium/${restaurant.pictureId}" alt="${restaurant.name}">
        </div>
        <div class="header">
          <h2>${restaurant.name}</h2>
        </div>
        <div class="section">
            <p>${restaurant.description}</p>
        </div>
        <div class="section">
            <p><strong>City:</strong> ${restaurant.city}</p>
            <p><strong>Address:</strong> ${restaurant.address}</p>
        </div>
        <div class="section">
            <p><strong>Rating:</strong> ${restaurant.rating}</p>
        </div>
        <div class="section categories">
            <h3>Categories</h3>
            ${restaurant.categories.map((category) => `<span>${category.name}</span>`).join('')}
        </div>
        <div class="section menus">
            <h3>Menus</h3>
            <h4>Foods</h4>
            ${restaurant.menus.foods.map((food) => `<span>${food.name}</span>`).join('')}
            <h4>Drinks</h4>
            ${restaurant.menus.drinks.map((drink) => `<span>${drink.name}</span>`).join('')}
        </div>
        <div class="reviews-container">
            <h3>Customer Reviews</h3>
            <div class="reviews">
                ${restaurant.customerReviews.map((review) => `
                    <div>
                        <strong>${review.name}</strong> (${review.date}): <span>${review.review}</span>
                    </div>
                `).join('')}
            </div>
        </div>
        `;

      detailContainer.appendChild(detailItem);
    };

    const getRestoById = (id) => {
      console.log(`${baseUrl}detail/${id}`);
      fetch(`${baseUrl}detail/${id}`, {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.error) {
            showResponseMessage(responseJson.message);
          } else {
            displayRestaurantDetails(responseJson.restaurant);
          }
        })
        .catch((error) => {
          showResponseMessage(error);
        });
    };

    // Extract the resto.id from the URL and fetch the restaurant details
    const restoId = getRestoIdFromUrl();
    getRestoById(restoId);
  },
};

export default detailResto;

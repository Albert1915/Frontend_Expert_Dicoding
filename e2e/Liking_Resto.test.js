const assert = require('assert');

Feature('Liking Resto');

Before(({ I }) => {
  I.amOnPage('/#/favorites');
});

Scenario('showing empty favorite restaurant', ({ I }) => {
  I.see('', '.resto-list');
});

Scenario('favoriting one restaurant', async ({ I }) => {
  I.see('', '.resto-list');

  I.amOnPage('/');
  I.seeElement('.detail');
  const firstRestaurant = locate('.detail').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorites');
  I.seeElement('.detail');
  const favoritedRestaurantTitle = await I.grabTextFrom('.detail');

  assert.strictEqual(firstRestaurantTitle, favoritedRestaurantTitle);
});

Scenario('unfavoriting one restaurant', async ({ I }) => {
  I.see('', '.resto-list');

  I.amOnPage('/');
  I.seeElement('.detail');
  const firstRestaurant = locate('.detail').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorites');
  I.seeElement('.detail');
  const favoritedRestaurantTitle = await I.grabTextFrom('.detail');

  assert.strictEqual(firstRestaurantTitle, favoritedRestaurantTitle);
  I.click(firstRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorites');
  I.see('', '.resto-list');
});

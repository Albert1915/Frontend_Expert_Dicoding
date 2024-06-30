import allResto from '../views/pages/all-resto';
import detailResto from '../views/pages/detail-resto';
import favResto from '../views/pages/favorite-resto';

const routes = {
  '/': allResto, // default page
  '/all-resto': allResto,
  '/detail/:id': detailResto,
  '/favorites': favResto,
};

export default routes;

function main() {
  const menuButton = document.getElementById('menuButton');
  const drawer = document.getElementById('drawer');

  function toggleDrawer() {
    if (drawer.style.left === '0px') {
      drawer.style.left = '-250px';
    } else {
      drawer.style.left = '0px';
    }
  }

  function closeDrawer(event) {
    if (!drawer.contains(event.target) && !menuButton.contains(event.target)) {
      drawer.style.left = '-250px';
    }
  }

  function handleEscKey(event) {
    if (event.key === 'Escape') {
      drawer.style.left = '-250px';
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    menuButton.addEventListener('click', toggleDrawer);
    document.addEventListener('click', closeDrawer);
    document.addEventListener('keydown', handleEscKey);
  });
}

export default main;

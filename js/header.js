function throttle(fn, wait) {
    let time = Date.now();
    return function() {
      if ((time + wait - Date.now()) < 0) {
        fn();
        time = Date.now();
      }
    }
  }
  
  let lastScrollTop = 0;
  let menuOpenedAt = 0;
  const menuCloseThreshold = 120;
  
  window.addEventListener("scroll", throttle(function() {
    let currentScroll = window.scrollY || document.documentElement.scrollTop;
    let header = document.getElementById("header");
  
    if (currentScroll > lastScrollTop) {
      // Scrolling down
      if (currentScroll >= menuOpenedAt + menuCloseThreshold) {
        header.classList.add("header_hidden");
      }
    } else {
      // Scrolling up
      header.classList.remove("header_hidden");
      menuOpenedAt = currentScroll; // Record the scroll position when menu was opened
    }
    lastScrollTop = currentScroll;
  }, 50));
  

//# Disable menu button for 400s
function toggleIcon() {
    var buttonCover = document.getElementById('buttonCover');
    var duration = 400;
    buttonCover.style.display = 'block';
    setTimeout(function() {
      buttonCover.style.display = 'none';
      document.querySelector('.navbar-toggler').disabled = false;
    }, duration);
  }


// Función existente para alternar el checkbox al hacer clic en el botón del menú
function toggleCheckbox() {
  var checkbox = document.getElementById('togglenav');
  checkbox.checked = !checkbox.checked;
}

document.addEventListener('DOMContentLoaded', function() {
  // Función para verificar y ajustar el estado del botón
  function checkAndAdjustButtonState() {
    var checkbox = document.getElementById('togglenav');
    if (checkbox && checkbox.checked) {
      checkbox.checked = false;
    }
  }

  // Función para manejar la navegación y ajustar el estado del botón
  function handleNavigation() {
    window.addEventListener('load', checkAndAdjustButtonState);
  }

  // Detectar cambios en la URL
  window.addEventListener('popstate', handleNavigation);
  window.addEventListener('hashchange', handleNavigation);

  // Detectar el evento 'beforeunload' para navegación dentro de la misma página
  window.addEventListener('beforeunload', checkAndAdjustButtonState);

  // También verificar al cargar la página inicialmente
  checkAndAdjustButtonState();
});

document.addEventListener('DOMContentLoaded', function() {
  // Función para bloquear el botón del menú por 0.4 segundos
  function disableMenuButton() {
    var buttonCover = document.getElementById('buttonCover');
    var duration = 400;
    buttonCover.style.display = 'block';
    setTimeout(function() {
      buttonCover.style.display = 'none';
      document.querySelector('.navbar-toggler').disabled = false;
    }, duration);
  }

  // Función para manejar la navegación y bloquear el botón
  function handleNavigation() {
    disableMenuButton();
  }

  // Detectar cambios en la URL
  window.addEventListener('popstate', handleNavigation);
  window.addEventListener('hashchange', handleNavigation);

  // Detectar el evento 'beforeunload' para navegación dentro de la misma página
  window.addEventListener('beforeunload', disableMenuButton);

  // También bloquear el botón al cargar la página inicialmente
  disableMenuButton();
});
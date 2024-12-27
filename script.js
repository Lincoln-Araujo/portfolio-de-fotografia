const menuBtnMob = document.getElementById('menu-btn-mob');
const menuMobile = document.getElementById('nav-menu-mobile');
const menuTemas = document.querySelector('.menu-temas');
const dropdownButton = document.querySelector('.dropdown-button');
const dropdownList = document.querySelector('.dropdown-list');
const dropdownLabel = document.querySelector('.dropdown-label');
const fotoEmDestaque = document.querySelector('.foto-em-destaque');
const carouselWrapper = document.querySelector('.carousel-wrapper');
const carousel = document.querySelector('.carousel');
const carouselItems = document.querySelectorAll('.carousel-item');
const prevBtn = document.querySelector('.carousel-prev');
const nextBtn = document.querySelector('.carousel-next');
const imageGrid = document.querySelector(".image-grid");
const coverContainer = document.querySelector(".cover-container");

const rows = 3;
const cols = 4;

//imagens da grade de animação na página inicial
const images = ["fotoA.webp", "fotoB.jpg", "fotoC.webp"];

let currentIndex = 0;
let nextIndex = 1;
let flipped = false;
let forwardDirection = true;
let tiles;

/*menu do site*/
function toggleMenu(element) {  
  element.classList.toggle('open');  
}

/*abre menu do site*/
menuBtnMob.addEventListener("click", ()=> {
  toggleMenu(menuBtnMob);
  toggleMenu(menuMobile);
});

/*animação página inicial*/
function createTiles() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const tile = document.createElement("div");
      tile.className = "tile";

      const front = document.createElement("div");
      front.className = "face front";
      front.style.backgroundImage = `url(${images[currentIndex]})`;
      front.style.backgroundPosition = `${c * 33.333}% ${r * 50}%`;

      const back = document.createElement("div");
      back.className = "face back";
      back.style.backgroundImage = `url(${images[nextIndex]})`;
      back.style.backgroundPosition = `${c * 33.333}% ${r * 50}%`;

      tile.appendChild(front);
      tile.appendChild(back);
      imageGrid.appendChild(tile);
    }
  }
  tiles = document.querySelectorAll(".tile");
}

function flipTiles(cascadeDelay, add, forward) {
  return new Promise((resolve) => {
    const tileArray = Array.from(tiles);

    // Gerar o array de tiles em ordem diagonal
    const diagonalOrder = [];
    for (let d = 0; d <= rows - 1 + (cols - 1); d++) {
      // Para cada diagonal d
      // variação de r: de baixo (rows-1) para cima (0)
      for (let r = rows - 1; r >= 0; r--) {
        const c = d - r;
        if (c >= 0 && c < cols) {
          // Tile válida
          // tileIndex = r * cols + c (caso tiles sejam lineares)
          const tileIndex = r * cols + c;
          diagonalOrder.push(tileArray[tileIndex]);
        }
      }
    }

    // Se forwardDirection for falso, inverte a ordem
    const iterationOrder = forward
      ? diagonalOrder
      : diagonalOrder.slice().reverse();

    iterationOrder.forEach((tile, index) => {
      setTimeout(() => {
        if (add) {
          tile.classList.add("flipped");
        } else {
          tile.classList.remove("flipped");
        }
        if (index === iterationOrder.length - 1) {
          setTimeout(resolve, 1000);
        }
      }, index * cascadeDelay);
    });
  });
}

function prepareNextImage() {
  tiles.forEach((tile) => {
    const front = tile.querySelector(".front");
    const back = tile.querySelector(".back");
    if (flipped) {
      front.style.backgroundImage = `url(${images[nextIndex]})`;
    } else {
      back.style.backgroundImage = `url(${images[nextIndex]})`;
    }
  });
}

async function showNextImage() {
  prepareNextImage();

  if (!flipped) {
    await flipTiles(300, true, forwardDirection);
    currentIndex = nextIndex;
    nextIndex = (nextIndex + 1) % images.length;
    flipped = true;
  } else {
    await flipTiles(300, false, forwardDirection);
    currentIndex = nextIndex;
    nextIndex = (nextIndex + 1) % images.length;
    flipped = false;
  }

  forwardDirection = !forwardDirection;

  setTimeout(showNextImage, 1000);
}

if(imageGrid) {
  createTiles();
  setTimeout(showNextImage, 1000);
}

// Lista de Temas/Seções da Galeria
// para versão mobile
if(menuTemas) {
  dropdownButton.addEventListener('click', () => {
    const isExpanded = dropdownButton.getAttribute('aria-expanded') === 'true';
    dropdownButton.setAttribute('aria-expanded', !isExpanded);
    dropdownList.classList.toggle('open');
  });
  
  const dropdownItems = dropdownList.querySelectorAll('li');
  dropdownItems.forEach(item => {
    item.addEventListener('click', () => {
      // Pega o valor do data-value ou o próprio texto do item
      const themeName = item.getAttribute('data-value');
      dropdownLabel.textContent = themeName;
  
      // Fecha a lista
      dropdownList.classList.remove('open');
      dropdownButton.setAttribute('aria-expanded', false);
    });
  });
}

// Galeria da página foto
if(fotoEmDestaque) {
  const itemWidth = 192 + 4;

  let currentPosition = 0;

  function getMaxOffset() {
    const visibleArea = carouselWrapper.clientWidth;
    const totalWidth = itemWidth * carouselItems.length;
    const maxOffset = -(totalWidth - visibleArea);
    return maxOffset > 0 ? 0 : maxOffset;
  }

  function updateCarouselPosition() {
    const maxOffset = getMaxOffset();

    currentPosition = Math.min(currentPosition, 0);

    currentPosition = Math.max(currentPosition, maxOffset);

    carousel.style.transform = `translateX(${currentPosition}px)`;
  }

  carouselItems.forEach((item) => {
    const img = item.querySelector('img');
    img.addEventListener('click', () => {
      const fullSrc = img.getAttribute('data-full');
      fotoEmDestaque.src = fullSrc;
    });
  });

  prevBtn.addEventListener('click', () => {
    currentPosition += itemWidth;
    updateCarouselPosition();
  });

  nextBtn.addEventListener('click', () => {
    currentPosition -= itemWidth;
    updateCarouselPosition();
  });

  let isDragging = false;
  let startX = 0;
  let initialPosition = 0;

  function startDrag(e) {
    e.preventDefault();
    isDragging = true;

    const clientX = e.type.includes('mouse')
      ? e.clientX
      : e.touches[0].clientX;

    startX = clientX;
    initialPosition = currentPosition;

    carousel.style.userSelect = 'none';
    carousel.style.cursor = 'grabbing';
  }

  function onDrag(e) {
    if (!isDragging) return;

    const clientX = e.type.includes('mouse')
      ? e.clientX
      : e.touches[0].clientX;

    const diffX = clientX - startX;

    currentPosition = initialPosition + diffX;

    updateCarouselPosition();

    e.preventDefault();
  }

  function endDrag() {
    isDragging = false;
    carousel.style.userSelect = '';
    carousel.style.cursor = 'grab';
  }

  carousel.addEventListener('mousedown', startDrag);
  carousel.addEventListener('mousemove', onDrag);
  carousel.addEventListener('mouseup', endDrag);
  carousel.addEventListener('mouseleave', endDrag);

  // Touch
  carousel.addEventListener('touchstart', startDrag, { passive: false });
  carousel.addEventListener('touchmove', onDrag, { passive: false });
  carousel.addEventListener('touchend', endDrag);
  carousel.addEventListener('touchcancel', endDrag);

  carousel.style.cursor = 'grab';

  window.addEventListener('resize', () => {
    updateCarouselPosition();
  });

  updateCarouselPosition();
}
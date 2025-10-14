// References to modal elements
const modal = document.getElementById('modal');
const modalBackdrop = document.getElementById('modalBackdrop');
const closeModalBtn = document.getElementById('closeModal');
const modalTitle = document.getElementById('modalTitle');
const modalImage = document.getElementById('modalImage');
const modalYear = document.getElementById('modalYear');
const modalGenre = document.getElementById('modalGenre');
const modalDirector = document.getElementById('modalDirector');
const modalRating = document.getElementById('modalRating');
const modalDuration = document.getElementById('modalDuration');
const modalDescription = document.getElementById('modalDescription');

const appContainer = document.getElementById('app');
let allMovies = [];

// Close modal when X button is clicked
closeModalBtn.addEventListener('click', closeModal);

// Close modal when clicking backdrop
modalBackdrop.addEventListener('click', closeModal);

// Function to close modal
function closeModal() {
  modal.classList.add('hidden');
}

// Function to open modal with movie data
function openModal(movie) {
  modalTitle.innerText = movie.title;
  modalImage.src = movie.image;
  modalImage.alt = movie.title;
  modalYear.innerText = movie.year;
  modalGenre.innerText = movie.genre;
  modalDirector.innerText = movie.director;
  modalRating.innerText = movie.rating;
  modalDuration.innerText = movie.duration;
  modalDescription.innerText = movie.description;
  
  modal.classList.remove('hidden');
}

// Function to create movie card
function createMovieCard(movie) {
  const card = document.createElement('div');
  card.className = 'bg-gradient-to-b from-gray-900 to-purple-950 rounded-lg overflow-hidden shadow-lg hover:shadow-orange-500/50 transition-all duration-300 transform hover:-translate-y-2 border border-orange-500/30';
  card.dataset.genre = movie.genre;
  
  card.innerHTML = `
    <div class="aspect-[2/3] overflow-hidden">
      <img src="${movie.image}" alt="${movie.title}" class="w-full h-full object-cover object-center">
    </div>
    <div class="p-4">
      <h3 class="text-xl font-bold text-orange-500 mb-3 line-clamp-2">${movie.title}</h3>
      <button class="more-info-btn w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded transition duration-300">
        More Info
      </button>
    </div>
  `;
  
  // Add event listener to More Info button
  const moreInfoBtn = card.querySelector('.more-info-btn');
  moreInfoBtn.addEventListener('click', () => openModal(movie));
  
  return card;
}

// Function to display movies
function displayMovies(movies) {
  appContainer.innerHTML = '';
  movies.forEach(movie => {
    const card = createMovieCard(movie);
    appContainer.appendChild(card);
  });
}

// Function to filter movies by genre
function filterMovies(genre) {
  if (genre === 'all') {
    displayMovies(allMovies);
  } else {
    const filtered = allMovies.filter(movie => movie.genre === genre);
    displayMovies(filtered);
  }
}

// Load movie data from JSON
async function loadMovies() {
  try {
    const response = await fetch('/src/data/movies.json');
    const data = await response.json();
    console.log('Movies loaded:', data);
    allMovies = data;
    displayMovies(allMovies);
  } catch (error) {
    console.error('Error loading movies:', error);
    appContainer.innerHTML = '<p class="text-red-500 text-center col-span-full">Error loading movies. Please try again.</p>';
  }
}

// Add event listeners to navigation links
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Remove active class from all links
      navLinks.forEach(l => l.classList.remove('active', 'border-orange-500', 'text-orange-500', 'bg-orange-500/10'));
      
      // Add active class to clicked link
      link.classList.add('active', 'border-orange-500', 'text-orange-500', 'bg-orange-500/10');
      
      // Filter movies
      const filter = link.dataset.filter;
      filterMovies(filter);
      
      // Close mobile menu after selection
      const navMenu = document.getElementById('navMenu');
      if (window.innerWidth < 640) {
        navMenu.classList.add('hidden');
      }
    });
  });
  
  // Load movies when page loads
  loadMovies();
});

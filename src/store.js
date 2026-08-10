import axios from "axios";
document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname;
  const header = document.querySelector('.header');

  
  if (!currentPath.includes('index.html') && currentPath !== '/' && header) {
    header.style.position = 'static';
  }
});

const BASE_URL = "https://api.themoviedb.org/3";
const END_POINT = "/trending/movie/week";
const API_KEY = "b49261381044063556fe31e38d894915";

const container = document.querySelector('.shop-items-list');

async function serviceShop() {
  const { data } = await axios(`${BASE_URL}${END_POINT}`,{
    method: 'GET',
    params: {
      api_key: API_KEY
    }
  });
  
  return data;
};

serviceShop()
  .then(data => {
    console.log(data);  
    container.innerHTML = createMarcup(data.results);
  })
  .catch(error => {
    alert(error.message);
  })

function createMarcup(arr) {
  return arr.map(({ poster_path, original_title, id, vote_count }) => `
    <li class="shop-items-card">
      <img src="https://image.tmdb.org/t/p/w300${poster_path}" alt="${original_title}"/>
      <div class="shop-items-info">
        <h3 class="shop-items-title" > ${original_title}</h3>
        <p class="shop-items-price">${vote_count} грн.</p>
      </div>
    </li>
  `).join("");
  }
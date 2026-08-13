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

// const BASE_URL = "https://deserts-store.b.goit.study/api";
// let END_POINT = "";

// const container = document.querySelector('.card-list');

// async function dessertAPI(END_POINT, page) {
//   const { data } = await axios(`${BASE_URL}/${END_POINT}`, {
//     method: 'GET',
//     params: {
//       limit: 8,
//       page: page
//     }
    
//   });
//   console.log(data);
//   return data;
  
// };
// dessertAPI('desserts', 2)
//   .then(data => {
//     container.insertAdjacentHTML('beforeend', dessertsMarcup(data.desserts))
//   })
//   .catch(error => {
//     alert(error.message);
//   })

// function dessertsMarcup(data) {
//   return data.map(({ _id, category: {name: categoryName }, description, image, name, price }) => `
//     <li class="card-item" data-id="${_id}">
//       <img class="card-img" src="${image}" alt="${name}" />
//       <p class="card-category"> ${categoryName}</p>
//       <h3 class="card-name"> ${name}</h3>
//       <p class="crad-descr"> ${description}</p>
//       <p class="card-price"><span class="price-value">${price}</span>грн</p>
//       <button class="card-btn" type="button">кнопка</button>
//     </li>
//   `)
  
// }
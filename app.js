const auth = "563492ad6f9170000100000145a75551fd4b4ade91fe329c4fdb29e4";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
let searchValue;

//-------Event Listeners
searchInput.addEventListener("input", updateInput);
form.addEventListener("submit", (event) => {
  event.preventDefault();
  searchPhotos(searchValue);
});

//-------------Functions

function updateInput(event) {
  searchValue = event.target.value;
}

async function fetchApi(url) {
  const dataFetch = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: auth,
    },
  });

  const data = await dataFetch.json();
  return data;
}

function generatePictures(data) {
  data.photos.forEach((photo) => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `
    <div class="gallery-info">      
    <p>${photo.photographer}</p>
          <a href=${photo.src.original}>Download</a>
          </div>
          <img src=${photo.src.large}></img>`;
    gallery.appendChild(galleryImg);
  });
}

async function curatedPhotos() {
  const data = await fetchApi(
    "https://api.pexels.com/v1/curated?per_page=15&page=1"
  );
  generatePictures(data);
}

async function searchPhotos(query) {
  clear();
  const data = await fetchApi(
    `https://api.pexels.com/v1/search?query=${query}&per_page=15&page=1`
  );

  generatePictures(data);
}

function clear() {
  gallery.innerHTML = "";
  searchInput.value = "";
}

curatedPhotos();

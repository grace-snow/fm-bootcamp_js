// const BREEDS_URL = 'https://dog.ceo/api/breeds/image/random';
// const addBtn = document.querySelector('.js-addDoggo');

// function addDoggo() {
//   // show loading spinner

//   fetch(BREEDS_URL)
//     .then(function(response) {
//       return response.json();
//     })
//     .then(function(data) {
//       const img = document.createElement('img');
//       const imgContainer = document.querySelector('.doggos');
//       img.src = data.message;
//       img.alt = 'A cute dog';
//       img.width = 600;
//       img.className = 'doggos';

//       imgContainer.appendChild(img);

//       // hide loading spinner
//     });
// }

// addBtn.addEventListener('click', addDoggo);

const BREEDS_URL = 'https://dog.ceo/api/breeds/list/all';
const breedsSelect = document.querySelector('.js-breedsList');
const img = document.querySelector('.js-swapBreed');
const breedTitle = document.querySelector('#breedTitle');
const spinner = document.querySelector('#spinner');
const imageWrapper = document.querySelector('#imgWrapper');
const changeBtn = document.querySelector('#changeDog');

function fetchDoggo(url, breed) {
  // show loading spinner
  imageWrapper.classList.remove('show');
  spinner.classList.add('show');

  // fetch image
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      // debugger;
      if (breedTitle === undefined) {
        console.log('not found');
      }
      img.src = data.message;
      img.alt = `A cute ${breed}`;
      breedTitle.innerText = `${breed}`;
    });
}

function getAllBreeds() {
  fetch(BREEDS_URL)
    .then(response => response.json())
    .then(data => {
      const breedsObject = data.message;
      const breedsArray = Object.keys(breedsObject);

      for (let i = 0; i < breedsArray.length; i += 1) {
        const option = document.createElement('option');
        const breedName = breedsArray[i];

        option.value = breedName;
        option.innerText = breedName;

        breedsSelect.appendChild(option);
      }
    });
}

img.addEventListener('load', function() {
  // hide loading spinner
  imageWrapper.classList.add('show');
  spinner.classList.remove('show');
});

breedsSelect.addEventListener('change', function(e) {
  const chosenBreed = e.target.value;

  // make url
  // eslint-disable-next-line prefer-const
  let url = `https://dog.ceo/api/breed/${chosenBreed}/images/random`;

  // show loading spinner

  // fetch dog pic from API
  fetchDoggo(url, chosenBreed);
});

changeBtn.addEventListener('click', e => {
  const currentBreed = breedTitle.innerText.toLowerCase();
  console.log(currentBreed);
  const url = `https://dog.ceo/api/breed/${currentBreed}/images/random`;
  console.log(url);

  fetchDoggo(url, currentBreed);
});

getAllBreeds();
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// const promise = fetch(DOG_URL);

// promise
//   .then(function(response) {
//     const processingPromise = response.json();
//     return processingPromise;
//   })
//   .then(function(processedResponse) {
//     console.log(breeds);
//   });

// console.log('this will log first');

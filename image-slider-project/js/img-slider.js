// get buttons
const prevBtn = document.querySelector('.js-prev');
const nextBtn = document.querySelector('.js-next');
// get all images
const sliderImages = document.querySelectorAll('.js-slider-img'); // gets sudo-array (nodeList) of images
// get current image
let currentImage = 0; // first image displayed by default

// add event listeners to btns
prevBtn.addEventListener('click', function() {
  // 1. hide current image
  sliderImages[currentImage].classList.remove('active');
  // 2. update currentimage count
  currentImage -= 1;
  // 3. show next image
  sliderImages[currentImage].classList.add('active');
  // 4. enable previous button
  nextBtn.disabled = false;

  // 5. check if current image is first in list
  if (currentImage === 0) {
    prevBtn.disabled = true;
  }
});

nextBtn.addEventListener('click', function() {
  // 1. hide current image
  sliderImages[currentImage].classList.remove('active');
  // 2. update currentimage count
  currentImage += 1;
  // 3. show next image
  sliderImages[currentImage].classList.add('active');
  // 4. enable previous button
  prevBtn.disabled = false;

  // 5. check if current image is last one in list
  if (sliderImages.length === currentImage + 1) {
    nextBtn.disabled = true;
  }
});

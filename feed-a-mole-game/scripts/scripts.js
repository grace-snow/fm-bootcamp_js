const MIN_INTERVAL = 2000;
const MAX_INTERVAL = 15000;
const SAD_INTERVAL = 500;
const HUNGRY_INTERVAL = 2000;
const wormContainer = document.querySelector('#wormProgress');
let score = 0;

// Timings
const getInterval = () =>
  Date.now() + MIN_INTERVAL + Math.floor(Math.random() * MAX_INTERVAL);
const getSadInterval = () => Date.now() + SAD_INTERVAL;
const getKingStatus = () => Math.random() > 0.9;
const getHungryInterval = () => Date.now() + HUNGRY_INTERVAL;

// Array of moles
const moles = [
  {
    status: 'sad',
    next: getSadInterval(),
    king: true,
    node: document.getElementById('hole-0'),
  },
  {
    status: 'sad',
    next: getSadInterval(),
    king: true,
    node: document.getElementById('hole-1'),
  },
  {
    status: 'sad',
    next: getSadInterval(),
    king: true,
    node: document.getElementById('hole-2'),
  },
  {
    status: 'sad',
    next: getSadInterval(),
    king: true,
    node: document.getElementById('hole-3'),
  },
  {
    status: 'sad',
    next: getSadInterval(),
    king: true,
    node: document.getElementById('hole-4'),
  },
  {
    status: 'sad',
    next: getSadInterval(),
    king: true,
    node: document.getElementById('hole-5'),
  },
  {
    status: 'sad',
    next: getSadInterval(),
    king: true,
    node: document.getElementById('hole-6'),
  },
  {
    status: 'sad',
    next: getSadInterval(),
    king: true,
    node: document.getElementById('hole-7'),
  },
  {
    status: 'sad',
    next: getSadInterval(),
    king: true,
    node: document.getElementById('hole-8'),
  },
  {
    status: 'sad',
    next: getSadInterval(),
    king: true,
    node: document.getElementById('hole-9'),
  },
];

/*
 * --------------------------------------------
 * Happy ending image and play again button
 * --------------------------------------------
 */
const win = () => {
  document.querySelector('.bg').classList.toggle('hide', true);
  document.querySelector('.win').classList.toggle('show', true);
  document.querySelector('.win-btn').classList.toggle('show', true);
  document.querySelector('body').classList.toggle('game-won', true);
};

/*
 * --------------------------------------------
 * Choose moles to show based on status
 * --------------------------------------------
 */
const getNextStatus = mole => {
  switch (mole.status) {
    case 'sad':
    case 'fed':
      mole.next = getSadInterval();
      if (mole.king) {
        mole.node.children[0].src = './images/king-mole-leaving.png';
      } else {
        mole.node.children[0].src = './images/mole-leaving.png';
      }
      mole.status = 'leaving';
      break;
    case 'leaving':
      mole.next = getInterval();
      mole.king = false;
      mole.node.children[0].classList.toggle('gone', true);
      mole.status = 'gone';
      break;
    case 'hungry':
      mole.node.children[0].classList.toggle('hungry', false);
      if (mole.king) {
        mole.node.children[0].src = './images/king-mole-sad.png';
      } else {
        mole.node.children[0].src = './images/mole-sad.png';
      }
      mole.status = 'sad';
      mole.next = getSadInterval();
      break;
    case 'gone':
      mole.status = 'hungry';
      mole.king = getKingStatus();
      mole.next = getHungryInterval();
      mole.node.children[0].classList.toggle('hungry', true);
      mole.node.children[0].classList.toggle('gone', false);
      if (mole.king) {
        mole.node.children[0].src = './images/king-mole-hungry.png';
      } else {
        mole.node.children[0].src = './images/mole-hungry.png';
      }
      break;
    default:
      // console.log('Error: No mole found.');
      break;
  }
};

/*
 * --------------------------------------------
 * keep changing what's shown
 * --------------------------------------------
 */
const nextFrame = () => {
  const now = Date.now();
  for (let i = 0; i < moles.length; i += 1) {
    // check (Date.now() + SAD_INTERVAL) < now
    if (moles[i].next < now) {
      getNextStatus(moles[i]);
    }
  }
  requestAnimationFrame(nextFrame);
};

requestAnimationFrame(nextFrame);

/*
 * --------------------------------------------
 * Feed the moles
 * --------------------------------------------
 */
const feed = e => {
  // if not hungry || not showing, do nothing
  if (e.target.tagName !== 'IMG' || !e.target.classList.contains('hungry')) {
    return;
  }

  // get clicked mole number in list
  const mole = moles[+e.target.dataset.index];

  mole.status = 'fed';
  mole.next = getSadInterval();
  mole.node.children[0].classList.toggle('hungry', false);
  // king gets extra points!
  if (mole.king) {
    mole.node.children[0].src = './images/king-mole-fed.png';
    score += 20;
  } else {
    mole.node.children[0].src = './images/mole-fed.png';
    score += 10;
  }

  // win if score high enough
  if (score >= 100) {
    win();
    return;
  }

  // increase worm-style score progress bar
  wormContainer.style.width = `${score}%`;
};

// listen for clicks anywhere to feed
document.querySelector('.bg').addEventListener('click', feed);

/*
 * --------------------------------------------
 * Play again
 * --------------------------------------------
 */
function startAgain() {
  window.location.reload();
}
document.querySelector('.win-btn').addEventListener('click', startAgain);

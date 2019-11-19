/* eslint-disable no-console */
import getRandomImage from './nasa-api';
import { save, load } from './storage';

// todo vísa í rétta hluti með import

// breytur til þess að halda utan um html element nodes
let title; // titill fyrir mynd á forsíðu
let text; // texti fyrir mynd á forsíðu
let img; // mynd á forsíðu

let image; // object sem inniheldur núverandi mynd á forsíðu.

/*
 * Sækir nýja Mynd af handahófi frá Nasa API og birtir hana á forsíðunni
 * ásamt titli og texta.
 */
async function getNewImage() {
  image = await getRandomImage();
  if (image.media_type === 'image') {
    img.src = image.url;
  } else {
    const iframe = document.createElement('iframe');
    iframe.src = image.url;
    img.replaceWith(document.createElement('iframe'));
  }
  title.innerHTML = image.title;
  text.innerHTML = image.explanation;
}

/*
 * Vistar núverandi mynd í storage.
 */
function saveCurrentImage() {
  console.log('saveCurr');
  save(image.media_type, image.url, image.text, image.title);
}

/*
 * Upphafsstillir forsíðuna. Setur event listeners á takkana, og sækir eina mynd.
 *
 */
export default function init(apod) {
  img = document.querySelector('.apod__image');
  text = document.querySelector('.apod__text');
  title = document.querySelector('.apod__title');
  const newImgBtn = apod.children[3];
  const saveImgBtn = apod.children[4];
  getNewImage();
  newImgBtn.addEventListener('click', getNewImage);
  saveImgBtn.addEventListener('click', saveCurrentImage);
}

/*
 * Fall fyrir favourites.html. Sér um að sækja allar vistuðu myndirnar og birta þær ásamt
 * titlum þeirra.
 */
export function loadFavourites() {
  const favourites = load();
  const main = document.getElementsByTagName('main');
  main[0].classList.add('apod');
  console.log(favourites);
  if (favourites.length >= 2) {
    for (let k = 0; k < favourites.length; k += 4) {
      if (favourites[k] === 'image') {
        const mynd = document.createElement('img');
        mynd.classList.add('apod__image');
        const h2 = document.createElement('h2');
        h2.classList.add('apod__title');
        h2.innerHTML = favourites[k + 3];
        main[0].appendChild(h2);
        mynd.src = favourites[k + 1];
        main[0].appendChild(mynd);
      } else {
        const iframe = document.createElement('iframe');
        const h2 = document.createElement('h2');
        iframe.classList.add('apod__image');
        h2.classList.add('apod__title');
        iframe.classList.add('apod__image');
        h2.innerHTML = favourites[k + 3];
        main[0].appendChild(h2);
        iframe.src = favourites[k + 1];
        main[0].appendChild(img);
      }
    }
  }
}

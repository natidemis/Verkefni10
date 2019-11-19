/* eslint-disable no-console */
/**
 * Sækir og vistar í localStorage
 */

// Fast sem skilgreinir heiti á lykli sem vistað er undir í localStorage
const LOCALSTORAGE_KEY = 'favourite_spacephotos';

/**
 * Sækir gögn úr localStorage. Skilað sem lista á forminu:
 * [{ type, mediaUrl, text, title },
 *  { type, mediaUrl, text, title },
 *  ...,
 *  { type, mediaUrl, text, title }]
 *
 * @returns {array} fylki af myndum eða tóma fylkið ef ekkert vistað.
 */
export function load() {
  const ls = localStorage.getItem(LOCALSTORAGE_KEY);
  return JSON.parse(ls);
}

/**
 * Vistaðar myndir með texta.
 *
 * @param {string} type annað hvort image eða video
 * @param {string} mediaUrl URL á myndinni/myndbandinu.
 * @param {string} text texti fyrir myndina/myndbandið.
 * @param {string} title titill fyrir myndina/myndbandið.
 */
export function save(type, mediaUrl, text, title) {
  let fav = load();
  console.log('storage');
  if (fav === 0 || fav === undefined || fav === null) {
    fav = [];
    fav.push(type, mediaUrl, text, title);
  } else {
    fav.push(type, mediaUrl, text, title);
  }
  const favAsString = JSON.stringify(fav);
  console.log(JSON.stringify(fav));
  localStorage.setItem(LOCALSTORAGE_KEY, favAsString);
}


/**
 * Hreinsar allar myndir úr localStorage
 */
export function clear() {
  localStorage.removeItem(LOCALSTORAGE_KEY);
}

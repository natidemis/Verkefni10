import { randomNumber } from './helpers';

/* eslint-disable no-console */
/* eslint-disable indent */


/**
 * Sækir Myndir frá nasa API. Til þess að sjá dæmi um json svari sjá apod.json
 */

// API lykill til að fá aðgang að nasa gögnum.
const API_KEY = 'F81hXK363EAd8zmEIBuEiTqvwbVqSgyfsAD1Zacu';
// Slóð að sækja myndir frá. Dæmi um heila slóð https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2019-11-10
const URL = 'https://api.nasa.gov/planetary/apod?';


/**
 * Sækir mynd af handahófi frá APOD API hjá nasa
 *
 * @returns {Promise} sem mun innihalda upplýsingar um mynd/myndband hjá nasa.
 */
export default async function getRandomImage() {
    const today = new Date();
    const upphaf = new Date(1995, 5, 16);
    function randomDate(start, end) {
        const date = new Date(+start + Math.random() * (end - start));
        return date;
      }
      const dagSetning = randomDate(upphaf, today);
      let day = dagSetning.getDate();
      if (day === 0) day += 1;
      let month = dagSetning.getMonth();
      if (month === 0) month += 1;
      if (month === 2 && day === 30) day -= 1;
      if (month === 6 && day < 25) day = randomNumber(25, 30);
      const year = dagSetning.getFullYear();
      return fetch(`${URL}api_key=${API_KEY}&date=${year}-${month}-${day}`)
      .then(async (res) => {
          if (res.status === 200) {
              const data = await res.json();
              return data;
          }
            throw new Error('Eitthvað fór úrskeiðis');
      });
}

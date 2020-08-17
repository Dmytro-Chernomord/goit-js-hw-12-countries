import markupMaker from './markupMaker.js';

function searchCountry(searchQuery) {
  if (searchQuery) {
    return fetch(
      `https://restcountries.eu/rest/v2/name/${searchQuery}`,
    ).then(response => response.json());
  }
}

export default searchCountry;

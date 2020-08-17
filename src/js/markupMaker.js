import refs from './refs.js';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/confirm/dist/PNotifyConfirm.css';
import countries from '../templates/countries.hbs';
import oneConutry from '../templates/oneConutry.hbs';
import searchCountry from './fetchCountries.js';

require('lodash');

refs.input.addEventListener('input', _.debounce(markupMaker, 500));

function markupMaker() {
  let searchQuery = refs.input.value;
  if (searchQuery) {
    return searchCountry(searchQuery).then(data => {
      if (data.length === 1) {
        // const markup = oneConutry(data);
        refs.ul.innerHTML = oneConutry(data);
      } else if (data.length <= 10) {
        // const markup = countries(data);
        refs.ul.innerHTML = countries(data);
      } else if (data.length > 10) {
        error({
          title: 'Too much coutries finded',
          width: '500px',
          delay: 1000,
        });
        refs.ul.innerHTML = '';
      } else {
        error({
          title: 'Country not found',
          width: '500px',
          delay: 1000,
        });
        refs.ul.innerHTML = '';
      }
    });
  } else {
    console.log(searchQuery);
    refs.ul.innerHTML = '';
  }
}

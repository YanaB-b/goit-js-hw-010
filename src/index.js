import './css/styles.css';
import { fetchCountries } from './fetchCountries';

import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;


const input = document.getElementById('search-box');
const list = document.querySelector('.country-list');
const info = document.querySelector('.country-info');


input.addEventListener('input', debounce(onSubmit, DEBOUNCE_DELAY));

function onSubmit(e) {
//   e.preventDafault();
    const input = e.target.value.trim(); 
    if (!input.length) {
        console.log ('No country');
        toClearPage();
        return;
    }
fetchCountries(value).then(createMarkup).catch(onError);

}
function createMarkup(article) {
    let creare = '';
    if (article.length >= 10 ) {
        toClearPage();
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
        return;
    } else if (article.length === 1) {
        creare = article.map(({name:{official},flags:{svg},capital, population, languages}) =>{
            const value = Object.values(languages);
            return `
            <p class="svg"><img width="40px" height="20px" src=${svg}>${official}</p>
<p class = "info">capital: <span class ="text">${capital}</span></p>
<p class = "info">population: <span class ="text">${population}</span></p>
<p class = "info">languages: <span class ="text">${value}</span></p>
`;

        }
        )
        .join('');
        toClearPage();
        info.insertAdjacentHTML('beforeend', creare);

    }else {
        creare = article.map(({name: {official}, flags: { svg }})=> 
       { return `
       <li><img width="40px" height="20px" src=${svg}>${official}</li>
       `;
     } ).join('');
     toClearPage();
     list.insertAdjacentHTML('beforeend', creare);
    }
}



function onError () {
    toClearPage();
    Notiflix.Notify.failure("Oops, there is no country with that name");

}


function toClearPage(){
    info.innerHTML =" ";
    list.innerHTML = " ";
}




export default fetchCountries;
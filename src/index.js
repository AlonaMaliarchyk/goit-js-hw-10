import './css/styles.css';
//import assert from 'assert';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const ulList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");
const input = document.querySelector('#search-box');
let DEBOUNCE_DELAY = 300;
let inputValue;

input.addEventListener('input', debounce(handleInput, DEBOUNCE_DELAY));

    function handleInput(event){
        inputValue = event.target.value.trim();
        console.log(inputValue);
    if(inputValue.length > 1) {
        fetch(`https://restcountries.com/v3.1/name/${inputValue}?fields=name,capital,population,flags,languages`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
        return response.json();
        })
        .then(data => {
            fillContainers(data);
            console.log(data);
        })
        .catch(error => {
            Notiflix.Notify.failure('There is no country with that name');
            clearContainers();
        });
    } else if (inputValue.length <= 1) {
        Notiflix.Notify.info('Not enough characters. Enter enough information');
    }
    }


function fillContainers(countries) { 
    clearContainers();
    if (countries.length > 1) {
        fillCountriesList(countries);
    } else if (countries.length === 1){
        fillCountryInfo(countries[0]);
    }
}

function fillCountriesList(countries) { 
    let html ="";
    for (let country of countries) {
        html = html +
        `<li class="cuntries_item">
        <img class="flag_svg" src="${country.flags.svg}" alt="flag" width="20">
        <span>${country.name.official}</span>
        </li>`;
    };
    ulList.insertAdjacentHTML("afterbegin", html);
}

function fillCountryInfo(country) { 
    html = `<ul class="coutry">
        <li><img class="flag_svg" src="${country.flags.svg}" alt="flag" width="40"> <span>${country.name.official}</span></li>
        <li><b>Capital:</b>${country.capital}</li>
        <li><b>Population:</b>${country.population}</li>
        <li><b>Languages:</b>${country.languages}</li>
        </ul>`;
    countryInfo.insertAdjacentHTML("afterbegin", html);
}

function clearContainers() { 
    ulList.innerHTML = '';
    countryInfo.innerHTML = '';
}

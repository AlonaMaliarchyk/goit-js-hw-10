import './css/styles.css';
import { fetchCountries } from './fetchCountries';
//import assert from 'assert';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const ulList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");
const input = document.querySelector('#search-box');
let DEBOUNCE_DELAY = 300;
let inputValue;

input.addEventListener('input', debounce(handleInput, DEBOUNCE_DELAY));

function handleInput(event) {
    inputValue = event.target.value.trim();
    if (inputValue.length > 0) {
        fetchCountries(inputValue)
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.status);
                }
                return response.json();
            })
            .then(data => {
                fillContainers(data);
            })
            .catch(error => {
                clearContainers();
                Notiflix.Notify.failure("Oops, there is no country with that name");
            });
    } else {
        clearContainers();
    }
}

function fillContainers(countries) {
    clearContainers();
    if (countries.length > 1 && countries.length <= 10) {
        fillCountriesList(countries);
    } else if (countries.length === 1) {
        fillCountryInfo(countries[0]);
    } else if (countries.length >= 10) { 
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
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
    let html = `<ul class="coutry">
        <li><img class="flag_svg" src="${country.flags.svg}" alt="flag" width="40"> <span>${country.name.official}</span></li>
        <li><b>Capital: </b>${country.capital}</li>
        <li><b>Population: </b>${country.population}</li>
        <li><b>Languages: </b>${Object.values(country.languages).join(', ')}</li>
        </ul>`;
    countryInfo.insertAdjacentHTML("afterbegin", html);
}

function clearContainers() { 
    ulList.innerHTML = '';
    countryInfo.innerHTML = '';    
}

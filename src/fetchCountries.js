export function fetchCountries(countryName) {
    return fetch(`https://restcountries.com/v3.1/name/${countryName}?fields=name,capital,population,flags,languages`);
}
export function fetchCountries(country) {
    return fetch(`https://restcountries.com/v3.1/name/${inputValue}?fields=name,capital,population,flags,languages`);
    
}
console.log(fetchCountries);
fetchCountries(country);
// fetch(`https://restcountries.com/v3.1/name/${inputValue}?fields=name,capital,population,flags,languages`)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(response.status);
//             }
//         return response.json();
//         })
//         .then(data => {
//             fillContainers(data);
//             console.log(data);
//         })
//         .catch(error => {
//             Notiflix.Notify.failure('There is no country with that name');
//             clearContainers();
//         });
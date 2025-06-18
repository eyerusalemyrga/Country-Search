const apiUrl = 'https://restcountries.com/v3.1/all?fields=name,flags,languages,population,capital,region';
const countriesContainer = document.getElementById('countriesContainer');
const searchInput = document.getElementById('searchInput');
const continentSelect = document.getElementById('continentSelect');
let allCountries = [];

async function fetchCountries() {
    try {
        const response = await fetch(apiUrl);
        allCountries = await response.json();
        displayCountries(allCountries);
    } catch (error) {
        countriesContainer.textContent = 'Failed to load countries.';
        console.error(error);
    }
}

function displayCountries(countries) {
    countriesContainer.innerHTML = '';
    countries.forEach(country => {
        const card = document.createElement('div');
        card.classList.add('country-card');

        const flag = document.createElement('img');
        flag.src = country.flags.svg;
        flag.alt = `${country.name.common} flag`;

        const name = document.createElement('h3');
        name.textContent = country.name.common;

        const population = document.createElement('p');
        population.textContent = `Population: ${country.population}`;
        const languages = document.createElement('p');
        const languagesArray = Object.values(country.languages);
        languages.textContent = `Languages: ${languagesArray.join(', ')}`;

        card.appendChild(flag);
        card.appendChild(name);
        card.appendChild(population);
        card.appendChild(languages);

        countriesContainer.appendChild(card);
    });
}

function filterCountries() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedContinent = continentSelect.value;

    const filteredCountries = allCountries.filter(country => {
        const nameMatch = country.name.common.toLowerCase().includes(searchTerm);
        const continentMatch = selectedContinent === '' || country.region === selectedContinent;
        return nameMatch && continentMatch;
    });

    displayCountries(filteredCountries);
}

searchInput.addEventListener('input', filterCountries);
continentSelect.addEventListener('change', filterCountries);

fetchCountries();

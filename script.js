const apiUrl = 'https://restcountries.com/v3.1/all?fields=name,flags,languages,population,capital,region';
const countryListContainer = document.getElementById('countryList');
const searchInput = document.getElementById('searchInput');
const continentSelect = document.getElementById('continentSelect');
let allCountries = [];

async function fetchCountries() {
    try {
        const response = await fetch(apiUrl);
        allCountries = await response.json();
        displayCountries(allCountries);
    } catch (error) {
        countryListContainer.innerHTML = '<p>Error fetching data</p>';
        console.error('Error fetching data:', error);
    }
}

function displayCountries(countries) {
    countryListContainer.innerHTML = '';
    countries.forEach(country => {
        const card = document.createElement('div');
        card.classList.add('country-card');

        const flagImg = document.createElement('img');
        flagImg.src = country.flags.png; 
        flagImg.alt = `${country.name.common} flag`;
        card.appendChild(flagImg);

        const infoDiv = document.createElement('div');
        infoDiv.innerHTML = `
            <h3>${country.name.common}</h3>
            <p>Capital: ${country.capital ? country.capital[0] : 'N/A'}</p>
            <p>Population: ${country.population}</p>
            <p>Region: ${country.region}</p>
            <p>Languages: ${Object.values(country.languages || {}).join(', ')}</p>
        `;
        card.appendChild(infoDiv);
        countryListContainer.appendChild(card);
    });
}

function filterCountries() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedContinent = continentSelect.value;

    const filtered = allCountries.filter(country => {
        const nameMatch = country.name.common.toLowerCase().includes(searchTerm);
        const continentMatch = selectedContinent === '' || country.region === selectedContinent;
        return nameMatch && continentMatch;
    });

    displayCountries(filtered);
}

searchInput.addEventListener('input', filterCountries);
continentSelect.addEventListener('change', filterCountries);

fetchCountries();

import { checkAuth, logout, fetchCity, updateName, updateWaterfront, updateSkyline, updateCastle, updateSlogans, createCity } from '../fetch-utils.js';

checkAuth();

const sloganForm = document.querySelector('.slogan-form');
const nameForm = document.querySelector('.name-form');

const skylineDropdown = document.querySelector('.skyline-dropdown');
const waterfrontDropdown = document.querySelector('.waterfront-dropdown');
const castleDropdown = document.querySelector('.castle-dropdown');

const cityNameEl = document.querySelector('.city-name');
const skylineImageEl = document.querySelector('.skyline-image');
const waterfrontImageEl = document.querySelector('.waterfront-image');
const castleImageEl = document.querySelector('.castle-image');

// const sloganButton = document.querySelector('.slogan-button');
const sloganListEl = document.querySelector('.slogan-list');

// const countEl = document.querySelector('.count');
const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

waterfrontDropdown.addEventListener('change', async() => {
    const updatedCity = await updateWaterfront(waterfrontDropdown.value);

    displayCity(updatedCity);
});


skylineDropdown.addEventListener('change', async() => {
    // increment the correct count in state
    // skylineCount++;
    // update the skyline in supabase with the correct data
    const updatedCity = await updateSkyline(skylineDropdown.value);
    // refreshData();
    displayCity(updatedCity);
    // displayStats();

});


castleDropdown.addEventListener('change', async() => {
    // increment the correct count in state
    // castleCount++;
    // update the castle in supabase with the correct data
    const updatedCity = await updateCastle(castleDropdown.value);
    // refreshData();
    displayCity(updatedCity);
    // displayStats();
});

nameForm.addEventListener('submit', async(e) => {
    e.preventDefault();

    const data = new FormData(nameForm);

    const name = data.get('name');

    const updatedCity = await updateName(name);

    displayCity(updatedCity);
    // displayStats();
});

sloganForm.addEventListener('submit', async(e) => {
    e.preventDefault();
    
    const data = new FormData(sloganForm);
    // get the new slogan from the form
    const newSlogan = data.get('slogan');
    
    // get the old city/slogans from supabase
    const city = await fetchCity();
    
    console.log(typeof city.slogans);
    // push new slogan into array of existing slogans
    city.slogans.push(newSlogan);
    const updatedCity = await updateSlogans(city.slogans);

    sloganForm.reset();
    displayCity(updatedCity);
    // displayStats();

});

window.addEventListener('load', async() => {
    // on load, attempt to fetch this user's city
    const city = await fetchCity();

    // if user doesn't have one, make a new city with correct defaults
    if (!city) {
        const newCity = await createCity();

        displayCity(newCity);
    } else {
        displayCity(city);
    }
    // displayStats();
});

async function displayCity(city) {
    cityNameEl.textContent = city.name;
    waterfrontImageEl.src = `../assets/waterfront-${city.waterfront_id}.jpg`;
    skylineImageEl.src = `../assets/skyline-${city.skyline_id}.jpg`;
    castleImageEl.src = `../assets/castle-${city.castle_id}.jpg`;

    // loop through slogans
    sloganListEl.textContent = '';

    for (let slogan of city.slogans) {
        const sloganEl = document.createElement('p');

        sloganEl.classList.add('slogan');

        sloganEl.textContent = slogan;

        sloganListEl.append(sloganEl);
    }
}
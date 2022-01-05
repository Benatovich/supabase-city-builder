import { checkAuth, logout, fetchCity, updateName, updateWaterfront, updateSkyline, updateCastle, updateSlogans, createCity } from '../fetch-utils.js';

checkAuth();

const sloganForm = document.querySelector('.slogan-form');
const nameForm = document.querySelector('.name-form');

const skylineDropdown = document.querySelector('#skyline-dropdown');
const waterfrontDropdown = document.querySelector('#waterfront-dropdown');
const castleDropdown = document.querySelector('#castle-dropdown');

const cityNameEl = document.querySelector('.city-name');
const skylineImageEl = document.querySelector('#skyline-image');
const waterfrontImageEl = document.querySelector('#waterfront-image');
const castleImageEl = document.querySelector('#castle-image');

// const sloganButton = document.querySelector('#slogan-button');
const sloganListEl = document.querySelector('.slogan-list');

const countEl = document.querySelector('.count');
const logoutButton = document.getElementById('logout');

// if we want to track 'this session' changes:
let nameCount = 0;
let waterfrontCount = 0;
let skylineCount = 0;
let castleCount = 0;
// let slogans = [];

logoutButton.addEventListener('click', () => {
    logout();
});

waterfrontDropdown.addEventListener('change', async() => {
    // increment the correct count in state
    // waterfrontCount++;
    // update the waterfront in supabase with the correct data
    const updatedCity = await updateWaterfront(waterfrontDropdown.value);
    // refreshData();
    displayCity(updatedCity);
    displayStats();
});


skylineDropdown.addEventListener('change', async() => {
    // increment the correct count in state
    // skylineCount++;
    // update the skyline in supabase with the correct data
    const updatedCity = await updateSkyline(skylineDropdown.value);
    // refreshData();
    displayCity(updatedCity);
    displayStats();

});


castleDropdown.addEventListener('change', async() => {
    // increment the correct count in state
    // castleCount++;
    // update the castle in supabase with the correct data
    const updatedCity = await updateCastle(castleDropdown.value);
    // refreshData();
    displayCity(updatedCity);
    displayStats();
});

nameForm.addEventListener('submit', async(e) => {
    e.preventDefault();

    const data = new FormData(nameForm);

    const name = data.get('name');

    const updatedCity = await updateName(name);

    displayCity(updatedCity);
    displayStats();
});

sloganForm.addEventListener('submit', async(e) => {
    e.preventDefault();

    const data = new FormData(sloganForm);
// get the new slogan from the form
    const newSlogan = data.get('slogan');

    // get the old city/slogans from supabase
    const city = await fetchCity();

    // push new slogan into array of existing slogans
    city.slogans.push(newSlogan);

    const updatedCity = await updateSlogans(city.slogans);

    displayCity(updatedCity);
    displayStats();

});

// no more sloganButton
// sloganButton.addEventListener('click', async() => {
//     // go fetch the old slogans
//     // ^do i need anything for this here?
//     // update the slogan array locally by pushing the new slogan into the old array
//     slogans.push(sloganInput.value);

//     sloganInput.value = '';
//     // update the slogans in supabase by passing the mutated array to the updateCatchphrases function
//     await updateSlogans(slogans);

//     refreshData();
// });

window.addEventListener('load', async() => {
    // on load, attempt to fetch this user's city
    let city = await fetchCity();

    // if user doesn't have one, make a new city with correct defaults
    if (!city) {
        const newCity = await createCity();

        displayCity(newCity);
    } else {
        displayCity(city);
    }
    displayStats();
});

function displayStats() {
    countEl.textContent = `In this session, you have changed the name ${nameCount} times, the waterfront ${waterfrontCount} times, the skyline ${skylineCount} times, and the castle ${castleCount} times. And nobody can forget your city's classic slogans:`;
}

function displayCity(city) {
    cityNameEl.textContent = city.name;
    waterfrontImageEl.src = `../assets/${city.waterfront_id}-waterfront.jpg`;
    skylineImageEl.src = `../assets/${city.skyline_id}-skyline.jpg`;
    castleImageEl.src = `../assets/${city.castle_id}-castle.jpg`;

    // loop through slogans, render, append
    sloganListEl.textContent = '';

    for (let slogan of city.slogans) {
        const sloganEl = document.createElement('p');

        sloganEl.classList.add('slogan');

        sloganEl.textContent = slogan;

        sloganListEl.append(sloganEl);
    }
}
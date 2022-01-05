import { checkAuth, logout, fetchCity, updateWaterfront, updateSkyline, updateCastle, updateSlogans, createCity } from '../fetch-utils.js';

checkAuth();

const skylineDropdown = document.querySelector('#skyline-dropdown');
const waterfrontDropdown = document.querySelector('#waterfront-dropdown');
const castleDropdown = document.querySelector('#castle-dropdown');

const skylineImageEl = document.querySelector('#skyline-image');
const waterfrontImageEl = document.querySelector('#waterfront-image');
const castleImageEl = document.querySelector('#castle-image');

const sloganInput = document.querySelector('#slogan-input');
const sloganButton = document.querySelector('#slogan-button');
const sloganListEl = document.querySelector('.list');

const countEl = document.querySelector('.count');
const logoutButton = document.getElementById('logout');

// we're still keeping track of 'this session' clicks, so we keep these lets
let nameCount = 0;
let waterfrontCount = 0;
let skylineCount = 0;
let castleCount = 0;
let slogans = [];

waterfrontDropdown.addEventListener('change', async() => {
    // increment the correct count in state
    waterfrontCount++;
    // update the waterfront in supabase with the correct data
    await updateWaterfront(waterfrontDropdown.value);
    refreshData();
});


skylineDropdown.addEventListener('change', async() => {
    // increment the correct count in state
    skylineCount++;
    // update the skyline in supabase with the correct data
    await updateSkyline(skylineDropdown.value);
    refreshData();
});


castleDropdown.addEventListener('change', async() => {
    // increment the correct count in state
    castleCount++;
    // update the castle in supabase with the correct data
    await updateCastle(castleDropdown.value);
    refreshData();
});

sloganButton.addEventListener('click', async() => {
    // go fetch the old slogans
    // ^do i need anything for this here?
    // update the slogan array locally by pushing the new slogan into the old array
    slogans.push(sloganInput.value);

    sloganInput.value = '';
    // update the slogans in supabase by passing the mutated array to the updateCatchphrases function
    await updateSlogans(slogans);

    refreshData();
});

window.addEventListener('load', async() => {
    // on load, attempt to fetch this user's city
    let city = await fetchCity();

    // if this user turns out not to have a city
    // create a new city with correct defaults for all properties (name, waterfront, skyline, castle, slogans)
    if (!city) {
        city = await createCity({
            name: '',
            waterfront: '',
            skyline: '',
            castle: '',
            slogans: [],
        });
    }
    // and put the city's slogans in state (we'll need to hold onto them for an interesting reason);
    slogans = city.slogans;
    // then call the refreshData function to set the DOM with the updated data
    refreshData();
});

logoutButton.addEventListener('click', () => {
    logout();
});

function displayStats() {
    countEl.textContent = `In this session, you have changed the name ${nameCount} times, the waterfront ${waterfrontCount} times, the skyline ${skylineCount} times, and the castle ${castleCount} times. And nobody can forget your city's classic slogans:`;
}

async function displayCity(city) {
    // fetch the character from supabase
    const city = await fetchCity();
    // if the character has a head, display the head in the dom
    if (head) headEl.style.backgroundImage = `url("../assets/${head}-head.png")`;
    // if the character has a middle, display the middle in the dom
    if (middle) middleEl.style.backgroundImage = `url("../assets/${middle}-middle.png")`;
    // if the character has a pants, display the pants in the dom
    if (bottom) bottomEl.style.backgroundImage = `url("../assets/${bottom}-pants.png")`;
    // loop through catchphrases and display them to the dom (clearing out old dom if necessary)
    catchphrasesEl.textContent = '';
    for (let catchphrase of catchphrases) {
        const p = document.createElement('p');

        p.classList.add('catchphrase');
        p.textContent = catchphrase;

        catchphrasesEl.append(p);
    }
}

function refreshData() {
    displayStats();
    fetchAndDisplayCharacter();
}

// early attempt at displayCity(city) below:
// async function displayCity(city) {
//     // fetch the city from supabase
//     const { name, waterfront, skyline, castle } = await fetchCity();
//     nameEl.textContent = '';
//     nameEl.textContent = name;
//     // if the city has a waterfront, display the waterfront in the dom
//     if (waterfront) waterfrontImageEl.style.backgroundImage = `url("../assets/${waterfront}-waterfront.png")`;
//     // if the city has a skyline, display the skyline in the dom
//     if (skyline) skylineImageEl.style.backgroundImage = `url("../assets/${skyline}-skyline.png")`;
//     // if the city has a castle, display the castle in the dom
//     if (castle) castleImageEl.style.backgroundImage = `url("../assets/${castle}-castle.png")`;
//     // loop through slogans and display them to the dom (clearing out old dom if necessary)
//     sloganListEl.textContent = '';
//     for (let slogan of slogans) {
//         const p = document.createElement('p');

//         p.classList.add('slogan');
//         p.textContent = slogan;

//         slogansEl.append(p);
//     }
// }
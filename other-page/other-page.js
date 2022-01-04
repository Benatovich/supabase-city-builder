import { checkAuth, logout, fetchCity, updateWaterfront, updateSkyline, updateCastle, updateSlogans, createCity } from '../fetch-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});
// WIP begins here
async function displayCity(city) {
    // fetch the city from supabase
    const { waterfront, skyline, castle } = await fetchCity();
    // if the city has a waterfront, display the waterfront in the dom
    if (waterfront) waterfrontEl.style.backgroundImage = `url("../assets/${waterfront}-waterfront.png")`;
    // if the city has a skyline, display the skyline in the dom
    if (skyline) skylineEl.style.backgroundImage = `url("../assets/${skyline}-skyline.png")`;
    // if the city has a castle, display the castle in the dom
    if (castle) castleEl.style.backgroundImage = `url("../assets/${castle}-castle.png")`;
    // loop through slogans and display them to the dom (clearing out old dom if necessary)
    slogansEl.textContent = '';
    for (let slogan of slogans) {
        const p = document.createElement('p');

        p.classList.add('slogan');
        p.textContent = slogan;

        slogansEl.append(p);
    }
}
/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    for (let i = 0; i < games.length; i++){

        const gameCard = document.createElement("div")
        gameCard.classList.add("game-card")
        const game = games[i]
        

        gameCard.innerHTML = `
        <img src="${game.img}" class="game-img" alt="${game.name}" />
        <h3>${game.name}</h3>
        <p>${game.description}</p>
        <p><strong>Backers:</strong> ${game.backers}</p>
        <progress value="${game.pledged}" max="${game.goal}" class="progress-bar"></progress>
        <p>${Math.floor((game.pledged / game.goal) * 100)}% funded</p>
    `;

    gamesContainer.appendChild(gameCard);

    }

}
addGamesToPage(GAMES_JSON);

// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers

const totalContris = GAMES_JSON.reduce((acc, game) => {
    return acc + game.backers;
}, 0);
// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = totalContris.toLocaleString();

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const totalAmount = GAMES_JSON.reduce((acc, game) => {
    return acc + game.pledged;
}, 0);
// set inner HTML using template literal

raisedCard.innerHTML = `$${totalAmount.toLocaleString()}`;


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = GAMES_JSON.length.toLocaleString();


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let unfunded = GAMES_JSON.filter((game) => {
        return game.pledged < game.goal
    });

    console.log(unfunded.length);

    addGamesToPage(unfunded);

    // use the function we previously created to add the unfunded games to the DOM

}


// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let funded = GAMES_JSON.filter((game) => {
        return game.pledged >= game.goal;
    });

    console.log(funded.length)

    addGamesToPage(funded)

    // use the function we previously created to add unfunded games to the DOM

}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    
    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON)

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

const numUnfunded = GAMES_JSON.filter(game => game.pledged < game.goal).length;

const totalRaised = GAMES_JSON.reduce((acc, game) => acc + game.pledged, 0);

const displayStr = `A total of $${totalRaised.toLocaleString()} has been raised for ${GAMES_JSON.length} games. Currently, ${numUnfunded} ${numUnfunded === 1 ? "game remains" : "games remain"} unfunded. We need your help to fund these amazing games!`;

// Create and append a new paragraph element
const summaryElement = document.createElement("p");
summaryElement.textContent = displayStr;
descriptionContainer.appendChild(summaryElement);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [firstGame, secondGame, ...rest] = sortedGames;

console.log(firstGame.name)
console.log(secondGame.name);

// create a new element to hold the name of the top pledge game, then append it to the correct element
const firstGameElement = document.createElement("p");
firstGameElement.textContent = firstGame.name;
firstGameContainer.appendChild(firstGameElement)
// do the same for the runner up item
const secondGameElement = document.createElement("p");
secondGameElement.textContent = secondGame.name;
secondGameContainer.appendChild(secondGameElement)
let listOfPokemon = [];
let isLoading = false;


/**
 * This function initializes all Pokémon cards
 */
async function init() {
    await includeHTML();
    loadPokemon();
}


/**
 * This function loads all pokemon infos for the Pokémon cards
 */
async function loadPokemon() {
    showLoadingScreen();
    try {
        isLoading = true;
        await getPokemon();
        renderPokemon();
        console.log(listOfPokemon);
    } catch (error) {
        console.error('Fehler beim Laden der Pokemon:', error);
    } finally {
        isLoading = false;
        hideLoadingScreen();
    }
}


/**
 * This function renders the loading screen
 * @param {HTMLElement} overlay 
 * @param {HTMLElement} spinner 
 */
function showLoadingScreen() {
    const overlay = document.getElementById('loading-overlay');
    const spinner = document.getElementById('loading-spinner');
    overlay.style.display = 'block'; 
    spinner.style.display = 'block';
}


/**
 * This function renders the loading screen
 * @param {HTMLElement} overlay 
 * @param {HTMLElement} spinner 
 */
function hideLoadingScreen() {
    const overlay = document.getElementById('loading-overlay');
    const spinner = document.getElementById('loading-spinner');
    spinner.style.display = 'none';
    overlay.style.display = 'none'; 
}


/**
 * This function pushes all loaded Pokémon into the array listOfPokemon
 */
async function getPokemon() {
    for (let i = 1; i <= 36; i++) {
        let url = 'https://pokeapi.co/api/v2/pokemon/' +i;
        let response = await fetch(url);
        let pokemonData = await response.json(); 
        listOfPokemon.push(pokemonData);
    } 
}


/**
 * This function renders the loaded Pokémon infos
 */
function renderPokemon() {
    let pokedex = document.getElementById('pokedex');
    pokedex.innerHTML = '';
    createPokemonCard(pokedex);
}


/**
 * This function creates the Pokémon card
 * @param {HTMLElement} pokedex 
 */
function createPokemonCard(pokedex) {
    for (let i = 0; i < listOfPokemon.length; i++) {
        let pokemon = listOfPokemon[i];
        let pokemonName = pokemon.name;
        let pokemonId = pokemon.id.toString().padStart(3, '0'); // Pad with leading zeros
        let pokemonImg = pokemon['sprites']['other']['home']['front_default'];
        let pokemonType1 = pokemon['types'][0]['type']['name'];
        let typeColor1 = typeColorBackground[pokemonType1];
        let typeColorIcons1 = typeColorIconsBackground[pokemonType1];
        let pokemonType2 = getPokemonType2(pokemon);
        let typeColor2 = getTypeColor2(pokemonType1, pokemonType2);
        let typeColorIcons2 = getTypeColorIcons2(pokemonType2);
        pokedex.innerHTML += showPokemonCard(pokemonName, pokemonId, typeColor1, typeColor2, typeColorIcons1, typeColorIcons2, pokemonType1, pokemonType2, pokemonImg, i);
    }
}


/**
 * This function gets the second Pokémon type
 * @param {string} pokemon 
 * @returns second type
 */
function getPokemonType2(pokemon) {
    if (pokemon['types'].length > 1) {
        return pokemon['types'][1]['type']['name']; 
    }
}


/**
 * This function gets the colored backgrounds
 * @param {string} pokemonType2 
 * @param {string} pokemonType1 
 * @returns colored background
 */
function getTypeColor2(pokemonType1, pokemonType2) {
    if (pokemonType2) {
        return typeColorBackground[pokemonType2];
    } else {
        return soloTypeBackground1[pokemonType1];
    }
}


/**
 * This function gets the color for the second type
 * @param {string} pokemonType2 
 * @returns 
 */
function getTypeColorIcons2(pokemonType2) {
    if (pokemonType2) {
        return typeColorIconsBackground[pokemonType2];
    }
}


/**
 * This function renders more Pokémon
 */
async function loadMorePokemon() {
    showLoadingScreen();
    resetSearchInput();
    try {
        isLoading = true;
        let nextPokemon = listOfPokemon.length + 1;
        await getMorePokemon(nextPokemon);
        renderPokemon();
    } catch (error) {
        console.error('Fehler beim Laden weiterer Pokemon:', error);
    } finally {
        isLoading = false;
        hideLoadingScreen();
    }
}


/**
 * This function resets the value of the search input
 */
function resetSearchInput() {
    let search = document.getElementById('search');
    if (search.length !== 0) {
        search.value = '';
    }
}

/**
 * This function loads more Pokémon data
 * @param {*} nextPokemon 
 */
async function getMorePokemon(nextPokemon) {
    for (let i = nextPokemon; i <= nextPokemon + 31; i++) {
        let url = 'https://pokeapi.co/api/v2/pokemon/' + i;
        let response = await fetch(url);
        let pokemonData = await response.json();
        listOfPokemon.push(pokemonData);
    }
}


/**
 * This function opens the specific Pokémon-Data-Card
 * @param {number} i 
 */
function openPokemonDataCard(i) {
    document.getElementById('pokemondatacard-bg').classList.remove('d-none');
    renderPokemonDataCard(i);
    removeButtons();
}


/**
 * This function closes the specific Pokémon-Data-Card
 */
function closePokemonDatacard() {
    document.getElementById('pokemondatacard-bg').classList.add('d-none');
    showButtons();
}


/**
 * This function hides the "More Pokémon"-button and the scroll-button
 */
function removeButtons() {
    document.getElementById('button').classList.add('d-none');
}


/**
 * This function shows the "More Pokémon"-button and the scroll-button
 */
function showButtons() {
    document.getElementById('button').classList.remove('d-none');
}


/**
 * This function renders the Pokémon-Data-Card
 * @param {number} i 
 */
function renderPokemonDataCard(i) {
    let dataCard = document.getElementById('pokemondatacard');
    dataCard.innerHTML = '';
        let pokemon = listOfPokemon[i];
        let pokemonName = pokemon.name;
        let pokemonId = pokemon.id.toString().padStart(3, '0'); 
        let pokemonImg = pokemon['sprites']['other']['home']['front_default'];
        let pokemonType1 = pokemon['types'][0]['type']['name'];
        let typeColor1 = typeColorBackground[pokemonType1];
        let pokemonType2 = getPokemonType2(pokemon);
        let typeColor2 = getTypeColor2(pokemonType1, pokemonType2);
        dataCard.innerHTML = showPokemonDataCard(typeColor1, typeColor2, pokemonId, pokemonImg, pokemonName, pokemonType1, pokemonType2, i);
        openAbout(i, pokemonType1, pokemonType2);
}


/**
 * This function renders the about-section
 * @param {number} i 
 * @param {string} typeColor2 
 * @param {string} pokemonType1 
 * @param {string} pokemonType2 
 */
function openAbout(i, pokemonType1, pokemonType2) {
    let aboutContent = document.getElementById(`pokemoncard-info-${i}`);
    let pokemon = listOfPokemon[i];
    let pokemonHeight = pokemon.height;
    let pokemonWeight = pokemon.weight;
    let pokemonAbility1 = pokemon['abilities'][0]['ability']['name'];
    let pokemonAbility2 = getSecondAbility(pokemon);
    let pokemonAbility3 = getThirdAbility(pokemon);
    let typeColor1 = typeColorBackground2[pokemonType1];
    let typeColor2 = getTypeColor2ForDataSections(pokemonType1, pokemonType2);
    aboutContent.innerHTML = showAbout(pokemonHeight, pokemonWeight, pokemonAbility1, pokemonAbility2, pokemonAbility3, typeColor1, typeColor2); 
    setButtonColor('about', i);
}


/**
 * This function gets the colored background for about, base stats and form
 * @param {string} pokemonType1 
 * @param {string} pokemonType2 
 * @returns colored background
 */
function getTypeColor2ForDataSections(pokemonType1, pokemonType2) {
    if (pokemonType2 && typeColorBackground2[pokemonType2]) {
        return typeColorBackground2[pokemonType2];
    } else {
        return soloTypeBackground2[pokemonType1];
    }
}


/**
 * This function gets the second ability
 * @param {string} pokemon 
 * @returns second ability
 */
function getSecondAbility(pokemon) {
    if (pokemon['abilities'].length > 1) {
        return pokemon['abilities'][1]['ability']['name'];
    }
}


/**
 * This function gets the third ability
 * @param {string} pokemon 
 * @returns third ability
 */
function getThirdAbility(pokemon) {
    if (pokemon['abilities'].length > 2) {
        return pokemon['abilities'][2]['ability']['name'];
    }
}

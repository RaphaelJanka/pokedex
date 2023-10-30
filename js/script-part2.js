
/**
 * This function renders the base-stat-section
 * @param {number} i 
 * @param {string} typeColor2 
 * @param {string} pokemonType1 
 * @param {string} pokemonType2 
 */
function openBaseStats(i, pokemonType1, pokemonType2) {
    let chart = document.getElementById(`pokemoncard-info-${i}`);
    let pokemon = listOfPokemon[i];
    let {
        pokemonHP, pokemonATK, pokemonDEF, pokemonSpATK, pokemonSpDEF, pokemonINT,
        pokemonStatHP, pokemonStatATK, pokemonStatDEF, pokemonStatSpATK, pokemonStatSpDEF, pokemonStatINT
    } = determinePokemonStats(pokemon);
    let total = pokemonStatHP + pokemonStatATK + pokemonStatDEF + pokemonStatSpATK + pokemonStatSpDEF + pokemonStatINT;
    let typeColor1 = typeColorBackground2[pokemonType1];
    let typeColor2 = getTypeColor2ForDataSections(pokemonType1, pokemonType2);
    chart.innerHTML = showBaseStats(total, pokemonHP, pokemonATK, pokemonDEF, pokemonSpATK, pokemonSpDEF, pokemonINT, pokemonStatHP, pokemonStatATK, pokemonStatDEF, pokemonStatSpATK, pokemonStatSpDEF, pokemonStatINT, typeColor1, typeColor2); 
    setButtonColor('base-stat', i);
}


/**
 * This function determines alle base stats
 * @param {string} pokemon 
 * @returns 
 */
function determinePokemonStats(pokemon) {
    const stats = pokemon['stats'];
    return {
        pokemonHP: stats[0]['stat']['name'], pokemonATK: stats[1]['stat']['name'], pokemonDEF: stats[2]['stat']['name'], pokemonSpATK: stats[3]['stat']['name'],
        pokemonSpDEF: stats[4]['stat']['name'], pokemonINT: stats[5]['stat']['name'], pokemonStatHP: stats[0]['base_stat'], pokemonStatATK: stats[1]['base_stat'],
        pokemonStatDEF: stats[2]['base_stat'], pokemonStatSpATK: stats[3]['base_stat'], pokemonStatSpDEF: stats[4]['base_stat'], pokemonStatINT: stats[5]['base_stat'],
    };
}


/**
 * This function renders the form-section
 * @param {number} i 
 * @param {string} typeColor2 
 * @param {string} pokemonType1 
 * @param {string} pokemonType2 
 */
function openForms(i, pokemonType1, pokemonType2) {
    let forms = document.getElementById(`pokemoncard-info-${i}`);
    let pokemon = listOfPokemon[i];
    let pokemonImg = pokemon['sprites']['other']['home']['front_default'];
    let pokemonImgShiny = pokemon['sprites']['other']['home']['front_shiny'];
    let typeColor1 = typeColorBackground2[pokemonType1];
    let typeColor2 = getTypeColor2ForDataSections(pokemonType1, pokemonType2);
    forms.innerHTML = showForms(pokemonImg, pokemonImgShiny, typeColor1, typeColor2);
    setButtonColor('form', i);
}


/**
 * This function sets the button color of about, base stat and form
 * @param {string} activeButtonId 
 * @param {number} i 
 */
function setButtonColor(activeButtonId, i) {
    const buttonIds = ['about', 'base-stat', 'form', 'evolution']; 
    for (const buttonId of buttonIds) {  
        const button = document.getElementById(buttonId);
        if (buttonId === activeButtonId) {
            changeButtonColorToTypeColor(button, i);
        } else {
            resetButtonColor(button);
        }
    }
}


/**
 * This function changes the button color to the specifc type color of each Pokémon
 * @param {string} button 
 * @param {number} i 
 */
function changeButtonColorToTypeColor(button, i) {
    let pokemon = listOfPokemon[i];
    let pokemonType1 = pokemon['types'][0]['type']['name'];
    let typeColor1 = typeColorBackground[pokemonType1];
    button.style.backgroundColor = typeColor1;
    button.style.color = 'white'; 
}


/**
 * This function resets the button color
 * @param {string} button 
 */
function resetButtonColor(button) {
    button.style.backgroundColor = ''; 
    button.style.color = ''; 
}


/**
 * This function allows the click inside of the Pokémon-Data-Card
 * @param {event} event 
 */
function doNotClose(event) {
    event.stopPropagation();
}


/**
 * This function allows to scroll to the top of the window
 */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}


/**
 * This function searches for Pokémon 
 */
function searchPokemon() {
    let input = document.getElementById('search');
    if (input.length !== 0) {
        filterPokemon();
    }
}


/**
 * This function filters all loaded Pokémon 
 */
function filterPokemon() {
    let search = document.getElementById('search').value;
    search = search.toLowerCase();
    let filter = document.getElementById('pokedex');
    filter.innerHTML = '';
    showFilteredPokemon(search, filter);
}


/**
 * This function determines all vars for the filtered Pokémon
 * @param {HTMLElement} search 
 * @param {HTMLElement} filter 
 */
function showFilteredPokemon(search, filter) {
    for (let i = 0; i < listOfPokemon.length; i++) {
        const pokemon = listOfPokemon[i];
        let pokemonName = pokemon.name;
        let pokemonId = pokemon.id.toString().padStart(3, '0');
        let pokemonImg = pokemon['sprites']['other']['home']['front_default'];
        let pokemonType1 = pokemon['types'][0]['type']['name'];
        let typeColorIcons1 = typeColorIconsBackground[pokemonType1];
        let pokemonType2 = getPokemonType2(pokemon);
        let typeColor1 = typeColorBackground[pokemonType1];
        let typeColor2 = getTypeColor2(pokemonType1, pokemonType2);
        let typeColorIcons2 = getTypeColorIcons2(pokemonType2);
        renderFilteredPokemon(search, filter, pokemonName, pokemonId, pokemonImg, pokemonType1, pokemonType2, typeColorIcons1, typeColorIcons2, typeColor1, typeColor2, i)
    }
}


/**
 * This function renders the filtered Pokémon
 * @param {HTMLElement} search 
 * @param {HTMLElement} filter 
 * @param {string} pokemonName 
 * @param {string} pokemonId 
 * @param {string} pokemonImg 
 * @param {string} pokemonType1 
 * @param {string} pokemonType2 
 * @param {string} typeColorIcons1 
 * @param {string} typeColorIcons2 
 * @param {string} typeColor1 
 * @param {string} typeColor2 
 * @param {number} i 
 */
function renderFilteredPokemon(search, filter, pokemonName, pokemonId, pokemonImg, pokemonType1, pokemonType2, typeColorIcons1, typeColorIcons2, typeColor1, typeColor2, i) {
    if (pokemonName.toLowerCase().includes(search) || pokemonId.toString().includes(search)) {
        filter.innerHTML += showPokemonCard(pokemonName, pokemonId, typeColor1, typeColor2, typeColorIcons1, typeColorIcons2, pokemonType1, pokemonType2, pokemonImg, i);
    }
}


/**
 * This function switches to the next Pokémon-Data-Card
 * @param {number} i 
 */
function nextPokemonCard(i) {
    currentIndex = i +1;
    if (currentIndex >= listOfPokemon.length) {
       currentIndex = 0;
    }
    renderPokemonDataCard(currentIndex); // Das nächste Pokémon anzeigen
}


/**
 * This function switches to the last Pokémon-Data-Card
 * @param {number} i 
 */
function lastPokemonCard(i) {
    currentIndex = i - 1;
    if (currentIndex < 0 ) {
        currentIndex = listOfPokemon.length -1;
    }
    renderPokemonDataCard(currentIndex);
}


async function openEvolution(i, pokemonType1, pokemonType2) {
    let evolutionContainer = document.getElementById(`pokemoncard-info-${i}`);
    let allEvolutions = [];
    let typeColor1 = typeColorBackground2[pokemonType1];
    let typeColor2 = getTypeColor2ForDataSections(pokemonType1, pokemonType2);
    await loadAllEvolutionChains(allEvolutions, i);
    evolutionContainer.innerHTML = /*html */`
        <div id="evolutionStages" class="evolution-container" style="background: linear-gradient(to bottom right, ${typeColor1}, ${typeColor2})"></div>
    `
    renderEvolutionImg(allEvolutions);
    setButtonColor('evolution', i);
}


async function renderEvolutionImg(array) {
    let evolutionContent = document.getElementById('evolutionStages');
    for (let pokemonName of array) {
        const pokemonId = await getPokemonId(pokemonName);
        const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemonId}.png`;
        evolutionContent.innerHTML += /*html */`
        <img class="evo-img" src="${imgUrl}" alt="${pokemonName}">
        `;
    };
}

async function loadAllEvolutionChains(array, i) {
    const json = await listOfPokemon[i];
    const pokemonName = json.name;
    let url = `https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`;
    let response = await fetch(url);
    let responseAsJson = await response.json();
    let responseUrl = responseAsJson.evolution_chain.url;
    checkAvailibilityOfUrl(responseUrl);
    let response_1 = await fetch(responseUrl);
    let evolutionChainAsJson = await response_1.json();
    let chain = evolutionChainAsJson.chain;
    pushChainIntoArray(array, chain);
}


function checkAvailibilityOfUrl(responseUrl) {
    if (!responseUrl) {
        console.error("Evolution chain URL not found");
        return;
      }
}

function pushChainIntoArray(array, chain) {
    chain.species ? array.push(chain.species.name) : '';
    chain.evolves_to[0] && chain.evolves_to[0].species ? array.push(chain.evolves_to[0].species.name) : '';
    chain.evolves_to[0] && chain.evolves_to[0].evolves_to[0] && chain.evolves_to[0].evolves_to[0].species ? array.push(chain.evolves_to[0].evolves_to[0].species.name) : '';
}
async function getPokemonId(pokemonName) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.id;
}

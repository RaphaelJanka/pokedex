/**
 * Template for the Pokémon Card
 * @param {string} pokemonName 
 * @param {string} pokemonId 
 * @param {string} typeColor1 
 * @param {string} typeColor2 
 * @param {string} typeColorIcons1 
 * @param {string} typeColorIcons2 
 * @param {string} pokemonType1 
 * @param {string} pokemonType2 
 * @param {string} pokemonImg 
 * @param {number} i 
 * @returns 
 */

function showPokemonCard(pokemonName, pokemonId, typeColor1, typeColor2, typeColorIcons1, typeColorIcons2, pokemonType1, pokemonType2, pokemonImg, i) {
    return /*html*/ `
        <div id="${pokemonName}" class="pokemon-card" onclick="openPokemonDataCard(${i})" style="background: linear-gradient(to bottom right, ${typeColor1} 30%, ${typeColor2} 82%);">
            <div class="pokecard-border-box" style="border: 4px solid ${typeColorIcons1}">
                <div class="poke-id-box">
                    <span>#${pokemonId}</span>
                </div>    
                <div class="poke-name-box">
                    <span>${pokemonName}</span>
                </div>
                <div class="poke-type-img-box">
                    <div class="pokemon-type-box">
                        <span class="pokemon-type-icon" style="background-color: ${typeColorIcons1}">${pokemonType1}</span>
                        ${pokemonType2 ? `<span class="pokemon-type-icon" style="background-color: ${typeColorIcons2}">${pokemonType2}</span>`: ''}
                    </div>
                    <img class="pokemon-img" src="${pokemonImg}" alt="">
                </div>
            </div>
        </div>
    `;
}


/**
 * Template for Pokémon-Data-Card
 * @param {string} typeColor1 
 * @param {string} typeColor2 
 * @param {string} pokemonId 
 * @param {string} pokemonImg 
 * @param {string} pokemonName 
 * @param {string} pokemonType1 
 * @param {string} pokemonType2 
 * @param {number} i 
 * @returns 
 */
function showPokemonDataCard(typeColor1, typeColor2, pokemonId, pokemonImg, pokemonName, pokemonType1, pokemonType2, i) {
    return /*html*/ `    
        <div class="pokemondata-container" style="background: linear-gradient(to bottom right, ${typeColor1}, ${typeColor2})">
            <div class="pokemondata-type-background">
                <span class="pokemondata-id">#${pokemonId}</span>
                <img src="../img/arrow.png" alt="arrow" class="close-arrow" onclick="closePokemonDatacard()">
                <img class="pokemondata-img" src="${pokemonImg}" alt="${pokemonName}">
                <img id="next" src="../img/pokestop.png" alt="pokestop" class="next-arrow" onclick="nextPokemonCard(${i})">
                <img src="../img/pokestop.png" alt="pokestop" class="back-arrow" onclick="lastPokemonCard(${i})">
            </div>
            <div class="pokemondata-content-box">
                <h2 class="pokemondata-name">${pokemonName}</h2>
                <div class="pokemondata-type-container">
                    <span class="pokemon-type-icon" style="background-color: ${typeColor1}; color: white">${pokemonType1}</span>
                    ${pokemonType2 ? `<span class="pokemon-type-icon" style="background-color: ${typeColor2}; color: white">${pokemonType2}</span>` : ''}
                </div>
                <div class="pokemoncard-info-content-box">
                    <div class="pokecard-info-button-container">
                        <span id="about" class="pokecard-info-buttons" onclick="openAbout(${i}, '${pokemonType1}', '${pokemonType2}')">About</span>
                        <span id="base-stat" class="pokecard-info-buttons" onclick="openBaseStats(${i}, '${pokemonType1}', '${pokemonType2}')">Base Stats</span>
                        <span id="form" class="pokecard-info-buttons" onclick="openForms(${i}, '${pokemonType1}', '${pokemonType2}')">Forms</span>
                        <span id="evolution" class="pokecard-info-buttons" onclick="openEvolution(${i}, '${pokemonType1}', '${pokemonType2}')">Evolution</span>
                    </div>
                    <div id="pokemoncard-info-${i}"></div>
                </div>    
            </div>
        </div>
        `;
}


/**
 * Template for the about-section
 * @param {string} pokemonHeight 
 * @param {string} pokemonWeight 
 * @param {string} pokemonAbility1 
 * @param {string} pokemonAbility2 
 * @param {string} pokemonAbility3 
 * @param {string} typeColor1 
 * @param {string} typeColor2 
 * @returns 
 */
function showAbout(pokemonHeight, pokemonWeight, pokemonAbility1, pokemonAbility2, pokemonAbility3, typeColor1, typeColor2) {
    return /*html*/ `
        <div class="about-container" style="background: linear-gradient(to bottom right, ${typeColor1}, ${typeColor2})">
            <div class="about-img-box">
                <img src="../img/height.png" alt="" class="height-img">
                <img src="../img/weight.png" alt="" class="weight-img">
                <img src="../img/ability.png" alt="" class="ability-img ">
            </div>
            <div class="about-data-box">
                <span>${pokemonHeight}0 cm</span>
                <span>${pokemonWeight} kg</span>
                <div class="about-ability-box">
                    <span class="ability">${pokemonAbility1}</span>
                    ${pokemonAbility2 ? `<span class="ability ml-8">${pokemonAbility2}</span>` : ''}
                    ${pokemonAbility3 ? `<span class="ability ml-8">${pokemonAbility3}</span>` : ''}
                </div>
            </div>
        </div>
    `;
}


/**
 * Template for base-stat-section
 * @param {number} total 
 * @param {number} pokemonHP 
 * @param {number} pokemonATK 
 * @param {number} pokemonDEF 
 * @param {number} pokemonSpATK 
 * @param {number} pokemonSpDEF 
 * @param {number} pokemonINT 
 * @param {number} pokemonStatHP 
 * @param {number} pokemonStatATK 
 * @param {number} pokemonStatDEF 
 * @param {number} pokemonStatSpATK 
 * @param {number} pokemonStatSpDEF 
 * @param {number} pokemonStatINT 
 * @param {string} typeColor1 
 * @param {string} typeColor2 
 * @returns 
 */
function showBaseStats(total, pokemonHP, pokemonATK, pokemonDEF, pokemonSpATK, pokemonSpDEF, pokemonINT, pokemonStatHP, pokemonStatATK, pokemonStatDEF, pokemonStatSpATK, pokemonStatSpDEF, pokemonStatINT, typeColor1, typeColor2) {
    return /*html*/ `
        <div class="poke-stat-container" style="background: linear-gradient(to bottom right, ${typeColor1}, ${typeColor2})">
            <div class="ev-box">
                <span class="uc">${pokemonHP}</span>
                <span>${pokemonATK}</span>
                <span>${pokemonDEF}</span>
                <span>${pokemonSpATK}</span>
                <span>${pokemonSpDEF}</span>
                <span>${pokemonINT}</span>
                <span class="fw-b">Total:</span>
            </div>
            <div class="chart-box">
                <div class="full-chart-line">
                    <div class="ev-chart-line hp" style="width: ${pokemonStatHP}px;"><span>${pokemonStatHP}</span></div>
                </div>
                <div class="full-chart-line">
                    <div class="ev-chart-line atk" style="width: ${pokemonStatATK}px"><span>${pokemonStatATK}</span></div>
                </div> 
                <div class="full-chart-line">   
                    <div class="ev-chart-line def" style="width: ${pokemonStatDEF}px"><span>${pokemonStatDEF}</span></div>
                </div>
                <div class="full-chart-line">   
                    <div class="ev-chart-line spatk" style="width: ${pokemonStatSpATK}px"><span>${pokemonStatSpATK}</span></div>
                </div>
                <div class="full-chart-line">   
                    <div class="ev-chart-line spdef" style="width: ${pokemonStatSpDEF}px"><span>${pokemonStatSpDEF}</span></div>
                </div> 
                <div class="full-chart-line">
                    <div class="ev-chart-line int" style="width: ${pokemonStatINT}px"><span>${pokemonStatINT}</span></div>
                </div>
                <span class="fw-b">${total}</span>
            </div>
        </div>
    `;
}


/**
 * Template for the form-section
 * @param {string} pokemonImg 
 * @param {string} pokemonImgShiny 
 * @param {string} typeColor1 
 * @param {string} typeColor2 
 * @returns 
 */
function showForms(pokemonImg, pokemonImgShiny, typeColor1, typeColor2) {
    return /*html*/ `
        <div class="forms-container" style="background: linear-gradient(to bottom right, ${typeColor1}, ${typeColor2})">
            <div class="forms-box">
                <span class="form-title-r">Regular</span>
                <img src="${pokemonImg}" alt="" class="img-regular">
            </div>
            <div class="forms-box">
                <span class="form-title-s">Shiny</span>
                <img src="${pokemonImgShiny}" alt="" class="img-shiny">
            </div>
        </div>
    `;
}



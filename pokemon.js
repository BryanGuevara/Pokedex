const urlParams = new URLSearchParams(window.location.search);
const pokemonId = urlParams.get('id');

async function fetchPokemonDetails(id) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        displayPokemonDetails(data);

        fetchPokemonDescription(id);
    } catch (error) {
        console.error('Error al obtener detalles del Pokémon:', error);
    }
}

function displayPokemonDetails(pokemon) {
    const pokemonDetailsContainer = document.getElementById('pokemon-details');
    pokemonDetailsContainer.innerHTML = `
        <div class="header-main-pokemon">
            <span class="number-pokemon">#${pokemon.id}</span>
            <div class="container-img-pokemon">
                <img src="${pokemon.sprites.front_default}" alt="pokemon ${pokemon.name}" />
            </div>
            <div class="container-info-pokemon">
                <h1>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h1>
                <div class="card-types">
                    ${pokemon.types.map(type => `<span class="${type.type.name}">${type.type.name}</span>`).join('')}
                </div>
                <div class="info-pokemon">
                    <div class="group-info">
                        <p>Altura</p>
                        <span>${pokemon.height / 10} m</span>
                    </div>
                    <div class="group-info">
                        <p>Peso</p>
                        <span>${pokemon.weight / 10} kg</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="info-pokemon">
          <div class="group-info"></br></br>
            <h2>Descripción de la Pokédex</h2>
            <p id="description-text">Cargando descripción...</p>
            </br></br></br>
          </div>
        </div>
        <div class="container-stats">
            <h1>Estadísticas</h1>
            <div class="stats">
                ${pokemon.stats.map(stat => `
                    <div class="stat-group">
                        <span>${stat.stat.name}</span>
                        <div class="progress-bar" style="width: ${stat.base_stat}px;"></div>
                        <span class="counter-stat">${stat.base_stat}</span>
                    </div>
                `).join('')}</br></br>
            </div>
        </div>
    `;
}

async function fetchPokemonDescription(id) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`);
        const data = await response.json();

        const descriptionEntry = data.flavor_text_entries.find(
            entry => entry.language.name === 'es'
        );

        const descriptionContainer = document.getElementById('description-text');
        descriptionContainer.textContent = descriptionEntry ? descriptionEntry.flavor_text.replace(/\n/g, ' ').replace(/\f/g, ' ') : 'Descripción no disponible en español.';
    } catch (error) {
        console.error('Error al obtener la descripción de la Pokédex:', error);
    }
}

fetchPokemonDetails(pokemonId);

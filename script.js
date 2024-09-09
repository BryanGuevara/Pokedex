// index.js

async function fetchPokemonList() {
    const pokemonListContainer = document.getElementById('pokemon-list');

    for (let i = 1; i <= 151; i++) {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
            const pokemon = await response.json();

            const pokemonCard = createPokemonCard(pokemon);
            pokemonListContainer.appendChild(pokemonCard);
        } catch (error) {
            console.error('Error al obtener el Pokémon:', error);
        }
    }
}

// Crear tarjeta de Pokémon
function createPokemonCard(pokemon) {
    const card = document.createElement('a');
    card.className = 'card-pokemon';
    // Usar un parámetro de la URL para pasar el ID del Pokémon
    card.href = `pokemon.html?id=${pokemon.id}`;

    const cardImg = document.createElement('div');
    cardImg.className = 'card-img';
    const img = document.createElement('img');
    img.src = pokemon.sprites.front_default;
    img.alt = `Pokemon ${pokemon.name}`;
    cardImg.appendChild(img);

    const cardInfo = document.createElement('div');
    cardInfo.className = 'card-info';
    const pokemonId = document.createElement('span');
    pokemonId.className = 'pokemon-id';
    pokemonId.textContent = `N.º ${pokemon.id.toString().padStart(4, '0')}`;
    const pokemonName = document.createElement('h3');
    pokemonName.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    const cardTypes = document.createElement('div');
    cardTypes.className = 'card-types';

    pokemon.types.forEach(type => {
        const typeSpan = document.createElement('span');
        typeSpan.className = type.type.name;
        typeSpan.textContent = type.type.name;
        cardTypes.appendChild(typeSpan);
    });

    cardInfo.appendChild(pokemonId);
    cardInfo.appendChild(pokemonName);
    cardInfo.appendChild(cardTypes);

    card.appendChild(cardImg);
    card.appendChild(cardInfo);

    return card;
}

fetchPokemonList();
